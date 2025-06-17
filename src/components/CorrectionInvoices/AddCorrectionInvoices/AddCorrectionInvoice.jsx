// src/components/AddCorrectionInvoice/AddCorrectionInvoiceModal.jsx
import { useEffect, useRef } from "react";
import "./AddCorrectionInvoice.css";

import { TextField } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import { useClickAway } from "react-use";

// Import komponentów
import { useCorrectionForm } from "../useCorrectionForm.jsx";
import Form from "../../Form/Form";
import FormButton from "../../Form/FormButton/FormButton";
import CorrectionItemRow from "../CorrectionItemRow/CorrectionItemRow";

// Animacje dla modala
const modalVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, scale: 0.8, transition: { duration: 0.2 } },
};

function AddCorrectionInvoiceModal({
  isOpen,
  onClose,
  originalInvoice,
  originalInvoiceId,
}) {
  // Używamy custom hooka do zarządzania logiką formularza
  const {
    correctionForm,
    currentTotal,
    handleChange,
    handleItemChange,
    handleAddItem,
    handleRemoveItem,
    handleSubmitCorrection,
  } = useCorrectionForm(originalInvoice); // Przekazujemy originalInvoice do hooka

  useEffect(() => {
    console.log("corectionAt", correctionForm.createdAt);
  }, [correctionForm.createdAt]);
  const contentRef = useRef(null);
  useClickAway(contentRef, onClose);

  // Efekt do zarządzania scrollowaniem body
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [isOpen]);

  const onSubmitHandler = (e) => {
    handleSubmitCorrection(e, originalInvoiceId, onClose);
  };

  // Konfiguracja pól dla sekcji kupującego (przykład użycia mapowania pól)
  const buyerFields = [
    {
      name: "buyer.name",
      label: "Nazwa kupującego",
      value: correctionForm.buyer.name,
      id: "buyer-name",
    },
    {
      name: "buyer.nip",
      label: "NIP",
      value: correctionForm.buyer.nip,
      id: "buyer-nip",
    },
    {
      name: "buyer.street",
      label: "Ulica",
      value: correctionForm.buyer.street,
      id: "buyer-street",
    },
    {
      name: "buyer.zipCode",
      label: "Kod pocztowy",
      value: correctionForm.buyer.zipCode,
      id: "buyer-zipCode",
    },
    {
      name: "buyer.town",
      label: "Miejscowość",
      value: correctionForm.buyer.town,
      id: "buyer-town",
    },
  ];

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
            variants={{
              hidden: { scale: 0.9 },
              visible: { scale: 1 },
              exit: { scale: 0.9 },
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <Form onSubmit={onSubmitHandler}>
              {originalInvoice && (
                <div>
                  Korygujesz fakturę nr:
                  <strong>{originalInvoice.number}</strong>
                  <p>ID oryginalnej faktury: {originalInvoiceId}</p>
                </div>
              )}
              <TextField
                name="reason"
                variant="outlined"
                value={correctionForm.reason}
                onChange={handleChange}
                helperText="Podaj powód korekty (wymagane)"
                label="Powód korekty"
                fullWidth
                margin="normal"
                required
              />
              <div>
                <span>Data wystawienia:</span>
                <TextField
                  name="createdAt"
                  value={correctionForm.createdAt}
                  onChange={handleChange}
                  id="createdAt"
                  label="Data wystawianie korekty"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  margin="normal"
                />
              </div>
              <div className="addCorrectionInvoice__inputs">
                <div className="addCorrectionInvoice__original-buyer">
                  <h3>Oryginalne dane kupującego:</h3>
                  <p>Kupujący: {originalInvoice?.buyer?.name}</p>
                  <p>NIP: {originalInvoice?.buyer?.nip}</p>
                  <p>Ulica: {originalInvoice?.buyer?.street}</p>
                  <p>Kod pocztowy: {originalInvoice?.buyer?.zipcode}</p>{" "}
                  {/* Odczytujemy 'zipcode' */}
                  <p>Miejscowość: {originalInvoice?.buyer?.town}</p>
                </div>
                <div className="addCorrectionInvoice__corrected-header">
                  <h3>Poprawione dane kupującego:</h3>
                  {buyerFields.map((field) => (
                    <TextField
                      key={field.id}
                      name={field.name}
                      value={field.value}
                      onChange={handleChange}
                      id={field.id}
                      label={field.label}
                      variant="outlined"
                      fullWidth
                      margin="normal"
                    />
                  ))}
                  <TextField
                    name="correctedIssueDate"
                    value={correctionForm.correctedIssueDate}
                    onChange={handleChange}
                    id="correctedIssueDate"
                    label="Nowa data wystawienia"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    name="place"
                    value={correctionForm.place}
                    onChange={handleChange}
                    id="place"
                    label="Miejscowość wystawienia"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    name="note"
                    value={correctionForm.note}
                    onChange={handleChange}
                    id="note"
                    label="Dodatkowe uwagi"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    multiline
                    rows={2}
                  />
                </div>
              </div>

              <h3>Korygowane pozycje produktów:</h3>
              <p>
                Wprowadź nowe, prawidłowe wartości dla pozycji. Różnica zostanie
                obliczona automatycznie.
              </p>
              {correctionForm.correctedItems.length > 0 ? (
                correctionForm.correctedItems.map((item, idx) => {
                  const originalItem = originalInvoice?.products?.find(
                    (p) => p.id === item.id
                  );
                  return (
                    <CorrectionItemRow
                      key={item.id}
                      item={item}
                      index={idx}
                      originalItem={originalItem}
                      handleItemChange={handleItemChange}
                      onRemoveItem={handleRemoveItem}
                    />
                  );
                })
              ) : (
                <p>
                  Brak pozycji do korekty. Proszę dodać nowe lub sprawdzić
                  oryginalną fakturę.
                </p>
              )}
              <FormButton
                type="button"
                text="Dodaj nową pozycję"
                onClick={handleAddItem}
              />

              <div className="addCorrectionInvoice__total">
                <p>Suma netto korekty: {currentTotal.toFixed(2)} zł</p>{" "}
                {/* Zakładam, że getTotal zwraca sumę netto */}
              </div>

              <div className="addCorrectionInvoice__actions">
                <FormButton type="submit" text="Dodaj Fakturę korygującą" />
                <FormButton type="button" text="Anuluj" onClick={onClose} />
              </div>
            </Form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default AddCorrectionInvoiceModal;
