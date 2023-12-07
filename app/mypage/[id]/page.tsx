import { connectDB } from "@/util/database";
import { getServerSession } from "next-auth";
import Nextauth from "@/pages/api/auth/[...nextauth]";

import { userInfo } from "@/app/component/navbar";

import Navbar from "@/app/component/navbar";
import MySenteceBox from "./mySentenceBox";
import { notFound } from "next/navigation";
import SignPage from "@/app/component/signPage";
import LogoutBtn from "@/app/component/logoutBtn";
import EditProfileBtn from "./editProflieBtn";

export default async function UserPage() {
    let session = await getServerSession(Nextauth)
    let userInfo: userInfo | undefined = undefined

    if (session) {
        userInfo = JSON.parse(JSON.stringify(session)).user
    }

    let db = (await connectDB).db('thread')
    let userSentence = await db.collection('sentence').find({ userEmail: userInfo?.email }).toArray();

    return (
        session
            ? <>
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
                    <MySenteceBox sentence={JSON.stringify(userSentence)}></MySenteceBox>
                </div>
            </>
            : notFound()
    )
}