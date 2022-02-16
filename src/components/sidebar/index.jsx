import React from "react";
import User from "./User";
import Suggestions from "./Suggestions";
import useUser from "../../hooks/useUser";

export default function Sidebar() {
  const {
    user: { fullname, username, userId, following },
  } = useUser();
  // console.log("sidebar", fullname, username, userId, following);
  return (
    <div className="p-4">
      <User />
      <Suggestions following={following} userId={userId} />
    </div>
  );
}
// Sidebar.whyDidYouRender = true;
