'use client'
import Link from "next/link"
import { useState } from "react"

import WriteSentence from "./writeSentence"

export type user = {
    user: string
}

export type userInfo = {
    name: string,
    email: string

}

export default function Navbar(props: user) {
    let userInfo: userInfo = JSON.parse(props.user).user
    let [showWritePage, setShowWritePage] = useState(false)

    return (
        <div>
            <div className="absolute w-full bottom-0 border-t-2 flex justify-around bg-white">
                <Link href={'/'}><div className="cursor-pointer text-gray-500 p-5">1</div></Link>
                <Link href={'/search'}><div className="cursor-pointer text-gray-500 p-5">2</div></Link>
                <div className="cursor-pointer text-gray-500 p-5" onClick={() => {
                    setShowWritePage(true)
                }}>3</div>
                <Link href={'/action'}><div className="cursor-pointer text-gray-500 p-5">4</div></Link>
                <Link href={`/mypage/${userInfo.email}`}><div className="cursor-pointer text-gray-500 p-5">5</div></Link>
            </div>
            <div className={`absolute w-full h-full border-1 bg-white border-gray-600 z-10 rounded-t-lg translate-y-240 ${showWritePage && "animate-pageUp"}`}>
                <div className="w-full border-b-1 border-gray-600 flex">
                    <div className="p-2 cursor-pointer" onClick={() => {
                        setShowWritePage(false)
                    }}>닫기</div>
                    <div className="flex-1"></div>
                </div>
                <WriteSentence></WriteSentence>
            </div>
        </div>
    )
}