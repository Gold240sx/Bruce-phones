"use client"
import React, { JSXElementConstructor, useState } from "react"
import CareerSlider from "./careerSlider"
import Link from "next/link"
import Image from "next/image"
import SignupForm from "./SignupForm"
import PopupModal from "./popupModal"
import ebtOrangeCard from "../assets/images/ebtOrange.png"
import ebtTealCard from "../assets/images/ebtTeal.png"
import androidPhone from "../assets/images/androidPhone.png"
import { motion, useAnimation } from "framer-motion"
import { useEffect } from "react"

type hero = {
	toggleMainForm: any
	formOpen: any
	setForm: any
    form: any
}

const Hero = ({ toggleMainForm, formOpen, form, setForm }: hero) => {
	return (
		<section id="hero" className={`${formOpen === true && "overflow-hidden"} relative px-4 mx-auto max-w-7xl sm:mt-12`}>
			{/* {formOpen && <SignupForm toggleMainForm={toggleMainForm} formOpen={formOpen} />} */}
            {formOpen && form === "NewApplicationForm" && <PopupModal toggleMainForm={toggleMainForm} formOpen={formOpen} form={form} />}
			{formOpen && form === "SignupForm" && <PopupModal toggleMainForm={toggleMainForm} formOpen={formOpen} form={form} />}
			<div className="items-center justify-center w-5/6 mx-auto text-center md:max-w-3/4 xl:max-w-1/2">
				<CareerSlider />
				<motion.div
					initial={{ y: "-100vh" }} // Start position (completely off the top)
					animate={{ y: 0 }} // End position (0 means no vertical translation)
					transition={{ type: "spring", damping: 9, stiffness: 100, duration: 0.3 }} // Animation duration in seconds
					className="hidden -z-10 lg:flex" // Add your own styles here
				>
					<Image
						className="absolute -translate-x-32 -top-16 opacity-80"
						src={ebtTealCard}
						height={250}
						width={350}
						alt="ebt card"
					/>
				</motion.div>
				<motion.div
					initial={{ y: "100vh" }} // Start position (completely off to the right)
					animate={{ y: 0 }} // End position (0 means no translation)
					transition={{ type: "spring", damping: 12, stiffness: 100, duration: 0.3, delay: 0.5 }} // Animation duration in seconds
					className="hidden -z-10 lg:flex" // Add your own styles here
				>
					<Image
						className="absolute -z-10 -right-16 top-10 rotate-3"
						src={androidPhone}
						height={600}
						width={200}
						alt="android phone"
					/>
				</motion.div>
				<motion.div
					initial={{ scale: 0, rotate: -720 }}
					animate={{ scale: 1, rotate: 0 }} // Adjust the scale factor as needed
					transition={{ type: "spring", damping: 15, stiffness: 100, delay: 0.3 }} // Optional
					className="your-element">
					<h1 className="flex flex-col gap-2 pt-4 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
						<span className="text-2xl font-medium text-zinc-500">Recieve government assistance?</span>
						<span className="">
							Claim your Free<span className="text-fuchsia-600">*</span>
						</span>
						<span className="ml-2 text-indigo-600">Phone / Tablet Today!</span>
					</h1>
					<p className="max-w-md mx-auto mt-3 text-base text-gray-500 sm:text-lg md:mt-5 md:max-w-3xl md:text-xl">
						<span className="text-fuchsia-600">*</span>
						Offer subject to availability and eligibility.
						{/* (Free phone or tablet subject to eligibility - While supplies last. We do not
					in any way guarantee eligibilty. No gimicks, telemarketers or sale of data.) */}
					</p>
				</motion.div>
				<div className="max-w-md pt-6 mx-auto sm:flex sm:justify-center md:mt-8">
					<div className="rounded-md shadow">
						<button
							onClick={() => {
								setForm("NewApplicationForm")
								toggleMainForm()
							}}
							className="flex items-center justify-center w-full px-8 py-3 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md animate-pulse whitespace-nowrap hover:bg-indigo-700 md:px-10 md:py-4 md:text-lg">
							Claim your device!
						</button>
					</div>
					<div className="mt-3 rounded-md shadow sm:ml-3 sm:mt-0">
                        <button
							onClick={() => {
								setForm("NewApplicationForm")
								toggleMainForm()
							}}
							className="flex items-center justify-center w-full px-8 py-3 text-base font-medium text-indigo-600 bg-white border border-transparent rounded-md cursor-pointer whitespace-nowrap hover:bg-gray-50 md:px-10 md:py-4 md:text-lg">
							Process Overview
						</button>
					</div>
				</div>
				<p className="pt-16 pr-24 mb-12 text-xl text-center cursor-pointer text-zinc-600 lg:pr-32 hover:underline lg:text-right">
					{/* Request a stand in your area! */}
				</p>
			</div>
		</section>
	)
}

export default Hero
