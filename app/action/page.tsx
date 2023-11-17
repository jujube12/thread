import Nextauth from "@/pages/api/auth/[...nextauth]"
import { getServerSession } from 'next-auth'

import Navbar from "../component/navbar"

import { notFound } from "next/navigation"

export default async function Action() {
    let session = await getServerSession(Nextauth)
    return (
        session
            ? <>
                <Navbar></Navbar>
                <div>
                    action
                </div>
            </>
            : notFound()
    )
}