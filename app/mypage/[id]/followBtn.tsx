'use client'

import { useEffect, useState } from "react"
import { followBtnProp } from "./page"
export default function FollowBtn(props: followBtnProp) {
    let [follow, setFollow] = useState(false)

    useEffect(() => {
        if (follow) {
            fetch('/api/profile/follow', { method: 'POST', body: JSON.stringify({ user: props.user, ouser: props.ouser }) }).then(r => r.json())
                .then((result) => {
                    window.location.href = `/mypage/${props.ouser}`
                })
        }
    }, [follow])

    return (
        props.isFollowed
            ? <div className="border-1 w-2/5 text-red-600 border-red-600 rounded-lg px-6 py-1 cursor-pointer">언팔로우</div>
            : <div className="border-1 w-2/5 text-white bg-black border-black rounded-lg px-6 py-1 cursor-pointer" onClick={() => {
                setFollow(true)
            }}>팔로우</div>
    )

}