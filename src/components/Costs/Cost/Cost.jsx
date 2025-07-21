import { useMemo, useState, useRef, useEffect } from "react";
import "./Cost.css";
import { useClickOutside } from "../../../hooks/useClickOutside";
//mui
import EditIcon from "@mui/icons-material/Edit";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
//components
import DisplayingNumber from "../../NumberComponents/DisplayingNumber/DisplayingNumber";
import Tooltip from "../../Tooltip/Tooltip";
import DeleteConfirmationModal from "../../DeleteConfirmationModal/DeleteConfirmationModal";
import EditCost from "../EditCost/EditCost";
function Cost({ item, itemId }) {
  const { number, contractor, date, amount, deleteItem, nip } = item;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditCost, setIsEditCost] = useState(false);

  const refButton = useRef(null);
  const refEdit = useRef(null);
  useClickOutside(refEdit, () => setIsEditCost(false), [refButton]);

  const handleKeyDown = (event) => {
    if (event.key === "Escape") {
      setIsEditCost(false);
    }
  };
  useEffect(() => {
    if (!isEditCost) return;
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isEditCost]);

  const formattedDate = useMemo(
    () => new Date(date).toLocaleDateString(),
    [date]
  );
  return (
    <div className="cost">
      {isModalOpen && (
        <DeleteConfirmationModal
          isOpen={isModalOpen}
          onClickYes={() => deleteItem(itemId)}
          onClickNo={() => setIsModalOpen(false)}
          item={contractor}
        />
      )}
      <div className="cost__items">
        <div className="cost__item">
          <strong>Numer Faktury:</strong> <span>{number}</span>
        </div>
        <div className="cost__item">
          <strong>Kontrahent:</strong> <span>{contractor}</span>
        </div>

        <div className="cost__item">
          {nip ? (
            <>
              <strong> NIP:</strong> <span>{nip}</span>
            </>
          ) : (
            "Brak NIP"
          )}
        </div>
        <div className="cost__item">
          <strong>Data wystawienia:</strong> <span>{formattedDate}</span>
        </div>
        <div className="cost__item">
          <strong>Wartość:</strong>
          <DisplayingNumber
            value={amount}
            renderText={(value) => (
              <span>{Number.parseFloat(value || 0).toFixed(2)} zł</span>
            )}
          />
        </div>
      </div>
      <div className="cost__actions">
        <Tooltip text="Edytuj koszt">
          <EditIcon
            ref={refButton}
            onClick={() => setIsEditCost((prev) => !prev)}
            color="primary"
            fontSize="medium"
          />
        </Tooltip>
        <Tooltip text="Usuń koszt">
          <RemoveCircleIcon
            onClick={() => setIsModalOpen(true)}
            color="error"
            fontSize="medium"
          />
        </Tooltip>
      </div>
      <div
        ref={refEdit}
        className={`cost__edit ${isEditCost ? "expanded" : ""}`}
      >
        <EditCost
          contractor={contractor}
          number={number}
          date={date}
          amount={amount}
          nip={nip}
          itemId={itemId}
          setIsEditing={setIsEditCost}
        />
      </div>
    </div>
  );
}

export default Cost;
