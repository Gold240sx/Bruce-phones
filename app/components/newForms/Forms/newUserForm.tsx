import React, { useEffect, ChangeEvent } from 'react'
import { ExclamationCircleIcon } from "@heroicons/react/20/solid"
import { useForm, Controller, useFormContext  } from 'react-hook-form';
import { z } from 'zod'
import {
  Button,
  Checkbox,
  FileInput,
  Label,
  Radio,
  RangeSlider,
  Dropdown,
  Textarea,
  TextInput,
  ToggleSwitch,
} from 'flowbite-react';
// import Select from '../../select'
import Select from "react-select"
import { valueToDropdownConversion, states, classNames } from '../newAppSchema';
import { Switch } from "@headlessui/react"

type UserData = {
    address: any
	password?: string
    formData: any
	setFormData: any
	register: any
	unregister: any
    setValue: any
	watch: any
    control: any
	errors: any
}

type UserFormProps = UserData & {
	// this type means we can update any or all fields that belong to the user Data.
	// updateFields: (fields: Partial<ContactData>) => any
    updateFields: any
}

const stateDropdown = valueToDropdownConversion(states)

const UserForm = ({updateFields, address, formData, setFormData, setValue, control, errors, register, unregister, watch }: UserFormProps) => {
    
    const docDifDelivCheck = watch("address.docDifDelivAdd")
    useEffect(() => {
    register('address.docDifDelivAdd');
    setValue('address.docDifDelivAdd', 'false');
  }, [register, setValue]);

    useEffect(() => {
		if (formData.address.docDifDelivAdd === "false" ) {
			register("address.physical.addressLn1")
            register("address.physical.city")
            register("address.physical.state")
            register("address.physical.zip")
		} else {
			unregister("address.physical.addressLn1")
            unregister("address.physical.city")
            unregister("address.physical.state")
            unregister("address.physical.zip")
		}
	}, [register, unregister, docDifDelivCheck, formData.address.docDifDelivAdd])


  return (
    <div className='pr-14 md:pr-0 md:px-6'>
        <h2 className='text-base font-semibold leading-7 text-gray-900 col-span-full'>
            User Details
        </h2>
        <p className='mt-1 text-sm leading-6 text-gray-600 col-span-full'>
              A few more details about you.
        </p>
        <div className='grid grid-cols-12 mt-10 gap-x-6 gap-y-8'>
            {/* start individual inputs */}
            <div className='sm:col-span-full md:col-span-6 '>
                <div className="flex justify-between px-1">
					<Label
                        htmlFor='firstName'
                        value="First Name"
                        className='block text-sm font-semibold leading-6 text-gray-900'
                     />
                    <span className="text-sm leading-6 text-gray-500" id="firstName-required">
                        Required
                    </span>
				</div>
                <div className='mt-1'>
                    <div className='relative'>
                <TextInput 
                    id="firstName" 
                    type="text" 
                    placeholder="Your First Name"   
                    {...register('firstName')}
                    value={formData.firstName}
					onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, firstName: e.target.value })}
                    autoComplete='given-name' 
                    className='focus:placeholder:opacity-0'
                />
                    {errors.firstName && (
                            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                <ExclamationCircleIcon className="w-5 h-5 text-red-500" aria-hidden="true" />
                            </div>
                    )}
                 </div>
                  {errors.firstName?.message && (
                    <p className='pl-2 mt-2 text-sm text-red-400'>
                      {errors.firstName.message}
                    </p>
                  )}
                </div>
            </div>
            {/*  */}
            <div className='sm:col-span-full md:col-span-6 '>
                <div className="flex justify-between px-1">
					<Label
                        htmlFor='lastName'
                        value="Last Name"
                        className='block text-sm font-semibold leading-6 text-gray-900'
                     />
                    <span className="text-sm leading-6 text-gray-500" id="lastName-required">
                        Required
                    </span>
				</div>
                <div className='mt-1'>
                    <div className='relative'>
                <TextInput 
                    id="lastName" 
                    type="text" 
                    placeholder="Your Last Name"   
                    {...register('lastName')}
                    value={formData.lastName}
					onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, lastName: e.target.value })}
                    autoComplete='family-name' 
                    className='focus:placeholder:opacity-0' />
                    	{errors.lastName && (
								<div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
									<ExclamationCircleIcon className="w-5 h-5 text-red-500" aria-hidden="true" />
								</div>
                        )}
                 </div>
                  {errors.lastName?.message && (
                    <p className='pl-2 mt-2 text-sm text-red-400'>
                      {errors.lastName.message}
                    </p>
                  )}
                </div>
            </div>
            {/*  */}
            <div className='col-span-full'>
                <h3 className='text-base font-semibold leading-7 text-gray-900 col-span-full'>
                    Address
                </h3>
                <p className='mt-1 text-sm leading-6 text-gray-600 col-span-full'>
                    Provide the address matching your documents.
                </p>
            </div>
            {/*  */}
            <div className='col-span-full'>
                <div className="flex justify-between px-1">
					<Label
                        htmlFor='doc-addressLn1'
                        value="Address"
                        className='block text-sm font-semibold leading-6 text-gray-900'
                     />
                    <span className="text-sm leading-6 text-gray-500" id="lastName-required">
                        Required
                    </span>
				</div>
                <div className='mt-1'>
                    <div className='relative'>
                <TextInput 
                    id="doc-addressLn1" 
                    type="text" 
                    placeholder="Your Address: (XXXX adams st Apt 104)"   
                    {...register('address.document.addressLn1')}
                    value={formData.address.document.addressLn1}
					// onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, : e.target.value })}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        updateFields({
                            address: {
                                ...address,
                                document: {
                                    ...address.document,
                                    addressLn1: e.target.value,
                                },
                            },
                        })
                    }
                    autoComplete='address-line1' 
                    className='focus:placeholder:opacity-0' />
                    	{errors.address?.document?.addressLn1 && (
								<div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
									<ExclamationCircleIcon className="w-5 h-5 text-red-500" aria-hidden="true" />
								</div>
                        )}
                 </div>
                  {errors.address?.document?.addressLn1?.message && (
                    <p className='pl-2 mt-2 text-sm text-red-400'>
                      {errors.address.document?.addressLn1.message}
                    </p>
                  )}
                </div>
            </div>
            {/*  */}
            <div className='col-span-full sm:col-span-6'>
                <div className="flex justify-between px-1">
					<Label
                        htmlFor='doc-city'
                        value="City"
                        className='block text-sm font-semibold leading-6 text-gray-900'
                     />
                    <span className="text-sm leading-6 text-gray-500" id="city-required">
                        Required
                    </span>
				</div>
                <div className='mt-1'>
                    <div className='relative'>
                <TextInput 
                    id="doc-city" 
                    type="text" 
                    placeholder="City"   
                    {...register('address.document.city')}
                    value={formData.address.document.city}
					// onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, : e.target.value })}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        updateFields({
                            address: {
                                ...address,
                                document: {
                                    ...address.document,
                                    city: e.target.value,
                                },
                            },
                        })
                    }
                    autoComplete='address-line2' 
                    className='focus:placeholder:opacity-0' />
                    	{errors.address?.document?.city && (
								<div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
									<ExclamationCircleIcon className="w-5 h-5 text-red-500" aria-hidden="true" />
								</div>
                        )}
                 </div>
                  {errors.address?.document?.city?.message && (
                    <p className='pl-2 mt-2 text-sm text-red-400'>
                      {errors.address.document.city.message}
                    </p>
                  )}
                </div>
            </div>
            {/*  */}
            <div className="col-span-full sm:col-span-3 lg:col-span-2 ">
				<div className="flex justify-between px-1">
					<Label
                        htmlFor='doc-state'
                        value="State"
                        className='block text-sm font-semibold leading-6 text-gray-900'
                     />
                    <span className="text-sm leading-6 text-gray-500 opacity-0 md:opacity-100" id="state-required">
                        Required
                    </span>
				</div>
				<div className="mt-1">
                    <Controller
                        name="address.document.state"
                        control={control}
                        render={({ field }) => (
                            <Select
                                {...field}
				                className="h-full mb-4 rounded-lg bg-[#F9FAFB]"
				                options={stateDropdown}
				                placeholder="State"
                                getOptionValue={(option) => option.value}
                                getOptionLabel={(option) => option.label}
				                isSearchable
                                onChange={(selectedOption) => {
                         updateFields({
                            address: {
                                ...address,
                                document: {
                                    ...address.document,
                                    state: selectedOption?.value || ''
                                },
                            },
                        })
                        return    field.onChange(selectedOption || '')
                    }}
                    styles={{
                        control: (baseStyles:any, state:any) => ({
                            ...baseStyles,
                            borderColor: state.isFocused ? '#07B6D4' : '#D1D5DB',
                            boxShadow: state.isFocused ? "var(--tw-ring-inset) 0 0 0 calc(1px + var(--tw-ring-offset-width)) #07B6D4" : "",
                            backgroundColor: "#F9FAFB",
                            borderRadius: "0.375rem",
                            paddingBlock: "2.3px"
                        }),
                    }}
			    />
                     )}
            
      />
              {errors.address?.document?.state?.message && (
                    <p className='pl-2 mt-2 text-sm text-red-400'>
                      {errors.address.document.state.message}
                    </p>
                  )}
                </div>
            </div>
            {/*  */}
            <div className='col-span-full sm:col-span-3 lg:col-span-4'>
                <div className="flex justify-between px-1">
					<Label
                        htmlFor='doc-zip'
                        value="Zip"
                        className='block text-sm font-semibold leading-6 text-gray-900'
                     />
                    <span className="text-sm leading-6 text-gray-500 opacity-0 md:opacity-100" id="zip-required">
                        Required
                    </span>
				</div>
                <div className='mt-1'>
                    <div className='relative'>
                <TextInput 
                    id="doc-zip" 
                    type="text" 
                    maxLength="5"
                    placeholder="Zip Code / Postal Code"   
                    {...register('address.document.zip')}
                    value={formData.address.document.zip}
					// onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, : e.target.value })}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        updateFields({
                            address: {
                                ...address,
                                document: {
                                    ...address.document,
                                    zip: e.target.value,
                                },
                            },
                        })
                    }
                    autoComplete='postal-code' 
                    className='focus:placeholder:opacity-0' />
                    	{errors.address?.document?.zip && (
								<div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
									<ExclamationCircleIcon className="w-5 h-5 text-red-500" aria-hidden="true" />
								</div>
                        )}
                 </div>
                  {errors.address?.document?.zip?.message && (
                    <p className='pl-2 mt-2 text-sm text-red-400'>
                      {errors.address.document.zip?.message}
                    </p>
                  )}
                </div>
            </div>
            {/*  */}
            	{/* toggle for address being same as the billing */}

      
 
        {/* <div className='col-span-full'>
                <Controller
        name="address.docDifDelivAdd"
        control={control}
        defaultValue="false"
        // className="w-full col-span-full"
        // {...register('address.docDifDelivAdd')}
        render={({ field: { onChange, value } }) => (
          <ToggleSwitch
            checked={value === 'true'}
            label="Document address same as shipping address?"
            onChange={(isChecked) => {
              updateFields({
                address: {
                  ...address,
                  docDifDelivAdd: isChecked ? 'true' : 'false',
                },
              });
              onChange(isChecked ? 'true' : 'false');
            }}
          />
        )}
      />
      </div> */}
      {/* <div className='col-span-full'>
        <ToggleSwitch
          {...register('address.docDifDelivAdd')}
          checked={address.docDifDelivAdd === 'true'}
          label="Document address same as shipping address?"
          onChange={(isChecked) => {
            updateFields({
              address: {
                ...address,
                docDifDelivAdd: isChecked ? 'true' : 'false',
              },
            });
          }}
        />
      </div> */}
            {/* <div className='flex gap-3 col-span-full'>
                <Label
                    htmlFor='docDifDelivAdd'
                    value="Document address different than billing address?"
                    className='block leading-6 text-gray-700 text-md'
                    />

        <ToggleSwitch
            id="docDifDelivAdd"
          {...register('address.docDifDelivAdd')}
          checked={docDifDelivCheck === 'true'}
          label=""
          onChange={(isChecked) => setValue('address.docDifDelivAdd', isChecked ? 'true' : 'false')}
        />
      </div> */}
 <div className='flex gap-3 ml-auto col-span-full'>
        <Label
            htmlFor='docDifDelivAdd'
            value="Document address different than billing address?"
            className='block leading-6 text-gray-700 text-md'
        />
        <ToggleSwitch
          label=""
          checked={docDifDelivCheck === 'true'}
          onChange={(isChecked) => {
            setValue('address.docDifDelivAdd', isChecked ? 'true' : 'false')
            setFormData({ ...formData, address: {
                ...address,
                docDifDelivAdd: isChecked ? "true" : "false"
            }})}
        }
        />
      </div>


        {docDifDelivCheck === "true" && (
            <>
              <div className='col-span-full'>
                <h3 className='text-base font-semibold leading-7 text-gray-900 col-span-full'>
                     Shipping Address
                </h3>
                <p className='mt-1 text-sm leading-6 text-gray-600 col-span-full'>
                    Provide the address where we should ship your items to.
                </p>
            </div>
            {/*  */}
            <div className='col-span-full'>
                <div className="flex justify-between px-1">
					<Label
                        htmlFor='physical-addressLn1'
                        value="Address"
                        className='block text-sm font-semibold leading-6 text-gray-900'
                     />
                    <span className="text-sm leading-6 text-gray-500" id="lastName-phys-required">
                        Required
                    </span>
				</div>
                <div className='mt-1'>
                    <div className='relative'>
                <TextInput 
                    id="physical-addressLn1" 
                    type="text" 
                    placeholder="Your Shipping Address: (XXXX adams st Apt 104)"   
                    {...register('address.physical.addressLn1')}
                    value={formData.address.physical.addressLn1}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        updateFields({
                            address: {
                                ...address,
                                physical: {
                                    ...address.physical,
                                    addressLn1: e.target.value,
                                },
                            },
                        })
                    }
                    autoComplete='address-line1' 
                    className='focus:placeholder:opacity-0' />
                    	{errors.address?.physical?.addressLn1 && (
								<div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
									<ExclamationCircleIcon className="w-5 h-5 text-red-500" aria-hidden="true" />
								</div>
                        )}
                 </div>
                  {errors.address?.physical?.addressLn1?.message && (
                    <p className='pl-2 mt-2 text-sm text-red-400'>
                      {errors.address.physical?.addressLn1.message}
                    </p>
                  )}
                </div>
            </div>
            {/*  */}
            <div className='col-span-full sm:col-span-6'>
                <div className="flex justify-between px-1">
					<Label
                        htmlFor='physical-city'
                        value="City"
                        className='block text-sm font-semibold leading-6 text-gray-900'
                     />
                    <span className="text-sm leading-6 text-gray-500" id="city-phys-required">
                        Required
                    </span>
				</div>
                <div className='mt-1'>
                <div className='relative'>
                <TextInput 
                    id="physical-city" 
                    type="text" 
                    placeholder="City"   
                    {...register('address.physical.city')}
                    value={formData.address.physical.city}
					// onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, : e.target.value })}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        updateFields({
                            address: {
                                ...address,
                                physical: {
                                    ...address.physical,
                                    city: e.target.value,
                                },
                            },
                        })
                    }
                    autoComplete='address-line2' 
                    className='focus:placeholder:opacity-0' />
                    	{errors.address?.physical?.city && (
								<div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
									<ExclamationCircleIcon className="w-5 h-5 text-red-500" aria-hidden="true" />
								</div>
                        )}
                 </div>
                  {errors.address?.physical?.city?.message && (
                    <p className='pl-2 mt-2 text-sm text-red-400'>
                      {errors.address.physical.city.message}
                    </p>
                  )}
                </div>
            </div>
            {/*  */}
            <div className="col-span-full sm:col-span-3 lg:col-span-2 ">
				<div className="flex justify-between px-1">
					<Label
                        htmlFor='physical-state'
                        value="State"
                        className='block text-sm font-semibold leading-6 text-gray-900'
                     />
                    <span className="text-sm leading-6 text-gray-500 opacity-0 md:opacity-100" id="state-phys-required">
                        Required
                    </span>
				</div>
                <div className="mt-1">
                    <Controller
                        name="address.physical.state"
                        control={control}
                        render={({ field }) => (
                            <Select
                                {...field}
				                className="h-full mb-4 rounded-lg bg-[#F9FAFB]"
				                options={stateDropdown}
				                placeholder="State"
                                getOptionValue={(option) => option.value}
                                getOptionLabel={(option) => option.label}
				                isSearchable
                                 onChange={(selectedOption) => {
                                            updateFields({
                                                address: {
                                                    ...address,
                                                    physical: {
                                                        ...address.physical,
                                                        state: selectedOption?.value.value,
                                                    },
                                                },
                                            })
                                            return field.onChange(selectedOption || '')
                                        }}
                                styles={{
                                    control: (baseStyles:any, state:any) => ({
                                        ...baseStyles,
                                        borderColor: state.isFocused ? '#07B6D4' : '#D1D5DB',
                                        boxShadow: state.isFocused ? "var(--tw-ring-inset) 0 0 0 calc(1px + var(--tw-ring-offset-width)) #07B6D4" : "",
                                        backgroundColor: "#F9FAFB",
                                        borderRadius: "0.375rem",
                                        paddingBlock: "2.3px"
                                    }),
                                }}
			/>
                     )}
      />
                </div>
            </div>
            {/*  */}
            <div className='col-span-full sm:col-span-3 lg:col-span-4'>
                <div className="flex justify-between px-1">
					<Label
                        htmlFor='physical-zip'
                        value="Zip"
                        className='block text-sm font-semibold leading-6 text-gray-900'
                     />
                    <span className="text-sm leading-6 text-gray-500 opacity-0 md:opacity-100" id="zip-phys-required">
                        Required
                    </span>
				</div>
                <div className='mt-1'>
                    <div className='relative'>
                <TextInput 
                    id="physical-zip" 
                    type="text" 
                    maxLength="5"
                    placeholder="Zip Code / Postal Code"   
                    {...register('address.physical.zip')}
                    value={formData.address.physical.zip}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        updateFields({
                            address: {
                                ...address,
                                physical: {
                                    ...address.physical,
                                    zip: e.target.value,
                                },
                            },
                        })
                    }
                    autoComplete='postal-code' 
                    className='focus:placeholder:opacity-0' />
                    	{errors.address?.physical?.zip && (
								<div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
									<ExclamationCircleIcon className="w-5 h-5 text-red-500" aria-hidden="true" />
								</div>
                        )}
                 </div>
                  {errors.address?.physical?.zip?.message && (
                    <p className='pl-2 mt-2 text-sm text-red-400'>
                      {errors.address.physical.zip.message}
                    </p>
                  )}
                </div>
            </div>
            </>
		 )}

              {/* end individual inputs */}
            </div>
            <Button
                type="button"
                className='w-full m-4'
                onClick={(e) => console.log(formData)}
            >Show data</Button>
    </div>
  )
}

export default UserForm