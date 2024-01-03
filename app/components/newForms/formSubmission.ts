import React from "react"
import { type Inputs } from "./newMultiStepForm"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth, ref, storage, uploadString } from "@/app/firebase/firebaseInit"
import {
	doc,
	setDoc,
	db,
	addDoc,
	createDocument,
} from "@/app/firebase/storeFunctions"
import { SendApplicationEmail, showAlert } from "../FormSupport"

type dataFormProps = Inputs
type newDataFormProps = Omit<dataFormProps, "password"> &
	Omit<dataFormProps, "address"> & {
		status: "submitted"
		address: {
			document: {
				state: string // Adjust this to match your actual structure
			}
			physical: {
				state?: string | undefined // Adjust this to match your actual structure
			}
		}
	}

function getInitials(firstName: string, lastName: string): string {
	const firstInitial = firstName.charAt(0).toUpperCase()
	const lastInitial = lastName.charAt(0).toUpperCase()
	return `${firstInitial}${lastInitial}`
}

const createUserAndAccountWithData = async (data: dataFormProps) => {
	const { email, password, firstName, lastName } = data
	const initials = getInitials(firstName, lastName)
	const fullName = firstName + " " + lastName
	// delete the password and add a new status to the form
	const formatData = () => {
		const newData = {
			...data,
			status: "submitted",
			name: fullName,
			address: {
				...data.address,
				document: {
					...data.address.document,
					state: data.address.document.state.label,
				},
				physical: {
					...data.address?.physical,
					state: data.address.physical?.state?.label,
				},
			},
		}
		if (data.password) {
			delete newData.password
		}
		// if (data.address.physical?.addressLn1 === undefined){
		//     delete newData.address.physical.addressLn1
		//      delete newData.address.physical.city
		//       delete newData.address.physical.state
		//        delete newData.address.physical.zip
		//         // delete newData.address.physical
		// }
		if (data.password === undefined) {
			delete newData.password
		}
		return newData
	}
	const newData = formatData()

	if (password) {
		try {
			// create the user in Firebase  Auth
			const userCredential = await createUserWithEmailAndPassword(
				auth,
				email,
				password
			)

			//get the user's id
			const user = userCredential.user
			const userId = user.uid
			// Generate the user's avatar
			const avatarUrl = `https://api.dicebear.com/7.x/initials/svg?seed=${initials}`

			// create the user's folder in firebase storage
			const storageRef = ref(storage, `applicants/${userId}/${userId}`)

			// Upload placeholder file if needed
			if (data.userAccount) {
				const placeholderData = "Placeholder data"
				await uploadString(storageRef, placeholderData)
			}

			// create a new users section for them
			const userDocRef = doc(db, "users", userId)
			const userDocData = {
				email: email,
				role: "user",
				username: email,
				avatarUrl: avatarUrl,
				userId: userId,
			}
			const appDocRef = doc(db, "applicants", userId)
			const appDocData = newData

			// Set the user document in Firestore with the updated data
			try {
				await setDoc(userDocRef, userDocData)
			} catch (err) {
				console.log("error setting doc refs: ", err)
			}

			// upload data to Firestore with the same user ID
			try {
				await setDoc(appDocRef, appDocData)
			} catch (err) {
				console.log("error setting doc refs: ", err)
			}

			console.log("data submitted to firebase: ", newData)
		} catch (err) {
			console.log("unknown error", err)
		}
	} else {
		try {
			// Create Firestore document without creating a user account
			createDocument({ collectionName: "applicants", data: newData })
		} catch (err) {
			console.log("unknown error", err)
		}
	}
}

export const formSubmission = async (data: dataFormProps) => {
	// create new account from user info if the userAccount is true
	if (data.userAccount === "true") {
		console.log("user account needs to be made")
	} else {
		console.log("userAccount: False, no user account will be made")
	}
	// const { address, password, ...newDataWithoutAddressOrPassword } = data
	if (data.address.physical?.state !== undefined) {
		const newData = {
			...data,
			status: "submitted",
			address: {
				...data.address,
				document: {
					...data.address.document,
					state: data.address.document.state.label,
				},
				physical: {
					...data.address?.physical,
					state: data.address.physical?.state?.label,
				},
			},
		}
		if (data.password || data.password === undefined) {
			delete newData.password
		}

		//handle all the firebase stuff
		try {
			await createUserAndAccountWithData(data)
			console.log("user and docs created successfully")
		} catch {
			console.log("data upload attempt unsuccessfull")
		}
		// submit the email to bruce as a notification
		try {
			const emailResult = await SendApplicationEmail({
				formData: newData as newDataFormProps,
			})
			console.log("email data: ", newData)
			console.log(emailResult)
		} catch (err) {
			console.log("unsuccessful email attempt", err)
		}
		return
	} else {
		const newData = {
			...data,
			status: "submitted",
			address: {
				...data.address,
				document: {
					...data.address.document,
					state: data.address.document.state.label,
				},
				physical: {},
			},
		}
		if (data.password || data.password === undefined) {
			delete newData.password
		}

		//handle all the firebase stuff
		try {
			await createUserAndAccountWithData(data)
			console.log("user and docs created successfully")
		} catch {
			console.log("data upload attempt unsuccessfull")
		}
		// submit the email to bruce as a notification
		try {
			const emailResult = await SendApplicationEmail({
				formData: newData as newDataFormProps,
			})
			console.log("email data: ", newData)
			console.log(emailResult)
		} catch (err) {
			console.log("unsuccessful email attempt", err)
		}
		return
	}
}
