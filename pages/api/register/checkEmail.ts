import { connectDB } from "@/util/database";
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function Handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method === 'POST') {
            if (req.body.length == 0) {
                res.status(200).json('invisible')
            } else {
                // 이메일 형식 체크
                let regex = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])");
                if (regex.test(req.body)) {
                    // 이메일 중복 체크
                    let db = (await connectDB).db('thread')
                    let result = await db.collection('users').findOne({ email: req.body })
                    if (result) {
                        res.status(200).json('visible')
                    } else {
                        res.status(200).json('invisible')
                    }
                } else {
                    res.status(200).json('visible')
                }
            }
        }
    } catch (err) {

    }
} 