import { create } from 'ipfs-http-client'
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

// const addToIpfs = async (content) => {
//     console.log(content)
//     const json = JSON.stringify(content)
//     try { 
//       const res = await ipfs.dag.put(json)
//       console.log(res.toString())
      
//       console.log(res)
//       return 
//     } catch (err) {
//       console.log('err', err)
//     }
    
//   }

  // const cid = CID.parse(noteTreeCID);
  // const content = await ipfs.dag.get(cid);

const handler = async (req, res) => {
    switch (req.method) {
        case 'GET':
          try {
            const { userTable } = req.query
            console.log(userTable)
            const db = Database.readOnly("maticmum");
            const data = await db
              .prepare(`SELECT content,id FROM ${userTable};`)
              .raw();
            if (!data.success || !data.results) {
              return res.status(200).json([]);
            }
            return res.status(200).json(data)
          } catch (error) {
            return res.status(500).send(error)
          }
        default:
            res.setHeader('Allow', ['GET'])
            res.status(405).end(`Method ${req.method} is not allowed.`)
    }
    
}

export default handler 