import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function SelectTopics() {

	const navigate = useNavigate()
	const [topics, setTopics] = useState([]);
	const [selectTopic, setSelectTopic] = useState([]);

	const fetchData = async () => {
		const response = await fetch('http://localhost:5000/question', {
			method: 'GET',
			headers: {
				'Authorization': `Bearer ${localStorage.getItem('token')}`,
				'Content-Type': 'application/json',
			},
		});
		const data = await response.json();
		if (data.selectedCategories.length > 0) {
			navigate('/')
		}
		setTopics(data.categories);
	};

	useEffect(() => {
		fetchData();
	}, []);

	const handleCheckboxChange = (item) => {
		if (selectTopic.includes(item)) {
			setSelectTopic(selectTopic.filter((topic) => topic !== item));
		} else {
			setSelectTopic([...selectTopic, item]);
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await fetch(`http://localhost:5000/user/update`, {
				method: 'POST',
				body: JSON.stringify({ selectedCategories: selectTopic }),
				headers: {
					'Authorization': `Bearer ${localStorage.getItem('token')}`,
					'Content-Type': 'application/json',
				},
			});

			if (response.ok) {
				const data = await response.json()
				navigate('/')
			} else {
				console.error('Failed to add the comment');
			}
		} catch (error) {
			console.error('An error occurred', error);
		}
	};
	return (
		<div className="h-screen p-6 rounded flex flex-col justify-between">
			<div>
				<h1 className="text-center p-6 font-bold text-2xl">Select Topics</h1>
				<h3 className="text-gray-400 text-center">This is first time page, you can always change your options in settings</h3>
			</div>
			<div className="grid grid-cols-4 gap-2">
				{topics?.map((item) => (
					<div key={item} className="bg-white w-full h-max rounded p-2 border shadow">
						<h2 className="border-b text-xl font-bold py-1">{item}</h2>
						<input
							type="checkbox"
							checked={selectTopic.includes(item)}
							onChange={() => handleCheckboxChange(item)}
						/>
					</div>
				))}
			</div>
			<div>
				<span className="font-bold">Selected Topics:</span>
				{
					selectTopic?.map((item) => {
						return (
							<span> {item},</span>
						)
					})
				}
			</div>
			<button onClick={handleSubmit} className="bg-blue-500 text-white p-2 rounded">Submit</button>
		</div>
	);
}
