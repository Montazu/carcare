export class DataProcessor {
	static removeSpacesAndConvertToUpperCase(input: string): string {
		return input.replace(/\s+/g, '').toUpperCase()
	}

	static parseIsoDate(input: string): string {
		const parsedDate = new Date(input)
		return parsedDate.toString()
	}
}
