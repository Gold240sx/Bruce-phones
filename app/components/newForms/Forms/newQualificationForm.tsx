import React, { ChangeEvent, useState, useRef } from 'react'
import { ExclamationCircleIcon } from "@heroicons/react/20/solid"
import { Controller  } from 'react-hook-form';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../../../components/ui/tooltip"
import { AiFillInfoCircle } from "react-icons/ai"
import Calendar from "react-calendar"
import {
  Label,
  TextInput,
} from 'flowbite-react';
import { format, parse } from "date-fns"

type BenefitData = {
	DOB: string
	qualification: string
	lastFour: string
}
type BenefitFormProps = BenefitData & {
	// this type means we can update any or all fields that belong to the user Data.
	data: any
	updateFields: (fields: Partial<BenefitData>) => void
    formData: any 
    setFormData: any 
    setValue: any 
    control: any 
    errors: any 
    register: any
}

type Item = {
	name: string
}
type ValuePiece = Date | null
type Value = ValuePiece | [ValuePiece, ValuePiece]
type RadioBoxProps = {
	item: Item
	// value: [key: string]
	setVals: any
    registering: string
	setterFunc: (value: { [key: string]: string }) => void
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


const QualificationForm = ({updateFields, formData, setFormData, setValue, control, errors, register }: BenefitFormProps) => {
    	const [value, onChange] = useState<Value>(new Date())
	const [showPicker, setShowPicker] = useState(false)
    	const [dob, setDOB] = useState(new Date())
	const inputRef = useRef()

	const setInputFocus = () => {
		inputRef.current ? inputRef.current.focus() : null
	}

  return (
    <div className='pr-14 md:pr-0 md:px-6'>
        <h2 className='text-base font-semibold leading-7 text-gray-900 col-span-full'>
            Qualification Report
        </h2>
        <p className='mt-1 text-sm leading-6 text-gray-600 col-span-full'>
              Qualification details
        </p>
        <div className='grid grid-cols-12 mt-10 gap-x-6 gap-y-8'>
            {/* start individual inputs */}
            		<div className="pt-6 col-span-full">
						<label className="text-base font-semibold text-gray-900">
						    Which qualification do you meet?
						</label>
						<p className="text-base text-zinc-600">( Select one )</p>
						<fieldset className="mt-4">
							<legend className="sr-only">Benefits you would like to submit for eligibility</legend>
                            <div className="space-y-2">
                                {/* {radioItems.map((item) => (
                                    <RadioBox key={item.name} item={item} registering={"qualification"} setterFunc={updateFields} setVals={formData} />
                                ))} */}

                            {/* manual exec */}
                                  	<label
			htmlFor={`radio-SNAP`}
             onClick={() =>
                updateFields({
                    qualification:"SNAP"
                })
            }
			className={`${
				"SNAP" === formData.qualification ? "ring-2 ring-[#07B6D4]" : "hover:ring-2 hover:ring-[#8FCAD4] active:ring-[#07B6D4]"
			} flex items-center px-4 py-2 max-w-md border rounded-lg cursor-pointer border-zinc-300 `}>
			<input
				id="radio-SNAP"
				name="qualification"
				type="radio"
                {...register('qualification')}
                value="SNAP"
                // defaultChecked={name === formData.qualification}
				checked={"SNAP" === formData.qualification}
				className="w-4 h-4 text-[#07B6D4] border-gray-300 cursor-pointer focus:ring-[#07B6D4]"
			/>
			<p className="block ml-3 text-base font-medium leading-6 text-gray-700 cursor-pointer ">SNAP</p>
		                            </label>
                                    {/*  */}
                     	            <label
			htmlFor={`radio-WIC`}
             onClick={() =>
                updateFields({
                    qualification:"WIC"
                })
            }
			className={`${
				"WIC" === formData.qualification ? "ring-2 ring-[#07B6D4]" : "hover:ring-2 hover:ring-[#8FCAD4] active:ring-[#07B6D4]"
			} flex items-center px-4 py-2 max-w-md border rounded-lg cursor-pointer border-zinc-300 `}>
			<input
				id="radio-WIC"
				name="qualification"
				type="radio"
                {...register('qualification')}
                value="WIC"
                // defaultChecked={name === formData.qualification}
				checked={"WIC" === formData.qualification}
				className="w-4 h-4 text-[#07B6D4] border-gray-300 cursor-pointer focus:ring-[#07B6D4]"
			/>
			<p className="block ml-3 text-base font-medium leading-6 text-gray-700 cursor-pointer ">WIC</p>
		                            </label>
                                       {/*  */}
                                          <label
			htmlFor={`radio-Medicaid`}
             onClick={() =>
                updateFields({
                    qualification:"Medicaid"
                })
            }
			className={`${
				"Medicaid" === formData.qualification ? "ring-2 ring-[#07B6D4]" : "hover:ring-2 hover:ring-[#8FCAD4] active:ring-[#07B6D4]"
			} flex items-center px-4 py-2 max-w-md border rounded-lg cursor-pointer border-zinc-300 `}>
			<input
				id="radio-Medicaid"
				name="qualification"
				type="radio"
                {...register('qualification')}
                value="Medicaid"
                // defaultChecked={name === formData.qualification}
				checked={"Medicaid" === formData.qualification}
				className="w-4 h-4 text-[#07B6D4] border-gray-300 cursor-pointer focus:ring-[#07B6D4]"
			/>
			<p className="block ml-3 text-base font-medium leading-6 text-gray-700 cursor-pointer ">Medicaid</p>
		                            </label>
                                    {/*  */}
                                       <label
			htmlFor={`radio-National School Lunch`}
             onClick={() =>
                updateFields({
                    qualification:"National School Lunch"
                })
            }
			className={`${
				"National School Lunch" === formData.qualification ? "ring-2 ring-[#07B6D4]" : "hover:ring-2 hover:ring-[#8FCAD4] active:ring-[#07B6D4]"
			} flex items-center px-4 py-2 max-w-md border rounded-lg cursor-pointer border-zinc-300 `}>
			<input
				id="radio-National School Lunch"
				name="qualification"
				type="radio"
                {...register('qualification')}
                value="National School Lunch"
                // defaultChecked={name === formData.qualification}
				checked={"National School Lunch" === formData.qualification}
				className="w-4 h-4 text-[#07B6D4] border-gray-300 cursor-pointer focus:ring-[#07B6D4]"
			/>
			<p className="block ml-3 text-base font-medium leading-6 text-gray-700 cursor-pointer ">National School Lunch</p>
		                            </label>
                                    {/*  */}
                                       <label
			htmlFor={`radio-Pell Grant`}
             onClick={() =>
                updateFields({
                    qualification:"Pell Grant"
                })
            }
			className={`${
				"Pell Grant" === formData.qualification ? "ring-2 ring-[#07B6D4]" : "hover:ring-2 hover:ring-[#8FCAD4] active:ring-[#07B6D4]"
			} flex items-center px-4 py-2 max-w-md border rounded-lg cursor-pointer border-zinc-300 `}>
			<input
				id="radio-Pell Grant"
				name="qualification"
				type="radio"
                {...register('qualification')}
                value="Pell Grant"
                // defaultChecked={name === formData.qualification}
				checked={"Pell Grant" === formData.qualification}
				className="w-4 h-4 text-[#07B6D4] border-gray-300 cursor-pointer focus:ring-[#07B6D4]"
			/>
			<p className="block ml-3 text-base font-medium leading-6 text-gray-700 cursor-pointer ">Pell Grant</p>
		                            </label>
                                    {/*  */}
                                       <label
			htmlFor={`radio-Veterans Pension and Survivors Benefit Program`}
             onClick={() =>
                updateFields({
                    qualification:"Veterans Pension and Survivors Benefit Program"
                })
            }
			className={`${
				"Veterans Pension and Survivors Benefit Program" === formData.qualification ? "ring-2 ring-[#07B6D4]" : "hover:ring-2 hover:ring-[#8FCAD4] active:ring-[#07B6D4]"
			} flex items-center px-4 py-2 max-w-md border rounded-lg cursor-pointer border-zinc-300 `}>
			<input
				id="radio-Veterans Pension and Survivors Benefit Program"
				name="qualification"
				type="radio"
                {...register('qualification')}
                value="Veterans Pension and Survivors Benefit Program"
                // defaultChecked={name === formData.qualification}
				checked={"Veterans Pension and Survivors Benefit Program" === formData.qualification}
				className="w-4 h-4 border-gray-300 cursor-pointer text-[#07B6D4] focus:ring-[#07B6D4]"
			/>
			<p className="block ml-3 text-base font-medium leading-6 text-gray-700 cursor-pointer ">Veterans Pension and Survivors Benefit Program</p>
		                            </label>
                                    {/*  */}
                                       <label
			htmlFor={`radio-Section 8`}
             onClick={() =>
                updateFields({
                    qualification:"Section 8"
                })
            }
			className={`${
				"Section 8" === formData.qualification ? "ring-2 ring-[#07B6D4]" : "hover:ring-2 hover:ring-[#8FCAD4] active:ring-[#07B6D4]"
			} flex items-center px-4 py-2 max-w-md border rounded-lg cursor-pointer border-zinc-300 `}>
			<input
				id="radio-Section 8"
				name="qualification"
				type="radio"
                {...register('qualification')}
                value="Section 8"
                // defaultChecked={name === formData.qualification}
				checked={"Section 8" === formData.qualification}
				className="w-4 h-4 text-[#07B6D4] border-gray-300 cursor-pointer focus:ring-[#07B6D4]"
			/>
			<p className="block ml-3 text-base font-medium leading-6 text-gray-700 cursor-pointer ">Section 8</p>
		                            </label>
                                    {/*  */}
                                       <label
			htmlFor={`radio-Income below $26,000 / year`}
             onClick={() =>
                updateFields({
                    qualification:"Income below $26,000 / year"
                })
            }
			className={`${
				"Income below $26,000 / year" === formData.qualification ? "ring-2 ring-[#07B6D4]" : "hover:ring-2 hover:ring-[#8FCAD4] active:ring-[#07B6D4]"
			} flex items-center px-4 py-2 max-w-md border rounded-lg cursor-pointer border-zinc-300 `}>
			<input
				id="radio-Income below $26,000 / year"
				name="qualification"
				type="radio"
                {...register('qualification')}
                value="Income below $26,000 / year"
                // defaultChecked={name === formData.qualification}
				checked={"Income below $26,000 / year" === formData.qualification}
				className="w-4 h-4 text-[#07B6D4] border-gray-300 cursor-pointer focus:ring-[#07B6D4]"
			/>
			<p className="block ml-3 text-base font-medium leading-6 text-gray-700 cursor-pointer ">Income below $26,000 / year</p>
		                            </label>
                                    {/*  */}
                            </div>
                            {/* end manual exec */}
						</fieldset>
					</div>
            <div className='col-span-full md:col-span-6 '>
                <div className="flex justify-between px-1">
					<Label
                        htmlFor='DOB'
                        value="Date Of Birth"
                        className='block text-sm font-semibold leading-6 text-gray-900'
                     />
                    <span className="text-sm leading-6 text-gray-500" id="firstName-required">
                        Required
                    </span>
				</div>
                {/* <div className='mt-1'>
                    <div className='relative'>
                <TextInput 
                    id="DOB" 
                    type="text" 
                    placeholder="Date of Birth"   
                    {...register('DOB')}
                    value={formData.DOB}
					onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, DOB: e.target.value })}
                    autoComplete='given-name' 
                    className='focus:placeholder:opacity-0'
                />
                    {errors.DOB && (
                            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                <ExclamationCircleIcon className="w-5 h-5 text-red-500" aria-hidden="true" />
                            </div>
                    )}
                 </div>
                  {errors.DOB?.message && (
                    <p className='pl-2 mt-2 text-sm text-red-400'>
                      {errors.DOB.message}
                    </p>
                  )}
                </div> */}
                {/* custom calendar */}
                		<div className="mt-2.5">
								{/* <CustomCalendar /> */}
								{/* <DatePicker
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
								/> */}
                                	<div className="relative w-full">
			<div
				id="input-overlay"
				onClick={() => {
					setInputFocus()
					setShowPicker(true)
				}}
				className="absolute z-20 w-full h-10 rounded-lg cursor-text opacity-20 bg-[#D1D5DB]"></div>

            {/*  */}
            <Controller
            control={control}
            name="DOB"
            render={({ field }) => (
                <>
                <input
                    id="DOB"
                    required
                    type="text"
                    value={field.value || ''} // Set value to an empty string if field.value is undefined
                    onChange={(e) => {
                    const inputDate = parse(e.target.value, "MM-dd-yyyy", new Date());
                    if (!isNaN(inputDate.getTime())) {
                        // If the parsed date is valid
                        field.onChange(inputDate);
                        setDOB(inputDate);
                    }
                    }}
                    onClick={() => setShowPicker(!showPicker)}
                    className="block w-full px-2 py-2 text-center text-gray-900 border-0 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#07B6D4] sm:text-sm sm:leading-6"
                />
                {showPicker && (
                    <Calendar
                        onChange={(date:Date) => {
                            field.onChange(format(date, "MM-dd-yyyy"));
                            setDOB(date);
                            setShowPicker(false);
                        }}
                        value={dob}
                        minDate={new Date(1920, 0, 1)}
						maxDate={new Date()}
                        className="pt-8 mt-2 border border-zinc-300 rounded-xl"
                        />
                    )}
                    	{errors.DOB && (
									<p className="mt-2 text-sm text-red-600" id="userAccount-error">
										{errors.DOB.message}
									</p>
								)}
                </>
            )}
            />
            {/*  */}
		</div>
							</div>
            </div>
            {/*  */}
            <div className='col-span-full md:col-span-6 '>
                <div className="flex justify-between px-1">
					<Label
                        htmlFor='lastFour'
                        value="SSN (last 4)"
                        className='block text-sm font-semibold leading-6 text-gray-900'
                     />
                     <div>
                    <span className="text-sm leading-6 text-gray-500" id="lastFour-required">
                        Required
                    </span>
                    	<TooltipProvider>
									<Tooltip>
										<TooltipTrigger className="">
											<AiFillInfoCircle className="ml-3 text-lg translate-y-1 text-zinc-700" />
										</TooltipTrigger>
										<TooltipContent className="text-white rounded-lg bg-zinc-700 max-w-[520px]">
											<h4 className="my-2 text-lg font-bold max-w-[300px]"> Why is this being asked for?</h4>
											<p className="max-w-[300px] text-base text-zinc-200">
												Affordable Connectivity Program (ACP) is seeking to identify and confirm that the
												information you provide is truely yours and that it matches your eligibility claim.
											</p>
										</TooltipContent>
									</Tooltip>
								</TooltipProvider>
                    </div>
				</div>

                <div className='mt-1'>
                    <div className='relative'>
                <TextInput 
                    id="lastFour" 
                    type="text" 
                    placeholder="****"   
                    {...register('lastFour')}
                    maxLength="4"
                    value={formData.lastFour}
					onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        const numOnly = e.target.value.replace(/[^0-9]/g, '')
                        setFormData({ ...formData, lastFour: numOnly }
                    )}}
                    className='focus:placeholder:opacity-0' />
                    	{errors.lastFour && (
								<div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
									<ExclamationCircleIcon className="w-5 h-5 text-red-500" aria-hidden="true" />
								</div>
                        )}
                 </div>
                  {errors.lastFour?.message && (
                    <p className='pl-2 mt-2 text-sm text-red-400'>
                      {errors.lastFour.message}
                    </p>
                  )}
                </div>
            </div>

              {/* end individual inputs */}
            </div>
            {/* <Button
                type="button"
                className='w-full m-4'
                onClick={(e) => console.log(formData)}
            >Show data</Button> */}
    </div>
  )
}

export default QualificationForm