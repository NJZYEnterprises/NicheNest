import { Link } from "react-router-dom";

const Navbar = () => {
  return <div className="flex flex-row bg-gray-800 w-screen">
    <div>Logo</div>
    <Link to={'/'}>
      <div>
        <img src="TODO" alt="Logo" width="30" height="24" />
        <h1 >Niche Nest</h1>
      </div>
    </Link>
    <Link to="/">Home</Link>
    <Link to="/login">Login</Link>
    <Link to="/register">Register</Link>
  </div>
};

export default Navbar;