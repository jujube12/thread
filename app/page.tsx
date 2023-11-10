import { connectDB } from "@/util/database"

export default async function Home() {
  let db = (await connectDB).db('thread')
  await db.collection('users').insertOne({ test: 'test' })

  return (
    <main className="">
      b
    </main>
  )
}
