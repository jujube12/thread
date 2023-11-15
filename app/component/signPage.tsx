import LoginBtn from "./loginBtn"
import Link from "next/link"

export default function SignPage() {
    return (
        <>
            <div className="h-3/4"></div>
            <div className="w-60 text-center container mx-auto">
                <LoginBtn></LoginBtn>
                <Link href={'/register'}><div className="border-black border-1 rounded-md my-2 py-2">회원가입</div></Link>
            </div>
        </>
    )
}