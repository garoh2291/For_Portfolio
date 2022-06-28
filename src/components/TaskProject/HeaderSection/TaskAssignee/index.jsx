import React from "react";
import "./styles.css";

export const TaskAssignee = ({ handleOwner, handleAllTask }) => {
  return (
    <div className="task_assignee_section">
      <div className="all_task_button_section">
        <span onClick={handleAllTask}>All Tasks</span>
      </div>
      <div className="all_task_button_section">
        <span onClick={handleOwner}> Assigned to me</span>
      </div>
    </div>
  );
};
