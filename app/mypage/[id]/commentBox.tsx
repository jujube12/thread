import SentenceBox from "@/app/component/sentenceBox";
import { comment, senAndComInfo } from "@/app/mypage/[id]/page"

export default function CommentBox(props: comment) {
    let commentInfo: senAndComInfo[] = JSON.parse(props.comment)
    return (
        <div>
            {
                commentInfo.length > 0
                    ? commentInfo.map((a, i) => {
                        return (
                            <div>
                                <SentenceBox key={i} sentence={JSON.stringify(a.sentence)}></SentenceBox>
                                <div className="p-3">
                                    <div className="flex">
                                        <div className="bg-gray-400 h-9 w-9 rounded-full"></div>
                                        <div className="w-85% m-auto font-bold">{a.comment.userName}</div>
                                    </div>
                                    <div>
                                        <div className="w-1 mx-4 bg-gray-300"></div>
                                        <div className="w-85% m-auto">{a.comment.sentence}</div>
                                    </div>
                                </div>
                            </div >
                        )
                    })
                    : <div>아직 작성한 댓글이 없습니다.</div>
            }
        </div >
    )
}