import Navbar from "./navbar"
import { connectDB } from "@/util/database"

import SentenceBox from "./sentenceBox";

export default async function Main() {
    let db = (await connectDB).db('thread')
    let result = await db.collection('sentence').find().toArray();

    return (
        <>
            <Navbar></Navbar>
            <div className="h-full overflow-y-scroll">
                <div className="mb-16">
                    {
                        result.map((a) => {
                            return (
                                <SentenceBox sentence={JSON.stringify(a)}></SentenceBox>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}