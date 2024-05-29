import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
export default function StartQuiz() {

	const navigate = useNavigate()
	const { id } = useParams()
	const [questions, setQuestions] = useState()
	const [selectedOptions, setSelectedOptions] = useState([]);

	// Function to handle radio button changes
	const handleOptionChange = (itemId, option) => {
		setSelectedOptions((prevSelectedOptions) => {
			// Remove any existing selection for the current item
			const filteredOptions = prevSelectedOptions.filter(
				(opt) => opt.id !== itemId
			);

			// Add the new selection
			return [...filteredOptions, { id: itemId, option }];
		});
	};
	const fetchData = async () => {
		const response = await fetch(`http://localhost:5000/question/${id}`, {
			method: 'GET',
			headers: {
				'Authorization': `Bearer ${localStorage.getItem('token')}`,
				'Content-Type': 'application/json',
			},
		})
		const data = await response.json()
		setQuestions(data)
		// console.log(data)
	}
	useEffect(() => {
		fetchData()
	}, [])
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await fetch(`${process.env.REACT_APP_BASE_URL}question/check-answers/${id}`, {
				method: 'POST',
				body: JSON.stringify(selectedOptions),
				headers: {
					'Authorization': `Bearer ${localStorage.getItem('token')}`,
					'Content-Type': 'application/json',
				},
			});

			if (response.ok) {
				const data = await response.json()
				if(data.sucess){
					toast.success('Submitted successfully')
					navigate('/result')
				}
			} else {
				toast.error('Something went wrong')
				console.error('Failed to add the comment');
			}
		} catch (error) {
				toast.error('Something went wrong')
			console.error('An error occurred', error);
		}
	}
	console.log(selectedOptions)
	return (
		<div className="bg-[url('https://images.pexels.com/photos/5428830/pexels-photo-5428830.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')] h-screen flex justify-center items-center bg-cover bg-no-repeat">
			<div className='w-[60%] flex flex-col items-center bg-white/90 p-5 rounded shadow'>
				<div className='w-full'>
					{questions?.map((item) => (
						<div key={item._id} className="bg-white my-2 w-full h-max rounded p-2 border shadow">
							<h2 className="border-b text-xl font-bold py-1">{item.question}</h2>
							<div className="grid grid-cols-2 gap-2">
								{item.options.map((option) => (
									<div key={option} className="flex">
										<input
											type="radio"
											name={`question-${item._id}`}
											value={option}
											checked={selectedOptions.some(
												(opt) => opt.id === item._id && opt.option === option
											)}
											onChange={() => handleOptionChange(item._id, option)}
										/>
										<p className="ml-2">{option}</p>
									</div>
								))}
							</div>
						</div>
					))}
				</div>
				<button disabled={selectedOptions.length < questions?.length ? true : false} onClick={handleSubmit} className={`${selectedOptions.length < questions?.length ? 'bg-gray-500' : 'bg-blue-500'} text-white p-2 rounded`}>Submit Quiz</button>
			</div>
		</div>
	)
}
