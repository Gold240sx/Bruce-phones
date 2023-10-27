import React from "react"
import FormWrapper from "./formWrapper"

type BenefitsData = {
	benefits: string
}

type BenefitsFormProps = BenefitsData & {
	// this type means we can update any or all fields that belong to the user Data.
	updateFields: (fields: Partial<BenefitsData>) => void
}

const BenefitsForm = ({ benefits, updateFields }: BenefitsFormProps) => {
	return (
		<FormWrapper className="flex flex-col gap-3" title="Benefits Details">
			<h2>What Benefits do you currently recieve?</h2>
			<label>
				<input
					className="benefits"
					autoFocus
					type="radio"
					value="SNAP"
					checked={benefits === "SNAP"}
					onChange={(e) =>
						updateFields({
							benefits: "SNAP",
						})
					}
				/>
				SNAP
			</label>
			<label>
				<input
					className="benefits"
					type="radio"
					value="WIC"
					checked={benefits === "WIC"}
					onChange={(e) =>
						updateFields({
							benefits: "WIC",
						})
					}
				/>
				WIC
			</label>
			<label>
				<input
					className="benefits"
					type="radio"
					value="WIC"
					checked={benefits === "Medicaid"}
					onChange={(e) =>
						updateFields({
							benefits: "Medicaid",
						})
					}
				/>
				Medicaid
			</label>
		</FormWrapper>
	)
}

export default BenefitsForm
