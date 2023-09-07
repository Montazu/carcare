import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { PrismaClient } from '@prisma/client'
import { compare } from 'bcrypt'

const prisma = new PrismaClient()

const handler = NextAuth({
	adapter: PrismaAdapter(prisma),
	providers: [
		CredentialsProvider({
			name: 'credentials',
			credentials: {
				email: { label: 'Email', type: 'text' },
				password: { label: 'Password', type: 'password' },
			},
			async authorize(credentials) {
				const user = await prisma.user.findFirst({
					where: { email: credentials?.email },
				})
				if (!user || !credentials) return null

				const passwordValid = await compare(credentials.password, user.passwordHash)
				if (!passwordValid) return null

				return { id: user.id, email: user.email }
			},
		}),
	],
	secret: process.env.NEXTAUTH_SECRET,
})

export { handler as GET, handler as POST }
