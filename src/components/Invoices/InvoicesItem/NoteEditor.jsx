import AddNote from "../../AddNote/AddNote";

const NoteEditor = ({ isEdit, refNote, initialValue, setIsEdit, itemId }) => {
  return (
    <div className={`invoiceItem__displayNote ${isEdit ? "expanded" : ""}`}>
      <div ref={refNote} className="invoicesItem__note--container">
        <AddNote
          initialNote={initialValue}
          onClose={setIsEdit}
          invoiceId={itemId}
        />
      </div>
    </div>
  );
};

export default NoteEditor;
