'use client'

import { useState } from "react"
import { followList } from "./page"

export default function FollowingList(props: followList) {
    let [button, setButton] = useState(false)
    let [toggle, setToggle] = useState(false)
    return (
        <>
            <div className="flex m-5 text-sm w-32 justify-between cursor-pointer" onClick={() => { setButton(true) }}>
                <div>팔로잉 {props.following.length}</div>
                <div>팔로워 {props.follower.length}</div>
            </div>
            <div className={`absolute w-full h-full rounded-lg border-1 border-black bg-white top-176 ${button && 'animate-followPageUp'}`}>
                <div className="text-sm text-gray-400 text-end pt-3 pr-3 cursor-pointer" onClick={() => { setButton(false) }}>닫기</div>
                <div className="flex w-full text-center">
                    <div className={`w-1/2 pb-3 cursor-pointer border-b-2 ${toggle ? 'border-gray-300' : 'border-black'}`} onClick={() => { setToggle(false) }}>팔로잉</div>
                    <div className={`w-1/2 pb-3 cursor-pointer border-b-2 ${toggle ? 'border-black' : 'border-gray-300'}`} onClick={() => { setToggle(true) }}>팔로워</div>
                </div>
                {
                    toggle
                        ? <div> {/** 팔로워 */}
                            {
                                props.follower.map((a, i) => {
                                    return (
                                        <div key={i} className="py-5 border-b-1 h-20 border-gray-200">
                                            <div className="flex px-3">
                                                <div className="w-8 h-8 bg-gray-500 rounded-full"></div>
                                                <div className="px-5">
                                                    <div className="font-bold">{a.name}</div>
                                                    <div className="text-sm">{a.intro}</div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        : <div> {/** 팔로잉 */}
                            {
                                props.following.map((a, i) => {
                                    return (
                                        <div key={i} className="pt-3 pb-5 border-b-1 h-20 border-gray-200">
                                            <div className="flex px-3">
                                                <div className="w-8 h-8 bg-gray-500 rounded-full"></div>
                                                <div className="px-5">
                                                    <div className="font-bold">{a.name}</div>
                                                    <div className="text-sm">{a.intro}</div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>

                }
            </div>
        </>
    )
}