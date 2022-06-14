import React from "react";
import { Input } from "reactstrap";

export const SearchInput = ({ handleSearch }) => {
  return (
    <Input
      type="search"
      placeholder="Search Task"
      name="search"
      onChange={handleSearch}
    ></Input>
  );
};
