import * as React from "react"

interface PageProps {
	firstName: string
	email: string
}

export const EmailTemplate: any = ({ firstName, email }: PageProps) => {
	return (
		<div>
			<h1>Hey {firstName}!</h1>
			<p>Email: {email}</p>
			{/* <section>
				<pre>BodyData: {bodyData}</pre>
			</section> */}
		</div>
	)
}
