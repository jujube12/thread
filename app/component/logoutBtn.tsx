'use client'
import { signOut } from "next-auth/react"

export default function LogoutBtn() {
    return (
        <div className="w-24 text-center border-black border-1 rounded-md cursor-pointer" onClick={() => {
            signOut()
        }}>로그아웃</div>
    )
}