import React from "react";
import "./Costs.css";
import Cost from "../Cost/Cost";
import AddCost from "../AddCost/AddCost";
import { useStateValue } from "../../assets/utility/StateProvider";
function Costs() {
  const [{ costs }] = useStateValue();
  return (
    <div className="costs">
      <AddCost />
      
      {costs.map((item) => (
        <Cost
          key={item.id}
          number={item.data.number}
          contractor={item.data.contractor}
          date={item.data.date}
          amount={item.data.amount}
        />
      ))}
    </div>
  );
}

export default Costs;
