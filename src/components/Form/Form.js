import React from "react";
import "./Form.css";
function Form({ children }) {
  return <form className="form">{children}</form>;
}

export default Form;
