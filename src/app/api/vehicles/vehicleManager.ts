type LicensePlate = string
type Vin = string
type FirstRegistrationDate = string

interface Session {
	jSessionId: string
	viewState: string
}

export class VehicleManager {
	session: Session | null

	constructor() {
		this.session = null
	}

	async addVehicle(licensePlate: LicensePlate, vin: Vin, firstRegistrationDate: FirstRegistrationDate) {
		return { licensePlate, vin, firstRegistrationDate }
	}

	async getAllVehicles() {
		const vehicles = [
			{
				id: 1,
				name: 'BMW',
				license_plate: 'KK21881',
			},
		]

		return vehicles
	}
}
