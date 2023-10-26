"use client"
import React from "react"
import { ChevronRightIcon } from "@heroicons/react/24/outline"
import Link from "next/link"

const CareerSlider = () => {
	return (
		<div className="flex pb-6 mx-auto w-fit sm:mb-5 sm:flex sm:justify-center lg:justify-start">
			<Link
				href="/careers"
				className="flex items-center p-1 pr-2 text-white bg-black rounded-full hover:text-gray-200 sm:text-base lg:text-sm xl:text-base">
				<span className="rounded-full bg-indigo-500 px-3 py-0.5 text-sm font-semibold leading-5 text-white">We're hiring</span>
				<span className="ml-4 text-sm">Visit our careers page</span>
				<ChevronRightIcon className="w-5 h-5 ml-2 text-gray-500" aria-hidden="true" />
			</Link>
		</div>
	)
}

export default CareerSlider
