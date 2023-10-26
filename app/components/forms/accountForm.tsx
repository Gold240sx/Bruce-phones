import React from "react"
import FormWrapper from "./formWrapper"

type AccountData = {
	email: string
	password: string
}

type AccountFormProps = AccountData & {
	// this type means we can update any or all fields that belong to the user Data.
	updateFields: (fields: Partial<AccountData>) => void
}

const AccountForm = ({ email, password, updateFields }: AccountFormProps) => {
	return (
		<FormWrapper className="flex flex-col gap-3" title="Account Details">
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
			<label>Password</label>
			<input
				required
				type="password"
				value={password}
				onChange={(e) =>
					updateFields({
						password: e.target.value,
					})
				}
			/>
		</FormWrapper>
	)
}

export default AccountForm
