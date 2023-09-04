import { NextResponse } from 'next/server'
import { DataProcessor, TypeChecker, VehicleValidation } from '@/utils'
import { VehicleManager } from './vehicleManager'

const manager = new VehicleManager()

export const GET = async () => {
	const vehicles = await manager.getAllVehicles()
	return NextResponse.json({ vehicles })
}

export const POST = async (request: Request) => {
	const emptyBody = { licensePlate: null, vin: null, firstRegistrationDate: null }
	const body = await request.json().catch(() => emptyBody)
	const { licensePlate, vin, firstRegistrationDate } = body
	const details = []

	if (!licensePlate || !vin || !firstRegistrationDate) {
		const fieldMessage = 'Required field'
		!licensePlate && details.push({ field: 'licensePlate', message: fieldMessage })
		!vin && details.push({ field: 'vin', message: fieldMessage })
		!firstRegistrationDate && details.push({ field: 'firstRegistrationDate', message: fieldMessage })
		const error = { message: 'The request contains incomplete data', details }
		return NextResponse.json({ error }, { status: 400 })
	}

	const isLicensePlateString = TypeChecker.isString(licensePlate)
	const isVinString = TypeChecker.isString(vin)
	const isFirstRegistrationDateString = TypeChecker.isString(firstRegistrationDate)

	if (!isLicensePlateString || !isVinString || !isFirstRegistrationDateString) {
		const fieldMessage = 'Invalid data type'
		!isLicensePlateString && details.push({ field: 'licensePlate', message: fieldMessage })
		!isVinString && details.push({ field: 'vin', message: fieldMessage })
		!isFirstRegistrationDateString && details.push({ field: 'firstRegistrationDate', message: fieldMessage })
		const error = { message: 'The request contains incomplete data', details }
		return NextResponse.json({ error }, { status: 400 })
	}

	const processedLicensePlate = DataProcessor.removeSpacesAndConvertToUpperCase(licensePlate)
	const processedVin = DataProcessor.removeSpacesAndConvertToUpperCase(vin)
	const processedFirstRegistrationDate = DataProcessor.formatDateISOToDDMMYYYY(firstRegistrationDate)

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

	const result = await manager.addVehicle(processedLicensePlate, processedVin, processedFirstRegistrationDate)

	if (result) {
		return NextResponse.json(result, { status: 201 })
	} else {
		const error = { message: 'Vehicle added successfully' }
		return NextResponse.json({ error }, { status: 400 })
	}
}
