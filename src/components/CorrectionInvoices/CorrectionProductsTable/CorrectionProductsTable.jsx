import { memo, Fragment } from "react";
import "./CorrectionProductsTable.css"
const THead = memo(() => {
  return (
    <thead>
      <tr>
        <td>Lp.</td>
        <td>Nazwa towaru</td>
        <td>Ilość</td>
        <td>Cena jedn.</td>
        <td>Wartość brutto</td>
        <td>VAT</td>
      </tr>
    </thead>
  );
});

const CorrectionProductsTable = memo(
  ({
    products,
    isCorrectionTable,
    totalOriginalWorth,
    totalCorrectionWorth,
    totalWorthAfterCorrection,
  }) => {
    if (!products || products.length === 0) {
      return <div>Brak produktów do wyświetlenia.</div>;
    }

    return (
      <div className="correctionDetails__productsTable">
        <table>
          <THead />
          <tbody>
            {products.map((product, index) => (
              <Fragment
                key={
                  isCorrectionTable
                    ? product.itemId || index
                    : product.number || index
                }
              >
                <tr>
                  <td>{index + 1}</td>
                  <td className="table__title">
                    {product.title || "Brak nazwy"}
                  </td>
                  <td>
                    {isCorrectionTable
                      ? product.correctedQuantity || 0
                      : product.quantity || 0}{" "}
                    szt.
                  </td>
                  <td className="table__price">
                    {Number.parseFloat(
                      isCorrectionTable
                        ? product.correctedPrice || 0
                        : product.price || 0
                    ).toFixed(2)}{" "}
                    zł
                  </td>
                  <td className="table__price">
                    {Number.parseFloat(
                      isCorrectionTable
                        ? product.correctedWorth || 0
                        : product.worth || 0
                    ).toFixed(2)}{" "}
                    zł
                  </td>
                  <td>
                    {isCorrectionTable
                      ? product.correctedVat || 0
                      : product.vat || 0}
                  </td>
                </tr>
                {isCorrectionTable && ( // Renderuj wiersz różnicy tylko dla tabeli korekty
                  <tr key={`diff-${product.itemId || index}`} className="diff-table">
                    <td colSpan={2} className="table__diff">
                      Różnica:
                    </td>
                    <td>{product.quantityDifference || 0} szt.</td>
                    <td>
                      {Number.parseFloat(product.priceDifference || 0).toFixed(
                        2
                      )}
                    </td>
                    <td>
                      {Number.parseFloat(product.worthDifference || 0).toFixed(
                        2
                      )}
                    </td>
                    <td>{product.vatDifference || 0}</td>
                  </tr>
                )}
              </Fragment>
            ))}
          </tbody>
          {isCorrectionTable && ( // Stopka tylko dla tabeli korekty
            <tfoot>
              <tr>
                <td colSpan={3}>Podsumowanie oryginalnej faktury:</td>
                <td colSpan={3}>
                  {Number.parseFloat(totalOriginalWorth).toFixed(2)} zł
                </td>
              </tr>
              <tr>
                <td colSpan={3}>Łączna wartość korekty (różnica):</td>
                <td colSpan={3}>
                  {Number.parseFloat(totalCorrectionWorth).toFixed(2)} zł
                </td>
              </tr>
              <tr>
                <td colSpan={3}>Wartość faktury po korekcie:</td>
                <td colSpan={3}>
                  {Number.parseFloat(totalWorthAfterCorrection).toFixed(2)} zł
                </td>
              </tr>
            </tfoot>
          )}
        </table>
      </div>
    );
  }
);

export default CorrectionProductsTable;
