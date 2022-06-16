import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "reactstrap";
import { PreLoader } from "../../../../Pages/PreLoader/index";
import {
  changeStatusThink,
  deleteTaskThunk,
  removeMultitapleTasksThunk,
} from "../../../../Redux/projectSlice";
import { NoTasks } from "../../../NoTask";
import { TaskCard } from "../../../TaskCard";
import "./styles.css";
export const Body = () => {
  const { tasks,status } = useSelector((state) => state.project);
  const dispatch = useDispatch();
  const [deletedTasksSet, setDeletedTasksSet] = useState(new Set());

  const [taskDeleteBatchMode, setTaskDeleteBatchMode] = useState(false);

  const toggleDeletedTask = useCallback((_id) => {
    setDeletedTasksSet((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(_id)) {
        newSet.delete(_id);
      } else {
        newSet.add(_id);
      }
      return newSet;
    });
  }, []);

  const handleBatchDelete = (setFunc) => {
    const batchDelTasks = Array.from(deletedTasksSet);
    deletedTasksSet.clear();
    dispatch(removeMultitapleTasksThunk(batchDelTasks));
  };

  const deleteHandle = (_id) => {
    dispatch(deleteTaskThunk(_id));
  };

  const changeEditMode = () => {
    deletedTasksSet.clear();

    setTaskDeleteBatchMode((prev) => !prev);
    console.log(deletedTasksSet);

  };

  const statushandle = (_id) => {
    dispatch(changeStatusThink(_id));
  };

  if (status === "loading"){
    console.log(status);
  }

  if (!tasks) {
    return <PreLoader />;
  }
  if (tasks.length === 0) {
    return <NoTasks />
  }

  return (
    <>
      {" "}
      <div className="editor-mode">
        <i className="bx bxs-edit" onClick={changeEditMode}></i>
      </div>
      <div className="delete-batch">
        {!!deletedTasksSet.size && (
          <Button color="danger" onClick={() => handleBatchDelete()}>
            Delete All
          </Button>
        )}
      </div>
      <div className="main-section-body-open">
        {tasks.map((task) => (
          <TaskCard
            taskInfo={task}
            statushandle={statushandle}
            key={task._id}
            toggleDeletedTask={toggleDeletedTask}
            taskDeleteBatchMode={taskDeleteBatchMode}
            deleteHandle={deleteHandle}
          />
        ))}
      </div>
    </>
  );
};
