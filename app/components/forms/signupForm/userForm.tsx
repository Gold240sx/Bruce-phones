import React, { useState, ChangeEvent, FormEvent, JSXElementConstructor, ReactElement, ReactNode, useEffect } from "react"
import { ExclamationCircleIcon } from "@heroicons/react/20/solid"
import Select from "../../select"
import { type Address, type Addresses } from "../multistep-form"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { format } from "date-fns"
import FormWrapper from "../formWrapper"
import { Switch } from "@headlessui/react"

type UserData = {
	firstName: string
	lastName: string
	address: Addresses
	formData: any
	setFormData: any
	register: any
	unregister: any
	watch: any
	errors: any
}

type UserFormProps = UserData & {
	// this type means we can update any or all fields that belong to the user Data.
	updateFields: (fields: Partial<UserData>) => any
}

function classNames(...classes: string[]) {
	return classes.filter(Boolean).join(" ")
}

const states = [
	"AL",
	"AK",
	"AZ",
	"AR",
	"CA",
	"CO",
	"CT",
	"DE",
	"FL",
	"GA",
	"HI",
	"ID",
	"IL",
	"IN",
	"IA",
	"KS",
	"KY",
	"LA",
	"ME",
	"MD",
	"MA",
	"MI",
	"MN",
	"MS",
	"MO",
	"MT",
	"NE",
	"NV",
	"NH",
	"NJ",
	"NM",
	"NY",
	"NC",
	"ND",
	"OH",
	"OK",
	"OR",
	"PA",
	"RI",
	"SC",
	"SD",
	"TN",
	"TX",
	"UT",
	"VT",
	"VA",
	"WA",
	"WV",
	"WI",
	"WY",
]

const valueToDropdownConversion = (stringArray: string[]) => {
	const objectArray = stringArray.map((string: string) => {
		return { label: string, value: string }
	})
	return objectArray
}
const stateDropdown = valueToDropdownConversion(states)

