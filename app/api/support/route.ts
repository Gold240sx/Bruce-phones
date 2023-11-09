// "use server"
import { SupportEmailTemplate } from "../../emailTemplates/supportEmailTemplate"
import { NextResponse } from "next/server"
import { Resend } from "resend"

const resend: any = new Resend(process.env.NEXT_RESEND_API_KEY)

export async function POST(request: Request) {
	const { firstName, lastName, email, phone, phoneCountryCode, message } = await request.json()

	try {
		const data = await resend.emails.send({
			from: "Always There Wireless <onboarding@resend.dev>",
			to: "ohioacppts@gmail.com",
			subject: "ATW - Support Request!!!",
			react: SupportEmailTemplate({ firstName, lastName, email, phone, phoneCountryCode, message }),
			text: `Body Data: "firstName: ${firstName}, lastName: ${lastName}, email: ${email}, phone: ${phone}, phoneCountryCode: ${phoneCountryCode}, message: ${message}`,
		})
		return NextResponse.json({ status: "ok" })
	} catch (error) {
		return NextResponse.json({ error })
	}
}
