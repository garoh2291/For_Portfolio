import { useSelector } from "react-redux";

export const useGetTaskAssigneeDetails = (_id) => {
  const { users } = useSelector((state) => state.project);
  const assigneeUser = users.find((user) => user._id === _id);
  if (!assigneeUser) {
    return {
      assigneeName: null,
      assigneeSurname: null,
    };
  }
  return {
    assigneeName: assigneeUser.name,
    assigneeSurname: assigneeUser.surname,
  };
};
