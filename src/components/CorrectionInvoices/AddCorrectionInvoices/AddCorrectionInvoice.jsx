import { useEffect, useRef, useCallback } from "react";
import "./AddCorrectionInvoice.css";

import { TextField } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import { useClickAway } from "react-use";

// Import komponentów
import { useCorrectionForm } from "../useCorrectionForm.jsx";
import Form from "../../Form/Form";
import FormButton from "../../Form/FormButton/FormButton";
import CorrectionItemRow from "../CorrectionItemRow/CorrectionItemRow";
import CorrectionOriginalBuyer from "./CorrectionOriginalBuyer.jsx";
import AddCorrectionsHeader from "./AddCorrectionsHeader.jsx";
import BuyerFields from "./BuyerFields.jsx";
import AddCorrectionItemTotal from "./AddCorrectionItemTotal.jsx";

// Animacje dla modala
const modalVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, scale: 0.8, transition: { duration: 0.2 } },
};

function AddCorrectionInvoiceModal({
  isOpen,
  setIsOpen,
  onClose,
  originalInvoice,
  originalInvoiceId,
}) {
  const {
    correctionForm,
    currentTotal,
    handleChange,
    handleItemChange,
    handleAddItem,
    handleRemoveItem,
    handleSubmitCorrection,
  } = useCorrectionForm(originalInvoice);

  const contentRef = useRef(null);

  useClickAway(contentRef, onClose);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => e.key === "Escape" && setIsOpen(false);
    document.body.classList.add("no-scroll");
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.classList.remove("no-scroll");
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, setIsOpen]);

  const onSubmitHandler = (e) => {
    handleSubmitCorrection(e, originalInvoiceId, onClose);
  };

  const renderField = (name, props = {}) => (
    <TextField
      {...{
        name,
        value: correctionForm[name] || "",
        onChange: handleChange,
        fullWidth: true,
        margin: "normal",
        variant: "outlined",
        ...props,
      }}
    />
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="addCorrectionModal"
          className="addCorrectionInvoice"
          role="dialog"
          aria-modal="true"
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={onClose}
        >
          <motion.div
            ref={contentRef}
            className="addCorrectionInvoice__content"
            onClick={(e) => e.stopPropagation()}
          >
            <Form onSubmit={onSubmitHandler}>
              {originalInvoice && (
                <AddCorrectionsHeader
                  originalInvoice={originalInvoice}
                  originalInvoiceId={originalInvoiceId}
                />
              )}

              {renderField("reason", {
                label: "Podaj powód korekty",
                required: true,
              })}
              {renderField("createdAt", {
                label: "Data wystawienia korekty",
                type: "date",
                InputLabelProps: { shrink: true },
              })}

              <div className="addCorrectionInvoice__inputs">
                <CorrectionOriginalBuyer originalInvoice={originalInvoice} />
                <section className="addCorrectionInvoice__corrected-header">
                  <h3>Poprawione dane kupującego</h3>
                  <BuyerFields
                    correctionForm={correctionForm}
                    handleChange={handleChange}
                  />
                  {renderField("correctedIssueDate", {
                    label: "Nowa data wystawienia",
                    type: "date",
                    InputLabelProps: { shrink: true },
                  })}
                  {renderField("place", { label: "Miejscowość wystawienia" })}
                  {renderField("note", {
                    label: "Dodatkowe uwagi",
                    multiline: true,
                    rows: 2,
                  })}
                </section>
              </div>

              <section>
                <h3>Korygowane pozycje produktów</h3>
                <p>
                  Wprowadź nowe wartości, różnica zostanie obliczona
                  automatycznie.
                </p>
                {correctionForm.correctedItems.length > 0 ? (
                  correctionForm.correctedItems.map((item, idx) => (
                    <CorrectionItemRow
                      key={item.itemId}
                      item={item}
                      index={idx}
                      handleItemChange={handleItemChange}
                      onRemoveItem={handleRemoveItem}
                    />
                  ))
                ) : (
                  <p>Brak pozycji do korekty.</p>
                )}
                <div className="addCorrectionInvoice__actions--add ">
                  <FormButton
                    type="button"
                    text="Dodaj nową pozycję"
                    onClick={handleAddItem}
                    styles={{ width: "80%" }}
                  />
                </div>
              </section>

              <AddCorrectionItemTotal currentTotal={currentTotal} />

              <div className="addCorrectionInvoice__actions">
                <FormButton
                  type="submit"
                  text="Dodaj Fakturę korygującą"
                  styles={{
                    width: "50%",
                    height: "56px",
                  }}
                />
                <FormButton
                  type="button"
                  text="Anuluj"
                  onClick={onClose}
                  styles={{
                    width: "20%",
                    height: "56px",
                  }}
                />
              </div>
            </Form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default AddCorrectionInvoiceModal;
