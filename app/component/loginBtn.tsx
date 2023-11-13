'use client'
import { signIn } from "next-auth/react"

export default function LoginBtn() {
    return (
        <div className="border-black border-1 rounded-md my-2 py-2 cursor-pointer" onClick={() => {
            signIn()
        }}>로그인</div>
    )
}