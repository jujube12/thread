import { connectDB } from "@/util/database";
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function Handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method === 'POST') {
            let data = JSON.parse(req.body)

            // 이름, 비번 입력 없을 때
            if (data.name.length === 0 || data.password.length === 0) {
                if (data.email.length === 0) {
                    res.status(200).json({ noti: 'invisible', btn: true })
                } else {
                    // 이메일 형식 체크해서 알림 보여줌
                    let regex = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])");
                    if (regex.test(data.email)) {
                        // 이메일 중복 체크
                        let db = (await connectDB).db('thread')
                        let result = await db.collection('users').findOne({ email: data.email })

                        if (result) {
                            res.status(200).json({ noti: 'visible', btn: true })
                        } else {
                            res.status(200).json({ noti: 'invisible', btn: true })
                        }
                    } else {
                        res.status(200).json({ noti: 'visible', btn: true })
                    }
                }
            } else { // 이름, 비번 입력 있을 때 이메일 형식 알람 보여줌
                let regex = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])");
                if (regex.test(data.email)) {
                    let db = (await connectDB).db('thread')
                    let result = await db.collection('users').findOne({ email: data.email })

                    if (result) {
                        res.status(200).json({ noti: 'visible', btn: true })
                    } else {
                        res.status(200).json({ noti: 'invisible', btn: false })
                    }
                } else {
                    res.status(200).json({ noti: 'visible', btn: true })
                }
            }
        }
    } catch (err) {

    }
} 