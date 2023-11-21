import { connectDB } from "@/util/database"
import { ObjectId } from "mongodb"
import Nextauth from "@/pages/api/auth/[...nextauth]"
import { getServerSession } from 'next-auth'

import ReactionBox from "./reactionBox"
import BackButton from "@/app/component/backButton"
import Navbar from "@/app/component/navbar"

import { notFound } from "next/navigation"

type param = {
    params: {
        id: string
    },
    searchParams: {}
}

export default async function Post(props: param) {
    let db = (await connectDB).db('thread')
    let result = await db.collection('sentence').findOne({ _id: new ObjectId(props.params.id) })
    let session = await getServerSession(Nextauth)

    return (
        session
            ?
            <>
                <Navbar></Navbar>
                <div className="h-full w-full">
                    <BackButton></BackButton>
                    <div className="p-3">
                        <div className="flex">
                            <div className="bg-gray-400 h-9 w-9 rounded-full"></div>
                            <div className="w-85% m-auto font-bold">{result?.userName}</div>
                        </div>
                        <div className="flex mt-3 cursor-pointer">
                            <div className="w-full">{result?.sentence}</div>
                        </div>
                        <ReactionBox likes={result?.likes}></ReactionBox>
                    </div>
                </div>
            </>
            : notFound()
    )
}