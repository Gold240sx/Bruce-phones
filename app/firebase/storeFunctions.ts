import {
	auth,
	User,
	onAuthStateChanged,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	db,
	addDoc,
	getDocs,
	updateDoc,
	deleteDoc,
	collection,
	doc,
	setDoc,
	getDoc,
	storage,
	ref,
	uploadString,
	getDownloadURL,
} from "@firebase/firebaseInit"
import { useState, useEffect } from "react"

const readDocument = async ({ collectionName, documentId }: { collectionName: string; documentId: string }) => {
	const docRef = doc(db, collectionName, documentId)
	const docSnapshot = await getDoc(docRef)

	if (docSnapshot.exists()) {
		const data = docSnapshot.data()
		// Handle the data
	} else {
		// Document doesn't exist
	}
}

const createDocument = async ({ collectionName, data }: { collectionName: string; data: any }) => {
	try {
		const docRef = await addDoc(collection(db, collectionName), data)
		return { status: "success", message: "Document successfully created", docRef }
	} catch (error) {
		return { status: "error", message: "Error creating document", error }
	}

	{
		/* To USE:
    async function onSubmit(data: FormValues) {
        try {
            const response = await createDocument({ collectionName: "supportRequests", data: data });

            if (response.status === "success") {
                showAlert({ text: "The form was successfully submitted", status: "OK" });
                    console.log("Document Reference:", response.docRef);
            } else {
                    showAlert({ text: "There was an error submitting the form", status: "ERR" });
                    console.error(response.error);
            }
        } catch (err) {
            console.error("Unexpected error:", err);
            showAlert({ text: "An unexpected error occurred", status: "ERR" });
        }
    }

    */
	}
}

const updateDocument = async ({ collectionName, documentId, data }: { collectionName: string; documentId: string; data: any }) => {
	const docRef = doc(db, collectionName, documentId)
	await updateDoc(docRef, data)

	/* 
    alternate: 
    const updateMovieTitle = async  (id) => {
        const movieDoc = doc(db, "movies", id)
        await updateDoc(movieDoc, { title: updatedTitle })
    }
    */
}

const deleteDocument = async ({ collectionName, documentId }: { collectionName: string; documentId: string }) => {
	const docRef = doc(db, collectionName, documentId)
	await deleteDoc(docRef)
	// Handle the delete operation
}

export const getCollectionDocs = async ({ collectionName }: { collectionName: string }) => {
	const collectionRef = collection(db, collectionName)
	try {
		const data = await getDocs(collectionRef)
		const filteredData = data.docs.map((doc) => ({
			...doc.data(),
			id: doc.id,
		}))
		return filteredData
	} catch (err) {
		console.error(err)
	}
}

export const getCollectionDoc = async ({ collectionName, docId }: { collectionName: string; docId: string }) => {
	const docRef = doc(db, collectionName, docId)
	const docSnapshot = await getDoc(docRef)

	try {
		if (docSnapshot.exists()) {
			const data = docSnapshot.data()
			const filteredData = {
				...data,
				id: docSnapshot.id,
			}
			return filteredData
		} else {
			console.log("Document not found or there was an error with the data retrieval.")
			return null
		}
	} catch (err) {
		// console.error(err)
		console.log(err)
		return null
	}
}

export { collection, db, addDoc, getDocs, updateDoc, deleteDoc, doc, setDoc, getDoc, createDocument }