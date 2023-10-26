import React from "react"

const BgBlur = ({ toggleMainForm }: any) => {
	return (
		<div
			id="signup-bg-blur"
			onClick={toggleMainForm}
			className="fixed top-0 bottom-0 left-0 right-0 z-10 w-screen h-screen shadow-lg bg-black/40 backdrop-blur-lg shadow-black"></div>
	)
}

export default BgBlur
