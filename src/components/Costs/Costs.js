import React, { useEffect, useState } from "react";
import "./Costs.css";
import { useStateValue } from "../../assets/utility/StateProvider";
import {
  deleteDoc,
  doc,
  db,
  getCosts,
  getDocs,
  collection,
} from "../../assets/utility/firebase";
//components
import DateFilter from "../DateFilter/DateFilter";
import NameFilter from "../NameFilter/NameFilter";
import Cost from "../Cost/Cost";
import AddCost from "../AddCost/AddCost";
import TabGenerator from "../TabGenerator/TabGenerator";

function Costs() {
  const [{ user, costs }, dispatch] = useStateValue();
  // const [costs, setCosts] = useState([]);


  const deleteItem = async (itemId) => {
    await deleteDoc(doc(db, "invoices", user.uid, "costs", itemId))
      .then(() => {
        dispatch({ type: "ALERT_DELETE" });
      })
      .catch((error) =>
        dispatch({ type: "ALERT__ERROR", item: error.message })
      );
  };
  return (
    <div className="costs">
      <TabGenerator
        component={
          <>
            <AddCost />
            {costs?.map((item) => (
              <Cost
                key={item.id}
                index={item.id}
                number={item.data.number}
                contractor={item.data.contractor}
                date={item.data.date}
                amount={item.data.amount}
                nip={item.data.nip}
                deleteItem={deleteItem}
              />
            ))}
          </>
        }
        title="Dodaj Koszt"
        component1={
          <>
            <h5>Wyszukaj po dacie faktury</h5>
            <DateFilter data={costs} deleteItem={deleteItem} isCost={true} />
            <NameFilter data={costs} deleteItem={deleteItem} isCost={true} />
          </>
        }
        title1="Wyszukaj koszty"
      />
    </div>
  );
}

export default Costs;
