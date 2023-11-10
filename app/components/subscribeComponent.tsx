"use client"
import React from "react"
import { z } from "zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { createDocument } from "@firebase/storeFunctions"
import { SubscribeComponentSchema } from "./FormSupport"
import { showAlert, SendSubscribeEmail } from "./FormSupport"

type FormValues = z.infer<typeof SubscribeComponentSchema>

type SubscribeDataType = {
	email: string
}

const SubscribeComponent = () => {
	const [loading, setIsLoading] = useState(false)
	const [formData, setFormData] = useState({
		email: "",
	})
	const {
		control,
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<FormValues>({
		resolver: zodResolver(SubscribeComponentSchema),
	})

	async function onSubmit(data: FormValues) {
		setIsLoading(true)
		try {
			const response = await createDocument({ collectionName: "subscribers", data: data })
			if (response.status === "success") {
				await SendSubscribeEmail({ formData: data as SubscribeDataType })
				console.log("the email should be sent correctly")
			} else {
				showAlert({ text: "There was an error submitting your email", status: "ERR" })
				console.error(response.error)
			}
		} catch (err) {
			console.log("error: ", err)
			showAlert({ text: " there was an error submitting the data", status: "ERR" })
		} finally {
			setIsLoading(false) // Set loading state back to false
		}
	}

	return (
		<div className="flex flex-col items-center mt-10 xl:mt-0 md:items-end">
			<h3 className="text-sm font-semibold leading-6 text-gray-900">Subscribe for new product rollouts!</h3>
			<form onSubmit={handleSubmit(onSubmit)} className="mt-6 sm:flex sm:max-w-md">
				<label htmlFor="email-address" className="sr-only">
					Email address
				</label>
				<input
					type="email"
					// name="email-address"
					id="email-address"
					autoComplete="email"
					required
					className="w-full min-w-0 appearance-none rounded-md border-0 bg-white px-3 py-1.5 text-base text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:w-64 sm:text-sm sm:leading-6 xl:w-full"
					placeholder="Enter your email"
					{...register("email")}
					value={formData.email}
					onChange={(e) => setFormData({ ...formData, email: e.target.value })}
				/>
				<div className="mt-4 sm:ml-4 sm:mt-0 sm:flex-shrink-0">
					<button
						type="submit"
						className="flex items-center justify-center w-full px-3 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-md shadow-sm cursor-pointer hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
						Subscribe
					</button>
				</div>
			</form>
		</div>
	)
}

export default SubscribeComponent
