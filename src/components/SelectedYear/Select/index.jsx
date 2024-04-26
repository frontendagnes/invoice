import React from "react";
import { useStateValue } from "../../../assets/utility/StateProvider";
import { db, deleteDoc, doc } from "../../../assets/utility/firebase";

//componets
import SelectItem from "../SelectItem";

function Select() {
  const [{ yearArray, user }, dispatch] = useStateValue();

  const deleteItem = async (itemId) => {
    await deleteDoc(doc(db, "invoices", user.uid, "years", itemId));
  };
  return (
    <ul className="selectedYear__items">
      {yearArray
        .sort((a, b) => b.data.year - a.data.year)
        .map((item) => (
          <SelectItem
            key={item.id}
            year={item.data.year}
            deleteItem={() => deleteItem(item.id)}
          />
        ))}
    </ul>
  );
}

export default Select;
