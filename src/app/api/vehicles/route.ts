import { NextResponse } from 'next/server'
import { DataProcessor, VehicleValidation } from '@/utils'

export const GET = async () => {
	const vehicles = [
		{
			id: 1,
			name: 'BMW',
			license_plate: 'KK21881',
		},
	]

	return NextResponse.json({ vehicles })
}

export const POST = async (request: Request) => {
	const emptyBody = { license_plate: null, vin: null, first_registration_date: null }
	const body = await request.json().catch(() => emptyBody)
	const { license_plate, vin, first_registration_date } = body

	if (!license_plate || !vin || !first_registration_date) {
		const details = []
		const fieldMessage = 'Pole wymagane'
		!license_plate && details.push({ field: 'license_plate', message: fieldMessage })
		!vin && details.push({ field: 'vin', message: fieldMessage })
		!first_registration_date && details.push({ field: 'first_registration_date', message: fieldMessage })
		const error = { message: 'Żądanie zawiera niekompletne dane', details }
		return NextResponse.json({ error }, { status: 400 })
	}

	const processedLicensePlate = DataProcessor.removeSpacesAndConvertToUpperCase(license_plate)
	const processedVin = DataProcessor.removeSpacesAndConvertToUpperCase(vin)
	const processedFirstRegistrationDate = DataProcessor.parseIsoDate(first_registration_date)

	const isLicensePlateValid = VehicleValidation.licensePlate(processedLicensePlate)
	const isVinValid = VehicleValidation.vin(processedVin)
	const isDateValid = VehicleValidation.date(processedFirstRegistrationDate)

	if (!isLicensePlateValid || !isVinValid || !isDateValid) {
		const details = []
		!isLicensePlateValid && details.push({ field: 'license_plate', message: 'Nieprawidłowa tablica rejestracyjna' })
		!isVinValid && details.push({ field: 'vin', message: 'Nieprawidłowy numer VIN' })
		!isDateValid && details.push({ field: 'first_registration_date', message: 'Nieprawidłowa data rejestracji' })
		const error = { message: 'Żądanie zawiera nieprawidłowe dane', details }
		return NextResponse.json({ error }, { status: 400 })
	}

	return NextResponse.json({ id: 1, processedLicensePlate, processedVin, processedFirstRegistrationDate })
}
