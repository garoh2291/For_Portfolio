import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BackButton } from "../../components/smallComponents/BackButton";
import { TaskStatusSide } from "../../components/smallComponents/TaskStatusCard";
import { PreLoader } from "../PreLoader";
import { useDispatch } from "react-redux";
import { getSingleTask } from "../../Redux/projectSlice";
import { SuccessAlert } from "../../helpers/errorHelpers";
import { EditFromSinglePage } from "../../components/smallComponents/EditFormSinglePage";
import "./styles.css";

export const SingleTask = () => {
  const [singleTask, setSingleTask] = useState(null);
  const [isChangedSuccess, setIsChangedSuccess] = useState(false);
  const dispatch = useDispatch();
  const params = useParams();
  const taskId = params.taskId;
  const navigate = useNavigate();

  const prevPageHandler = () => {
    navigate(-1);
  };

  useEffect(() => {
    dispatch(getSingleTask({ setSingleTask, taskId }));
  }, [taskId,dispatch]);

  if (!singleTask) {
    return <PreLoader />;
  }

  return (
    <div className="single-task-wrapper">
      <BackButton handlerFunction={prevPageHandler} />
      <SuccessAlert isSendSuccess={isChangedSuccess} successTitle="Success" />

      <EditFromSinglePage
        singleTask={singleTask}
        setIsChangedSuccess={setIsChangedSuccess}
      />
      <TaskStatusSide task={singleTask} />
    </div>
  );
};
