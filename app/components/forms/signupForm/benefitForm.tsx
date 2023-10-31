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

const valueToDropdownConversion = (stringArray: string[]) => {
	const objectArray = stringArray.map((string: string) => {
		return { label: string, value: string }
	})
	return objectArray
}

const BenefitForm = ({ updateFields }: UserFormProps) => {
	useEffect(() => {
		// console.log()
	}, [])
	return <p>benefits</p>
}

export default BenefitForm
