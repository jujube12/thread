import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import Nextauth from "../auth/[...nextauth]";
import { connectDB } from "@/util/database";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method == 'POST') {
            let session = await getServerSession(req, res, Nextauth)
            let user = JSON.parse(JSON.stringify(session))
            let data = JSON.parse(req.body)

            if (data.name == '' || data.name == null || data.intro == '' || data.intro == null) {
                res.status(200).json('')
            } else {
                let db = (await connectDB).db('thread')
                await db.collection('users').updateOne({ email: user.user.email }, { $set: data })
                res.status(200).json('')
            }
        }
    } catch (err) {

    }
}