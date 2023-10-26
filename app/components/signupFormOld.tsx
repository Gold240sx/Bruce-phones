import { useState, useEffect } from "react"
import { ChevronDownIcon, ExclamationCircleIcon } from "@heroicons/react/20/solid"
import { Switch } from "@headlessui/react"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/app/components/ui/card"

import x10Image from "../assets/images/DIALNX10G.png"
import DIALNX65 from "../assets/images/DIALNX65.png"
import Link from "next/link"

const SignupForm = ({ toggleMainForm, formOpen }: { toggleMainForm: any; formOpen: any }) => {
	const [agreed, setAgreed] = useState(false)
	const [imageSrc, setImageSrc] = useState("")
	const [pickedProduct, setPickedProduct] = useState("x65")

	function classNames(...classes: string[]) {
		return classes.filter(Boolean).join(" ")
	}

	useEffect(() => {
		const fetchImage = async () => {
			const imageSrc =
				"https://images.pexels.com/photos/6146961/pexels-photo-6146961.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
			// "https://images.unsplash.com/photo-1694813646514-a22180621d4c?auto=format&fit=crop&q=80&w=870&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
			try {
				const response = await fetch(imageSrc)
				if (response.ok) {
					const blob = await response.blob()
					const imageUrl = URL.createObjectURL(blob)
					setImageSrc(imageUrl) // Set the image URL in state
				} else {
					console.error("Failed to fetch image")
				}
			} catch (error) {
				console.error("Error fetching image:", error)
			}
		}

		fetchImage()
	}, [])

	return (
		<>
			<div
				id="signup-bg-blur"
				onClick={toggleMainForm}
				className="fixed top-0 bottom-0 left-0 right-0 z-10 w-screen h-screen shadow-lg bg-black/40 backdrop-blur-lg shadow-black"></div>
			<Card className={` ${formOpen && "overflow-scroll"}  fixed z-10 top-10 bottom-10 left-10 right-10 p-0`}>
				<CardHeader className="relative pt-12">
					<button
						className="fixed w-10 h-10 border rounded-md bg-zinc-50 hover:text-bold hover:border-black hover:border-2 top-16 right-16"
						onClick={toggleMainForm}>
						X
					</button>
					<CardTitle className="text-5xl font-semibold text-center bg-gradient-to-r from-[#ff4694] to-[#776fff] inline-block w-fit mx-auto text-transparent bg-clip-text">
						Phone / Tablet Qualification Form
					</CardTitle>
					<CardDescription className="text-lg text-center max-w-2/3">
						Complete this form to apply for one of our government-sponsored phone + tablet discounts to get your phone or tablet
						for as little as $20.{" "}
					</CardDescription>
				</CardHeader>

				<CardContent className="pt-12 pb-24">
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
					<div className="flex flex-wrap-reverse justify-between w-10/12 gap-8 mx-auto">
						{/* left/bottom collumn/row */}
						<div className="w-full md:w-8/12 lg:ml-6 lg:w-5/12">
							<div className="flex pb-2 mr-auto">
								<h2 className="col-span-12 col-start-2 text-3xl ">Provide Your Info:</h2>
							</div>
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
							<form action="#" method="POST" className="max-w-xl mx-auto mt-5 sm:mt-5">
								<div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
									{/* form info */}
									<div>
										<label htmlFor="first-name" className="block text-sm font-semibold leading-6 text-gray-900">
											First name
										</label>
										<div className="mt-2.5">
											<input
												type="text"
												name="first-name"
												id="first-name"
												autoComplete="given-name"
												className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
											/>
										</div>
									</div>
									<div>
										<label htmlFor="last-name" className="block text-sm font-semibold leading-6 text-gray-900">
											Last name
										</label>
										<div className="mt-2.5">
											<input
												type="text"
												name="last-name"
												id="last-name"
												autoComplete="family-name"
												className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
											/>
										</div>
									</div>
									<div id="email-container" className="sm:col-span-2">
										<div className="flex justify-between">
											<label htmlFor="email" className="block text-sm font-semibold leading-6 text-gray-900">
												Email
											</label>
											<span className="text-sm leading-6 text-gray-500" id="email-optional">
												Required
											</span>
										</div>
										<div className="relative w-full mt-2 rounded-md shadow-sm sm:col-span-2">
											<input
												type="email"
												name="email"
												placeholder="you@example.com"
												defaultValue="adamwathan"
												aria-invalid="true"
												aria-describedby="email-error"
												id="email"
												autoComplete="email"
												className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
											/>
											<div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
												<ExclamationCircleIcon className="w-5 h-5 text-red-500" aria-hidden="true" />
											</div>
										</div>
										<p className="mt-2 text-sm text-red-600" id="email-error">
											Not a valid email address.
										</p>
									</div>
									<div className="sm:col-span-2">
										<label htmlFor="phone-number" className="block text-sm font-semibold leading-6 text-gray-900">
											Phone number
										</label>
										<div className="relative mt-2.5">
											<div className="absolute inset-y-0 left-0 flex items-center">
												<label htmlFor="country" className="sr-only">
													Country
												</label>
												<select
													id="country"
													name="country"
													className="h-full py-0 pl-4 text-gray-400 bg-transparent border-0 rounded-md bg-none pr-9 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm">
													<option>US</option>
													<option>CA</option>
													<option>EU</option>
												</select>
												<ChevronDownIcon
													className="absolute top-0 w-5 h-full text-gray-400 pointer-events-none right-3"
													aria-hidden="true"
												/>
											</div>
											<input
												type="tel"
												name="phone-number"
												id="phone-number"
												autoComplete="tel"
												className="block w-full rounded-md border-0 px-3.5 py-2 pl-20 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
											/>
										</div>
									</div>
									<div className="sm:col-span-2">
										<label htmlFor="message" className="block text-sm font-semibold leading-6 text-gray-900">
											Message
										</label>
										<div className="mt-2.5">
											<textarea
												name="message"
												id="message"
												rows={4}
												className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
												defaultValue={""}
											/>
										</div>
									</div>
									<Switch.Group as="div" className="flex gap-x-4 sm:col-span-2">
										<div className="flex items-center h-6">
											<Switch
												checked={agreed}
												onChange={setAgreed}
												className={classNames(
													agreed ? "bg-indigo-600" : "bg-gray-200",
													"flex w-8 flex-none cursor-pointer rounded-full p-px ring-1 ring-inset ring-gray-900/5 transition-colors duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
												)}>
												<span className="sr-only">Agree to policies</span>
												<span
													aria-hidden="true"
													className={classNames(
														agreed ? "translate-x-3.5" : "translate-x-0",
														"h-4 w-4 transform rounded-full bg-white shadow-sm ring-1 ring-gray-900/5 transition duration-200 ease-in-out"
													)}
												/>
											</Switch>
										</div>
										<Switch.Label className="text-sm leading-6 text-gray-600">
											By selecting this, you agree to our{" "}
											<a href="#" className="font-semibold text-indigo-600">
												privacy&nbsp;policy
											</a>
											.
										</Switch.Label>
									</Switch.Group>
								</div>
								<div className="mt-10">
									<button
										type="submit"
										className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
										Submit
									</button>
								</div>
							</form>
						</div>
						{/* right/top collumn/row */}
						<div className="mb-12 md:mb-0 md:w-8/12 lg:w-6/12">
							{/* <img
								src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
								className="w-full"
								alt="Phone image"
							/> */}
							<Image
								className="object-cover ml-auto bg-center"
								src={imageSrc}
								alt="People enjoying mobile phone use"
								sizes="100vh"
								style={{
									width: "cover",
									height: "100%",
								}}
								width={700}
								height={900}
							/>
						</div>
					</div>
				</CardContent>

				<CardFooter className="items-center w-full px-12 pt-6 pb-8 -mb-10 text-lg text-center min-h-24 text-zinc-600 bg-zinc-200">
					<p className="max-w-3/5">
						Offer subject to availability. By submitting this form you hereby aknowledge that the information that you submit is
						your own, current and valid. Address must be located within the greater US and applicants must be of age 18yo or
						older. Eligibility is determined by the government program and is not controlled by us in any way. We do not
						gurantee eligibility or product availibility. We will not be held liable in any way
					</p>
				</CardFooter>
			</Card>
		</>
	)
}

export default SignupForm
