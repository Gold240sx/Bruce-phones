"use client"
import { useAuth } from "@/app/firebase/authFunctions"
import { db } from "@/app/firebase/firebaseInit"
import { getCollectionDocs, getCollectionDoc } from "@firebase/storeFunctions"
import { collection, getDocs } from "firebase/firestore"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

const App = ({ params }: any) => {
	const [pageData, setPageData] = useState<any>({ })
	// const { userId, name, role } = useAuth(true)
	/**
     params provides all the params of the file path...ie: the id.
     */
	// const { user, userData } = useAuth(true)
	const { user, isAdmin, userData } = useAuth(true)
	const router = useRouter()
	if (userData && userData.role !== "admin" ) {
		// prevent anyone but the admints to view content other than their own and reroute on when there is no user.
		// alert("users may only view their own content.") // replace with a toast later
		return router.push("/")
	}
	// if (userData.role !== "admin") {
	// 	// prevent anyone but the admints to view content other than their own and reroute on when there is no user.
	// 	alert("no user was signed in, rerouting to users.") // replace with a toast later
	// 	return router.push("/users")
	// }

	useEffect(() => {
		const fetchData = async () => {
			try {
				const applicantDocs = await getCollectionDoc({ collectionName: "applicants", docId: params.id })
				setPageData(applicantDocs)
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
		
		
			<button
				type="button"
				onClick={() => router.push("/users")}
				className="py-3 my-6 text-white bg-red-600 rounded-lg cursor-pointer">
				See all Applications
			</button>
		

		<pre>{JSON.stringify(pageData, null, 2)}</pre>
		</div>
	)
}

export default App
