import { useState } from "react";
import "./SelectedYear.css";
import { useStateValue } from "../../assets/utility/StateProvider";
import { deleteDoc, doc, db } from "../../assets/utility/firebase";
//components
import SelectItem from "./SelectItem";
import AddYear from "./AddYear";
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal";

function SelectedYear() {
  const [{ yearArray, user }, dispatch] = useStateValue();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemToDeleteId, setItemToDeleteId] = useState(null);
  const [itemToDeleteName, setItemToDeleteName] = useState(null);

  const deleteItem = async (itemId) => {
    if (itemId) {
      await deleteDoc(doc(db, "invoices", user.uid, "years", itemId));
      closeModal();
    }
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
        {yearArray
          .sort((a, b) => b.data.year - a.data.year)
          .map((item) => (
            <SelectItem
              key={item.id}
              year={item.data.year}
              deleteItem={() => openModal(item.id, item.data.year)}
            />
          ))}
      </ul>

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
