export class AuthValidator {
	static email(email: string): boolean {
		const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
		return regex.test(email)
	}

	static password(password: string): boolean {
		if (password.length < 10 || password.length > 120) return false
		const hasUppercase = /[A-Z]/.test(password)
		const hasDigit = /\d/.test(password)
		const hasSpecialCharacter = /[!@#\$%\^&\*\(\)_\+\-=\[\]\{\};:'",<>\./?\\|]/.test(password)
		return hasUppercase && hasDigit && hasSpecialCharacter
	}
}
