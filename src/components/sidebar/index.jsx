import React from "react";
import User from "./User";
import Suggestions from "./Suggestions";
import useUser from "../../hooks/useUser";

export default function Sidebar() {
  const {
    user: { docId, fullname, username, userId, following },
  } = useUser();

  return (
    <div className="p-4  ">
      <User username={username} fullName={fullname} />
      <Suggestions
        userId={userId}
        following={following}
        loggedInUserDocId={docId}
      />
    </div>
  );
}
// Sidebar.whyDidYouRender = true;
