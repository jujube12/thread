import Nextauth from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";

import Navbar from "../component/navbar";

import { notFound } from "next/navigation"
import SearchBox from "./searchBox";

export default async function Search() {
    let session = await getServerSession()
    return (
        session
            ? <>
                <Navbar user={JSON.stringify(session)}></Navbar>
                <SearchBox></SearchBox>
            </>
            : notFound()
    )
}