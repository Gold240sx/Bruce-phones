"use client"
import { useState } from "react"
import Hero from "@/app/components/hero"
import Faq from "@/app/components/faq"
import TestimonialSection from "@/app/components/testimonialSection"

export default function Home() {
	const [formOpen, setFormOpen] = useState(false)

	const toggleMainForm = () => {
		setFormOpen(!formOpen)
	}

	return (
		<main
			className={`${
				formOpen === true ? "overflow-hidden h-screen" : ""
			} flex flex-col items-center justify-between w-full min-h-screen pt-6 `}>
			<div
				className={` ${
					formOpen === true ? "overflow-hidden h-screen" : ""
				} relative items-center justify-between w-full font-mono text-sm`}>
				<Hero toggleMainForm={toggleMainForm} formOpen={formOpen} />
				<TestimonialSection />
				<Faq />
			</div>
		</main>
	)
}
