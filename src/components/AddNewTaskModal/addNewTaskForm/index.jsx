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

    const {
      title: { value: title },
      description: { value: description },
      priority: { value: priority },
    } = e.target;

    const newTaskObj = {
      title,
      description,
      priority,
      date: moment(completeDate).format("YYYY-MM-DD"),
    };

    console.log(newTaskObj);
    dispatch(addTaskThunk({ newTaskObj, onSubmitCallback }));
  };

  return (
    <div className={"add_new_task_form_section"}>
      <form onSubmit={AddNewTask} className={"new_task_form"}>
        <label htmlFor="titleId">Task Title</label>
        <input
          id="titleId"
          name="title"
          placeholder="Task title"
          type="text"
          onChange={handleChange}
        />
        {!!inputsData.title.error && (
          <p className="login_validation_error_text">
            {inputsData.title.error}
          </p>
        )}
        <label htmlFor="descriptionId">Task Title</label>
        <textarea
          id="descriptionId"
          name="description"
          placeholder="Task description"
          onChange={handleChange}
        />
        {!!inputsData.description.error && (
          <p className="login_validation_error_text">
            {inputsData.description.error}
          </p>
        )}
        <p className="due_date_label">Due Date</p>
        <DatePicker
          className="add_task_date"
          selected={completeDate}
          onChange={(date) => setCompleteDate(date)}
        />
        <label htmlFor="priorityId">Task Title</label>
        <select name="priority" id="priorityId">
          <option value="minor">Minor</option>
          <option value="major">Major</option>
        </select>
        <button className="add_new_task_button">Add</button>
      </form>
    </div>
  );
};
