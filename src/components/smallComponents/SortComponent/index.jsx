import { Input } from "reactstrap";

const styleForSort = {
  width: "100px",
};

export const SortSelect = ({ handleSort }) => {
  return (
    <Input
      style={styleForSort}
      name="sort_by"
      type="select"
      onChange={handleSort}
    >
      <option value={""}>Default</option>

      <option value={"creation_date_newest"}>Created newest</option>
      <option value={"creation_date_oldest"}>Completed oldest</option>
      <option value={"completion_date_newest"}>Completed newest</option>
      <option value={"completion_date_oldest"}>Completed oldest</option>
      <option value={"a-z"}>A - Z</option>
      <option value={"z-a"}>Z - A</option>
    </Input>
  );
};
