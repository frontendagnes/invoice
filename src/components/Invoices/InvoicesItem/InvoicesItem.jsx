import { memo, useEffect, useMemo, useRef, useState } from "react";
import { useClickOutside } from "../../../hooks/useClickOutside";
import { getTotal } from "../../../utility/functions";
import "./InvoicesItem.css";
//components
import AddCorrectionInvoiceModal from "../../CorrectionInvoices/AddCorrectionInvoices/AddCorrectionInvoice.jsx";
import DeleteConfirmationModal from "../../DeleteConfirmationModal/DeleteConfirmationModal.jsx";
// Subcomponents
import BuyerInfo from "./BuyerInfo";
import CorrectionSection from "./CorrectionSection";
import InvoiceIcons from "./InvoiceIcons/InvoiceIcons.jsx";
import InvoiceMeta from "./InvoiceMeta.jsx";
import NoteEditor from "./NoteEditor";

function InvoicesItem({
  item,
  itemId,
  openDetails,
  deleteItem,
  allCorrections,
  openCorrectionDetails,
  deleteCorrection,
}) {
  const [isEdit, setIsEdit] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSettings, setIsSettings] = useState(false);
  const [isCorrectionModal, setIsCorrectionModal] = useState(false);

  const refSettingsButton = useRef(null);
  const refNoteButton = useRef(null);
  const refCorrections = useRef(null);
  const refNote = useRef(null);

  const handleClickAwayCorrections = () => {
    if (isSettings) setIsSettings(false);
  };

  const handleClickAwayNote = () => {
    if (isEdit) setIsEdit(false);
  };

  useClickOutside(refCorrections, handleClickAwayCorrections, [
    refSettingsButton,
  ]);
  useClickOutside(refNote, handleClickAwayNote, [refNoteButton]);

  const handleGlobalKeyDown = (event) => {
    if (event.key === "Escape") {
      if (isSettings) setIsSettings(false);
      if (isEdit) setIsEdit(false);
    }
  };
  useEffect(() => {
    if (isSettings || isEdit) {
      document.addEventListener("keydown", handleGlobalKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleGlobalKeyDown);
    };
  }, [isSettings, isEdit]);

  const filteredCorrections = useMemo(() => {
    return (
      allCorrections?.filter(
        (correction) => correction.data.originalInvoiceId === itemId
      ) || []
    );
  }, [allCorrections, itemId]);

  const amountInvoice = getTotal(item?.products) || 0;

  return (
    <div className="invoicesitem">
      {isModalOpen && (
        <DeleteConfirmationModal
          isOpen={isModalOpen}
          onClickYes={() => deleteItem(itemId)}
          onClickNo={() => setIsModalOpen(false)}
          item={item.buyer.name}
        />
      )}

      {isCorrectionModal && (
        <AddCorrectionInvoiceModal
          isOpen={isCorrectionModal}
          setIsOpen={setIsCorrectionModal}
          onClose={() => setIsCorrectionModal(false)}
          originalInvoice={item}
          originalInvoiceId={itemId}
        />
      )}

      <div className="invoicesitem__wrapper">
        <div className="invoicesitem__content">
          <BuyerInfo buyer={item.buyer} />
          <InvoiceMeta item={item} amountInvoice={amountInvoice} />
        </div>

        <InvoiceIcons
          onPreview={() => openDetails(itemId)}
          onEditNote={() => {
            setIsEdit((prev) => !prev);
            setIsSettings(false);
          }}
          onDelete={() => setIsModalOpen(true)}
          onCorrection={() => {
            setIsSettings((prev) => !prev);
            setIsEdit(false);
          }}
          refNoteButton={refNoteButton}
          refSettingsButton={refSettingsButton}
        />
      </div>

      <div className="invoicesItem__note">{item.note}</div>

      <NoteEditor
        isEdit={isEdit}
        refNote={refNote}
        optionalValue={item.note}
        setIsEdit={setIsEdit}
        itemId={itemId}
      />

      <CorrectionSection
        isExpanded={isSettings}
        ref={refCorrections}
        onAddCorrection={() => setIsCorrectionModal(true)}
        corrections={filteredCorrections}
        openCorrectionDetails={openCorrectionDetails}
        deleteCorrection={deleteCorrection}
        onClose={setIsSettings}
      />
    </div>
  );
}

export default memo(InvoicesItem);
