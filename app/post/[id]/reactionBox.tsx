'use client'

import WriteComment from "./writeComment"
import { useState } from "react"

type likes = {
    likes: number
}

export default function ReactionBox(props: likes) {
    let [showWritePage, setShowWritePage] = useState(false)

    return (
        <>
            <div className="flex p-3 text-xs text-gray-500">
                <div className="pr-5"><span className="cursor-pointer" onClick={() => {

                }}>좋아요</span> {props.likes > 0 ? props.likes : <></>}</div>
                <div className="pr-5"><span className="cursor-pointer" onClick={() => {

                }}>저장</span> {props.likes > 0 ? props.likes : <></>}</div>
                <div className="pr-5"><span className="cursor-pointer" onClick={() => {
                    setShowWritePage(true)
                }}>댓글</span> {props.likes > 0 ? props.likes : <></>}</div>
            </div>
            <div className={`absolute w-full h-full border-1 bg-white border-gray-600 rounded-t-lg translate-y-160 ${showWritePage && "animate-commentPageUp"}`}>
                <div className="w-full border-b-1 border-gray-600 flex">
                    <div className="p-2 cursor-pointer" onClick={() => {
                        setShowWritePage(false)
                    }}>취소</div>
                    <div className="flex-1"></div>
                </div>
                <WriteComment></WriteComment>
            </div>
        </>
    )
} 