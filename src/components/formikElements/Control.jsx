import React from "react";
import Input from "./Input";
import Radio from "./Radio";

const Control = (props) => {
  switch (props.control) {
    case "input":
      return <Input {...props} />;
    case "Radio":
      return <Radio {...props} />;
    default:
      return null;
  }
};

export default Control;
