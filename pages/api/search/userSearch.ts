import { NextApiRequest, NextApiResponse } from "next";
import Nextauth from "../auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { connectDB } from "@/util/database";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method === 'POST') {
            let session = await getServerSession(req, res, Nextauth)
            let user = JSON.parse(JSON.stringify(session))

            let db = (await connectDB).db('thread')
            let q = { name: { $regex: req.body, $options: 'i' } }
            let o = { projection: { name: 1, intro: 1, email: 1 } }
            let result = await db.collection('users').find(q, o).toArray()
            if (result.length > 0) {
                res.status(200).json(result)
            } else {
                res.status(200).json([])
            }
        }
    } catch (err) {
        res.status(500).json('error')
    }
}