import type { NextApiRequest, NextApiResponse } from 'next'
import { connectDB } from '@/util/database'
import bcrypt from 'bcrypt';

export default async function Handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method === "POST") {
            const hash = await bcrypt.hash(req.body.password, 10);
            req.body.password = hash;

            let db = (await connectDB).db('thread')
            await db.collection('users').insertOne(req.body)

            res.redirect(302, '/')
        }
    } catch (err) {
    }
}