import React, { useEffect } from "react";
import { useContext } from "react";
import { Outlet } from "react-router-dom";
import { AppContext } from "../../context/AppContext";

const UserDashBoard = () => {
  const { navigate } = useContext(AppContext);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);
  return (
    <div className="flex-1 mt-10 flex ">
      <Outlet />
    </div>
  );
};

export default UserDashBoard;
