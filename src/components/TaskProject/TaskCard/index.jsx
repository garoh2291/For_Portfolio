import React, { memo } from "react";
import { useCalculateDate } from "../../../helpers/calculateionHelper";
import { getWindowDimensions } from "../../../helpers/windowSizes";
import { useGetTaskAssigneeDetails } from "../../../hooks/users-details";
import "./styles.css";

export const TaskCard = memo(({ taskInfo }) => {
  // const { width } = getWindowDimensions();
  const { title, created_at, description, owner, priority } = taskInfo;
  const { TotalDays } = useCalculateDate(created_at);
  const { name, surname } = useGetTaskAssigneeDetails(owner);
  console.log(priority);
  return (
    <div className="task_card">
      <h6 className="task_header">{title}</h6>
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
          <p title={name ? `${name} ${surname}` : "Unassigned"}>
            {name ? `${name[0]} ${surname[0]}` : "U"}
          </p>
        </div>
      </div>
    </div>
  );
});
