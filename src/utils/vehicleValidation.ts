export class VehicleValidation {
	static licensePlate(licensePlate: string) {
		const regex = /^(?=.*[A-Z])(?=.*\d)[A-Z0-9 ]{4,8}$/
		return regex.test(licensePlate)
	}

	static vin(vin: string) {
		const regex = /^[A-HJ-NPR-Z0-9]{17}$/
		return regex.test(vin)
	}

	static date(date: string) {
		const regex = /^(\d{2})\.(\d{2})\.(\d{4})$/
		if (!regex.test(date)) return false

		const [, day, month, year] = date.match(regex) as string[]
		const parsedDate = new Date(`${year}-${month}-${day}`)
		const today = new Date()

		return isNaN(parsedDate.getTime()) || today < parsedDate ? false : true
	}
}
