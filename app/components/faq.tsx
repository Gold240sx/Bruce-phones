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
		answer: "Yes. Upon submission of your info, we will verify that you meet the needed criteria. If you at one of our stands, we will be able to hand you a phone or tablet at that time?",
	},
	{
		question: "How do you guys make your money?",
		answer: "We are paid for every product you get! believe me, We want you to qualify!",
	},
	{
		question: "Where is my data stored?",
		answer: "Upon Form entry: The data is sent to be verified by the program verificaiton team. Upon subscription: Your data is stored by our servers with the only purpose to reach out to you with future product offers. We do not spam, share or sell your data to any 3rd parties. ",
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
