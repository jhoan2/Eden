import { create, CID } from 'ipfs-http-client'
import { Database } from "@tableland/sdk";

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

const handler = async (req, res) => {
    switch (req.method) {
        case 'GET':
          try {
            const { noteCid } = req.query
            const cid = CID.parse(noteCid);
            if(noteCid) {
              const data = await ipfs.dag.get(cid)
              return res.status(200).json(data)
            } else {  
              return res.status(200).json([])
            }
          } catch (error) {
            return res.status(500).send(error)
          }
        case 'POST':
          try {
            const cid = await ipfs.dag.put(req.body)
            const stringCid = cid.toString()
            return res.status(200).json({cid: stringCid})
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