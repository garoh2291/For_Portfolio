import React, {  useState } from "react";
import { AddNewTaskModal } from "../../../AddNewTaskModal";
import { NewTaskButton } from "../../../smallComponents/NewTaskButton";
import { SearchInput } from "../../../smallComponents/SearchInput";
import { SortSelect } from "../../../smallComponents/SortComponent";

import "./styles.css";

export const Header = ({ getTasks }) => {
  const [isShowAddTaskModal, setIsShowAddTaskModal] = useState(false);
  const handleBtnClick = () => {
    if (isShowAddTaskModal) {
      setIsShowAddTaskModal(false);
    } else {
      setIsShowAddTaskModal(true);
    }
  };

  const handleSearch = (event) => {
    const { value } = event.target;
    getTasks({
      queryRoute: "search",
      queryValue: value,
    });
  };

  const handleSort = (event) => {
    const { value } = event.target;
    getTasks({
      queryRoute: "sort",
      queryValue: value,
    });
  };
  return (
    <div className="main_section_header">
      <div className="headerComponents">
        <div className="sort_section">
          <p>Sort By</p>
          <SortSelect handleSort={handleSort} />
        </div>
        <div className="add_new_task_button_section">
          <NewTaskButton handleBtnClick={handleBtnClick} />
        </div>
      </div>

      <SearchInput handleSearch={handleSearch} />
      {isShowAddTaskModal && (
        <AddNewTaskModal
          onClose={() => {
            setIsShowAddTaskModal(false);
          }}
        />
      )}
    </div>
  );
};
