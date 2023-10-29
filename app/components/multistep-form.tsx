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
	device: "X65",
	subscibed: true,
	benefits: "SNAP",
}

type Step = {
	id: number
	label: string
	name: string
	status: string
}

const Steps: Step[] = [
	{ id: 1, label: "Step 1", name: "Product Selection", status: "current" },
	{ id: 2, label: "Step 2", name: "User Details", status: "upcoming" },
	{ id: 3, label: "Step 3", name: "Address Details", status: "upcoming" },
	{ id: 4, label: "Step 4", name: "Benefits Details", status: "upcoming" },
]

const MultistepForm = () => {
	const [data, setData] = useState(INITIAL_DATA)
	function updateFields(fields: Partial<FormData>) {
		setData((prev) => {
			return { ...prev, ...fields }
		})
	}
	const { steps, currentStepIndex, step, isFirstStep, isLastStep, back, next, goTo } = useMultiStepForm([
		<DeviceForm {...data} updateFields={updateFields} />,
		<UserForm {...data} updateFields={updateFields} />,
		<AddressForm {...data} updateFields={updateFields} />,
		<BenefitsForm {...data} updateFields={updateFields} />,
	])

	const onSubmit = (e: FormEvent) => {
		// const formData = new FormData(e.currentTarget)
		e.preventDefault()
		if (!isLastStep) return next()

		// print each value to console.
		// for (let [key, value] of formData.entries()) {
		// 	console.log(key, value)
		// }
	}

	return (
		<form onSubmit={onSubmit} className="flex flex-col items-center w-full">
			<StepperGraphic Steps={Steps} goTo={goTo} />
			<div className="flex flex-col">
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
			</div>
		</form>
	)
}

export default MultistepForm
