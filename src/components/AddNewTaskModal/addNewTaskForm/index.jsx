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

export const AddTaskForm = ({ onSubmitCallback }) => {
  const [completeDate, setCompleteDate] = useState(new Date());
  const dispatch = useDispatch();
  const [inputsData, handleChange] = useAddTaskForm();

  const onSubmit = (e) => {
    e.preventDefault();
    const newTaskObj = {
      title: inputsData.title.value,
      description: inputsData.description.value,
      date: moment(completeDate).format("YYYY-MM-DD"),
    };
    dispatch(addTaskThunk({ newTaskObj, onSubmitCallback }));
  };

  return (
    <Form onSubmit={onSubmit}>
      <FormGroup>
        <Label for="titleId">Title</Label>
        <Input
          id="titleId"
          name="title"
          placeholder="Task title"
          type="text"
          onChange={handleChange}
          invalid={!!inputsData.title.error}
        />
        {!!inputsData.title.error && (
          <FormFeedback>{inputsData.title.error}</FormFeedback>
        )}
      </FormGroup>
      <FormGroup>
        <Label for="descriptionId">Description</Label>
        <Input
          id="descriptionId"
          name="description"
          placeholder="Task description"
          type="text"
          onChange={handleChange}
          invalid={!!inputsData.description.error}
        />
        {!!inputsData.description.error && (
          <FormFeedback>{inputsData.description.error}</FormFeedback>
        )}
      </FormGroup>
      <DatePicker
        selected={completeDate}
        onChange={(date) => setCompleteDate(date)}
      />
      <Button style={{ marginTop: "20px" }} color="primary" onClick={onSubmit}>
        Add Task
      </Button>{" "}
    </Form>
  );
};
