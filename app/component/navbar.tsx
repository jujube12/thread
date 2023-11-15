
import Link from "next/link"

export default function Navbar() {
    return (
        <div className="absolute w-full bottom-0 border-t-2 flex justify-around">
            <Link href={'/'}><div className="cursor-pointer text-gray-500 p-5">1</div></Link>
            <Link href={'/search'}><div className="cursor-pointer text-gray-500 p-5">2</div></Link>
            <Link href={'/'}><div className="cursor-pointer text-gray-500 p-5">3</div></Link>
            <Link href={'/action'}><div className="cursor-pointer text-gray-500 p-5">4</div></Link>
            <Link href={'/'}><div className="cursor-pointer text-gray-500 p-5">5</div></Link>
        </div>
    )
}