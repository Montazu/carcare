import { VehicleValidation } from '@/utils/vehicleValidation'

describe('VehicleValidation', () => {
	it('should validate license plate correctly', () => {
		expect(VehicleValidation.licensePlate('ST7039T')).toBe(true)
		expect(VehicleValidation.licensePlate('st7039T')).toBe(false)
		expect(VehicleValidation.licensePlate(' st7039T  ')).toBe(false)
		expect(VehicleValidation.licensePlate('ABC123#')).toBe(false)
		expect(VehicleValidation.licensePlate('AB')).toBe(false)
		expect(VehicleValidation.licensePlate('')).toBe(false)
	})

	it('should validate VIN correctly', () => {
		expect(VehicleValidation.vin('VF1RFB00968678630')).toBe(true)
		expect(VehicleValidation.vin('W0LGB8EL7F1026641')).toBe(true)
		expect(VehicleValidation.vin('1HGCM82633A12345')).toBe(false)
		expect(VehicleValidation.vin('12345678901234567')).toBe(false)
		expect(VehicleValidation.vin('')).toBe(false)
	})

	it('should validate date correctly', () => {
		expect(VehicleValidation.date('2023-08-01T00:00:00Z')).toBe(true)
		expect(VehicleValidation.date('2025-09-01T14:30:00Z')).toBe(false)
		expect(VehicleValidation.date('2022-07-04')).toBe(true)
		expect(VehicleValidation.date('-2022-07-04')).toBe(false)
		expect(VehicleValidation.date('2022-17-04')).toBe(false)
		expect(VehicleValidation.date('20.12.2500')).toBe(false)
		expect(VehicleValidation.date('')).toBe(false)
	})
})
