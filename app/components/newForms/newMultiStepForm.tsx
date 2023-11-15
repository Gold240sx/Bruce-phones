"use client"
import { z } from "zod"
import { motion } from 'framer-motion'
import React, { useState, useEffect, FormEvent } from "react"
import { type step } from './newAppSchema'
import StepperNav from "./stepperNav"
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, SubmitHandler } from 'react-hook-form'
import { ApplicationFormSchema } from "./newAppSchema"
import ContactForm from "./Forms/newContactForm"
import ProductForm from "./Forms/productForm"
import UserForm from "./Forms/newUserForm"
import QualificationForm from "./Forms/qualificationForm"
import { ToggleSwitch } from "flowbite-react"



type Inputs = z.infer<typeof ApplicationFormSchema>

const steps: step[] = [
  {
    id: 'Step 1',
    name: 'Contact Info',
    fields:  ['email', 'phoneDetails', 'userAccount', 'password'] 
    },
     {
    id: 'Step 2',
    name: 'User Info',
    fields: ['firstName', 'lastName',  'address']
    },
    //  {  id: "step 3",  name: "Qualification Info", fields:  ['qualifications', 'DOB', 'lastFour']  },
    // {  id: "step 3",  name: "Qualification Info", fields: ['pickedProduct'] },
    { id: 'Step 5', name: 'Complete' }
]

export default function MultiForm() {
  const [previousStep, setPreviousStep] = useState(0)
  const [currentStep, setCurrentStep] = useState(0)
  	const [formData, setFormData] = useState({
        firstName: "Billy",
		lastName: "Mason",
		lastFour: "",
		DOB: new Date(),
		phoneDetails: {
			phoneNo: "(410) 411-5604",
			phoneCountryCode: "US",
		},
		email: "nreinrsrsn@nernrss.com",
		address: {
			docDifDelivAdd: "false",
			document: {
				addressLn1: "1111 Nimrod Ave",
				city: "Carlston",
				state: {label: 'AZ' , value: 'AZ'},
				zip: "11111",
			},
			physical: {
				addressLn1: "",
				city: "",
				state: {label: '' , value: ''},
				zip: "",
			},
		},
		documents: [],
		device: "x10",
		userAccount: "false",
		benefits: "SNAP",
		status: "",
        pickedProduct: "x10"
    })
  
  const delta = currentStep - previousStep

 const {
    register,
    unregister,
    handleSubmit,
    watch,
    reset,
    trigger,
    control,
    setValue,
    formState: { errors }
  } = useForm<Inputs>({
    resolver: zodResolver(ApplicationFormSchema)
  })

  	function updateFields(fields: Partial<FormData>) {
		setFormData((prev) => {
			return { ...prev, ...fields }
		})
	}

   const processForm: SubmitHandler<Inputs> = data => {
    console.log("Form Data", data)
    // reset()
  }

  type FieldName = keyof Inputs

  const next = async () => {
    const fields = steps[currentStep].fields
    const output = await trigger(fields as FieldName[], { shouldFocus: true })
    console.log("output", output, fields)

    if (!output) {
          // Access the updated errors object
    const updatedErrors = errors;
    console.log("Validation errors:", updatedErrors);
    // Handle validation errors as needed
    return;
  }

    if (currentStep < steps.length - 1) {
      if (currentStep === steps.length - 2) {
        console.log("should log the data now")
        handleSubmit(processForm)()
      }
      setPreviousStep(currentStep)
      setCurrentStep(step => step + 1)
    }
  }

  const prev = () => {
    if (currentStep > 0) {
      setPreviousStep(currentStep)
      setCurrentStep(step => step - 1)
    }
  }

    return (
        <section className="inset-0 flex flex-row justify-between gap-8 px-4 py-10 lg:p-24 md:p-12 md:gap-0 md:flex-col">
            {/*  steps */}
            <StepperNav steps={steps} currentStep={currentStep} />

            <div className="">
                {/*  form */}
                <form className="md:py-12"  onSubmit={handleSubmit(processForm)}>
                
                {currentStep ===0 && (
                    <motion.div
                        initial={{ x: delta >= 0 ? '50%' : '-50%', opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                        <div className="grid grid-cols-12 pr-14 md:pr-0 md:px-6'">
                            <ContactForm 	
                                {...formData}
                                formData={formData}
                                setFormData={setFormData}
			                    updateFields={updateFields} 
                                errors={errors}
                                register={register}
			                    unregister={unregister}
			                    watch={watch}
                            />
                        </div>
                    </motion.div> 
                ) }

                {currentStep === 1 && (
                    <motion.div
                        initial={{ x: delta >= 0 ? '50%' : '-50%', opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                        <UserForm     
                            {...formData}
                            formData={formData}
                            setFormData={setFormData}
                            updateFields={updateFields} 
                            setValue={setValue}
                            errors={errors}
                            register={register}
                            unregister={unregister}
                            control={control}
                            watch={watch} 
                        />
                    </motion.div>
                ) }
               
                {currentStep === 2 && (
                    <motion.div
                        initial={{ x: delta >= 0 ? '50%' : '-50%', opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                        <QualificationForm />
                    </motion.div>
                ) }
                 {currentStep === 3 && (
                    <motion.div
                        initial={{ x: delta >= 0 ? '50%' : '-50%', opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                       <ProductForm />
                    </motion.div>
                ) }

                {currentStep === 4 && (
                   <>
                        <h2 className='text-base font-semibold leading-7 text-gray-900'>
                        Complete
                        </h2>
                        <p className='mt-1 text-sm leading-6 text-gray-600'>
                        Thank you for your submission.
                        </p>
                    </>
                ) }
                </form>
            
                {/* Navigation */}
                <div className='pt-8'>
        <div className='flex justify-between'>
          <button
            type='button'
            onClick={prev}
            disabled={currentStep === 0}
            className='px-2 py-1 text-sm font-semibold bg-white rounded shadow-sm text-sky-900 ring-1 ring-inset ring-sky-300 hover:bg-sky-50 disabled:cursor-not-allowed disabled:opacity-50'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              stroke='currentColor'
              className='w-6 h-6'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M15.75 19.5L8.25 12l7.5-7.5'
              />
            </svg>
          </button>
          <button
            type='button'
            onClick={next}
            disabled={currentStep === steps.length - 1}
            className='px-2 py-1 text-sm font-semibold bg-white rounded shadow-sm text-sky-900 ring-1 ring-inset ring-sky-300 hover:bg-sky-50 disabled:cursor-not-allowed disabled:opacity-50'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              stroke='currentColor'
              className='w-6 h-6'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M8.25 4.5l7.5 7.5-7.5 7.5'
              />
            </svg>
          </button>
        </div>
                </div>
            </div>
        </section>
    )
}