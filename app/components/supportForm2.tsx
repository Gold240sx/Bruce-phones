"use client"
import { FormEvent, useEffect, useState } from "react"
import { ChevronDownIcon } from "@heroicons/react/20/solid"
import { Switch } from "@headlessui/react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/app/components/ui/card"
import { ExclamationCircleIcon } from "@heroicons/react/20/solid"
import { type FormDataProps, SupportFormSchema, showAlert, formatPhoneNo, classNames } from "./FormSupport"
import Swal from "sweetalert2"
import { NextPage } from "next"
import Link from "next/link"
import { z } from "zod"
import { Controller, FieldErrors, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { createDocument } from "@firebase/storeFunctions"

type FormValues = z.infer<typeof SupportFormSchema>

export default function SupportForm() {
	// Errors handled by Zod
	// const [formErrors, setFormErrors] = useState({
	// 	firstName: "",
	// 	lastName: "",
	// 	phoneDetails: { phoneNo: "", phoneCountryCode: "" },
	// 	email: "",
	// 	agreed: false,
	// })
	const [formData, setFormData] = useState({
		firstName: "First",
		lastName: "Person",
		phoneDetails: {
			phoneCountryCode: "US",
			phoneNo: "(465) 265-4649",
		},
		email: "MaybeIMean@IReallyHOpe.com",
		message: "Hows this for hope?...",
		agreed: false,
	})
	const {
		control,
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<FormValues>({
		resolver: zodResolver(SupportFormSchema),
	})
	// const watchMode = watch("modes") // watch is for changing validation schemas.
	//  const isModeOf = <TMode extends FormValues["modes"]>(
	// 		err: typeof errors,
	// 		mode: TMode
	//  ): err is FieldErrors<Extract<FormValues, { modes: +TMode }>> => {
	// 		return watchMode === mode
	//  }
	// const errorsExist = watch(errors)

	useEffect(() => {
		// here for the button. Later I'll focus on a better prevented button solution.
		// along with a loading state option.
	}, [formData])

	async function onSubmit(data: FormValues) {
		try {
			const response = await createDocument({ collectionName: "supportRequests", data: data })

			if (response.status === "success") {
				showAlert({ text: "The form was successfully submitted", status: "OK" })
				console.log("Document Reference:", response.docRef)
			} else {
				showAlert({ text: "There was an error submitting the form", status: "ERR" })
				console.error(response.error)
			}
			// ({
			// 	title: "You submitted the following values:",
			// 	description: (
			// 		<pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
			// 			<code className="text-white">{JSON.stringify(data, null, 2)}</code>
			// 		</pre>
			// 	),
			// })
		} catch (err) {
			console.log("error: ", err)
			showAlert({ text: " there was an error submitting the form", status: "ERR" })
		}
	}

	return (
		<Card className="w-full h-full">
			<CardHeader className="relative flex flex-col items-center w-full py-12">
				<CardTitle className="text-5xl font-semibold text-center bg-gradient-to-r from-[#ff4694] to-[#776fff] inline-block w-fit mx-auto text-transparent bg-clip-text">
					Contact Us!
				</CardTitle>
				<CardDescription className="w-3/4 pt-8 text-center ">
					{/* <p className="w-3/4"> */}
					Complete this form to apply for one of our government-sponsored phone + tablet discounts to get your phone or tablet for
					as little as $20.
					{/* </p> */}
				</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="bg-white isolate lg:pb-32">
					<div className="absolute inset-x-0 -z-10 transform-gpu blur-3xl" aria-hidden="true">
						<div
							className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
							style={{
								clipPath:
									"polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
							}}
						/>
					</div>
					<form onSubmit={handleSubmit(onSubmit)} className="w-4/5 max-w-2xl mx-auto scrollbar-hide lg:mt-20 sm:mt-10">
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
										// name="first-name"
										autoComplete="given-name"
										className="block w-full focus:placeholder:opacity-0 rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
										placeholder="Your First Name"
										{...register("firstName")}
										value={formData.firstName}
										onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
									/>
									{errors.firstName && (
										<div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
											<ExclamationCircleIcon className="w-5 h-5 text-red-500" aria-hidden="true" />
										</div>
									)}
								</div>
								{errors.firstName && (
									<p className="pl-2 mt-2 text-sm text-red-600" id="first-name-error">
										{errors.firstName.message}
									</p>
								)}
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
										// name="last-name"
										autoComplete="family-name"
										className="block w-full focus:placeholder:opacity-0 rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
										placeholder="Your Last Name"
										{...register("lastName")}
										value={formData.lastName}
										onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
									/>
									{errors.lastName && (
										<div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
											<ExclamationCircleIcon className="w-5 h-5 text-red-500" aria-hidden="true" />
										</div>
									)}
								</div>
								{errors.lastName && (
									<p className="pl-2 mt-2 text-sm text-red-600" id="last-name-error">
										{errors.lastName.message}
									</p>
								)}
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
										// name="email"
										className="block w-full focus:placeholder:opacity-0 rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
										placeholder="Your Email"
										autoComplete="email"
										{...register("email")}
										value={formData.email}
										onChange={(e) => setFormData({ ...formData, email: e.target.value })}
									/>
									{errors.email && (
										<div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
											<ExclamationCircleIcon className="w-5 h-5 text-red-500" aria-hidden="true" />
										</div>
									)}
								</div>
								{errors.email && (
									<p className="pl-2 mt-2 text-sm text-red-600" id="email-error">
										{errors.email.message}
									</p>
								)}
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
											// name="country"
											className="h-full py-0 pl-4 text-gray-400 bg-transparent border-0 rounded-md bg-none pr-9 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
											value={formData.phoneDetails.phoneCountryCode}
											autoComplete="tel-country-code"
											{...register("phoneDetails.phoneCountryCode")}
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
										// name="phone-number"
										id="phone-number"
										className="block w-full rounded-md border-0 px-3.5 py-2 pl-20 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
										placeholder="Your Phone Number"
										autoComplete="tel-national"
										{...register("phoneDetails.phoneNo")}
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
									{errors.phoneDetails && (
										<div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
											<ExclamationCircleIcon className="w-5 h-5 text-red-500" aria-hidden="true" />
										</div>
									)}
								</div>
								{errors.phoneDetails && (
									<p className="pl-2 mt-2 text-sm text-red-600" id="phoneNo-error">
										please enter a valid phone number
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
										// name="message"
										id="message"
										rows={4}
										className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
										placeholder="Your Message"
										{...register("message")}
										value={formData.message}
										onChange={(e) => setFormData({ ...formData, message: e.target.value })}
									/>
								</div>
							</div>
							<Switch.Group as="div" className="flex gap-x-4 sm:col-span-2">
								<div className="flex items-center h-6">
									<Switch
										checked={formData.agreed}
										// {...register("agreed")}
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
								disabled={
									errors.email !== undefined ||
									errors.firstName !== undefined ||
									errors.lastName !== undefined ||
									errors.message !== undefined ||
									formData.agreed !== true
								}
								className={`${
									errors.email !== undefined ||
									errors.firstName !== undefined ||
									errors.lastName !== undefined ||
									errors.message !== undefined ||
									formData.agreed !== true
										? "bg-zinc-300 cursor-not-allowed"
										: "bg-indigo-600 hover:bg-indigo-500 focus-visible:outline-indigo-600"
								}block w-full rounded-md px-3.5 py-2.5 text-center duration-200 ease-in-out transition-colors text-sm font-semibold text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 `}>
								Let's talk
							</button>
						</div>
					</form>
				</div>
			</CardContent>
		</Card>
	)
}
