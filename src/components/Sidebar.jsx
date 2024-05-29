import { Link, useNavigate } from "react-router-dom";
import { RiCloseFill } from "react-icons/ri";
import { MdOutlineLogout } from "react-icons/md";
import { toast } from "react-toastify";
export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
	const navigate = useNavigate()
	const handleLogout = () => {
		localStorage.removeItem('token')
		toast.success('Logout successful')
		navigate('/login')
	}
	return (
		<div className={`${sidebarOpen ? "translate-x-0" : "-translate-x-full"} absolute top-0 w-1/6 bg-white shadow h-screen p-4 text-xl`}>
			<div className="flex flex-col justify-between h-full">
				<div className="flex items-center justify-between pb-2 border-b border-black">
					<h1 className="font-bold">Quiz App</h1>
					<button onClick={() => setSidebarOpen(!sidebarOpen)}>
						<RiCloseFill className="text-2xl" />
					</button>
				</div>
				<ul className="flex flex-col my-2 gap-3 h-full">
					<li><Link to="/">Dashboard</Link></li>
					<li><Link to="/quiz">Take a Quiz</Link></li>
				</ul>
				<div>
					<button onClick={handleLogout} className="border-t pt-1 border-black w-full flex justify-between items-center">
						<span>Logout</span>
						<MdOutlineLogout />
					</button>
				</div>
			</div>
		</div>
	)
}
