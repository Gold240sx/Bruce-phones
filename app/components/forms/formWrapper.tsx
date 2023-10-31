import React, { ReactNode } from "react"
import Image from "next/image"

type FormWrapperProps = {
	title: string
	children: ReactNode
	className: string
}
const FormWrapper = ({ title, children, className }: FormWrapperProps) => {
	return (
		<div className={`${className} w-full`}>
			<h2 className="w-10/12 m-0 mx-auto mb-2 text-4xl text-purple-700 align-center">{title}</h2>
			<div className="align-center mx-auto grid gap-x-1 gap-y-0.5 justify-start py-10">{children}</div>
		</div>
	)
}

export default FormWrapper
