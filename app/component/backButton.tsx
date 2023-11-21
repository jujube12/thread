'use client'

import { useRouter } from "next/navigation"

export default function BackButton() {
    let router = useRouter()

    return (
        <div className="w-full flex justify-between">
            <div className="p-2 cursor-pointer w-16" onClick={() => {
                router.back()
            }}>뒤로</div>
            <div className="font-bold p-2 w-16">thread</div>
            <div className="w-16 p-2"> </div>
        </div>
    )
}