'use client'

import { useState } from "react"

export default function WriteSentence() {
    let [textLength, setTextLength] = useState(0)
    return (
        <div className="relative">
            <form action={'/api/sentence/write'} method="POST">
                <div className="w-5/6 h-32 my-3 mx-auto">
                    <textarea name='sentence' className="w-full h-full resize-none focus:outline-none" placeholder="글을 입력하세요" maxLength={200} onChange={(e) => {
                        setTextLength(e.target.value.length)
                    }}></textarea>
                </div>
                <div>
                    {
                        textLength > 0
                            ? <button type='submit' className="absolute right-0 bottom-37 pr-2">제출</button>
                            : <></>
                    }
                </div>
            </form>
        </div>
    )
}