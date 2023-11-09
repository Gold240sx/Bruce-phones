"use client"
import React, { ReactNode } from "react"
import SignupForm from "./SignupForm"
import SupportForm from "./supportForm2"
import { Card } from "./ui/card"

interface PopupModalProps {
	toggleMainForm: () => void
	formOpen: boolean
	form: "SignupForm" | "SupportForm" | ""
}

const forms = {
	SignupForm: <SignupForm />,
	SupportForm: <SupportForm />,
}

const PopupModal = ({ toggleMainForm, formOpen, form }: PopupModalProps) => {
	if (form !== "") {
		const SelectedForm = forms[form]

		return (
			<div
				className={` ${
					formOpen && ""
				} scrollbar-hide overflow-y-scroll right-10 bg-white rounded-xl fixed z-10 max-h-screen top-20 bottom-10 bottom-30 left-10 top-30 p-0 `}>
				<button
					className="fixed z-50 w-10 h-10 border rounded-md bg-zinc-50 hover:text-bold hover:border-black hover:border-2 top-[104px] right-16"
					onClick={toggleMainForm}>
					X
				</button>
				{SelectedForm}
			</div>
		)
	}
}

export default PopupModal
