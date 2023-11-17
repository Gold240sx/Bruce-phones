"use client"
import { useState } from "react"
import Hero from "@/app/components/hero"
import Faq from "@/app/components/faq"
import TestimonialSection from "@/app/components/testimonialSection"
import BgBlur from "@/app/components/bgBlur"
import PopupModal from "@/app/components/popupModal"

export default function Home() {
	const [formOpen, setFormOpen] = useState(false)
	const [form, setForm] = useState("")

	const toggleMainForm = () => {
		setFormOpen(!formOpen)
	}

	return (
		<main className={`flex flex-col items-center justify-between w-full min-h-screen pt-6 `}>
			{/* // className={`${ 
			// 	formOpen === true ? "overflow-hidden h-screen" : ""
			// } flex flex-col items-center justify-between w-full min-h-screen pt-6 `}>*/}
			<div className={` relative items-center justify-between w-full font-mono text-sm`}>
				{/*// className={` ${
				// 	formOpen === true ? "overflow-hidden h-screen" : ""
				// } relative items-center justify-between w-full font-mono text-sm`}>*/}
				{formOpen && <BgBlur toggleMainForm={toggleMainForm} />}
				{formOpen && <PopupModal toggleMainForm={toggleMainForm} form={form} />}
				<Hero toggleMainForm={toggleMainForm} formOpen={formOpen} setForm={setForm} form={form} />
				<TestimonialSection />
				<Faq toggleMainForm={toggleMainForm} formOpen={formOpen} setForm={setForm} />
			</div>
		</main>
	)
}
