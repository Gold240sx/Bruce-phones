import React, { ReactEventHandler } from "react"

type Step = {
	id: number
	name: string
	status: string
}

type StepperFormProps = [{ Steps: Step[]; goTo: ReactEventHandler }]

const StepperGraphic = ({ Steps, goTo }: StepperFormProps) => {
    
    const handleStepper = (Step: Step, page: number) => {
		Steps.map((Step) => {
			if (page + 1 === Step.id) {
				Step.status = "current"
			}
			if (page + 1 >= Step.id) {
				Step.status = "complete"
			}
			if (page < Step.id) {
				Step.status = "upcoming"
			}
		})
		goTo(Step.id - 1)
		return
	}

	return (
		<nav aria-label="Progress" className="items-center hidden pb-12 mx-auto align-middle sm:flex justify-evenly">
			<ol role="list" className="flex w-full space-x-8 space-y-0">
				{Steps.map((Step: Step) => (
					<li key={Step.name} className="md:flex-1">
						{Step.status === "complete" ? (
							<button
								type="button"
								onClick={(e) => {
									handleStepper(Step, e.target.firstElementChild.textContent)
								}}
								className="flex flex-col py-2 pt-4 pb-0 mx-auto border-t-4 border-indigo-600 group hover:border-indigo-800">
								<span className="text-sm font-medium text-indigo-600 group-hover:text-indigo-800">{Step.id}</span>
								<span className="text-sm font-medium pointer-events-none whitespace-nowrap text-zinc-700">{Step.name}</span>
							</button>
						) : Step.status === "current" ? (
							<button
								type="button"
								onClick={(e) => {
									handleStepper(Step, e.target.firstElementChild.textContent)
								}}
								className="flex flex-col py-2 pt-4 pb-0 mx-auto border-t-4 border-indigo-600"
								aria-current="step">
								<span className="text-sm font-medium text-indigo-600">{Step.id}</span>
								<span className="text-sm font-medium pointer-events-none whitespace-nowrap text-zinc-700">{Step.name}</span>
							</button>
						) : (
							<button
								type="button"
								onClick={(e) => {
									handleStepper(Step, e.target.firstElementChild.textContent)
								}}
								className="flex flex-col py-2 pt-4 pb-0 mx-auto border-t-4 border-gray-200 group hover:border-gray-300">
								<span className="text-sm font-medium text-gray-400 group-hover:text-gray-500">{Step.id}</span>
								<span className="text-sm font-medium pointer-events-none whitespace-nowrap cursor:cursor-not-allowed text-zinc-400">
									{Step.name}
								</span>
							</button>
						)}
					</li>
				))}
			</ol>
		</nav>
	)
}

export default StepperGraphic
