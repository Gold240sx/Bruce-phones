import React from "react"
import FormWrapper from "./formWrapper"

type DeviceData = {
	device: string
	subscribed: boolean
}

type DeviceFormProps = DeviceData & {
	// this type means we can update any or all fields that belong to the user Data.
	updateFields: (fields: Partial<DeviceData>) => void
}

const DeviceForm = ({ device, subscribed, updateFields }: DeviceFormProps) => {
	return (
		<FormWrapper className="flex flex-col gap-3" title="Account Details">
			<label screen-reader-only className="hidden">
				Device
			</label>
			<input
				className="hidden"
				autoFocus
				type="email"
				value={device}
				onChange={(e) =>
					updateFields({
						device: e.target.value,
					})
				}
			/>
			<h2>Subscribe for future giveaways, product launches and programs alerts.</h2>
			<label>
				<input
					className="subscribed"
					autoFocus
					type="radio"
					value="no"
					checked={!subscribed}
					onChange={(e) =>
						updateFields({
							subscribed: false,
						})
					}
				/>
				No.
			</label>
			<label>
				<input
					className="subscribed"
					autoFocus
					type="radio"
					value="yes"
					checked={subscribed}
					onChange={(e) =>
						updateFields({
							subscribed: true,
						})
					}
				/>
				Yes. I like free stuff!
			</label>
		</FormWrapper>
	)
}

export default DeviceForm
