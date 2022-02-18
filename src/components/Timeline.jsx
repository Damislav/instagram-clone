import React from "react";
import Skeleton from "react-loading-skeleton";
import usePhotos from "../hooks/usePhotos";
import Post from "./post";

export const Timeline = () => {
  const { photos } = usePhotos();

  // ¸on loading the photos we need to use react skeeleton
  // ¸if we have pohotos render them (create post)
  // ¸if user have no photos tell them to create some photos
  return (
    <div className="container col-span-2">
      {!photos ? (
        <>
          <Skeleton count={4} width={640} height={600} />s
        </>
      ) : photos.length > 0 ? (
        photos.map((content) => <Post content={content} key={content.docId} />)
      ) : (
        <p className="text-center text-2xl ">Follow people to see photos</p>
      )}
    </div>
  );
};
