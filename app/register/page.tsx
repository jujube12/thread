'use client'

import { useEffect, useState } from "react"

export default function Register() {
    let [input, setInput] = useState({ name: '', email: '', password: '' })
    let [show, setShow] = useState('invisible')
    let [btnShow, setBtnShow] = useState(true)

    useEffect(() => {
        fetch('/api/register/checkRegister', { method: 'POST', body: JSON.stringify(input) })
            .then(r => r.json())
            .then((r) => {
                setShow(r.noti)
                setBtnShow(r.btn)
            })
    }, [input])

    return (
        <div className="w-full h-full overflow-hidden">
            <div className="h-1/2"></div>
            <form action={'/api/register/post'} method="POST" className="w-60 container mx-auto mt-5">
                <div className="relative">
                    <input name='name' type="text" placeholder="name" className="border-1 border-black block w-full my-1 p-2 rounded-md" onChange={(e: React.FormEvent<HTMLInputElement>) => {
                        let copy = { ...input }
                        copy.name = e.currentTarget.value
                        setInput(copy)
                    }} maxLength={10}></input>
                </div>
                <div className="relative">
                    <input name='email' type="text" placeholder="email" className="border-1 border-black block w-full my-1 p-2 rounded-md" onChange={(e: React.FormEvent<HTMLInputElement>) => {
                        let copy = { ...input }
                        copy.email = e.currentTarget.value
                        setInput(copy)
                    }} maxLength={20}></input>
                    <div className={`absolute bottom-1 left-60 ml-1 bg-red-100 text-red-500 px-3 py-1 rounded-lg ${show}`}>!</div>
                </div>
                <div className="relative">
                    <input name='password' type="password" placeholder="password" className="border-1 border-black block w-full my-1 p-2 rounded-md" onChange={(e: React.FormEvent<HTMLInputElement>) => {
                        let copy = { ...input }
                        copy.password = e.currentTarget.value
                        setInput(copy)
                    }}></input>
                </div>
                <button type="submit" className="border-1 border-black block w-full my-1 p-2 rounded-md disabled" disabled={btnShow}>가입</button>
            </form>
        </div >
    )
}