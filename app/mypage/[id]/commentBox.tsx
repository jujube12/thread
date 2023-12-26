'use client'

import SentenceBox from "@/app/component/sentenceBox";
import { comment, senAndComInfo } from "@/app/mypage/[id]/page"
import { useRouter } from "next/navigation"
import ReactionBox from "@/app/post/[id]/reactionBox";

export default function CommentBox(props: comment) {
    let commentInfo: senAndComInfo[] = JSON.parse(props.comment)
    let router = useRouter()
    return (
        <div>
            {
                commentInfo.length > 0
                    ? commentInfo.map((a, i) => {
                        return (
                            <div key={i} className="p-3">
                                <div className="flex">
                                    <div className="bg-gray-400 h-9 w-9 rounded-full"></div>
                                    <div className="w-85% m-auto font-bold">{a.sentence.userName}</div>
                                </div>
                                <div className="flex mt-2 cursor-pointer" onClick={() => { router.push(`/post/${a.sentence._id}`) }}>
                                    <div className="w-1 mx-4 bg-gray-300"></div> {/** 작대기 */}
                                    <div className="w-85% m-auto">
                                        <div>
                                            <div>{a.sentence.sentence}</div>
                                            <ReactionBox sentence={JSON.stringify(a.sentence)}></ReactionBox>
                                        </div>
                                        <div>
                                            <div className="flex">
                                                <div className="bg-gray-400 h-9 w-9 rounded-full"></div>
                                                <div className="w-85% m-auto font-bold">{a.comment.userName}</div>
                                            </div>
                                            <div className="mt-2">{a.comment.sentence}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                    : <div>아직 작성한 댓글이 없습니다.</div>
            }
        </div >
    )
}