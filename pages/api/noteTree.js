import { CID, create } from 'ipfs-http-client'
import { Database } from "@tableland/sdk";
import { Wallet, getDefaultProvider } from "ethers";
const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;
const projectSecret = process.env.NEXT_PUBLIC_PROJECT_SECRET;
const auth = 'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');
const ipfs = create({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
  apiPath: '/api/v0',
  headers: {
    authorization: auth,
  }
})

const privateKey = process.env.NEXT_PUBLIC_PRIVATE_KEY;
const wallet = new Wallet(privateKey);
const provider = getDefaultProvider(`https://polygon-mumbai.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_MUMBAI_ID}`); 
const signer = wallet.connect(provider);
const db = new Database({ signer });
const handler = async (req, res) => {
    switch (req.method) {
        case 'GET':
          try {
            const id = req.query.id
            const query = `SELECT * FROM icarus_80001_5720 WHERE id=${id}`;
            const encodedQuery = encodeURIComponent(query);
            const encodeAsterisk = encodedQuery.replace(/\*/g, '%2A');
            const data = await fetch(`https://testnets.tableland.network/api/v1/query?statement=${encodeAsterisk}`)
            const jsonData = await data.json()
            //returns [{"id":3, "note_tree_cid: , "owned_table": , "pub_address": }]
            const noteTreeCID = jsonData[0].note_tree_cid
            if(!data.ok || !noteTreeCID) return res.status(200).json([]);
            const cid = CID.parse(noteTreeCID);
            const content = await ipfs.dag.get(cid);
            return res.status(200).json(content)
          } catch (error) {
            return res.status(500).send(error)
          }
            break;
        case 'POST':
          try{
            const {userId, noteTree} = req.body
            const cid = await ipfs.dag.put(noteTree)
            const stringCid = cid.toString()
            const data = db.prepare(`UPDATE icarus_80001_5720 SET note_tree_cid=?1 WHERE id=?2;`).bind(stringCid, userId).run();
            if(!data.success) return res.status(500).send(error)
            return res.status(200).json({success: true})
          } catch (error) {
            return res.status(500).send(error)
          }
            break;
        default:
            res.setHeader('Allow', ['GET, POST'])
            res.status(405).end(`Method ${req.method} is not allowed.`)
    }
}

export default handler 
