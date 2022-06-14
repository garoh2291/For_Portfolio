import { useSelector } from "react-redux";
import { getToken } from "../helpers";
export function useAuth() {
  const { surname, name } = useSelector((state) => state.project.user);
  return {
    isAuth: !!getToken(),
    surname,
    name,
  };
}
