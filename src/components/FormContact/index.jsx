import { useState } from "react";
import {
  Alert,
  Button,
  Col,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Label,
} from "reactstrap";
import { BACKEND_URL } from "../../data";
import {
  isRequired,
  maxLength30,
  maxLength400,
  minLength3,
  validateEmail,
} from "../../helpers/validations";
import "./styles.css";

export const ContactForm = () => {
  const [messageData, setMessageData] = useState({
    name: {
      value: "",
      error: undefined,
      validations: [isRequired, minLength3, maxLength30],
    },
    email: {
      value: "",
      error: undefined,
      validations: [isRequired, minLength3, validateEmail],
    },
    message: {
      value: "",
      error: undefined,
      validations: [isRequired, minLength3, maxLength400],
    },
  });

  const [isSendSuccess, setIsSendSuccess] = useState(false);
  const [isSendFail, setIsSendFail] = useState(false);

  const messageHandleChange = (e) => {
    const { value, name } = e.target;

    const { validations } = messageData[name];

    let error;

    for (let i = 0; i < validations.length; i++) {
      const validation = validations[i];
      const errorMessage = validation(value);

      if (errorMessage) {
        error = errorMessage;
        break;
      }
    }
    setMessageData((prev) => {
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

  const onMessageSubmit = (e) => {
    e.preventDefault();
    const {
      email: { value: email },
      name: { value: name },
      message: { value: message },
    } = e.target;

    const messageFormData = {
      email,
      name,
      message,
    };
    console.log(messageFormData);

    fetch(`${BACKEND_URL}/form`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(messageFormData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setIsSendSuccess(true);
          window.setTimeout(() => {
            setIsSendSuccess(false);
          }, 2000);
        } else {
          setIsSendFail(() => {
            window.setTimeout(() => {
              setIsSendFail(false);
            }, 2000);
          });
        }
      });

    e.target.reset();
  };

  return (
    <>
      {" "}
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
        Success
      </Alert>
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
        color="danger"
        isOpen={isSendFail}
      >
        Wrong
      </Alert>
      <div className="contact_form">
        <Form onSubmit={onMessageSubmit}>
          <FormGroup row>
            <Label for="exampleEmail" sm={2}>
              Email
            </Label>
            <Col sm={10}>
              <Input
                id="contacterEmail"
                name="email"
                placeholder="Write Your email"
                type="email"
                onChange={messageHandleChange}
                invalid={!!messageData.email.error}
              />
              {!!messageData.email.error && (
                <FormFeedback>{messageData.email.error}</FormFeedback>
              )}
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="exampleText" sm={2}>
              Name
            </Label>
            <Col sm={10}>
              <Input
                id="contacterNAme"
                onChange={messageHandleChange}
                name="name"
                type="text"
                placeholder="Type Your name"
                invalid={!!messageData.name.error}
              />
              {!!messageData.name.error && (
                <FormFeedback>{messageData.name.error}</FormFeedback>
              )}
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="exampleText" sm={2}>
              Message
            </Label>
            <Col sm={10}>
              <Input
                id="ContacterText"
                onChange={messageHandleChange}
                name="message"
                type="textarea"
                placeholder="Type Your message"
                invalid={!!messageData.message.error}
              />
              {!!messageData.message.error && (
                <FormFeedback>{messageData.message.error}</FormFeedback>
              )}
            </Col>
          </FormGroup>
          <Col
            sm={{
              offset: 2,
              size: 10,
            }}
          >
            <Button onSubmit={onMessageSubmit}>Submit</Button>
          </Col>
        </Form>
      </div>
    </>
  );
};
