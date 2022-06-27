import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { generateQuery } from "../../helpers";
import { useAuth } from "../../hooks/user-auth";
import {
  getUserDetails,
  setTasksAsync,
  getAllUsersAsync,
} from "../../Redux/projectSlice";
import { TaskDetailsModal } from "../TaskDetailsModal";
import { HeaderSection } from "./HeaderSection";
import { MainSection } from "./MainSection";
import "./styles.css";

export const TaskProject = () => {
  const [searchSortQuery, setSearchSortQuery] = useState([]);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [modalTask, setModalTask] = useState(null);
  const dispatch = useDispatch();
  const { name } = useAuth();

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
        setModalTask(null);
      } else {
        setIsEditOpen(true);
        setModalTask(task);
      }
    },
    [isEditOpen]
  );

  useEffect(() => {
    dispatch(getAllUsersAsync());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getUserDetails());
  }, [dispatch]);

  useEffect(() => {
    const query = generateQuery(searchSortQuery);
    dispatch(setTasksAsync(query));
  }, [searchSortQuery, dispatch]);

  return (
    <div className="task_project_section">
      <HeaderSection getTasks={getTasksClosure} />
      <MainSection getTasks={getTasksClosure} editModalOpen={editModalOpen} />
      {isEditOpen && (
        <TaskDetailsModal
          onClose={() => setIsEditOpen(false)}
          modalTask={modalTask}
        />
      )}
    </div>
  );
};
