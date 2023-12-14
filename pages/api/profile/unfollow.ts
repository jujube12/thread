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
            // 팔로워 목록
            let isFollowed = await db.collection('users').findOne(query, option1)
            // 팔로잉 목록
            let following = await db.collection('users').findOne(query2, option2)

            let followerArr = [...isFollowed?.follower]
            followerArr.splice(followerArr.indexOf(data.user), 1)
            await db.collection('users').updateOne(query, { $set: { follower: followerArr } })

            let followingArr = [...following?.following]
            followingArr.splice(followingArr.indexOf(data.ouser), 1)
            await db.collection('users').updateOne(query2, { $set: { following: followingArr } })

            res.status(200).json('a')
        }
    } catch (err) {
        res.status(200).json('err')
    }
}