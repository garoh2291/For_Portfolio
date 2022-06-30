import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { getWindowDimensions } from "../../helpers/windowSizes";
import { useGetTaskAssigneeDetails } from "../../hooks/users-details";
import {
  changeTaskDetailsThunk,
  editTaskThunk,
} from "../../Redux/projectSlice";
import "./styles.css";

export const TaskDetailsModal = ({ onClose, modalTask }) => {
  const dispatch = useDispatch();
  const {
    title,
    created_at,
    description,
    owner,
    priority,
    date,
    assignee,
    _id,
  } = modalTask;
  const { width } = getWindowDimensions();
  const { assigneeName, assigneeSurname } = useGetTaskAssigneeDetails(assignee);
  const { name, surname, loggedId } = useSelector(
    (state) => state.project.user
  );

  const [assignedUserDetails, setAssignedUserDetails] = useState({
    name: assigneeName,
    surname: assigneeSurname,
  });

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

  const changeAssigneeToMe = () => {
    dispatch(changeTaskDetailsThunk({ _id, loggedId }));
    setAssignedUserDetails((prev) => {
      return {
        ...prev,
        name: name,
        surname: surname,
      };
    });
  };

  return (
    <Modal
      toggle={onClose}
      isOpen={true}
      size={"xl"}
      fullscreen={width > 620 ? false : true}
      className={"task_description_modal"}
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
        <div className="additional_task_details">
          <div className="assignee_details_description">
            <p>Assignee:</p>
            <p>
              {assigneeName
                ? `${assignedUserDetails.name} ${assignedUserDetails.name}`
                : "Unassigned"}
            </p>
          </div>
          <div className="assignee_to_me_button_section">
            <button
              className="assignee_to_me_button"
              onClick={changeAssigneeToMe}
            >
              Assign to me
            </button>
          </div>
        </div>
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
