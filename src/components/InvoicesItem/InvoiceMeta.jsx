import DisplayingNumber from "../NumberComponents/DisplayingNumber/DisplayingNumber";

function InvoiceMeta({ item, amountInvoice }) {
  return (
    <>
      <div className="invoicesitem__item">
        <strong>NIP:</strong>
        <span>{item?.nip || "Brak Nip-u"}</span>
      </div>

      <div className="invoicesitem__number invoicesitem__item">
        <strong>Numer Faktury:</strong>
        <span>{item?.number || "Brak danych"}</span>
      </div>

      <div className="invoicesitem__item">
        <strong>Data wystawienia:</strong>
        <span>{item?.date || "Brak danych"}</span>
      </div>

      <div className="invoicesitem__item">
        <strong>Wartość:</strong>
        <DisplayingNumber
          value={amountInvoice}
          renderText={(value) => <span>{value} zł</span>}
        />
      </div>
    </>
  );
}

export default InvoiceMeta;
