

function CorrectionOriginalBuyer({originalInvoice}) {
  return (
    <div className="addCorrectionInvoice__original-buyer">
      <h3>Oryginalne dane kupującego:</h3>
      <p>Kupujący: {originalInvoice?.buyer?.name}</p>
      <p>NIP: {originalInvoice?.buyer?.nip}</p>
      <p>Ulica: {originalInvoice?.buyer?.street}</p>
      <p>Kod pocztowy: {originalInvoice?.buyer?.zipcode}</p>{" "}
      <p>Miejscowość: {originalInvoice?.buyer?.town}</p>
    </div>
  );
}

export default CorrectionOriginalBuyer;