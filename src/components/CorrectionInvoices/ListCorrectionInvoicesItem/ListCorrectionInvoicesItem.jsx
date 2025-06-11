import { useState } from "react";
import "./ListCorrectionInvoicesITem.css";
import { dateFormated, getCorrectionWorth } from "../util/helpers";
//mui
import VisibilityIcon from "@mui/icons-material/Visibility";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import Tooltip from "../../Tooltip/Tooltip";
import DeleteConfirmationModal from "../../DeleteConfirmationModal/DeleteConfirmationModal";
function ListCorrectionInvoicesItem({
  item,
  itemId,
  openCorrectionDetails,
  deleteCorrection,
}) {
  const [isDeleteModal, setIsDeleteModal] = useState(false)
  const totalWorthCorrection = getCorrectionWorth(item.correctedItems) || 0;

  return (
    <div className="listCorrectionInvoices">
      {isDeleteModal && (
        <DeleteConfirmationModal
          isOpen={isDeleteModal}
          onClickYes={() => deleteCorrection(itemId)}
          onClickNo={() => setIsDeleteModal(false)}
          item={item.correctedHeader.correctedBuyer.name}
        />
      )}
      <div className="listCorrectionInvoices__items">
        <div className="listCorrectionInvoices__item">
          <strong>Numer faktury:</strong>
          {item.correctionNumber}
        </div>
        <div className="listCorrectionInvoices__item">
          <strong>Data wystwaienia:</strong>
          {dateFormated(item.createdAt)}
        </div>
        <div className="listCorrectionInvoices__item">
          <strong>Kwota korekty (różnica): </strong>
          {totalWorthCorrection} zł
        </div>
      </div>
      <div className="listCorrectionInvoices__action">
        <Tooltip text={`Podgląd korekty nr ${item.correctionNumber}`}>
          <VisibilityIcon
            fontSize="medium"
            color="success"
            onClick={() => openCorrectionDetails(itemId)}
            titleAccess={`Podgląd korekty nr ${item.correctionNumber}`}
            sx={{ cursor: "pointer" }}
          />
        </Tooltip>
        <Tooltip text={`Usuń korektę nr ${item.correctionNumber}`}>
          <RemoveCircleIcon
            fontSize="medium"
            color="error"
            onClick={() => setIsDeleteModal(true)}
            titleAccess={`Usuń korektę nr ${item.correctionNumber}`}
            sx={{ cursor: "pointer" }}
          />
        </Tooltip>
      </div>
    </div>
  );
}

export default ListCorrectionInvoicesItem;
