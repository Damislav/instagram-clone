import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
export default function SuggestedProfile({
  spDocId,
  username,
  profileId,
  loggedInUserDocId,
  userId,
}) {
  const [followed, setFollowed] = useState(false);

  async function handleFollowers() {
    setFollowed(true);
  }

  return !followed ? (
    <div className="flex flex-row items-center align-items justify-between">
      <div className="flex items-center just">
        <img
          alt=""
          src={`./images/avatars/${username}.jpg`}
          className="rounded   w-8 flex mr-3"
        />
        <Link to={`/p/${username}`}>
          <p className="font-bold text-sm ">{username}</p>
        </Link>
      </div>

      <button
        type="button"
        onClick={() => console.log("follow thi user")}
        className="text-xs font-bold text-blue-medium"
      >
        Follow
      </button>
    </div>
  ) : null;
}

SuggestedProfile.propTypes = {
  spDocId: PropTypes.string.isRequired,
  profileId: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  fullName: PropTypes.string.isRequired,
  loggedInUserDocId: PropTypes.string,
};
