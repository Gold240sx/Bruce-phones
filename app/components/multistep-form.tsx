import React, { FormEvent, useState } from "react"
import { useMultiStepForm } from "../hooks/useMultiStepForm"
import UserForm from "./forms/userForm"
import AddressForm from "./forms/addressForm"
import AccountForm from "./forms/accountForm"

type FormData = {
	firstName: string
	lastName: string
	age: string
	street: string
	city: string
	state: string
	zip: string
	email: string
	password: string
}

const INITIAL_DATA: FormData = {
	firstName: "",
	lastName: "",
	age: "",
	street: "",
	city: "",
	state: "",
	zip: "",
	email: "",
	password: "",
}

const MultistepForm = () => {
	const [data, setData] = useState(INITIAL_DATA)
	function updateFields(fields: Partial<FormData>) {
		setData((prev) => {
			return { ...prev, ...fields }
		})
	}
	const { steps, currentStepIndex, step, isFirstStep, isLastStep, back, next } = useMultiStepForm([
		<UserForm {...data} updateFields={updateFields} />,
		<AddressForm {...data} updateFields={updateFields} />,
		<AccountForm {...data} updateFields={updateFields} />,
	])

	const onSubmit = (e: FormEvent) => {
		e.preventDefault()
		if (!isLastStep) return next()
		alert("Successfully Submitted")
	}
	return (
		<form onSubmit={(e) => onSubmit(e)} className="flex flex-col items-center w-full">
			{step}
			<div className="flex justify-end w-full gap-2 mt-4">
				{!isFirstStep && (
					<button
						type="submit"
						onClick={back}
						className="px-3 py-1 text-lg border rounded-md hover:bg-white hover:border-2 acguvf:border-black border-zinc-400">
						Back
					</button>
				)}
				<button
					type="submit"
					className="px-3 py-1 text-lg border rounded-md hover:bg-white hover:border-2 acguvf:border-black border-zinc-400">
					{isLastStep ? "Submit" : "Next"}
				</button>
			</div>
			<div className="flex pt-4 ml-auto text-2xl font-semibold w-fit text-zinc-400 bottom-4 right-4">
				{currentStepIndex + 1}/{steps.length}
			</div>
		</form>
	)
}

export default MultistepForm
