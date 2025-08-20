import AddNote from "../../AddNote/AddNote";

const NoteEditor = ({ isEdit, refNote, optionalValue, setIsEdit, itemId }) => {
  return (
    <div className={`invoiceItem__displayNote ${isEdit ? "expanded" : ""}`}>
      <div ref={refNote} className="invoicesItem__note--container">
        <AddNote
          initialNote={optionalValue}
          onClose={setIsEdit}
          invoiceId={itemId}
        />
      </div>
    </div>
  );
};

export default NoteEditor;
