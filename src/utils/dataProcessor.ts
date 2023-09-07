export class DataProcessor {
	static removeAllSpacesAndConvertToUpperCase(input: string): string {
		return this.removeAllSpaces(input).toUpperCase()
	}

	static removeAllSpacesAndConvertToLowerCase(input: string): string {
		return this.removeAllSpaces(input).toLowerCase()
	}

	static convertDateISOToDDMMYYYY(input: string): string {
		const date = new Date(input)
		if (isNaN(date.getTime())) return 'Invalid Date'

		const day = String(date.getDate()).padStart(2, '0')
		const month = String(date.getMonth() + 1).padStart(2, '0')
		const year = String(date.getFullYear())

		return `${day}.${month}.${year}`
	}

	static trimSpaces(input: string): string {
		return input.trim()
	}

	static removeAllSpaces(input: string): string {
		return input.replace(/\s+/g, '')
	}
}
