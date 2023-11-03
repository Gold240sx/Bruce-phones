import {
	auth,
	User,
	onAuthStateChanged,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	db,
	doc,
	setDoc,
	getDoc,
	storage,
	ref,
	uploadString,
	getDownloadURL,
} from "@firebase/firebaseInit"
import { useState, useEffect } from "react"

type LoginParams = {
	email: string
	password: string
}

export const SignIn = async ({ email, password }: LoginParams) => {
	try {
		await signInWithEmailAndPassword(auth, email, password)
	} catch (error) {
		console.log(error)
	}
}

export const SignUp = async ({ email, password }: LoginParams) => {
	try {
		// Create a user in Firebase Authentication
		const userCredential = await createUserWithEmailAndPassword(auth, email, password)

		// Get the user's ID
		const user = userCredential.user
		const userId = user.uid

		// Step 2: Generate a random avatar
		const avatarUrl = `https://api.dicebear.com/7.x/initials/svg?seed=${email}`

		// Create a folder for the user in Firebase Storage
		const storageRef = ref(storage, `users/${userId}/${userId}`)

		// You can also upload a placeholder file if needed
		const placeholderData = "Placeholder data"
		await uploadString(storageRef, placeholderData)

		// Create a document in Firestore with the same user ID
		const userDocRef = doc(db, "users", userId)
		const userDocData = { email: email, role: "user", username: email, avatarUrl: avatarUrl }

		// Set the user document in Firestore with the updated data
		await setDoc(userDocRef, userDocData)

		{
			/* MUST SET UP FFIREBASE STORAGE RULES TO THE FOLLOWING: 
                 rules_version = '2';

                service firebase.storage {
                    match /b/{bucket}/o {
                        // Allow read and write access to authenticated users
                        match /{allPaths=**} {
                        allow read, write: if request.auth != null;
                        }
                    }
                }
    */
		}

		// Optionally, return the user data or some indication of a successful sign-up
		window.location.href = "/dashboard"
		return { success: true, user: user }
	} catch (error) {
		console.log(error)
		return { success: false, error: error }
	}
}

export const useAuth = (fetchUserData = false) => {
	const [user, setUser] = useState<User | null>(null)
	const [userData, setUserData] = useState<any | null>(null) // Modify 'any' to match your Firestore data structure
	const [isAdmin, setIsAdmin] = useState(false)

	{
		/*   Hook Use:
        import useAuth from '@firebase/authFunctions';

        // To fetch user data:
        const { user, isAdmin, userData } = useAuth(true);

        // To skip fetching user data:
        const { user, isAdmin } = useAuth();
*/
	}

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
			setUser(authUser)
			setUserData(null)
			setIsAdmin(false) // Reset admin status initially

			if (authUser) {
				// if there is a user
				const userDocRef = doc(db, "users", authUser.uid)
				const userDoc = await getDoc(userDocRef)

				if (userDoc.exists()) {
					const userData = userDoc.data()
					if (fetchUserData) {
						setUserData(userData)
					}

					if (userData.role === "admin") {
						setIsAdmin(true)
					}
				}
			}
		})

		return unsubscribe
	}, [])

	return { user, isAdmin, userData }
}
