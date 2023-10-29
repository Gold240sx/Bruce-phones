"use client"
import React, { useState, useEffect } from "react"
import FormWrapper from "./formWrapper"
import Image from "next/image"
import { ChevronDownIcon, ExclamationCircleIcon } from "@heroicons/react/20/solid"
import { Switch } from "@headlessui/react"
import Select from "react-select"

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

const UserForm = ({ firstName, middleInitial, lastName, phoneNo, email, updateFields }: UserFormProps) => {
	const [imageSrc, setImageSrc] = useState("")
	const [selectedYear, setSelectedYear] = useState(null)

	function classNames(...classes: string[]) {
		return classes.filter(Boolean).join(" ")
	}

	const generateYearOptions = () => {
		const arr = []

		const startYear = 1920
		const endYear = new Date().getFullYear()

		for (let i = endYear; i >= startYear; i--) {
			arr.push(
				<option value={i} className="text-lg text-black">
					{i}
				</option>
			)
		}

		return arr
	}
	const yearOptions = generateYearOptions()

	useEffect(() => {
		const fetchImage = async () => {
			const imageSrc =
				"https://images.pexels.com/photos/6146961/pexels-photo-6146961.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
			// "https://images.unsplash.com/photo-1694813646514-a22180621d4c?auto=format&fit=crop&q=80&w=870&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
			try {
				const response = await fetch(imageSrc)
				if (response.ok) {
					const blob = await response.blob()
					const imageUrl = URL.createObjectURL(blob)
					setImageSrc(imageUrl) // Set the image URL in state
				} else {
					console.error("Failed to fetch image")
				}
			} catch (error) {
				console.error("Error fetching image:", error)
			}
		}

		fetchImage()
	}, [])

	return (
		<FormWrapper className="grid grid-cols-1" title="User Details">
			{/* <label>First Name</label>
			<input
				autoFocus
				required
				type="text"
				name="firstName"
				value={firstName}
				onChange={(e) =>
					updateFields({
						firstName: e.target.value,
					})
				}
			/>
			<label>Middle Initial</label>
			<input
				required
				type="text"
				name="MI"
				maxLength={2}
				value={middleInitial}
				onChange={(e) =>
					updateFields({
						middleInitial: e.target.value,
					})
				}
			/>
			<label>Last Name</label>
			<input
				required
				type="text"
				name="lastName"
				value={lastName}
				onChange={(e) =>
					updateFields({
						lastName: e.target.value,
					})
				}
			/>
			<label>Phone Number</label>
			<input
				min={1}
				type="number"
				name="phoneNumber"
				value={phoneNo}
				onChange={(e) =>
					updateFields({
						phoneNo: e.target.value,
					})
				}
			/>
			<label>Email</label>
			<input
				required
				autoFocus
				type="email"
				name="email"
				value={email}
				onChange={(e) =>
					updateFields({
						email: e.target.value,
					})
				}
			/> */}

			{/* form */}
			<div className="flex flex-wrap-reverse justify-between w-10/12 gap-8 mx-auto">
				{/* left/bottom collumn/row */}
				<div className="w-full md:w-8/12 lg:ml-6 lg:w-5/12">
					<div className="flex pb-2 mr-auto">
						<h2 className="col-span-12 col-start-2 text-3xl ">Provide Your Info:</h2>
					</div>
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
					<form action="#" method="POST" className="max-w-xl mx-auto mt-5 sm:mt-5">
						<div className="grid grid-cols-3 gap-x-3 gap-y-6 sm:grid-cols-12">
							{/* form info */}
							<div className="col-span-4">
								<label htmlFor="first-name" className="block text-sm font-semibold leading-6 text-gray-900">
									First name
								</label>
								<div className="mt-2.5">
									<input
										type="text"
										name="first-name"
										id="first-name"
										autoComplete="given-name"
										className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
									/>
								</div>
							</div>
							<div className="col-span-2">
								<label htmlFor="first-name" className="block text-sm font-semibold leading-6 text-gray-900">
									M.I.
								</label>
								<div className="mt-2.5">
									<input
										type="text"
										name="mi-name"
										id="mi-name"
										autoComplete="middle-initial-name"
										className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
									/>
								</div>
							</div>
							<div className="col-span-6">
								<label htmlFor="last-name" className="block text-sm font-semibold leading-6 text-gray-900">
									Last name
								</label>
								<div className="mt-2.5">
									<input
										type="text"
										name="last-name"
										id="last-name"
										autoComplete="family-name"
										className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
									/>
								</div>
							</div>

							<div id="email-container" className="col-span-full">
								<div className="flex justify-between">
									<label htmlFor="email" className="block text-sm font-semibold leading-6 text-gray-900">
										Email
									</label>
									<span className="text-sm leading-6 text-gray-500" id="email-optional">
										Required
									</span>
								</div>
								<div className="relative w-full mt-2 rounded-md shadow-sm sm:col-span-2">
									<input
										type="email"
										name="email"
										placeholder="you@example.com"
										defaultValue="adamwathan"
										aria-invalid="true"
										aria-describedby="email-error"
										id="email"
										autoComplete="email"
										className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
									/>
									<div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
										<ExclamationCircleIcon className="w-5 h-5 text-red-500" aria-hidden="true" />
									</div>
								</div>
								<p className="mt-2 text-sm text-red-600" id="email-error">
									Not a valid email address.
								</p>
							</div>

							<div className="col-span-full">
								<label htmlFor="phone-number" className="block text-sm font-semibold leading-6 text-gray-900">
									Phone number
								</label>
								<div className="relative mt-2.5">
									<div className="absolute inset-y-0 left-0 flex items-center">
										<label htmlFor="country" className="sr-only">
											Country
										</label>
										<select
											id="country"
											name="country"
											className="h-full py-0 pl-4 text-gray-400 bg-transparent border-0 rounded-md bg-none pr-9 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm">
											<option>US</option>
											<option>CA</option>
											<option>EU</option>
										</select>
										<ChevronDownIcon
											className="absolute top-0 w-5 h-full text-gray-400 pointer-events-none right-3"
											aria-hidden="true"
										/>
									</div>
									<input
										type="tel"
										name="phone-number"
										id="phone-number"
										autoComplete="tel"
										className="block w-full rounded-md border-0 px-3.5 py-2 pl-20 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
									/>
								</div>
							</div>

							<div className="col-span-5">
								<label htmlFor="last-name" className="block text-sm font-semibold leading-6 text-gray-900">
									Last 4 of social
								</label>
								<div className="mt-2.5">
									<input
										type="number"
										name="last-four"
										min={1111}
										max={9999}
										minLength={4}
										maxLength={4}
										id="last-four"
										className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
									/>
								</div>
							</div>

							<div className="col-span-3">
								<label htmlFor="first-name" className="block text-sm font-semibold leading-6 text-gray-900">
									Year
								</label>
								<div className="mt-2.5">
									<Select
										className="form--dob-year text-zinc-700 "
										name="year"
										options={yearOptions}
										// onChange={(selectedOption) => setSelectedYear(selectedOption)}
										value={selectedYear}
										placeholder="Year"
									/>
								</div>
							</div>

							<div className="col-span-full gap-y-4">
								<div className="py-2">
									<h3 className="text-lg">Address</h3>
									<p>Provide the address on your documents.</p>
								</div>
								<label htmlFor="street-address" className="block text-sm font-semibold leading-6 text-gray-900">
									Street address
								</label>
								<div className="mt-2">
									<input
										type="text"
										name="street-address"
										id="street-address"
										autoComplete="street-address"
										className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
									/>
								</div>
							</div>

							<div className="sm:col-span-6">
								<label htmlFor="city" className="block text-sm font-semibold leading-6 text-gray-900">
									City
								</label>
								<div className="mt-2">
									<input
										type="text"
										name="city"
										id="city"
										autoComplete="address-level2"
										className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
									/>
								</div>
							</div>

							<div className="sm:col-span-3">
								<label htmlFor="region" className="block text-sm font-semibold leading-6 text-gray-900">
									State
								</label>
								<div className="mt-2">
									<input
										type="text"
										name="region"
										id="region"
										autoComplete="address-level1"
										className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
									/>
								</div>
							</div>

							<div className="sm:col-span-3">
								<label htmlFor="postal-code" className="block text-sm font-semibold leading-6 text-gray-900">
									Zip Code
								</label>
								<div className="mt-2">
									<input
										type="text"
										name="postal-code"
										id="postal-code"
										autoComplete="postal-code"
										className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
									/>
								</div>
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
					</form>
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
