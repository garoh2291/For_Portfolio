import React from "react";
import { useState } from "react";
import { TaskCard } from "../TaskCard";
import "./styles.css";

export const TaskStages = ({
  stage,
  taskList,
  editModalOpen,
  deleteHandler,
}) => {
  const [isStageClosed, setIsStageClosed] = useState(false);
  const changeStageHeight = () => {
    setIsStageClosed((prev) => !prev);
  };

  return (
    <div className={isStageClosed ? "stage-colums closed" : "stage-colums"}>
      <div className="stage_header">
        <h6>{stage}</h6>
        {isStageClosed ? (
          <i className="bx bxs-down-arrow" onClick={changeStageHeight}></i>
        ) : (
          <i className="bx bxs-up-arrow" onClick={changeStageHeight}></i>
        )}
      </div>
      <div className="task_card_section">
        {taskList.length ? (
          taskList.map((task) => {
            return (
              <TaskCard
                key={task._id}
                taskInfo={task}
                editModalOpen={editModalOpen}
                deleteHandler={deleteHandler}
              />
            );
          })
        ) : (
          <p>No tasks</p>
        )}
      </div>
    </div>
  );
};
