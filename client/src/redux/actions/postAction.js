import axios from "axios";
import { useDispatch } from "react-redux";
import {
  createComment,
  createPost,
  delete_Comment,
  delete_Post,
  get_Post,
  get_Posts,
  postError,
  updateLikes,
} from "../features/post/postSlice";
import { useAlertAction } from "./alertAction";

// Get posts
export const useGetPosts = () => {
  const dispatch = useDispatch();
  const getPosts = async () => {
    try {
      const res = await axios.get("/api/posts");
      dispatch(get_Posts(res.data));
    } catch (error) {
      dispatch(
        postError({
          msg: error.response.statusText,
          status: error.response.status,
        })
      );
    }
  };
  return getPosts;
};

// Add like
export const useAddLike = () => {
  const dispatch = useDispatch();
  const addLike = async (id) => {
    try {
      const res = await axios.put(`api/posts/like/${id}`);
      dispatch(updateLikes({ id, likes: res.data }));
    } catch (error) {
      postError({
        msg: error.response.statusText,
        status: error.response.status,
      });
    }
  };
  return addLike;
};

// Remove like
export const useRemoveLike = () => {
  const dispatch = useDispatch();
  const removeLike = async (id) => {
    try {
      const res = await axios.put(`api/posts/unlike/${id}`);
      dispatch(updateLikes({ id, likes: res.data }));
    } catch (error) {
      postError({
        msg: error.response.statusText,
        status: error.response.status,
      });
    }
  };
  return removeLike;
};

// Delete post
export const useDeletePost = () => {
  const dispatch = useDispatch();
  const setAlert = useAlertAction();
  const deletePost = async (id) => {
    try {
      await axios.delete(`api/posts/${id}`);
      dispatch(delete_Post(id));
      setAlert("Post has been deleted!", "success");
    } catch (error) {
      postError({
        msg: error.response.statusText,
        status: error.response.status,
      });
    }
  };
  return deletePost;
};

// Create post
export const useAddPost = () => {
  const dispatch = useDispatch();
  const setAlert = useAlertAction();
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const addPost = async (formData) => {
    try {
      const res = await axios.post("/api/posts", formData, config);
      dispatch(createPost(res.data));
      setAlert("Post has been created!", "success");
    } catch (error) {
      postError({
        msg: error.response.statusText,
        status: error.response.status,
      });
    }
  };
  return addPost;
};

// Get post by id
export const useGetPostById = () => {
  const dispatch = useDispatch();
  const getPostById = async (id) => {
    try {
      const res = await axios.get(`/api/posts/${id}`);
      dispatch(get_Post(res.data));
    } catch (error) {
      dispatch(
        postError({
          msg: error.response.statusText,
          status: error.response.status,
        })
      );
    }
  };
  return getPostById;
};

// Add comment
export const useAddComment = () => {
  const dispatch = useDispatch();
  const setAlert = useAlertAction();
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const addComment = async (postId, formData) => {
    try {
      const res = await axios.post(
        `/api/posts/comment/${postId}`,
        formData,
        config
      );
      dispatch(createComment(res.data));
      setAlert("Comment added successfully!", "success");
    } catch (error) {
      postError({
        msg: error.response.statusText,
        status: error.response.status,
      });
    }
  };
  return addComment;
};

// Delete comment
export const useDeleteComment = () => {
  const dispatch = useDispatch();
  const setAlert = useAlertAction();

  const deleteComment = async (postId, commentId) => {
    try {
      await axios.delete(`/api/posts/comment/${postId}/${commentId}`);
      dispatch(delete_Comment(commentId));
      setAlert("Comment deleted successfully!", "success");
    } catch (error) {
      postError({
        msg: error.response.statusText,
        status: error.response.status,
      });
    }
  };
  return deleteComment;
};
