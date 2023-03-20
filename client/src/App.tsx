import { Route, Routes } from "react-router-dom"
import { Home, Profile, CreateCampaign, CampaignDetails } from "./pages"
import { Sidebar, Navbar } from "./components"

export default function App() {
	return (
		<div className="relative sm:-8 p-4 bg-[#13131a] min-h-screen flex flex-row">
			<div className="sm:flex hidden mr-10 relative">
				<Sidebar />
			</div>

			<div className="flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5">
				<Navbar />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/Profile" element={<Profile />} />
					<Route path="/CreateCampaign" element={<CreateCampaign />} />
					<Route path="/CampaignDetails/:id" element={<CampaignDetails />} />
				</Routes>
			</div>
		</div>
	)
}
