import React from "react"
import FormWrapper from "./formWrapper"

type UserData = {
	firstName: string
	middleInitial: string
	lastName: string
	phoneNo: string
	email: string
}

type UserFormProps = UserData & {
	// this type means we can update any or all fields that belong to the user Data.
	updateFields: (fields: Partial<UserData>) => void
}

const UserForm = ({ firstName, middleInitial, lastName, phoneNo, email, updateFields }: UserFormProps) => {
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
			<label>Middle Initial</label>
			<input
				required
				type="text"
				maxLength={2}
				value={middleInitial}
				onChange={(e) =>
					updateFields({
						middleInitial: e.target.value,
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
			<label>Phone Number</label>
			<input
				min={1}
				type="number"
				value={phoneNo}
				onChange={(e) =>
					updateFields({
						phoneNo: e.target.value,
					})
				}
			/>
			<label>Email</label>
			<input
				required
				autoFocus
				type="email"
				value={email}
				onChange={(e) =>
					updateFields({
						email: e.target.value,
					})
				}
			/>
		</FormWrapper>
	)
}

export default UserForm
