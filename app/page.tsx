import { connectDB } from "@/util/database"
import Link from "next/link"
import Nextauth from "@/pages/api/auth/[...nextauth]"
import { getServerSession } from 'next-auth'

import LoginBtn from "./component/loginBtn"
import LogoutBtn from "./component/logoutBtn"

import Main from "./component/main"
import Search from "./search/page"
import Action from "./action/page"
import UserPage from "./[userid]/page"
import Register from "./register/page"

export default async function Home() {
  // let db = (await connectDB).db('thread')
  // // await db.collection('users').deleteMany({ test: 'test' })
  let session = await getServerSession(Nextauth)
  // if (session) {
  //   console.log(session)
  // }

  return (
    <main className="w-full h-full">
      {
        session
          ? <>
            <Main></Main>
            {/* <LogoutBtn></LogoutBtn> */}
          </>
          : <>
            <div className="h-3/4"></div>
            <div className="w-60 text-center container mx-auto">
              <LoginBtn></LoginBtn>
              <Link href={'/register'}><div className="border-black border-1 rounded-md my-2 py-2">회원가입</div></Link>
            </div>
          </>
      }
    </main>
  )
}
