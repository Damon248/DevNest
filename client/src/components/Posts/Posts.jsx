import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useGetPosts } from "../../redux/actions/postAction";
import Spinner from "../layout/Spinner";
import PostItem from "./PostItem";
import PostForm from "./PostForm";

const Posts = () => {
  const { posts, loading } = useSelector((state) => state.post);
  const getPosts = useGetPosts();
  useEffect(() => {
    getPosts();
  }, []);
  return loading ? (
    <Spinner />
  ) : (
    <>
      <h1 className="large text-primary">Posts</h1>
      <p className="lead">
        <i className="fa fa-user"></i> Welcome to the Devnest community
      </p>
      <PostForm />
      <div className="posts">
        {posts && posts.length > 0 ? (
          posts.map((post) => <PostItem key={post._id} post={post} />)
        ) : (
          <p>No posts found</p>
        )}
      </div>
    </>
  );
};

export default Posts;
