const CorrectionItemDetails = ({ item }) => {
  const { originalQuantity, originalPrice, originalWorth, originalVat } = item;

  return (
    <div className="correction-item-details">
      <h5>Wartości oryginalne</h5>
      <p>Ilość: {Number(originalQuantity).toFixed(2)}</p>
      <p>Cena jednostkowa: {Number(originalPrice).toFixed(2)} zł</p>
      <p>Wartość całkowita: {Number(originalWorth).toFixed(2)} zł</p>
      <p>VAT: {Number(originalVat).toFixed(2)}%</p>
    </div>
  );
};

export default CorrectionItemDetails;
