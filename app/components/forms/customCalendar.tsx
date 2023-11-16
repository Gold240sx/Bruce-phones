"use client"
import React, { useEffect, useState, useRef } from "react"
import Calendar from "react-calendar"
import { format, parse } from "date-fns"

type ValuePiece = Date | null
type Value = ValuePiece | [ValuePiece, ValuePiece]

export const CustomCalendar = ({ updateFields, dob, setDOB, DOB }) => {
	const [value, onChange] = useState<Value>(new Date())
	const [showPicker, setShowPicker] = useState(false)
	const [inputValue, setInputValue] = useState("")
	const inputRef = useRef()

	// Function to handle input change
	const handleInputChange = (e) => {
		const inputDate = parse(e.target.value, "MM-dd-yyyy", new Date())
		if (!isNaN(inputDate.getTime())) {
			// If the parsed date is valid
			onChange(inputDate)
			setDOB(inputDate)
		}
		setInputValue(e.target.value)
	}

	useEffect(() => {
		setShowPicker(false)
	}, [value])

	const setInputFocus = () => {
		inputRef.current ? inputRef.current.focus() : null
	}

    const formattedValue = format(value, "MM-DD-YYYY")

	return (
		<div className="relative w-full">
			<div
				id="input-overlay"
				onClick={() => {
					setInputFocus()
					setShowPicker(true)
				}}
				className="absolute z-20 w-full h-10 rounded-lg cursor-text opacity-20 bg-zinc-600/50"></div>
			<input
				ref={inputRef}
				id="DOB"
				name="dob"
				required
				type="text"
				selected={dob}
				onChange={(date: any) => {
					const formattedDate = format(date, "MM-dd-yyyy") // Format the date
					updateFields({ DOB: formattedDate })
					setDOB(date)
				}}
				onClick={() => setShowPicker(!showPicker)}
				value={ formattedValue}
				className="block w-full px-2 py-2 text-center text-gray-900 border-0 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
			/>

			{showPicker && (
				<>
					<div className="fixed top-0 bottom-0 left-0 right-0 w-screen h-screen" onClick={() => setShowPicker(false)}></div>
					<Calendar
						onChange={onChange}
						value={value}
						minDate={new Date(1920, 0, 1)}
						maxDate={new Date()}
						className="absolute md:-translate-x-[22.5%] min-w-[400px]  z-10 flex-col items-center gap-1 py-6 mt-2 text-lg text-center bg-white border-2 shadow-lg justify-evenly rounded-xl border-zinc-400 w-fit"
					/>
				</>
			)}
		</div>
	)
}

{
	/* <style jsx>{`
									.react-calendar {
										max-width: 400px;
										padding-inline: 20px;
										overflow: scroll;
									}
									.react-calendar .react-calendar__tile {
										height: 45px;
									}
									.react-calendar .react-calendar__tile:disabled {
										color: #dadada !important;
										cursor: not-allowed;
										background-color: transparent !important;
									}
									.react-calendar button:hover {
										background-color: #f4f4f5;
										border-radius: 5px;
									}
									.react-calendar abbr:where([title]) {
										-webkit-text-decoration: none;
									}
									.react-calendar__navigation {
										justify-content: space-around;
										width: 100%;
										display: flex;
										padding-inline: 10%;
										font-size: 26px;
										padding-bottom: 20px;
									}
									.react-calendar__navigation button:hover {
										border-color: black;
										border-radius: 5px;
										cursor: pointer;
									}
									.react-calendar__navigation__label {
										flex-grow: 1;
									}
									.react-calendar__month-view__days__day--weekend {
										color: rgb(184, 69, 69);
									}
									.react-calendar__month-view__days__day--neighboringMonth {
										color: #aaaaac;
									}
									.react-calendar .react-calendar__tile--active {
										background-color: #1774a9 !important;
										color: white;
										border-radius: 5px;
									}
									.react-calendar .react-calendar__month-view__weekdays__weekday {
										font-weight: 500 !important;
										font-size: 20px !important;
										padding-bottom: 6px;
										text-decoration: none;
									}
									.react-calendar .react-calendar__navigation button {
										flex-grow: 1;
										font-size: 28px;
										font-weight: 200;
										height: 32px;
										border-radius: 999 !important;
									}
								`}</style> */
}

export default CustomCalendar
