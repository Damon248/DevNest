import React from "react";
import Moment from "react-moment";
import { useSelector } from "react-redux";
import {
  useAddLike,
  useDeletePost,
  useRemoveLike,
} from "../../redux/actions/postAction";
import { Link } from "react-router-dom";

const PostItem = ({
  post: { _id, name, avatar, text, user, likes, comments, date },
  showActions = true,
}) => {
  const auth = useSelector((state) => state.auth);
  const addLike = useAddLike();
  const removeLike = useRemoveLike();
  const deletePost = useDeletePost();
  return (
    <div>
      <div class="post bg-white p-1 my-1">
        <div>
          <Link to={`/profile/${user}`}>
            <img class="round-img" src={avatar} alt="" />
            <h4>{name}</h4>
          </Link>
        </div>
        <div>
          <p class="my-1">{text}</p>
          <p class="post-date">
            Posted on <Moment format="YYYY/MM/DD">{date}</Moment>
          </p>
          {showActions && (
            <>
              <button
                type="button"
                class="btn btn-light"
                onClick={(e) => addLike(_id)}
              >
                <i class="fas fa-thumbs-up"></i>
                <span>
                  {" "}
                  {likes.length > 0 && (
                    <span class="comment-count">{likes.length}</span>
                  )}
                </span>
              </button>
              <button
                type="button"
                class="btn btn-light"
                onClick={(e) => removeLike(_id)}
              >
                <i class="fas fa-thumbs-down"></i>
              </button>
              <Link to={`/posts/${_id}`} class="btn btn-primary">
                Discussion{" "}
                {comments.length > 0 && (
                  <span class="comment-count">{comments.length}</span>
                )}
              </Link>
              {!auth.loading && user === auth.user._id && (
                <button
                  type="button"
                  class="btn btn-danger"
                  onClick={(e) => deletePost(_id)}
                >
                  <i class="fas fa-trash"></i>
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostItem;
