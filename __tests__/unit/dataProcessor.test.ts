import { DataProcessor } from '@/utils'

describe('DataProcessor', () => {
	describe('removeSpacesAndConvertToUpperCase', () => {
		it('should remove spaces and convert to upper case', () => {
			const input = 'Hello, World!'
			const result = DataProcessor.removeSpacesAndConvertToUpperCase(input)
			expect(result).toBe('HELLO,WORLD!')
		})

		it('should handle empty string', () => {
			const input = ''
			const result = DataProcessor.removeSpacesAndConvertToUpperCase(input)
			expect(result).toBe('')
		})

		it('should handle string without spaces', () => {
			const input = 'NoSpacesHere'
			const result = DataProcessor.removeSpacesAndConvertToUpperCase(input)
			expect(result).toBe('NOSPACESHERE')
		})
	})

	describe('formatDateISOToDDMMYYYY', () => {
		it('should format ISO date to DD.MM.YYYY', () => {
			const input = '2023-09-04'
			const result = DataProcessor.formatDateISOToDDMMYYYY(input)
			expect(result).toBe('04.09.2023')
		})

		it('should handle invalid date', () => {
			const input = 'invalid-date'
			const result = DataProcessor.formatDateISOToDDMMYYYY(input)
			expect(result).toBe('Invalid Date')
		})

		it('should handle empty string', () => {
			const input = ''
			const result = DataProcessor.formatDateISOToDDMMYYYY(input)
			expect(result).toBe('Invalid Date')
		})
	})
})
