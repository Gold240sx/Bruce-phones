import React from "react"
import FormWrapper from "./formWrapper"

type BenefitsData = {
	benefits: string
	lastFour: string
	DOB: string
}

type BenefitsFormProps = BenefitsData & {
	// this type means we can update any or all fields that belong to the user Data.
	updateFields: (fields: Partial<BenefitsData>) => void
}

const BenefitsForm = ({ benefits, lastFour, DOB, updateFields }: BenefitsFormProps) => {
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
			<label>Last 4 of Social</label>
			<input
				required
				min={1}
				type="number"
				value={lastFour}
				onChange={(e) =>
					updateFields({
						lastFour: e.target.value,
					})
				}
			/>
			<label>Date of Birth</label>
			<input
				required
				min={1}
				type="number"
				value={DOB}
				onChange={(e) =>
					updateFields({
						DOB: e.target.value,
					})
				}
			/>
			<input required type="checkbox" />
			<p>
				I agknowledge and confirm that the answers submitted in this form are valid, up to date and is mine, my spouses or my
				children's information.
			</p>
		</FormWrapper>
	)
}

export default BenefitsForm
