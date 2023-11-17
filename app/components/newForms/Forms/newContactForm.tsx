import React, { useEffect } from 'react'
import { ExclamationCircleIcon } from "@heroicons/react/20/solid"
import { z } from 'zod'
import {
  Button,
  Checkbox,
  FileInput,
  Label,
  Radio,
  RangeSlider,
  Dropdown,
  Select,
  Textarea,
  TextInput,
  ToggleSwitch,
} from 'flowbite-react';
import { formatPhoneNo } from '../newAppSchema';

type ContactData = {
	// email: string
	// phoneDetails: {
	// 	phoneNo: string
	// 	phoneCountryCode: string
	// }
    userAccount: string
	password?: string
    formData: any
	setFormData: any
	register: any
	unregister: any
	watch: any
	errors: any
}

type ContactFormProps = ContactData & {
	// this type means we can update any or all fields that belong to the user Data.
	// updateFields: (fields: Partial<ContactData>) => any
    updateFields: any
}

const ContactForm = ({updateFields, userAccount, formData, setFormData, errors, register, unregister, watch }: ContactFormProps) => {
    
    const userAccountCheck = watch("userAccount")
    useEffect(() => {
		if (userAccount ) {
			register("password")
		} else {
			unregister("password")
		}
	}, [register, unregister, userAccountCheck, formData.userAccount])


  return (
    <>
        <h2 className='text-base font-semibold leading-7 text-gray-900 col-span-full'>
            Contact Information
        </h2>
        <p className='mt-1 text-sm leading-6 text-gray-600 col-span-full'>
              Provide your contact information
        </p>
        <div className='flex flex-col mt-10 col-span-full gap-x-6 gap-y-8'>
            {/* start individual inputs */}
            <div className='sm:col-span-4'>
                <div className="flex justify-between px-1">
					<Label
                        htmlFor='email'
                        value="Email Address"
                        className='block text-sm font-semibold leading-6 text-gray-900'
                     />
                    <span className="text-sm leading-6 text-gray-500" id="email-required">
                        Required
                    </span>
				</div>
                <div className='mt-1'>
                    <div className='relative'>
                <TextInput 
                    id="email" 
                    type="email" 
                    placeholder="yourEmail@gmail.com"   
                    {...register('email')}
                    	value={formData.email}
								onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    autoComplete='email' 
                    required 
                    className='focus:placeholder:opacity-0' />
                    	{errors.phoneDetails && (
								<div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
									<ExclamationCircleIcon className="w-5 h-5 text-red-500" aria-hidden="true" />
								</div>
                        )}
                 </div>
                  {errors.email?.message && (
                    <p className='pl-2 mt-2 text-sm text-red-400'>
                      {errors.email.message}
                    </p>
                  )}
                </div>
            </div>
            {/*  */}
            <div className="relative sm:col-span-2">
				<div className="flex justify-between px-1">
					<Label
                        htmlFor='phone'
                        value="Phone Number"
                        className='block text-sm font-semibold leading-6 text-gray-900'
                     />
                    <span className="text-sm leading-6 text-gray-500" id="email-required">
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
									name="country"
									className="h-full py-0 pl-4 text-gray-400 bg-transparent border-0 rounded-lg rounded-r-none border-transparent bg-none pr-9 focus:ring-2  focus:ring-inset focus:ring-[#07B6D4] sm:text-sm"
									autoComplete="tel-country-code"
                                    value={formData.phoneDetails.phoneCountryCode}
									{...register("phoneDetails.phoneCountryCode")}
                                    onChange={(e) =>
										setFormData({
											...formData,
											phoneDetails: {
												...formData.phoneDetails,
												phoneCountryCode: e.target.value,
											},
										})
									}
                                >
									<option>US</option>
									<option>CA</option>
									<option>EU</option>
								</select>
							</div>
							<input
								type="tel"
								name="phone-number"
								id="phone-number"
								className="block w-full rounded-lg border-0 bg-[#F9FAFB] px-3.5 py-2.5 pl-24 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:placeholder:opacity-0 focus:ring-2 focus:ring-inset focus:ring-[#07B6D4] sm:text-sm sm:leading-6"
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
							<p className="pl-2 mt-2 text-sm text-red-600/60" id="phoneNo-error">
								Please enter a valid phone number
							</p>
						)}
					</div>
                    {/*  */}
                    <div className="flex flex-col items-start mx-2 text-xl align-middle ">
						<label className="text-xl font-semibold text-gray-900">Notifications</label>
						<p className="text-lg text-gray-500 ">
							Subscribe for future giveaways, product launches and programs alerts?{" "}
							<span className="text-zinc-400">
								(Subscribing will also create an account where you can supply any verification documents in the event you
								need to appeal the decision.)
							</span>
						</p>
						<fieldset className="mt-4 text-lg">
							<legend className="sr-only">Notification method</legend>
							<div className="mx-6 space-y-4 sm:flex sm:items-center sm:space-x-10 sm:space-y-0">
								<div className="flex items-center">
                                    <label 
                                        className="flex items-center gap-1"                                            
                                         onClick={() =>
                                                updateFields({
                                                  	userAccount: "false",
                                                })
                                    }>
                                        <input
                                            id="userAccount-no"
                                            name="userAccount"
                                            type="radio"
                                            value="false"
                                            // checked={formData.userAccount === "false"} 
                                            {...register("userAccount")}
                                            className="w-4 h-4 text-[#07B6D4] border-gray-300 cursor-pointer focus:ring-[#07B6D4]"
                                        />
                                        <p
                                            className="block ml-3 font-medium leading-6 text-gray-900 cursor-pointer">
                                            No
                                        </p>
                                    </label>
								</div>

								<div className="flex items-center">
                                    <label 
                                        className="flex items-center gap-1"
                                        onClick={() =>
                                            updateFields({
                                            	userAccount: "true",
                                            })
                                        }
                                    >
                                        <input
                                            id="userAccount-yes"
                                            name="userAccount"
                                            type="radio"
                                            value="true"
                                            // checked={formData.userAccount === "true"}
                                            {...register("userAccount")}
                                            className="w-4 h-4 text-[#07B6D4] border-gray-300 cursor-pointer focus:ring-[#07B6D4]"
                                        />
                                        <p
                                            className="block ml-3 font-medium leading-6 text-gray-900 cursor-pointer">
                                            Yes, I like free stuff!
                                        </p>
                                    </label>
								</div>
								{errors.userAccount && (
									<p className="mt-2 text-sm text-red-600" id="userAccount-error">
										{errors.userAccount.message}
									</p>
								)}
							</div>
							
						</fieldset>
					</div>

                    {userAccountCheck === "true" && (
                            <div className='sm:col-span-4'>
                <div className="flex justify-between px-1">
					<Label
                        htmlFor='password'
                        value="Password"
                        className='block text-sm font-semibold leading-6 text-gray-900'
                     />
                    <span className="text-sm leading-6 text-gray-500" id="password-required">
                        Required
                    </span>
				</div>
                <div className='mt-1'>
                    <div className='relative'>
                <TextInput 
                    id="password" 
                    type="password" 
                    placeholder="****"   
                    {...register('password')}
                    	// value={formData.password}
						// 		onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    autoComplete='password' 
                    className='focus:placeholder:opacity-0' />
                    	{errors.password && (
								<div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
									<ExclamationCircleIcon className="w-5 h-5 text-red-500" aria-hidden="true" />
								</div>
                        )}
                 </div>
                  {errors.password?.message && (
                    <p className='pl-2 mt-2 text-sm text-red-400'>
                      {errors.password.message}
                    </p>
                  )}
                </div>
            </div>
        
					)}

              {/* end individual inputs */}
            </div>
            {/* <Button
                type="button"
                className='w-full m-4'
                onClick={(e) => console.log(formData)}
            >Show data</Button> */}
            </>
  )
}

export default ContactForm