import { create } from 'ipfs-http-client'

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
        case 'POST':
          try {
            const cid = await ipfs.add(req.body)
            return res.status(200).json({cid: cid.path})
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