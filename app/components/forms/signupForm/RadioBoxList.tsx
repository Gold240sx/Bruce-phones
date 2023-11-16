import React from "react"
import { ChangeEvent } from "react"

type Item = {
	name: string
}

type RadioBoxProps = {
	item: Item
	value: [key: string]
	setVals: any
	setterFunc: (value: { [key: string]: string }) => void
}

const RadioBox = ({ item, value, setterFunc, setVals }: RadioBoxProps) => {
	const { name } = item
	return (
		<label
			htmlFor={`radio-${name}`}
			className={`${
				name === setVals.benefits ? "ring-2 ring-indigo-500" : "hover:ring-2 hover:ring-indigo-300 active:ring-indigo-600"
			} flex items-center px-4 py-2 border rounded-lg cursor-pointer border-zinc-300 `}>
			<input
				id={`radio-${name}`}
				name="notification-method"
				type="radio"
				onChange={(e) => {
					setterFunc({
						[value]: name,
					})
				}}
				checked={name === setVals.benefits}
				className="w-4 h-4 text-indigo-600 border-gray-300 cursor-pointer focus:ring-indigo-600"
			/>
			<p className="block ml-3 text-base font-medium leading-6 text-gray-700 cursor-pointer ">{name}</p>
		</label>
	)
}

type RadioBoxListProps = {
	items: Item[]
	value: string
	setterFunc: any
	setVals: any
}

const RadioBoxList = ({ items, value, setterFunc, setVals }: RadioBoxListProps) => {
	return (
		<div className="space-y-2">
			{items.map((item) => (
				<RadioBox key={item.name} item={item} value={value} setterFunc={setterFunc} setVals={setVals} />
			))}
		</div>
	)
}

export default RadioBoxList
