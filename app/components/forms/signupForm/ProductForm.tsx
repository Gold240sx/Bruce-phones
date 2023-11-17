"use client"
import React, { useState, ChangeEvent, FormEvent, JSXElementConstructor, ReactElement, ReactNode, useEffect } from "react"
import { type ImageType } from "../../newForms/Forms/newProductForm"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../../../components/ui/tooltip"
import { ExclamationCircleIcon } from "@heroicons/react/20/solid"
import { AiFillInfoCircle } from "react-icons/ai"
import Select from "../../select"
import { type Address, type Addresses } from "../multistep-form"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { format } from "date-fns"
import FormWrapper from "../formWrapper"
import { FileInput, Label } from "flowbite-react"
import ProductCard from "../productCard"

import x10Image from "../../../assets/images/DIALNX10G.png"
import x65Image from "../../../assets/images/DIALNX65.png"

type ProductData = {
	DOB: string
	benefits: string
	lastFour: string
}

type ProductFormProps = ProductData & {
	// this type means we can update any or all fields that belong to the user Data.
	updateFields: (fields: Partial<ProductData>) => void
	pickedProduct: string
}

export type Product = {
	name: string
	nickName: string
	tagline: string
	image: ImageType
	brand: string
	price: string
	screen: string
	connectivity: string
	storage: string
	cameras: string
	os: string
}
const ProductForm = ({ updateFields, pickedProduct }: ProductFormProps) => {
	const [pickedDevice, setPickedDevice] = useState(pickedProduct)
	// useEffect(() => {
	// 	console.log()
	// }, [])

	const showData = () => {
		// console.log("password", password)
	}

	const productData: Product[] = [
		{
			name: "DIALN X10G Tablet",
			nickName: "x10",
			tagline: '"10" Tablet with cellular',
			image: x10Image,
			brand: "DIALN",
			price: "$199.99",
			screen: '"10.1" HD+ 1280 x 800',
			connectivity: "Wifi + 4G",
			storage: "64 GB",
			cameras: "8MP + 8MP AF",
			os: "Android 13",
		},
		{
			name: "DIALN X65 Smartphone",
			nickName: "x65",
			tagline: '"6.5" Smartphone',
			image: x65Image,
			brand: "DIALN",
			price: "$99.99",
			screen: '"6.52" HD+ 720 x 1600',
			connectivity: "Wifi + 4G",
			storage: "32 GB / 3 GB",
			cameras: "13.0MP",
			os: "Android 13",
		},
	]

	return (
		<FormWrapper className="" title="Select your Product">
			{/* form */}
			<div className="flex flex-wrap-reverse justify-between w-full mx-auto ">
				{/* left/bottom collumn/row */}
				<div className="flex flex-col w-full grid-cols-12 gap-6">
					<p className="flex items-center ml-auto -mb-6 w-fit">
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

					{/* this is where the questions go */}
					{/* {productData.map((product: Product) => (
						// <ProductCard product={product} setValue={pickedProduct} pickedProduct={pickedDevice} setPickedProduct={setPickedDevice} />
					))} */}
				</div>
			</div>
			{/* <button onClick={showData} className="mx-4 my-1 text-white bg-indigo-400">
				Show Data
			</button> */}
		</FormWrapper>
	)
}

export default ProductForm
