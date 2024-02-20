import React, { useEffect } from "react";
import Spinner from "../layout/Spinner";
import {
  useDeleteAccount,
  useGetCurrentProfile,
} from "../../redux/actions/profileAction";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import DashboardActions from "./DashboardActions";
import Experience from "./Experience";
import Education from "./Education";

const Dashboard = () => {
  const getCurrentProfile = useGetCurrentProfile();
  const { profile, loading } = useSelector((state) => state.profile);
  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);
  const deleteAccount = useDeleteAccount();

  return loading && profile === null ? (
    <Spinner />
  ) : (
    <>
      <h1 className="large text-primary">Dashboard</h1>
      <p className="lead">
        <i className="fa fa-user"></i> Welcome {user && user.name}
      </p>
      {profile !== null ? (
        <>
          <DashboardActions />
          <Experience experience={profile.experience} />
          <Education education={profile.education} />
          <div className="my-2">
            <button className="btn btn-danger" onClick={() => deleteAccount()}>
              <i className="fa fa-solid fa-trash"></i> Delete My Account
            </button>
          </div>
        </>
      ) : (
        <>
          <p>You haven't set a profile yet, please add your info...</p>
          <Link to={"/create-profile"} className="btn btn-primary my-1">
            Create Profile
          </Link>
        </>
      )}
    </>
  );
};

export default Dashboard;
