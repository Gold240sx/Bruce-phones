import { ReactElement, useState } from "react"

type Step = {
  id: number;
  label: string;
  name: string;
  status: string;
  fields: string[];
};

export function useMultiStepForm(steps: Step[], trigger:any) {
	const [currentStepIndex, setCurrentStepIndex] = useState(0)

    // type FieldName = keyof Inputs

	async function next() {
          const currentStep = steps[currentStepIndex];
  const fields = currentStep.fields; // make sure to adjust the prop name accordingly

  // Trigger validation for the specified fields
  const isValid = await trigger(fields);

  if (isValid) {
    setCurrentStepIndex((i) => (i < steps.length - 1 ? i + 1 : i));
  }
        // const fields = steps[currentStepIndex].fields
        // // const output = await trigger(fields as FieldName[], { shouldFocus: true })
        // const output = await trigger(fields, { shouldFocus: true })


        // if (!output) return

        // if (currentStepIndex < steps.length ) {
        //     if (currentStepIndex === steps.length-1){
        //         // submit the form
        //         // await handleSubmit(processForm)()
        //     }
        //     		setCurrentStepIndex((i) => {
		// 	if (i > steps.length - 1) return i
		// 	return i + 1
		// })
        
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
