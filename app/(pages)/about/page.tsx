"use client"
import { useState } from "react"
import { Dialog } from "@headlessui/react"
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline"
import SendEmailTestForm from "@/app/components/sendEmailTestForm"

const navigation = [
	{ name: "Product", href: "#" },
	{ name: "Features", href: "#" },
	{ name: "Resources", href: "#" },
	{ name: "Company", href: "#" },
]
const stats = [
	{ label: "devices given every day", value: "Over 44" },
	{ label: "worth given per day", value: "$6,594" },
	{ label: "customers served", value: "11,000 +" },
]
const values = [
	{
		name: "Be world-class",
		description:
			"Aut illo quae. Ut et harum ea animi natus. Culpa maiores et sed sint et magnam exercitationem quia. Ullam voluptas nihil vitae dicta molestiae et. Aliquid velit porro vero.",
	},
	{
		name: "Share everything you know",
		description:
			"Mollitia delectus a omnis. Quae velit aliquid. Qui nulla maxime adipisci illo id molestiae. Cumque cum ut minus rerum architecto magnam consequatur. Quia quaerat minima.",
	},
	{
		name: "Always learning",
		description:
			"Aut repellendus et officiis dolor possimus. Deserunt velit quasi sunt fuga error labore quia ipsum. Commodi autem voluptatem nam. Quos voluptatem totam.",
	},
	{
		name: "Be supportive",
		description:
			"Magnam provident veritatis odit. Vitae eligendi repellat non. Eum fugit impedit veritatis ducimus. Non qui aspernatur laudantium modi. Praesentium rerum error deserunt harum.",
	},
	{
		name: "Take responsibility",
		description:
			"Sit minus expedita quam in ullam molestiae dignissimos in harum. Tenetur dolorem iure. Non nesciunt dolorem veniam necessitatibus laboriosam voluptas perspiciatis error.",
	},
	{
		name: "Enjoy downtime",
		description:
			"Ipsa in earum deserunt aut. Quos minus aut animi et soluta. Ipsum dicta ut quia eius. Possimus reprehenderit iste aspernatur ut est velit consequatur distinctio.",
	},
]
const team = [
	{
		name: "Michael Foster",
		role: "Co-Founder / CTO",
		imageUrl:
			"https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80",
	},
	// More people...
]
const blogPosts = [
	{
		id: 1,
		title: "Vel expedita assumenda placeat aut nisi optio voluptates quas",
		href: "#",
		description:
			"Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.",
		imageUrl:
			"https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3603&q=80",
		date: "Mar 16, 2020",
		datetime: "2020-03-16",
		author: {
			name: "Michael Foster",
			imageUrl:
				"https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
		},
	},
	// More posts...
]
const footerNavigation = {
	main: [
		{ name: "Blog", href: "#" },
		{ name: "Jobs", href: "#" },
		{ name: "Press", href: "#" },
		{ name: "Accessibility", href: "#" },
		{ name: "Partners", href: "#" },
	],
	social: [
		{
			name: "Facebook",
			href: "#",
			icon: (props) => (
				<svg fill="currentColor" viewBox="0 0 24 24" {...props}>
					<path
						fillRule="evenodd"
						d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
						clipRule="evenodd"
					/>
				</svg>
			),
		},
		{
			name: "Instagram",
			href: "#",
			icon: (props) => (
				<svg fill="currentColor" viewBox="0 0 24 24" {...props}>
					<path
						fillRule="evenodd"
						d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
						clipRule="evenodd"
					/>
				</svg>
			),
		},
		{
			name: "Twitter",
			href: "#",
			icon: (props) => (
				<svg fill="currentColor" viewBox="0 0 24 24" {...props}>
					<path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
				</svg>
			),
		},
		{
			name: "GitHub",
			href: "#",
			icon: (props) => (
				<svg fill="currentColor" viewBox="0 0 24 24" {...props}>
					<path
						fillRule="evenodd"
						d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
						clipRule="evenodd"
					/>
				</svg>
			),
		},
		{
			name: "YouTube",
			href: "#",
			icon: (props) => (
				<svg fill="currentColor" viewBox="0 0 24 24" {...props}>
					<path
						fillRule="evenodd"
						d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z"
						clipRule="evenodd"
					/>
				</svg>
			),
		},
	],
}

