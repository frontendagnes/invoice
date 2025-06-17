import AddNote from "../../AddNote/AddNote";

const NoteEditor = ({ isEdit, refNote, optionalValue, setIsEdit, itemId }) => {
  return (
    <div className={`invoiceItem__displayNote ${isEdit ? "expanded" : ""}`}>
      <div ref={refNote} className="invoicesItem__note--container">
        <AddNote
          optionalValue={optionalValue}
          setIsEdit={setIsEdit}
          index={itemId}
        />
      </div>
    </div>
  );
};

export default NoteEditor;
