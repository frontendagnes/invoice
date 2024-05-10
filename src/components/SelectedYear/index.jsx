import React from "react";
import "./SelectedYear.css";
import { useStateValue } from "../../assets/utility/StateProvider";
import {deleteDoc, doc, db} from "../../assets/utility/firebase"
//components
import SelectItem from "./SelectItem";

function SelectedYear() {
   const [{ yearArray, user }, dispatch] = useStateValue();

   const deleteItem = async (itemId) => {
     await deleteDoc(doc(db, "invoices", user.uid, "years", itemId));
   };
   return (
     <div className="selectedYear">
       <h3>Wybierz Rok który chcesz przejrzeć:</h3>
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
     </div>
   );
}

export default SelectedYear;
