import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'
import { hash } from 'bcrypt'
import { AuthValidator, DataProcessor, TypeChecker } from '@/utils'

interface Body {
	email: unknown
	password: unknown
}

const prisma = new PrismaClient()

export const POST = async (request: Request) => {
	const emptyBody = { email: '', password: '' }
	const { email, password }: Body = await request.json().catch(() => emptyBody)
	const details = []

	if (!email || !password) {
		const message = 'Required field'
		!email && details.push({ field: 'email', message })
		!password && details.push({ field: 'password', message })
		const error = { message: 'The request contains incomplete data', details }
		return NextResponse.json({ error }, { status: 400 })
	}

	const isEmailString = TypeChecker.isString(email)
	const isPasswordString = TypeChecker.isString(password)

	if (!isEmailString || !isPasswordString) {
		const message = 'Invalid data type'
		!email && details.push({ field: 'email', message })
		!password && details.push({ field: 'password', message })
		const error = { message: 'The request contains incomplete data', details }
		return NextResponse.json({ error }, { status: 400 })
	}

	const processedEmail = DataProcessor.removeAllSpacesAndConvertToLowerCase(email)
	const processedPassword = DataProcessor.trimSpaces(password)

	const isEmailValid = AuthValidator.email(processedEmail)
	const isPasswordValid = AuthValidator.password(processedPassword)

	if (!isEmailValid || !isPasswordValid) {
		const message = 'Invalid data'
		!email && details.push({ field: 'email', message })
		!password && details.push({ field: 'password', message })
		const error = { message: 'The request contains invalid data', details }
		return NextResponse.json({ error }, { status: 400 })
	}

	const user = await prisma.user.findUnique({ where: { email } })

	if (user) {
		const error = { message: 'An account with this email address already exists' }
		return NextResponse.json({ error }, { status: 409 })
	}

	const passwordHash = await hash(password, 10)
	const newUser = await prisma.user.create({ data: { email, passwordHash } })

	return NextResponse.json({ newUser })
}
