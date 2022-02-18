import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import { formatDistance } from "date-fns";
import { Link } from "react-router-dom";
import AddComment from "./AddComment";

export default function Comments({
  docId,
  comments: allComments,
  posted,
  commentInput,
}) {
  const [comments, setComments] = useState(allComments);

  return (
    <>
      <div className="p-4 pt-1 pb-4">
        {allComments.length >= 3 && (
          <p className="text-sm text-gray-base mb-1 cursor-pointer">
            View all comments {comments.length} comments
          </p>
        )}
        {comments.slice(0, 3).map((item) => {
          return (
            <p className="mb-1" key={`${item.comment}`}>
              <Link to={`/p/${item.displayName}`}>
                <span className="mr-1 font-bold">{item.displayName}</span>
              </Link>
              <span>{item.comment}</span>
            </p>
          );
        })}
        <p className="text-gray-base uppercase mt-2 text-xs">
          {formatDistance(posted, new Date())}ago
        </p>
      </div>
      <AddComment
        commentInput={commentInput}
        docId={docId}
        comments={comments}
        setComments={setComments}
      />
    </>
  );
}

Comments.propTypes = {
  docId: PropTypes.string.isRequired,
  comments: PropTypes.array.isRequired,
  posted: PropTypes.number.isRequired,
  commentInput: PropTypes.object.isRequired,
};
