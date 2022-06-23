import React, { memo } from "react";
import { useCalculateDate } from "../../../helpers/calculateionHelper";
import { getWindowDimensions } from "../../../helpers/windowSizes";
import { useGetTaskAssigneeDetails } from "../../../hooks/users-details";
import "./styles.css";

export const TaskCard = memo(({ taskInfo, editModalOpen, deleteHandler }) => {
  // const { width } = getWindowDimensions();
  const { title, created_at, description, _id, owner, priority } = taskInfo;
  const { TotalDays } = useCalculateDate(created_at);
  const { name, surname } = useGetTaskAssigneeDetails(owner);
  return (
    <div className="task_card">
      <div className="delete_task">
        <i className="bx bxs-x-square" onClick={() => deleteHandler(_id)}></i>
      </div>
      <h6 className="task_header" onClick={() => editModalOpen(taskInfo)}>
        {title}
      </h6>
      <p className="task_description">{description}</p>
      <div className="task_details">
        <div className="time_and_priority">
          <i
            className={`${
              TotalDays < 7 ? "short-time" : "long-time"
            } time-opened-icons bx bx-dots-horizontal-rounded`}
            title={`${TotalDays} Days`}
          ></i>
          <i
            className={
              priority === "minor"
                ? "minor_priority priority_icons bx bxs-chevrons-down"
                : "major_priority priority_icons bx bxs-chevrons-up"
            }
            title={priority}
          ></i>
        </div>

        <div className="assignee_details">
          <p title={name !== null ? `${name} ${surname}` : "Unassigned"}>
            {name !== null ? `${name[0]} ${surname[0]}` : "U"}
          </p>
        </div>
      </div>
    </div>
  );
});
