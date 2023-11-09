"use client"
import { NextPage } from "next"
import React, { FormEvent, useState } from "react"
import Swal from "sweetalert2"

type FormDataProps = {
	e: FormEvent<HTMLFormElement>
	formData?: {
		name: string
		phone: string
		email: string
		message: string
	}
}

function showAlert({ text, status }: { text: string; status: "OK" | "ERR" }) {
	Swal.fire({
		title: status === "OK" ? "Success" : "UH-OH",
		text: text,
		icon: status === "OK" ? "success" : "error",
		confirmButtonText: status === "OK" ? "Nice!" : "Aww Man",
	})
}

const SheetsTestForm: NextPage = () => {
	const [formData, setFormData] = useState({
		name: "Vinnie",
		phone: "465265465",
		email: "vinnieMcWinnie@google.com",
		message: "You son of a...",
	})

	const handleSubmit = async ({ e, formData }: FormDataProps) => {
		e.preventDefault()

		// submit to sheets
		try {
			const response = await fetch("/api/sheets", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(
					formData && {
						name: formData.name,
						email: formData.email,
						phone: formData.phone,
						message: formData.message,
					}
				),
			})

			const content = await response.json()
			console.log(content)
			alert(content.data.tableRange)

			//reset form fields
			setFormData({
				name: "",
				phone: "",
				email: "",
				message: "",
			})
		} catch (err) {
			showAlert({ text: "Error Google Sheets API", status: "ERR" })
			console.error("fetch error", err)
		}
	}

	return (
		<main className="min-h-screen bg-gray-100">
			<div className="py-16 mx-auto max-5xl">
				<form className="py-4 space-y-4" onSubmit={(e) => handleSubmit({ e, formData })}>
					<div className="flex justify-center flex-items-center">
						<label htmlFor="name" className="sr-only">
							Name
						</label>
						<input
							id="name"
							type="text"
							name="name"
							className="block w-64 border-gray-300 rounded-md shadow-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-md"
							placeholder="Your Name"
							autoComplete="name"
							value={formData.name}
							onChange={(e) => setFormData({ ...formData, name: e.target.value })}
						/>
					</div>
					<div className="flex items-center justify-center">
						<label htmlFor="email" className="sr-only">
							Email
						</label>
						<input
							id="email"
							type="email"
							name="email"
							className="block w-64 border-gray-300 rounded-md shadow-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-md"
							placeholder="Your Email"
							autoComplete="email"
							value={formData.email}
							onChange={(e) => setFormData({ ...formData, email: e.target.value })}
						/>
					</div>
					<div className="flex items-center justify-center">
						<label htmlFor="phone" className="sr-only">
							Phone
						</label>
						<input
							id="phone"
							type="text"
							name="phone"
							className="block w-64 border-gray-300 rounded-md shadow-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-md"
							placeholder="Your Phone Number"
							autoComplete="tel"
							value={formData.phone}
							onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
						/>
					</div>
					<div className="flex items-center justify-center">
						<label htmlFor="message" className="sr-only">
							Message
						</label>
						<textarea
							id="message"
							name="message"
							className="block w-64 border-gray-300 rounded-md shadow-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-md"
							placeholder="Your Message"
							value={formData.message}
							onChange={(e) => setFormData({ ...formData, message: e.target.value })}
						/>
					</div>

					<div className="flex items-center justify-center">
						<button
							type="submit"
							className="flex justify-center w-64 px-2 py-3 text-sm text-white bg-indigo-500 rounded-md shadow">
							Submit
						</button>
					</div>
				</form>
			</div>
		</main>
	)
}

export default SheetsTestForm
