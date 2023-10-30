"use client"
import Link from "next/link"
import React, { useState } from "react"

type Message = {
	message: string
	link: string
	href: string
}

const Banner = ({ messages }: { messages: Message[] }) => {
	const [showBanner, setShowBanner] = useState(true)

	const toggleBanner = () => {
		setShowBanner(!showBanner)
		return
	}
	return (
		<>
			{showBanner &&
				messages.map((message: Message, key) => (
					<div
						key={message.message}
						className="sticky top-0 left-0 z-50 flex justify-center w-full pt-4 pb-3 text-lg border-b border-gray-300 shadow-xl from-zinc-50 to-zinc-200 bg-gradient-to-br backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto lg:border lg:bg-gray-200 lg:dark:bg-zinc-800/30">
						{message.message}
						<button
							onClick={toggleBanner}
							className="absolute w-10 h-10 border rounded-md bg-zinc-50 hover:text-bold hover:border-black hover:border-2 right-2 top-2">
							X
						</button>
						<Link href={message.href}>
							<code className="font-mono  ml-4 capitalize bg-black rounded active:bg-zinc-700 hover:bg-zinc-800 text-white px-3 py-1.5 cursor-pointer">
								{message.link}
							</code>
						</Link>
					</div>
				))}
		</>
	)
}

export default Banner
