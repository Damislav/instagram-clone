import React, { useState, useEffect, useContext } from "react";
import { getSuggestedProfiles, getUserProfiles } from "../../services/firebase";
import UserContext from "../../context/user";
import PropTypes from "prop-types";
import Skeleton from "react-loading-skeleton";

const Suggestions = ({ userId, following }) => {
  const [profiles, setProfiles] = useState(null);
  // console.log(userId, following);
  useEffect(() => {
    async function suggestedProfiles() {
      const response = await getSuggestedProfiles(userId, following);

      setProfiles(response);
    }

    if (userId) {
      suggestedProfiles();
    }
  }, [userId]);
  console.log(profiles);
  return !profiles ? (
    <Skeleton className="mt-5" height={150} count={1} />
  ) : profiles.length > 0 ? (
    <div className="rounded flex flex-col ">
      <div className="text-sm  items-center align-items justify-between mb-2">
        <p className="font-bold text-gray-base">Suggestions for you</p>
      </div>
    </div>
  ) : null;
};

export default Suggestions;

// Suggestions.propTypes = {
//   userId: PropTypes.string,
//   following: PropTypes.array,
// };
