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
                    projection: { likes: 1, likeList: 1 },
                };
                result = await db.collection('sentence').findOne(query, options);
            }
            let isLiked
            let likes
            let likeList

            if (result?.likeList != null) {
                isLiked = result?.likeList.indexOf(user.user.email)
                if (isLiked > -1) {
                    likeList = [...result?.likeList]
                    likes = result?.likes - 1
                    likeList.splice(isLiked, 1)
                    await db.collection('sentence').updateOne({ _id: new ObjectId(sentenceID) }, { $set: { likes: likes, likeList: likeList } })
                    res.status(200).json({ isLiked: false })
                } else {
                    likeList = [...result?.likeList]
                    likes = result?.likes + 1
                    likeList.push(user.user.email)
                    await db.collection('sentence').updateOne({ _id: new ObjectId(sentenceID) }, { $set: { likes: likes, likeList: likeList } })
                    res.status(200).json({ isLiked: true })
                }
            } else {
                likeList = []
                likeList.push(user.user.email)
                likes = result?.likes + 1
                await db.collection('sentence').updateOne({ _id: new ObjectId(sentenceID) }, { $set: { likes: likes, likeList: likeList } })
                res.status(200).json({ isLiked: true })
            }
        }
    } catch (err) {

    }
}