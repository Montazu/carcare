import cookie from 'cookie'
import { load } from 'cheerio'

type LicensePlate = string
type Vin = string
type FirstRegistrationDate = string

interface VehicleBasicInfo {
	licensePlate: LicensePlate
	vin: Vin
	firstRegistrationDate: FirstRegistrationDate
}

interface VehicleTechnicalDetails extends VehicleBasicInfo {
	make: string
}

interface Session {
	jSessionId: string
	bigIp: string
	viewState: string
}

type Status = number

interface DataResponse<T> {
	data: T
	status: Status
}

interface ErrorResponse {
	error: {
		message: string
	}
	status: Status
}

const fakeDB: VehicleTechnicalDetails[] = []

export class VehicleManager {
	static async addVehicle(licensePlate: LicensePlate, vin: Vin, firstRegistrationDate: FirstRegistrationDate) {
		const vehicle = fakeDB.find((vehicle) => vehicle.vin === vin)
		if (vehicle) return { error: { message: 'The vehicle already exists' }, status: 409 }
		const response = await this.fetchVehicle({ licensePlate, vin, firstRegistrationDate })
		!('error' in response) && fakeDB.push(response.data)
		return response
	}

	static async getAllVehicles() {
		return { data: fakeDB, status: 200 }
	}

	private static async fetchVehicle({ licensePlate, vin, firstRegistrationDate }: VehicleBasicInfo) {
		const baseUrl = 'https://historiapojazdu.gov.pl/strona-glowna'

		const getSession = async (): Promise<Session | ErrorResponse> => {
			try {
				const url = `${baseUrl}?p_p_id=historiapojazduportlet_WAR_historiapojazduportlet&p_p_lifecycle=2&_historiapojazduportlet_WAR_historiapojazduportlet__jsfBridgeAjax=true`
				const response = await fetch(url)
				const cookies = response.headers.get('set-cookie')
				if (!cookies) throw new Error('Internal server error')
				const parsedCookies = cookie.parse(cookies)
				const jSessionId = parsedCookies.JSESSIONID
				const bigIp = parsedCookies['HttpOnly, BIGipServerC2_PRD_UL_HIPO-8008']
				const $ = load(await response.text(), { xmlMode: true })
				const viewState = $('update').text()
				return { jSessionId, bigIp, viewState }
			} catch (error) {
				return { error: { message: 'Internal server error' }, status: 500 }
			}
		}

		const findVehicle = async ({
			jSessionId,
			bigIp,
			viewState,
		}: Session): Promise<ErrorResponse | DataResponse<VehicleTechnicalDetails>> => {
			try {
				const url = `${baseUrl}/-/hipo/historiaPojazdu/cepik`
				const payload = {
					method: 'POST',
					headers: {
						'content-type': 'application/x-www-form-urlencoded',
						cookie: `BIGipServerC2_PRD_UL_HIPO-8008=${bigIp}; JSESSIONID=${jSessionId}`,
					},
					body: `_historiapojazduportlet_WAR_historiapojazduportlet_%3Aformularz=_historiapojazduportlet_WAR_historiapojazduportlet_%3Aformularz&_historiapojazduportlet_WAR_historiapojazduportlet_%3Arej=${licensePlate}&_historiapojazduportlet_WAR_historiapojazduportlet_%3Avin=${vin}&_historiapojazduportlet_WAR_historiapojazduportlet_%3Adata=${firstRegistrationDate}&_historiapojazduportlet_WAR_historiapojazduportlet_%3AbtnSprawdz=Sprawd%C5%BA+pojazd+%C2%BB&javax.faces.ViewState=${viewState}`,
				}
				const response = await fetch(url, payload)
				const html = await response.text()
				if (!html.includes('raport-main-information')) {
					return { error: { message: 'Vehicle not found' }, status: 404 }
				}
				const $ = load(html)
				const make = $('#_historiapojazduportlet_WAR_historiapojazduportlet_\\:j_idt10\\:marka').text()
				const vehicle = { licensePlate, vin, make, firstRegistrationDate }
				return { data: vehicle, status: 201 }
			} catch (error) {
				return { error: { message: 'Internal server error' }, status: 500 }
			}
		}

		const response = await getSession()
		return 'error' in response ? response : await findVehicle(response)
	}
}
