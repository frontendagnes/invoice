import { useState } from "react";
import "./InvoicesItem.css";
import { getTotal } from "../../assets/functions";
// Importujemy getDateFromItem, ale nie będziemy go używać bezpośrednio w renderze InvoicesItem
// import { getDateFromItem } from "../../assets/utility/documentFiltres";

//mui
import VisibilityIcon from "@mui/icons-material/Visibility";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import EditIcon from "@mui/icons-material/Edit";
import ConstructionIcon from "@mui/icons-material/Construction";
//components
import DisplayingNumber from "../NumberComponents/DisplayingNumber/DisplayingNumber";
import AddNote from "../AddNote/AddNote";
import Tooltip from "../Tooltip/Tooltip";
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal";
import AddCorrectionInvoice from "../CorrectionInvoices/AddCorrectionInvoices/AddCorrectionInvoice";
import ListCorrectionInvoices from "../CorrectionInvoices/ListCorrectionInvoices/ListCorrectionInvoices";

function InvoicesItem({ item, index, openDetails, deleteItem }) {
  const [isEdit, setIsEdit] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCorrectionModalOpen, setIsCorrectionModalOpen] = useState(false);

  const handleCloseCorrectionModal = () => {
    setIsCorrectionModalOpen(false);
  };

  // 1. Określamy typ dokumentu
  const documentType = item.data?.documentType || "INVOICE"; // Domyślnie na INVOICE

  // 2. Tworzymy obiekt displayData dynamicznie, bazując na typie dokumentu
  let displayData = {};

  if (documentType === "CORRECTION") {
    // Obliczamy sumę worthDifference ze wszystkich skorygowanych pozycji
    const totalWorthDifference = item.data.correctedItems.reduce(
      (sum, currentItem) => {
        // Upewniamy się, że worthDifference jest liczbą
        return sum + (Number(currentItem.worthDifference) || 0);
      },
      0
    );

    displayData = {
      // DANE KUPUJĄCEGO DLA KOREKTY (priorytet: skorygowane, fallback: oryginalne)
      // Upewniamy się, że dane są zawsze dostępne
      buyerName:
        item.data.correctedHeader?.correctedBuyer?.name ||
        item.data.originalInvoiceData?.buyer?.name ||
        "Brak nazwy",
      buyerStreet:
        item.data.correctedHeader?.correctedBuyer?.street ||
        item.data.originalInvoiceData?.buyer?.street ||
        "Brak ulicy",
      buyerZipCode:
        item.data.correctedHeader?.correctedBuyer?.zipcode ||
        item.data.originalInvoiceData?.buyer?.zipcode ||
        "Brak kodu",
      buyerTown:
        item.data.correctedHeader?.correctedBuyer?.town ||
        item.data.originalInvoiceData?.buyer?.town ||
        "Brak miasta",
      buyerNip:
        item.data.correctedHeader?.correctedBuyer?.nip ||
        item.data.originalInvoiceData?.buyer?.nip ||
        "Brak NIP",

      // Numer faktury korygującej (jej własny numer)
      correctionNumber: item.data.correctionNumber || "Brak nr korekty",
      // Numer oryginalnej faktury, której dotyczy korekta
      originalInvoiceNumber:
        item.data.originalInvoiceData?.number || "Brak nr oryginału",
      // Data wystawienia korekty - formatujemy jako string
      date: item.data.createdAt
        ? new Date(item.data.createdAt).toLocaleDateString("pl-PL")
        : "Brak daty korekty",
      worth: totalWorthDifference, // Wartość korekty (różnica +/-)
      note: item.data.note || "Brak notatki", // Notatka dla korekty
      isCorrection: true,
      isEditable: false, // Korekty zazwyczaj nie są edytowalne przez ten panel
      isDeletable: true, // Można usuwać korekty
      isCorrectable: false, // Korekty nie koryguje się dalej
    };
  } else {
    // Dane dla standardowej faktury (INVOICE)
    displayData = {
      // DANE KUPUJĄCEGO DLA FAKTURY
      buyerName: item.data.buyer?.name || "Brak nazwy",
      buyerStreet: item.data.buyer?.street || "Brak ulicy",
      buyerZipCode: item.data.buyer?.zipcode || "Brak kodu",
      buyerTown: item.data.buyer?.town || "Brak miasta",
      buyerNip: item.data.buyer?.nip || "Brak NIP",

      number: item.data.number || "Brak numeru", // Numer faktury
      date: item.data.date
        ? new Date(item.data.date).toLocaleDateString("pl-PL")
        : "Brak daty", // Data wystawienia faktury
      worth: getTotal(item.data.products) || 0, // Całkowita wartość faktury
      note: item.data.note || "Brak notatki", // Notatka dla faktury
      isCorrection: false,
      isEditable: true, // Faktury są edytowalne
      isDeletable: true, // Można usuwać faktury
      isCorrectable: true, // Faktury można korygować
    };
  }

  // Funkcja pomocnicza do określania tytułu dokumentu
  const getDocumentTitle = () => {
    return displayData.isCorrection ? "Faktura Korygująca" : "Faktura VAT";
  };

  return (
    <div className="invoicesitem">
      {isModalOpen && (
        <DeleteConfirmationModal
          isOpen={isModalOpen}
          onClickYes={() => deleteItem(item.id)}
          onClickNo={() => setIsModalOpen(false)}
          item={displayData.buyerName}
        />
      )}

      {/* AddCorrectionInvoice jest modalem do TWORZENIA korekty, więc pokazujemy go TYLKO dla oryginalnych faktur */}
      {/* Kontrolowane przez displayData.isCorrectable, które dla korekt jest false */}
      {displayData.isCorrectable && ( // Pokazuj tylko jeśli faktura jest korygowalna (czyli nie jest korektą)
        <AddCorrectionInvoice
          isOpen={isCorrectionModalOpen}
          onClose={handleCloseCorrectionModal}
          originalInvoiceId={item.id}
          originalInvoice={item.data}
        />
      )}

      <div className="invoicesitem__wrapper">
        <div className="invoicesitem__content">
          {/* Typ dokumentu i opcjonalnie numer korekty */}
          <div className="invoicesitem__item">
            {/* <strong>{getDocumentTitle()}</strong> */}
            {displayData.isCorrection && displayData.correctionNumber && (
              <span style={{ marginLeft: "10px", color: "gray" }}>
                (Nr korekty: {displayData.correctionNumber})
              </span>
            )}
          </div>

          {/* Dane kupującego - teraz displayData będzie je miało ujednolicone */}
          <div className="invoicesitem__item">
            <strong>{displayData.buyerName}</strong>
            <strong>{displayData.buyerStreet}</strong>
            <strong>
              {displayData.buyerZipCode} {displayData.buyerTown}
            </strong>
          </div>

          <div className="invoicesitem__item">
            {displayData.buyerNip && displayData.buyerNip !== "Brak NIP" ? ( // Dodatkowy warunek na "Brak NIP"
              <>
                <span> NIP:</span> <strong>{displayData.buyerNip}</strong>
              </>
            ) : (
              <span> BRAK NIP-u </span>
            )}
          </div>

          <div className="invoicesitem__number invoicesitem__item">
            <span> Numer: </span>{" "}
            <strong>
              {/* Dla korekty pokazujemy numer oryginalnej faktury */}
              {displayData.isCorrection
                ? displayData.originalInvoiceNumber
                : displayData.number}
            </strong>
          </div>

          <div className="invoicesitem__item">
            <span>Data wystawienia:</span> <strong>{displayData.date}</strong>
          </div>
          <div className="invoicesitem__item">
            <span>Wartość:</span>
            <DisplayingNumber
              value={displayData.worth}
              renderText={(formattedValue) => (
                <strong>{formattedValue || 0} zł</strong>
              )}
            />
          </div>
        </div>

        <div className="invoicesitem__icons">
          {/* Ikona podglądu */}
          <Tooltip text={`Podgląd ${getDocumentTitle()}`}>
            <VisibilityIcon
              onClick={() => openDetails(item.id)}
              color="success"
              fontSize="medium"
              titleAccess={`Podgląd ${getDocumentTitle()}`}
            />
          </Tooltip>

          {/* Ikona edycji notatki */}
          {displayData.isEditable && (
            <Tooltip text="Dodaj notatkę">
              <EditIcon
                onClick={() => setIsEdit(!isEdit)}
                color="primary"
                fontSize="medium"
                titleAccess="Edytuj notatkę"
              />
            </Tooltip>
          )}

          {/* Ikona usuwania */}
          {displayData.isDeletable && (
            <Tooltip text={`Usuń ${getDocumentTitle()}`}>
              <RemoveCircleIcon
                onClick={() => setIsModalOpen(true)}
                color="error"
                fontSize="medium"
                titleAccess={`Usuń ${getDocumentTitle()}`}
              />
            </Tooltip>
          )}

          {/* Ikona korygowania tylko dla oryginalnych faktur */}
          {displayData.isCorrectable && (
            <Tooltip text="Koryguj fakturę">
              <ConstructionIcon
                onClick={() => setIsCorrectionModalOpen(true)}
                color="action"
                fontSize="medium"
                titleAccess="Koryguj fakturę"
              />
            </Tooltip>
          )}

          {/* Wyświetlanie listy korekt dla DANEJ FAKTURY (jeśli to faktura, nie korekta) */}
          {/* Zakładam, że oryginalna faktura ma pole item.data.correctionInvoices (tablicę ID korekt lub ich pełnych danych) */}
          {!displayData.isCorrection &&
            item.data.correctionInvoices &&
            item.data.correctionInvoices.length > 0 && (
              <Tooltip text="Pokaż korekty do tej faktury">
                {/* Załóżmy, że ListCorrectionInvoices przyjmuje tablicę obiektów korekt */}
                {/* i id oryginalnej faktury */}
                <ListCorrectionInvoices
                  originalInvoiceId={item.id}
                  corrections={item.data.correctionInvoices}
                />
              </Tooltip>
            )}
        </div>
      </div>
      <div className="invoicesitem__note">{displayData.note}</div>

      {isEdit ? (
        <AddNote
          optionalValue={displayData.note}
          setIsEdit={setIsEdit}
          index={item.id} // Użyj item.id jako identyfikatora
        />
      ) : null}
    </div>
  );
}

export default InvoicesItem;