import { z } from "zod"
import { FormEvent } from "react"
import Swal from "sweetalert2"

// Form Schemas
const SubscribeComponentSchema = z.object({ email: z.string().email("Please enter a valid email") })

const SupportFormSchema = z.object({
	firstName: z
		.string()
		.regex(/^[a-zA-Z .]+$/, {
			message: "Name can only contain letters, spaces, and periods",
		})
		.min(1, "Please include your first name")
		.max(25, "max: 25 characters"),
	lastName: z
		.string()
		.regex(/^[a-zA-Z .]+$/, {
			message: "Name can only contain letters, spaces, and periods",
		})
		.min(1, "Please include your first name")
		.max(25, "max: 25 characters"),
	phoneDetails: z.object({
		phoneCountryCode: z.enum(["US", "CA", "EU"]),
		phoneNo: z
			.string()
			.min(10, "Invalid phone number")
			.max(14, "National Phone Number only")
			.refine((value) => /^\(\d{3}\) \d{3}-\d{4}$/.test(value), {
				message: "Phone number should match the format (XXX) XXX-XXXX.",
			})
			.optional(),
	}),
	email: z.string().email("Please enter a valid email"),
	message: z.string(),
	// agreed: z.boolean().refine((value) => value === true, {
	// 	message: "You must agree to the terms and conditions.",
	// }),
})

//  Form Types
type SupportFormDataProps = {
	e?: FormEvent<HTMLFormElement>
	formData?: {
		firstName: string
		lastName: string
		phoneDetails: {
			phoneCountryCode: "US" | "CA" | "MX"
			phoneNo: string
		}
		email: string
		message: string
		agreed?: boolean
		status?: "unread" | "viewed" | "completed" | "in talk"
	}
}
type SubscribeFormDataProps = {
	e?: FormEvent<HTMLFormElement>
	formData?: {
		email: string
	}
}

// Form Functions
function showAlert({ text, status }: { text: string; status: "OK" | "ERR" }) {
	Swal.fire({
		title: status === "OK" ? "Success" : "UH-OH",
		text: text,
		icon: status === "OK" ? "success" : "error",
		confirmButtonText: status === "OK" ? "Nice!" : "Aww Man",
	})
}
const formatPhoneNo = (inputValue: string) => {
	const sanitizedValue = inputValue.replace(/[^\d]/g, "")
	let formattedValue = ""

	if (sanitizedValue.length <= 3) {
		formattedValue = sanitizedValue
	} else if (sanitizedValue.length <= 6) {
		formattedValue = `(${sanitizedValue.slice(0, 3)}) ${sanitizedValue.slice(3)}`
	} else {
		formattedValue = `(${sanitizedValue.slice(0, 3)}) ${sanitizedValue.slice(3, 6)}-${sanitizedValue.slice(6, 10)}`
	}
	return formattedValue
}

// css support
function classNames(...classes: string[]) {
	return classes.filter(Boolean).join(" ")
}

// Email Functions
const SendSupportEmail = async ({ formData }: SupportFormDataProps) => {
	try {
		const response = await fetch("/api/support", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(
				formData && {
					firstName: formData.firstName,
					lastName: formData.firstName,
					email: formData.email,
					phone: formData.phoneDetails.phoneNo,
					phoneCountryCode: formData.phoneDetails.phoneCountryCode,
					message: formData.message,
				}
			),
		})

		if (response.ok) {
			const data = await response.json()
			console.log(data)
			showAlert({ text: "Email sent successfully", status: "OK" })
		} else {
			showAlert({ text: "Error sending the email", status: "ERR" })
		}
	} catch (err) {
		showAlert({ text: "Error Fetching Resend API", status: "ERR" })
		console.error(err)
	}
}

const SendSubscribeEmail = async ({ formData }: SubscribeFormDataProps) => {
	try {
		const response = await fetch("/api/subscribe", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(
				formData && {
					email: formData.email,
				}
			),
		})

		if (response.ok) {
			const data = await response.json()
			console.log(data)
			showAlert({ text: "Email sent successfully", status: "OK" })
		} else {
			showAlert({ text: "Error sending the email", status: "ERR" })
		}
	} catch (err) {
		showAlert({ text: "Error Fetching Resend API", status: "ERR" })
		console.error(err)
	}
}

export { SupportFormSchema, SubscribeComponentSchema } // Schemas
export { type SupportFormDataProps } // Types
export { showAlert, formatPhoneNo, classNames } //  Functions
export { SendSupportEmail, SendSubscribeEmail } // Email  specific functions
