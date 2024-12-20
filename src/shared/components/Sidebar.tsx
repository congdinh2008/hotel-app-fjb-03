import { Link } from "react-router-dom";

const Sidebar = () => {
    return (
        <aside className="w-48 border-r border-slate-300">
            <div className="title p-4 text-2xl font-semibold">Management</div>
            <nav>
                <ul>
                    <li>
                        <Link to="/manager/dashboard" className="nav-link block p-4 hover:bg-blue-700 hover:text-white">Dashboard</Link>
                    </li>
                    <li>
                        <Link to="/manager/rooms" className="nav-link block p-4 hover:bg-blue-700 hover:text-white">Rooms</Link>
                    </li>
                    <li>
                        <Link to="/manager/amenities" className="nav-link block p-4 hover:bg-blue-700 hover:text-white">Amenities</Link>
                    </li>
                </ul>
            </nav>
        </aside>
    )
}

export default Sidebar;