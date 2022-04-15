import React from "react";
import { useStateValue } from "../../assets/utility/StateProvider";
import "./PrintSeller.css";
function PrintSeller() {
  const [{ salesman }] = useStateValue();
  return (
    <div className="prinseller">
      {salesman?.map((item) => (
        <div key={item.id}>
          <div>{item.data.seller.name}</div>
          <div>{item.data.seller.street}</div>
          <div className="printseller__wrapper">
            <span>{item.data.seller.zipcode}</span>
            <span>{item.data.seller.town}</span>
          </div>
          <div>{item.data.seller.nip}</div>
        </div>
      ))}
    </div>
  );
}

export default PrintSeller;
