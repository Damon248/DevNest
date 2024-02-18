import { useDispatch } from "react-redux";
import {
  registerSuccess,
  registerFail,
  userLoaded,
  authError,
  loginSuccess,
  loginFail,
  logOut,
} from "../features/auth/authSlice";
import { useAlertAction } from "./alertAction";
import axios from "axios";
import setAuthToken from "../../utils/setAuthToken";
import { clearProfile } from "../features/profile/profileSlice";

// Register user
export const useRegisterUser = () => {
  const dispatch = useDispatch();
  const alertAction = useAlertAction();
  const loadUser = useLoadUser();

  const registerUser = async (name, email, password) => {
    const newUser = {
      name,
      email,
      password,
    };
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const body = JSON.stringify(newUser);
      const res = await axios.post("/api/users", body, config);
      dispatch(registerSuccess(res.data));
      loadUser();
    } catch (error) {
      const errors = error.response.data.errors;
      if (errors) {
        errors.forEach((error) => alertAction(error.msg, "danger"));
      }
      dispatch(registerFail());
    }
  };

  return registerUser;
};

// Login user
export const useLoginUser = () => {
  const dispatch = useDispatch();
  const alertAction = useAlertAction();
  const loadUser = useLoadUser();

  const loginUser = async (email, password) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const body = JSON.stringify({ email, password });
      const res = await axios.post("/api/auth", body, config);
      dispatch(loginSuccess(res.data));
      loadUser();
    } catch (error) {
      const errors = error.response.data.errors;
      if (errors) {
        errors.forEach((error) => {
          alertAction(error.msg, "danger");
        });
      }
      dispatch(loginFail());
    }
  };

  return loginUser;
};

// Logout user & clear profile

export const useLogoutUser = () => {
  const dispatch = useDispatch();
  const logOutUser = () => {
    dispatch(logOut());
    dispatch(clearProfile());
  };
  return logOutUser;
};

// Load user
export const useLoadUser = () => {
  const dispatch = useDispatch();
  const loadUser = async () => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    try {
      const res = await axios.get("/api/auth");
      dispatch(userLoaded(res.data));
    } catch (error) {
      dispatch(authError());
    }
  };
  return loadUser;
};
