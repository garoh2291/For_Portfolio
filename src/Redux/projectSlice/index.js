import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getTasksRequest } from "../../api";
import { BACKEND_URL } from "../../data";
import { getToken } from "../../helpers";

export const setUserThunk = createAsyncThunk(
  "project/setUserThunk",
  function (
    { authDataSend, cb, setIsButtonWaiting, setIsError },
    { rejectWithValue, dispatch }
  ) {
    fetch(`${BACKEND_URL}/user/sign-in`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(authDataSend),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status || data.error) {
          setIsButtonWaiting((prev) => !prev);
          setIsError(true);
          throw new Error(data.message);
        }

        const { jwt, refreshToken } = data;
        localStorage.setItem("token", JSON.stringify(jwt));
        localStorage.setItem("refreshToken", JSON.stringify(refreshToken));
        setIsButtonWaiting((prev) => !prev);
        dispatch(getUserDetails());
        window.setTimeout(() => {
          cb();
        }, 0);
      })
      .catch((err) => {
        console.log(err);
        rejectWithValue(err);
      });
  }
);

export const getUserDetails = createAsyncThunk(
  "project/getUserDetails",
  function (_, { dispatch }) {
    fetch(`${BACKEND_URL}/user`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${getToken()}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch(setUser({ data }));
      });
  }
);

export const getAllUsersAsync = createAsyncThunk(
  "project/getAllUsers",
  function (_, { dispatch }) {
    fetch(`${BACKEND_URL}/user/get-all`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${getToken()}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error || data.errors) {
          if (data.error.status === 401) {
            dispatch(removeUser());
          }
          throw new Error("something wrong");
        }

        dispatch(setUsers({ data }));
      })
      .catch((err) => console.log(err));
  }
);

export const registrateNewUserThunk = createAsyncThunk(
  "project/registrateNewUserThunk",
  function (
    { authDataSend, cb, setIsSendSuccess, setIsSendFail, setIsError },
    { dispatch }
  ) {
    fetch(`${BACKEND_URL}/user`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(authDataSend),
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.error) {
          setIsSendSuccess(true);
          window.setTimeout(() => {
            setIsSendSuccess(false);
            cb();
          }, 2000);
        } else {
          setIsError(data.error.message);
          setIsSendFail(true);
          window.setTimeout(() => {
            setIsSendFail(false);
          }, 2000);
        }
      });
  }
);

export const LogOutThunk = createAsyncThunk(
  "project/LogOutThunk",
  function (cb, { dispatch }) {
    fetch(`${BACKEND_URL}/user/sign-out`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        jwt: getToken(),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          dispatch(removeUser());
          cb();
        }
      });
  }
);

export const addTaskThunk = createAsyncThunk(
  "tasks/addTasksThunk",
  function ({ newTaskObj, onSubmitCallback }, { dispatch, rejectWithValue }) {
    fetch(`${BACKEND_URL}/task`, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${getToken()}`,
      },
      method: "POST",
      body: JSON.stringify(newTaskObj),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          throw data.error;
        }
        dispatch(addTask({ data }));
      })
      .catch((error) => {
        return rejectWithValue(error.message);
      });
    onSubmitCallback();
  }
);

export const setTasksAsync = createAsyncThunk(
  "tasks/setTasksAsync",
  function (query, { rejectWithValue, dispatch }) {
    getTasksRequest(query)
      .then((data) => {
        if (data.errors) {
          if (data.error.status === 401) {
            dispatch(removeUser());
          }
          throw new Error(data.errors[0].message);
        }

        dispatch(setTasks({ data }));
      })
      .catch((err) => {
        console.log(err);

        return rejectWithValue(err);
      });
  }
);

export const removeMultitapleTasksThunk = createAsyncThunk(
  "tasks/removeMultitapleTasksThunk",
  function (batchDelTasks, { rejectWithValue, dispatch }) {
    fetch(`${BACKEND_URL}/task`, {
      method: "PATCH",
      body: JSON.stringify({
        tasks: batchDelTasks,
      }),
      headers: {
        "Content-type": "application/json",
        authorization: `Bearer ${getToken()}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          throw new Error("Problem with server");
        }
        dispatch(removeMultitapleTasks({ batchDelTasks }));
      })
      .catch((error) => {
        return rejectWithValue(error.message);
      });
  }
);

