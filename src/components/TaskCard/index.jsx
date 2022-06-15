import React from "react";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import { useAuth } from "../../hooks/user-auth";

export const TaskCard = ({
  taskInfo,
  toggleDeletedTask,
  taskDeleteBatchMode,
  deleteHandle,
  statushandle,
}) => {
  const { title, description, status, _id, created_at } = taskInfo;
  const { name, surname } = useAuth();

  const openedTime = Math.trunc(
    (Date.now() - new Date(created_at)) / (1000 * 60 * 60 * 24)
  );

  return (
    <div className="task-card">
      {taskDeleteBatchMode && (
        <div style={{ position: "absolute", right: "5px" }}>
          <input type="checkbox" onClick={() => toggleDeletedTask(_id)} />
        </div>
      )}
      <Link to={`/project/${_id}`}>
        {" "}
        <h6 className="card-header1">{title}</h6>
      </Link>
      <p className="card-description" title={description}>
        {description}
      </p>
      <div className="card_details_actions">
        <div className="card-assignee1" title={`${name} ${surname}`}>
          <p className="card-assignee-text1">{`${name[0]} ${surname[0]}`}</p>
        </div>
        <Button
          title="Click to make Done"
          color={status === "done" ? "danger" : "success"}
          onClick={() => statushandle(_id)}
          className="mx-1"
        >
          {status}
        </Button>
        <Button className="mx-1" color="dark" onClick={() => deleteHandle(_id)}>
          Delete
        </Button>{" "}
      </div>

      <i
        className={`${
          openedTime < 7 ? "short-time" : "long-time"
        } time-opened-icon bx bx-dots-horizontal-rounded`}
        title={`${openedTime} Days`}
      ></i>
    </div>
  );
};
