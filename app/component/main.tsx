import Navbar from "./navbar"
import { connectDB } from "@/util/database"
import { getServerSession } from "next-auth";
import Nextauth from "@/pages/api/auth/[...nextauth]";

import SentenceBox from "./sentenceBox";

export default async function Main() {
    let session = await getServerSession(Nextauth)
    let userInfo = JSON.parse(JSON.stringify(session))

    let db = (await connectDB).db('thread')
    let q = { email: userInfo.user.email }
    let o = { projection: { following: 1 } }
    let followingList = await db.collection('users').findOne(q, o);

    let arr: { userEmail: any; }[] = []
    followingList?.following.map((a: any) => {
        arr.push({ userEmail: a })
    })
    let q2 = { $or: arr }
    let result = await db.collection('sentence').find(q2).sort({ _id: -1 }).toArray();

    return (
        <>
            <Navbar user={JSON.stringify(session)}></Navbar>
            <div className="h-full overflow-y-scroll">
                <div className="mb-16">
                    {
                        result.map((a, i) => {
                            return (
                                <SentenceBox key={i} sentence={JSON.stringify(a)}></SentenceBox>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}