import "./PersonDetails.css";
import { memo } from "react";

const PersonDetails = ({ person, title }) => (
  <div className={`correctionDetails__${title}`}>
    <div>{person?.name || `Brak nazwy ${title}`}</div>

    <div>{person?.street || `Brak ulicy ${title}`}</div>
    <div className="person__wrapper">
      <div>{person?.zipcode || `Brak kodu pocztowego ${title}`}</div>
      <div>{person?.town || `Brak miejscowości ${title}`}</div>
    </div>
    <div>NIP: {person?.nip || "Brak NIP-u"}</div>
  </div>
);

const CorrectionDetailsPersons = memo(({ seller, buyer }) => {
  return (
    <div className="correctionDetails__persons">
      <div>
        <div className="person__title">Sprzedawca:</div>
        <PersonDetails person={seller} title="sprzedawca" />
      </div>
      <div>
        <div className="person__title">Nabywca:</div>
        <PersonDetails person={buyer} title="nabywca" />
      </div>
    </div>
  );
});

export default CorrectionDetailsPersons;
