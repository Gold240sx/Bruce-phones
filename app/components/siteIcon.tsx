import { group } from "console"

const SiteIcon = ({ className, textClassName }: { className: string; textClassName: string }) => {
	return (
		<div className={` ${className} border-4 border-black -rotate-6 relative group rounded-lg main-icon shadow-black/20 shadow-xl`}>
			<div
				className={` ${textClassName} text-white z-10  absolute group-hover:pl-3 transition-all duration-300 ease-out font-bold rotate-6 mt-[11px] ml-2`}>
				ATW
			</div>
			<div
				className={` rotate-10 shadow-2xl shadow-black group rounded-lg bg-gradient-to-br border-black border-4 from-fuchsia-500 to-orange-400 h-14 w-8 ml-8 rotate-12 translate-y-3`}></div>
		</div>
	)
}

export default SiteIcon
