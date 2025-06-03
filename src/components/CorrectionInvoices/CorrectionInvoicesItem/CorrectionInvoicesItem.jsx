import { memo } from "react";
import "./CorrectionInvoicesItem.css";
import { getTotal } from "../../../assets/functions";
import { dateFormated, getCorrectionWorth } from "../util/helpers";
//mui
import VisibilityIcon from "@mui/icons-material/Visibility";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
//componets
import DisplayingNumber from "../../NumberComponents/DisplayingNumber/DisplayingNumber";
import Tooltip from "../../Tooltip/Tooltip";

function CorrectionInvoicesItem({ item, itemId, openDetails, deleteItem }) {
  return (
    <div className="correctionInvoicesItem">
      <div className="correctionInvoicesItem_wrapper">
        <div className="correctionInvoicesItem__content">
          <div className="content__item">
            <strong>Nabywca: </strong>
            {item.originalInvoiceData?.buyer?.name}
          </div>
          <div className="content__item">
            <strong>Numer korety: </strong>
            {item.correctionNumber}
          </div>
          <div className="content__item">
            <strong>Numer faktury oryginalnej: </strong>
            {item.originalInvoiceData?.number}
          </div>
          <div className="content__item">
            <strong>Data korekty: </strong>
            {dateFormated(item.createdAt)}
          </div>
          <div className="content__item">
            <strong>Wartość Faktury oryginalnej: </strong>
            <DisplayingNumber
              value={getTotal(item.originalInvoiceData?.products)}
              renderText={(formatedValue) => (
                <span>{formatedValue || 0} zł</span>
              )}
            />
          </div>
          <div className="content__item">
            <strong>Wartość korekty: </strong>
            <DisplayingNumber
              value={getCorrectionWorth(item.correctedItems)}
              renderText={(formatedValue) => (
                <span>{formatedValue || 0} zł</span>
              )}
            />
          </div>
          <div className="content__item">
            <strong>Wartość faktury po korekcie: </strong>
            <DisplayingNumber
              value={
                getTotal(item.originalInvoiceData?.products) +
                getCorrectionWorth(item.correctedItems)
              }
              renderText={(formatedValue) => (
                <span>{formatedValue || 0} zł</span>
              )}
            />
          </div>
        </div>

        <div className="correctionInvoicesItem__action">
          <Tooltip text={`Podgląd korekty nr ${item.correctionNumber}`}>
            <VisibilityIcon
              fontSize="large"
              color="success"
              onClick={() => openDetails(itemId)}
              titleAccess={`Podgląd korekty nr ${item.correctionNumber}`}
              sx={{ cursor: "pointer" }}
            />
          </Tooltip>
          <Tooltip text={`Usuń korektę nr ${item.correctionNumber}`}>
            <RemoveCircleIcon
              fontSize="large"
              color="error"
              onClick={() => deleteItem(itemId)}
              titleAccess={`Usuń korektę nr ${item.correctionNumber}`}
              sx={{ cursor: "pointer" }}
            />
          </Tooltip>
        </div>
      </div>
    </div>
  );
}

export default memo(CorrectionInvoicesItem);
