import React from "react";
import "./ValidationError.css";
// material-ui
import ErrorIcon from '@mui/icons-material/Error';;
function ValidationError({ text }) {
  return (
    <div className="validationError" style={text ? {opacity: 1} : {opacity: 0}}>
     <ErrorIcon fontSize="large" color="secondary" /><p>{text}</p>
    </div>
  );
}

export default ValidationError;
