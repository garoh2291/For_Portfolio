import React from "react";
import { useSelector } from "react-redux";
import { PreLoader } from "../../../Pages/PreLoader";
import { TaskStages } from "../TaskStages";
import "./styles.css";
export const MainSection = () => {
  const { tasks } = useSelector((state) => state.project);

  if (!tasks) {
    return <PreLoader />;
  }
  const backlogTasks = tasks.filter((task) => task.status === "backlog");
  const inProgressTasks = tasks.filter((task) => task.status === "in progress");
  const doneTasks = tasks.filter((task) => task.status === "done");

  return (
    <div className="main_section_layout">
      <TaskStages stage="backlog" taskList={backlogTasks} />
      <TaskStages stage="in progress" taskList={inProgressTasks} />
      <TaskStages stage="done" taskList={doneTasks} />
    </div>
  );
};
