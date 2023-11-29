import Nextauth from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";

import Navbar from "../component/navbar";

import { notFound } from "next/navigation"

export default async function Search() {
    let session = await getServerSession()
    return (
        session
            ? <>
                <Navbar user={JSON.stringify(session)}></Navbar>
                <div>
                    search
                </div>
            </>
            : notFound()
    )
}