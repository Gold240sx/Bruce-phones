import React, { FormEvent, useState } from "react"
import { useMultiStepForm } from "../../hooks/useMultiStepForm"
import UserForm from "./userForm"
import AddressForm from "./addressForm"
import AccountForm from "./accountForm"
import StepperGraphic from "./StepperGraphic"
import BenefitsForm from "./benefitsForm"
import DeviceForm from "./deviceForm"
import ContactForm from "./signupForm/contactForm"

type Address = {
	street: string
	city: string
	state: string
	zip: string
}

type Addresses = {
	document: Address
	physical: Address
}

type FormData = {
	firstName: string
	middleInitial: string
	lastName: string
	lastFour: string
	phoneNo: string
	DOB: string
	email: string
	address: Addresses
	street: string
	city: string
	state: string
	zip: string
	device: string
	subscibed: boolean
	documents: string[]
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
	address: {
		document: {
			street: "",
			city: "",
			state: "",
			zip: "",
		},
		physical: {
			street: "",
			city: "",
			state: "",
			zip: "",
		},
	},
	// street: "",
	// city: "",
	// state: "",
	// zip: "",
	documents: [],
	device: "x10",
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
	{ id: 1, label: "Step 1", name: "Contact Details", status: "current" },
	{ id: 1, label: "Step 1", name: "Device Details", status: "current" },
	// { id: 2, label: "Step 2", name: "User Details", status: "upcoming" },
	// { id: 3, label: "Step 3", name: "Address Details", status: "upcoming" },
	// { id: 3, label: "Step 3", name: "Benefits Details", status: "upcoming" },
]

const MultistepForm = () => {
	const [data, setData] = useState(INITIAL_DATA)
	function updateFields(fields: Partial<FormData>) {
		setData((prev) => {
			return { ...prev, ...fields }
		})
	}
	const { steps, currentStepIndex, step, isFirstStep, isLastStep, back, next, goTo } = useMultiStepForm([
		// <ContactForm {...data} updateFields={updateFields} />,
		// <DeviceForm {...data} updateFields={updateFields} />,
		<UserForm {...data} updateFields={updateFields} />,
		// <BenefitsForm {...data} updateFields={updateFields} />,
	])

	const onSubmit = (e: any) => {
		e.preventDefault()
		const formData = new FormData(e)
		if (!isLastStep) return next()

		// print each value to console.
		for (let [key, value] of formData.entries()) {
			console.log(key, value)
		}
	}

	return (
		<form onSubmit={(e) => onSubmit(e)} className="flex flex-col items-center w-full">
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
