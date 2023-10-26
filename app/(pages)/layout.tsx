import type { Metadata } from "next"
import Banner from "../components/banner/banner"
import { Inter as FontSans } from "next/font/google"
import Navbar from "../components/navbar"
import Footer from "../components/footer"
import BgPattern from "../components/bgPattern"
import { cn } from "../libs/utils"
import "../globals.css"
import PopupModal from "../components/popupModal"

export const metadata: Metadata = {
	title: "Free Phones Today",
	description:
		"Claim your free* phone or tablet today! (free phone or tablet dependant upon eligibility. We do not in any way guarantee eligibilty. Offer subject to availability. )",
}

export const fontSans = FontSans({
	subsets: ["latin"],
	variable: "--font-sans",
})

const messages = [
	{ message: "Fresh Product supply! Claim your's today! ", link: "View products", href: "/products" },
	// { message: "Fresh Product supply! Claim your's today! ", link: "products", href: "/products" },
]

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body className={`${cn(fontSans.variable)} relative p-0 m-0`}>
				<BgPattern />
				<div className="">
					<Banner messages={messages} />
					<Navbar />
					{children}
					<Footer />
				</div>
			</body>
		</html>
	)
}
