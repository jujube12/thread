'use client'
import { signOut } from "next-auth/react"

export default function LogoutBtn() {
    return (
        <div className="cursor-pointer text-xs text-gray-400" onClick={() => {
            signOut()
        }}>로그아웃</div>
    )
}