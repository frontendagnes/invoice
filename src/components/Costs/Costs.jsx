import React, { useEffect, useState } from "react";
import "./Costs.css";
import { useStateValue } from "../../assets/utility/StateProvider";
import { today } from "../../assets/functions";
import { deleteDoc, doc, db } from "../../assets/utility/firebase";
//components
import Cost from "../Cost/Cost";
import AddCost from "../AddCost/AddCost";
import TabGenerator from "../TabGenerator/TabGenerator";
// mui
import { TextField } from "@mui/material";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
function Costs() {
  const [{ user, costs, selectedYear }, dispatch] = useStateValue();

  const [text, setText] = useState("");
  const [anyDate, setAnyDate] = useState(today());
  const resetDate = () => {
    setAnyDate(today());
  };
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
            {costs
              .filter(
                (item) =>
                  new Date(item.data.date).getFullYear() === selectedYear
              )
              .sort(
                (a, b) =>
                  new Date(b.data.date).getTime() -
                  new Date(a.data.date).getTime()
              )
              .map((item) => (
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
            <div>
              <h5>Wyszukaj po dacie faktury</h5>
              <div className="datefilter">
                <div className="datefilter__input">
                  <div className="datefilter__input--width">
                    <TextField
                      type="date"
                      value={anyDate}
                      onChange={(e) => setAnyDate(e.target.value)}
                      fullWidth
                    />
                  </div>
                  <RemoveCircleIcon
                    onClick={resetDate}
                    color="error"
                    fontSize="large"
                    className="datefilter__button"
                  />
                </div>
                {costs
                  .filter(
                    (item) =>
                      new Date(item.data.date).getFullYear() === selectedYear
                  )
                  .filter((item) => item.data.date === anyDate)
                  .map((item) => (
                    <Cost
                      key={item.id}
                      index={item.id}
                      number={item.data.number}
                      contractor={item.data.contractor}
                      date={item.data.date}
                      amount={item.data.amount}
                      deleteItem={deleteItem}
                    />
                  ))}
              </div>
            </div>
            <div>
              <h5>Zestawienie Kosztów</h5>
              <div className="namefilter">
                <div className="namefilter__input">
                  <TextField
                    type="text"
                    vlaue={text}
                    onChange={(e) => setText(e.target.value)}
                    id="outlined-basic"
                    label="Wyszukaj wpisując kontrahenta lub numer faktury"
                    variant="outlined"
                    autoComplete="off"
                    fullWidth
                  />
                </div>

                {costs
                  .filter(
                    (item) =>
                      new Date(item.data.date).getFullYear() === selectedYear
                  )
                  .sort(
                    (a, b) =>
                      new Date(b.data.date).getTime() -
                      new Date(a.data.date).getTime()
                  )
                  .filter(
                    (item) =>
                      item.data.contractor
                        .toLowerCase()
                        .includes(text.toLowerCase()) ||
                      item.data.number
                        .toLowerCase()
                        .includes(text.toLowerCase())
                  )
                  .map((item) => (
                    <Cost
                      key={item.id}
                      index={item.id}
                      number={item.data.number}
                      contractor={item.data.contractor}
                      date={item.data.date}
                      amount={item.data.amount}
                      deleteItem={deleteItem}
                    />
                  ))}
              </div>
            </div>
          </>
        }
        title1="Wyszukaj koszty"
      />
    </div>
  );
}

export default Costs;
