import React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "../components/ui/card"
import MultiStepForm from "./forms/multistep-form"
const SignupForm = () => {
	return (
		<Card className="w-full h-full">
			<CardHeader className="relative w-full py-12">
				<CardTitle className="text-5xl max-w-4/5 font-semibold text-center bg-gradient-to-r from-[#ff4694] to-[#776fff] inline-block text-wrap mx-auto text-transparent pt-10 bg-clip-text">
					Phone / Tablet Qualification Form
				</CardTitle>
				<CardDescription className="text-lg text-center max-w-4/5 max-w-2/3">
					Complete this form to apply for one of our government-sponsored phone + tablet discounts to get your phone or tablet for
					as little as $20.{" "}
				</CardDescription>
			</CardHeader>

			<CardContent className="">
				<div className="relative isolate sm:pb-32">
					<div className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu blur-3xl sm:top-[-20rem]" aria-hidden="true">
						<div
							className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
							style={{
								clipPath:
									"polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
							}}
						/>
					</div>
					<MultiStepForm />
				</div>
			</CardContent>

			<CardFooter className="items-center w-full px-12 pt-6 pb-8 -mb-10 text-lg text-center min-h-24 text-zinc-600 bg-zinc-200">
				<p className="max-w-3/5">
					Offer subject to availability. By submitting this form you hereby aknowledge that the information that you submit is
					your own, current and valid. Address must be located within the greater US and applicants must be of age 18yo or older.
					Eligibility is determined by the government program and is not controlled by us in any way. We do not gurantee
					eligibility or product availibility. We will not be held liable in any way for the misuse of any products aquired via
					this program.
				</p>
			</CardFooter>
		</Card>
	)
}

export default SignupForm
