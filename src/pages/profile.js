import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { getUserByUsername } from "../services/firebase";
import * as ROUTES from "../constants/routes";
import Header from "../components/Header";

import UserProfile from "../components/profile/index";
export default function Profile() {
  const history = useHistory();
  const [user, setUser] = useState({});
  const { username } = useParams();

  useEffect(() => {
    const checkUserExist = async () => {
      const user = await getUserByUsername(username);
      if (user.length > 0) {
        setUser(user[0]);
      } else {
        history.push(ROUTES.NOT_FOUND);
      }
    };
    checkUserExist();
  }, [username, history]);

  return user?.username ? (
    <div className="bg-gray-background">
      <Header />
      <div className="mx-auto max-w-screen-lg ">
        <UserProfile user={user} />
      </div>
    </div>
  ) : (
    <h3>Loading</h3>
  );
}
