"use client"
import React, { useState } from "react"
import FormWrapper from "./formWrapper"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card"
import Image from "next/image"

import x10Image from "../../assets/images/DIALNX10G.png"
import DIALNX65 from "../../assets/images/DIALNX65.png"

type DeviceData = {
	device: string
	subscribed: boolean
}

type DeviceFormProps = DeviceData & {
	// this type means we can update any or all fields that belong to the user Data.
	updateFields: (fields: Partial<DeviceData>) => void
}

const DeviceForm = ({ device, subscribed, updateFields }: DeviceFormProps) => {
	const [pickedProduct, setPickedProduct] = useState("x65")

	return (
		<FormWrapper className="flex flex-col gap-3" title="Product Selection">
			{/* product Selection */}
			<div className="grid grid-cols-12 gap-8 pb-4">
				<h2 className="col-span-12 col-start-2 pl-3 text-3xl ">Select item:</h2>
			</div>
			<div className="flex flex-col gap-8 px-10 pb-10 lg:grid lg:grid-cols-12">
				{/* Phone*/}
				<div className="tablet h-[370px] col-span-5 col-start-2">
					<Card
						onClick={() => setPickedProduct("x65")}
						className={`${
							pickedProduct === "x65"
								? "border-fuchsia-500 shadow-2xl shadow-[#ff4694]/40"
								: "border-4 border-zinc-100 cursor-pointer saturate-50  bg-zinc-50"
						} h-full `}>
						<CardHeader className="relative pt-4">
							<CardTitle className="text-3xl font-semibold text-center text-[#ff4694]  inline-block w-fit mx-auto">
								DIALN X65 Smartphone
							</CardTitle>
							<CardDescription className="text-lg text-center max-w-2/3">6.5" Smartphone</CardDescription>
						</CardHeader>
						<CardContent className="h-full pb-6 overflow-scroll">
							<div className="flex justify-between w-full">
								{/* Product Info */}
								<div className="w-2/3 info">
									<h3 className="text-2xl text-zinc-700">Product Info</h3>
									<ul className="pt-2 pl-2 text-lg text-[#ff4694] ">
										<li>
											<span className="pr-2 font-bold text-black">Brand:</span>DIALN
										</li>
										<li>
											<span className="pr-2 font-bold text-black">Retail Price:</span>$99
										</li>
										<li>
											<span className="pr-2 font-bold text-black">Screen:</span>6.5" HD+ 1280 x 800
										</li>
										<li>
											<span className="pr-2 font-bold text-black">Connnectivity:</span>Wifi + 4G
										</li>
										<li>
											<span className="pr-2 font-bold text-black">Storage + Ram:</span>32 GB / 3 GB
										</li>
										<li>
											<span className="pr-2 font-bold text-black">Cameras:</span>13.0MP
										</li>
										<li>
											<span className="pr-2 font-bold text-black">OS:</span>Android 13
										</li>
									</ul>
								</div>
								<div className="items-center w-1/3">
									<Image
										className="object-cover ml-auto bg-center"
										src={DIALNX65}
										alt="People enjoying mobile phone use"
										sizes="100vw"
										style={{
											width: "100%",
											height: "auto",
										}}
										width={300}
										height={300}
									/>
								</div>
							</div>
						</CardContent>
					</Card>
				</div>

				{/* tablet */}
				<div className="tablet h-[370px] col-span-5">
					<Card
						onClick={() => setPickedProduct("x10")}
						className={`${
							pickedProduct === "x10"
								? "border-fuchsia-500 shadow-2xl shadow-[#776fff] /20"
								: "border-4 border-zinc-100  cursor-pointer saturate-50 bg-zinc-50"
						} h-full `}>
						<CardHeader className="relative pt-4">
							<CardTitle className="text-3xl font-semibold text-center text-[#776fff]   inline-block w-fit mx-auto">
								DIALN X10G Tablet
							</CardTitle>
							<CardDescription className="text-lg text-center max-w-2/3">10" tablet with cellular </CardDescription>
						</CardHeader>
						<CardContent className="h-full pb-6 overflow-scroll">
							<div className="flex justify-between w-full">
								{/* Product Info */}
								<div className="w-2/3 info">
									<h3 className="text-2xl text-zinc-700">Product Info</h3>
									<ul className="pt-2 pl-2 text-lg text-[#776fff]  ">
										<li>
											<span className="pr-2 font-bold text-black">Brand:</span>DIALN
										</li>
										<li>
											<span className="pr-2 font-bold text-black">Retail Price:</span>$199.99
										</li>
										<li>
											<span className="pr-2 font-bold text-black">Screen:</span>10.1" HD+ 1280 x 800
										</li>
										<li>
											<span className="pr-2 font-bold text-black">Connnectivity:</span>Wifi + 4G
										</li>
										<li>
											<span className="pr-2 font-bold text-black">Storage Capacity:</span>64 GB
										</li>
										<li>
											<span className="pr-2 font-bold text-black">Cameras:</span>8MP + 8MP AF
										</li>
										<li>
											<span className="pr-2 font-bold text-black">OS:</span>Android 13
										</li>
									</ul>
								</div>
								<div className="items-center w-1/3 pt-4">
									<Image
										className="object-cover ml-auto bg-center"
										src={x10Image}
										alt="People enjoying mobile phone use"
										sizes="100vw"
										style={{
											width: "100%",
											height: "auto",
										}}
										width={300}
										height={300}
									/>
								</div>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>

			{/* form */}
			<label screen-reader-only className="hidden">
				Device
			</label>
			<input
				className=""
				autoFocus
				type="text"
				value={device}
				onChange={(e) =>
					updateFields({
						device: e.target.value,
					})
				}
			/>
			<h2>Subscribe for future giveaways, product launches and programs alerts.</h2>
			<label>
				<input
					className="subscribed"
					autoFocus
					type="radio"
					value="no"
					checked={!subscribed}
					onChange={(e) =>
						updateFields({
							subscribed: false,
						})
					}
				/>
				No.
			</label>
			<label>
				<input
					className="subscribed"
					autoFocus
					type="radio"
					value="yes"
					checked={subscribed}
					onChange={(e) =>
						updateFields({
							subscribed: true,
						})
					}
				/>
				Yes. I like free stuff!
			</label>
		</FormWrapper>
	)
}

export default DeviceForm
