import type { NextApiRequest, NextApiResponse } from 'next'
import { connectDB } from '@/util/database'

import Nextauth from '../auth/[...nextauth]'
import { getServerSession } from 'next-auth'

export default async function Handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method === 'POST') {
            let session = await getServerSession(req, res, Nextauth)
            let user = JSON.parse(JSON.stringify(session))
            if (session) {
                req.body.userEmail = user.user.email
                req.body.userName = user.user.name
                req.body.likes = 0

                let today = new Date();
                req.body.date = today.getFullYear() + ('0' + today.getMonth() + 1).slice(-2) + ('0' + today.getDate()).slice(-2)
                req.body.time = ('0' + today.getHours()).slice(-2) + ('0' + today.getMinutes()).slice(-2) + ('0' + today.getSeconds()).slice(-2)

                let db = (await connectDB).db('thread')
                await db.collection('sentence').insertOne(req.body)
            }

            res.redirect(302, '/')
        }
    } catch (err) {

    }
}