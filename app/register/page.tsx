'use client'

import { useEffect, useState } from "react"

export default function Register() {
    let [email, setEmail] = useState('')
    let [show, setShow] = useState('invisible')

    useEffect(() => {
        fetch('/api/register/checkEmail', { method: 'POST', body: email })
            .then(r => r.json())
            .then((r) => {
                setShow(r)
            })
    }, [email])

    return (
        <div className="w-full h-full overflow-hidden">
            <div className="h-1/2"></div>
            <form action={'/api/register/post'} method="POST" className="w-60 container mx-auto mt-5">
                <input name='name' type="text" placeholder="name" className="border-1 border-black block w-full my-1 p-2 rounded-md" maxLength={10}></input>
                <div className="relative">
                    <input name='email' type="text" placeholder="email" className="border-1 border-black block w-full my-1 p-2 rounded-md" onChange={(e: React.FormEvent<HTMLInputElement>) => {
                        setEmail(e.currentTarget.value)
                    }} maxLength={20}></input>
                    <div className={`absolute bottom-1 left-60 ml-1 bg-red-100 text-red-500 px-3 py-1 rounded-lg ${show}`}>!</div>
                </div>
                <input name='password' type="password" placeholder="password" className="border-1 border-black block w-full my-1 p-2 rounded-md"></input>
                <button type="submit" className="border-1 border-black block w-full my-1 p-2 rounded-md">가입</button>
            </form>
        </div>
    )
}