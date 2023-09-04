import { TypeChecker } from '@/utils'

describe('TypeChecker', () => {
	describe('isString', () => {
		it('should return true when input is a string', () => {
			expect(TypeChecker.isString('Hello, World!')).toBe(true)
		})

		it('should return false when input is a number', () => {
			expect(TypeChecker.isString(42)).toBe(false)
		})

		it('should return false when input is a boolean', () => {
			expect(TypeChecker.isString(true)).toBe(false)
			expect(TypeChecker.isString(false)).toBe(false)
		})

		it('should return false when input is null or undefined', () => {
			expect(TypeChecker.isString(null)).toBe(false)
			expect(TypeChecker.isString(undefined)).toBe(false)
		})

		it('should return false when input is an object', () => {
			expect(TypeChecker.isString({ key: 'value' })).toBe(false)
		})

		it('should return false when input is an array', () => {
			expect(TypeChecker.isString(['a', 'b', 'c'])).toBe(false)
		})

		it('should return false when input is a function', () => {
			expect(TypeChecker.isString(() => {})).toBe(false)
		})

		it('should return false when input is a symbol', () => {
			const symbol = Symbol('test')
			expect(TypeChecker.isString(symbol)).toBe(false)
		})

		it('should return false when input is a date', () => {
			const date = new Date()
			expect(TypeChecker.isString(date)).toBe(false)
		})

		it('should return false when input is an instance of a class', () => {
			class MyClass {}
			const instance = new MyClass()
			expect(TypeChecker.isString(instance)).toBe(false)
		})

		it('should return false when input is a bigint', () => {
			const bigIntValue = BigInt(42)
			expect(TypeChecker.isString(bigIntValue)).toBe(false)
		})
	})
})
