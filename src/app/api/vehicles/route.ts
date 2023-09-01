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
	const body = await request.json().catch(() => ({ license_plate: null, vin: null, first_registration_date: null }))
	const { license_plate, vin, first_registration_date } = body

	if (!license_plate || !vin || !first_registration_date) {
		const details = []
		!license_plate && details.push({ field: 'license_plate', message: 'Pole wymagane' })
		!vin && details.push({ field: 'vin', message: 'Pole wymagane' })
		!first_registration_date && details.push({ field: 'first_registration_date', message: 'Pole wymagane' })
		return NextResponse.json({ error: { message: 'Żądanie zawiera niekompletne dane', details } }, { status: 400 })
	}

	const isLicensePlateValid = VehicleValidation.licensePlate(license_plate)
	const isVinValid = VehicleValidation.vin(vin)
	const isDateValid = VehicleValidation.date(first_registration_date)

	if (!isLicensePlateValid || !isVinValid || !isDateValid) {
		const details = []
		!isLicensePlateValid && details.push({ field: 'license_plate', message: 'Nieprawidłowa tablica rejestracyjna' })
		!isVinValid && details.push({ field: 'vin', message: 'Nieprawidłowy numer VIN' })
		!isDateValid && details.push({ field: 'first_registration_date', message: 'Nieprawidłowa data rejestracji' })
		return NextResponse.json({ error: { message: 'Żądanie zawiera nieprawidłowe dane', details } }, { status: 400 })
	}

	const processedLicensePlate = DataProcessor.removeSpacesAndConvertToUpperCase(license_plate)
	const processedVin = DataProcessor.removeSpacesAndConvertToUpperCase(vin)
	const processedFirstRegistrationDate = DataProcessor.parseIsoDate(first_registration_date)

	return NextResponse.json({ id: 1, processedLicensePlate, processedVin, processedFirstRegistrationDate })
}
