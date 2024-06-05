import { useState, useEffect, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { capitalize } from "../utils/myString.cjs"
import { AuthContext } from "../auth/AuthProvider.jsx"
import { UserContext } from "./UserProvider";
import GoogleButton from "react-google-button"
import Fetcher from "../fetcher.js";
import Form, { InputData } from "./Form.jsx";

const fetcher = new Fetcher("api");

const SignInForm = () => {
  // <-- Hooks -->
  const location = useLocation();
  const navigate = useNavigate();
  const { userId, signIn, fireSignUp } = useContext(AuthContext);
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (userId && user) navigate("/");
  }, [userId, user])

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

  const inputs = [];
  for (const key of inputKeys) {
    inputs.push(new InputData({ id: key, label: key, name: inputName(key), type: getType(key), required: true }));
  }

  const createUser = (firebaseResponse, formData) => {
    const fbUser = firebaseResponse?.user;
    if (fbUser) {
      const newUserData = formData ? { ...formData } : {};
      newUserData.uid = fbUser.uid;
      newUserData.email = fbUser.email;
      if (!newUserData.username)
        newUserData.username = fbUser.displayName;

      fetcher.setToken(fbUser.accessToken).route("users").post(newUserData);
    } else setErrorMsg(`Could not ${formType}!`);
  }

  // <-- Event handlers -->
  const submitForm = async (data) => {
    if (data.confirmPassword && data.password !== data.confirmPassword) {
      return "Passwords do not match";
    }

    let result;
    switch (formType) {
      case "login":
        result = await signIn("form", data);
        if (!result) return "Invalid credentials";
        createUser(result, data);
        break;
      case "register":
        result = await fireSignUp(data);
        if (!result) return "Failed to register new user";
        createUser(result, data);
        break;
    }
  }

  const handleSignInWithGoogle = async (e) => {
    e.preventDefault();
    try {
      createUser(await signIn("popup"), true);
    } catch (error) {
      console.error("Sign-in failed:", error);
    }
  };

  // px-32 py-16

  // <-- Render -->
  return <div className="flex flex-col justify-center items-center flex-grow m-6">
    <div className="surface-color card flex flex-col flex-grow justify-center items-center py-6" style={{aspectRatio: '4/3', maxWidth: '100%'}}>
      <Form title={"Sign In"} submitFn={submitForm} inputs={inputs} />
      <div className="m-1 p-1">{(formType === "login" ? "Don't" : "Already") + " have an account? "}
        <Link to={"/" + otherFormType}>{capitalize(otherFormType)}</Link>
      </div>
      <div className="flex justify-center m-1 p-1">
        <GoogleButton onClick={handleSignInWithGoogle} />
      </div>
    </div>
  </div>
}

export default SignInForm