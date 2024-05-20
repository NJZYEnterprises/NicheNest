import { useEffect, useState, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { capitalize } from "../utils/myString.cjs"
import { AuthContext } from "../auth/AuthProvider.jsx"
import GoogleButton from "react-google-button"
import Fetcher from "../fetcher.js";

const fetcher = new Fetcher("api");

const SignInForm = () => {
  // <-- Hooks -->
  // const navigate = useNavigate();
  const location = useLocation();
  const { signIn, fireSignUp } = useContext(AuthContext);
  const [formData, setFormData] = useState({});
  const [errorMsg, setErrorMsg] = useState("");

  // <-- Dynamic display -->
  const formType = location.pathname.replaceAll('/', '');
  const otherFormType = formType === "login" ? "register" : "login";

  const inputKeys = ["Email", "Password"];
  if (formType === "register") {
    inputKeys.unshift("Username", "First Name", "Last Name");
    inputKeys.push("Confirm Password");
  }

  /** This function converts the input display name to the name used for the element 
   * (which will then be used as the database column name) */
  const inputName = (formKey) => {
    if (typeof (formKey) !== "string" || formKey.length < 1)
      return "unnamed";
    const words = formKey.split(' ');
    words[0] = words[0].toLowerCase();
    return words.join('');
  }

  const getType = (formKey) => {
    switch (formKey) {
      case "Email": return "email";
      case "Password":
      case "Confirm Password":
        return "password";
      default: return "text";
    }
  }

  // <-- Event Handlers -->
  const handleChange = e => {
    const { name, value } = e.target
    setFormData((prevData) => {
      return {
        ...prevData,
        [name]: value,
      }
    })
  }

  const onSubmit = async (event) => {
    event.preventDefault();

    if (formData.confirmpassword) {
      if (formData.password !== formData.confirmpassword) {
        setErrorMsg("Passwords do not match");
        return; // break out of submit
      } else setErrorMsg('');
    }

    switch (formType) {
      case "login": signIn("form", formData); break;
      case "register":
        const fbUser = (await fireSignUp(formData))?.user;
        if (fbUser) {
          const newUserData = {...formData};
          newUserData.uid = fbUser.uid;
          fetcher.route("users").post(newUserData);
        } else setErrorMsg(`Could not ${formType}!`);
        break;
    }
    // api.postUser(formType === "register", formData, setToken, setUser);

    event.target.reset();
  }

  const handleSignInWithGoogle = async (e) => {
    e.preventDefault();
    try {
      await signIn("popup");
    } catch (error) {
      console.error("Sign-in failed:", error);
    }
  };

  // <-- Render -->
  return <div className="flex justify-center items-center">
    <section className="containerForm">
      <h2>Sign In</h2>
      <section>
        <form onSubmit={onSubmit} className="columnContainer">
          {inputKeys.map(key => {
            return <div key={key} className="inputLine">
              <label htmlFor={key}>{key}:</label>
              <input type={getType(key)} name={inputName(key)} required id={key} onChange={handleChange}></input>
            </div>
          })}
          {errorMsg && <div style={{ color: "red" }}>{errorMsg}</div>}
          <input type="submit" value={capitalize(formType)}></input>
        </form>
        <div>{(formType === "login" ? "Don't" : "Already") + " have an account? "}
          <Link to={"/" + otherFormType}>{capitalize(otherFormType)}</Link>
        </div>
        <div><GoogleButton onClick={handleSignInWithGoogle} /></div>
      </section>
    </section>
  </div>
}

export default SignInForm