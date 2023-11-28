'use client'

import { ObjectId } from "mongodb"
import { useRouter } from "next/navigation"
import ReactionBox from "../post/[id]/reactionBox"

export type sentence = {
    sentence: string
}

export type sentenceInfo = {
    _id: ObjectId,
    sentence: string,
    userEmail: string,
    userName: string,
    likes: number,
    save: number,
    comment: number,
    date: string,
    time: string
}

export default function SentenceBox(props: sentence) {
    let sentenceInfo: sentenceInfo = JSON.parse(props.sentence)
    let router = useRouter()

    return (
        <div className="border-1 p-3">
            <div className="flex">
                <div className="bg-gray-400 h-9 w-9 rounded-full"></div>
                <div className="w-85% m-auto font-bold">{sentenceInfo.userName}</div>
            </div>
            <div className="flex mt-2 cursor-pointer" onClick={() => {
                router.push(`/post/${sentenceInfo._id}`)
            }}>
                <div className="w-1 mx-4 bg-gray-300"></div>
                <div className="w-85% m-auto">{sentenceInfo.sentence}</div>
            </div>
            <ReactionBox sentence={JSON.stringify(sentenceInfo)}></ReactionBox>
        </div>
    )
}