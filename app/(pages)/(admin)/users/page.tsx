"use client"
import { useEffect, useState } from "react"
import { getCollectionDocs } from "@firebase/storeFunctions"
import { collection, getDocs } from "firebase/firestore"
import { db } from "@/app/firebase/firebaseInit"
import Link from "next/link"

type User = {
	name: string
	title?: string
	avatarUrl: string
	email: string
	role: "user" | "admin"
}

// const people = [{ name: "Lindsay Walton", title: "Front-end Developer", email: "lindsay.walton@example.com", role: "Member" }]

export default function AllUsers() {
	const [pageData, setPageData] = useState<any>()

	useEffect(() => {
		// const fetchData = async () => {
		// 	const userDocs = await getCollectionDocs({ collectionName: "users" })
		// 	setPageData(userDocs)
		// 	console.log("set page data", userDocs)
		// }
		const fetchData = async () => {
			const collectionRef = collection(db, "users")

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
		// const userDocs = await getCollectionDocs({ collectionName: "users" })
		// setPageData(userDocs)
		// console.log("set page data", userDocs)

		fetchData()
	}, [])

	return (
		<div className="px-4 py-10 bg-white sm:px-6 lg:px-8">
			<div className="sm:flex sm:items-center">
				<div className="sm:flex-auto">
					<h1 className="text-base font-semibold leading-6 text-gray-900">Users</h1>
					<p className="mt-2 text-sm text-gray-700">
						A list of all the users in your account including their name, title, email and role.
					</p>
				</div>
				<div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
					<button
						type="button"
						className="block px-3 py-2 text-sm font-semibold text-center text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
						Add user
					</button>
				</div>
			</div>
			<div className="mt-8 -mx-4 sm:-mx-0">
				{/* {pageData && <pre>{JSON.stringify(pageData, null, 2)}</pre>} */}
				{!pageData && "no pageData"}
				<table className="min-w-full divide-y divide-gray-300">
					<thead>
						<tr>
							<th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
								Name
							</th>
							<th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell">
								Avatar
							</th>
							<th scope="col" className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell">
								Email
							</th>
							<th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
								Role
							</th>
							<th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
								<span className="sr-only">Edit</span>
							</th>
						</tr>
					</thead>
					<tbody className="bg-white divide-y divide-gray-200">
						{/* insert map of data here */}
						{pageData &&
							pageData.map((user: User) => (
								<tr key={user.email}>
									<td className="w-full py-4 pl-4 pr-3 text-sm font-medium text-gray-900 max-w-0 sm:w-auto sm:max-w-none sm:pl-0">
										{user.name}
										<dl className="font-normal lg:hidden">
											{/* <dt className="sr-only">Title</dt> */}
											<dd className="mt-1 text-gray-700 truncate">{user.title}</dd>
											<dt className="sr-only sm:hidden">Email</dt>
											<dd className="mt-1 text-gray-500 truncate sm:hidden">{user.email}</dd>
										</dl>
									</td>
									<td className="flex items-start text-sm text-gray-500 sm:table-cell">
										<img src={user.avatarUrl} className="flex w-8 h-8 ml-4 mr-auto rounded-full" />
									</td>
									<td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">{user.email}</td>
									<td className="px-3 py-4 text-sm text-gray-500">{user.role}</td>
									<td className="py-4 pl-3 pr-4 text-sm font-medium text-right sm:pr-0">
										<Link href="#" className="text-indigo-600 hover:text-indigo-900">
											Edit<span className="sr-only">, {user.name}</span>
										</Link>
									</td>
								</tr>
							))}
					</tbody>
				</table>
			</div>
		</div>
	)
}
