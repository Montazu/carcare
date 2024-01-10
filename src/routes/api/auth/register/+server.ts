import jwt from 'jsonwebtoken';
import { hash } from 'bcrypt';

import { json } from '@sveltejs/kit';

import { db } from '$lib/database';
import { getConfig } from '$lib/config';

interface UserCredentials {
	email: string;
	password: string;
}

const { ACCESS_TOKEN, REFRESH_TOKEN } = getConfig();

export const POST = async ({ request }) => {
	const { email, password }: UserCredentials = await request.json();
	if (!email || !password) {
		const message = 'The request contains incomplete data';
		return json({ error: { message } }, { status: 400 });
	}

	const user = await db.user.findUnique({ where: { email } });
	if (user) {
		const message = 'An account with this email address already exists';
		return json({ error: { message } }, { status: 409 });
	}

	const passwordHash = await hash(password, 10);
	const { id } = await db.user.create({ data: { email, passwordHash } });

	const payload = { id, email };
	const accessToken = jwt.sign(payload, ACCESS_TOKEN, { expiresIn: '15m' });
	const refreshToken = jwt.sign(payload, REFRESH_TOKEN, { expiresIn: '7d' });

	const expiresIn = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
	await db.session.create({ data: { userId: id, refreshToken, expiresIn } });

	return json({ accessToken, refreshToken }, { status: 201 });
};
