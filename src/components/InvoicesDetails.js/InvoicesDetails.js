import React from "react";
import { useParams } from "react-router-dom";
import "./InvoicesDetails.css";
import { getTotal } from "../../assets/functions";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { today } from "../../assets/functions";

function InvoicesDetails({ data }) {
  let { invoiceId } = useParams();
  const generatePDF = () => {
    console.log("siema generuje sobie pdf");
    const input = document.querySelector("#invoice");
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const doc = new jsPDF("p", "pt", "a4");
      let width = doc.internal.pageSize.getWidth() - 5;
      let height = doc.internal.pageSize.getHeight();
      doc.addImage(imgData, "JPEG", 0, 0, width, height);
      doc.save(`${today()}-`);
    });
  };
  return (
    <div className="invoicesdetail">
      <button
        className="invoicecdetail__button"
        type="button"
        onClick={generatePDF}
      >
        Generuj fakturę do PDF
      </button>
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
                      <div>
                        {item.data.buyer.nip ? (
                          <div>NIP: {item.data.buyer.nip}</div>
                        ) : null}
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
                    <thead>
                      <tr>
                        <td>Lp.</td>
                        <td className="table__title">Nazwa towaru/usługi</td>
                        <td>Ilość</td>
                        <td className="table__price">Cena jedn. netto</td>
                        <td className="table__price">Wartość brutto</td>
                        <td>VAT</td>
                      </tr>
                    </thead>
                    {item.data.products.map((item, index) => (
                      <tbody key={index}>
                        <tr>
                          <td>{index + 1}</td>
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
              {data
                .filter((item) => item.id === invoiceId)
                .map((item, index) => (
                  <div className="invoicesdetails__siganture" key={index}>
                    <div className="invoicesdetails__buyer">
                      <div className="invoicesdetails__name">
                        {item.data.buyer.name}
                      </div>
                      <div>podpis osoby upoważnionej do odbioru faktury</div>
                    </div>
                    <div className="invoicesdetails__seller">
                      <div className="invoicesdetails__name">
                        {item.data.seller}
                      </div>
                      <div>
                        podpis osoby upoważnionej do wystawienia faktury
                      </div>
                    </div>
                  </div>
                ))}
              <div className="invoicesdetails__bottom">
                Podmiot zwolniony z VAT na podstawie art.113 ust. 1 i 9 ustawy o
                VAT
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default InvoicesDetails;
