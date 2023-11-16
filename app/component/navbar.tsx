'use client'
import Link from "next/link"
import { useState } from "react"

import WriteSentence from "./writeSentence"

export default function Navbar() {
    let [showWritePage, setShowWritePage] = useState(false)

    return (
        <div>
            <div className="absolute w-full bottom-0 border-t-2 flex justify-around">
                <Link href={'/'}><div className="cursor-pointer text-gray-500 p-5">1</div></Link>
                <Link href={'/search'}><div className="cursor-pointer text-gray-500 p-5">2</div></Link>
                <div className="cursor-pointer text-gray-500 p-5" onClick={() => {
                    setShowWritePage(true)
                }}>3</div>
                <Link href={'/action'}><div className="cursor-pointer text-gray-500 p-5">4</div></Link>
                <Link href={'/'}><div className="cursor-pointer text-gray-500 p-5">5</div></Link>
            </div>
            <div className={`transition absolute w-full h-full bg-slate-100 rounded-t-lg translate-y-240 ${showWritePage && "animate-pageUp"}`}>
                <div className="w-full border-b-1 border-black flex">
                    <div className="p-2 cursor-pointer" onClick={() => {
                        setShowWritePage(false)
                    }}>닫기</div>
                    <div className="flex-1"></div>
                    <div className="p-2 cursor-pointer">저장</div>
                </div>
                <WriteSentence></WriteSentence>
            </div>
        </div>
    )
}