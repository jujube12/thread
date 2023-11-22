'use client'

import WriteComment from "./writeComment"
import { useState } from "react"

import { sentence } from "@/app/component/sentenceBox"
import { sentenceInfo } from "@/app/component/sentenceBox"

export default function ReactionBox(props: sentence) {
    let [showWritePage, setShowWritePage] = useState(false)
    let sentenceInfo: sentenceInfo = JSON.parse(props.sentence)

    return (
        <>
            <div className="flex p-3 text-xs text-gray-500">
                <div className="pr-5"><span className="cursor-pointer" onClick={() => {

                }}>좋아요</span> {sentenceInfo.likes > 0 ? 1 : <></>}</div>
                <div className="pr-5"><span className="cursor-pointer" onClick={() => {

                }}>저장</span> {sentenceInfo.save > 0 ? 1 : <></>}</div>
                <div className="pr-5"><span className="cursor-pointer" onClick={() => {
                    setShowWritePage(true)
                }}>댓글</span> {sentenceInfo.comment ? 1 : <></>}</div>
            </div>
            <div className={`absolute w-full h-full border-1 bg-white border-gray-600 rounded-t-lg translate-y-160 ${showWritePage && "animate-commentPageUp"}`}>
                <div className="w-full border-b-1 border-gray-600 flex">
                    <div className="p-2 cursor-pointer" onClick={() => {
                        setShowWritePage(false)
                    }}>취소</div>
                    <div className="flex-1"></div>
                </div>
                <div className="p-3">
                    <div className="flex">
                        <div className="bg-gray-400 h-9 w-9 rounded-full"></div>
                        <div className="w-85% m-auto font-bold">{sentenceInfo.userName}</div>
                    </div>
                    <div className="flex mt-2 cursor-pointer">
                        <div className="w-1 mx-4 bg-gray-300"></div>
                        <div className="w-85% m-auto">{sentenceInfo.sentence}</div>
                    </div>
                </div>
                <WriteComment sentenceID={JSON.stringify(sentenceInfo._id)}></WriteComment>
            </div>
        </>
    )
} 