"use client"
import React, { JSXElementConstructor, useState } from "react"
import CareerSlider from "./careerSlider"
import Link from "next/link"
import SignupForm from "./signupForm"

type hero = {
	toggleMainForm: any
	formOpen: any
}

const Hero = ({ toggleMainForm, formOpen }: hero) => {
	return (
		<section id="hero" className={`${formOpen === true && "overflow-hidden"} relative px-4 mx-auto max-w-7xl sm:mt-12`}>
			{formOpen && <SignupForm toggleMainForm={toggleMainForm} formOpen={formOpen} />}
			<div className="items-center justify-center w-5/6 mx-auto text-center md:max-w-3/4 xl:max-w-1/2">
				<CareerSlider />
				<h1 className="flex flex-col gap-2 pt-4 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
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
				<div className="max-w-md pt-6 mx-auto sm:flex sm:justify-center md:mt-8">
					<div className="rounded-md shadow">
						<button
							onClick={toggleMainForm}
							className="flex items-center justify-center w-full px-8 py-3 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md whitespace-nowrap hover:bg-indigo-700 md:px-10 md:py-4 md:text-lg">
							Claim your device!
						</button>
					</div>
					<div className="mt-3 rounded-md shadow sm:ml-3 sm:mt-0">
						<Link
							href="#"
							className="flex items-center justify-center w-full px-8 py-3 text-base font-medium text-indigo-600 bg-white border border-transparent rounded-md cursor-pointer whitespace-nowrap hover:bg-gray-50 md:px-10 md:py-4 md:text-lg">
							Process Overview
						</Link>
					</div>
				</div>
				<p className="pt-16 mb-12 text-xl text-center cursor-pointer text-zinc-600 lg:pr-32 hover:underline lg:text-right">
					Request a stand in your area!
				</p>
			</div>
		</section>
	)
}

export default Hero
