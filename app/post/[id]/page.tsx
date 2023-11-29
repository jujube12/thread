import { connectDB } from "@/util/database"
import { ObjectId } from "mongodb"
import Nextauth from "@/pages/api/auth/[...nextauth]"
import { getServerSession } from 'next-auth'

import ReactionBox from "./reactionBox"
import BackButton from "@/app/component/backButton"
import Navbar from "@/app/component/navbar"

import { notFound } from "next/navigation"

type param = {
    params: {
        id: string
    },
    searchParams: {}
}
import { sentenceInfo } from "@/app/component/sentenceBox"
import CommentListBox from "./commentListBox"

export default async function Post(props: param) {
    let db = (await connectDB).db('thread')
    let result = await db.collection('sentence').findOne({ _id: new ObjectId(props.params.id) })
    let result2 = await db.collection('comment').find({ sentenceID: props.params.id }).sort({ _id: -1 }).toArray();

    let session = await getServerSession(Nextauth)
    let sentenceInfo: sentenceInfo = JSON.parse(JSON.stringify(result))

    return (
        session
            ?
            <>
                <Navbar user={JSON.stringify(session)}></Navbar>
                <div className="h-full w-full overflow-y-scroll">
                    <BackButton></BackButton>
                    <div className="border-b-1 bg-white">
                        <div className="flex px-3 pt-3">
                            <div className="bg-gray-400 h-9 w-9 rounded-full"></div>
                            <div className="w-85% m-auto font-bold">{sentenceInfo.userName}</div>
                        </div>
                        <div className="flex mt-3 px-3 cursor-pointer">
                            <div className="w-full">{sentenceInfo.sentence}</div>
                        </div>
                        <ReactionBox sentence={JSON.stringify(sentenceInfo)}></ReactionBox>
                    </div>
                    <CommentListBox comment={JSON.stringify(result2)}></CommentListBox>
                </div>
            </>
            : notFound()
    )
}