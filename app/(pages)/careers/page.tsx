"use client"
import React, { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import Banner from "@/app/components/banner/banner"
import { getCollectionDocs, collection, db, getDoc, getDocs } from "@firebase/storeFunctions"
import CareerHeaderImage from "@/app/assets/images/careerHeaderImage.jpg"
import PopupModal from "@/app/components/popupModal"
import BgBlur from "@/app/components/bgBlur"

const Careers = () => {
	const [formOpen, setFormOpen] = useState(false)
	const [form, setForm] = useState("")
	const [pageData, setPageData] = useState<any>()
	const [position, setPosition] = useState<string>("")
	const jobCount = pageData?.length
	const toggleMainForm = () => {
		setFormOpen(!formOpen)
	}
	// get the popup to show up

	useEffect(() => {
		const fetchData = async () => {
			const collectionRef = collection(db, "jobs")

			try {
				const data = await getDocs(collectionRef)
				const filteredData = data.docs.map((doc) => ({
					...doc.data(),
					id: doc.id,
				}))
				setPageData(filteredData)
			} catch (err) {
				console.log(err)
			}
		}

		fetchData()
	}, [])

	return (
		<main className="flex flex-col items-center justify-between p-24">
			{/* <PopupModal toggleMainForm={toggleMainForm} formOpen={formOpen} form={form} /> */}
			{formOpen && form === "JobApplication" && (
				<>
					<BgBlur toggleMainForm={toggleMainForm} />
					<PopupModal toggleMainForm={toggleMainForm} formOpen={formOpen} form={form} subCategory={position} />
				</>
			)}
			<div className="flex flex-col items-center justify-between w-full max-w-5xl font-mono text-sm">
				<div className="object-fill " style={{ maxHeight: Math.max(window.innerHeight * 0.5, 800) + "px" }}>
					<Image
						src={CareerHeaderImage}
						alt="header image: passion led us here"
						style={{ width: "100%", height: "100%" }}
						height={300}
						width={700}
						className="rounded-3xl"
					/>
				</div>
				<p className="flex pt-5 pr-10 ml-auto text-right">
					Photo by
					<a
						className="pl-1"
						href="https://unsplash.com/@goian?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">
						Ian Schneider
					</a>{" "}
					on{" "}
					<a
						className="pl-1"
						href="https://unsplash.com/photos/two-person-standing-on-gray-tile-paving-TamMbr4okv4?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">
						Unsplash
					</a>
				</p>
				{jobCount && <h1 className="pt-32 pb-8 text-4xl">{jobCount} Jobs available</h1>}
				{/* map section */}
				{pageData &&
					pageData.map((job: any, index: number) => (
						<div
							key={index}
							className="grid w-full grid-cols-6 p-6 m-6 text-lg bg-white border rounded-xl border-zinc-200 hover:shadow-lg">
							<div className="col-span-full md:col-span-3">
								<h2 className="text-4xl">{job.title}</h2>
								<div className="flex gap-2">
									{job.specializations.map((specialty: string, index: number) => (
										<p key={index} className="text-white capitalize my-3 bg-zinc-300 rounded-full py-0.5 px-3">{specialty}</p>
									))}
								</div>
								<p
									className={` ${
										job.status === "ongoing"
											? "text-lime-600"
											: job.status === "filled"
											? "text-zinc-300"
											: job.status === "opening soon"
											? "text-amber-400"
											: "text-zinc-500"
									} mx-1 my-2 uppercase text-lime-600`}>
									{job.status}
								</p>
							</div>
							<div className="col-span-full md:col-span-3 md:pt-10 ">
								<h2 className="text-3xl text-bold">
									Rough Income: ${job.income.amount} {job.income.occurance}
								</h2>
								<p className="flex gap-2 py-3 pl-1 text-zinc-500">{job.description}</p>
								<button
									onClick={() => {
										setPosition(job.title)
										setForm("JobApplication")
										toggleMainForm()
									}}
									className={` bg-lime-500 mt-4 text-black py-4 px-16 rounded-md hover:bg-lime-400 cursor-pointer text-semi-bold`}>
									Apply
								</button>
							</div>
							{/* contractType, description, income { amount, occurance}, payFrequency, seniority, specializations [],  status, title*/}
						</div>
					))}
				{/* no jobs fallback... */}
				{!pageData && <pre>Job data not retrieved</pre>}
				{/* {pageData && pageData && <pre>Jobs: {JSON.stringify(pageData, null, 2)}</pre>} */}
			</div>
		</main>
	)
}

export default Careers
