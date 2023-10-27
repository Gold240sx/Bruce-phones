import React from "react"

type Step = {
	id: string
	name: string
	status: string
}

type StepperFormProps = [{ id: string; name: string; status: string }]

const StepperGraphic = ({ Steps }: StepperFormProps) => {
	return (
		<nav aria-label="Progress" className="flex items-center w-full pb-12 mx-auto align-middle justify-evenly">
			<ol role="list" className="w-full space-y-4 md:flex md:space-x-8 md:space-y-0">
				{Steps.map((Step) => (
					<li key={Step.name} className="md:flex-1">
						{Step.status === "complete" ? (
							<button
								type="button"
								// onClick={}
								className="flex flex-col py-2 pl-4 border-l-4 border-indigo-600 group hover:border-indigo-800 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4">
								<span className="text-sm font-medium text-indigo-600 group-hover:text-indigo-800">{step.id}</span>
								<span className="text-sm font-medium whitespace-nowrap">{Step.name}</span>
							</button>
						) : Step.status === "current" ? (
							<button
								type="button"
								// onClick={}
								className="flex flex-col py-2 pl-4 border-l-4 border-indigo-600 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4"
								aria-current="step">
								<span className="text-sm font-medium text-indigo-600">{Step.id}</span>
								<span className="text-sm font-medium whitespace-nowrap">{Step.name}</span>
							</button>
						) : (
							<button
								type="button"
								// onClick={}
								className="flex flex-col py-2 pl-4 border-l-4 border-gray-200 group hover:border-gray-300 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4">
								<span className="text-sm font-medium text-gray-500 group-hover:text-gray-700">{Step.id}</span>
								<span className="text-sm font-medium whitespace-nowrap">{Step.name}</span>
							</button>
						)}
					</li>
				))}
			</ol>
		</nav>
	)
}

export default StepperGraphic
