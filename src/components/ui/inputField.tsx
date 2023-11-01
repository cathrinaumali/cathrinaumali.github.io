import React from "react";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";

const InputField = ({
  label,
  name,
  value,
  onChange,
  id,
  variant = "outlined",
  showPlaceholderLabel = false,
}) => {
  return (
    <div>
      {!showPlaceholderLabel && label && (
        <InputLabel id={`${id}-label`}>{label} </InputLabel>
      )}
      <TextField
        id={id}
        name={name}
        label={showPlaceholderLabel && label ? label : null} // If showLabel is true, TextField label is empty
        variant={variant}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};
export default InputField;
