import { useEffect, useRef } from "react";
import "./ModalAddCost.css";
import { motion } from "framer-motion";
import { useClickAway } from "react-use";
//mui
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
//components
import AddCost from "../AddCost/AddCost";

// Zdefiniowanie wariantów animacji
const backdropVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

const modalContentVariants = {
  initial: {
    y: 20,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20,
    },
  },
  exit: {
    y: 20,
    opacity: 0,
    transition: {
      duration: 0.2,
    },
  },
};
function ModalAddCost({ isViewAddCost, setIsViewAddCost }) {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsViewAddCost(false);
      }
    };

    if (isViewAddCost) {
      document.body.classList.add("no-scroll");
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.body.classList.remove("no-scroll");
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isViewAddCost, setIsViewAddCost]);
  const refContent = useRef(null);
  useClickAway(refContent, () => setIsViewAddCost(false));
  return (
    <motion.div
      className="modalAddCost"
      variants={backdropVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      aria-label="modal"
    >
      <motion.div
        ref={refContent}
        className="modalAddCost__content"
        variants={modalContentVariants}
      >
        <IconButton
          sx={{
            position: "absolute",
          }}
          className="modalAddCost__close-icon"
          onClick={() => setIsViewAddCost(false)}
        >
          <CloseIcon
            fontSize="large"
            color="error"
            sx={{ cursor: "pointer" }}
          />
        </IconButton>
        <AddCost setIsViewAddCost={setIsViewAddCost} />
      </motion.div>
    </motion.div>
  );
}

export default ModalAddCost;
