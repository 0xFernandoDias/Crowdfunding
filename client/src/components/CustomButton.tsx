import React from "react"

function CustomButton({
	btnType,
	title,
	styles,
	handleClick,
}: {
	btnType: "button" | "submit" | "reset" | undefined
	title: string
	styles: string
	handleClick?: () => void
}) {
	return (
		<button
			type={btnType}
			className={`font-epilogue font-semibold text-[16px] leading-[26px] text-white min-h-[52px] px-4 rounded-[10px] ${styles}`}
			onClick={handleClick}
		>
			{title}
		</button>
	)
}

export default CustomButton
