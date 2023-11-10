import Link from "next/link"
import PopupModal from "./popupModal"
import { useState } from "react"

type formState = {
	toggleMainForm: any
	formOpen: any
	setForm: any
}

const faqs = [
	{
		question: "Are these really free?",
		answer: "Yes. Upon submission of your information, we will verify that you meet the needed criteria to qualify for these tablets and phones.",
	},
	{
		question: "How much is the plan? Are there any costs related to the service?",
		answer: "Absolutely not. As long as you use cellular data at any point within the month, your data plan will be 100% free. Same goes with phone and texts.",
	},
	{
		question: "What happens next?",
		answer: "Once you fill out the criteria a consultant will contact you to verify the information. Upon verifying that the qualifications have been met, we will ship or provide the device to you by the method which makes the most sense and that you prefer.",
	},
	{
		question: "How do I know if I qualify?",
		answer: "Simply submit the form and we will tell you whether you qualify within a matter of minutes. The criteria is set by the US government and is subject to change at any point of time.",
	},
]

export default function Faq({ toggleMainForm, formOpen, setForm }: formState) {
	const [formState, setFormState] = useState("")
	return (
		<section id="faqs" className="bg-zinc-50">
			<div className="px-6 py-16 md:px-24 sm:pt-32 lg:px-8 lg:py-30 md:mx-6">
				<div className="lg:grid lg:grid-cols-12 lg:gap-8">
					<div className="lg:col-span-4">
						<h2 className="text-2xl font-bold leading-10 tracking-tight text-gray-900">Frequently asked questions</h2>
						<p className="mt-4 text-base leading-7 text-gray-600">
							Can’t find the answer you’re looking for? Reach out to our{" "}
							<span
								onClick={() => {
									setForm("SupportForm")
									toggleMainForm()
								}}
								className="inline-block mr-1 font-semibold text-indigo-600 cursor-pointer w-fit hover:text-indigo-500">
								support
							</span>
							team.
						</p>
					</div>
					<div className="mt-10 lg:col-span-7 lg:mt-0">
						<dl className="space-y-10">
							{faqs.map((faq) => (
								<div key={faq.question}>
									<dt className="text-base font-semibold leading-7 text-gray-900">{faq.question}</dt>
									<dd className="mt-2 text-base leading-7 text-gray-600">{faq.answer}</dd>
								</div>
							))}
						</dl>
					</div>
				</div>
			</div>
		</section>
	)
}
