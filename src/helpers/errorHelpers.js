import { Alert } from "reactstrap";

export const ErrorAlert = ({ isSendFail, errorTitle }) => {
  return (
    <Alert
      style={{
        width: "30%",
        margin: "0 auto",
        position: "fixed",
        // left: "35%",
        top: "50px",
        textAlign: "center",
        opacity: "0.8",
      }}
      color="danger"
      isOpen={isSendFail}
    >
      {errorTitle}
    </Alert>
  );
};

export const SuccessAlert = ({ isSendSuccess, successTitle }) => {
  return (
    <Alert
      style={{
        width: "30%",
        margin: "0 auto",
        position: "fixed",
        left: "35%",
        top: "50px",
        textAlign: "center",
        opacity: "0.8",
      }}
      color="success"
      isOpen={isSendSuccess}
    >
      {successTitle}
    </Alert>
  );
};
