import axios from "axios";
import { useAlertAction } from "../actions/alertAction";
import { useDispatch } from "react-redux";
import {
  clearProfile,
  getProfile,
  getProfiles,
  getRepos,
  profileError,
  updateProfile,
} from "../features/profile/profileSlice";
import { accountDeleted } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

// Get current user's profile
export const useGetCurrentProfile = () => {
  const dispatch = useDispatch();

  const getCurrentProfile = async () => {
    try {
      const res = await axios.get("/api/profile/me");
      dispatch(getProfile(res.data));
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

// Get all profiles
export const useGetAllProfiles = () => {
  const dispatch = useDispatch();

  const getAllProfiles = async () => {
    dispatch(clearProfile());
    try {
      const res = await axios.get("/api/profile");
      dispatch(getProfiles(res.data));
    } catch (error) {
      dispatch(
        profileError({
          msg: error.response.statusText,
          status: error.response.status,
        })
      );
    }
  };

  return getAllProfiles;
};

// Get profile by id
export const useGetProfileById = () => {
  const dispatch = useDispatch();

  const getProfileById = async (userId) => {
    try {
      const res = await axios.get(`/api/profile/user/${userId}`);
      dispatch(getProfile(res.data));
    } catch (error) {
      dispatch(
        profileError({
          msg: error.response.statusText,
          status: error.response.status,
        })
      );
    }
  };

  return getProfileById;
};
// Get Github repos
export const useGetGithubRepos = () => {
  const dispatch = useDispatch();

  const getGithubRepos = async (username) => {
    try {
      const res = await axios.get(`/api/profile/github/${username}`);
      dispatch(getRepos(res.data));
    } catch (error) {
      dispatch(
        profileError({
          msg: error.response.statusText,
          status: error.response.status,
        })
      );
    }
  };

  return getGithubRepos;
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

// Delete experience
export const useDeleteProfileExperience = () => {
  const dispatch = useDispatch();
  const alert = useAlertAction();
  const deleteProfileExperience = async (id) => {
    try {
      const res = await axios.delete(`/api/profile/experience/${id}`);
      dispatch(updateProfile(res.data));
      alert("Experience removed successfully.", "success");
    } catch (error) {
      dispatch(
        profileError({
          msg: error.response.statusText,
          status: error.response.status,
        })
      );
    }
  };
  return deleteProfileExperience;
};

// Delete education
export const useDeleteProfileEducation = () => {
  const dispatch = useDispatch();
  const alert = useAlertAction();
  const deleteProfileEducation = async (id) => {
    try {
      const res = await axios.delete(`/api/profile/education/${id}`);
      dispatch(updateProfile(res.data));
      alert("Education removed successfully.", "success");
    } catch (error) {
      dispatch(
        profileError({
          msg: error.response.statusText,
          status: error.response.status,
        })
      );
    }
  };
  return deleteProfileEducation;
};

// Delete account & profile
export const useDeleteAccount = () => {
  const dispatch = useDispatch();
  const alert = useAlertAction();
  const deleteAccount = async () => {
    if (
      window.confirm(
        "Are you sure you want to delete your account? This can not be undone."
      )
    ) {
      try {
        await axios.delete("/api/profile");
        dispatch(clearProfile());
        dispatch(accountDeleted());
        alert("Account has been deleted permanantly.");
      } catch (error) {
        dispatch(
          profileError({
            msg: error.response.statusText,
            status: error.response.status,
          })
        );
      }
    }
  };
  return deleteAccount;
};
