import { useState } from "react";
import "./InvoicesItem.css";
import { getTotal } from "../../assets/functions";
//mui
import VisibilityIcon from "@mui/icons-material/Visibility";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import EditIcon from "@mui/icons-material/Edit";
import ConstructionIcon from "@mui/icons-material/Construction";
//components
import DisplayingNumber from "../NumberComponents/DisplayingNumber/DisplayingNumber";
import AddNote from "../AddNote/AddNote";
import Tooltip from "../Tooltip/Tooltip";
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal";

function InvoicesItem({ item, index, openDetails, deleteItem }) {
  const [isEdit, setIsEdit] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCorrectin, setIsCorrection] = useState(false);

  return (
    <div className="invoicesitem">
      {isModalOpen && (
        <DeleteConfirmationModal
          isOpen={isModalOpen}
          onClickYes={() => deleteItem(index)}
          onClickNo={() => setIsModalOpen(false)}
          item={item.data.buyer.name}
        />
      )}
      <div className="invoicesitem__wrapper">
        <div className="invoicesitem__content">
          <div className="invoicesitem__item">
            <strong>{item.data.buyer.name}</strong>
            <strong>{item.data.buyer.street}</strong>
            <strong>
              {item.data.buyer.zipcode} {item.data.buyer.town}
            </strong>
          </div>

          <div className="invoicesitem__item">
            {item.data.buyer.nip ? (
              <>
                <span> NIP:</span> <strong>{item.data.buyer.nip}</strong>
              </>
            ) : (
              <span> BRAK NIp-u </span>
            )}
          </div>

          <div className="invoicesitem__number invoicesitem__item">
            <span> Numer Faktury: </span> <strong>{item.data.number}</strong>
          </div>
          <div className="invoicesitem__item">
            <span>Data wystawienie:</span> <strong>{item.data.date}</strong>
          </div>
          <div className="invoicesitem__item">
            <span>Wartość:</span>
            <DisplayingNumber
              value={getTotal(item.data.products)}
              renderText={(formattedValue) => (
                <strong>{formattedValue || 0} zł</strong>
              )}
            />
          </div>
        </div>
        <div className="invoicesitem__icons">
          <Tooltip text="Podgląd faktury">
            <VisibilityIcon
              onClick={() => openDetails(index)}
              color="success"
              fontSize="medium"
              titleAccess="Podgląd Faktury"
            />
          </Tooltip>
          <Tooltip text="Dodaj notatkę">
            <EditIcon
              onClick={() => setIsEdit(!isEdit)}
              color="primary"
              fontSize="medium"
              titleAccess="Edytuj notaktę"
            />
          </Tooltip>
          <Tooltip text="Usuń fakturę">
            <RemoveCircleIcon
              onClick={() => setIsModalOpen(true)}
              color="error"
              fontSize="medium"
              titleAccess="Usuń Fakturę"
            />
          </Tooltip>
          <Tooltip text="Koryguj fakturę">
            <ConstructionIcon
              onClick={() => setIsCorrection(!isCorrectin)}
              color="action"
              fontSize="medium"
              titleAccess="Koryguj fakturę"
            />
          </Tooltip>
        </div>
      </div>
      <div className="invoicesitem__note">{item.data?.note}</div>
      {isCorrectin && (
        <div>
          tutaj komponenty odpowiedzialne za korygowanie faktury logika
          oczywiście osobno
        </div>
      )}
      {isEdit ? (
        <AddNote
          optionalValue={item.data.note}
          setIsEdit={setIsEdit}
          index={index}
        />
      ) : null}
    </div>
  );
}

export default InvoicesItem;
