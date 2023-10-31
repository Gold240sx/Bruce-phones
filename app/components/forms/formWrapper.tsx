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
			<h2 className="w-full m-0 mb-2 text-4xl text-purple-700 align-center pl-0.5">{title}</h2>
			<div className="grid justify-start grid-cols-1 pb-10 pl-4 mx-auto align-center gap-x-1 gap-y-6">{children}</div>
		</div>
	)
}

export default FormWrapper
