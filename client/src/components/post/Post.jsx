import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { useGetPostById } from "../../redux/actions/postAction";
import Spinner from "../layout/Spinner";
import PostItem from "../Posts/PostItem";
import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";

const Post = () => {
  const { post, loading } = useSelector((state) => state.post);
  const postId = useParams();
  const getPostById = useGetPostById();
  useEffect(() => {
    getPostById(postId.id);
  }, []);
  return loading || post === null ? (
    <Spinner />
  ) : (
    <>
      <Link to={"/posts"} className="btn">
        Back to the Posts
      </Link>
      <PostItem post={post} showActions={false} />
      <CommentForm postId={postId.id} />
      <div className="comments">
        {post.comments.map((comment) => (
          <CommentItem key={comment._id} comment={comment} postId={postId.id} />
        ))}
      </div>
    </>
  );
};

export default Post;
