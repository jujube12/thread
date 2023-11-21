'use client'

type likes = {
    likes: number
}

export default function ReactionBox(props: likes) {
    return (
        <div className="flex pt-5 text-xs text-gray-500">
            <div className="pr-5"><span className="cursor-pointer" onClick={() => {

            }}>좋아요</span> {props.likes > 0 ? props.likes : <></>}</div>
            <div className="pr-5"><span className="cursor-pointer" onClick={() => {

            }}>저장</span> {props.likes > 0 ? props.likes : <></>}</div>
            <div className="pr-5"><span className="cursor-pointer" onClick={() => {

            }}>댓글</span> {props.likes > 0 ? props.likes : <></>}</div>
        </div>
    )
} 