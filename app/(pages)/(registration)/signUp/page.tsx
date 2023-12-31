"use client"
import { useEffect, useState } from "react"
import Link from "next/link"
import { auth } from "@firebase/firebaseInit"
import { createUserWithEmailAndPassword } from "@firebase/firebaseInit"
import { SignIn, SignUp } from "@/app/firebase/authFunctions"

export default function SignUpPage() {
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [remember, setRemember] = useState(false)

	useEffect(() => {
		const localLoginDetails = localStorage.getItem("loginDetails")
		if (localLoginDetails) {
			const { email: localEmail, remember: localRemember } = JSON.parse(localLoginDetails)

			if (localEmail) {
				setEmail(localEmail)
			}

			if (localRemember !== undefined) {
				setRemember(localRemember)
			}
		}
	}, [])

	const rememberMe = (value: boolean) => {
		setRemember(value)
		if (value) {
			const loginDetails = {
				email,
				remember,
			}
			localStorage.setItem("loginDetails", JSON.stringify(loginDetails)) // Stringify the object
		} else if (!value) {
			localStorage.removeItem("loginDetails")
		}
	}

	return (
		<>
			<div className="flex flex-1 min-h-full py-24">
				<div className="flex flex-col justify-center flex-1 px-4 py-12 sm:px-6 lg:flex-none lg:pl-32 lg:pr-16 xl:pl-52 xl:pr-24">
					<div className="w-full max-w-sm mx-auto lg:w-96">
						<div>
							<h2 className="mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900">Create a new account</h2>
						</div>

						<div className="mt-10">
							<div>
								<form action="#" method="POST" className="space-y-6">
									<div>
										<label htmlFor="email" className="block text-sm font-semibold leading-6 text-gray-900">
											Email address
										</label>
										<div className="mt-2">
											<input
												id="email"
												name="email"
												type="email"
												onChange={(e) => setEmail(e.target.value)}
												value={email}
												autoComplete="email"
												required
												className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
											/>
										</div>
									</div>

									<div>
										<label htmlFor="password" className="block text-sm font-semibold leading-6 text-gray-900">
											Password
										</label>
										<div className="mt-2">
											<input
												id="password"
												name="password"
												type="password"
												onChange={(e) => setPassword(e.target.value)}
												autoComplete="current-password"
												value={password}
												required
												className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
											/>
										</div>
									</div>

									<div className="flex items-center justify-between">
										<div className="flex items-center">
											<input
												id="remember-me"
												name="remember-me"
												type="checkbox"
												onChange={() => rememberMe(!remember)}
												checked={remember}
												className="w-4 h-4 text-indigo-600 border-gray-300 rounded cursor-pointer focus:ring-indigo-600"
											/>
											<label
												htmlFor="remember-me"
												className="block ml-3 text-sm leading-6 text-gray-700 cursor-pointer">
												Remember me
											</label>
										</div>

										<div className="text-sm leading-6">
											<a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
												Forgot password?
											</a>
										</div>
									</div>

									<div>
										<button
											type="button"
											onClick={() => SignUp({ email, password })}
											className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
											Create account
										</button>
									</div>
								</form>
							</div>

							{/* <div className="mt-10">
								<div className="relative">
									<div className="absolute inset-0 flex items-center" aria-hidden="true">
										<div className="w-full border-t border-gray-200" />
									</div>
									<div className="relative flex justify-center text-sm font-medium leading-6">
										<span className="px-6 text-gray-900 bg-white">Or continue with</span>
									</div>
								</div>

								<div className="grid grid-cols-2 gap-4 mt-6">
									<a
										href="#"
										className="flex w-full items-center justify-center gap-3 rounded-md bg-[#1D9BF0] px-3 py-1.5 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D9BF0]">
										<svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
											<path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
										</svg>
										<span className="text-sm font-semibold leading-6">Twitter</span>
									</a>

									<a
										href="#"
										className="flex w-full items-center justify-center gap-3 rounded-md bg-[#24292F] px-3 py-1.5 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#24292F]">
										<svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
											<path
												fillRule="evenodd"
												d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
												clipRule="evenodd"
											/>
										</svg>
										<span className="text-sm font-semibold leading-6">GitHub</span>
									</a>
								</div>
							</div> */}
						</div>
					</div>
				</div>
				<div className="relative flex-1 hidden w-0 mr-32 lg:block">
					<img
						className="absolute inset-0 object-cover w-full h-full"
						src="https://images.unsplash.com/photo-1496917756835-20cb06e75b4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
						alt=""
					/>
				</div>
			</div>
		</>
	)
}
