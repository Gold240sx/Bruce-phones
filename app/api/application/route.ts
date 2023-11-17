// "use server"
import { SupportEmailTemplate } from "@/app/emailTemplates/supportEmailTemplate"
import { ApplicationEmailTemplate } from "../../emailTemplates/applicationEmailTemplate"
import { NextResponse } from "next/server"
import { Resend } from "resend"

const resend: any = new Resend(process.env.NEXT_RESEND_API_KEY)

export async function POST(request: Request) {
	const { firstName, lastName, email, phoneDetails, address, qualification, DOB, lastFour, userAccount, pickedProduct, status } = await request.json()

	try {
		const data = await resend.emails.send({
			from: "Always There Wireless <onboarding@resend.dev>",
			to: "ohioacppts@gmail.com",
			subject: "ATW - Application Request!!!",
			react: ApplicationEmailTemplate({ firstName, lastName, email, phoneDetails, address, qualification, DOB, lastFour, userAccount, pickedProduct, status }),
			text: `Body Data: "firstName: ${firstName}, lastName: ${lastName}`,
		})
		return NextResponse.json({ status: "ok" })
	} catch (error) {
		return NextResponse.json({ error })
	}
}