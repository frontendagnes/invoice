function BuyerInfo({ buyer }) {
  return (
    <div className="invoicesitem__item">
      <strong>Nazwa:</strong>
      <span className="invoicesitem__buyer">
        <div>{buyer?.name || "Brak danych"}</div>
        <div>{buyer?.street || "Brak danych"}</div>
        <div>
          {buyer?.zipcode || "Brak danych"} {buyer?.town || "Brak danych"}
        </div>
      </span>
    </div>
  );
}

export default BuyerInfo;
