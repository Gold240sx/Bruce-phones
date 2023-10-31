import React, { useState, ChangeEvent, FormEvent, JSXElementConstructor, ReactElement, ReactNode, useEffect } from "react"
import Select from "../select"
import { type Address, type Addresses } from "./multistep-form"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { format } from "date-fns"

type UserData = {
	firstName: string
	// middleInitial: string
	// lastName: string
	// phoneNo: string
	address: Addresses
	// email: string
	DOB: Date | string | null
	// benefits: string
}

type UserFormProps = UserData & {
	// this type means we can update any or all fields that belong to the user Data.
	updateFields: (fields: Partial<UserData>) => void
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

const TestForm = ({ updateFields, firstName, address, DOB }: UserFormProps) => {
	const [dob, setDOB] = useState(DOB)

	useEffect(() => {
		console.log(DOB)
	}, [dob])
	return (
		<div>
			<input
				type="text"
				name="firstName"
				placeholder="first Name"
				onChange={(e) =>
					updateFields({
						firstName: e.target.value,
					})
				}
				value={firstName}
			/>
			<Select
				placeholder="State"
				handleOnChange={(e: ChangeEvent<HTMLSelectElement>) => {
					updateFields({
						address: {
							...address,
							document: {
								...address.document,
								state: e.target.value,
							},
						},
					})
				}}
				options={stateDropdown}
				name="region"
				className="h-full mb-4"
			/>
			{/* <DatePicker
				id="DOB"
				name="dob"
				required
				selected={dob}
				onChange={(date: any) => {
					const formattedDate: string = format(date, "MM-dd-yyyy") // Format the date
					updateFields({ DOB: formattedDate })
					setDOB(date)
				}}
				value={DOB}
				className="block w-full px-2 py-2 text-center text-gray-900 border-0 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
			/> */}
			<div className="flex items-center">
				<input
					id="radio-snap"
					name="notification-method"
					type="radio"
					defaultChecked={true}
					onChange={(e) =>
						updateFields({
							benefits: e.target.checked === true ? "SNAP" : null,
						})
					}
					className="w-4 h-4 text-indigo-600 border-gray-300 cursor-pointer focus:ring-indigo-600"
				/>
				<label htmlFor="radio-snap" className="block ml-3 text-base font-medium leading-6 text-gray-700 cursor-pointer ">
					SNAP
				</label>
			</div>
			<div className="flex items-center">
				<input
					id="radio-wic"
					name="notification-method"
					type="radio"
					defaultChecked={false}
					onChange={(e) =>
						updateFields({
							benefits: e.target.checked === true ? "WIC" : null,
						})
					}
					className="w-4 h-4 text-indigo-600 border-gray-300 cursor-pointer focus:ring-indigo-600"
				/>
				<label htmlFor="radio-wic" className="block ml-3 text-base font-medium leading-6 text-gray-700 cursor-pointer ">
					WIC
				</label>
			</div>

			{/* 1------------------------------------------------------------ */}
			{/* 1------------------------------------------------------------ */}
			{/* 1------------------------------------------------------------ */}
			<h1 className="text-2xl">Input types to data tests</h1>
			<ul>
				<li className="flex items-center gap-2 text-lg">
					<input type="checkbox" checked={true} />
					<label className="capitalize">text</label>
				</li>
				<li className="flex items-center gap-2 text-lg">
					<input type="checkbox" checked={true} />
					<label className="capitalize">nested values + dropdowns (address) </label>
				</li>
				<li className="flex items-center gap-2 text-lg">
					<input type="checkbox" checked={true} />
					<label className="capitalize">date</label>
				</li>
				<li className="flex items-center gap-2 text-lg">
					<input type="checkbox" checked={true} />
					<label className="capitalize">radio</label>
				</li>
			</ul>
		</div>
	)
}

export default TestForm
