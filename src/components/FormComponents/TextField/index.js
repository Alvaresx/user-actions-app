import React from "react";
import { TextField } from "@mui/material";
import { useField } from "formik";

function TextFieldWrapper({ name, ...otherProps }) {
  const [field, data] = useField(name);

  const configTextfield = {
    ...field,
    ...otherProps,
    fullWidth: true,
    size: "middle",
    required: true,
  };

  if (data && data.touched && data.error) {
    configTextfield.error = true;
    configTextfield.helperText = data.error;
  }

  return <TextField {...configTextfield} />;
}

export default TextFieldWrapper;