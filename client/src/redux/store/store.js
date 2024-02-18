import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import alertReducer from "../features/alert/alertSlice";
import profileReducer from "../features/profile/profileSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    alert: alertReducer,
    profile: profileReducer,
  },
});

export default store;
