import { memo } from "react";
import "./CorrectionInvoices.css";
//components
import CorrectionInvoicesItem from "./CorrectionInvoicesItem/CorrectionInvoicesItem";
import ValidationError from "../ValidationError/ValidationError";

function CorrectionsList({ data, openDetails, deleteItem }) {

  if (data.length === 0)
    return (
      <div className="correctionsList__empty">
        <ValidationError text="Nie znaleziono żadnych faktur krygujących" />
      </div>
    );
  return (
    <div className="correctionsList">
      {data.map((item) => (
        <CorrectionInvoicesItem
          key={item.id}
          itemId={item.id}
          item={item.data}
          openDetails={openDetails}
          deleteItem={deleteItem}
        />
      ))}
    </div>
  );
}

export default memo(CorrectionsList);
