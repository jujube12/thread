import Navbar from "./navbar"
import { connectDB } from "@/util/database"
import { getServerSession } from "next-auth";
import Nextauth from "@/pages/api/auth/[...nextauth]";

import SentenceBox from "./sentenceBox";

export default async function Main() {
    let db = (await connectDB).db('thread')
    let result = await db.collection('sentence').find().sort({ _id: -1 }).toArray();

    let session = await getServerSession(Nextauth)

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