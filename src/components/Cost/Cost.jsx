import { useMemo, useState } from "react";
import "./Cost.css";
//mui
import EditIcon from "@mui/icons-material/Edit";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
//components
import DisplayingNumber from "../NumberComponents/DisplayingNumber/DisplayingNumber";
import Tooltip from "../Tooltip/Tooltip";
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal";
function Cost({ number, contractor, date, amount, deleteItem, id, nip }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const formattedDate = useMemo(
    () => new Date(date).toLocaleDateString(),
    [date]
  );
  return (
    <div className="cost">
      {isModalOpen && (
        <DeleteConfirmationModal
          isOpen={isModalOpen}
          onClickYes={() => deleteItem(id)}
          onClickNo={() => setIsModalOpen(false)}
          item={contractor}
        />
      )}
      <div className="cost__item">
        Numer Faktury: <span>{number}</span>
      </div>
      <div className="cost__item">
        Kontrahent: <span>{contractor}</span>
      </div>

      <div className="cost__item">
        {nip ? (
          <>
            NIP: <span>{nip}</span>
          </>
        ) : (
          "Brak NIP"
        )}
      </div>
      <div className="cost__item">
        Data wystawienia: <span>{formattedDate}</span>
      </div>
      <div className="cost__item">
        Wartość:
        <DisplayingNumber
          value={amount}
          renderText={(value) => (
            <b>{Number.parseFloat(value || 0).toFixed(2)} zł</b>
          )}
        />
      </div>
      <div className="cost__icons">
        <Tooltip text="Edytuj koszt">
          <EditIcon
            onClick={() => console.log("Edit functionality not implemented")}
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
    </div>
  );
}

export default Cost;
