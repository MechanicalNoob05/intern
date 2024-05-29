import { useEffect, useState } from "react"
import Sidebar from "../components/Sidebar"
import { GiHamburgerMenu } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
export default function Home() {
	const navigate = useNavigate()
	const [sidebarOpen, setSidebarOpen] = useState(false)
	const [userData, setUserData] = useState()
	const fetchData = async () => {
		const response = await fetch(`${process.env.REACT_APP_BASE_URL}user/profile`, {
			method: 'GET',
			headers: {
				'Authorization': `Bearer ${localStorage.getItem('token')}`,
				'Content-Type': 'application/json',
			},
		})
		const data = await response.json()
		setUserData(data)
		if (data?.selectedCategory.length === 0) {
			navigate('/topic')
		}
		console.log(data)
	}
	useEffect(() => {
		fetchData()
	}, [])
	return (
		<div className="h-screen bg-[url('https://images.pexels.com/photos/1193743/pexels-photo-1193743.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')] bg-cover bg-no-repeat">
			<nav className="bg-white flex h-[6%] items-center shadow border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900">
				<button onClick={() => setSidebarOpen(!sidebarOpen)}>
					<GiHamburgerMenu className="text-xl" />
				</button>
			</nav>
			<Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} name="Tejas Mayekar" />
			<div className="p-4 h-[94%] flex gap-2">
				<div className="w-9/12 h-max">
					<h2 className="text-lg break-words text-gray-400 py-2">{`Welcome, ${userData?.name}`}</h2>
					<div className="grid grid-cols-3 gap-4">
						{
							userData?.score.length === 0 ? <div className="bg-white w-full h-max">No Scores Yet, Take a quiz to generate score card</div> : <>{
								userData?.score.map((item) => {
									return (
										<div key={item._id} className="bg-white w-full h-max rounded p-2 border shadow">
											<h2 className="border-b text-xl font-bold py-1">{item.category}</h2>
											<p className="py-2"><span className="text-green-400 font-bold text-2xl">{item.score}</span>/<span>{item.total}</span></p>
										</div>
									)
								})}</>
						}
					</div>
				</div>
				<div className="bg-white w-3/12 rounded border p-2 shadow">
					<h2 className="border-b text-xl font-bold py-1">Leaderboard</h2>
					{
						userData?.topHighScores.map((item) => {
							return (
								<div key={item._id} className="mb-2 w-full">
									<div className={`my-2 ${userData?.name === item.name ? 'bg-green-200' : 'bg-white'} rounded p-2 shadow border`}>
										<p className={`border-b ${userData?.name === item.name ? 'border-black' : ''} py-2 font-bold`}>{item.name}</p>
										<p className="py-2">Top Score: {item.highScore}</p>
									</div>
								</div>
							)
						})
					}
				</div>
			</div>
		</div>
	)
}
