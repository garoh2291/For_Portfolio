import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { AddTaskForm } from "./addNewTaskForm";

export const AddNewTaskModal = ({ onClose }) => {
  return (
    <Modal toggle={onClose} isOpen={true}>
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
