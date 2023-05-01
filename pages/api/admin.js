import { Database } from "@tableland/sdk";
import { Wallet, getDefaultProvider } from "ethers";

const privateKey = process.env.NEXT_PUBLIC_PRIVATE_KEY;
const wallet = new Wallet(privateKey);
const provider = getDefaultProvider(`https://polygon-mumbai.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_MUMBAI_ID}`); 
const signer = wallet.connect(provider);
const db = new Database({ signer });
const devTable = 'icarus_80001_5937';

const handler = async (req, res) => {
    switch (req.method) {
        case 'POST':
            const { smartAccountAddress } = req.body
            await db.prepare(`GRANT INSERT ON ${devTable} TO '${smartAccountAddress}'`).run()
            res.status(200).json({ message: 'Granted Access!' })
            break;
        default:
            res.setHeader('Allow', ['GET, POST'])
            res.status(405).end(`Method ${req.method} is not allowed.`)
    }
}

export default handler 