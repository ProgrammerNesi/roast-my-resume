import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "@/lib/dbConnect";
import bcrypt from 'bcrypt'
import UserModel from "@/model/User";
export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {},

            async authorize(credentials){
                const {email,password}=credentials;

                try{
                    await dbConnect();

                    const user=await UserModel.findOne({email});

                    if(!user){
                        return null;
                    }

                    const passwordMatch=await bcrypt.compare(password,user.password)

                    if(!passwordMatch){
                        return null;
                    }

                    return user


                }
                catch(error){
                    console.log(error)
                }
            },
        }),
    ],

    session:{
        strategy: "jwt",
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user._id?.toString?.() ?? user.id ?? token.id;
                token.username = user.username ?? token.username;
                token.email = user.email ?? token.email;
            }
            return token;
        },
        async session({ session, token }) {
            if (session?.user) {
                session.user.id = token.id;
                session.user.username = token.username;
                session.user.email = token.email ?? session.user.email;
            }
            return session;
        }
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages:{
        signIn: "/signin",
    }
}


const handler = NextAuth(authOptions);


export { handler as GET, handler as POST };