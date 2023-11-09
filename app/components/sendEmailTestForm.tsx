"use client"
import { NextResponse } from "next/server"
import React, { FormEvent, useState } from "react"
import Swal from "sweetalert2"

function showAlert({ text, status }: { text: string; status: "OK" | "ERR" }) {
	Swal.fire({
		title: status === "OK" ? "Success" : "UH-OH",
		text: text,
		icon: status === "OK" ? "success" : "error",
		confirmButtonText: status === "OK" ? "Nice!" : "Aww Man",
	})
}

type FormDataProps = {
	e: FormEvent
	FormData?: {
		firstName: string
		email: string
	}
}

const SendEmailTestForm = () => {
	const [FormData, setFormData] = useState({
		firstName: "Bruce Bidizzle",
		email: "bruceBuckleMyNizzle@forizzle.sizzle",
	})

	const sendTestEmail = async ({ e, FormData }: FormDataProps) => {
		e.preventDefault()
		try {
			const response = await fetch("/api/send", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(
					FormData && {
						firstName: FormData.firstName,
						email: FormData.email,
					}
				),
				// Add request body here if needed
			}).then((res) => {
				res.json()
				if (res.ok) {
					showAlert({ text: "email sent successfully", status: "OK" })
				} else {
					showAlert({ text: "Error sending the email", status: "ERR" })
				}
				console.log(res)
			})
		} catch (err) {
			showAlert({ text: "Error Fetching Resend API", status: "ERR" })
			console.error(err)
		}
	}

	return (
		<div>
			<form onSubmit={(e) => sendTestEmail({ e, FormData })}>
				<input
					type="text"
					placeholder="firstName"
					id="firstName"
					value={FormData.firstName}
					onChange={(e) => setFormData({ ...FormData, firstName: e.target.value })}
				/>
				<input
					type="email"
					placeholder="email"
					id="email"
					value={FormData.email}
					onChange={(e) => setFormData({ ...FormData, email: e.target.value })}
				/>

				<button type="submit" className="px-6 py-2 text-xl text-white bg-lime-600 hover:bg-lime-500">
					Send Test Email
				</button>
			</form>
		</div>
	)
}

export default SendEmailTestForm
