"use client"
import React, { useState, useEffect, FormEvent } from "react"
import FormWrapper from "./formWrapper"
import Image from "next/image"
import { ChevronDownIcon, ExclamationCircleIcon } from "@heroicons/react/20/solid"
import { Switch } from "@headlessui/react"
import DatePicker from "react-datepicker"
// import Select from "react-select"
import Select from "../select"
import MultiSelect from "../multiSelect"
import { FileInput, Label } from "flowbite-react"
import { format } from "date-fns"
import { AiFillInfoCircle } from "react-icons/ai"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../../components/ui/tooltip"

import "react-datepicker/dist/react-datepicker.css"

function classNames(...classes: string[]) {
	return classes.filter(Boolean).join(" ")
}



type UserData = {
	firstName: string
	middleInitial: string
	lastName: string
	phoneNo: string
	email: string
}

type UserFormProps = UserData & {
	// this type means we can update any or all fields that belong to the user Data.
	updateFields: (fields: Partial<UserData>) => void
}

const UserForm = ({ firstName, middleInitial, lastName, phoneNo, email, updateFields, zip, lastFour, DOB }: UserFormProps) => {
	const [imageSrc, _] = useState("")
	const [sameAsBilling, setSameAsBiling] = useState(true)
	const [dob, setDOB] = useState(new Date())

	function classNames(...classes: string[]) {
		return classes.filter(Boolean).join(" ")
	}

	const generateYearOptions = () => {
		const arr = []

		const startYear = 1920
		const endYear = new Date().getFullYear()

		for (let i = endYear; i >= startYear; i--) {
			arr.push({
				value: i.toString(), // Convert the year to a string
				label: i.toString(),
			})
		}

		return arr
	}
	const yearOptions = generateYearOptions()

	// const replaceWithAstrx = (string: string) => {
	// 	const characters = string.split("")
	// 	const asterisks = characters.map((char) => "*")
	// 	const output = asterisks.join("")
	// 	return output
	// }

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
		<FormWrapper className="grid grid-cols-1" title="User Details">
			{/* form */}
			<div className="flex flex-wrap-reverse justify-between w-10/12 gap-8 mx-auto">
				{/* left/bottom collumn/row */}
				<div className="w-full md:w-8/12 lg:ml-6 lg:w-5/12">
					<p className="items-center ml-auto w-fit">
						<span className="text-2xl font-bold text-red-600">*</span>
						<span className="font-semibold -translate-y-2">Required</span>
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
					<div className="max-w-xl mx-auto mt-5 sm:mt-5">
						<div className="grid grid-cols-3 gap-x-3 gap-y-6 sm:grid-cols-12">
							{/* form info */}
							<div className="col-span-6">
								<div className="flex justify-between">
									<label htmlFor="first-name" className="block text-sm font-semibold leading-6 text-gray-900">
										<span className="mr-1.5 text-lg font-bold text-red-600">*</span>
										First name
									</label>
									<span className="text-sm leading-6 text-gray-500" id="email-optional">
										Required
									</span>
								</div>
								<div className="mt-2.5">
									<input
										autoFocus
										type="text"
										name="first-name"
										id="first-name"
										required
										autoComplete="given-name"
										onChange={(e) =>
											updateFields({
												firstName: e.target.value,
											})
										}
										className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
									/>
								</div>
							</div>
							<div className="col-span-6">
								<div className="flex justify-between">
									<label htmlFor="last-name" className="block text-sm font-semibold leading-6 text-gray-900">
										<span className="mr-1.5 text-lg font-bold text-red-600">*</span>
										Last name
									</label>
									<span className="text-sm leading-6 text-gray-500" id="email-optional">
										Required
									</span>
								</div>
								<div className="mt-2.5">
									<input
										type="text"
										name="last-name"
										id="last-name"
										required
										autoComplete="family-name"
										onChange={(e) =>
											updateFields({
												lastName: e.target.value,
											})
										}
										className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
									/>
								</div>
							</div>
							<div className="col-span-4 col-start-3 ">
								<label htmlFor="DOB" className="block text-sm font-semibold leading-6 text-gray-900">
									<span className="mr-1.5 text-lg font-bold text-red-600">*</span>
									Date of Birth
								</label>
								<div className="mt-2.5">
									<DatePicker
										id="DOB"
										name="dob"
										required
										selected={dob}
										onChange={(date: any) => {
											const formattedDate = format(date, "MM-dd-yyyy") // Format the date
											updateFields({ DOB: formattedDate })
											setDOB(date)
										}}
										className="block w-full px-2 py-2 text-center text-gray-900 border-0 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
									/>
								</div>
							</div>
							<div className="col-span-5">
								<div className="flex justify-between">
									<label
										htmlFor="lastFour"
										className="block text-sm font-semibold leading-6 text-gray-900 whitespace-nowrap">
										<span className="mr-1.5 text-lg font-bold text-red-600">*</span>
										SSN (Last 4)
									</label>
									<TooltipProvider>
										<Tooltip>
											<TooltipTrigger className="flex items-end w-full">
												<AiFillInfoCircle className="pr-6 mt-1 ml-auto text-lg w-fit text-zinc-700" />
											</TooltipTrigger>
											<TooltipContent className="text-white rounded-lg bg-zinc-700 max-w-[520px]">
												<h4 className="my-2 text-lg font-bold"> Why is this being asked for?</h4>
												<p className="text-base text-zinc-200">
													Affordable Connectivity Program (ACP) is seeking to identify and confirm that the
													information you provide is truely yours and that it matches your eligibility claim.
												</p>
											</TooltipContent>
										</Tooltip>
									</TooltipProvider>
								</div>
								<div className="mt-2.5">
									<input
										type="text"
										name="lastFour"
										placeholder=""
										maxLength="4"
										// defaultValue={lastFour}
										aria-invalid="true"
										required
										aria-describedby="email-error"
										id="lastFour"
										autocomplete="off"
										onChange={(e) => {
											const result = e.target.value.replace(/\D/g, "")
											updateFields({
												lastFour: result,
											})
										}}
										value={lastFour}
										className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
									/>
								</div>
							</div>

							<div id="email-container" className="pt-6 col-span-full">
								<div className="flex justify-between">
									<label htmlFor="email" className="block text-sm font-semibold leading-6 text-gray-900">
										<span className="mr-1.5 text-lg font-bold text-red-600">*</span>
										Email
									</label>
									<span className="text-sm leading-6 text-gray-500" id="email-optional">
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
									<span className="text-sm leading-6 text-gray-500" id="email-optional">
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
										onChange={(e) => {
											const result = e.target.value.replace(/\D/g, "")

											updateFields({
												phoneNo: result,
											})
										}}
										value={formatPhoneNo(phoneNo)}
										className="block w-full rounded-md ring-t-none ring-b-none border-t-none border-b-none border-0 px-3.5 py-2 pl-[5.5rem] text-gray-900 shadow-sm ring-1  ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6"
									/>
								</div>
							</div>

							<div className="pt-6 col-span-full gap-y-4">
								<div className="py-2">
									<h3 className="text-xl font-semibold text-gray-900">Address</h3>
									<p className="pb-4 text-base text-zinc-600">Provide the address on your documents.</p>
								</div>
								<div className="flex justify-between">
									<label htmlFor="street-address" className="block text-sm font-semibold leading-6 text-gray-900">
										<span className="mr-1.5 text-lg font-bold text-red-600">*</span>
										Street address
									</label>
									<span className="text-sm leading-6 text-gray-500" id="email-optional">
										Required
									</span>
								</div>
								<div className="mt-2">
									<input
										type="text"
										name="street-address"
										id="street-address"
										required
										onChange={(e) =>
											updateFields({
												streetAddress: e.target.value,
											})
										}
										autoComplete="street-address"
										className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
									/>
								</div>
							</div>
							<div className="sm:col-span-6">
								<div className="flex justify-between">
									<label htmlFor="city" className="block text-sm font-semibold leading-6 text-gray-900">
										<span className="mr-1.5 text-lg font-bold text-red-600">*</span>
										City
									</label>
									<span className="text-sm leading-6 text-gray-500" id="email-optional">
										Required
									</span>
								</div>
								<div className="mt-2">
									<input
										type="text"
										name="city"
										id="city"
										autoComplete="address-level2"
										required
										onChange={(e) =>
											updateFields({
												city: e.target.value,
											})
										}
										className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
									/>
								</div>
							</div>
							<div className="sm:col-span-3">
								<label htmlFor="region" className="block text-sm font-semibold leading-6 text-gray-900">
									<span className="mr-1.5 text-lg font-bold text-red-600">*</span>
									State
								</label>
								<div className="mt-2">
									<Select
										placeholder="Year"
										handleOnChange={(e) =>
											updateFields({
												state: e.target.value,
											})
										}
										options={stateDropdown}
										name="region"
										className="h-full mb-4"
									/>
									{/* <input
										type="text"
										name="region"
										id="region"
										autoComplete="address-level1"
										required
										onChange={(e) =>
											updateFields({
												state: e.target.value,
											})
										}
										className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
									/> */}
								</div>
							</div>
							<div className="sm:col-span-3">
								<label htmlFor="postal-code" className="block text-sm font-semibold leading-6 text-gray-900">
									<span className="mr-1.5 text-lg font-bold text-red-600">*</span>
									Zip Code
								</label>
								<div className="mt-2">
									<input
										type="text"
										name="postal-code"
										id="postal-code"
										required
										maxLength="5"
										onChange={(e) => {
											const result = e.target.value.replace(/\D/g, "")
											updateFields({
												zip: result,
											})
										}}
										value={zip}
										autoComplete="postal-code"
										className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
									/>
								</div>
							</div>

							{/* toggle for address being same as the billing */}
							<Switch.Group as="div" className="flex items-center col-span-12 ml-auto">
								<Switch.Label as="span" className="flex pr-3 text-sm whitespace-nowrap">
									<span className="text-base font-medium text-gray-700">Document address same as shipping address?</span>
									{/* {sameAsBilling ? (
										<p className="ml-2 px-2 my-0.5 rounded-full text-white bg-lime-600">Yes</p>
									) : (
										<p className="ml-2 px-2 my-0.5 rounded-full text-white bg-red-600">NO</p>
									)} */}
								</Switch.Label>
								<Switch
									checked={sameAsBilling}
									onChange={setSameAsBiling}
									className={classNames(
										sameAsBilling ? "bg-indigo-600" : "bg-gray-200",
										"relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2"
									)}>
									<span
										aria-hidden="true"
										className={classNames(
											sameAsBilling ? "translate-x-5" : "translate-x-0",
											"pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
										)}
									/>
								</Switch>
							</Switch.Group>
							{!sameAsBilling && (
								<>
									<div className="pt-6 col-span-full gap-y-4">
										<div className="py-2">
											<h3 className="text-xl font-semibold text-gray-900">Shipping Address</h3>
											<p className="pb-4 text-base text-zinc-600">
												Where should we ship the device to? (if applicable)
											</p>
										</div>
										<div className="flex justify-between">
											<label
												htmlFor="street-address-deliv"
												className="block text-sm font-semibold leading-6 text-gray-900">
												<span className="mr-1.5 text-lg font-bold text-red-600">*</span>
												Street address
											</label>
											<span className="text-sm leading-6 text-gray-500" id="email-optional">
												Required
											</span>
										</div>
										<div className="mt-2">
											<input
												type="text"
												name="street-address-deliv"
												id="street-address-deliv"
												autoComplete="street-address"
												onChange={(e) =>
													updateFields({
														streetAddressDeliv: e.target.value,
													})
												}
												className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
											/>
										</div>
									</div>

									<div className="sm:col-span-6">
										<div className="flex justify-between">
											<label htmlFor="city-deliv" className="block text-sm font-semibold leading-6 text-gray-900">
												<span className="mr-1.5 text-lg font-bold text-red-600">*</span>
												City
											</label>
											<span className="text-sm leading-6 text-gray-500" id="email-optional">
												Required
											</span>
										</div>
										<div className="mt-2">
											<input
												type="text"
												name="city-deliv"
												id="city-deliv"
												autoComplete="address-level2"
												onChange={(e) =>
													updateFields({
														cityDeliv: e.target.value,
													})
												}
												className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
											/>
										</div>
									</div>

									<div className="sm:col-span-3">
										<label htmlFor="region-deliv" className="block text-sm font-semibold leading-6 text-gray-900">
											<span className="mr-1.5 text-lg font-bold text-red-600">*</span>
											State
										</label>
										<div className="mt-2">
											<Select
												placeholder="Year"
												handleOnChange={(e) =>
													updateFields({
														stateDeliv: e.target.value,
													})
												}
												options={stateDropdown}
												name="region-deliv"
												className=""
											/>
										</div>
									</div>

									<div className="sm:col-span-3">
										<label htmlFor="postal-code-deliv" className="block text-sm font-semibold leading-6 text-gray-900">
											<span className="mr-1.5 text-lg font-bold text-red-600">*</span>
											Zip Code
										</label>
										<div className="mt-2">
											<input
												type="text"
												name="postal-code-deliv"
												id="postal-code-deliv"
												autoComplete="postal-code"
												onChange={(e) =>
													updateFields({
														zipDeliv: e.target.value,
													})
												}
												className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
											/>
										</div>
									</div>
								</>
							)}
							<div className="col-span-12 pt-6">
								<label className="text-base font-semibold text-gray-900">
									<span className="mr-1.5 text-lg font-bold text-red-600">*</span>Which qualification do you meet?
								</label>
								<p className="text-base text-zinc-600">( Select one )</p>
								<fieldset className="mt-4">
									<legend className="sr-only">Benefits you would like to submit for eligibility</legend>
									<div className="space-y-4">
										<div className="flex items-center">
											<input
												id="radio-snap"
												name="notification-method"
												type="radio"
												defaultChecked={true}
												className="w-4 h-4 text-indigo-600 border-gray-300 cursor-pointer focus:ring-indigo-600"
											/>
											<label
												htmlFor="radio-snap"
												className="block ml-3 text-base font-medium leading-6 text-gray-700 cursor-pointer ">
												SNAP
											</label>
										</div>
										<div className="flex items-center">
											<input
												id="radio-wic"
												name="notification-method"
												type="radio"
												defaultChecked={false}
												className="w-4 h-4 text-indigo-600 border-gray-300 cursor-pointer focus:ring-indigo-600"
											/>
											<label
												htmlFor="radio-wic"
												className="block ml-3 text-base font-medium leading-6 text-gray-700 cursor-pointer ">
												WIC
											</label>
										</div>
										<div className="flex items-center">
											<input
												id="radio-medicaid"
												name="notification-method"
												type="radio"
												defaultChecked={false}
												className="w-4 h-4 text-indigo-600 border-gray-300 cursor-pointer focus:ring-indigo-600"
											/>
											<label
												htmlFor="radio-medicaid"
												className="block ml-3 text-base font-medium leading-6 text-gray-700 cursor-pointer ">
												Medicaid
											</label>
										</div>
										<div className="flex items-center">
											<input
												id="radio-pell-grant"
												name="notification-method"
												type="radio"
												defaultChecked={false}
												className="w-4 h-4 text-indigo-600 border-gray-300 cursor-pointer focus:ring-indigo-600"
											/>
											<label
												htmlFor="radio-pell-grant"
												className="block ml-3 text-base font-medium leading-6 text-gray-700 cursor-pointer ">
												Pell Grant
											</label>
										</div>
										<div className="flex items-center">
											<input
												id="radio-section8"
												name="notification-method"
												type="radio"
												defaultChecked={false}
												className="w-4 h-4 text-indigo-600 border-gray-300 cursor-pointer focus:ring-indigo-600"
											/>
											<label
												htmlFor="radio-section8"
												className="block ml-3 text-base font-medium leading-6 text-gray-700 cursor-pointer ">
												Section 8
											</label>
										</div>
										<div className="flex items-center">
											<input
												id="radio-school-lunch"
												name="notification-method"
												type="radio"
												defaultChecked={false}
												className="w-4 h-4 text-indigo-600 border-gray-300 cursor-pointer focus:ring-indigo-600"
											/>
											<label
												htmlFor="radio-school-lunch"
												className="block ml-3 text-base font-medium leading-6 text-gray-700 cursor-pointer ">
												National School Lunch
											</label>
										</div>
										<div className="flex items-center">
											<input
												id="radio-veterans"
												name="notification-method"
												type="radio"
												defaultChecked={false}
												className="w-4 h-4 text-indigo-600 border-gray-300 cursor-pointer focus:ring-indigo-600"
											/>
											<label
												htmlFor="radio-veterans"
												className="block ml-3 text-base font-medium leading-6 text-gray-700 cursor-pointer ">
												Veterans Pension and Survivors Benefit Program
											</label>
										</div>
										<div className="flex items-center">
											<input
												id="radio-income"
												name="notification-method"
												type="radio"
												defaultChecked={false}
												className="w-4 h-4 text-indigo-600 border-gray-300 cursor-pointer focus:ring-indigo-600"
											/>
											<label
												htmlFor="radio-income"
												className="block ml-3 text-base font-medium leading-6 text-gray-700 cursor-pointer ">
												Income below $26,000 / year
											</label>
										</div>
									</div>
								</fieldset>
							</div>

							<div className="max-w-md col-span-12 pt-6" id="fileUpload">
								<div className="block mb-2">
									<label htmlFor="postal-code" className="block text-sm font-semibold leading-6 text-gray-700">
										Supporting Documents File Upload
									</label>
									<Label htmlFor="file" value="(id, passport, w-2, tax-return)" className="" />
								</div>
								<FileInput helperText="Upload supporting documents" id="file" multiple />
							</div>
							{/* <Switch.Group as="div" className="flex gap-x-4 sm:col-span-full">
                            <div className="flex items-center h-6">
                                <Switch
                                    checked={agreed}
                                    onChange={setAgreed}
                                    className={classNames(
                                        agreed ? "bg-indigo-600" : "bg-gray-200",
                                        "flex w-8 flex-none cursor-pointer rounded-full p-px ring-1 ring-inset ring-gray-900/5 transition-colors duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    )}>
                                    <span className="sr-only">Agree to policies</span>
                                    <span
                                        aria-hidden="true"
                                        className={classNames(
                                            agreed ? "translate-x-3.5" : "translate-x-0",
                                            "h-4 w-4 transform rounded-full bg-white shadow-sm ring-1 ring-gray-900/5 transition duration-200 ease-in-out"
                                        )}
                                    />
                                </Switch>
                            </div>
                            <Switch.Label className="text-sm leading-6 text-gray-600">
                                By selecting this, you agree to our{" "}
                                <a href="#" className="font-semibold text-indigo-600">
                                    privacy&nbsp;policy
                                </a>
                                .
                            </Switch.Label>
                        </Switch.Group> */}
						</div>
						<div className="mt-10">
							<button
								type="submit"
								className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
								Submit
							</button>
						</div>
					</div>
				</div>

				{/* right/top collumn/row */}
				<div className="mb-12 md:mb-0 md:w-8/12 lg:w-6/12">
					{/* <img
								src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
								className="w-full"
								alt="Phone image"
							/> */}
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
		</FormWrapper>
	)
}

export default UserForm
