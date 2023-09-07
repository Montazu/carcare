'use client'

import { DataProcessor, VehicleValidation } from '@/utils'
import { useState } from 'react'

export default function Home() {
	const [licensePlate, setLicensePlate] = useState('')

	const handleLicensePlateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const licensePlate = DataProcessor.removeAllSpacesAndConvertToUpperCase(event.target.value)
		const isValid = VehicleValidation.licensePlate(licensePlate)

		console.log(isValid)
		setLicensePlate(licensePlate)
	}

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
	}

	return (
		<div>
			<h2>Formularz numeru tablicy rejestracyjnej</h2>
			<form onSubmit={handleSubmit}>
				<div>
					<label htmlFor="licensePlate">Numer tablicy rejestracyjnej:</label>
					<input
						type="text"
						id="licensePlate"
						name="licensePlate"
						value={licensePlate}
						onChange={handleLicensePlateChange}
						minLength={4}
						maxLength={8}
						required
					/>
				</div>
				<div>
					<button type="submit">Submit</button>
				</div>
			</form>
		</div>
	)
}
