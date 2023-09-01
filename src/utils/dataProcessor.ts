export class DataProcessor {
	static removeSpacesAndConvertToUpperCase(input: string): string {
		return input.replace(/\s+/g, '').toUpperCase()
	}

	static parseIsoDate(input: string): Date {
		const parsedDate = new Date(input)
		return parsedDate
	}
}
