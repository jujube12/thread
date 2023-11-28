import Nextauth from "@/pages/api/auth/[...nextauth]"
import { getServerSession } from 'next-auth'

import SignPage from "./component/signPage"

import LoginBtn from "./component/loginBtn"
import LogoutBtn from "./component/logoutBtn"

import Main from "./component/main"
import Search from "./search/page"
import Action from "./action/page"
import Register from "./register/page"
import { connectDB } from "@/util/database"

export default async function Home() {
  let session = await getServerSession(Nextauth)
  // let db = (await connectDB).db('thread')
  // await db.collection('comment').deleteMany()
  return (
    <main className="w-full h-full">
      {
        session
          ? <>
            <Main></Main>
            {/* <LogoutBtn></LogoutBtn> */}
          </>
          : <SignPage></SignPage>
      }
    </main>
  )
}
