import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FormGroup, Input, Label } from "reactstrap";
import "./styles.css";

export const SearchMethod = ({ getTasks }) => {
  const [createBeforeDate, setCreateBeforeDate] = useState(new Date());
  const [createAfterDate, setCreateAfterDate] = useState(new Date());
  const [completeBeforeDate, setCompleteBeforeDate] = useState(new Date());
  const [completeAfterDate, setCompleteAfterDate] = useState(new Date());

  const checkBoxHandle = (e) => {
    const { value, name, checked } = e.target;

    if (checked) {
      getTasks({
        queryRoute: name,
        queryValue: value,
      });
    } else {
      getTasks({
        queryRoute: name,
        queryValue: "",
      });
    }
  };
  return (
    <div className="checked-components">
      <FormGroup className="check_component_wrapper">
        <FormGroup check className="mb-2">
          <Input
            type="checkbox"
            value={`${createBeforeDate.getFullYear()}-${
              createBeforeDate.getMonth() + 1
            }-${createBeforeDate.getDate()}`}
            name={"create_lte"}
            onChange={checkBoxHandle}
          />
          <Label check>Created before</Label>
          <DatePicker
            selected={createBeforeDate}
            onChange={(date) => setCreateBeforeDate(date)}
          />
        </FormGroup>
        <FormGroup check className="mb-2">
          <Input
            type="checkbox"
            name={"create_gte"}
            onChange={checkBoxHandle}
            value={`${createAfterDate.getFullYear()}-${
              createAfterDate.getMonth() + 1
            }-${createAfterDate.getDate()}`}
          />
          <Label check>Created after</Label>
          <DatePicker
            selected={createAfterDate}
            onChange={(date) => setCreateAfterDate(date)}
          />
        </FormGroup>
        <FormGroup check className="mb-2">
          <Input
            type="checkbox"
            name={"complete_lte"}
            onChange={checkBoxHandle}
            value={`${completeBeforeDate.getFullYear()}-${
              completeBeforeDate.getMonth() + 1
            }-${completeBeforeDate.getDate()}`}
          />
          <Label check>Complated before</Label>
          <DatePicker
            selected={completeBeforeDate}
            onChange={(date) => setCompleteBeforeDate(date)}
          />
        </FormGroup>
        <FormGroup check className="mb-2">
          <Input
            type="checkbox"
            name={"complete_gte"}
            onChange={checkBoxHandle}
            value={`${completeAfterDate.getFullYear()}-${
              completeAfterDate.getMonth() + 1
            }-${completeAfterDate.getDate()}`}
          />
          <Label check>Complated after</Label>
          <DatePicker
            selected={completeAfterDate}
            onChange={(date) => setCompleteAfterDate(date)}
          />
        </FormGroup>
      </FormGroup>
    </div>
  );
};
