export default function Register() {
    return (
        <div>
            <form action={'/api/register/post'} method="POST" className="bg-slate-200">
                <input name='name' type="text" className="bg-slate-400"></input>
                <input name='email' type="text" className="border-1"></input>
                <input name='password' type="password" className="border-1"></input>
                <button type="submit">가입</button>
            </form>
        </div>
    )
}