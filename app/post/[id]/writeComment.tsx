'use client'

import { ObjectId } from "mongodb"
import { useState } from "react"

type sentenceID = {
    sentenceID: string
}

export default function WriteComment(props: sentenceID) {
    let [textLength, setTextLength] = useState(0)
    return (
        <div className="relative">
            <form action={'/api/comment/write'} method="POST">
                <div className="w-5/6 h-60 my-3 mx-auto">
                    <textarea name='sentence' className="w-full h-full resize-none focus:outline-none" placeholder="글을 입력하세요" maxLength={200} onChange={(e) => {
                        setTextLength(e.target.value.length)
                    }}></textarea>
                    <input className="hidden" name='sentenceID' value={JSON.parse(props.sentenceID)}></input>
                </div>
                <div>
                    {
                        textLength > 0
                            ? <button type='submit' className="absolute right-0 top-2 pr-2">제출</button>
                            : <></>
                    }
                </div>
            </form>
        </div>
    )
}