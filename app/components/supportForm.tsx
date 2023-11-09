import { FormEvent, useEffect, useState } from "react"
import { ChevronDownIcon } from "@heroicons/react/20/solid"
import { Switch } from "@headlessui/react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/app/components/ui/card"
import { ExclamationCircleIcon } from "@heroicons/react/20/solid"
import Swal from "sweetalert2"
import { NextPage } from "next"
import Link from "next/link"
import { z } from "zod"

type FormDataProps = {
	e: FormEvent<HTMLFormElement>
	formData?: {
		firstName: string
		lastName: string
		phoneDetails: {
			phoneCountryCode: "US" | "CA" | "MX"
			phoneNo: string
		}
		email: string
		message: string
		agreed: boolean
	}
}
const SupportFormSchema = z.object({
	firstName: z.string().min(1, "Text characters only"),
	lastName: z.string().min(1, "Text characters only"),
	phoneDetails: z.object({
		phoneCountryCode: z.enum(["US", "CA", "EU"]),
		phoneNo: z
			.string()
			.min(10, "Invalid phone number")
			.max(14, "National Phone Number only")
			.refine((value) => /^\(\d{3}\) \d{3}-\d{4}$/.test(value), {
				message: "Phone number should match the format (XXX) XXX-XXXX.",
			})
			.optional(),
	}),
	email: z.string().email("Please enter a valid email"),
	message: z.string(),
	agreed: z.boolean().refine((value) => value === true, {
		message: "You must agree to the terms and conditions.",
	}),
})

