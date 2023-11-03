"use client"
import { useAuth } from "@/app/firebase/authFunctions"
import { db } from "@/app/firebase/firebaseInit"
import { getCollectionDocs, getCollectionDoc } from "@firebase/storeFunctions"
import { collection, getDocs } from "firebase/firestore"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

const User = ({ params }: any) => {
	const [pageData, setPageData] = useState<any>({ name: undefined, email: undefined, role: undefined })
	// const { userId, name, role } = useAuth(true)
	/**
     params provides all the params of the file path...ie: the id.
     */
	// const { user, userData } = useAuth(true)
	const { user, isAdmin, userData } = useAuth(true)
	const router = useRouter()
	if (userData && userData.role !== "admin" && userData.userId !== params.id) {
		// prevent anyone but the admints to view content other than their own and reroute on when there is no user.
		// alert("users may only view their own content.") // replace with a toast later
		return router.push("/users")
	}
	// if (userData.role !== "admin") {
	// 	// prevent anyone but the admints to view content other than their own and reroute on when there is no user.
	// 	alert("no user was signed in, rerouting to users.") // replace with a toast later
	// 	return router.push("/users")
	// }

	useEffect(() => {
		const fetchData = async () => {
			try {
				const userDocs = await getCollectionDoc({ collectionName: "users", docId: params.id })
				setPageData(userDocs)
			} catch (err) {
				console.log(err)
			}
		}
		fetchData()
	}, [])

	// if (pageData && pageData.role !== undefined && !pageData.userIdl) {
	// 	router.push("/users")
	// }

	return (
		<div className="flex flex-col justify-center h-full p-10 mx-auto my-auto align-middle bg-white w-fit">
			<h1 className="text-3xl text-bold">Currently signed in user info</h1>
			<h2 className="text-xl text-bold">
				email: <span className="pl-3 text-zinc-500">{userData && userData.email}</span>
			</h2>
			<p className="text-xl text-bold">
				userId: <span className="pl-3 text-zinc-500">{userData && userData.userId}</span>
			</p>
			<p className="text-xl text-bold">
				Role: <span className="pl-3 text-zinc-500">{userData && userData.role}</span>
			</p>

			{/* <h1>Page all users details</h1>
			<pre>{JSON.stringify(pageData, null, 2)}</pre>
			{pageData && (
				<>
					<h2 className="text-xl text-bold">
						email: <span className="pl-3 text-zinc-500">{pageData.email}</span>
					</h2>
					<p className="text-xl text-bold">
						userId: <span className="pl-3 text-zinc-500">{pageData.userId}</span>
					</p>
					<p className="text-xl text-bold">
						Param ID: <span className="pl-3 text-zinc-500">{params.id}</span>
					</p>
					<p className="text-xl text-bold">
						Role: <span className="pl-3 text-zinc-500">{pageData.role}</span>
					</p>
				</>
			)} */}
			{/* {isAdmin && { */}
			<button
				type="button"
				onClick={() => router.push("/users")}
				className="py-3 my-6 text-white bg-red-600 rounded-lg cursor-pointer">
				See all users
			</button>
			{/* }} */}

			<h1 className="text-3xl text-bold">Page user info</h1>
			<h2 className="text-xl text-bold">
				email: <span className="pl-3 text-zinc-500">{pageData && pageData.email}</span>
			</h2>
			<p className="text-xl text-bold">
				userId: <span className="pl-3 text-zinc-500">{pageData && pageData.userId}</span>
			</p>
			<p className="text-xl text-bold">
				Param ID: <span className="pl-3 text-zinc-500">{pageData && params.id}</span>
			</p>
			<p className="text-xl text-bold">
				Role: <span className="pl-3 text-zinc-500">{pageData && pageData.role}</span>
			</p>
		</div>
	)
}

export default User
