
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { today } from "../utility/functions";

function usePrint(titlePrefix = "") {
  const printRef = useRef(null);

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: `${today()}-${titlePrefix}`,
  });

  return { printRef, handlePrint };
}

export default usePrint;
