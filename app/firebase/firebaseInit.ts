import { initializeApp } from "firebase/app"
import { getAnalytics } from "firebase/analytics"
import { getFirestore, serverTimestamp } from "firebase/firestore"
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
	apiKey: process.env.NEXT_API_KEY,
	authDomain: process.env.NEXT_AUTH_DOMAIN,
	projectId: process.env.NEXT_PROJECT_ID,
	storageBucket: process.env.NEXT_STORAGE_BUCKET,
	messagingSenderId: process.env.NEXT_MESSAGING_SENDER_ID,
	appId: process.env.NEXT_APP_ID,
	measurementId: process.env.NEXT_MEASUREMENT_ID,
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
//init firestore
const db = getFirestore(app)
// init firebase auth
const auth = getAuth(app)
// init storage
const storage = getStorage(app)
// Timestamp
const timestamp = serverTimestamp()
// Analytics
const analytics = getAnalytics(app)

export { db, auth, createUserWithEmailAndPassword, storage, timestamp, analytics }
