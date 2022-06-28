import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { getWindowDimensions } from "../../helpers/windowSizes";
import { AddTaskForm } from "./addNewTaskForm";

export const AddNewTaskModal = ({ onClose }) => {
  const { width } = getWindowDimensions();

  return (
    <Modal
      toggle={onClose}
      isOpen={true}
      size={"xl"}
      fullscreen={width > 500 ? false : true}
    >
      <ModalHeader toggle={onClose}>Add new task</ModalHeader>
      <ModalBody>
        <AddTaskForm onSubmitCallback={onClose} />
      </ModalBody>
      <ModalFooter>
        <Button onClick={onClose}>Cancel</Button>
      </ModalFooter>
    </Modal>
  );
};
