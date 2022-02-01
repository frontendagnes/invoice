import React from "react";
import { useParams } from "react-router-dom";
import "./InvoicesDetails.css";
function InvoicesDetails({ data }) {
 let { invoiceId } = useParams()
  return (
    <div className="invoicesdetail">
      {data
        .filter((item) => item.id === invoiceId)
        .map((item, index) => (
          <div key={index}>
            {item.id} <br /> <br /> {item.data.number}
          </div>
        ))}
    </div>
  );
}

export default InvoicesDetails;
