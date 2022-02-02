import React from "react";
import { useParams } from "react-router-dom";
import "./InvoicesDetails.css";
import { getTotal } from "../../assets/functions";
import { jsPDF } from "jspdf";
function InvoicesDetails({ data }) {
  let { invoiceId } = useParams();
  const generatePDF = () => {
    console.log("siema generuje sobie pdf");
    let doc = new jsPDF("p", "pt", "a4");
    doc.html(document.querySelector("#invoice"), {
      callback: function (pdf) {
        let pageCount = doc.internal.getNumberOfPages();
        pdf.deletePage(pageCount);
        pdf.save("invoice.pdf");
      },
    });
  };
  return (
    <div className="invoicesdetail">
      <div className="invoicesdetail__wrapper">
        {data
          .filter((item) => item.id === invoiceId)
          .map((item, index) => (
            <div key={index} id="invoice">
              <div className="invoicesdetail__top">
                <div className="invoicesdetail__number">
                  <span className="invoicesdetail__text">Faktura nr:</span>
                  <span>{item.data.number}</span>
                </div>
                <div className="invoicesdetail__date">
                  <div>
                    <span>Data faktury:</span>
                    <span>{item.data.date}</span>
                  </div>
                  <div>
                    <span>Data zakończenie dostawy lub wykonania usługi:</span>
                    <span>{item.data.date}</span>
                  </div>
                </div>
              </div>
              <div className="invoicesdetail__middle">
                <div>
                  <div className="invoicevdetail__buyer">
                    <div className="invoicesdetail__headline">Nabywca:</div>
                    <div>
                      <div>{item.data.buyer.name}</div>
                      <div>{item.data.buyer.street}</div>
                      <div>
                        <span>{item.data.buyer.zipcode} </span>
                        <span>{item.data.buyer.town}</span>
                      </div>
                    </div>
                  </div>
                  <div className="invoicevdetail__seller">
                    <div className="invoicesdetail__headline">Sprzedawca:</div>
                    <div>{item.data.seller}</div>
                  </div>
                </div>
                <div>
                  <div>Forma płatności: {item.data.payment}</div>
                  <div>Termin płatności: {item.data.date}</div>
                </div>
              </div>
              <div className="invoicesdetails__products">
                <div>
                  <table>
                    <tr>
                      <td>Lp.</td>
                      <td className="table__title">Nazwa towaru/usługi</td>
                      <td>Ilość</td>
                      <td className="table__price">Cena jedn. netto</td>
                      <td className="table__price">Wartość brutto</td>
                      <td>VAT</td>
                    </tr>
                    {item.data.products.map((item) => (
                      <tbody>
                        <tr>
                          <td>{item.lp}</td>
                          <td className="table__title">{item.title}</td>
                          <td>{item.quantity} szt.</td>
                          <td className="table__price">{item.price} zł</td>
                          <td className="table__price">{item.worth} zł</td>
                          <td>{item.vat}</td>
                        </tr>
                      </tbody>
                    ))}
                  </table>
                </div>
              </div>
              <div className="invoicesdetails__summary">
                <div>
                  <span>
                    <b>Razem: </b>
                  </span>
                  <span>{getTotal(item.data.products)} PLN</span>
                </div>
                <div>
                  <span>
                    <b>Zapłacono:</b>
                  </span>
                  <span>{getTotal(item.data.products)} PLN </span>
                </div>
                <div>
                  <span>
                    <b>Pozostało do zapłaty:</b>
                  </span>
                  <span>0 PLN</span>
                </div>
              </div>
              <div className="invoicesdetails__siganture">
                <div>podpis osoby upoważnionej do odbioru faktury</div>
                <div>podpis osoby upoważnionej do wystawienia faktury</div>      
              </div>
              <div className="invoicesdetails__bottom">
                Podmiot zwolniony z VAT na podstawie art.113 ust. 1 i 9 ustawy o
                VAT
              </div>
            </div>
          ))}
      </div>
      <button
        className="invoicecdetail__button"
        type="button"
        onClick={generatePDF}
      >
        Generuj fakturę do PDF
      </button>
    </div>
  );
}

export default InvoicesDetails;
