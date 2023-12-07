'use client'

import { useEffect, useState } from "react"
import { user, userInfo } from "@/app/component/navbar"


export default function EditProfileBtn(props: user) {
    let userInfo: userInfo = JSON.parse(props.user).user

    let [showEditProfilePage, setShowEditProfilePage] = useState(false)
    let [save, setSave] = useState(false)

    let [userName, setUserName] = useState(userInfo.name)
    let [userIntro, setUserIntro] = useState('')

    if (userInfo.intro) {
        setUserIntro(userInfo.intro)
    }

    useEffect(() => {
        if (save) {
            fetch('/api/profile/edit', { method: 'POST', body: JSON.stringify({ name: userName, intro: userIntro }) }).then(() => {
                setSave(false)
                setShowEditProfilePage(false)
                window.location.href = `/mypage/${userInfo.email}`
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
                <div className="w-full h-full bg-gray-200 pt-1">
                    <div className="w-2/3 m-auto mt-52 border-1 border-black bg-white rounded-xl py-10">
                        <div className="flex w-3/4 m-auto">
                            <div className="w-3/4">
                                <div className="text-start font-bold mb-2">이름</div>
                                <input className="text-sm w-full border-b-1 border-black" placeholder={userInfo.name} onChange={(e) => {
                                    setUserName(e.target.value)
                                }}></input>
                            </div>
                            <div className="w-1/4 relative">
                                <div className="absolute rounded-full right-0 w-10 h-10 bg-gray-500"></div>
                            </div>
                        </div>
                        <div className="w-3/4 m-auto mt-5">
                            <div className="text-start font-bold mb-2">소개</div>
                            <input className="text-sm w-full border-b-1 border-black" placeholder={userInfo.intro ? userInfo.intro : '+ 소개 작성'} onChange={(e) => {
                                setUserIntro(e.target.value)
                            }}></input>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}