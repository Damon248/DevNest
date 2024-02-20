import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  profile: null,
  profiles: [],
  repos: [],
  loading: true,
  errors: {},
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    getProfile: (state, action) => {
      state.profile = action.payload;
      state.loading = false;
    },
    getProfiles: (state, action) => {
      state.profiles = action.payload;
      state.loading = false;
    },
    clearProfile: (state) => {
      state.profile = null;
      state.repos = [];
      state.loading = false;
    },
    profileError: (state, action) => {
      state.errors = action.payload;
      state.loading = false;
    },
    updateProfile: (state, action) => {
      state.profile = action.payload;
      state.loading = false;
    },
    getRepos: (state, action) => {
      state.repos = action.payload;
      state.loading = false;
    },
  },
});

export const {
  getProfile,
  getProfiles,
  profileError,
  clearProfile,
  updateProfile,
  getRepos,
} = profileSlice.actions;

export default profileSlice.reducer;
