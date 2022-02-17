import React, { useState, useEffect, useContext } from "react";
import { getSuggestedProfiles, getUserProfiles } from "../../services/firebase";
import UserContext from "../../context/user";
import PropTypes from "prop-types";
import Skeleton from "react-loading-skeleton";

import SuggestedProfile from "./SuggestedProfile";

const Suggestions = ({ userId, following, loggedInUserDocId }) => {
  const [profiles, setProfiles] = useState(null);

  useEffect(() => {
    async function suggestedProfiles() {
      const response = await getSuggestedProfiles(userId, following);

      setProfiles(response);
    }

    if (userId) {
      suggestedProfiles();
    }
  }, [userId]);

  return !profiles ? (
    <Skeleton className="mt-5" height={150} count={1} />
  ) : profiles.length > 0 ? (
    <div className="rounded flex flex-col ">
      <div className="text-sm  items-center align-items justify-between mb-2">
        <p className="font-bold text-gray-base">Suggestions for you</p>
      </div>
      <div className="mb-4 grid gap-5">
        {profiles.map((profile) => {
          return (
            <SuggestedProfile
              loggedInUserDocId={loggedInUserDocId}
              fullName={profile.fullName}
              profileId={profile.userId}
              username={profile.username}
              spDocId={profile.docId}
              userId={profile.userId}
              key={profile.docId}
            />
          );
        })}
      </div>
    </div>
  ) : null;
};

export default Suggestions;

Suggestions.propTypes = {
  userId: PropTypes.string,
  following: PropTypes.array,
  loggedInUserDocId: PropTypes.string,
};
