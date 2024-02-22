import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  post: null,
  posts: [],
  loading: true,
  errors: {},
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    get_Posts: (state, action) => {
      state.posts = action.payload;
      state.loading = false;
    },
    get_Post: (state, action) => {
      state.post = action.payload;
      state.loading = false;
    },
    postError: (state, action) => {
      state.errors = action.payload;
      state.loading = false;
    },
    updateLikes: (state, action) => {
      state.posts = state.posts.map((post) =>
        post._id === action.payload.id
          ? { ...post, likes: action.payload.likes }
          : post
      );
      state.loading = false;
    },
    delete_Post: (state, action) => {
      state.posts = state.posts.filter((post) => post._id !== action.payload);
      state.loading = false;
    },
    createPost: (state, action) => {
      state.posts = [action.payload, ...state.posts];
      state.loading = false;
    },
    createComment: (state, action) => {
      state.post = { ...state.post, comments: action.payload };
      state.loading = false;
    },
    delete_Comment: (state, action) => {
      state.post = {
        ...state.post,
        comments: state.post.comments.filter(
          (comment) => comment._id !== action.payload
        ),
      };
      state.loading = false;
    },
  },
});

export const {
  get_Posts,
  postError,
  updateLikes,
  delete_Post,
  createPost,
  get_Post,
  createComment,
  delete_Comment,
} = postSlice.actions;

export default postSlice.reducer;
