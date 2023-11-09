// "use server"
import { SubscribeEmailTemplate } from "../../emailTemplates/subscribeEmailTemplate"
import { NextResponse } from "next/server"
import { Resend } from "resend"

const resend: any = new Resend(process.env.NEXT_RESEND_API_KEY)

export async function POST(request: Request) {
	const { email } = await request.json()
	try {
		const data = await resend.emails.send({
			from: "AlwaysThereWireless <ohioacppts@gmail.com>",
			to: email,
			subject: "ATW - Subscription Confirmation!!!",
			react: SubscribeEmailTemplate({ email }),
			text: `Always There Wireless - Thanks for Subscribing!`,
		})
		return NextResponse.json({ status: "ok" })
	} catch (error) {
		return NextResponse.json({ error })
	}
}
