"use client"
import React, { ReactNode, useState, useEffect } from "react"
import Image from "next/image"

type FormWrapperProps = {
	title: string
	children: ReactNode
	className: string
}
const FormWrapper = ({ title, children, className }: FormWrapperProps) => {
	const [imageSrc, setImageSrc] = useState("")

	return (
		<div className={`${className} w-full`}>
			<h2 className="w-10/12 m-0 mx-auto mb-2 text-4xl text-purple-700 align-center">{title}</h2>
			<div className="align-center mx-auto grid gap-x-1 gap-y-0.5 justify-start py-10">{children}</div>
			{/* right/top collumn/row */}
			<div className="mb-12 md:mb-0 md:w-8/12 lg:w-6/12">
				{/* <img
								src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
								className="w-full"
								alt="Phone image"
							/> */}
				<Image
					className="object-cover ml-auto bg-center"
					src={imageSrc}
					alt="People enjoying mobile phone use"
					sizes="100vh"
					style={{
						width: "cover",
						height: "100%",
					}}
					width={700}
					height={900}
				/>
			</div>
		</div>
	)
}

export default FormWrapper
