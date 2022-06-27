import { useState } from "react";
import {
  Button,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Label,
} from "reactstrap";
import * as moment from "moment";
import DatePicker from "react-datepicker";
import { useDispatch } from "react-redux";
import { addTaskThunk } from "../../../Redux/projectSlice";
import { useAddTaskForm } from "../../../helpers/forms";
import "./styles.css";

export const AddTaskForm = ({ onSubmitCallback }) => {
  const [completeDate, setCompleteDate] = useState(new Date());
  const dispatch = useDispatch();
  const [inputsData, handleChange] = useAddTaskForm();

  const AddNewTask = (e) => {
    e.preventDefault();
    const newTaskObj = {
      title: inputsData.title.value,
      description: inputsData.description.value,
      date: moment(completeDate).format("YYYY-MM-DD"),
    };
    dispatch(addTaskThunk({ newTaskObj, onSubmitCallback }));
  };

  return (
    <div className={"add_new_task_form_section"}>
      <form onSubmit={AddNewTask} className={"new_task_form"}>
        <input
          id="titleId"
          name="title"
          placeholder="Task title"
          type="text"
          onChange={handleChange}
        />
      </form>
    </div>
  );
};
