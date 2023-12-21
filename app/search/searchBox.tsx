'use client'

import { ObjectId } from "mongodb"
import { useEffect, useState } from "react"

export default function SearchBox() {
    let [input, setInput] = useState('')
    let [data, setData] = useState<any[]>([])

    useEffect(() => {
        if (input.length > 0) {
            fetch('api/search/userSearch', { method: 'POST', body: input }).then(r => r.json())
                .then((result) => {
                    setData(result)
                })
        }
    }, [input])

    return (
        <div className="w-full h-full overflow-scroll">
            <div className="w-11/12 m-auto">
                <div className="text-2xl font-bold py-2">검색</div>
                <div className="relative">
                    <input className="rounded-md w-full h-10 px-3 py-2 bg-gray-200 focus:outline-none" onChange={(e) => {
                        setInput(e.target.value)
                    }}></input>
                    <div className="absolute top-2 right-3">검색</div>
                </div>
                {
                    input.length > 0
                        ? data.map((a, i) => {
                            return (
                                <div key={i} className="py-5 border-b-1 h-20 border-gray-200">
                                    <div className="flex px-3">
                                        <div className="w-8 h-8 bg-gray-500 rounded-full"></div>
                                        <div className="px-5">
                                            <div className="font-bold">{a.name}</div>
                                            <div className="text-sm">{a.intro}</div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                        : <div></div>
                }
            </div>
        </div>
    )
}