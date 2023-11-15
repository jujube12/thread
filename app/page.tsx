import Nextauth from "@/pages/api/auth/[...nextauth]"
import { getServerSession } from 'next-auth'

import SignPage from "./component/signPage"

import LoginBtn from "./component/loginBtn"
import LogoutBtn from "./component/logoutBtn"

import Main from "./component/main"
import Search from "./search/page"
import Action from "./action/page"
import Register from "./register/page"

export default async function Home() {
  let session = await getServerSession(Nextauth)

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
