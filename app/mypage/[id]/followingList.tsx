'use client'

import { useState } from "react"
import { followList } from "./page"

export default function FollowingList(props: followList) {
    let [button, setButton] = useState(false)
    return (
        <>
            <div className="flex m-5 text-sm w-32 justify-between cursor-pointer" onClick={() => { setButton(true) }}>
                <div>팔로잉 {props.following.length}</div>
                <div>팔로워 {props.follower.length}</div>
            </div>
            <div className={`absolute w-full h-full rounded-lg border-1 border-black bg-white top-176 ${button && 'animate-followPageUp'}`}>
                <div className="text-sm text-gray-400 text-end pt-3 pr-3 cursor-pointer" onClick={() => { setButton(false) }}>닫기</div>
                <div className="flex w-full text-center border-b-1 border-gray-400">
                    <div className="w-1/2 pb-3">팔로워</div>
                    <div className="w-1/2 pb-3">팔로잉</div>
                </div>
                <div>
                    {JSON.stringify(props.follower)}
                    {JSON.stringify(props.following)}
                </div>
            </div></>
    )
}