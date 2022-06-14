import React, { useState } from "react";
import { SearchMethod } from "./CheckComponent";
import { SearchRadioMethod } from "./StatusComponent";
import "./styles.css";

export const FilterContent = ({ getTasks }) => {
  const [isSectionOpen, setIsSectionOpen] = useState(false);
  const filterHandler = () => {
    if (isSectionOpen) {
      setIsSectionOpen(false);
    } else {
      setIsSectionOpen(true);
    }
  };

  return (
    <div className="filter-content">
      <div className="filer-section">
        <div className="filter-by" onClick={filterHandler}>
          <span>Filter by</span>
          <i className="filter-icon-by bx bx-filter"></i>
        </div>
        {isSectionOpen ? (
          <div className="filter-methods-open">
            <SearchRadioMethod getTasks={getTasks} filterOption="status" />
            <SearchMethod getTasks={getTasks} />
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};
