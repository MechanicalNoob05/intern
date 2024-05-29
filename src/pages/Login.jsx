import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Login() {
	const navigate = useNavigate()
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await fetch(`${process.env.REACT_APP_BASE_URL}user/login`, {
				method: 'POST',
				body: JSON.stringify(formData),
				headers: {
					'Content-Type': 'application/json',
				},
			});
			if (response.ok) {
				const data = await response.json()
				localStorage.setItem('token', data.token)
				setFormData(
					{
						email: '',
						password: '',
					}
				)
				toast.success('Login successful')
				navigate('/')
			} else {
				toast.error('Invalid credentials')
				console.error('Failed to add the comment');
			}
		} catch (error) {
			console.error('An error occurred', error);
		}
	};
	return (
		<div className="bg-cover bg-fixed flex min-h-screen justify-center items-center bg-[url('https://images.pexels.com/photos/691668/pexels-photo-691668.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')]">
			<div className="bg-white flex min-h-full lg:w-1/3 w-full flex-col justify-center px-6 py-12 lg:px-8 shadow border rounded">
				<div className="sm:mx-auto sm:w-full sm:max-w-sm">
					<img className="mx-auto h-40 w-auto rounded-full shadow" src="https://i.pinimg.com/564x/fa/d8/4c/fad84c0600f456c599953847ab1448a9.jpg" alt="Your Company" />
					<h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
				</div>

				<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
					<form className="space-y-6" onSubmit={handleSubmit}>
						<div>
							<label for="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
							<div className="mt-2">
								<input name="email" type="email" autocomplete="email" required className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" onChange={handleChange} />
							</div>
						</div>

						<div>
							<div className="flex items-center justify-between">
								<label for="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
							</div>
							<div className="mt-2">
								<input  name="password" type="password" autocomplete="current-password" required className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" onChange={handleChange} />
							</div>
						</div>

						<div>
							<button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
						</div>
					</form>

					<p className="mt-10 text-center text-sm text-gray-500">
						Not a member?
						<Link to="/signup" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"> Sign up</Link>
					</p>
				</div>
			</div>
		</div>
	)
}
