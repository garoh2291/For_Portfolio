import { useState } from "react";
import { useDispatch } from "react-redux";
import { Button } from "reactstrap";
import { useEditForm } from "../../../helpers/forms";
import { editSinglePageTaskThunk } from "../../../Redux/projectSlice";

export const EditFromSinglePage = ({ singleTask, setIsChangedSuccess }) => {
  const [isbuttonEnabled, setIsButtonEnabled] = useState(true);
  const [editableData, editHandler] = useEditForm(
    singleTask,
    setIsButtonEnabled
  );
  const dispatch = useDispatch();

  const saveChangedInfo = () => {
    setIsChangedSuccess(true);

    const {
      "editable-header": { textContent: title },
      "editable-description": { textContent: description },
    } = editableData;
    const editFormData = {
      title,
      description,
    };

    dispatch(
      editSinglePageTaskThunk({
        singleTask,
        editFormData,
        setIsButtonEnabled,
        setIsChangedSuccess,
      })
    );
  };

  return (
    <div className="single-task-info">
      <h1
        contentEditable="true"
        suppressContentEditableWarning={true}
        onBlur={editHandler}
        id="editable-header"
        className="single-task-header"
      >
        {singleTask.title}
      </h1>
      <p
        contentEditable="true"
        suppressContentEditableWarning={true}
        onBlur={editHandler}
        id="editable-description"
        className="single-task-description"
      >
        {singleTask.description}
      </p>
      <Button
        className="my-5"
        color="success"
        disabled={isbuttonEnabled}
        onClick={saveChangedInfo}
      >
        Save
      </Button>
    </div>
  );
};
