import React from "react";
import ReactDOM from "react-dom/client";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import PrivateRoute from "./routing/privateRoute";
import Landing from "./components/layout/Landing";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import App from "./App";
import { Provider } from "react-redux";
import store from "../src/redux/store/store";
import Alert from "./components/layout/Alert";
import Dashboard from "./components/dashboard/Dashboard";
import CreateProfile from "./components/profile-forms/CreateProfile";
import EditProfile from "./components/profile-forms/EditProfile";
import AddExperience from "./components/profile-forms/AddExperience";
import AddEducation from "./components/profile-forms/AddEducation";
import Profiles from "./components/profiles/Profiles";
import Profile from "./components/profile/Profile";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="" element={<Landing />} />
      <Route
        path="login"
        element={
          <section className="container">
            <Alert />
            <Login />
          </section>
        }
      />
      <Route
        path="register"
        element={
          <section className="container">
            <Alert />
            <Register />
          </section>
        }
      />
      <Route
        path="dashboard"
        element={
          <section className="container">
            <Alert />
            <PrivateRoute Component={Dashboard} />
          </section>
        }
      />
      <Route
        path="create-profile"
        element={
          <section className="container">
            <Alert />
            <PrivateRoute Component={CreateProfile} />
          </section>
        }
      />
      <Route
        path="edit-profile"
        element={
          <section className="container">
            <Alert />
            <PrivateRoute Component={EditProfile} />
          </section>
        }
      />
      <Route
        path="add-experience"
        element={
          <section className="container">
            <Alert />
            <PrivateRoute Component={AddExperience} />
          </section>
        }
      />
      <Route
        path="add-education"
        element={
          <section className="container">
            <Alert />
            <PrivateRoute Component={AddEducation} />
          </section>
        }
      />
      <Route
        path="profiles"
        element={
          <section className="container">
            <Alert />
            <Profiles />
          </section>
        }
      />
      <Route
        path="profile/:id"
        element={
          <section className="container">
            <Alert />
            <Profile />
          </section>
        }
      />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
