import { connectDB } from "@/util/database";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcrypt';
import { JWT } from "next-auth/jwt";
import { Session } from "next-auth";

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
        maxAge: 24 * 60 * 60
    },

    callbacks: {
        jwt: async ({ token, user }: { token: JWT, user: any }) => {
            token.user = { ...user };

            return token;
        },
        session: async ({ session, token }: { session: Session, token: JWT }) => {
            session.user = token.user;
            return session;
        },
    },

    secret: process.env.NEXTAUTH_SECRET
});