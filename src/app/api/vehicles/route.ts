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
	const details = []

	if (!license_plate || !vin || !first_registration_date) {
		const fieldMessage = 'Required field'
		!license_plate && details.push({ field: 'license_plate', message: fieldMessage })
		!vin && details.push({ field: 'vin', message: fieldMessage })
		!first_registration_date && details.push({ field: 'first_registration_date', message: fieldMessage })
		const error = { message: 'The request contains incomplete data', details }
		return NextResponse.json({ error }, { status: 400 })
	}

	const processedLicensePlate = DataProcessor.removeSpacesAndConvertToUpperCase(license_plate)
	const processedVin = DataProcessor.removeSpacesAndConvertToUpperCase(vin)
	const processedFirstRegistrationDate = DataProcessor.formatDateISOToDDMMYYYY(first_registration_date)

	const isLicensePlateValid = VehicleValidation.licensePlate(processedLicensePlate)
	const isVinValid = VehicleValidation.vin(processedVin)
	const isDateValid = VehicleValidation.date(processedFirstRegistrationDate)

	if (!isLicensePlateValid || !isVinValid || !isDateValid) {
		!isLicensePlateValid && details.push({ field: 'license_plate', message: 'Invalid license plate' })
		!isVinValid && details.push({ field: 'vin', message: 'Invalid VIN number' })
		!isDateValid && details.push({ field: 'first_registration_date', message: 'Invalid date first registration' })
		const error = { message: 'The request contains invalid data', details }
		return NextResponse.json({ error }, { status: 400 })
	}

	return NextResponse.json({ id: 1, processedLicensePlate, processedVin, processedFirstRegistrationDate })
}
