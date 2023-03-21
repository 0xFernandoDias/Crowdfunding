import React from "react"
import { useNavigate } from "react-router-dom"

import FundCard from "./FundCard"
import { loader } from "../assets"

const DisplayCampaigns = ({
	title,
	isLoading,
	campaigns,
}: {
	title: string
	isLoading: boolean
	campaigns: any[]
}) => {
	const navigate = useNavigate()

	const handleNavigate = (campaign: any) => {
		navigate(`/campaignDetails/${campaign.title}`, { state: campaign })
	}

	const qntd = campaigns.length

	if (!qntd)
		return (
			<img
				src={loader}
				alt="loader"
				className="w-[100px] h-[100px] object-contain"
			/>
		)

	return (
		<div>
			<h1 className="font-epilogue font-semibold text-[18px] text-white text-left">
				{title} {qntd}
			</h1>
			<div className="flex flex-wrap mt-[20px] gap-[26px]">
				{qntd === 0 && (
					<p className="font-epilogue font-semibold text-[14px] leading-[30px] text-[#818183]">
						You have not created any campigns yet
					</p>
				)}
				{qntd > 0 &&
					campaigns.map((campaign, i) => (
						<FundCard
							key={i}
							{...campaign}
							handleClick={() => handleNavigate(campaign)}
						/>
					))}
			</div>
		</div>
	)
}

export default DisplayCampaigns
