import React, { useState, ChangeEvent, FormEvent, JSXElementConstructor, ReactElement, ReactNode, useEffect } from "react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../../../components/ui/tooltip"
import { ExclamationCircleIcon } from "@heroicons/react/20/solid"
import { AiFillInfoCircle } from "react-icons/ai"
import Select from "../../select"
import { type Address, type Addresses } from "../multistep-form"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { format } from "date-fns"
import FormWrapper from "../formWrapper"
import { FileInput, Label } from "flowbite-react"
import RadioBoxList from "./RadioBoxList"

type BenefitData = {
	DOB: string
	benefits: string
	lastFour: string
}
type BenefitFormProps = BenefitData & {
	// this type means we can update any or all fields that belong to the user Data.
	data: any
	updateFields: (fields: Partial<BenefitData>) => void
}
type Item = {
	name: string
}

const valueToDropdownConversion = (stringArray: string[]) => {
	const objectArray = stringArray.map((string: string) => {
		return { label: string, value: string }
	})
	return objectArray
}

const radioItems: Item[] = [
	{
		name: "SNAP",
	},
	{
		name: "WIC",
	},
	{
		name: "Medicaid",
	},
	{
		name: "Pell Grant",
	},
	{
		name: "Section 8",
	},
	{
		name: "National School Lunch",
	},
	{
		name: "Veterans Pension and Survivors Benefit Program",
	},
	{
		name: "Income below $26,000 / year",
	},
]

const BenefitsForm = ({ updateFields, DOB, lastFour, benefits, data }: BenefitFormProps) => {
	const [dob, setDOB] = useState(new Date())
	// useEffect(() => {
	// 	console.log()
	// }, [])

	return (
		<FormWrapper className="" title="Qualifications">
			{" "}
			{/* form */}
			<div className="flex flex-wrap-reverse justify-between w-full mx-auto ">
				{/* left/bottom collumn/row */}

				<div className="flex flex-col w-full grid-cols-12 gap-6">
					<p className="flex items-center ml-auto -mb-6 w-fit">
						<span className="text-2xl font-bold text-red-600">*</span>
						<span className="font-semibold -translate-y-[5px]">Required</span>
					</p>
					<div
						className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
						aria-hidden="true">
						<div
							className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] translate-y-1/6 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
							style={{
								clipPath:
									"polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
							}}
						/>
						{/*  */}
					</div>

					{/* this is where the questions go */}
					<div className="pt-6 col-span-full">
						<label className="text-base font-semibold text-gray-900">
							<span className="mr-1.5 text-lg font-bold text-red-600">*</span>Which qualification do you meet?
						</label>
						<p className="text-base text-zinc-600">( Select one )</p>
						<fieldset className="mt-4">
							<legend className="sr-only">Benefits you would like to submit for eligibility</legend>
							<RadioBoxList items={radioItems} value="benefits" setterFunc={updateFields} setVals={data} />
						</fieldset>
					</div>

					<div className="flex gap-8">
						<div className="w-1/2 col-span-6 ">
							<label htmlFor="DOB" className="block text-sm font-semibold leading-6 text-gray-900">
								<span className="mr-1.5 text-lg font-bold text-red-600">*</span>
								Date of Birth
							</label>
							<div className="mt-2.5">
								<DatePicker
									id="DOB"
									name="dob"
									required
									selected={dob}
									onChange={(date: any) => {
										const formattedDate = format(date, "MM-dd-yyyy") // Format the date
										updateFields({ DOB: formattedDate })
										setDOB(date)
									}}
									className="block w-full px-2 py-2 text-center text-gray-900 border-0 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								/>
							</div>
						</div>

						<div className="w-1/2 col-span-6">
							<div className="flex justify-between">
								<label htmlFor="lastFour" className="block text-sm font-semibold leading-6 text-gray-900 whitespace-nowrap">
									<span className="mr-1.5 text-lg font-bold text-red-600">*</span>
									SSN (Last 4)
								</label>
								<TooltipProvider>
									<Tooltip>
										<TooltipTrigger className="">
											<AiFillInfoCircle className="mt-1 text-lg text-zinc-700" />
										</TooltipTrigger>
										<TooltipContent className="text-white rounded-lg bg-zinc-700 max-w-[520px]">
											<h4 className="my-2 text-lg font-bold"> Why is this being asked for?</h4>
											<p className="text-base text-zinc-200">
												Affordable Connectivity Program (ACP) is seeking to identify and confirm that the
												information you provide is truely yours and that it matches your eligibility claim.
											</p>
										</TooltipContent>
									</Tooltip>
								</TooltipProvider>
							</div>
							<div className="mt-2.5">
								<input
									type="text"
									name="lastFour"
									placeholder=""
									maxLength="4"
									// defaultValue={lastFour}
									aria-invalid="true"
									required
									aria-describedby="email-error"
									id="lastFour"
									autocomplete="off"
									onChange={(e) => {
										const result = e.target.value.replace(/\D/g, "")
										updateFields({
											lastFour: result,
										})
									}}
									value={lastFour}
									className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								/>
							</div>
						</div>
					</div>

					<div className="max-w-md pt-6 col-span-full" id="fileUpload">
						<div className="block mb-2">
							<label htmlFor="postal-code" className="block text-sm font-semibold leading-6 text-gray-700">
								Supporting Documents File Upload
							</label>
							<Label htmlFor="file" value="(id, passport, w-2, tax-return)" className="" />
						</div>
						<FileInput helperText="Upload supporting documents" id="file" multiple />
					</div>
				</div>
			</div>
			{/* <button onClick={showData} className="mx-4 my-1 text-white bg-indigo-400">
				Show Data
			</button> */}
		</FormWrapper>
	)
}

export default BenefitsForm
