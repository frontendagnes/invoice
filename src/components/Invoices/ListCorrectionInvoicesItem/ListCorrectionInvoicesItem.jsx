import { useState } from "react";
import {
  getCorrectionWorth,
} from "../../CorrectionInvoices/util/helpers";
import "./ListCorrectionInvoicesITem.css";
//mui
import DeleteConfirmationModal from "../../DeleteConfirmationModal/DeleteConfirmationModal";
import ListCorrectionInvoicesItemIcons from "./ListCorrectionInvoicesItemIcons/ListCorrectionInvoicesItemIcons";
import ListCorrectionIvoicesItems from "./ListCorrectionIvoicesItems";
function ListCorrectionInvoicesItem({
  item,
  openCorrectionDetails,
  deleteCorrection,
}) {
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const totalWorthCorrection = getCorrectionWorth(item.data.correctedItems) || 0;

  return (
    <div className="listCorrectionInvoices">
      {isDeleteModal && (
        <DeleteConfirmationModal
          isOpen={isDeleteModal}
          onClickYes={() => deleteCorrection(item.id)}
          onClickNo={() => setIsDeleteModal(false)}
          item={item.data.correctionNumber}
        />
      )}
      <ListCorrectionIvoicesItems item={item} totalWorthCorrection={totalWorthCorrection} />
      <ListCorrectionInvoicesItemIcons
        openCorrectionDetails={() => openCorrectionDetails(item.id)}
        deleteCorrection={() => setIsDeleteModal(true)}
      />
    </div>
  );
}

export default ListCorrectionInvoicesItem;