export const deleteTaskThunk = createAsyncThunk(
  "tasks/deleteTaskThunk",
  function (_id, { dispatch, rejectWithValue }) {
    fetch(`${BACKEND_URL}/task/${_id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",

        authorization: `Bearer ${getToken()}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Cant delete");
        }
        dispatch(deleteTask({ _id }));
      })
      .catch((error) => {
        return rejectWithValue(error.message);
      });
  }
);

export const changeStatusThink = createAsyncThunk(
  "project/changeStatusThink",
  function (_id, { dispatch }) {
    fetch(`${BACKEND_URL}/task/${_id}`, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${getToken()}`,
      },
      method: "PUT",
      body: JSON.stringify({
        status: "done",
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch(changedStatusTask({ data }));
      });
  }
);

export const getSingleTask = createAsyncThunk(
  "project/getSingleTask",
  function ({ setSingleTask, taskId }) {
    fetch(`${BACKEND_URL}/task/${taskId}`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${getToken()}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setSingleTask(data));
  }
);

export const editTaskThunk = createAsyncThunk(
  "project/editTaskThunk",
  function ({ _id, editFormData, onClose }, { dispatch }) {
    fetch(`${BACKEND_URL}/task/${_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify(editFormData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error || data.errors) {
          throw new Error("Something wrong");
        }
        dispatch(editTask({ data }));
        onClose();
      })
      .catch((err) => console.log(err));
  }
);

export const editSinglePageTaskThunk = createAsyncThunk(
  "project,editSinglePageTaskThunk",
  function ({
    singleTask,
    editFormData,
    setIsButtonEnabled,
    setIsChangedSuccess,
  }) {
    fetch(`${BACKEND_URL}/task/${singleTask._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify(editFormData),
    });

    setIsButtonEnabled((prev) => !prev);

    setIsChangedSuccess(() => {
      window.setTimeout(() => {
        setIsChangedSuccess(false);
      }, 2000);
    });
  }
);

const projectSlice = createSlice({
  name: "project",
  initialState: {
    tasks: null,
    user: {
      name: null,
      surname: null,
      _id: null,
      token: getToken(),
    },
    users: null,
    error: null,
    status: null,
  },
  reducers: {
    setUser(state, action) {
      state.user.surname = action.payload.data.surname;
      state.user.name = action.payload.data.name;
      state.user._id = action.payload.data._id;
    },
    removeUser(state, action) {
      state.user.surname = null;
      state.user.name = null;
      state.user._id = null;

      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
    },
    addTask(state, action) {
      const newTask = action.payload.data;
      const tasks = [...state.tasks, newTask];
      return {
        ...state,
        tasks,
      };
    },
    setUsers(state, action) {
      const users = action.payload.data;
      return {
        ...state,
        users: users,
      };
    },
    setTasks(state, action) {
      const taskFromBackend = action.payload.data;
      return {
        ...state,
        tasks: taskFromBackend,
      };
    },
    removeMultitapleTasks(state, action) {
      const deletedTasks = action.payload.batchDelTasks;
      const tasks = state.tasks.filter(
        (task) => !deletedTasks.includes(task._id)
      );
      return {
        ...state,
        tasks,
      };
    },
    deleteTask(state, action) {
      const deletedTaskId = action.payload._id;
      const tasks = state.tasks.filter((task) => task._id !== deletedTaskId);
      return {
        ...state,
        tasks,
      };
    },
    changedStatusTask(state, action) {
      const changedStatusTask = action.payload.data;
      const tasks = state.tasks.map((task) => {
        if (task._id === changedStatusTask._id) {
          return changedStatusTask;
        }
        return task;
      });
      return {
        ...state,
        tasks,
      };
    },
    editTask(state, action) {
      const editedTask = action.payload.data;
      const tasks = state.tasks.map((task) => {
        if (task._id === editedTask._id) {
          return editedTask;
        }
        return task;
      });
      return {
        ...state,
        tasks,
      };
    },
  },
});

export const {
  setUser,
  removeUser,
  addTask,
  setTasks,
  removeMultitapleTasks,
  deleteTask,
  changedStatusTask,
  setUsers,
  editTask,
} = projectSlice.actions;

export default projectSlice.reducer;
