import { DataProcessor } from '@/utils'

describe('DataProcessor', () => {
	it('should process input to remove spaces and convert to upper case', () => {
		expect(DataProcessor.removeSpacesAndConvertToUpperCase('')).toBe('')
		expect(DataProcessor.removeSpacesAndConvertToUpperCase('nE6362j')).toBe('NE6362J')
		expect(DataProcessor.removeSpacesAndConvertToUpperCase(' nE6362j ')).toBe('NE6362J')
		expect(DataProcessor.removeSpacesAndConvertToUpperCase(' n E 6 3 6 2 j ')).toBe('NE6362J')
	})
})
