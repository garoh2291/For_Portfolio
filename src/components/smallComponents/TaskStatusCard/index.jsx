import "./styles.css";
import * as moment from "moment";
import { useAuth } from "../../../hooks/user-auth";

export const TaskStatusSide = ({ task }) => {
  const { created_at, priority, date, status } = task;
  const { name, surname } = useAuth();

  return (
    <div className="status_info">
      <h3>Status</h3>
      <p>
        Created at: <span>{moment(created_at).format("DD-MM-YYYY")}</span>
      </p>
      <p>
        Assignee :{" "}
        <span>
          {name} {surname}
        </span>{" "}
      </p>
      <p>
        Due Date: <span>{moment(date).format("DD-MM-YYYY")}</span>
      </p>
      <p>
        Priority : <span>{priority}</span>
      </p>
      <p>
        Status is{" "}
        <span style={{ color: status === "done" ? "tomato" : "green" }}>
          {status}
        </span>
      </p>
    </div>
  );
};
