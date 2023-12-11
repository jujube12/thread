import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import Nextauth from "../auth/[...nextauth]";
import { connectDB } from "@/util/database";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method == 'POST') {
            let session = await getServerSession(req, res, Nextauth)
            let user = JSON.parse(JSON.stringify(session))
            let data = JSON.parse(req.body)  //{name: '', email: ''}
            let name = { userName: data.name }

            if (data.name == '' || data.name == null || data.intro == '' || data.intro == null) {
                res.status(200).json({ changed: false })
            } else {
                let db = (await connectDB).db('thread')
                await db.collection('users').updateOne({ email: user.user.email }, { $set: data })
                await db.collection('sentence').updateOne({ userEmail: user.user.email }, { $set: name })
                res.status(200).json({ changed: true })
            }
        }
    } catch (err) {

    }
}