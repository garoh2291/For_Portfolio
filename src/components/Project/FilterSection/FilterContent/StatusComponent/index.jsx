import { Button, Form, FormGroup, Input, Label } from "reactstrap";

export const SearchRadioMethod = ({ getTasks, filterOption }) => {
  const resetRadioForm = (e) => {
    e.preventDefault();
    e.target.reset();
    getTasks({
      queryRoute: filterOption,
      queryValue: "",
    });
  };
  const SearchRadioHandle = (e) => {
    const { checked, value } = e.target;

    if (checked) {
      getTasks({
        queryRoute: filterOption,
        queryValue: value,
      });
    } else {
      getTasks({
        queryRoute: filterOption,
        queryValue: "",
      });
    }
  };
  return (
    <div style={{ marginBottom: "20px" }}>
      <Form onSubmit={resetRadioForm}>
        <legend className="col-form-label">By Status</legend>
        <FormGroup>
          <FormGroup check>
            <Input
              type="radio"
              name="radio1"
              onChange={SearchRadioHandle}
              value="active"
            />{" "}
            <Label check>Active </Label>
          </FormGroup>
          <FormGroup check>
            <Input
              type="radio"
              name="radio1"
              onChange={SearchRadioHandle}
              value="done"
            />{" "}
            <Label check>Done</Label>
          </FormGroup>
        </FormGroup>
        <Button color="primary" onSubmit={resetRadioForm}>
          Reset
        </Button>
      </Form>
    </div>
  );
};
