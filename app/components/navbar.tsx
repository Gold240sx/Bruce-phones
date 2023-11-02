"use client"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../components/ui/tooltip"
import { Fragment } from "react"
import { Popover, Transition } from "@headlessui/react"
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline"
import React from "react"
import SiteIcon from "./siteIcon"
import Link from "next/link"

const navigation = [
	{ name: "About", href: "/about" },
	// { name: "Products", href: "/products" },
	// { name: "Reviews", href: "/reviews" },
	{ name: "Careers", href: "/careers" },
]

const Navbar = () => {
	return (
		<div className="relative w-full px-6 pt-12 pb-16 ">
			<Popover>
				<div className="px-4 mx-auto max-w-7xl sm:px-6">
					<nav className="relative flex items-center justify-between sm:h-10 md:justify-center" aria-label="Global">
						<div className="flex items-center flex-1 md:absolute md:inset-y-0 md:left-0">
							<div className="flex items-center justify-between w-full md:w-auto">
								<Link href="/">
									<span className="sr-only">Free Phones Today</span>
									{/*  */}
									<TooltipProvider>
										<Tooltip>
											<TooltipTrigger>
												<SiteIcon className="w-16 h-16 text-5xl" textClassName="font-outline-2 mt-[11px]" />
											</TooltipTrigger>
											<TooltipContent className="text-white rounded-lg bg-zinc-700">
												<p>Home</p>
											</TooltipContent>
										</Tooltip>
									</TooltipProvider>
								</Link>
								<div className="flex items-center -mr-2 md:hidden">
									<Popover.Button className="relative inline-flex items-center justify-center p-2 text-gray-400 rounded-md bg-gray-50 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
										<span className="absolute -inset-0.5" />
										<span className="sr-only">Open main menu</span>
										<Bars3Icon className="w-6 h-6" aria-hidden="true" />
									</Popover.Button>
								</div>
							</div>
						</div>
						<div className="hidden md:flex md:space-x-10">
							{navigation.map((item) => (
								<a key={item.name} href={item.href} className="font-medium text-gray-500 hover:text-gray-900">
									{item.name}
								</a>
							))}
						</div>
						<div className="hidden md:absolute md:inset-y-0 md:right-0 md:flex md:items-center md:justify-end">
							<span className="inline-flex rounded-md shadow">
								<Link
									href="/signIn"
									className="inline-flex items-center px-4 py-2 text-base font-medium text-indigo-600 bg-white border border-transparent rounded-md hover:bg-gray-50">
									Log in
								</Link>
							</span>
						</div>
					</nav>
				</div>

				<Transition
					as={Fragment}
					enter="duration-150 ease-out"
					enterFrom="opacity-0 scale-95"
					enterTo="opacity-100 scale-100"
					leave="duration-100 ease-in"
					leaveFrom="opacity-100 scale-100"
					leaveTo="opacity-0 scale-95">
					<Popover.Panel focus className="absolute inset-x-0 top-0 z-40 p-2 transition origin-top-right transform md:hidden">
						<div className="overflow-hidden bg-white rounded-lg shadow-md ring-1 ring-black ring-opacity-5">
							<div className="flex items-center justify-between px-5 pt-4">
								<div className="h-fit">
									<SiteIcon className="w-10 h-10 mb-6 text-3xl" textClassName="font-outline mt-[5px] hover:ml-1" />
								</div>
								<div className="-mr-2">
									<Popover.Button className="relative inline-flex items-center justify-center p-2 text-gray-400 bg-white rounded-md hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
										<span className="absolute -inset-0.5" />
										<span className="sr-only">Close menu</span>
										<XMarkIcon className="w-6 h-6" aria-hidden="true" />
									</Popover.Button>
								</div>
							</div>
							<div className="px-2 pt-2 pb-3 text-3xl">
								{navigation.map((item) => (
									<a
										key={item.name}
										href={item.href}
										className="block px-3 py-2 text-xl font-medium text-gray-700 rounded-md hover:bg-gray-50 hover:text-gray-900">
										{item.name}
									</a>
								))}
							</div>
							<Link
								href="/signIn"
								className="block w-full px-5 py-3 font-medium text-center text-indigo-600 bg-gray-50 hover:bg-gray-100">
								Log in
							</Link>
						</div>
					</Popover.Panel>
				</Transition>
			</Popover>
		</div>
	)
}

export default Navbar
