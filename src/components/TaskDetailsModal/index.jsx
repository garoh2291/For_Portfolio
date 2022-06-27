import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { getWindowDimensions } from "../../helpers/windowSizes";
import { editTaskThunk } from "../../Redux/projectSlice";
import "./styles.css";

export const TaskDetailsModal = ({ onClose, modalTask }) => {
  const dispatch = useDispatch();
  const { title, created_at, description, owner, priority, date, _id } =
    modalTask;
  const { width } = getWindowDimensions();

  const [isbuttonDisabled, setIsButtondisabled] = useState(true);

  const [editableData, setEditableData] = useState({
    "editable-header": {
      textContent: title,
    },
    "editable-description": {
      textContent: description,
    },
  });

  const editHandler = (e) => {
    const { textContent, id } = e.target;

    setEditableData((prev) => {
      return {
        ...prev,
        [id]: {
          textContent,
        },
      };
    });

    setIsButtondisabled(false);
  };

  const saveChangedInfo = useCallback(() => {
    const {
      "editable-header": { textContent: title },
      "editable-description": { textContent: description },
    } = editableData;
    const editFormData = {
      title,
      description,
    };

    dispatch(editTaskThunk({ _id, editFormData, onClose }));
  }, []);

  return (
    <Modal
      toggle={onClose}
      isOpen={true}
      size={"xl"}
      fullscreen={width > 500 ? false : true}
    >
      <ModalHeader toggle={onClose} className={"modal_header_text_section"}>
        <p
          className="head_text_modal"
          contentEditable="true"
          suppressContentEditableWarning={true}
          id="editable-header"
          onBlur={editHandler}
        >
          {title}
        </p>
      </ModalHeader>

      <ModalBody className="task_modal_body">
        <div className="description_section">
          <p
            id="editable-description"
            className="body_text_modal"
            contentEditable="true"
            suppressContentEditableWarning={true}
            onBlur={editHandler}
          >
            {description}
          </p>
        </div>
        <div className="additional_task_details"></div>
      </ModalBody>
      <ModalFooter>
        <Button
          color="success"
          disabled={isbuttonDisabled}
          onClick={saveChangedInfo}
        >
          Save
        </Button>
        <Button onClick={onClose}>Cancel</Button>
      </ModalFooter>
    </Modal>
  );
};
