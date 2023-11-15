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
				className="h-full mb-4 rounded-lg bg-[#F9FAFB]"
				options={options}
				placeholder={placeholder}
				value={selectedOptions}
				onChange={handleSelect}
				isSearchable
				name={name}
                styles={{
                    control: (baseStyles, state) => ({
                        ...baseStyles,
                        borderColor: state.isFocused ? '#07B6D4' : '#D1D5DB',
                        boxShadow: state.isFocused ? "var(--tw-ring-inset) 0 0 0 calc(1px + var(--tw-ring-offset-width)) #07B6D4" : "",
                        backgroundColor: "#F9FAFB",
                        borderRadius: "0.375rem",
                        paddingBlock: "2.3px"

                    }),
                }}
			/>
		</div>
	)
}

export default Selector
