"use client"
import React, { useState } from "react"
import { useAuth } from "@/app/firebase/authFunctions"
import { doc, db, updateDoc } from "@firebase/firebaseInit"

const Dashboard = () => {
	const { userData } = useAuth(true)
	const [newRole, setNewRole] = useState("")
	// const userId = userData.userId

	const handleChangeRole = async () => {
		// console.log(userData.userId)
		const userId = userData.userId
		const userDocRef = doc(db, "users", userId)
		await updateDoc(userDocRef, { role: newRole })
	}

	return (
		<div>
			Dashboard
			<input type="text" placeholder="New Role" value={newRole} onChange={(e) => setNewRole(e.target.value)} />
			<button onClick={handleChangeRole}>Change Role</button>
			{/* <RoleChangeForm userId={userId} /> */}
		</div>
	)
}

export default Dashboard
