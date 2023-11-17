import React, { useEffect, ChangeEvent, useState, useRef, ForwardRefExoticComponent,  DetailedHTMLProps, ImgHTMLAttributes } from 'react'
import { ExclamationCircleIcon } from "@heroicons/react/20/solid"
import { useForm, Controller, useFormContext  } from 'react-hook-form';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../../../components/ui/tooltip"
import CustomCalendar from '../../forms/customCalendar';
import { AiFillInfoCircle } from "react-icons/ai"
import Calendar from "react-calendar"
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
import { format, parse } from "date-fns"
import x10Image from '../../../assets/images/DIALNX10G.png'
import x65Image from '../../../assets/images/DIALNX65.png'
import ProductCard from '../../forms/productCard';

export type ImageTypeBasic = {
  src: string | HTMLImageElement | any
  alt?: string
  width?: number
  height?: number
  style?: {
    width?: string,
    height?: string
  }
  className?: string
}
type ImageProps = ImgHTMLAttributes<HTMLImageElement>;
export type ImageType = ForwardRefExoticComponent<Omit<ImageProps, 'ref'> & React.RefAttributes<HTMLImageElement>> | ImageTypeBasic

type BenefitData = {
	DOB: string
	qualification: string
	lastFour: string
}
type ProductFormData = ProductData & {
	// this type means we can update any or all fields that belong to the user Data.
	data: any
	updateFields: (fields: Partial<ProductData>) => void
    formData: any 
    setFormData: any 
    setValue: any 
    control: any 
    errors: any 
    register: any
}


type ProductData = {
	DOB: string
	lastFour: string
}

type ProductFormProps = ProductFormData & {
	// this type means we can update any or all fields that belong to the user Data.
	updateFields: (fields: Partial<ProductFormData>) => void
	pickedProduct: string
}

export type Product = {
	name: string
	nickName: string
	tagline: string
	image: ImageType
	brand: string
	price: string
	screen: string
	connectivity: string
	storage: string
	cameras: string
	os: string
}

	const productData: Product[] = [
		{
			name: "DIALN X10G Tablet",
			nickName: "x10",
			tagline: '10" Tablet w/ cellular',
			image: x10Image,
			brand: "DIALN",
			price: "$199.99",
			screen: '10.1" HD+ 1280 x 800',
			connectivity: "Wifi + 4G",
			storage: "64 GB",
			cameras: "8MP + 8MP AF",
			os: "Android 13",
		},
		{
			name: "DIALN X65 Smartphone",
			nickName: "x65",
			tagline: '6.5" Smartphone',
			image: x65Image,
			brand: "DIALN",
			price: "$99.99",
			screen: '"6.52" HD+ 720 x 1600',
			connectivity: "Wifi + 4G",
			storage: "32 GB / 3 GB",
			cameras: "13.0MP",
			os: "Android 13",
		},
	]



const ProductForm = ({ formData, setValue, register }: ProductFormProps) => {
    	const [pickedProduct, setPickedProduct] = useState(formData.pickedProduct)
  return (
      <div className='pr-14 md:pr-0 md:px-6'>
        <h2 className='text-base font-semibold leading-7 text-gray-900 col-span-full'>
            Product Selection
        </h2>
        <p className='mt-1 text-sm leading-6 text-gray-600 col-span-full'>
              Pick your desired product
        </p>
        <div className='flex flex-col w-full gap-6 mt-10 gap-y-8'>
            {/* start individual inputs */}
					{/* {productData.map((product: Product) => (
                        <>
                            <ProductCard product={product} pickedProduct={pickedDevice} setPickedProduct={setPickedDevice} />
                            <input
                                type="radio"
                                checked={formData.pickedProduct === product.nickName}
                                value={product.nickName}
                                {...register('pickedProduct')}
                                onClick={() => setPickedDevice(product)}
                            />
                        </>
					))} */}
            {productData.map((product) => (
                <div key={product.nickName}>
                    {/* Hidden radio input */}
                    <input
                        type="radio"
                        value={product.nickName}
                        checked={pickedProduct === product.nickName}
                        {...register('pickedProduct')}
                        id={`radio_${product.nickName}`}
                        style={{ display: 'none' }}
                    />
                    {/* ProductCard used for visual representation */}
                    <ProductCard product={product} pickedProduct={pickedProduct} setValue={setValue} setPickedProduct={setPickedProduct} />
                </div>
            ))}             
		</div>
    </div>
  )
}

export default ProductForm

//     