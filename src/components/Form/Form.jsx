import React from "react";
import "./Form.css";
function Form({ children, onSubmit }) {
  if (onSubmit) {
    return (
      <form className="form" onSubmit={onSubmit}>
        {children}
      </form>
    );
  }
  return <form className="form">{children}</form>;
}

export default Form;
