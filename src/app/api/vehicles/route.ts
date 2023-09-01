import { VehicleValidation } from '@/utils/vehicleValidation'
import { NextResponse } from 'next/server'

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
	const { license_plate, vin, first_registration_date } = await request.json()

	const isLicensePlateValid = VehicleValidation.licensePlate(license_plate)
	const isVinValid = VehicleValidation.vin(vin)
	const isDateValid = VehicleValidation.date(first_registration_date)

	const response =
		isLicensePlateValid && isVinValid && isDateValid
			? { id: 1, license_plate }
			: { error: { message: 'Błąd walidacji danych' } }

	return NextResponse.json(response)
}
