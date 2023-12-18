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
import FollowingList from "./followingList";

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
export type followList = {
    follower: string[],
    following: string[],
}

export default async function UserPage(props: url) {
    // 로그인중인 유저 정보
    let session = await getServerSession(Nextauth)
    let userInfo: userInfo | undefined = undefined
    if (session) { userInfo = JSON.parse(JSON.stringify(session)).user }
    let OuserInfo = undefined // 다른 유저 정보
    let userSentence // 유저 작성글
    let userComment //유저 댓글(작성글과 함께 보여줄 용도, 단독 사용X)
    let senAndCom: { sentence: WithId<Document> | null; comment: WithId<Document>; }[] = [] //유저 작성글과 댓글
    let isFollowed = false // 로그인한 유저가 해당 페이지 유저를 팔로우했는지 여부
    let followingList: string[] = [] // 유저 팔로잉 리스트
    let followerList: string[] = [] // 유저 팔로워 리스트
    let db = (await connectDB).db('thread')

    if (userInfo?.email === props.params.id.replace(/%40/, '@')) { // 현재 페이지가 사용자 본인의 페이지일 때
        userSentence = await db.collection('sentence').find({ userEmail: userInfo?.email }).toArray();
        userComment = await db.collection('comment').find({ userEmail: userInfo?.email }).toArray();
        await Promise.all(userComment.map(async (a: any) => {
            let data = await db.collection('sentence').findOne({ _id: new ObjectId(a.sentenceID) })
            senAndCom.push({ sentence: data, comment: a });
        }))
        // 팔로우, 팔로잉 목록
        let q = { email: userInfo.email }
        let o = { projection: { following: 1, follower: 1 } }
        let user = await db.collection('users').findOne(q, o);
        if (user?.follower === undefined) {
            followerList = []
        } else {
            followerList = [...user?.follower]
        }
        if (user?.following === undefined) {
            followingList = []
        } else {
            followingList = [...user?.following]
        }
    } else { // 현재 페이지가 다른 사용자의 페이지일 때
        const query = { email: props.params.id.replace(/%40/, '@') }
        const option = { projection: { name: 1, email: 1, intro: 1, follower: 1 } }
        OuserInfo = await db.collection('users').findOne(query, option);
        userSentence = await db.collection('sentence').find({ userEmail: OuserInfo?.email }).toArray();
        userComment = await db.collection('comment').find({ userEmail: OuserInfo?.email }).toArray();
        await Promise.all(userComment.map(async (a: any) => {
            let data = await db.collection('sentence').findOne({ _id: new ObjectId(a.sentenceID) })
            senAndCom.push({ sentence: data, comment: a });
        }))
        // 유저 팔로우 여부
        if (OuserInfo?.follower) {
            if (OuserInfo?.follower.indexOf(userInfo?.email) >= 0) {
                isFollowed = true
            } else { isFollowed = false }
        } else {
            isFollowed = false
        }
        // 팔로우, 팔로잉 목록
        let q = { email: OuserInfo?.email }
        let o = { projection: { following: 1, follower: 1 } }
        let user = await db.collection('users').findOne(q, o);
        if (user?.follower === undefined) {
            followerList = []
        } else {
            followerList = [...user?.follower]
        }
        if (user?.following === undefined) {
            followingList = []
        } else {
            followingList = [...user?.following]
        }
    }
    return (
        session
            ? userInfo?.email === props.params.id.replace(/%40/, '@')
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
                        <FollowingList follower={followerList} following={followingList}></FollowingList>
                        <div className="flex justify-around text-center mt-3 mb-10">
                            <EditProfileBtn user={JSON.stringify(session)}></EditProfileBtn>
                            <div className="border-1 w-2/5 border-gray-500 rounded-lg px-6 py-1 cursor-pointer">프로필 공유</div>
                        </div>
                        <MySenteceBox sentence={JSON.stringify(userSentence)} comment={JSON.stringify(senAndCom)} ></MySenteceBox>
                    </div>
                </>
                : OuserInfo
                    ? <>{/** 타유저 페이지 */}
                        <Navbar user={JSON.stringify(session)}></Navbar>
                        <div className="h-full overflow-y-scroll">
                            <div className="flex m-5">
                                <div className="flex-1">
                                    <div className="text-2xl font-bold">{OuserInfo?.name}</div>
                                    <div>{OuserInfo?.email}</div>
                                </div>
                                <div>
                                    <div className="w-14 h-14 bg-gray-300 rounded-full"></div>
                                </div>
                            </div>
                            <FollowingList follower={followerList} following={followingList}></FollowingList>
                            <div className="flex justify-around text-center mt-7 mb-10">
                                <FollowBtn isFollowed={isFollowed} user={userInfo?.email} ouser={OuserInfo?.email}></FollowBtn>
                                <div className="border-1 w-2/5 border-gray-500 rounded-lg px-6 py-1 cursor-pointer">언급</div>
                            </div>
                            <MySenteceBox sentence={JSON.stringify(userSentence)} comment={JSON.stringify(senAndCom)} ></MySenteceBox>
                        </div>
                    </>
                    : // 유저가 없을 때
                    notFound()
            : notFound()
    )
}