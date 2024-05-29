import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export default function Result() {
	const navigate = useNavigate()
	const [result, setResult] = useState()
	const fetchData = async () => {
		const response = await fetch(`${process.env.REACT_APP_BASE_URL}user/result`, {
			method: 'GET',
			headers: {
				'Authorization': `Bearer ${localStorage.getItem('token')}`,
				'Content-Type': 'application/json',
			},
		})
		const data = await response.json()
		setResult(data)
		if (data?.lastResults.length === 0) {
			navigate('/')
		}
	}
	const handleOK = async () => {
		try{
			const response = await fetch(`${process.env.REACT_APP_BASE_URL}user/result/view`, {
				method: 'GET',
				headers: {
					'Authorization': `Bearer ${localStorage.getItem('token')}`,
					'Content-Type': 'application/json',
				},
			})
			if(response.ok){
				navigate('/')
			}
		}catch(err){
			navigate('/')
			console.log(err)
		}
	}
	useEffect(() => {
		fetchData()
	}, [])
	return (
		<div className="h-screen bg-[url('https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')] bg-no-repeat bg-cover flex justify-center items-center">
			<div className="flex flex-col justify-center items-center w-1/2 bg-white/90 p-4 rounded shadow border">
				<h1 className="text-2xl font-bold border-b w-full text-center">Result</h1>
				{
					result?.lastResults.map((item) => {
						return (
							<div key={item._id} className="p-2 w-full">
								<div className="my-2 bg-white p-2 shadow border">
									<p className="border-b py-2 font-bold">{item.question}</p>
									<div className="flex gap-1 py-2">
										<p>Your Answer was {item.submittedOption}</p>
										{item.isCorrect ?
											<p >which is Correct</p>
											:
											<p >Wrong, Correct Answer was {item.correctAnswer}</p>
										}
									</div>
								</div>
							</div>
						)
					})
				}
				<button className="bg-blue-500 p-2 rounded text-white" onClick={handleOK}>Go Home</button>
			</div>
		</div>
	)
}