export default function About() {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

	return (
		<div className="bg-transparent">
			{/* Header */}

			<main className="isolate ">
				{/* Hero section */}
				<div className="relative isolate -z-10">
					<svg
						className="absolute inset-x-0 top-0 -z-10 h-[64rem] w-full stroke-gray-200 [mask-image:radial-gradient(32rem_32rem_at_center,white,transparent)]"
						aria-hidden="true">
						<defs>
							<pattern
								id="1f932ae7-37de-4c0a-a8b0-a6e3b4d44b84"
								width={200}
								height={200}
								x="50%"
								y={-1}
								patternUnits="userSpaceOnUse">
								<path d="M.5 200V.5H200" fill="none" />
							</pattern>
						</defs>
						<svg x="50%" y={-1} className="overflow-visible fill-gray-50">
							<path
								d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z"
								strokeWidth={0}
							/>
						</svg>
						<rect width="100%" height="100%" strokeWidth={0} fill="url(#1f932ae7-37de-4c0a-a8b0-a6e3b4d44b84)" />
					</svg>
					<div
						className="absolute top-0 right-0 -ml-24 overflow-hidden left-1/2 -z-10 transform-gpu blur-3xl lg:ml-24 xl:ml-48"
						aria-hidden="true">
						<div
							className="aspect-[801/1036] w-[50.0625rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
							style={{
								clipPath:
									"polygon(63.1% 29.5%, 100% 17.1%, 76.6% 3%, 48.4% 0%, 44.6% 4.7%, 54.5% 25.3%, 59.8% 49%, 55.2% 57.8%, 44.4% 57.2%, 27.8% 47.9%, 35.1% 81.5%, 0% 97.7%, 39.2% 100%, 35.2% 81.4%, 97.2% 52.8%, 63.1% 29.5%)",
							}}
						/>
					</div>
					<div className="overflow-hidden">
						<div className="px-6 pb-32 mx-auto max-w-7xl pt-36 sm:pt-60 lg:px-8 lg:pt-24">
							<div className="max-w-2xl mx-auto gap-x-14 lg:mx-0 lg:flex lg:max-w-none lg:items-center">
								<div className="w-full max-w-xl lg:shrink-0 xl:max-w-2xl">
									<h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
										We’re bringing connection to the world!
									</h1>
									<p className="relative mt-6 text-lg leading-8 text-gray-600 sm:max-w-md lg:max-w-none">
										With every device that we provide, we open a world of possibilities to those without the resources
										or circumstances to retrieve a device right now. Possibilities akin to a fresh tart, a hope, and a
										dream that we can all live in a world where every person has the ability to live according to their
										full potential.
									</p>
								</div>
								<div className="flex justify-end gap-8 mt-14 sm:-mt-44 sm:justify-start sm:pl-20 lg:mt-0 lg:pl-0">
									<div className="flex-none pt-32 ml-auto space-y-8 w-44 sm:ml-0 sm:pt-80 lg:order-last lg:pt-36 xl:order-none xl:pt-80">
										<div className="relative">
											<img
												src="https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&h=528&q=80"
												alt=""
												className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
											/>
											<div className="absolute inset-0 pointer-events-none rounded-xl ring-1 ring-inset ring-gray-900/10" />
										</div>
									</div>
									<div className="flex-none mr-auto space-y-8 w-44 sm:mr-0 sm:pt-52 lg:pt-36">
										<div className="relative">
											<img
												src="https://images.unsplash.com/photo-1485217988980-11786ced9454?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&h=528&q=80"
												alt=""
												className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
											/>
											<div className="absolute inset-0 pointer-events-none rounded-xl ring-1 ring-inset ring-gray-900/10" />
										</div>
										<div className="relative">
											<img
												src="https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&crop=focalpoint&fp-x=.4&w=396&h=528&q=80"
												alt=""
												className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
											/>
											<div className="absolute inset-0 pointer-events-none rounded-xl ring-1 ring-inset ring-gray-900/10" />
										</div>
									</div>
									<div className="flex-none pt-32 space-y-8 w-44 sm:pt-0">
										<div className="relative">
											<img
												src="https://images.unsplash.com/photo-1670272504528-790c24957dda?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&crop=left&w=400&h=528&q=80"
												alt=""
												className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
											/>
											<div className="absolute inset-0 pointer-events-none rounded-xl ring-1 ring-inset ring-gray-900/10" />
										</div>
										<div className="relative">
											<img
												src="https://images.unsplash.com/photo-1670272505284-8faba1c31f7d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&h=528&q=80"
												alt=""
												className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
											/>
											<div className="absolute inset-0 pointer-events-none rounded-xl ring-1 ring-inset ring-gray-900/10" />
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Content section */}
				<div className="px-6 mx-auto -mt-12 max-w-7xl sm:mt-0 lg:px-8 xl:-mt-16">
					<div className="max-w-2xl mx-auto lg:mx-0 lg:max-w-none">
						<SendEmailTestForm />
						<h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Our mission</h2>
						<div className="flex flex-col mt-6 gap-x-8 gap-y-20 lg:flex-row">
							<div className="lg:w-full lg:max-w-2xl lg:flex-auto">
								<p className="text-xl leading-8 text-gray-600">
									Our mission started with the belief that our short times here on earth should be to serve one another.
									Without a doubt, mobile devices are a neccessary resource for securing work, paying bills, staying
									connected to others and positive mental health.
								</p>
								<div className="max-w-xl mt-10 text-base leading-7 text-gray-700">
									<p>
										In these times our devices are not only a lifeline but renewed confidence in the world and one's own
										abilities. With the help of our allies and the programs which provide these devices, we can make the
										world a more prossitive and brighter one and bring joy to many faced with challenges and adversity.
									</p>
									<p className="mt-10">
										We live by The Golden Rule and we are passionate about what we do. We accept partnerships and are
										growing
									</p>
								</div>
							</div>
							<div className="lg:flex lg:flex-auto lg:justify-center ">
								<dl className="w-64 pb-6 space-y-8 xl:w-80">
									{stats.map((stat) => (
										<div key={stat.label} className="flex flex-col-reverse gap-y-4">
											<dt className="text-base leading-7 text-gray-600">
												{stat.label}
												{stat !== stats[2] && (
													<span className="px-1 mt-3 text-lg font-semibold text-lime-600">*</span>
												)}
											</dt>
											<dd className="text-5xl font-semibold tracking-tight text-gray-900">{stat.value}</dd>
										</div>
									))}
									<p className="pl-2 mt-3 text-lg font-semibold text-lime-600">
										*<span className="font-normal text-zinc-700">Average</span>
									</p>
								</dl>
							</div>
						</div>
					</div>
				</div>

				{/* Image section */}
				<div className="mt-32 sm:mt-40 xl:mx-auto xl:max-w-7xl xl:px-8">
					<img
						src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80"
						alt=""
						className="aspect-[5/2] w-full object-cover xl:rounded-3xl"
					/>
				</div>

				{/* Values section */}
				<div className="px-6 mx-auto mt-32 max-w-7xl sm:mt-40 lg:px-8">
					<div className="max-w-2xl mx-auto lg:mx-0">
						<h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Our values</h2>
						<p className="mt-6 text-lg leading-8 text-gray-600">
							With every dollar made through this we invest $0.10 to charity
						</p>
					</div>
					<div>
						<h3>This months charity: GivePower.org</h3>
						<h3>A non-profit who provides clean water through clean energy initiatives in Africa.</h3>
					</div>
					<dl className="grid max-w-2xl grid-cols-1 mx-auto mt-16 text-base leading-7 gap-x-8 gap-y-16 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3">
						{values.map((value) => (
							<div key={value.name}>
								<dt className="font-semibold text-gray-900">{value.name}</dt>
								<dd className="mt-1 text-gray-600">{value.description}</dd>
							</div>
						))}
					</dl>
				</div>

				{/* Logo cloud */}
				<div className="relative mt-32 isolate -z-10 sm:mt-48">
					<div className="absolute inset-x-0 top-1/2 -z-10 flex -translate-y-1/2 justify-center overflow-hidden [mask-image:radial-gradient(50%_45%_at_50%_55%,white,transparent)]">
						<svg className="h-[40rem] w-[80rem] flex-none stroke-gray-200" aria-hidden="true">
							<defs>
								<pattern
									id="e9033f3e-f665-41a6-84ef-756f6778e6fe"
									width={200}
									height={200}
									x="50%"
									y="50%"
									patternUnits="userSpaceOnUse"
									patternTransform="translate(-100 0)">
									<path d="M.5 200V.5H200" fill="none" />
								</pattern>
							</defs>
							<svg x="50%" y="50%" className="overflow-visible fill-gray-50">
								<path d="M-300 0h201v201h-201Z M300 200h201v201h-201Z" strokeWidth={0} />
							</svg>
							<rect width="100%" height="100%" strokeWidth={0} fill="url(#e9033f3e-f665-41a6-84ef-756f6778e6fe)" />
						</svg>
					</div>
					<div className="px-6 mx-auto max-w-7xl lg:px-8">
						<h2 className="text-lg font-semibold leading-8 text-center text-gray-900">
							Trusted by the world’s most innovative teams
						</h2>
						<div className="grid items-center max-w-lg grid-cols-4 mx-auto mt-10 gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5">
							<img
								className="object-contain w-full col-span-2 max-h-12 lg:col-span-1"
								src="https://tailwindui.com/img/logos/158x48/transistor-logo-gray-900.svg"
								alt="Transistor"
								width={158}
								height={48}
							/>
							<img
								className="object-contain w-full col-span-2 max-h-12 lg:col-span-1"
								src="https://tailwindui.com/img/logos/158x48/reform-logo-gray-900.svg"
								alt="Reform"
								width={158}
								height={48}
							/>
							<img
								className="object-contain w-full col-span-2 max-h-12 lg:col-span-1"
								src="https://tailwindui.com/img/logos/158x48/tuple-logo-gray-900.svg"
								alt="Tuple"
								width={158}
								height={48}
							/>
							<img
								className="object-contain w-full col-span-2 max-h-12 sm:col-start-2 lg:col-span-1"
								src="https://tailwindui.com/img/logos/158x48/savvycal-logo-gray-900.svg"
								alt="SavvyCal"
								width={158}
								height={48}
							/>
							<img
								className="object-contain w-full col-span-2 col-start-2 max-h-12 sm:col-start-auto lg:col-span-1"
								src="https://tailwindui.com/img/logos/158x48/statamic-logo-gray-900.svg"
								alt="Statamic"
								width={158}
								height={48}
							/>
						</div>
					</div>
				</div>

				{/* Team section */}
				<div className="px-6 mx-auto mt-32 max-w-7xl sm:mt-48 lg:px-8">
					<div className="max-w-2xl mx-auto lg:mx-0">
						<h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Our team</h2>
						<p className="mt-6 text-lg leading-8 text-gray-600">
							Sit facilis neque ab nulla vel. Cum eos in laudantium. Temporibus eos totam in dolorum. Nemo vel facere
							repellendus ut eos dolores similique.
						</p>
					</div>
					<ul
						role="list"
						className="grid max-w-2xl grid-cols-2 mx-auto mt-20 text-center gap-x-8 gap-y-16 sm:grid-cols-3 md:grid-cols-4 lg:mx-0 lg:max-w-none lg:grid-cols-5 xl:grid-cols-6">
						{team.map((person) => (
							<li key={person.name}>
								<img className="w-24 h-24 mx-auto rounded-full" src={person.imageUrl} alt="" />
								<h3 className="mt-6 text-base font-semibold leading-7 tracking-tight text-gray-900">{person.name}</h3>
								<p className="text-sm leading-6 text-gray-600">{person.role}</p>
							</li>
						))}
					</ul>
				</div>

				{/* Blog section */}
				{/* <div className="px-6 mx-auto mt-32 max-w-7xl sm:mt-40 lg:px-8">
					<div className="max-w-2xl mx-auto lg:mx-0 lg:max-w-none">
						<h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">From the blog</h2>
						<p className="mt-2 text-lg leading-8 text-gray-600">Vel dolorem qui facilis soluta sint aspernatur totam cumque.</p>
					</div>
					<div className="grid max-w-2xl grid-cols-1 gap-8 mx-auto mt-16 auto-rows-fr sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
						{blogPosts.map((post) => (
							<article
								key={post.id}
								className="relative flex flex-col justify-end px-8 pb-8 overflow-hidden bg-gray-900 isolate rounded-2xl pt-80 sm:pt-48 lg:pt-80">
								<img src={post.imageUrl} alt="" className="absolute inset-0 object-cover w-full h-full -z-10" />
								<div className="absolute inset-0 -z-10 bg-gradient-to-t from-gray-900 via-gray-900/40" />
								<div className="absolute inset-0 -z-10 rounded-2xl ring-1 ring-inset ring-gray-900/10" />

								<div className="flex flex-wrap items-center overflow-hidden text-sm leading-6 text-gray-300 gap-y-1">
									<time dateTime={post.datetime} className="mr-8">
										{post.date}
									</time>
									<div className="flex items-center -ml-4 gap-x-4">
										<svg viewBox="0 0 2 2" className="-ml-0.5 h-0.5 w-0.5 flex-none fill-white/50">
											<circle cx={1} cy={1} r={1} />
										</svg>
										<div className="flex gap-x-2.5">
											<img src={post.author.imageUrl} alt="" className="flex-none w-6 h-6 rounded-full bg-white/10" />
											{post.author.name}
										</div>
									</div>
								</div>
								<h3 className="mt-3 text-lg font-semibold leading-6 text-white">
									<a href={post.href}>
										<span className="absolute inset-0" />
										{post.title}
									</a>
								</h3>
							</article>
						))}
					</div>
				</div> */}
			</main>
		</div>
	)
}
