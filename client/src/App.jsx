import "./App.css";
import { Outlet } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import setAuthToken from "./utils/setAuthToken";
import { useEffect } from "react";
import { useLoadUser } from "./redux/actions/authAction";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  const loadUser = useLoadUser();
  useEffect(() => {
    loadUser();
  }, []);

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default App;
