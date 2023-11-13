import { connectDB } from "@/util/database"
import Link from "next/link"


import MainHome from "./home/page"
import Search from "./search/page"
import Action from "./action/page"
import UserPage from "./[userid]/page"
import Register from "./register/page"

export default async function Home() {
  let db = (await connectDB).db('thread')
  // await db.collection('users').deleteMany({ test: 'test' })

  return (
    <main className="">
      <div>
        <Link href={'/register'}>회원가입</Link>
      </div>
    </main >
  )
}
