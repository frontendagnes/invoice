import React from "react";
import "./Form.css";
function Form({ children, onSubmit, className }) {
  if (onSubmit) {
    return (
      <form className={`form ${className}`} onSubmit={onSubmit}>
        {children}
      </form>
    );
  }
  return <form className="form">{children}</form>;
}

export default Form;
