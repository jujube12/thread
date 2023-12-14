import { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@/util/database";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method === 'POST') {
            let data = JSON.parse(req.body)

            let db = (await connectDB).db('thread')
            let query = { email: data.ouser }
            let query2 = { email: data.user }
            let option1 = { projection: { follower: 1 } }
            let option2 = { projection: { following: 1 } }

            let isFollowed = await db.collection('users').findOne(query, option1)
            let following = await db.collection('users').findOne(query2, option2)

            if (isFollowed?.follower != null) { // 팔로워 목록이 있다면
                let copy = [...isFollowed.follower]
                copy.push(data.user)
                await db.collection('users').updateOne(query, { $set: { follower: copy } })
            } else {
                let copy = []
                copy.push(data.user)
                await db.collection('users').updateOne(query, { $set: { follower: copy } })
            }

            if (following?.following != null) { // 팔로잉 목록이 있다면
                let copy = [...following.following]
                copy.push(data.ouser)
                await db.collection('users').updateOne(query2, { $set: { following: copy } })
            } else {
                let copy = []
                copy.push(data.ouser)
                await db.collection('users').updateOne(query2, { $set: { following: copy } })
            }

            res.status(200).json('a')
        }
    } catch (err) {
        res.status(200).json('err')
    }
}