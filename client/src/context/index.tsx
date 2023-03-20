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

			console.log("Campaign created", data)
		} catch (error) {
			console.log("Contract call failed", error)
		}
	}

	return (
		<StateContext.Provider
			value={{
				address,
				contract,
				connect,
				createCampaign: publishCampaign,
			}}
		>
			{children}
		</StateContext.Provider>
	)
}

export const useStateContext = () => useContext(StateContext)
