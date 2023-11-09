import { NextApiRequest, NextApiResponse } from "next"
import { google } from "googleapis"
import { NextResponse } from "next/server"

type SheetForm = {
	name: string
	email: string
	phone: string
	message: string
}

const envEmail = process.env.NEXT_RESEND_API_KEY

export async function POST(req: NextApiRequest, res: NextApiResponse) {
	try {
		if (req.method !== "POST") {
			return res.status(405).send({ message: "Only POST requests are allowed" })
		}
		const body = req.body as SheetForm

		// submit to google API
		// prepare auth
		const auth = new google.auth.GoogleAuth({
			credentials: {
				type: "service_account",
				universe_domain: "googleapis.com",
				client_email: process.env.NEXT_GOOGLE_CLIENT_EMAIL,
				private_key: process.env.NEXT_GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
			},
			scopes: [
				"https://www.googleapis.com/auth/drive",
				"https://www.googleapis.com/auth/drive.file",
				"https://www.googleapis.com/auth/spreadsheets",
			],
		})

		const sheets = google.sheets({
			version: "v4",
			auth,
		})

		const response = await sheets.spreadsheets.values.append({
			spreadsheetId: process.env.NEXT_GOOGLE_SHEET_ID,
			range: "A1:D1",
			valueInputOption: "USER_ENTERED",
			requestBody: {
				values: [[body.name, body.email, body.phone, body.message]],
			},
		})

		return NextResponse.json({ status: "ok", data: res })
	} catch (err) {
		console.error(err)
		return NextResponse.json({ err })
	}
}
