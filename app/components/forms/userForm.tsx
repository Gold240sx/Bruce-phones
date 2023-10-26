import React from "react"
import FormWrapper from "./formWrapper"

type UserData = {
	firstName: string
	lastName: string
	age: string
}

type UserFormProps = UserData & {
	// this type means we can update any or all fields that belong to the user Data.
	updateFields: (fields: Partial<UserData>) => void
}

const UserForm = ({ firstName, lastName, age, updateFields }: UserFormProps) => {
	return (
		<FormWrapper className="flex flex-col gap-3" title="User Details">
			<label>First Name</label>
			<input
				autoFocus
				required
				type="text"
				value={firstName}
				onChange={(e) =>
					updateFields({
						firstName: e.target.value,
					})
				}
			/>
			<label>Last Name</label>
			<input
				required
				type="text"
				value={lastName}
				onChange={(e) =>
					updateFields({
						lastName: e.target.value,
					})
				}
			/>
			<label>Age</label>
			<input
				required
				min={1}
				type="number"
				value={age}
				onChange={(e) =>
					updateFields({
						age: e.target.value,
					})
				}
			/>
		</FormWrapper>
	)
}

export default UserForm
