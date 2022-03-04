import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import CredentialsProvider from "next-auth/providers/credentials";

import { api } from "../../../services/api";

import { Client as FaunaClient } from "faunadb";
import { FaunaAdapter } from "@next-auth/fauna-adapter";
const client = new FaunaClient({ // opcional
    secret: process.env.FAUNADB_KEY,
})

export default NextAuth({
    secret: process.env.OAUTH_SECRET,
    // pages: {
    //     signIn: '/',
    // },
    providers: [
        CredentialsProvider({ // custom provider
            id: "domain-login",
            name: "Domain Account",
            credentials: {
                email: { label: "email", type: "text ", placeholder: "" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials, req) {
                try {
                    let email = credentials.email;
                    let password = credentials.password;
                    const response = await api.post('/auth/sign-in', {
                        email,
                        password,
                    });

                    // console.log(response.headers); // pegar acess token por aqui
                    const user = await response.data;

                    if (user) {
                        return user;
                    } else {
                        return null;
                    }

                } catch (error) {
                    console.log(error);
                    return null;
                }



            },
        }),
        GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
            authorization: {
                params: {
                    scope: 'read:user',
                },
            },
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code"
                }
            }
        }),
        FacebookProvider({
            clientId: process.env.FACEBOOK_ID,
            clientSecret: process.env.FACEBOOK_SECRET
        })
    ],
    adapter: FaunaAdapter(client), // opcional: grava os usuarios no banco
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            return true;
        },

        async session({ session, user, token }) {
            return session;
        },
        async jwt({ token, user, account, profile, isNewUser }) {
            return token
        }
    }
})