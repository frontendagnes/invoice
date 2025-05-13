import { AnimatePresence, motion } from "framer-motion";
import { useRef } from "react";
import { useClickAway } from "react-use";
import { useFocusTrap } from "../../hooks/useFocusTrap";
import FormButton from "../Form/FormButton/FormButton.jsx";
import "./DeleteConfirmationModal.css";

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

  const message = item
    ? `Element "${item}" zostanie trwale usunięty, czy na pewno chcesz kontynuować?`
    : "Czy na pewno chcesz kontynuować tę operację?";

  return (
    <AnimatePresence>
      <motion.div
        key="modal"
        className="deleteConfirmationModal"
        role="dialog"
        aria-modal="true"
        variants={modalVariants}
        initial="hidden"
        animate={isOpen ? "visible" : "hidden"}
        exit="exit"
      >
        <motion.div
          className="deleteConfirmationModal__content"
          ref={contentRef}
          onKeyDown={handleKeyDown}
          variants={{
            hidden: { scale: 0.9 },
            visible: { scale: 1 },
            exit: { scale: 0.9 },
          }}
        >
          <h2>{message}</h2>
          <div className="deleteConfirmationModal__buttons">
            <FormButton
              text="Tak"
              onClick={onClickYes}
              styles={{
                backgroundColor: "red",
                color: "white",
                "&:hover": {
                  backgroundColor: "darkred",
                },
              }}
              ref={yesButtonRef}
            />
            <FormButton text="Nie" onClick={onClickNo} ref={noButtonRef} />
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default DeleteConfirmationModal;
