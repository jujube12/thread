import { ObjectId } from "mongodb"

type comment = {
    comment: string
}

type commentInfo = {
    _id: ObjectId,
    sentence: string,
    sentenceID: string,
    userEmail: string,
    userName: string,
    likes: number,
    save: number,
    comment: number,
    date: string,
    time: string
}

export default function CommentListBox(props: comment) {
    let commentInfoList: commentInfo[] = JSON.parse(props.comment)

    return (
        <div className="">
            {
                commentInfoList.map((a, i) => {
                    return (
                        <div key={i} className="p-3 flex">
                            <div className="w-8 h-8 rounded-full bg-gray-400"></div>
                            <div className="px-3 pt-1 w-5/6">
                                <div className="font-bold">{a.userName}</div>
                                {a.sentence}
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}