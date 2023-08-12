import { AuthOptions } from "next-auth"
import { api } from "@/app/config/axios"
import { AxiosError } from "axios"
import CredentialsProvider from "next-auth/providers/credentials"
import NextAuth from "next-auth/next"
import AuthService from "@/app/services/auth.service"
import qs from "qs"

const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        try {
          const res = await AuthService.login({
            identifier: credentials?.email,
            password: credentials?.password,
          })

          const query = qs.stringify(
            {
              populate: {
                role: {
                  fields: ["name", "type"],
                },
                brandId: {
                  fields: ["id", "name"],
                },
                seller: {
                  fields: ["id", "name"],
                },
              },
            },
            { encodeValuesOnly: true }
          )

          // find role of current user
          const { data: roleData } = await api.get(`/users/me?${query}`, {
            headers: {
              Authorization: `Bearer ${res.data.jwt}`,
            },
          })

          const data = {
            ...roleData,
            jwt: res.data.jwt,
          }

          console.log(data)

          return {
            ...data,
          }
        } catch (err: any) {
          if (err instanceof AxiosError) {
            throw new Error(err.response?.data.error.message)
          } else {
            throw new Error(err)
          }
        }
      },
    }),
  ],
  callbacks: {
    jwt: ({ token, user }) => {
      return Promise.resolve({ ...token, ...user })
    },
    session: ({ session, token, user }) => {
      // @ts-ignore
      session.user.data = {
        id: token.id,
        username: token.username,
        role: token.role,
        walletAddress: token.walletAddress,
        addresses: token.addresses,
        email: token.email!!,
      }
      // @ts-ignore
      session.user.token = token.jwt

      return Promise.resolve(session)
    },
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: true,
  session: {
    strategy: "jwt",
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
export { authOptions }
