import { AuthValidator } from '@/utils'

describe('AuthValidator', () => {
	describe('email', () => {
		it('should return true for a valid email', () => {
			const validEmail = 'test@example.com'
			expect(AuthValidator.email(validEmail)).toBe(true)
		})

		it('should return false for an invalid email', () => {
			const invalidEmail = 'invalid-email'
			expect(AuthValidator.email(invalidEmail)).toBe(false)
		})
	})

	describe('password', () => {
		it('should return true for a valid password', () => {
			const validPassword = 'Password123!'
			expect(AuthValidator.password(validPassword)).toBe(true)
		})

		it('should return false for a password without uppercase letter', () => {
			const password = 'lowercase123!'
			expect(AuthValidator.password(password)).toBe(false)
		})

		it('should return false for a password without a digit', () => {
			const password = 'NoDigit@'
			expect(AuthValidator.password(password)).toBe(false)
		})

		it('should return false for a password without a special character', () => {
			const password = 'NoSpecialCharacter123'
			expect(AuthValidator.password(password)).toBe(false)
		})

		it('should return false for a too short password', () => {
			const shortPassword = 'Short1!'
			expect(AuthValidator.password(shortPassword)).toBe(false)
		})

		it('should return false for a too long password', () => {
			const longPassword = 'A'.repeat(121)
			expect(AuthValidator.password(longPassword)).toBe(false)
		})
	})
})
