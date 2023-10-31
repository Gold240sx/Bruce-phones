import { ReactElement, useState } from "react"

export function useMultiStepForm(steps: ReactElement[]) {
	const [currentStepIndex, setCurrentStepIndex] = useState(0)

	function next() {
		// console.log(currentStepIndex)
		setCurrentStepIndex((i) => {
			if (i > steps.length - 1) return i
			return i + 1
		})
		// console.log("currentIndexafter:", currentStepIndex)
	}

	function back() {
		console.log(currentStepIndex)
		setCurrentStepIndex((i) => {
			if (i <= 0) return i
			return i - 1
		})
		console.log("currentIndexafter:", currentStepIndex)
	}

	function goTo(index: number) {
		setCurrentStepIndex(index)
	}

	return {
		currentStepIndex,
		step: steps[currentStepIndex],
		steps,
		isFirstStep: currentStepIndex === 0,
		isLastStep: currentStepIndex === steps.length - 1,
		goTo,
		next,
		back,
	}
}
