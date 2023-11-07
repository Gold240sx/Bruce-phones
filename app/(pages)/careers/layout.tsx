import React from "react"
import Image from "next/image"
import WorldMapDotted from "../../assets/images/world-map-dotted.png"

const CarreerLayout = ({ children }: any) => {
	return (
		<div>
			<section>{children}</section>
			<section className="relative flex flex-col items-center justify-center gap-8 overflow-hidden align-middle bg-zinc-50 py-96">
				<Image
					src={WorldMapDotted}
					alt="section background: world map"
					className="absolute z-0 w-3/4 h-auto cursor-auto pointer-events-none -right-16 -bottom-16 -rotate-6 opacity-5"
				/>
				<h2 className="z-10 px-10 text-5xl font-bold lg:px-32">
					Can’t find <span className="text-lime-500">what you’re looking for?</span>
				</h2>
				<p className="z-10 px-10 text-lg text-center md:px-32 text-zinc-700">
					We’re always looking for people with unique skills.{" "}
					<span className="font-semibold text-black cursor-pointer hover:underline">Send us your CV</span> and we’ll get in touch
					when we have an opening that matches your expectations.
				</p>
				<p className="absolute text-xs text-right bottom-2 right-10 text-zinc-300">
					{" "}
					World Map Image courtesy of{" "}
					<a href="https://www.vecteezy.com/vector-art/640076-black-on-white-dotted-world-map-vector" className="cursor-pointer">
						Orhun Evcimen
					</a>{" "}
					( freely licenced by Vecteezy){" "}
				</p>
			</section>
		</div>
	)
}

export default CarreerLayout
