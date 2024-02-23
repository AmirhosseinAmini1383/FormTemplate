import React from "react";
import Input from "./Input";
import Radio from "./Radio";
import Checkbox from "./Checkbox";
import Date from "./Date";
import File from "./File";

const Control = (props) => {
  switch (props.control) {
    case "input":
      return <Input {...props} />;
    case "Radio":
      return <Radio {...props} />;
    case "checkbox":
      return <Checkbox {...props} />;
    case "date":
      return <Date {...props} />;
    case "file":
      return <File {...props} />;
    default:
      return null;
  }
};

export default Control;
