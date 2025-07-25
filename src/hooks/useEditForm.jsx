import { useState } from "react";

const useEditForm = (initialData, validateFn) => {
  const [form, setForm] = useState(initialData);
  const [errors, setErrors] = useState({});
  const [test, setTest] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Wymuszamy liczby dla price i quantity
    const newValue =
      name === "price" || name === "quantity" ? Number(value) : value;

    setForm((prev) => ({ ...prev, [name]: newValue }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const errorField = validateFn(form, test);
    if (errorField) {
      setErrors(errorField);
      return false;
    }
    return true;
  };

  const resetErrors = () => setErrors({});

  return {
    form,
    errors,
    test,
    setTest,
    handleChange,
    validateForm,
    resetErrors,
    setForm,
  };
};

export default useEditForm;
