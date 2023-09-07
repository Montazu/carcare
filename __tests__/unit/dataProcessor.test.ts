import { DataProcessor } from '@/utils'

describe('DataProcessor', () => {
	describe('removeSpacesAndConvertToUpperCase', () => {
		it('should remove spaces and convert to upper case', () => {
			const input = 'Hello, World!'
			const result = DataProcessor.removeAllSpacesAndConvertToUpperCase(input)
			expect(result).toBe('HELLO,WORLD!')
		})

		it('should handle empty string', () => {
			const input = ''
			const result = DataProcessor.removeAllSpacesAndConvertToUpperCase(input)
			expect(result).toBe('')
		})

		it('should handle string without spaces', () => {
			const input = 'NoSpacesHere'
			const result = DataProcessor.removeAllSpacesAndConvertToUpperCase(input)
			expect(result).toBe('NOSPACESHERE')
		})
	})

	describe('removeAllSpacesAndConvertToLowerCase', () => {
		it('removes all spaces and converts to lowercase for a sentence', () => {
			const input = 'This Is A Test Sentence'
			const expected = 'thisisatestsentence'
			const result = DataProcessor.removeAllSpacesAndConvertToLowerCase(input)
			expect(result).toEqual(expected)
		})

		it('handles text with no spaces and converts to lowercase', () => {
			const input = 'textwithoutspaces'
			const expected = 'textwithoutspaces'
			const result = DataProcessor.removeAllSpacesAndConvertToLowerCase(input)
			expect(result).toEqual(expected)
		})

		it('removes all spaces and converts to lowercase for mixed case text', () => {
			const input = 'TeSt WiTh MiXeD CaSe SpAcEs'
			const expected = 'testwithmixedcasespaces'
			const result = DataProcessor.removeAllSpacesAndConvertToLowerCase(input)
			expect(result).toEqual(expected)
		})

		it('handles text with only spaces and returns an empty string', () => {
			const input = '       '
			const expected = ''
			const result = DataProcessor.removeAllSpacesAndConvertToLowerCase(input)
			expect(result).toEqual(expected)
		})
	})

	describe('convertDateISOToDDMMYYYY', () => {
		it('should format ISO date to DD.MM.YYYY', () => {
			const input = '2023-09-04'
			const result = DataProcessor.convertDateISOToDDMMYYYY(input)
			expect(result).toBe('04.09.2023')
		})

		it('should handle invalid date', () => {
			const input = 'invalid-date'
			const result = DataProcessor.convertDateISOToDDMMYYYY(input)
			expect(result).toBe('Invalid Date')
		})

		it('should handle empty string', () => {
			const input = ''
			const result = DataProcessor.convertDateISOToDDMMYYYY(input)
			expect(result).toBe('Invalid Date')
		})
	})

	describe('trimSpaces', () => {
		it('removes spaces at the beginning and end of the text', () => {
			const input = '   Text with spaces at the beginning and end   '
			const expected = 'Text with spaces at the beginning and end'
			const result = DataProcessor.trimSpaces(input)
			expect(result).toEqual(expected)
		})

		it('does not change text without spaces at the beginning and end', () => {
			const input = 'TextWithoutSpaces'
			const expected = 'TextWithoutSpaces'
			const result = DataProcessor.trimSpaces(input)
			expect(result).toEqual(expected)
		})

		it('removes a single space at the beginning and end of the text', () => {
			const input = ' Text '
			const expected = 'Text'
			const result = DataProcessor.trimSpaces(input)
			expect(result).toEqual(expected)
		})

		it('removes spaces at the beginning and end of text enclosed in double quotes', () => {
			const input = '   "Text with spaces at the beginning and end"   '
			const expected = '"Text with spaces at the beginning and end"'
			const result = DataProcessor.trimSpaces(input)
			expect(result).toEqual(expected)
		})
	})
})
