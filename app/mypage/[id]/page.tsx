import { connectDB } from "@/util/database";
import { getServerSession } from "next-auth";
import Nextauth from "@/pages/api/auth/[...nextauth]";

import { userInfo } from "@/app/component/navbar";

import Navbar from "@/app/component/navbar";
import MySenteceBox from "./mySentenceBox";

import LogoutBtn from "@/app/component/logoutBtn";
import EditProfileBtn from "./editProflieBtn";

import { Document, ObjectId, WithId } from "mongodb";
import { sentence } from "@/app/component/sentenceBox";
import { notFound } from "next/navigation";
import FollowBtn from "./followBtn";

export type mySenAndCom = {
    sentence: string,
    comment: string
}
export type comment = {
    comment: string
}
export type senAndComInfo = {  //comment 형식
    sentence: sentence,
    comment: {
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
}
export type url = { //url에 있는 id props로 가져오는 형식
    params: { id: string },
    searchParams: object
}

export type followBtnProp = {
    isFollowed: boolean,
    user: string | undefined,
    ouser: string
}

export default async function UserPage(props: url) {
    let session = await getServerSession(Nextauth)
    let userInfo: userInfo | undefined = undefined
    if (session) {
        userInfo = JSON.parse(JSON.stringify(session)).user
    }
    let db = (await connectDB).db('thread')

    // 사용자 본인이 작성한 글
    let userSentence = await db.collection('sentence').find({ userEmail: userInfo?.email }).toArray();
    // 사용자 본인이 작성한 댓글
    let userComment = await db.collection('comment').find({ userEmail: userInfo?.email }).toArray();
    // 사용자가 작성한 댓글과 본문 배열
    let senAndCom: { sentence: WithId<Document> | null; comment: WithId<Document>; }[] = []
    await Promise.all(userComment.map(async (a: any) => {
        let data = await db.collection('sentence').findOne({ _id: new ObjectId(a.sentenceID) })
        senAndCom.push({ sentence: data, comment: a });
    }))

    // 다른 유저페이지에서 보여줄 다른 유저가 작성한 글과 댓글
    const query = { email: props.params.id.replace(/%40/, '@') }
    const option = { projection: { name: 1, email: 1, intro: 1, follower: 1 } }
    // 타 유저 정보
    let users = await db.collection('users').findOne(query, option);
    let usersSentence = await db.collection('sentence').find({ userEmail: users?.email }).toArray();
    let usersComment = await db.collection('comment').find({ userEmail: users?.email }).toArray();
    let osenAndCom: { sentence: WithId<Document> | null; comment: WithId<Document>; }[] = []
    await Promise.all(usersComment.map(async (a: any) => {
        let data = await db.collection('sentence').findOne({ _id: new ObjectId(a.sentenceID) })
        osenAndCom.push({ sentence: data, comment: a });
    }))

    // 유저 팔로우 여부
    let isFollowed = false
    if (users?.follower) {
        if (users?.follower.indexOf(userInfo?.email) >= 0) {
            isFollowed = true
        } else {
            isFollowed = false
        }
    } else {
        isFollowed = false
    }

    return (
        userInfo?.email === props.params.id.replace(/%40/, '@')
            ? <>{/* 유저 본인 페이지 */}
                <Navbar user={JSON.stringify(session)}></Navbar>
                <div className="h-full overflow-y-scroll">
                    <div className="flex m-5">
                        <div className="flex-1">
                            <div className="text-2xl font-bold">{userInfo?.name}</div>
                            <div>{userInfo?.email}</div>
                            <LogoutBtn></LogoutBtn>
                        </div>
                        <div>
                            <div className="w-14 h-14 bg-gray-300 rounded-full"></div>
                        </div>
                    </div>
                    <div className="flex justify-around text-center mt-7 mb-10">
                        <EditProfileBtn user={JSON.stringify(session)}></EditProfileBtn>
                        <div className="border-1 w-2/5 border-gray-500 rounded-lg px-6 py-1 cursor-pointer">프로필 공유</div>
                    </div>
                    <MySenteceBox sentence={JSON.stringify(userSentence)} comment={JSON.stringify(senAndCom)} ></MySenteceBox>
                </div>
            </>
            : users ?
                <>{/** 타유저 페이지 */}
                    <Navbar user={JSON.stringify(session)}></Navbar>
                    <div className="h-full overflow-y-scroll">
                        <div className="flex m-5">
                            <div className="flex-1">
                                <div className="text-2xl font-bold">{users?.name}</div>
                                <div>{users?.email}</div>
                            </div>
                            <div>
                                <div className="w-14 h-14 bg-gray-300 rounded-full"></div>
                            </div>
                        </div>
                        <div className="flex justify-around text-center mt-7 mb-10">
                            <FollowBtn isFollowed={isFollowed} user={userInfo?.email} ouser={users?.email}></FollowBtn>
                            <div className="border-1 w-2/5 border-gray-500 rounded-lg px-6 py-1 cursor-pointer">언급</div>
                        </div>
                        <MySenteceBox sentence={JSON.stringify(usersSentence)} comment={JSON.stringify(osenAndCom)} ></MySenteceBox>
                    </div>
                </>
                : // 유저가 없을 때
                notFound()
    )
}