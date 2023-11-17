'use client'

import { ObjectId } from "mongodb"

type sentence = {
    sentence: string
}

type sentenceInfo = {
    _id: ObjectId,
    sentence: string,
    userEmail: string,
    userName: string,
    likes: number,
    date: string,
    time: string
}

export default function SentenceBox(props: sentence) {
    let sentenceInfo: sentenceInfo = JSON.parse(props.sentence)

    return (
        <div className="h-32 border-1">
            {
                sentenceInfo.sentence
            }
        </div>
    )
}