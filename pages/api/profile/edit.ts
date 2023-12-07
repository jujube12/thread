import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import Nextauth from "../auth/[...nextauth]";
import { connectDB } from "@/util/database";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method == 'POST') {
            console.log(req.body)
            res.status(200).json('')
            let db = (await connectDB).db('thread')
            // await db.collection('user').updateOne() 
        }
    } catch (err) {

    }
}