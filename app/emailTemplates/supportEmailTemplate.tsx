import * as React from "react"
import { type SupportFormDataProps } from "../components/FormSupport"
import { Body, Button, Column, Container, Head, Hr, Html, Img, Link, Preview, Section, Text } from "@react-email/components"
import { Tailwind } from "@react-email/tailwind"
import { format } from "date-fns"

function getCurrentTimeAndDate() {
	const currentDate = new Date()
	// Format the current date as "MM/dd/yyyy" (10/12/2003)
	const formattedDate = format(currentDate, "MM/dd/yyyy")
	// Format the current time as "hh:mm a" (10:15 PM)
	const formattedTime = format(currentDate, "hh:mm a")
	return { time: formattedTime, date: formattedDate }
}
const tr = {
	borderTopStyle: "solid",
	borderTopWidth: "1px",
	borderColor: "#e6ebf1",
}
const main = {
	fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
}
const hr = {
	borderColor: "#e6ebf1",
	margin: "20px 0",
}
const table = {
	display: "table",
	borderStyle: "solid",
	borderWidth: "1px",
	borderColor: "#000000",
}
const paragraph = {
	fontSize: "16px",
	lineHeight: "24px",
	textAlign: "left" as const,
}
const anchor = {
	color: "#0FB4CC",
}
const backgroundStyle = {
	background:
		'url("https://media3.giphy.com/media/rTIXh5JftLoic/giphy_s.gif?cid=ecf05e47ns87kpg6322l90pgf11et0q0hdaghciynma0fgqj&ep=v1_gifs_search&rid=giphy_s.gif&ct=g")',
	backgroundSize: "cover",
	backgroundRepeat: "no-repeat",
	paddingRight: "0",
	paddingLeft: "0",
	backgroundColor: "white",
	imageRendering: "crisp-edges",
}
const borderLeft = (depth: number, position: string) => {
	// Define shadow properties based on the position
	let shadowX = "0"
	let shadowY = "0"
	if (position === "left") {
		shadowX = `-${depth * 2}px`
	} else if (position === "right") {
		shadowX = `${depth * 2}px`
	} else if (position === "top") {
		shadowY = `-${depth * 2}px`
	} else if (position === "bottom") {
		shadowY = `${depth * 2}px`
	}

	return {
		boxShadow: `${shadowX} ${shadowY} 0 rgba(0, 0, 0, 0.4)`,
	}
}
const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : ""
type emailProps = {
	firstName: string
	lastName: string
	email: string
	phone: string
	phoneCountryCode: string
	message: string
}

export const SupportEmailTemplate: any = ({ firstName, lastName, email, phone, phoneCountryCode, message }: emailProps) => {
	const data = { firstName, lastName, email, phone, phoneCountryCode, message }
	const { time, date } = getCurrentTimeAndDate()
	const renderData = (data: Record<string, any>, depth: number = 0): JSX.Element[] => {
		const rows: JSX.Element[] = []
		for (const key in data) {
			const isObject = typeof data[key] === "object"
			const bgColorClass = `${depth === 0 && isObject ? "bg-white" : `bg-zinc-${100 + depth * 100} text-zinc-${400 + depth * 100}`}`

			if (isObject) {
				rows.push(
					<tr key={key}>
						<td
							style={borderLeft(depth + 1)}
							colSpan={2}
							className={`px-4 py-2 shadow text-left uppercase text-lg font-semibold border text-black ${bgColorClass}`}>
							{key}
						</td>
					</tr>
				)
				rows.push(...renderData(data[key], depth + 1)) // Increment the depth
			} else {
				rows.push(
					<tr key={key} className={`border-1 border-zinc-400`}>
						<td style={borderLeft(depth)} className={`px-4 py-2 font-semibold text-zinc-500 ${bgColorClass}`}>
							{key}
						</td>
						<td style={tr} className={`px-4 py-2 ${bgColorClass}`}>
							{data[key] === true ? "TRUE" : data[key] === false ? "FALSE" : data[key]}
						</td>
					</tr>
				)
			}
		}
		return rows
	}
	const renderedData = renderData(data)

	return (
		<Tailwind
			config={{
				theme: {
					extend: {
						colors: {
							brand: "#007291",
						},
					},
				},
			}}>
			<Html>
				<Head />
				<Preview>ATW: - New Support Request</Preview>
				<Body style={main} className="bg-[#f6f9fc] ">
					<Container className="pt-5 pb-12 mx-auto my-0 mb-16 bg-white">
						<Section className="px-12 py-0">
							<div className="flex flex-row justify-center align-middle">
								<div className="w-fit max-w-[55px]">
									<Img src={`https://i.ibb.co/B3HFVf0/FPTlogo.png`} width="55" height="55" alt="icon" />
								</div>
								<div className="flex justify-center w-4/5 align-middle">
									<Text className="text-2xl tracking-wide text-gray-400">AlwaysThereWireless.com</Text>
								</div>
							</div>
							<Text className="flex ml-auto text-base text-amber-600 align-right ">
								{time} - {date}
							</Text>
							<Text style={paragraph} className="text-2xl text-gray-600">
								New Support Request
							</Text>
							<Hr style={hr} />
							<Text className="text-xl font-semibold text-[#8898aa]">Data:</Text>
							<div className="flex flex-col w-auto px-3 border-2 border-zinc-400 h-fit">
								<table className="border-gray-200 table-auto border-1 rounded-xl bg-[#fbfbfc]" style={table}>
									<thead className="bg-gray-200 rounded-t-lg">
										<tr className="text-xl bg-gray-200 text-zinc-600 py-2.5" style={{ borderRadius: "10px" }}>
											<th className="px-4 py-2 rounded-tl-lg ">Question</th>
											<th className="px-4 py-2 rounded-tr-lg">Response</th>
										</tr>
									</thead>
									<tbody className="text-center text-zinc-400">{renderedData}</tbody>
								</table>
							</div>
							<Hr style={hr} />
							<Link href="http://alwaystherewireless.com">
								<Text style={anchor} className="text-xs ">
									AlwaysThereWireless.com
								</Text>
							</Link>
						</Section>
					</Container>
				</Body>
			</Html>
		</Tailwind>
	)
}
