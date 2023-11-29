import { getServerSession } from "next-auth";
import Nextauth from "@/pages/api/auth/[...nextauth]";

import Navbar from "@/app/component/navbar";
import { notFound } from "next/navigation";

export default async function UserPage() {
    let session = await getServerSession(Nextauth)

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