import React from "react"
import FormWrapper from "./formWrapper"

type AddressData = {
	street: string
	city: string
	state: string
	zip: string
}

type AddressFormProps = AddressData & {
	// this type means we can update any or all fields that belong to the user Data.
	updateFields: (fields: Partial<AddressData>) => void
}

const AddressForm = ({ street, city, state, zip, updateFields }: AddressFormProps) => {
	return (
		<FormWrapper className="flex flex-col w-full gap-3" title="Address Details">
			<label>Street</label>
			<input
				autoFocus
				required
				type="text"
				value={street}
				onChange={(e) =>
					updateFields({
						street: e.target.value,
					})
				}
			/>
			<label>City</label>
			<input
				required
				type="text"
				value={city}
				onChange={(e) =>
					updateFields({
						city: e.target.value,
					})
				}
			/>
			<label>State</label>
			<input
				required
				type="text"
				value={state}
				onChange={(e) =>
					updateFields({
						state: e.target.value,
					})
				}
			/>
			<label>Zip/Postal</label>
			<input
				required
				type="number"
				value={zip}
				onChange={(e) =>
					updateFields({
						zip: e.target.value,
					})
				}
			/>
		</FormWrapper>
	)
}

export default AddressForm
