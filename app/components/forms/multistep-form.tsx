"use client"
import React, { FormEvent, useState, useEffect } from "react"
import Image from "next/image"
import { useMultiStepForm } from "../../hooks/useMultiStepForm"
import AddressForm from "./addressForm"
import AccountForm from "./accountForm"
import StepperGraphic from "./StepperGraphic"

import DeviceForm from "./deviceForm"
import TestForm from "./testForm"
import { format } from "date-fns"
import ContactForm from "./signupForm/contactForm"
import UserForm from "./signupForm/userForm"
import BenefitForm from "./signupForm/benefitForm"
import ProductForm from "./signupForm/ProductForm"

export type Address = {
	street: string
	city: string
	state: string
	zip: string
}

export type Addresses = {
	docEqDelivAdd: boolean
	document: Address
	physical: Address
}

export type FormData = {
	firstName: string
	middleInitial: string
	lastName: string
	lastFour: string
	phoneDetails: {
		phoneNo: string
		phoneCountryCode: string
	}
	DOB: Date | string | null
	email: string
	address: Addresses
	device: string
	subscibed: boolean
	documents: string[]
	benefits: string
	password: string
}

const INITIAL_DATA: FormData = {
	firstName: "",
	middleInitial: "",
	lastName: "",
	lastFour: "",
	DOB: new Date(),
	phoneDetails: {
		phoneNo: "",
		phoneCountryCode: "US",
	},
	email: "",
	address: {
		docEqDelivAdd: true,
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
	documents: [],
	device: "x10",
	subscibed: true,
	benefits: "SNAP",
	password: "",
}

type Step = {
	id: number
	label: string
	name: string
	status: string
}

const Steps: Step[] = [
	{ id: 1, label: "Step 1", name: "Contact Info", status: "current" },
	{ id: 2, label: "Step 2", name: "User Details", status: "upcoming" },
	{ id: 3, label: "Step 3", name: "Benefits Info", status: "upcoming" },
	{ id: 4, label: "Step 4", name: "Product Select", status: "upcoming" },
]

const MultistepForm = () => {
	const [data, setData] = useState(INITIAL_DATA)
	const [imageSrc, setImageSrc] = useState("")

	useEffect(() => {
		const fetchImage = async () => {
			const imageSrc =
				"https://images.pexels.com/photos/6146961/pexels-photo-6146961.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"

			try {
				const response = await fetch(imageSrc)
				if (response.ok) {
					const blob = await response.blob()
					const imageURL = URL.createObjectURL(blob)
					setImageSrc(imageURL)
				}
			} catch (error) {
				console.log("Error fetching image: ", error)
			}
		}
		fetchImage()
	}, [])

	function updateFields(fields: Partial<FormData>) {
		setData((prev) => {
			return { ...prev, ...fields }
		})
	}
	const { steps, currentStepIndex, step, isFirstStep, isLastStep, back, next, goTo } = useMultiStepForm([
		<ContactForm {...data} updateFields={updateFields} />,
		<UserForm {...data} updateFields={updateFields} />,
		<BenefitForm {...data} data={data} updateFields={updateFields} />,
		<ProductForm {...data} updateFields={updateFields} />,
	])

	const onSubmit = (e: any) => {
		e.preventDefault()
		// console.log("data", data)
		// console.log("docAddress", data.address.document)
		if (!isLastStep) return next()

		// print each value to console.
		// for (let [key, value] of formData.entries()) {
		// 	console.log(key, value)
		// }
	}

	return (
		<div className="flex flex-col items-center justify-center mx-auto align-middle md:w-10/12">
			<div className="col-span-12 mb-12 md:hidden md:mb-0 md:col-span-5 xl:col-span-6">
				<Image
					className="object-cover ml-auto bg-center"
					src={imageSrc}
					alt="People enjoying mobile phone use"
					sizes="100vh"
					style={{
						width: "cover",
						height: "100%",
					}}
					width={700}
					height={900}
				/>
			</div>
			<StepperGraphic Steps={Steps} goTo={goTo} />
			<form onSubmit={(e) => onSubmit(e)} className="flex flex-col items-center w-full mx-auto">
				<div className="flex flex-col-reverse w-full max-w-[990px] md:flex-row">
					<div className="grid grid-cols-12 md:gap-8">
						{/* left/bottom collumn/row */}
						<div className="col-span-12 md:col-span-7 xl:col-span-6">{step}</div>
						{/* right/top collumn/row */}
						<div className="hidden col-span-12 mb-12 md:flex md:mb-0 md:col-span-5 xl:col-span-6">
							<Image
								className="object-cover ml-auto bg-center"
								src={imageSrc}
								alt="People enjoying mobile phone use"
								sizes="100vh"
								style={{
									width: "cover",
									height: "100%",
								}}
								width={700}
								height={900}
							/>
						</div>
					</div>
				</div>
				<div className="flex flex-col">
					<div className="flex justify-end gap-2 mt-4 w-fit">
						{!isFirstStep && (
							<button
								type="submit"
								onClick={back}
								className="px-3 py-1 text-lg border rounded-md hover:bg-white active:border-black hover:border-2 acguvf:border-black border-zinc-400">
								Back
							</button>
						)}
						<button
							type="submit"
							className={`${
								isLastStep && "bg-indigo-600 text-white hover:bg-indigo-500"
							} px-3 py-1 text-lg rounded-md border-2 acguvf:border-black border-zinc-400`}>
							{isLastStep ? "Submit" : "Next"}
						</button>
					</div>
				</div>
				<div className="flex w-full pt-2 ml-auto text-2xl font-semibold text-right align-right text-zinc-400 bottom-4 right-4">
					<p className="px-2 ml-auto w-fit">
						{currentStepIndex + 1}/{steps.length}
					</p>
				</div>
			</form>
		</div>
	)
}

export default MultistepForm
