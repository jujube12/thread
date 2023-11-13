export default function Register() {
    return (
        <div className="w-full h-full overflow-hidden">
            <div className="h-1/2"></div>
            <form action={'/api/register/post'} method="POST" className="w-60 container mx-auto mt-5">
                <input name='name' type="text" placeholder="name" className="border-1 border-black block w-full my-1 p-2 rounded-md"></input>
                <input name='email' type="text" placeholder="email" className="border-1 border-black block w-full my-1 p-2 rounded-md"></input>
                <input name='password' type="password" placeholder="password" className="border-1 border-black block w-full my-1 p-2 rounded-md"></input>
                <button type="submit" className="border-1 border-black block w-full my-1 p-2 rounded-md">가입</button>
            </form>
        </div>
    )
}