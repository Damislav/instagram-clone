import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Skeleton from "react-loading-skeleton";
import useUser from "../../hooks/useUser";
import { isUserFollowingProfile } from "../../services/firebase";
export default function Header({
  setFollowerCount,
  photosCount,
  followerCount,
  profile: {
    docId: profileDocId,
    userId: profileUserId,
    fullName,
    following = [],
    followers = [],
    username: profileUsername,
  },
}) {
  const { user } = useUser();
  const [isFollowingProfile, setIsFollowingProfile] = useState(false);
  const activeBtnFollow = user.username && user.username !== profileUsername;

  const handleToggleFollow = () => {
    setIsFollowingProfile((isFollowingProfile) => !isFollowingProfile);

    setFollowerCount({
      followerCount: isFollowingProfile
        ? Number(followers - 1)
        : Number(followers + 1),
    });
  };

  useEffect(() => {
    const isLoggedInUserFollowingProfile = async () => {
      const isFollowing = await isUserFollowingProfile(
        user.username,
        profileUserId
      );
      setIsFollowingProfile(!!isFollowing);
    };
    if (user.username && profileUserId) {
      isLoggedInUserFollowingProfile();
    }
  }, [user.username, profileUserId]);
  return (
    <div className="grid grid-cols-3 gap-4 mx-auto justify-between max-w-screen-lg">
      <div className="container flex justify-center">
        {user.username && (
          <img
            className="rounded-full h-40 w-40 flex"
            alt={`${user.username}`}
            src={`/images/avatars/${profileUsername}.jpg`}
          />
        )}
      </div>
      <div className="flex items-center justify-center flex-col col-span-2">
        <div className="container flex items-center ">
          <p className="text-2xl mr-4">{profileUsername}</p>
          {activeBtnFollow && (
            <button
              onClick={handleToggleFollow}
              className="bg-blue-medium font-bold text-sm rounded text-white w-20 h-8"
              type="button"
            >
              {isFollowingProfile ? "   Unfollow" : "Follow"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

Header.propTypes = {
  setFollowerCount: PropTypes.func.isRequired,
  photosCount: PropTypes.number.isRequired,
  followerCount: PropTypes.number.isRequired,
  profile: PropTypes.shape({
    docId: PropTypes.string,
    userId: PropTypes.string,
    fullName: PropTypes.string,
    following: PropTypes.array.isRequired,
    follower: PropTypes.array,
    profileUsername: PropTypes.string,
  }),
};
