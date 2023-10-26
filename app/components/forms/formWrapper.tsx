import React, { ReactNode } from "react"

type FormWrapperProps = {
	title: string
	children: ReactNode
	className: string
}
const FormWrapper = ({ title, children, className }: FormWrapperProps) => {
	return (
		<div className={`${className} w-full`}>
			<h2 className="m-0 mb-2 text-3xl align-center">{title}</h2>
			<div
				className="align-center mx-auto grid gap-x-1 gap-y-0.5 justify-start"
				style={{ gridTemplateColumns: "auto minMax(auto, 400px)" }}>
				{children}
			</div>
		</div>
	)
}

export default FormWrapper
