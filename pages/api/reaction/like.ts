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
                // ts로 findone projection 적용하는 방법
                const query = { _id: new ObjectId(sentenceID) };
                const options = {
                    projection: { likes: 1 },
                };
                result = await db.collection('sentence').findOne(query, options);
            }
            let likes = result?.likes + 1
            await db.collection('sentence').updateOne({ _id: new ObjectId(sentenceID) }, { $set: { likes: likes } })

            res.status(200).json('')
        }
    } catch (err) {

    }
}