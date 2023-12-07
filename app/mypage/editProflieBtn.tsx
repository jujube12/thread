'use client'

import { useEffect, useState } from "react"

export default function EditProfileBtn() {
    let [showEditProfilePage, setShowEditProfilePage] = useState(false)
    let [save, setSave] = useState(false)

    useEffect(() => {
        if (save) {
            fetch('/api/profile/edit', { method: 'POST', body: JSON.stringify({ a: '왜' }) }).then(() => {
                setSave(false)
                setShowEditProfilePage(false)
            })
        }
    }, [save])

    return (
        <>
            <div className="border-1 w-2/5 border-gray-500 rounded-lg px-6 py-1 cursor-pointer" onClick={() => {
                setShowEditProfilePage(true)
            }}>프로필 편집</div>
            <div className={`absolute w-full h-full border-1 rounded-lg border-black bg-white top-176 left-0 ${showEditProfilePage && 'animate-editProfilePageUp'}`}>
                <div className="flex justify-between p-3 border-b-1 border-black">
                    <div className="w-1/3 cursor-pointer text-start" onClick={() => { setShowEditProfilePage(false) }}>취소</div>
                    <div className="w-1/3 font-bold">프로필 편집</div>
                    <div className="w-1/3 text-end text-blue-500 font-bold cursor-pointer" onClick={() => {
                        setSave(true)
                    }}>완료</div>
                </div>
                <div>
                    <input className="border-2"></input>
                    <input className="border-2"></input>
                    <input className="border-2"></input>
                </div>
            </div >
        </>
    )
}