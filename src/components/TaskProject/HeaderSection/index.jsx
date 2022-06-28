import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LogOutThunk } from "../../../Redux/projectSlice";
import { SearchMethod } from "../../smallComponents/CheckComponent";
import { SortSelect } from "../../smallComponents/SortComponent";
import { Search } from "./Search";
import "./styles.css";
import { TaskAssignee } from "./TaskAssignee";

export const HeaderSection = ({ getTasks, setAddNewTaskModal }) => {
  const { name, surname, _id } = useSelector((state) => state.project.user);
  const navigate = useNavigate();
  const cb = () => navigate("/auth/sign-in", { replace: true });
  const dispatch = useDispatch();
  const logoutUser = () => {
    dispatch(LogOutThunk(cb));
  };

  const handleSearch = (event) => {
    const { value } = event.target;
    getTasks({
      queryRoute: "search",
      queryValue: value,
    });
  };
  const handleOwner = () => {
    getTasks({
      queryRoute: "owner",
      queryValue: _id,
    });
  };

  const handleAllTask = () => {
    getTasks({
      queryRoute: "owner",
      queryValue: "",
    });
  };

  const handleSort = (event) => {
    const { value } = event.target;
    getTasks({
      queryRoute: "sort",
      queryValue: value,
    });
  };

  if (!name) {
    return <h3>Loading...</h3>;
  }

  return (
    <div className="project_header_layout">
      <div className="head_section_log">
        <div className="logged_user">
          {" "}
          <p title={`${name} ${surname}`}>
            {name[0]} {surname[0]}
          </p>
        </div>
        <div className="logout_section">
          <i onClick={logoutUser} className="bx bx-log-out"></i>
        </div>
      </div>

      <Search handleSearch={handleSearch} />
      <div className="new_task_add_section">
        <span onClick={setAddNewTaskModal}>Add New Task</span>
      </div>

      <TaskAssignee handleOwner={handleOwner} handleAllTask={handleAllTask} />
      <h6 className="sort_content_head">Sort by</h6>

      <SortSelect handleSort={handleSort} />
      <SearchMethod getTasks={getTasks} />
    </div>
  );
};
