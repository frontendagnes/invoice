const CorrectionItemSummary = ({ item }) => {
  const { type, correctedWorth, worthDifference } = item;

  return (
    <div className="correction-item-summary">
      <p>
        Wartość dla pozycji:{" "}
        <strong>{Number(correctedWorth).toFixed(2)} zł</strong>
      </p>
      {type === "MODIFICATION" && worthDifference !== 0 && (
        <p style={{ color: worthDifference < 0 ? "red" : "green" }}>
          Różnica wartości: {Number(worthDifference).toFixed(2)} zł
        </p>
      )}
    </div>
  );
};

export default CorrectionItemSummary;
