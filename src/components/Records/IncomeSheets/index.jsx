import {
  getFilteredAndSortedDocuments,
  getDisplayDataForTable,
} from "../../../utility/documentFiltres"; // Upewnij się, że ścieżka i nazwa pliku są poprawne
import DisplayingNumber from "../../NumberComponents/DisplayingNumber/DisplayingNumber";
import { getTotal } from "../../../utility/functions"; // Zakładam, że getTotal jest w assets/functions

function IncomeSheets(props) {
  const { months, sumMonth, number, data, cumTotal, selectedYear } = props;

  const filteredAndSortedData = getFilteredAndSortedDocuments(
    data,
    selectedYear,
    number
  );

  return (
    <table>
      <caption>
        <div className="records__total">
          <span>
            Miesiąc: <b>{months[number - 1]}</b>
          </span>
          <span>
            Suma:
            <b>
              <DisplayingNumber
                value={sumMonth(number)} // sumMonth powinno już poprawnie uwzględniać korekty
                renderText={(value) => <b>{value} zł</b>}
              />
            </b>
          </span>
        </div>
      </caption>
      <thead>
        <tr>
          <td>Lp.</td>
          <td>Numer Dokumentu</td>
          <td>Data Wystawienia</td>
          <td>Wartość Dokumentu</td>
          <td>Wartość narastająco</td>
        </tr>
      </thead>
      <tbody>
        {filteredAndSortedData.length > 0 ? ( // Używamy operatora trójargumentowego dla warunkowego renderowania
          filteredAndSortedData.map((item, index) => {
            // Wywołujemy getDisplayDataForTable, przekazując `item` i `getTotal`
            const displayData = getDisplayDataForTable(item, getTotal);
            return (
              <tr key={item.id || index}>
                <td>{index + 1}</td>
                <td>
                  {displayData.number}
                  {displayData.isCorrection &&
                    ` (Korekta: ${displayData.correctionNumber})`}
                  {/* Dodaj informację o numerze korekty, jeśli to korekta */}
                </td>
                <td>{displayData.date}</td>
                <td className="records__amount">
                  <DisplayingNumber
                    value={displayData.worth}
                    renderText={(value) => <b>{value} zł</b>}
                  />
                </td>
                <td className="records__amount">
                  <DisplayingNumber
                    value={cumTotal[index]}
                    renderText={(value) => <b>{value} zł</b>}
                  />
                </td>
              </tr>
            );
          })
        ) : (
          <tr>
            <td colSpan="5">Brak dokumentów dla wybranego miesiąca i roku.</td>
          </tr>
        )}
      </tbody>
      <tfoot>
        <tr>
          <td className="records__summary" colSpan={4}>
            Podsumowanie:
          </td>
          <td className="records__summary">
            <DisplayingNumber
              value={sumMonth(number)} // sumMonth powinno już poprawnie uwzględniać korekty
              renderText={(value) => <b>{value} zł</b>}
            />
          </td>
        </tr>
      </tfoot>
    </table>
  );
}

export default IncomeSheets;

// import { getFilteredAndSortedDocuments } from "../../../assets/utility/documentFiltres";
// import DisplayingNumber from "../../NumberComponents/DisplayingNumber/DisplayingNumber";
// function IncomeSheets(props) {
//   const { months, sumMonth, number, data, getTotal, cumTotal, selectedYear } =
//     props;

//   const dateDisplay = (date) => {
//     const today = new Date(date);
//     const formattedDate = today.toISOString().slice(0, 10);

//     return formattedDate;
//   };
//   const filteredAndSortedData = getFilteredAndSortedDocuments(
//     data,
//     selectedYear,
//     number
//   );

//   return (
//     <table>
//       <caption>
//         <div className="records__total">
//           <span>
//             Miesiąc: <b>{months[number - 1]}</b>
//           </span>
//           <span>
//             Suma:
//             <b>
//               <DisplayingNumber
//                 value={sumMonth(number)}
//                 renderText={(value) => <b>{value} zł</b>}
//               />
//             </b>
//           </span>
//         </div>
//       </caption>
//       <thead>
//         <tr>
//           <td>Lp.</td>
//           <td>Numer Faktury</td>
//           <td>Data Faktury</td>
//           <td>Wartość Faktury</td>
//           <td>Wartość narastająco</td>
//         </tr>
//       </thead>
//       <tbody>
//         {filteredAndSortedData.length > 0 &&
//           // .filter(
//           //   (item) => new Date(item.data?.date).getFullYear() === selectedYear
//           // )
//           // .sort((a, b) => new Date(a.data.date) - new Date(b.data.date))
//           // .filter((item) => new Date(item.data.date).getMonth() + 1 === number)
//           filteredAndSortedData.map((item, index) => (
//             <tr key={index}>
//               <td>{index + 1}</td>
//               <td>{item.data.number || item.data.correctionNumber}</td>
//               <td>{item.data.date || dateDisplay(item.data.createdAt)}</td>
//               <td className="records__amount">
//                 <DisplayingNumber
//                   value={getTotal(item.data.products)}
//                   renderText={(value) => <b>{value} zł</b>}
//                 />
//               </td>
//               <td className="records__amount">
//                 <DisplayingNumber
//                   value={cumTotal[index]}
//                   renderText={(value) => <b>{value} zł</b>}
//                 />
//               </td>
//             </tr>
//           ))}
//       </tbody>
//       <tfoot>
//         <tr>
//           <td className="records__summary" colSpan={4}>
//             Podsumowanie:
//           </td>
//           <td className="records__summary">
//             <DisplayingNumber
//               value={sumMonth(number)}
//               renderText={(value) => <b>{value} zł</b>}
//             />
//           </td>
//         </tr>
//       </tfoot>
//     </table>
//   );
// }

// export default IncomeSheets;
