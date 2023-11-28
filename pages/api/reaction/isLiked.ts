import { NextApiRequest, NextApiResponse } from 'next'
import { connectDB } from '@/util/database'
import { ObjectId } from 'mongodb'

import Nextauth from '../auth/[...nextauth]'
import { getServerSession } from 'next-auth'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method == 'POST') {
            let session = await getServerSession(req, res, Nextauth)
            let user = JSON.parse(JSON.stringify(session))

            let db = (await connectDB).db('thread')

            let sentenceID = JSON.parse(req.body)
            let result
            if (user != null) {
                const query = { _id: new ObjectId(sentenceID) };
                const options = {
                    projection: { likeList: 1 },
                };
                result = await db.collection('sentence').findOne(query, options);
            }
            let isLiked = result?.likeList.indexOf(user.user.email)

            if (isLiked > -1) {
                res.status(200).json({ isLiked: true })
            } else {
                res.status(200).json({ isLiked: false })
            }
        }
    } catch (err) {
        res.status(200).json('err')
    }
}