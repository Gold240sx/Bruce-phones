import React from "react"
import Link from "next/link"

const products = () => {
	return (
		<main className="flex flex-col items-center justify-between min-h-screen p-24">
			<div className="items-center justify-between w-full max-w-5xl font-mono text-sm  lg:flex"></div>

			<Link href="/">Home</Link>
		</main>
	)
}

export default products
