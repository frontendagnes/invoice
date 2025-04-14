import React from "react";

export function PrintSellerList({ data }) {
  return (
    <div className="prinseller">
      {data?.map((item) => (
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

export function PrintSeller({ data }) {
  return (
    <div className="prinseller">
      <div>{data.name}</div>
      <div>{data.street}</div>
      <div className="printseller__wrapper">
        <span>{data.zipcode}</span>
        <span>{data.town}</span>
      </div>
      <div>{data.nip}</div>
    </div>
  );
}
