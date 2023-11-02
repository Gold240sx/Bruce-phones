"use client"
import React, { useEffect, useState } from "react"
import { type Product } from "./signupForm/ProductForm"
import Image from "next/image"
import { ChevronDownIcon } from "@heroicons/react/24/outline"

const ProductCard = ({
	product,
	pickedProduct,
	setPickedProduct,
}: {
	product: Product
	pickedProduct: string
	setPickedProduct: () => void
}) => {
	const { name, brand, price, os, screen, connectivity, storage, cameras, tagline, nickName, image } = product
	const [cardEpanded, setCardExpanded] = useState(false)

	useEffect(() => {
		setCardExpanded(false)
	}, [pickedProduct])

	return (
		<div
			className={`${
				pickedProduct === nickName ? "border-indigo-500" : "border-indigo-200 cursor-pointer"
			}  flex p-4 text-lg border rounded-md relative product-card-container rounded-tl-2xl shadow-2xl transition-all duration-500 ease-linear rounded-br-3xl bg-zinc-50`}>
			<div className={`flex flex-col items-start w-full gap-3  ${cardEpanded && "pb-12"}`}>
				<div className="flex gap-1">
					<div
						className={`${
							pickedProduct === nickName ? "bg-indigo-500" : "bg-indigo-200"
						} w-5 h-5 -translate-x-2 aspect-square transition-colors duration-300 -translate-y-2  border-2 rounded-full border-zinc-700`}></div>
					<div className="w-auto h-[120px] ml-auto aspect-square object-cover rounded-lg overflow-hidden">
						<Image
							src={image}
							width={140}
							height={140}
							alt="product image"
							style={{ width: "cover", height: "100%" }}
							className="overflow-hidden rounded-xl"
						/>
					</div>
					<div className="pl-2">
						<h4 className=" text-zinc-800">Name: {name}</h4>
						<p className=" text-zinc-500">{tagline}</p>
						<button
							onClick={() => {
								setPickedProduct(nickName)
							}}
							type="button"
							disabled={pickedProduct === nickName}
							className={`${
								pickedProduct === nickName
									? "bg-indigo-500 cursor-default border-2 border-transparent text-white"
									: "border-indigo-500 text-indigo-700 border-2 hover:bg-indigo-400 hover:text-white transition-100"
							} px-6 py-1 mt-2 text-lg   transition-colors duration-300  rounded-lg`}>
							{pickedProduct === nickName ? "Selected" : "Select"}
						</button>
					</div>
				</div>
				<div className="w-full px-6">
					{cardEpanded && (
						<div className="w-full pb-4 h-fit bg-zinc-200/50 rounded-xl min-h-24">
							<h2 className="p-2 font-bold text-zinc-500 ">Product Details</h2>
							<ul className="pt-2 pl-4 text-lg text-indigo-400 ">
								<li>
									<span className="pr-2 font-bold text-zinc-500">Brand:</span>
									{brand}
								</li>
								<li>
									<span className="pr-2 font-bold text-zinc-500">Retail Price:</span>
									{price}
								</li>
								<li>
									<span className="pr-2 font-bold text-zinc-500">Screen:</span>
									{screen}
								</li>
								<li>
									<span className="pr-2 font-bold text-zinc-500">Connnectivity:</span>
									{connectivity}
								</li>
								<li>
									<span className="pr-2 font-bold text-zinc-500">Storage + Ram:</span>
									{storage}
								</li>
								<li>
									<span className="pr-2 font-bold text-zinc-500">Cameras:</span>
									{cameras}
								</li>
								<li>
									<span className="pr-2 font-bold text-zinc-500">OS:</span>
									{os}
								</li>
							</ul>
						</div>
					)}
				</div>
			</div>

			<div className={` w-fit h-10   absolute right-2 bottom-2  rounded-full flex items-center gap-3 `}>
				<p> {cardEpanded ? "Close" : "More Info"}</p>
				<div
					onClick={() => setCardExpanded(!cardEpanded)}
					className={`${
						cardEpanded ? "rotate-180 transition-all duration-500 ease-in-out " : "shadow-inner"
					} bg-zinc-200 cursor-pointer w-10 h-10 aspect-square  rounded-full  shadow-black/20 justify-center items-center content-center flex`}>
					<ChevronDownIcon className="w-3/4 m-auto text-gray-400 pointer-events-none " aria-hidden="true" />
				</div>
			</div>
		</div>
	)
}

export default ProductCard

// <Image
// 	className="object-cover ml-auto bg-center"
// 	src={imageSrc}
// 	alt="People enjoying mobile phone use"
// 	sizes="100vh"
// 	style={{
// 		width: "cover",
// 		height: "100%",
// 	}}
// 	width={700}
// 	height={900}
// />
