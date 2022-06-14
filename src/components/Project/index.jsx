import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { BACKEND_URL } from "../../data";
import { generateQuery } from "../../helpers";
import { getUserDetails, setTasksAsync } from "../../Redux/projectSlice";
import { FilterSection } from "./FilterSection";
import { useAuth } from "../../hooks/user-auth";
import { PreLoader } from "../../Pages/PreLoader";
import { MainSection } from "./MainSection/index";

import "./styles.css";

export const Project = () => {
  const [searchSortQuery, setSearchSortQuery] = useState([]);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editModalTask, setEditModalTask] = useState(null);
  const dispatch = useDispatch();
  const { name, surname } = useAuth();

  const getTasksClosure = (filterEntries) => {
    const newArr = searchSortQuery.filter((item) => {
      return item.queryRoute === filterEntries.queryRoute;
    });
    if (newArr.length === 0) {
      setSearchSortQuery((prev) => {
        return [...prev, filterEntries];
      });
    } else {
      setSearchSortQuery((prev) => {
        return searchSortQuery.map((item) => {
          if (item.queryRoute === filterEntries.queryRoute) {
            return filterEntries;
          }
          return item;
        });
      });
    }
  };

  const editModalOpen = useCallback(
    (task) => {
      if (isEditOpen) {
        setIsEditOpen(false);
        setEditModalTask(null);
      } else {
        setIsEditOpen(true);
        setEditModalTask(task);
      }
    },
    [isEditOpen]
  );

  useEffect(() => {
    dispatch(getUserDetails());
  }, [dispatch]);

  useEffect(() => {
    const query = generateQuery(searchSortQuery);
    dispatch(setTasksAsync(query));
  }, [searchSortQuery, dispatch]);

  if (!name) {
    return <PreLoader />;
  }
  return (
    <div className="project-main">
      <FilterSection getTasks={getTasksClosure} />
      <MainSection getTasks={getTasksClosure} />
    </div>
  );
};
