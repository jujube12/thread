'use client'

import { sentence, sentenceInfo } from "@/app/component/sentenceBox"
import SentenceBox from "@/app/component/sentenceBox"
import { useState } from "react"

export default function MySenteceBox(props: sentence) {
    let sentenceInfo: sentenceInfo[] = JSON.parse(props.sentence)
    let [show, setShow] = useState(true)
    return (
        <>
            <div className="flex justify-around">
                <div className={`w-1/2 text-center cursor-pointer pb-2 border-b-2 ${show && `border-black`}`} onClick={() => {
                    setShow(true)
                }}>스레드</div>
                <div className={`w-1/2 text-center cursor-pointer pb-2 border-b-2 ${show ? '' : `border-black`}`} onClick={() => {
                    setShow(false)
                }}>답글</div>
            </div>
            {
                show
                    ? <div className="mb-16">
                        {
                            sentenceInfo.length > 0
                                ? sentenceInfo.map((a, i) => {
                                    return (
                                        <SentenceBox key={i} sentence={JSON.stringify(a)}></SentenceBox>
                                    )
                                })
                                : <div>아직 작성한 글이 없습니다.</div>
                        }
                    </div>
                    : <div>아직 작성한 댓글이 없습니다.</div>
            }
        </>
    )
}