import axios from "axios";
import { useAlertAction } from "../actions/alertAction";
import { useDispatch } from "react-redux";
import {
  getProfile,
  profileError,
  updateProfile,
} from "../features/profile/profileSlice";
import { useNavigate } from "react-router-dom";

// Get current user's profile
export const useGetCurrentProfile = () => {
  const dispatch = useDispatch();
  // const alert = useAlertAction();

  const getCurrentProfile = async () => {
    try {
      const res = await axios.get("/api/profile/me");
      dispatch(getProfile(res.data));
      // alert("Profile has been fetched successfully!", "success");
    } catch (error) {
      dispatch(
        profileError({
          msg: error.response.statusText,
          status: error.response.status,
        })
      );
    }
  };

  return getCurrentProfile;
};

// Create/update profile
export const useCreateProfile = () => {
  const dispatch = useDispatch();
  const alert = useAlertAction();
  const navigate = useNavigate();
  const createProfile = async (formData, edit = false) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await axios.post("/api/profile", formData, config);
      dispatch(getProfile(res.data));
      alert(
        edit
          ? "Profile has been updated successfully!"
          : "Profile has been created successfully!",
        "success"
      );
      navigate("/dashboard");
    } catch (error) {
      const errors = error.response.data.errors;
      if (errors) {
        errors.forEach((error) => {
          alert(error.msg, "danger");
        });
      }
      dispatch(
        profileError({
          msg: error.response.statusText,
          status: error.response.status,
        })
      );
    }
  };
  return createProfile;
};

// Add experience to the profile
export const useAddProfileExperience = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlertAction();
  const addProfileExperience = async (formData) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await axios.put("/api/profile/experience", formData, config);
      dispatch(updateProfile(res.data));
      alert("Experience added.", "success");
      navigate("/dashboard");
    } catch (error) {
      const errors = error.response.data.errors;
      if (errors) {
        errors.forEach((error) => {
          alert(error.msg, "danger");
        });
      }
      dispatch(
        profileError({
          msg: error.response.statusText,
          status: error.response.status,
        })
      );
    }
  };
  return addProfileExperience;
};

// Add education to the profile
export const useAddProfileEducation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlertAction();
  const addProfileEducation = async (formData) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await axios.put("/api/profile/education", formData, config);
      dispatch(updateProfile(res.data));
      alert("Education added.", "success");
      navigate("/dashboard");
    } catch (error) {
      const errors = error.response.data.errors;
      if (errors) {
        errors.forEach((error) => {
          alert(error.msg, "danger");
        });
      }
      dispatch(
        profileError({
          msg: error.response.statusText,
          status: error.response.status,
        })
      );
    }
  };
  return addProfileEducation;
};
