import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { jwtDecode } from 'jwt-decode'


export const AuthOptions: NextAuthOptions = {

    pages: {
        signIn: '/login'
    },

    providers: [
        Credentials({
            name: 'credential',
            credentials: {
                email: {},
                password: {}
            },
            authorize: async (credentials) => {

                const response = await fetch(`${process.env.BASE_URL}/auth/signin`, {
                    method: 'post',
                    body: JSON.stringify({
                        email: credentials?.email,
                        password: credentials?.password
                    }),
                    headers: { 'Content-Type': 'application/json' }
                })

                const payload = await response.json()

                if (payload.message == 'success') {

                    const token: { id: string } = jwtDecode(payload.token)

                    return {
                        id: token.id,
                        user: payload.user,
                        token: payload.token,
                    }
                } else {
                    throw new Error(payload.message || 'wrong crednetials')
                }

            }
        }),
    ],

    callbacks: {
        async jwt({ token, user }) {

            if(user){                
                token.user = user?.user
                token.token = user.token
            }

            return token  // encytpted tokken by secret key == only server
        },


        async session({ session , token }) {
            
            
            session.user = token.user
            
            // encytpted tokken by secret key == only client
            return session
        },
    }


}