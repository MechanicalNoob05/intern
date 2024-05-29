import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

export default function QuizTopicSelection() {
	const [category, setCategory] = useState()
	const fetchData = async() => {
		const response = await fetch(`${process.env.REACT_APP_BASE_URL}question/usercategory`, {
			method: 'GET',
			headers: {
				'Authorization': `Bearer ${localStorage.getItem('token')}`,
				'Content-Type': 'application/json',
			},
		})
		const data = await response.json()
		setCategory(data.categories)
	}
	useEffect(() => {
		fetchData()
	}, [])
	return (
		<div className="max-h-screen">
			<h1 className="text-center p-6 font-bold text-2xl subject">Select A Quiz Topic</h1>
			<div className="grid lg:grid-cols-3 gap-4 px-4 pb-4 overflow-y-auto">
				{
					category?.map((item) => {
						return (
							<Link to={`/quiz/${item}`} className="bg-white w-full h-max rounded p-2 border shadow">
								<h2 className="border-b text-xl font-bold py-1">{item}</h2>
							</Link>
						)
					})
				}
			</div>
		</div>
	)
}
