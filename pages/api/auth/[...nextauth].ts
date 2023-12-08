import { connectDB } from "@/util/database";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcrypt';

export default NextAuth({
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "email", type: "text" },
                password: { label: "password", type: "password" },
            },

            async authorize(credentials) {
                if (credentials != null) {
                    let db = (await connectDB).db('thread');
                    let user = await db.collection('users').findOne({ email: credentials.email })
                    if (!user) {
                        return null
                    }
                    const pwcheck = await bcrypt.compare(credentials.password, user.password);
                    if (!pwcheck) {
                        return null
                    }
                    return user as any
                } else {
                    return null
                }
            }
        })
    ],

    session: {
        strategy: 'jwt',
        maxAge: 3 * 24 * 60 * 60
    },

    callbacks: {
        jwt: async ({ token, user, trigger, session }) => {
            if (user) {
                token.user = { ...user };
            }
            if (trigger === 'update' && session.name) { // session 업데이트 (닉네임 수정)
                token.name = session.name
            }

            return token;
        },
        session: async ({ session, token }: { session: any, token: any }) => {
            session.user.name = token.name;
            session.user.email = token.email;

            return session;
        },
    },

    secret: process.env.NEXTAUTH_SECRET
});