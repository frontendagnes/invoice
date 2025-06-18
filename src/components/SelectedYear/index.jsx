import { useState } from "react";
import "./SelectedYear.css";
import { useStateValue } from "../../state/StateProvider";
import useFirestore from "../../api/useFirestore/useFirestore";
//components
import SelectItem from "./SelectItem";
import AddYear from "./AddYear";
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal";
import ValidationError from "../ValidationError/ValidationError";
function SelectedYear() {
  const [{ yearArray }, dispatch] = useStateValue();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemToDeleteId, setItemToDeleteId] = useState(null);
  const [itemToDeleteName, setItemToDeleteName] = useState(null);
  const { deleteDocument: deleteYear, errorFirestore } =
    useFirestore("invoices");
  const deleteItem = async (itemId) => {
    if (!itemId) {
      dispatch({
        type: "ALERT_ERROR",
        item: "Nie można usunąć elementu, ponieważ nie został on znaleziony.",
      });
      return;
    }
    await deleteYear("years", itemId);
    closeModal();
    dispatch({
      type: "ALERT_SUCCESS",
      item: `Rok ${itemToDeleteName} został usunięty`,
    });
  };

  const openModal = (id, name) => {
    setItemToDeleteId(id);
    setItemToDeleteName(name);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setItemToDeleteId(null);
    setItemToDeleteName(null);
    setIsModalOpen(false);
  };

  return (
    <div className="selectedYear">
      <h2>Zarządzanie Latami</h2>
      <div className="selectedYear__addYear">
        <AddYear />
      </div>
      <h3>Kilknij Rok który chcesz wybrać:</h3>
      <ul className="selectedYear__items">
        {yearArray ? (
          yearArray
            .sort((a, b) => b.data.year - a.data.year)
            .map((item) => (
              <SelectItem
                key={item.id}
                year={item.data.year}
                deleteItem={() => openModal(item.id, item.data.year)}
              />
            ))
        ) : (
          <ValidationError text="Nie znaleziono żadnych lat." />
        )}
      </ul>
      {errorFirestore && <ValidationError text={errorFirestore} />}
      {isModalOpen && (
        <DeleteConfirmationModal
          isOpen={isModalOpen}
          onClickYes={() => deleteItem(itemToDeleteId)}
          onClickNo={closeModal}
          item={itemToDeleteName}
        />
      )}
    </div>
  );
}

export default SelectedYear;
