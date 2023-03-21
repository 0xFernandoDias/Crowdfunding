import { useContext, createContext } from "react"
import {
	useAddress,
	useContract,
	useMetamask,
	useContractWrite,
} from "@thirdweb-dev/react"
import { ethers } from "ethers"
import { SmartContract } from "@thirdweb-dev/sdk"

const StateContext = createContext(
	{} as {
		address?: string
		contract: any
		connect: () => Promise<any>
		createCampaign: any
		getCampaigns: any
		getUserCampaigns: any
		donate: any
		getDonations: any
	}
)

export const StateContextProvider = ({
	children,
}: {
	children: React.ReactNode
}) => {
	const { contract } = useContract("0x45943e9671E58a44529ca1F41a8214B81a8cB47A")
	const { mutateAsync: createCampaign } = useContractWrite(
		contract,
		"createCampaign"
	)
	const address = useAddress()
	const connect = useMetamask()

	const publishCampaign = async (form: {
		title: string
		description: string
		target: string
		deadline: string
		image: string
	}) => {
		try {
			const data = await createCampaign([
				address,
				form.title,
				form.description,
				form.target,
				new Date(form.deadline).getTime(),
				form.image,
			])
		} catch (error) {
			alert("Contract call failed")
		}
	}

	const getCampaigns = async () => {
		const campaigns = await contract?.call("getCampaigns")

		const parsedCampaings = campaigns.map(
			(
				campaign: {
					owner: string
					amountCollected: string
					title: string
					description: string
					target: string
					deadline: string
					image: string
				},
				i: number
			) => ({
				owner: campaign.owner,
				title: campaign.title,
				description: campaign.description,
				target: ethers.utils.formatEther(campaign.target.toString()),
				deadline: campaign.deadline,
				amountCollected: ethers.utils.formatEther(
					campaign.amountCollected.toString()
				),
				image: campaign.image,
				pId: i,
			})
		)

		return parsedCampaings
	}

	const getUserCampaigns = async () => {
		const allCampaigns = await getCampaigns()

		const filteredCampaigns = allCampaigns.filter(
			(campaign: any) => campaign.owner === address
		)

		return filteredCampaigns
	}

	const donate = async (pId: any, amount: any) => {
		const data = await contract?.call("donateToCampaign", pId, {
			value: ethers.utils.parseEther(amount),
		})

		return data
	}

	const getDonations = async (pId: any) => {
		const donations = await contract?.call("getDonators", pId)
		const numberOfDonations = donations[0].length

		const parsedDonations = []

		for (let i = 0; i < numberOfDonations; i++) {
			parsedDonations.push({
				donator: donations[0][i],
				donation: ethers.utils.formatEther(donations[1][i].toString()),
			})
		}

		return parsedDonations
	}

	return (
		<StateContext.Provider
			value={{
				address,
				contract,
				connect,
				createCampaign: publishCampaign,
				getCampaigns,
				getUserCampaigns,
				donate,
				getDonations,
			}}
		>
			{children}
		</StateContext.Provider>
	)
}

export const useStateContext = () => useContext(StateContext)
