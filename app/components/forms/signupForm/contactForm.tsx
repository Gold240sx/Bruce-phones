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
	subscribed: boolean
	phoneDetails: {
		phoneNo: string
		phoneCountryCode: string
	}
	password: string
}

type ContactFormProps = ContactData & {
	// this type means we can update any or all fields that belong to the user Data.
	updateFields: (fields: Partial<ContactData>) => void
}

const valueToDropdownConversion = (stringArray: string[]) => {
	const objectArray = stringArray.map((string: string) => {
		return { label: string, value: string }
	})
	return objectArray
}
// const stateDropdown = valueToDropdownConversion(states)

const ContactForm = ({ updateFields, email, phoneDetails, subscribed, password }: ContactFormProps) => {
	// useEffect(() => {
	// 	console.log()
	// }, [])

	const showData = () => {
		console.log("password", password)
		console.log("email", email)
		console.log("subscribed", subscribed)
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

	return (
		<FormWrapper className="" title="User Details">
			<div id="email-container" className="pt-6 col-span-full">
				<div className="flex justify-between">
					<label htmlFor="email" className="block text-sm font-semibold leading-6 text-gray-900">
						<span className="mr-1.5 text-lg font-bold text-red-600">*</span>
						Email
					</label>
					<span className="text-sm leading-6 text-gray-500" id="email-required">
						Required
					</span>
				</div>
				<div className="relative w-full mt-2 rounded-md sm:col-span-2">
					<input
						type="email"
						name="email"
						placeholder="you@example.com"
						defaultValue="adamwathan"
						aria-invalid="true"
						required
						aria-describedby="email-error"
						id="email"
						autoComplete="email"
						onChange={(e) =>
							updateFields({
								email: e.target.value,
							})
						}
						value={email}
						className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
					/>
					<div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
						<ExclamationCircleIcon className="w-5 h-5 text-red-500" aria-hidden="true" />
					</div>
				</div>
				<p className="mt-2 text-sm text-red-600" id="email-error">
					Not a valid email address.
				</p>
			</div>
			<div className="col-span-full group">
				<div className="flex justify-between">
					<label htmlFor="phone-number" className="block text-sm font-semibold leading-6 text-gray-900">
						<span className="mr-1.5 text-lg font-bold text-red-600">*</span>
						Phone Number
					</label>
					<span className="text-sm leading-6 text-gray-500" id="phone-required">
						Required
					</span>
				</div>
				<div className="relative mt-2.5">
					<div className="absolute inset-y-0 left-0 flex items-center -translate-x-[3px] border rounded-l-lg rounded-r-none bg-zinc-50">
						<label htmlFor="country" className="sr-only">
							Country
						</label>
						<select
							id="country"
							name="country"
							onChange={(e: ChangeEvent<HTMLSelectElement>) => {
								const newPhoneDetails = {
									...phoneDetails,
									phoneCountryCode: e.target.value,
								}
								updateFields({
									phoneDetails: newPhoneDetails,
								})
							}}
							value={phoneDetails.phoneCountryCode}
							className="h-full py-0 pl-4 text-gray-400 bg-transparent border-0 rounded-md rounded-r-none ring-t-none ring-b-none border-t-none border-b-none bg-none pr-9 focus:ring-2 focus:ring-inset group-hover:ring-indigo-600 sm:text-sm">
							<option>US</option>
							<option>CA</option>
							<option>MX</option>
						</select>
					</div>
					<input
						type="text"
						name="phone-number"
						id="phone-number"
						required
						autoComplete="tel"
						maxLength="15"
						onChange={(e: ChangeEvent<HTMLSelectElement>) => {
							const result = e.target.value.replace(/\D/g, "")
							const newPhoneDetails = {
								...phoneDetails,
								phoneNo: result,
							}

							updateFields({
								phoneDetails: newPhoneDetails,
							})
						}}
						value={formatPhoneNo(phoneDetails.phoneNo)}
						className="block w-full rounded-md ring-t-none ring-b-none border-t-none border-b-none border-0 px-3.5 py-2 pl-[5.5rem] text-gray-900 shadow-sm ring-1  ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6"
					/>
				</div>
			</div>
			<div className="flex flex-col items-start mx-2 text-xl align-middle ">
				<label className="text-xl font-semibold text-gray-900">Notifications</label>
				<p className="text-lg text-gray-500 ">
					Subscribe for future giveaways, product launches and programs alerts?{" "}
					<span className="text-zinc-400">
						(Subscribing will also create an account where you can supply any verification documents in the event you need to
						appeal the decision.)
					</span>
				</p>
				<fieldset className="mt-4 text-lg">
					<legend className="sr-only">Notification method</legend>
					<div className="mx-6 space-y-4 sm:flex sm:items-center sm:space-x-10 sm:space-y-0">
						<div className="flex items-center">
							<input
								id="subscribed-no"
								name="subscribed"
								type="radio"
								value="no"
								checked={!subscribed}
								onChange={(e) =>
									updateFields({
										subscribed: false,
									})
								}
								className="w-4 h-4 text-indigo-600 border-gray-300 cursor-pointer focus:ring-indigo-600"
							/>
							<label htmlFor="subscribed-no" className="block ml-3 font-medium leading-6 text-gray-900 cursor-pointer">
								No
							</label>
						</div>
						<div className="flex items-center">
							<input
								id="subscribed-yes"
								name="subscribed"
								type="radio"
								value="yes"
								checked={subscribed}
								onChange={(e) =>
									updateFields({
										subscribed: true,
									})
								}
								className="w-4 h-4 text-indigo-600 border-gray-300 cursor-pointer focus:ring-indigo-600"
							/>
							<label htmlFor="subscribed-yes" className="block ml-3 font-medium leading-6 text-gray-900 cursor-pointer">
								Yes, I like free stuff!
							</label>
						</div>
					</div>
				</fieldset>
			</div>
			{/* account creation */}
			{subscribed && (
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
							maxLength="16"
							required={subscribed}
							onChange={(e: ChangeEvent<HTMLSelectElement>) => {
								updateFields({
									password: e.target.value,
								})
							}}
							value={password}
							className="block w-full rounded-md ring-t-none ring-b-none border-t-none border-b-none border-0 px-3.5 py-2  text-gray-900 shadow-sm ring-1  ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6"
						/>
					</div>
				</div>
			)}
			{/* <button onClick={showData} className="mx-4 my-1 text-white bg-indigo-400">
				Show Data
			</button> */}
		</FormWrapper>
	)
}

export default ContactForm
