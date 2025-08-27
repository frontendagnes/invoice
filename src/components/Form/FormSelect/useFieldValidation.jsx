import { useMemo } from "react";
import { FIELD_CONFIG } from "./variables";

// Custom hook for field validation logic
const useFieldValidation = (seller, originalSeller, select) => {
  return useMemo(() => {
    // Check if all fields have changes
    const areAllFieldsChanged = Object.keys(FIELD_CONFIG)
      .filter((key) => key !== "all")
      .some((key) => seller[key] !== originalSeller[key]);

    // Check if selected field has changes
    const isSelectedFieldChanged = () => {
      if (!select || select === "all" || select === "None") return false;
      return seller[select] !== originalSeller[select];
    };

    return {
      areAllFieldsChanged,
      isSelectedFieldChanged: isSelectedFieldChanged(),
    };
  }, [seller, originalSeller, select]);
};
export default useFieldValidation;
