import ReactDOM from "react-dom"; // <-- portal
import "./DeleteConfirmationModal.css";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { useClickAway } from "react-use";
import { useFocusTrap } from "../../hooks/useFocusTrap.jsx";
import FormButton from "../Form/FormButton/FormButton.jsx";

const modalVariants = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, scale: 0.8, transition: { duration: 0.2 } },
};

function DeleteConfirmationModal({ isOpen, onClickYes, onClickNo, item }) {
  const contentRef = useRef();
  const yesButtonRef = useRef(null);
  const noButtonRef = useRef(null);

  useClickAway(contentRef, onClickNo);
  const handleKeyDown = useFocusTrap(
    contentRef,
    yesButtonRef,
    noButtonRef,
    isOpen,
    onClickNo
  );

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

  if (!isOpen) return null;

  const modalContent = (
    <AnimatePresence>
      <motion.div
        key="modal"
        className="deleteConfirmationModal"
        role="dialog"
        aria-modal="true"
        variants={modalVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <motion.div
          className="deleteConfirmationModal__content"
          ref={contentRef}
          onKeyDown={handleKeyDown}
          variants={{
            initial: { scale: 0.9 },
            animate: { scale: 1 },
            exit: { scale: 0.9 },
          }}
        >
          <h2>
            {item
              ? `Element "${item}" zostanie trwale usunięty, czy na pewno chcesz kontynuować?`
              : "Czy na pewno chcesz kontynuować tę operację?"}
          </h2>
          <div className="deleteConfirmationModal__buttons">
            <FormButton
              text="Tak"
              onClick={onClickYes}
              color="error"
              ref={yesButtonRef}
            />
            <FormButton text="Nie" onClick={onClickNo} ref={noButtonRef} />
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );

  // Renderujemy modal w body przez portal
  return ReactDOM.createPortal(modalContent, document.body);
}

export default DeleteConfirmationModal;
