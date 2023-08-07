import { useState } from "react";

const useInput = (initialValue, validate) => {
  const [value, setValue] = useState(initialValue);
  const [isTouched, setIsTouched] = useState(false);

  const valueIsValid = validate(value);
  const hasError = isTouched && !valueIsValid;

  function handleValueChange(e) {
    setValue(e.target.value);
  }

  function handleValueBlur() {
    setIsTouched(true);
  }

  function resetValues() {
    setValue("");
    setIsTouched(false);
  }

  return {
    value,
    isValid: valueIsValid,
    hasError,
    handleChange: handleValueChange,
    handleBlur: handleValueBlur,
    handleReset: resetValues
  };
};

export default useInput;
