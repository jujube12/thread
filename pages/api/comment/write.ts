import type { NextApiRequest, NextApiResponse } from 'next'
import { connectDB } from '@/util/database'

import Nextauth from '../auth/[...nextauth]'
import { getServerSession } from 'next-auth'

export default async function Handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method == "POST") {
            console.log(req.body)
            res.redirect(302, '/')
        }
    } catch (err) {

    }
}