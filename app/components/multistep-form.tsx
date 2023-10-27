import React, { FormEvent, useState } from "react"
import { useMultiStepForm } from "../hooks/useMultiStepForm"
import UserForm from "./forms/userForm"
import AddressForm from "./forms/addressForm"
import AccountForm from "./forms/accountForm"
import StepperGraphic from "./forms/StepperGraphic"
import BenefitsForm from "./forms/benefitsForm"
import DeviceForm from "./forms/deviceForm"

type FormData = {
	firstName: string
	middleInitial: string
	lastName: string
	lastFour: string
	phoneNo: string
	DOB: string
	email: string
	street: string
	city: string
	state: string
	zip: string
	device: string
	subscibed: boolean
	benefits: string
}

const INITIAL_DATA: FormData = {
	firstName: "",
	middleInitial: "",
	lastName: "",
	lastFour: "",
	DOB: "",
	phoneNo: "",
	email: "",
	street: "",
	city: "",
	state: "",
	zip: "",
	device: "",
	subscibed: false,
	benefits: "",
}

type Step = {
	id: string
	name: string
	status: string
}

const Steps: Step[] = [
	{ id: "Step 1", name: "User Details", status: "current" },
	{ id: "Step 2", name: "Address Details", status: "upcoming" },
	{ id: "Step 3", name: "Account Details", status: "upcoming" },
]

const MultistepForm = () => {
	const [data, setData] = useState(INITIAL_DATA)
	function updateFields(fields: Partial<FormData>) {
		setData((prev) => {
			return { ...prev, ...fields }
		})
	}
	const { steps, currentStepIndex, step, isFirstStep, isLastStep, back, next } = useMultiStepForm([
		<DeviceForm {...data} updateFields={updateFields} />,
		<BenefitsForm {...data} updateFields={updateFields} />,
		<UserForm {...data} updateFields={updateFields} />,
		<AddressForm {...data} updateFields={updateFields} />,
	])

	const onSubmit = (e: FormEvent) => {
		e.preventDefault()
		if (!isLastStep) return next()
		alert("Successfully Submitted")
	}
	return (
		<form onSubmit={(e) => onSubmit(e)} className="flex flex-col items-center w-full">
			{/* <StepperGraphic Steps={Steps} /> */}
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
