import React, { useState, ChangeEvent, FormEvent, JSXElementConstructor, ReactElement, ReactNode, useEffect } from "react"
import Select from "../../select"
import { type Address, type Addresses } from "../multistep-form"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { format } from "date-fns"

type UserData = {
	firstName: string
	middleInitial: string
	lastName: string
	address: Addresses
	email: string
	DOB: Date | string | null
	benefits: string
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

const UserForm = ({ updateFields, DOB }: UserFormProps) => {
	const [dob, _] = useState(DOB)

	useEffect(() => {
		console.log(DOB)
	}, [dob])
	return <p>userForm</p>
}

export default UserForm
