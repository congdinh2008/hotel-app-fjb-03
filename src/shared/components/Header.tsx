import { Link } from "react-router-dom";

const Header = () => {
    return (
        <header className="bg-blue-500 flex justify-between items-center px-4 text-white">
            <Link to="/" className="text-2xl font-bold">Hotel App</Link>
            <nav className="navbar">
                <ul className="nav-menu flex justify-center">
                    <li className="nav-item">
                        <Link to="/" className="nav-link block p-4 hover:bg-blue-700">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/about" className="nav-link block p-4 hover:bg-blue-700">About</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/contact" className="nav-link block p-4 hover:bg-blue-700">Contact</Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default Header;