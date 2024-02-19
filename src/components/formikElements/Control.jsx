import React from "react";
import Input from "./Input";

const Control = (props) => {
  switch (props.control) {
    case "input":
      return <Input {...props} />;
    default:
      return null;
  }
};

export default Control;
