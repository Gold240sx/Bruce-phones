import { initializeApp } from "firebase/app"
import { getAnalytics } from "firebase/analytics"
import { type User, getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth"
import { getFirestore, serverTimestamp, doc, setDoc, getDoc } from "firebase/firestore"
import { getStorage, ref, uploadString, getDownloadURL } from "firebase/storage"

const firebaseConfig = {
	// apiKey: process.env.NEXT_API_KEY,
	// authDomain: process.env.NEXT_AUTH_DOMAIN,
	// projectId: process.env.NEXT_PROJECT_ID,
	// storageBucket: process.env.NEXT_STORAGE_BUCKET,
	// messagingSenderId: process.env.NEXT_MESSAGING_SENDER_ID,
	// appId: process.env.NEXT_APP_ID,
	// measurementId: process.env.NEXT_MEASUREMENT_ID,

	apiKey: "AIzaSyAVNydyQ_jSJ9Bdr5vMIe7bJciPIBaZ98k",
	authDomain: "freephoneformsite-mm23.firebaseapp.com",
	projectId: "freephoneformsite-mm23",
	storageBucket: "freephoneformsite-mm23.appspot.com",
	messagingSenderId: "878794485512",
	appId: "1:878794485512:web:23f7122841ea9996fd06bd",
	measurementId: "G-GVV75JG2N6",
}

// console.log(firebaseConfig.apiKey)

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

export {
	db,
	auth,
	User,
	onAuthStateChanged,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	doc,
	setDoc,
	getDoc,
	storage,
	timestamp,
	analytics,
	ref,
	uploadString,
	getDownloadURL,
}
