import { useState } from "react";
import {
  isRequired,
  minLength6,
  minLength3,
  validateEmail,
  maxLength30,
  maxLength400,
} from "../helpers/validations";

export const useFormLogIn = () => {
  const [authData, setAuthData] = useState({
    email: {
      value: "",
      error: undefined,
      validations: [isRequired, minLength3, validateEmail],
    },
    password: {
      value: "",
      error: undefined,
      validations: [isRequired, minLength6, maxLength30],
    },
  });

  const authChange = (e) => {
    const { value, name } = e.target;

    const { validations } = authData[name];
    let error;

    for (let i = 0; i < validations.length; i++) {
      const validation = validations[i];
      const errorMessage = validation(value);

      if (errorMessage) {
        error = errorMessage;
        break;
      }
    }

    setAuthData((prev) => {
      return {
        ...prev,
        [name]: {
          ...prev[name],
          value,
          error,
        },
      };
    });
  };

  return [authData, authChange];
};

export const useFormRegistr = () => {
  const [authData, setAuthData] = useState({
    email: {
      value: "",
      error: undefined,
      validations: [isRequired, minLength3, validateEmail],
    },
    password: {
      value: "",
      error: undefined,
      validations: [isRequired, minLength6, maxLength30],
    },
    confirmPassword: {
      value: "",
      error: undefined,
      validations: [isRequired, minLength6, maxLength30],
    },
    name: {
      value: "",
      error: undefined,
      validations: [isRequired, minLength3, maxLength30],
    },
    surname: {
      value: "",
      error: undefined,
      validations: [isRequired, minLength3, maxLength30],
    },
  });

  const authChange = (e) => {
    const { value, name } = e.target;

    const { validations } = authData[name];
    let error;

    for (let i = 0; i < validations.length; i++) {
      const validation = validations[i];
      const errorMessage = validation(value);

      if (errorMessage) {
        error = errorMessage;
        break;
      }
    }

    setAuthData((prev) => {
      return {
        ...prev,
        [name]: {
          ...prev[name],
          value,
          error,
        },
      };
    });
  };

  return [authData, authChange];
};

export const useAddTaskForm = () => {
  const [inputsData, setInputsData] = useState({
    title: {
      value: "",
      error: undefined,
      validations: [isRequired, minLength3, maxLength30],
    },
    description: {
      value: "",
      error: undefined,
      validations: [isRequired, minLength3, maxLength400],
    },
  });

  const handleChange = (e) => {
    const { value, name } = e.target;

    const { validations } = inputsData[name];

    let error;

    for (let i = 0; i < validations.length; i++) {
      const validation = validations[i];
      const errorMessage = validation(value);

      if (errorMessage) {
        error = errorMessage;
        break;
      }
    }

    setInputsData((prev) => {
      return {
        ...prev,
        [name]: {
          ...prev[name],
          value,
          error,
        },
      };
    });
  };

  return [inputsData, handleChange];
};

export const useEditForm = (task, cb) => {
  const [editableData, setEditableData] = useState({
    "editable-header": {
      textContent: task.title,
    },
    "editable-description": {
      textContent: task.description,
    },
  });

  const editHandler = (e) => {
    const { textContent, id } = e.target;

    setEditableData((prev) => {
      return {
        ...prev,
        [id]: {
          textContent,
        },
      };
    });

    cb(false);
  };

  return [editableData, editHandler];
};
