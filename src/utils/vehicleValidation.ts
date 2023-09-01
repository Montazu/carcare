export class VehicleValidation {
	static licensePlate(licensePlate: string): boolean {
		const regex = /^[A-Z0-9 ]{5,10}$/
		return regex.test(licensePlate)
	}

	static vin(vin: string): boolean {
		const regex = /^[A-HJ-NPR-Z0-9]{17}$/
		if (!regex.test(vin)) return false

		const weights = [8, 7, 6, 5, 4, 3, 2, 10, 0, 9, 8, 7, 6, 5, 4, 3, 2]
		const charMap: { [key: string]: number } = {
			A: 1,
			B: 2,
			C: 3,
			D: 4,
			E: 5,
			F: 6,
			G: 7,
			H: 8,
			J: 1,
			K: 2,
			L: 3,
			M: 4,
			N: 5,
			P: 7,
			R: 9,
			S: 2,
			T: 3,
			U: 4,
			V: 5,
			W: 6,
			X: 7,
			Y: 8,
			Z: 9,
		}

		let sum = 0
		for (let i = 0; i < 17; i++) {
			const char = vin.charAt(i).toUpperCase()
			const charValue = charMap[char] || parseInt(char, 10)
			const weight = weights[i]
			sum += charValue * weight
		}

		const checkDigit = vin.charAt(8).toUpperCase()
		const result =
			(sum % 11 === 10 && checkDigit === 'X') ||
			sum % 11 === parseInt(checkDigit, 10)

		return result
	}

	static date(date: string): boolean {
		const regex =
			/^(\d{4}-\d{2}-\d{2}(?:[T ]\d{2}:\d{2}:\d{2}(?:\.\d{1,3})?(?:[Zz]|[-+]\d{2}:\d{2})?)?)?$/
		if (!regex.test(date)) return false

		const inputDate = new Date(date)
		const today = new Date()

		return inputDate <= today
	}
}
