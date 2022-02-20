import React, { useContext, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import FirebaseContext from "../context/firebase";
import * as ROUTES from "../constants/routes";
import { doesUsernameExist } from "../services/firebase";
function SignUp() {
  const history = useHistory();
  const { firebase } = useContext(FirebaseContext);

  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const isInvalid = password === "" || emailAddress === "";
  useEffect(() => {}, []);

  const handleSignup = async (e) => {
    e.preventDefault();
    const usernameExists = await doesUsernameExist(username);

    if (!usernameExists) {
      try {
        const createdUserResult = await firebase
          .auth()
          .createUserWithEmailAndPassword(emailAddress, password);
        // AUTH
        // =>sending email && password && username(displayname)
        await createdUserResult.user.updateProfile({
          displayName: username,
        });

        // ¸----FIREBASE user collections create doc
        await firebase.firestore().collection("users").add({
          userId: createdUserResult.user.uid,
          username: username.toLocaleLowerCase(),
          fullName,
          emailAddress: emailAddress.toLowerCase(),
          following: [],
          followers: [],
          dateCreated: Date.now(),
        });
        history.push(ROUTES.DASHBOARD);
      } catch (error) {
        setFullName("");
        setUsername("");
        setEmailAddress("");
        setPassword("");
        setError(error.message);
      }
    } else {
      setUsername("");
      setError("That username is already taken, please try another.");
    }
  };

  return (
    <div className="container flex mx-auto max-w-screen-md items-center h-screen">
      <div className="flex w-3/5">
        <img
          alt="ihponeimage"
          src={require("../images/iphone-with-profile.jpg")}
        />
      </div>
      <div className="flex flex-col w-2/5">
        <div className="flex flex-col items-center bg-white p-4 border border-gray-primary mb-4">
          <h1 className="flex justify-center w-full">
            <img
              className="mt-2 w-6/12 mb-4"
              alt="ihponeimage"
              src={require("../images/logo.png")}
            />
          </h1>
          {error && <p className="mb-4 text-xs text-red-primary">{error}</p>}
          <form onSubmit={handleSignup}>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border-gray-primary rounded mb-2"
              placeholder="Enter your username"
              aria-label="Enter your username"
              type="text"
            />{" "}
            <input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border-gray-primary rounded mb-2"
              placeholder="Enter your full name"
              aria-label="Enter your full name"
              type="text"
            />{" "}
            <input
              value={emailAddress}
              onChange={(e) => setEmailAddress(e.target.value)}
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border-gray-primary rounded mb-2"
              placeholder="Enter address"
              aria-label="Enter your email address"
              type="text"
            />{" "}
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border-gray-primary rounded mb-2"
              placeholder="Enter Password"
              aria-label="Enter your password"
              type="password"
            />
            <button
              disabled={isInvalid}
              type="submit"
              className={`bg-blue-medium text-white w-full rounded h-8 font-bold
            ${isInvalid && "opacity-50"}`}
            >
              Sign Up
            </button>
          </form>
        </div>
        <div className="flex justify-center item-center flex-col w-full bg-white p-4 border border-gray-primary">
          <p className="text-sm">
            Already have an account?{" "}
            <Link to={ROUTES.LOGIN} className="font-bold text-blue-medium">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
