import React, { useState, ChangeEvent, FormEvent, JSXElementConstructor, ReactElement, ReactNode, useEffect } from "react"
import { ExclamationCircleIcon } from "@heroicons/react/20/solid"
import Select from "../../select"
import { type Address, type Addresses } from "../multistep-form"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { format } from "date-fns"
import FormWrapper from "../formWrapper"

type ContactData = {
	email: string
	userAccount: boolean
	phoneDetails: {
		phoneNo: string
		phoneCountryCode: string
	}
	password: string
	formData: any
	setFormData: any
	register: any
	unregister: any
	watch: any
	errors: any
}

type ContactFormProps = ContactData & {
	// this type means we can update any or all fields that belong to the user Data.
	updateFields: (fields: Partial<ContactData>) => any
}

const valueToDropdownConversion = (stringArray: string[]) => {
	const objectArray = stringArray.map((string: string) => {
		return { label: string, value: string }
	})
	return objectArray
}
// const stateDropdown = valueToDropdownConversion(states)

const ContactForm = ({
	updateFields,
	email,
	userAccount,
	phoneDetails,
	password,
	formData,
	setFormData,
	register,
	unregister,
	watch,
	errors,
}: ContactFormProps) => {
	// useEffect(() => {
	// 	console.log()
	// }, [])

	const showData = () => {
		console.log("password", password)
		console.log("email", email)
		console.log("subscribed", userAccount)
		console.log("phoneNo", phoneDetails)
	}

	const formatPhoneNo = (inputValue: string) => {
		if (!inputValue) return inputValue
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

	const userAccountCheck = watch("userAccount")

	useEffect(() => {
		if (userAccount === "true") {
			register("password")
		} else {
			unregister("password")
		}
	}, [register, unregister, userAccountCheck])

	return (
		<FormWrapper className="" title="Contact Info">
			{/* form */}
			<div className="flex flex-wrap-reverse justify-between w-full mx-auto ">
				{/* left/bottom collumn/row */}

				<div className="flex flex-col w-full gap-6">
					<p className="flex items-center ml-auto -mb-6 w-fit">
						<span className="text-2xl font-bold text-red-600">*</span>
						<span className="font-semibold -translate-y-[5px]">Required</span>
					</p>
					<div
						className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
						aria-hidden="true">
						<div
							className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] translate-y-1/6 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
							style={{
								clipPath:
									"polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
							}}
						/>
						{/*  */}
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
						<div className="flex justify-between">
							<label htmlFor="phone" className="block text-sm font-semibold leading-6 text-gray-900">
								<span className="mr-1.5 text-lg font-bold text-red-600">*</span>
								Phone Number
							</label>
							<span className="text-sm leading-6 text-gray-500" id="email-required">
								Required
							</span>
						</div>
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
					<div className="flex flex-col items-start mx-2 text-xl align-middle ">
						<label className="text-xl font-semibold text-gray-900">Notifications</label>
						<p className="text-lg text-gray-500 ">
							Subscribe for future giveaways, product launches and programs alerts?{" "}
							<span className="text-zinc-400">
								(Subscribing will also create an account where you can supply any verification documents in the event you
								need to appeal the decision.)
							</span>
						</p>
						<fieldset className="mt-4 text-lg">
							<legend className="sr-only">Notification method</legend>
							<div className="mx-6 space-y-4 sm:flex sm:items-center sm:space-x-10 sm:space-y-0">
								<div className="flex items-center">
									<input
										id="userAccount-no"
										name="userAccount"
										type="radio"
										value="false"
										// checked={!userAccount}
										onChange={(e: any) =>
											updateFields({
												userAccount: e.target.value,
											})
										}
										{...register("userAccount")}
										className="w-4 h-4 text-indigo-600 border-gray-300 cursor-pointer focus:ring-indigo-600"
									/>
									<label
										htmlFor="userAccount-no"
										className="block ml-3 font-medium leading-6 text-gray-900 cursor-pointer">
										No
									</label>
								</div>

								<div className="flex items-center">
									<input
										id="userAccount-yes"
										name="userAccount"
										type="radio"
										value="true"
										// checked={userAccount}
										onChange={(e: any) =>
											updateFields({
												userAccount: e.target.value,
											})
										}
										{...register("userAccount")}
										className="w-4 h-4 text-indigo-600 border-gray-300 cursor-pointer focus:ring-indigo-600"
									/>
									<label
										htmlFor="userAccount-yes"
										className="block ml-3 font-medium leading-6 text-gray-900 cursor-pointer">
										Yes, I like free stuff!
									</label>
								</div>
								{errors.userAccount && (
									<p className="mt-2 text-sm text-red-600" id="email-error">
										{errors.userAccount.message}
									</p>
								)}
							</div>
							{/* {userAccountCheck} */}
						</fieldset>
					</div>
					{/* account creation */}
					{userAccountCheck === "true" && (
						<div className="mx-4 col-span-full group">
							<div className="flex justify-between">
								<label htmlFor="phone-number" className="block text-sm font-semibold leading-6 text-gray-900">
									Create an account password
								</label>
							</div>
							<div className="relative mt-2.5">
								<div className="absolute inset-y-0 left-0 flex items-center -translate-x-[3px] border rounded-l-lg rounded-r-none bg-zinc-50">
									<label htmlFor="country" className="sr-only">
										Create Password
									</label>
								</div>
								<input
									type="password"
									name="password"
									id="password"
									maxLength={16}
									// required={userAccount}
									// onChange={(e: any) => {
									// 	updateFields({
									// 		password: e.target.value,
									// 	})
									// }}
									{...register("password")}
									// value={password}
									className="block w-full rounded-md ring-t-none ring-b-none border-t-none border-b-none border-0 px-3.5 py-2  text-gray-900 shadow-sm ring-1  ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6"
								/>
								<div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
									{errors.password && <ExclamationCircleIcon className="w-5 h-5 text-red-500" aria-hidden="true" />}
								</div>
							</div>
							{errors.password && (
								<p className="mt-2 text-sm text-red-600" id="email-error">
									Please enter a valid password.
								</p>
							)}
						</div>
					)}
				</div>
			</div>
			{/* <button onClick={showData} className="mx-4 my-1 text-white bg-indigo-400">
				Show Data
			</button> */}
		</FormWrapper>
	)
}

export default ContactForm
