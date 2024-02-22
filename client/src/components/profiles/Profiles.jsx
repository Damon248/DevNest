import React, { useEffect } from "react";
import { useGetAllProfiles } from "../../redux/actions/profileAction";
import { useSelector } from "react-redux";
import Spinner from "../layout/Spinner";
import ProfileItem from "./ProfileItem";

const Profiles = () => {
  const getAllProfiles = useGetAllProfiles();
  useEffect(() => {
    getAllProfiles();
  }, []);

  const { profiles, loading } = useSelector((state) => state.profile);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <h1 className="large text-primary">Developers</h1>
          <p className="lead">
            <i className="fab fa-connectdevelop"></i> Browse and connect with
            developers
          </p>
          <div className="profiles">
            {profiles.length > 0 ? (
              profiles.map((profile) => (
                <ProfileItem key={profile.id} profile={profile} />
              ))
            ) : (
              <h4>No profiles yet...</h4>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default Profiles;
