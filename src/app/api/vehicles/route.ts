import { NextResponse } from 'next/server'
import { DataProcessor, TypeChecker, VehicleValidation } from '@/utils'
import { VehicleManager } from './vehicleManager'

interface Body {
	licensePlate: unknown
	vin: unknown
	firstRegistrationDate: unknown
}

export const GET = async () => {
	const response = await VehicleManager.getAllVehicles()
	const { data, status } = response
	return NextResponse.json(data, { status })
}

export const POST = async (request: Request) => {
	const emptyBody = { licensePlate: '', vin: '', firstRegistrationDate: '' }
	const body: Body = await request.json().catch(() => emptyBody)
	const { licensePlate, vin, firstRegistrationDate } = body
	const details = []

	if (!licensePlate || !vin || !firstRegistrationDate) {
		const message = 'Required field'
		!licensePlate && details.push({ field: 'licensePlate', message })
		!vin && details.push({ field: 'vin', message })
		!firstRegistrationDate && details.push({ field: 'firstRegistrationDate', message })
		const error = { message: 'The request contains incomplete data', details }
		return NextResponse.json({ error }, { status: 400 })
	}

	const isLicensePlateString = TypeChecker.isString(licensePlate)
	const isVinString = TypeChecker.isString(vin)
	const isFirstRegistrationDateString = TypeChecker.isString(firstRegistrationDate)

	if (!isLicensePlateString || !isVinString || !isFirstRegistrationDateString) {
		const message = 'Invalid data type'
		!isLicensePlateString && details.push({ field: 'licensePlate', message })
		!isVinString && details.push({ field: 'vin', message })
		!isFirstRegistrationDateString && details.push({ field: 'firstRegistrationDate', message })
		const error = { message: 'The request contains incomplete data', details }
		return NextResponse.json({ error }, { status: 400 })
	}

	const processedLicensePlate = DataProcessor.removeAllSpacesAndConvertToUpperCase(licensePlate)
	const processedVin = DataProcessor.removeAllSpacesAndConvertToUpperCase(vin)
	const processedFirstRegistrationDate = DataProcessor.convertDateISOToDDMMYYYY(firstRegistrationDate)

	const isLicensePlateValid = VehicleValidation.licensePlate(processedLicensePlate)
	const isVinValid = VehicleValidation.vin(processedVin)
	const isDateValid = VehicleValidation.date(processedFirstRegistrationDate)

	if (!isLicensePlateValid || !isVinValid || !isDateValid) {
		!isLicensePlateValid && details.push({ field: 'licensePlate', message: 'Invalid license plate' })
		!isVinValid && details.push({ field: 'vin', message: 'Invalid VIN number' })
		!isDateValid && details.push({ field: 'firstRegistrationDate', message: 'Invalid date first registration' })
		const error = { message: 'The request contains invalid data', details }
		return NextResponse.json({ error }, { status: 400 })
	}

	const result = await VehicleManager.addVehicle(processedLicensePlate, processedVin, processedFirstRegistrationDate)
	return NextResponse.json('error' in result ? { error: result.error } : result.data, { status: result.status })
}
