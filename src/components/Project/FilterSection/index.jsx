import React from "react";
import { FilterHeader } from "./FilterHeader";
import { useAuth } from "../../../hooks/user-auth";
import "./styles.css";
import { FilterContent } from "./FilterContent";
import { useDispatch } from "react-redux";
import { LogOutThunk } from "../../../Redux/projectSlice";
import { useNavigate } from "react-router-dom";

export const FilterSection = ({ getTasks }) => {
  const { name, surname } = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cb = () => navigate("/auth/sign-in", { replace: true });

  const logoutUser = () => {
    dispatch(LogOutThunk(cb));
  };

  if (!name) {
    return <h1>Login</h1>;
  }
  return (
    <div className="filter-section">
      <div className="user-logo">
        <p title={`${name} ${surname}`}>
          {name[0]}
          {surname[0]}
        </p>
      </div>
      <div className="exit_user" onClick={logoutUser}>
        <i className="exit bx bx-exit"></i>
      </div>

      <FilterHeader />
      <FilterContent getTasks={getTasks} />
    </div>
  );
};