const SupportForm: NextPage = () => {
	const [errors, setErrors] = useState({
		firstName: "",
		lastName: "",
		phoneDetails: { phoneNo: "", phoneCountryCode: "" },
		email: "",
		agreed: false,
	})
	const [formData, setFormData] = useState({
		firstName: "Vinnie",
		lastName: "Wilson",
		phoneDetails: {
			phoneCountryCode: "US",
			phoneNo: "(465) 265-4649",
		},
		email: "vinnieMcWinnie@google.com",
		message: "You son of a...",
		agreed: false,
	})

	const formatPhoneNo = (inputValue: string) => {
		const sanitizedValue = inputValue.replace(/[^\d]/g, "")
		let formattedValue = ""

		if (sanitizedValue.length <= 3) {
			formattedValue = sanitizedValue
		} else if (sanitizedValue.length <= 6) {
			formattedValue = `(${sanitizedValue.slice(0, 3)}) ${sanitizedValue.slice(3)}`
		} else {
			formattedValue = `(${sanitizedValue.slice(0, 3)}) ${sanitizedValue.slice(3, 6)}-${sanitizedValue.slice(6, 10)}`
		}
		return formattedValue
	}

	function classNames(...classes: string[]) {
		return classes.filter(Boolean).join(" ")
	}

	const validateFormData = (inputs: unknown) => {
		const isValidData = SupportFormSchema.parse(inputs)
		return isValidData
	}

	const handleSubmit = ({ e, formData }: FormDataProps) => {
		e.preventDefault()
		const isValidData = validateFormData(formData)
		try {
			if (isValidData) {
				console.log(formData)

				// Reset errors
				setErrors({
					firstName: "",
					lastName: "",
					phoneDetails: { phoneNo: "", phoneCountryCode: "" },
					email: "",
					agreed: false,
				})
			}
		} catch (err) {
			if (err instanceof z.ZodError) {
				// ZodError is an object representing the validation errors
				const errorData = err.flatten() // Flatten the error tree

				// Update the errors state with individual error messages
				setErrors({
					firstName: errorData.firstName || "",
					lastName: errorData.lastName || "",
					phoneDetails: {
						phoneNo: errorData.phoneDetails?.phoneNo || "",
						phoneCountryCode: errorData.phoneDetails?.phoneCountryCode || "",
					},
					email: errorData.email || "",
					agreed: errorData.agreed || false,
				})

				console.error(err)
			}
		}
	}

	function showAlert({ text, status }: { text: string; status: "OK" | "ERR" }) {
		Swal.fire({
			title: status === "OK" ? "Success" : "UH-OH",
			text: text,
			icon: status === "OK" ? "success" : "error",
			confirmButtonText: status === "OK" ? "Nice!" : "Aww Man",
		})
	}

	const disabledButton = false

	return (
		<Card className="w-full h-full">
			<CardHeader className="relative w-full py-12">
				<CardTitle className="text-5xl font-semibold text-center bg-gradient-to-r from-[#ff4694] to-[#776fff] inline-block w-fit mx-auto text-transparent bg-clip-text">
					Contact Us!
				</CardTitle>
				<CardDescription className="text-center">
					Complete this form to apply for one of our government-sponsored phone + tablet discounts to get your phone or tablet for
					as little as $20.{" "}
				</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="bg-white isolate sm:pb-32">
					<div className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu blur-3xl sm:top-[-20rem]" aria-hidden="true">
						<div
							className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
							style={{
								clipPath:
									"polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
							}}
						/>
					</div>
					<form onSubmit={(e) => handleSubmit({ e, formData })} className="w-4/5 max-w-2xl mx-auto scrollbar-hide sm:mt-20">
						<div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
							<div>
								<div className="flex justify-between">
									<label htmlFor="first-name" className="block text-sm font-semibold leading-6 text-gray-900">
										<span className="mr-1.5 text-lg font-bold text-red-600">*</span>
										First Name
									</label>
									<span className="text-sm leading-6 text-gray-500" id="first-name-required">
										Required
									</span>
								</div>
								<div className="mt-2.5 relative">
									<input
										id="first-name"
										type="text"
										name="first-name"
										autoComplete="given-name"
										className="block w-full focus:placeholder:opacity-0 rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
										placeholder="Your First Name"
										value={formData.firstName}
										onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
									/>
									{errors.firstName && (
										<div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
											<ExclamationCircleIcon className="w-5 h-5 text-red-500" aria-hidden="true" />
										</div>
									)}
								</div>
								<p className="pl-2 mt-2 text-sm text-red-600" id="first-name-error">
									{errors.firstName}
								</p>
							</div>
							<div>
								<div className="flex justify-between">
									<label htmlFor="last-name" className="block text-sm font-semibold leading-6 text-gray-900">
										<span className="mr-1.5 text-lg font-bold text-red-600">*</span>
										Last Name
									</label>
									<span className="text-sm leading-6 text-gray-500" id="last-name-required">
										Required
									</span>
								</div>
								<div className="mt-2.5 relative">
									<input
										id="last-name"
										type="text"
										name="last-name"
										autoComplete="family-name"
										className="block w-full focus:placeholder:opacity-0 rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
										placeholder="Your Last Name"
										value={formData.lastName}
										onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
									/>
									{errors.lastName && (
										<div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
											<ExclamationCircleIcon className="w-5 h-5 text-red-500" aria-hidden="true" />
										</div>
									)}
								</div>
								<p className="pl-2 mt-2 text-sm text-red-600" id="last-name-error">
									{errors.lastName}
								</p>
							</div>
							<div className="sm:col-span-2">
								<div className="flex justify-between">
									<label htmlFor="email" className="block text-sm font-semibold leading-6 text-gray-900">
										<span className="mr-1.5 text-lg font-bold text-red-600">*</span>
										Email
									</label>
									<span className="text-sm leading-6 text-gray-500" id="email-required">
										Required
									</span>
								</div>
								<div className="mt-2.5 relative">
									<input
										id="email"
										type="email"
										name="email"
										className="block w-full focus:placeholder:opacity-0 rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
										placeholder="Your Email"
										autoComplete="email"
										value={formData.email}
										onChange={(e) => setFormData({ ...formData, email: e.target.value })}
									/>
									{errors.email && (
										<div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
											<ExclamationCircleIcon className="w-5 h-5 text-red-500" aria-hidden="true" />
										</div>
									)}
								</div>
								<p className="pl-2 mt-2 text-sm text-red-600" id="email-error">
									{errors.email}
								</p>
							</div>
							<div className="relative sm:col-span-2">
								<label htmlFor="phone" className="block text-sm font-semibold leading-6 text-gray-900">
									Phone Number
								</label>
								<div className="relative mt-2.5">
									<div className="absolute inset-y-0 left-0 flex items-center">
										<label htmlFor="country" className="sr-only">
											Country
										</label>
										<select
											id="country"
											name="country"
											className="h-full py-0 pl-4 text-gray-400 bg-transparent border-0 rounded-md bg-none pr-9 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
											value={formData.phoneDetails.phoneCountryCode}
											autoComplete="tel-country-code"
											onChange={(e) =>
												setFormData({
													...formData,
													phoneDetails: {
														...formData.phoneDetails,
														phoneCountryCode: e.target.value,
													},
												})
											}>
											<option>US</option>
											<option>CA</option>
											<option>EU</option>
										</select>
									</div>
									<input
										type="tel"
										name="phone-number"
										id="phone-number"
										className="block w-full rounded-md border-0 px-3.5 py-2 pl-20 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
										placeholder="Your Phone Number"
										autoComplete="tel-national"
										value={formData.phoneDetails.phoneNo}
										onChange={(e) => {
											const formattedNumber = formatPhoneNo(e.target.value)
											setFormData({
												...formData,
												phoneDetails: {
													...formData.phoneDetails,
													phoneNo: formattedNumber,
												},
											})
										}}
									/>
									{errors.phoneDetails.phoneNo && (
										<div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
											<ExclamationCircleIcon className="w-5 h-5 text-red-500" aria-hidden="true" />
										</div>
									)}
								</div>
								{errors.phoneDetails.phoneNo && (
									<p className="pl-2 mt-2 text-sm text-red-600" id="phoneNo-error">
										{errors.phoneDetails.phoneNo}
									</p>
								)}
								{errors.phoneDetails.phoneCountryCode && (
									<p className="pl-2 mt-2 text-sm text-red-600" id="phone-country-code-error">
										{errors.phoneDetails.phoneCountryCode}
									</p>
								)}
							</div>
							<div className="sm:col-span-2">
								<div className="flex justify-between">
									<label htmlFor="message" className="block text-sm font-semibold leading-6 text-gray-900">
										<span className="mr-1.5 text-lg font-bold text-red-600">*</span>
										Message
									</label>
									<span className="text-sm leading-6 text-gray-500" id="message-required">
										Required
									</span>
								</div>
								<div className="mt-2.5 relative">
									<textarea
										name="message"
										id="message"
										rows={4}
										className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
										placeholder="Your Message"
										value={formData.message}
										onChange={(e) => setFormData({ ...formData, message: e.target.value })}
									/>
								</div>
							</div>
							<Switch.Group as="div" className="flex gap-x-4 sm:col-span-2">
								<div className="flex items-center h-6">
									<Switch
										checked={formData.agreed}
										onChange={(e) => setFormData({ ...formData, agreed: !formData.agreed })}
										className={classNames(
											formData.agreed ? "bg-indigo-600" : "bg-gray-200",
											"flex w-8 flex-none cursor-pointer rounded-full p-px ring-1 ring-inset ring-gray-900/5 transition-colors duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
										)}>
										<span className="sr-only">Agree to policies</span>
										<span
											aria-hidden="true"
											className={classNames(
												formData.agreed ? "translate-x-3.5" : "translate-x-0",
												"h-4 w-4 transform rounded-full bg-white shadow-sm ring-1 ring-gray-900/5 transition duration-200 ease-in-out"
											)}
										/>
									</Switch>
								</div>
								<Switch.Label className="text-sm leading-6 text-gray-600 cursor-pointer">
									By selecting this, you agree to our{" "}
									<Link href="/privacyPolicy" className="font-semibold text-indigo-600">
										privacy&nbsp;policy
									</Link>
									.
								</Switch.Label>
							</Switch.Group>
						</div>
						<div className="mt-10">
							<button
								type="submit"
								// disabled={errors}
								className={`${
									errors
										? "bg-zinc-300 cursor-not-allowed"
										: "bg-indigo-600 hover:bg-indigo-500 focus-visible:outline-indigo-600"
								}block w-full rounded-md px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 `}>
								Let's talk
							</button>
						</div>
					</form>
				</div>
			</CardContent>
		</Card>
	)
}

export default SupportForm
