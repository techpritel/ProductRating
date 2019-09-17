import React from "react";

const Input = ({ name, label, error, ...rest }) => {
  return (
    <div className="form-group">
      <label id={name} htmlFor={label}>
        {label}
      </label>
      <input {...rest} name={name} id={name} className="form-control" />

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
    </div>
  );
};

export default Input;
