function AddCorrectionsHeader({ originalInvoice, originalInvoiceId }) {
  return (
    <div className="add-corrections-header">
      <p>
        Korygujesz fakturę nr: <strong>{originalInvoice.number}</strong>
      </p>
      <p>
        ID oryginalnej faktury: <strong>{originalInvoiceId}</strong>
      </p>
    </div>
  );
}

export default AddCorrectionsHeader;
