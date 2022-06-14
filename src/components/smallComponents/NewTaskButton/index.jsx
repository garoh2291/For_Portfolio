import React from "react";
import { Button } from "reactstrap";

export const NewTaskButton = ({ handleBtnClick }) => {
  return (
    <Button color="primary" style={{ width: "100%" }} onClick={handleBtnClick}>
      Add New Task
    </Button>
  );
};