const UserForm = ({
	updateFields,
	firstName,
	lastName,
	address,
	formData,
	setFormData,
	register,
	unregister,
	watch,
	errors,
}: UserFormProps) => {
	const [sameAsBilling, setSameAsBiling] = useState(true)

	return (
		<FormWrapper className="" title="User Details">
			{/* form */}
			<div className="flex flex-wrap-reverse justify-between w-full mx-auto ">
				{/* left/bottom collumn/row */}

				<div className="flex flex-col w-full gap-6 md:grid md:grid-cols-12">
					<p className="flex items-center ml-auto -mb-4 w-fit md:col-span-12">
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
					</div>
					{/* form questions go below here */}
					<div className="col-span-full md:col-span-6">
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
					<div className="col-span-full md:col-span-6">
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
					<div className="col-span-full gap-y-4">
						<div className="pt-2">
							<h3 className="text-xl font-semibold text-gray-900">Address</h3>
							<p className="pb-4 text-base text-zinc-600">Provide the address on your documents.</p>
						</div>
						<div className="flex justify-between">
							<label htmlFor="street-address" className="block text-sm font-semibold leading-6 text-gray-900">
								<span className="mr-1.5 text-lg font-bold text-red-600">*</span>
								Street Address
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
								placeholder="Your Address: (XXXX adams st Apt 104)"
								onChange={(e: ChangeEvent<HTMLInputElement>) =>
									updateFields({
										address: {
											...address,
											document: {
												...address.document,
												street: e.target.value,
											},
										},
									})
								}
								// value={address.document.street}
								autoComplete="street-address"
								className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								{...register("addressLn1")}
								value={formData.addressLn1}
								// onChange={(e) => setFormData({ ...formData, addressLn1: e.target.value })}
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
								autoComplete="address-city"
                                placeholder="City"
								onChange={(e: ChangeEvent<HTMLInputElement>) =>
									updateFields({
										address: {
											...address,
											document: {
												...address.document,
												city: e.target.value,
											},
										},
									})
								}
                                		{...register("addressDetails.document.city")}
								value={formData.addressLn1}
								// onChange={(e) => setFormData({ ...formData, addressLn1: e.target.value })}
								// value={address.document.city}
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
								handleOnChange={(e: ChangeEvent<HTMLSelectElement>) =>
									updateFields({
										address: {
											...address,
											document: {
												...address.document,
												state: e.target.value,
											},
										},
									})
								}
								options={stateDropdown}
								name="region"
                                {...register("addressDetails.document.city")}
								value={formData.state}
								// onChange={(e) => setFormData({ ...formData, addressDetails.document.city: e.target.value })}
								className="h-full mb-4"
							/>
						</div>
					</div>
					<div className="sm:col-span-3">
						<label htmlFor="postal-code" className="block text-sm font-semibold leading-6 text-gray-900 whitespace-nowrap">
							<span className="mr-1.5 text-lg font-bold text-red-600 ">*</span>
							Zip Code
						</label>
						<div className="mt-2">
							<input
								type="text"
								name="postal-code"
								id="postal-code"
								placeholder="Zip / Postal"
								maxLength="5"
								onChange={(e: ChangeEvent<HTMLInputElement>) => {
									const result = e.target.value.replace(/\D/g, "")
									updateFields({
										address: {
											...address,
											document: {
												...address.document,
												zip: result,
											},
										},
									})
								}}
								// value={address.document.zip}
								autoComplete="postal-code"
                                {...register("addressDetails.document.zip")}
								value={formData.addressLn1}
								// onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
								className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
							/>
						</div>
					</div>

					{/* toggle for address being same as the billing */}
					<Switch.Group as="div" className="flex items-center col-span-12 ml-auto">
						<Switch.Label as="span" className="flex w-full pr-6 text-sm lg:whitespace-nowrap">
							<span className="w-full text-base font-medium text-gray-700">Document address same as shipping address?</span>
							{/* {sameAsBilling ? (
										<p className="ml-2 px-2 my-0.5 rounded-full text-white bg-lime-600">Yes</p>
									) : (
										<p className="ml-2 px-2 my-0.5 rounded-full text-white bg-red-600">NO</p>
									)} */}
						</Switch.Label>
						<Switch
							checked={sameAsBilling}
							// onChange={(e: ChangeEvent<HTMLInputElement>) => {
							// 	const result = e.target.value.replace(/\D/g, "")
							// 	updateFields({
							// 		address: {
							// 			...address,
							// 			document: {
							// 				...address.document,
							// 				zip: result,
							// 			},
							// 		},
							// 	})
							// }}
							onChange={() => {
								updateFields({
									address: { ...address, docEqDelivAdd: !sameAsBilling },
								})
								setSameAsBiling(!sameAsBilling)
							}}
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
							<div className=" col-span-full gap-y-4">
								<div className="py-2">
									<h3 className="text-xl font-semibold text-gray-900">Shipping Address</h3>
									<p className="pb-4 text-base text-zinc-600">Where should we ship the device to? (if applicable)</p>
								</div>
								<div className="flex justify-between">
									<label htmlFor="street-address-deliv" className="block text-sm font-semibold leading-6 text-gray-900">
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
                                        placeholder="Your Address: (XXXX adams st Apt 104)"
										autoComplete="street-address"
										handleOnChange={(e: ChangeEvent<HTMLInputElement>) => {
											updateFields({
												address: {
													...address,
													physical: {
														...address.physical,
														street: e.target.value,
													},
												},
											})
										}}
										value={address.physical.street}
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
                                        placeholder="City"
										autoComplete="address-level2"
										handleOnChange={(e: ChangeEvent<HTMLInputElement>) => {
											updateFields({
												address: {
													...address,
													physical: {
														...address.physical,
														city: e.target.value,
													},
												},
											})
										}}
										value={address.physical.city}
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
										handleOnChange={(e: ChangeEvent<HTMLSelectElement>) => {
											updateFields({
												address: {
													...address,
													physical: {
														...address.physical,
														state: e.target.value,
													},
												},
											})
										}}
										value={address.physical.state}
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
                                        placeholder="Zip / Postal"
										handleOnChange={(e: ChangeEvent<HTMLInputElement>) => {
											updateFields({
												address: {
													...address,
													physical: {
														...address.physical,
														zip: e.target.value,
													},
												},
											})
										}}
										value={address.physical.zip}
										className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
									/>
								</div>
							</div>
						</>
					)}
				</div>
			</div>
		</FormWrapper>
	)
}

export default UserForm
