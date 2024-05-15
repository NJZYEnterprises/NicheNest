import { Link } from "react-router-dom";
import loginIcon from "../assets/login.svg";
import accountIcon from "../assets/account.svg";

const Navbar = () => {
  const isLoggedIn = () => false; // TODO: replace with uid check

  // return <div className="flex flex-row bg-gray-800 justify-between w-screen -mt-4 -ml-5 p-0">
  return <div className="flex flex-col bg-gray-800 sticky top-0 p-3">
    <div className="flex flex-row justify-between">
      <Link to={'/'}>
        <div>
          <img src="TODO" alt="Logo" width="60" height="48" />
        </div>
      </Link>
      <div className="flex flex-col justify-center">
        <Link to="/" className="text-3xl">Niche Nest</Link>
      </div>
      {isLoggedIn() ?
        <Link to={"/profile"}>
          <img src={accountIcon} alt="Profile" width="60" height="48" />
        </Link> :
        <Link to={"/login"}>
          <img src={loginIcon} alt="Login" width="60" height="48" />
        </Link>
      }
    </div>
    <div id="TODO: replace with SearchBarComponent">
      <h2>Search Input goes here</h2>
      <h2>Filters go here</h2>
    </div>
  </div>
};

export default Navbar;
