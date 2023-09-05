import cookie from 'cookie'
import { load } from 'cheerio'

type LicensePlate = string
type Vin = string
type FirstRegistrationDate = string

export class VehicleManager {
	async addVehicle(licensePlate: LicensePlate, vin: Vin, firstRegistrationDate: FirstRegistrationDate) {
		const a = await this.fetchVehicle(licensePlate, vin, firstRegistrationDate)
		return a
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

	private async fetchVehicle(licensePlate: LicensePlate, vin: Vin, firstRegistrationDate: FirstRegistrationDate) {
		const BASE_URL = 'https://historiapojazdu.gov.pl/strona-glowna'
		const response = await fetch(
			`${BASE_URL}?p_p_id=historiapojazduportlet_WAR_historiapojazduportlet&p_p_lifecycle=2&_historiapojazduportlet_WAR_historiapojazduportlet__jsfBridgeAjax=true`
		)

		const cookies = response.headers.get('set-cookie')
		if (!cookies) return
		const parsedCookies = cookie.parse(cookies)
		const jSessionId = parsedCookies.JSESSIONID
		const big = parsedCookies['HttpOnly, BIGipServerC2_PRD_UL_HIPO-8008']

		const $a = load(await response.text(), { xmlMode: true })
		const viewState = encodeURIComponent($a('update').text())

		const a = await fetch(`${BASE_URL}/-/hipo/historiaPojazdu/cepik`, {
			headers: {
				'content-type': 'application/x-www-form-urlencoded',
				cookie: `BIGipServerC2_PRD_UL_HIPO-8008=${big}; JSESSIONID=${jSessionId}`,
			},
			body: `_historiapojazduportlet_WAR_historiapojazduportlet_%3Aformularz=_historiapojazduportlet_WAR_historiapojazduportlet_%3Aformularz&_historiapojazduportlet_WAR_historiapojazduportlet_%3Arej=${licensePlate}&_historiapojazduportlet_WAR_historiapojazduportlet_%3Avin=${vin}&_historiapojazduportlet_WAR_historiapojazduportlet_%3Adata=${firstRegistrationDate}&_historiapojazduportlet_WAR_historiapojazduportlet_%3AbtnSprawdz=Sprawd%C5%BA+pojazd+%C2%BB&javax.faces.ViewState=${viewState}`,
			method: 'POST',
		})

		const $ = load(await a.text())
		const name = $('#_historiapojazduportlet_WAR_historiapojazduportlet_\\:j_idt10\\:marka').text()

		if (name) {
			return { name }
		} else {
			return null
		}
	}
}
