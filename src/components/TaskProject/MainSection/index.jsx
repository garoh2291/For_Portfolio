import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { getWindowDimensions } from "../../../helpers/windowSizes";
import { PreLoader } from "../../../Pages/PreLoader";
import { deleteTaskThunk } from "../../../Redux/projectSlice";
import { TaskStages } from "../TaskStages";
import "./styles.css";
export const MainSection = ({ getTasks, editModalOpen }) => {
  const { tasks } = useSelector((state) => state.project);
  const dispatch = useDispatch();
  const deleteHandler = (_id) => {
    dispatch(deleteTaskThunk(_id));
  };

  const { width } = getWindowDimensions();

  if (!tasks) {
    return <PreLoader />;
  }
  const backlogTasks = tasks.filter((task) => task.status === "backlog");
  const inProgressTasks = tasks.filter((task) => task.status === "in progress");
  const doneTasks = tasks.filter((task) => task.status === "done");

  return (
    <div className="main_section_layout">
      <TaskStages
        stage="backlog"
        taskList={backlogTasks}
        editModalOpen={editModalOpen}
        deleteHandler={deleteHandler}
      />
      <TaskStages
        stage="in progress"
        taskList={inProgressTasks}
        editModalOpen={editModalOpen}
        deleteHandler={deleteHandler}
      />
      <TaskStages
        stage="done"
        taskList={doneTasks}
        editModalOpen={editModalOpen}
        deleteHandler={deleteHandler}
      />
      {width < 850 && (
        <div className="submenu">
          <div className="submenu_content">
            <div className="add_new_task">
              <div className="add_new_task_content">
                <span className="add_new_task_text">+</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
