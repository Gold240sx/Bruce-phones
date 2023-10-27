import React from "react"

const BgPattern = () => {
	return (
		<div className="hidden w-full h-full pointer-events-none -z-20 sm:absolute top:0 sm:inset-y-0 sm:block" aria-hidden="true">
			<div className="relative w-full h-full mx-auto overflow-x-hidden -transform-h-full">
				<svg
					className="absolute bg-repeat-y right-full translate-x-1/4 transform-h-3/4"
					width={404}
					height={984}
					fill="none"
					viewBox="0 0 404 784">
					<defs>
						<pattern id="4522f7d5-8e8c-43ee-89bd-ad34cbfb07fa" x={0} y={0} width={20} height={20} patternUnits="userSpaceOnUse">
							<rect x={0} y={0} width={4} height={4} className="text-gray-300" fill="currentColor" />
						</pattern>
					</defs>
					<rect width={404} height={784} fill="url(#4522f7d5-8e8c-43ee-89bd-ad34cbfb07fa)" />
				</svg>
				<svg className="absolute bg-repeat-y left-full -translate-x-1/4" width={404} height={984} fill="none" viewBox="0 0 404 784">
					<defs>
						<pattern id="5d0dd344-b041-4d26-bec4-8d33ea57ec9b" x={0} y={0} width={20} height={20} patternUnits="userSpaceOnUse">
							<rect x={0} y={0} width={4} height={4} className="text-gray-300" fill="currentColor" />
						</pattern>
					</defs>
					<rect width={404} height={784} fill="url(#5d0dd344-b041-4d26-bec4-8d33ea57ec9b)" />
				</svg>
			</div>
		</div>
	)
}

export default BgPattern
