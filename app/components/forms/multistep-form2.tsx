"use client"
import React, { useState, useEffect } from "react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { createDocument } from "@firebase/storeFunctions"
import { useMultiStepForm } from "../../hooks/useMultiStepForm"
import {
	ApplicationFormSchema,
	showAlert,
	SendSubscribeEmail,
	ContactFormSchema,
	UserFormSchema,
	type ApplicationFormDataProps,
} from "../FormSupport"
import StepperGraphic from "./StepperGraphic"
import ContactForm from "./signupForm/contactForm"
import UserForm from "./signupForm/userForm"
import BenefitForm from "./signupForm/benefitForm"
import ProductForm from "./signupForm/ProductForm"
import Link from "next/link"
import Image from "next/image"

type FormValues = z.infer<typeof ApplicationFormSchema>

type Step = {
	id: number
	label: string
	name: string
	status: string
    fields: string[]
}

const Steps: Step[] = [
	{ id: 1, label: "Step 1", name: "Contact Info", status: "current", fields: ['email', 'phoneDetails', 'userAccount', 'password'] },
	{ id: 2, label: "Step 2", name: "User Details", status: "upcoming", fields: ['firstName', 'lastName', 'addressDetails.document.addressLn1', 'addressDetails.document.city', 'addressDetails.document.state', 'addressDetails.document.zip', 'addressDetails.docEqDelivAdd',  'addressDetails.physical.addressLn1', 'addressDetails.physical.city', 'addressDetails.physical.state', 'addressDetails.physical.zip', ] },
	{ id: 3, label: "Step 3", name: "Benefits Info", status: "upcoming", fields: ['qualifications', 'DOB', 'lastFour'] },
	{ id: 4, label: "Step 4", name: "Product Select", status: "upcoming", fields: ['pickedProduct'] },
]

const MultiStepForm = () => {
	const [loading, setIsLoading] = useState(false)
	// const [data, setData] = useState(INITIAL_DATA)
	const [imageSrc, setImageSrc] = useState("")
	const [formData, setFormData] = useState({
		firstName: "",
		middleInitial: "",
		lastName: "",
		lastFour: "",
		DOB: new Date(),
		phoneDetails: {
			phoneNo: "(410) 411-5604",
			phoneCountryCode: "US",
		},
		email: "nreinrsrsn@nernrss.com",
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
		userAccount: true,
		benefits: "SNAP",
		password: "",
		status: "",
        pickedProduct: "x10"
	})
	const {
		control,
		register,
		handleSubmit,
		watch,
		unregister,
		setValue,
        trigger,
		formState: { errors },
	} = useForm<FormValues>({
		resolver: zodResolver(ContactFormSchema),
	})

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
		setFormData((prev) => {
			return { ...prev, ...fields }
		})
	}

	const { steps, currentStepIndex, step, isFirstStep, isLastStep, back, next, goTo } = useMultiStepForm([
		<ContactForm
			{...formData}
			updateFields={updateFields}
			formData={formData}
			setFormData={setFormData}
			register={register}
			unregister={unregister}
			watch={watch}
			errors={errors}
		/>,
		<UserForm
			{...formData}
			updateFields={updateFields}
			formData={formData}
			setFormData={setFormData}
			register={register}
			unregister={unregister}
			watch={watch}
			errors={errors}
		/>,
		// <BenefitForm {...data} data={data} updateFields={updateFields} />,
		// <ProductForm {...data} updateFields={updateFields} />,
	], trigger)

	const onSubmit = (data: FormValues) => {
		console.log("data", data)
		// console.log("docAddress", data.address.document)
		if (!isLastStep) return next()

		// print each value to console.
		// for (let [key, value] of formData.entries()) {
		// 	console.log(key, value)
		// }
	}

	// async function onSubmit(data: FormValues) {
	// 	setIsLoading(true)
	// 	try {
	// 		const response = await createDocument({ collectionName: "subscribers", data: data })
	// 		if (response.status === "success") {
	// 			await SendSubscribeEmail({ formData: data as SubscribeDataType })
	// 			console.log("the email should be sent correctly")
	// 		} else {
	// 			showAlert({ text: "There was an error submitting your email", status: "ERR" })
	// 			console.error(response.error)
	// 		}
	// 	} catch (err) {
	// 		console.log("error: ", err)
	// 		showAlert({ text: " there was an error submitting the data", status: "ERR" })
	// 	} finally {
	// 		setIsLoading(false) // Set loading state back to false
	// 	}
	// }

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
			<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center w-full mx-auto">
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
								type="button"
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

export default MultiStepForm
