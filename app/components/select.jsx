import React, { useState } from "react"
import Select from "react-select"

const Selector = ({ placeholder, options, handleOnChange, className, name }) => {
	const [selectedOptions, setSelectedOptions] = useState()

	function handleSelect(data) {
		setSelectedOptions(data)
		handleOnChange({ target: { name: name, value: data.value } }, "simpleArray")
	}

	return (
		<div className={` ${className}`}>
			<Select
				className=""
				options={options}
				placeholder={placeholder}
				value={selectedOptions}
				onChange={handleSelect}
				isSearchable
				name={name}
			/>
		</div>
	)
}

export default Selector
