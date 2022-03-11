import React, { useEffect, useState, useCallback } from "react";
import "./Records.css";
// components
import InvoicesItem from "../InvoicesItem/InvoicesItem";
import { getTotal } from "../../assets/functions";

function Records({ data }) {
  const [totalDay, setTotalDay] = useState([]);
  const [cumTotal, setCumTotal] = useState([]);
  const [number, setNumber] = useState(new Date().getMonth() + 1);

  const getTotalMonth = useCallback(() => {
    let i = 0;
    let arr = [];
    while (i < data.length) {
      let date = new Date(data[i].data.date).getMonth() + 1;
      if (date === number) {
        data[i].data.products.map((product) =>
          arr.push({ worth: product.worth })
        );
      }
      i++;
    }

    setTotalDay(arr);
  }, [data, number]);

  useEffect(() => {
    getTotalMonth();
  }, [getTotalMonth]);

  const cumulativeTotal = useCallback(() => {
    let i = 0;
    let arr = [];

    while (i < data.length) {
      let date = new Date(data[i].data.date).getMonth() + 1;
      if (date === number) {
        arr.push(getTotal(data[i].data.products));
      }
      i++;
    }
    
    let num = 0;
    let next = [];
    for (let i = 0; i < arr.length; i++) {
      num = num + arr[i];
      next.push(num);
    }
    setCumTotal(next);
  }, [data, number]);

  useEffect(() => {
    cumulativeTotal();
  }, [cumulativeTotal]);

  const numberChange = (amount) => {
    let num = amount + 1;
    setNumber(num);
  };
  const printButton = () => {
    const months = [
      "Styczeń",
      "Luty",
      "Marzec",
      "Kwiecień",
      "Maj",
      "Czerwiec",
      "Lipiec",
      "Sierpień",
      "Wrzesień",
      "Październik",
      "Listopad",
      "Grudzień",
    ];
    return months.map((item, index) => (
      <button key={index} type="button" onClick={() => numberChange(index)}>
        {item}
      </button>
    ));
  };
  return (
    <div className="records">
      <div className="records__buttons">
        {printButton()}
        {/* <button type="button" onClick={cumulativeTotal}>cummulative Total</button> */}
      </div>
      <div className="records__total">total month:{getTotal(totalDay)} </div>
      <ul>
        {data
          .filter((item) => new Date(item.data.date).getMonth() + 1 === number)
          .map((item, index) => (
            <li key={index}>
              <div>{index + 1}</div>
              <div>{item.data.number}</div>
              <div>{item.data.date}</div>
              <div>
                {item.data.products.map((pr) => (
                  <div>{pr.worth}</div>
                ))}
              </div>
              <div>total Day: {getTotal(item.data.products)}</div>
              <div>Narastająco: {cumTotal[index]} </div>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default Records;
