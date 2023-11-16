// "use server"
import { ApplicationEmailTemplate } from "../../emailTemplates/applicationEmailTemplate"
import { NextResponse } from "next/server"
import { Resend } from "resend"

const resend: any = new Resend(process.env.NEXT_RESEND_API_KEY)

export async function POST(request: Request) {
	const { firstName, lastName, email, phone, address, userAccount, phoneCountryCode, qualification, DOB, lastFour, pickedProduct, status } = await request.json()

	try {
		const data = await resend.emails.send({
			from: "Always There Wireless <ohioacppts@gmail.com>",
			to: "ohioacppts@gmail.com",
			subject: "ATW - Support Request!!!",
			react: ApplicationEmailTemplate({ firstName, lastName, email, phone, address, phoneCountryCode, userAccount, qualification, DOB, lastFour, pickedProduct, status}),
			text: `Body Data: "firstName: ${firstName}, lastName: ${lastName}, email: ${email}, phone: ${phone}, address: ${address}, phoneCountryCode: ${phoneCountryCode}, userAccount: ${userAccount}, qualification: ${qualification}, DOB: ${DOB}, lastFour: ${lastFour}, pickedProduct: ${pickedProduct}, status: ${status}`,
		})
		return NextResponse.json({ status: "ok" })
	} catch (error) {
		return NextResponse.json({ error })
	}
}
