"use client"
import { ReactComponentElement, useEffect, useState, useRef, type ReactElement, JSXElementConstructor } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card"
import { ExclamationCircleIcon } from "@heroicons/react/20/solid"
import { JobFormSchema, showAlert, formatPhoneNo, classNames, SendSupportEmail, valueToDropdownConversion } from "./FormSupport"
import { z } from "zod"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import Selector from "./select"
import Select from "react-select"
import { FileInput, Label } from "flowbite-react"
import { createDocument, updateDocument } from "@firebase/storeFunctions"
import { type UploadResult, uploadToFirebaseStorage, fileSizeValidator, fileExtensionValidator } from "../firebase/storageFunctions"
import ControlledSelect from "./controlled-select"

type FormValues = z.infer<typeof JobFormSchema>

type JobFormData = {
	name: string
	birthday: string
	phoneDetails?: {
		phoneNo?: "US" | "MX" | "CA"
		phoneCountryCode?: string
	}
	email: string
	cityState: string
	usCitizen: boolean
	availibility: string
	language: string
	aspiration: string
	preferredContact: "text" | "phone" | "email"
	resumeLInk: string
	filePurpose: "resume" | "letter of reccomendation " | string
}

export default function JobApplyForm({ subCategory }: { subCategory: string }) {
	const [loading, setIsLoading] = useState(false)
	const [fileError, setFileError] = useState<string | null>(null)
	const resumeInputRef = useRef<HTMLInputElement | null>(null)
	const [formData, setFormData] = useState({
		name: "",
		birthday: "",
		phoneDetails: {
			phoneCountryCode: "US",
			phoneNo: "(465) 265-4649",
		},
		email: "",
		cityState: "",
		aspiration: "",
		resumeLInk: "",
		availibility: "",
		usCitizen: true,
		language: "english only",
		preferredContact: "phone",
		filePurpose: "resume",
	})
	const {
		register,
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<FormValues>({
		// resolver: zodResolver(JobFormSchema),
	})
	// useEffect(() => {}, [formData])

	async function onSubmit(data: FormValues) {
		setIsLoading(true)
		// validate that the file is the right size and type before proceeding
		const file = resumeInputRef.current?.files?.[0]
		if (!file) {
			setFileError("Please upload your resume.")
			setIsLoading(false)
			return
		}
		if (fileSizeValidator(file) && fileExtensionValidator(file.name)) {
			try {
				setFileError(null)
				// add status to form data before submission to insert in each DB file
				const newData = {
					...data,
					status: "unread",
				}
				const response = await createDocument({ collectionName: "jobApplicants", data: newData })
				if (response.status === "success") {
					const folderId = response.docId
					// @ts-expect-error
					const filePath = `jobApplications/${folderId}/${resumeInputRef.current.files[0].name}`
					// @ts-expect-error
					const result = await uploadToFirebaseStorage({ file: resumeInputRef.current.files[0], filePath })

					const updateResponse = await updateDocument({
						collectionName: "jobApplicants",
						docId: folderId!,
						data: { resumeLink: result.url },
					})
					if (updateResponse.status == "success") {
						showAlert({ text: "Upload Success", status: "OK" })
						setFormData({
							name: "",
							birthday: "",
							phoneDetails: {
								phoneCountryCode: "US",
								phoneNo: "",
							},
							email: "",
							cityState: "",
							aspiration: "",
							resumeLInk: "",
							availibility: "",
							usCitizen: true,
							language: "english only",
							preferredContact: "phone",
							filePurpose: "",
						})
						resumeInputRef.value = ""
					} else alert("everything but the doc rewrite worked")
				} else {
					showAlert({ text: "There was an error submitting the form", status: "ERR" })
					console.error(response.error)
				}
			} catch (err) {
				console.log("error: ", err)
				showAlert({ text: " there was an error sending your application", status: "ERR" })
			} finally {
				setIsLoading(false) // Set loading state back to false
			}
		} else {
			if (fileSizeValidator(file) && !fileExtensionValidator(file.name)) {
				setFileError("Invalid file Type. Accepted Formats: '.pdf', '.doc', '.docx', '.word', '.rtf'")
			} else if (!fileSizeValidator(file) && fileExtensionValidator(file.name)) {
				setFileError("Max file size exceeded. File uploads must be less that 10MB.")
			} else if (!fileSizeValidator(file) && !fileExtensionValidator(file.name)) {
				setFileError(
					"Invalid file Type. Accepted Formats: '.pdf', '.doc', '.docx', '.word', '.rtf'. Max file size exceeded. File uploads must be less that 10MB."
				)
				setIsLoading(false)
				return
			}
			setIsLoading(false)
		}
	}

	// async function onSubmit(data: FormValues) {
	// 	console.log(data)
	// }

	const purposeSchema = z.object({
		label: z.string(),
		value: z.string(),
	})

	type purposeReason = z.infer<typeof purposeSchema>

	const purposeOptions: purposeReason[] = [
		{ label: "Resume", value: "resume" },
		{ label: "Letter of Intention", value: "letterOfIntention" },
	]

	return (
		<Card className="w-full h-full">
			<CardHeader className="relative flex flex-col items-center w-full py-12">
				<CardTitle className="text-5xl font-semibold text-center bg-gradient-to-r from-[#ff4694] to-[#776fff] inline-block w-fit mx-auto text-transparent bg-clip-text">
					Job Application Form
				</CardTitle>
				<CardDescription className="flex pt-8 pr-20 ml-auto text-2xl text-right">{subCategory} Position</CardDescription>{" "}
				{/* job title */}
				<CardDescription className="w-3/4 pt-3 text-center ">
					Please fill out the form below to submit your job application!
				</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="bg-white isolate lg:pb-32">
					<div className="absolute inset-x-0 -z-10 transform-gpu blur-3xl" aria-hidden="true">
						<div
							className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
							style={{
								clipPath:
									"polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
							}}
						/>
					</div>
					<form onSubmit={handleSubmit(onSubmit)} className="w-4/5 max-w-2xl mx-auto scrollbar-hide sm:mt-10">
						<div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
							<div>
								<div className="flex justify-between">
									<label htmlFor="name" className="block text-sm font-semibold leading-6 text-gray-900">
										<span className="mr-1.5 text-lg font-bold text-red-600">*</span>
										Name
									</label>
									<span className="text-sm leading-6 text-gray-500" id="name-required">
										Required
									</span>
								</div>
								<div className="mt-2.5 relative">
									<input
										id="name"
										type="text"
										// name="first-name"
										autoComplete="name"
										className="block w-full focus:placeholder:opacity-0 rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
										placeholder="Your Name"
										{...register("name")}
										value={formData.name}
										onChange={(e) => setFormData({ ...formData, name: e.target.value })}
									/>
									{errors.name && (
										<div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
											<ExclamationCircleIcon className="w-5 h-5 text-red-500" aria-hidden="true" />
										</div>
									)}
								</div>
								{errors.name && (
									<p className="pl-2 mt-2 text-sm text-red-600" id="first-name-error">
										{errors.name.message}
									</p>
								)}
							</div>
							<div className="">
								<div className="flex justify-between">
									<label htmlFor="city" className="block text-sm font-semibold leading-6 text-gray-900">
										<span className="mr-1.5 text-lg font-bold text-red-600">*</span>
										City, State
									</label>
									<span className="text-sm leading-6 text-gray-500" id="city-required">
										Required
									</span>
								</div>
								<div className="mt-2.5 relative">
									<input
										id="cityState"
										type="text"
										// name="email"
										className="block w-full focus:placeholder:opacity-0 rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
										placeholder="Current City, State"
										{...register("cityState")}
										value={formData.cityState}
										onChange={(e) => setFormData({ ...formData, cityState: e.target.value })}
									/>
									{errors.cityState && (
										<div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
											<ExclamationCircleIcon className="w-5 h-5 text-red-500" aria-hidden="true" />
										</div>
									)}
								</div>
								{errors.cityState && (
									<p className="pl-2 mt-2 text-sm text-red-600" id="email-error">
										{errors.cityState.message}
									</p>
								)}
							</div>
							<div className="">
								<div className="flex justify-between">
									<label htmlFor="email" className="block text-sm font-semibold leading-6 text-gray-900">
										<span className="mr-1.5 text-lg font-bold text-red-600">*</span>
										Email
									</label>
									<span className="text-sm leading-6 text-gray-500" id="email-required">
										Required
									</span>
								</div>
								<div className="mt-2.5 relative">
									<input
										id="email"
										type="email"
										// name="email"
										className="block w-full focus:placeholder:opacity-0 rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
										placeholder="Your Email"
										autoComplete="email"
										{...register("email")}
										value={formData.email}
										onChange={(e) => setFormData({ ...formData, email: e.target.value })}
									/>
									{errors.email && (
										<div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
											<ExclamationCircleIcon className="w-5 h-5 text-red-500" aria-hidden="true" />
										</div>
									)}
								</div>
								{errors.email && (
									<p className="pl-2 mt-2 text-sm text-red-600" id="email-error">
										{errors.email.message}
									</p>
								)}
							</div>
							<div className="relative">
								<div className="flex justify-between">
									<label htmlFor="phone" className="block text-sm font-semibold leading-6 text-gray-900">
										<span className="mr-1.5 text-lg font-bold text-red-600">*</span>
										Phone Number
									</label>
									<span className="text-sm leading-6 text-gray-500" id="phone-required">
										Required
									</span>
								</div>
								<div className="relative mt-2.5">
									<div className="absolute inset-y-0 left-0 flex items-center">
										<label htmlFor="country" className="sr-only">
											Country
										</label>
										<select
											id="country"
											// name="country"
											className="h-full py-0 pl-4 text-gray-400 bg-transparent border-0 rounded-md bg-none pr-9 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
											value={formData.phoneDetails.phoneCountryCode}
											autoComplete="tel-country-code"
											{...register("phoneDetails.phoneCountryCode")}
											onChange={(e) =>
												setFormData({
													...formData,
													phoneDetails: {
														...formData.phoneDetails,
														phoneCountryCode: e.target.value,
													},
												})
											}>
											<option>US</option>
											<option>CA</option>
											<option>EU</option>
										</select>
									</div>
									<input
										type="tel"
										// name="phone-number"
										id="phone-number"
										className="block w-full rounded-md border-0 px-3.5 py-2 pl-20 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
										placeholder="Your Phone Number"
										autoComplete="tel-national"
										{...register("phoneDetails.phoneNo")}
										value={formData.phoneDetails.phoneNo}
										onChange={(e) => {
											const formattedNumber = formatPhoneNo(e.target.value)
											setFormData({
												...formData,
												phoneDetails: {
													...formData.phoneDetails,
													phoneNo: formattedNumber,
												},
											})
										}}
									/>
									{errors.phoneDetails && (
										<div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
											<ExclamationCircleIcon className="w-5 h-5 text-red-500" aria-hidden="true" />
										</div>
									)}
								</div>
								{errors.phoneDetails && (
									<p className="pl-2 mt-2 text-sm text-red-600" id="phoneNo-error">
										please enter a valid phone number
									</p>
								)}
							</div>
							<div className="mb-6 sm:col-span-2">
								<div className="flex justify-between">
									<label htmlFor="aspiration" className="block text-sm font-semibold leading-6 text-gray-900">
										What Interests you in this position. What seperates you from others considering this position?
									</label>
								</div>
								<div className="my-2.5 relative">
									<textarea
										// name="message"
										id="aspiration"
										rows={4}
										className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:placeholder:opacity-0 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
										placeholder="Your answer"
										{...register("aspiration")}
										value={formData.aspiration}
										onChange={(e) => setFormData({ ...formData, aspiration: e.target.value })}
									/>
								</div>
							</div>
						</div>
						<div className="flex flex-col p-3 rounded-lg sm:col-span-2 bg-zinc-300/30">
							<label
								htmlFor="language"
								className="flex w-full max-w-md py-3 mx-auto text-3xl leading-6 text-left text-black pr-auto">
								Resume Upload
							</label>

							<p className="flex w-full max-w-md mx-auto text-sm text-left text-zinc-500 pr-auto">
								Please select a file to upload and select the corresponding purpose of the file.
							</p>
							<div className="flex flex-col w-full max-w-md mx-auto my-2">
								<div className="w-full overflow-hidden rounded-md" id="fileUpload">
									<input
										type="file"
										id="file"
										// onChange={(e) => handleFileChange(e.target.files)}
										className="w-full bg-white/75 "
										ref={(el) => (resumeInputRef.current = el)}
									/>
								</div>
								{fileError && <p className="pt-2 text-red-500">{fileError}</p>}
								{/* {uploadResult && (
								<div>
									{uploadResult.success
										? `File uploaded successfully. URL: ${uploadResult.url}`
										: `Error uploading file: ${uploadResult.error}`}
								</div>
							)} */}
							</div>
							<div className="flex flex-col items-center justify-center w-full mx-auto my-2">
								<ControlledSelect<FormValues, purposeReason, true>
									name="filePurpose"
									control={control}
									label="purpose"
									placeholder="Describe the file content"
									options={purposeOptions}
									className="bg-white rounded-md"
									useBasicStyles
								/>
							</div>
						</div>

						<div className="mt-10">
							<button
								type="submit"
								disabled={errors.email !== undefined || loading}
								className={`${
									errors.email !== undefined || loading
										? "bg-zinc-300 cursor-not-allowed"
										: "bg-indigo-600 hover:bg-indigo-500 focus-visible:outline-indigo-600"
								}block w-full rounded-md px-3.5 py-6 text-center duration-200 ease-in-out transition-colors text-sm font-semibold text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 `}>
								{loading ? "submitting" : "Apply"}
							</button>
						</div>
					</form>
				</div>
			</CardContent>
		</Card>
	)
}
