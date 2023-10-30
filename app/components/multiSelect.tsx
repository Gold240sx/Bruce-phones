import React, { FormEvent, useState } from "react"
import Select from "react-select"

const MultiSelect = ({ id, placeholder, options, handleOnChange, className, name }: MultiSelectProps) => {
	const [selectedOptions, setSelectedOptions] = useState()
	const isMulti = true

	function handleSelect(data: any) {
		setSelectedOptions(data)
		const selectedValues = data.map((item: itemProps) => item.value) // Extract values from selected items
		handleOnChange({ target: { name: name, value: selectedValues } }, "simpleArray") // Pass selected values to handleOnChange
	}

	return (
		<div className={className}>
			<Select
				id={id}
				options={options}
				placeholder={placeholder}
				value={selectedOptions}
				onChange={handleSelect}
				isSearchable
				name={name}
				isMulti={isMulti}
			/>
		</div>
	)
}

type MultiSelectProps = {
	id: string
	placeholder: string
	options: any
	handleOnChange: FormEvent
	className: string
	name: string
}

type handleProps = {
	target: {
		name: string
		value: string
	}
}

type itemProps = {
	value: string
}

export default MultiSelect
