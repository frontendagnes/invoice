// src/hooks/useCorrectionForm.jsx
import { useCallback, useEffect, useState } from "react";
import useFirestore from "../../api/useFirestore/useFirestore.jsx";
import { generateCorrectionNumber } from "./util/generateCorrectionNumber.jsx";
import { today } from "../../utility/functions.jsx";
export const useCorrectionForm = (originalInvoice) => {
  const { getCollectionDocsOnce, addDocument } = useFirestore("invoices");

  const initialFormState = {
    reason: "",
    createdAt: today() || "",
    correctedIssueDate: originalInvoice?.date || "",
    buyer: {
      name: originalInvoice?.buyer?.name || "",
      nip: originalInvoice?.buyer?.nip || "",
      street: originalInvoice?.buyer?.street || "",
      zipCode: originalInvoice?.buyer?.zipcode || "",
      town: originalInvoice?.buyer?.town || "",
    },
    place: originalInvoice?.place || "",
    note: originalInvoice?.note || "",
    // correctedItems będzie zawierać kopie produktów z oryginalnej faktury
    // z dodatkowymi polami do korekty
    correctedItems: [],
  };

  const [correctionForm, setCorrectionForm] = useState(initialFormState);
  const [currentTotal, setCurrentTotal] = useState(0);

  // Funkcja pomocnicza do obliczania wartości dla pojedynczej pozycji
  const calculateItemWorth = (quantity, price, vatRate) => {
    const qty = parseFloat(quantity) || 0;
    const prc = parseFloat(price) || 0;

    // Zakładamy, że cena jest ceną netto. Jeśli brutto, logika się zmieni.
    const worth = qty * prc;
    // const worthWithVat = worth * (1 + vat / 100); // Jeśli potrzebna wartość brutto
    return worth;
  };

  // Funkcja obliczająca sumę wszystkich korygowanych pozycji
  const calculateTotalWorth = useCallback(() => {
    let total = 0;
    correctionForm.correctedItems.forEach((item) => {
      // Bierzemy correctedWorth, ponieważ to jest aktualna wartość pozycji po korekcie
      total += parseFloat(item.correctedWorth || 0);
    });
    setCurrentTotal(total);
  }, [correctionForm.correctedItems]);

  useEffect(() => {
    if (originalInvoice) {
      // Mapujemy oryginalne produkty do formatu correctedItems
      const mappedItems = originalInvoice.products.map((product) => {
        // Obliczamy oryginalną wartość dla punktu odniesienia
        const productQuantity = parseFloat(product.quantity || 0);
        const productPrice = parseFloat(product.price || 0);
        const productVat = parseFloat(product.vat || 0);

        const originalWorth = calculateItemWorth(
          productQuantity,
          productPrice,
          productVat
        );

        return {
          id: product.id, // ID oryginalnego produktu
          itemId: product.id, // Używamy też jako itemId dla kluczy w listach
          title: product.title,
          type: "MODIFICATION", // Domyślnie modyfikacja dla istniejących
          // Oryginalne wartości (niezmienne referencje)
          originalQuantity: product.quantity,
          originalPrice: product.price,
          originalWorth: originalWorth,
          originalVat: product.vat,
          // Skorygowane wartości (edytowalne) - na początku takie same jak oryginalne
          correctedQuantity: product.quantity,
          correctedPrice: product.price,
          correctedWorth: originalWorth, // Na początku skorygowana = oryginalna
          correctedVat: product.vat,
          quantityDifference: 0,
          priceDifference: 0,
          worthDifference: 0,
          vatDifference: 0,
        };
      });
      setCorrectionForm((prev) => ({
        ...prev,
        correctedItems: mappedItems,
      }));
    }
  }, [originalInvoice]); // Zależność od originalInvoice, by załadować dane raz

  // Uruchom obliczanie sumy za każdym razem, gdy zmienią się correctedItems
  useEffect(() => {
    calculateTotalWorth();
  }, [correctionForm.correctedItems, calculateTotalWorth]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Obsługa zagnieżdżonych pól (np. buyer.name)
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setCorrectionForm((prevForm) => ({
        ...prevForm,
        [parent]: {
          ...prevForm[parent],
          [child]: value,
        },
      }));
    } else {
      setCorrectionForm((prevForm) => ({
        ...prevForm,
        [name]: value,
      }));
    }
  };

  const handleItemChange = useCallback(
    (index, fieldName, value) => {
      setCorrectionForm((prevForm) => {
        const updatedItems = [...prevForm.correctedItems];
        const itemToUpdate = { ...updatedItems[index] };

        // Konwertuj zmieniane pola na liczbę, jeśli są numeryczne
        if (
          ["correctedQuantity", "correctedPrice", "correctedVat"].includes(
            fieldName
          )
        ) {
          itemToUpdate[fieldName] = parseFloat(value) || 0; // <--- WAŻNE: ZAWSZE PARSUJ DO LICZBY
        } else {
          itemToUpdate[fieldName] = value; // Dla stringów (np. title)
        }

        // Przelicz correctedWorth i worthDifference
        if (
          ["correctedQuantity", "correctedPrice", "correctedVat"].includes(
            fieldName
          )
        ) {
          const newWorth = calculateItemWorth(
            itemToUpdate.correctedQuantity, // Są już liczbami
            itemToUpdate.correctedPrice, // Są już liczbami
            itemToUpdate.correctedVat // Są już liczbami
          );
          itemToUpdate.correctedWorth = newWorth;

          // Upewnij się, że originalWorth jest również liczbą przed odejmowaniem
          const originalWorthForCalc = parseFloat(
            itemToUpdate.originalWorth || 0
          );
          itemToUpdate.worthDifference = newWorth - originalWorthForCalc;

          itemToUpdate.quantityDifference =
            (parseFloat(itemToUpdate.correctedQuantity) || 0) -
            (parseFloat(itemToUpdate.originalQuantity) || 0);
          itemToUpdate.priceDifference =
            (parseFloat(itemToUpdate.correctedPrice) || 0) -
            (parseFloat(itemToUpdate.originalPrice) || 0);
          itemToUpdate.vatDifference =
            (parseFloat(itemToUpdate.correctedVat) || 0) -
            (parseFloat(itemToUpdate.originalVat) || 0);
        }

        updatedItems[index] = itemToUpdate;
        return { ...prevForm, correctedItems: updatedItems };
      });
    },
    [calculateItemWorth]
  );

  const handleAddItem = useCallback(() => {
    setCorrectionForm((prevForm) => {
      const newItemId = `new-item-${Date.now()}`; // Unikalne ID dla nowej pozycji
      const newItem = {
        id: newItemId,
        itemId: newItemId,
        title: "", // Puste, aby użytkownik mógł wpisać
        type: "ADDITION",
        originalQuantity: 0,
        originalPrice: 0,
        originalWorth: 0,
        originalVat: 0,
        correctedQuantity: 0,
        correctedPrice: 0,
        correctedWorth: 0,
        correctedVat: 0,
        quantityDifference: 0,
        priceDifference: 0,
        worthDifference: 0,
        vatDifference: 0,
      };
      return {
        ...prevForm,
        correctedItems: [...prevForm.correctedItems, newItem],
      };
    });
  }, []);

  const handleRemoveItem = useCallback((index) => {
    setCorrectionForm((prevForm) => {
      const updatedItems = [...prevForm.correctedItems];
      // Usuwamy element z tablicy
      updatedItems.splice(index, 1);
      return {
        ...prevForm,
        correctedItems: updatedItems,
      };
    });
  }, []);

  const createCorrectionPayload = (originalInvoiceId) => {
    // Ta funkcja buduje ostateczny obiekt payloadu do wysłania do bazy danych
    const payload = {
      originalInvoiceId: originalInvoiceId,
      documentType: "CORRECTION",
      createdAt: correctionForm.createdAt,
      recordCreationTimestamp: new Date().toISOString(),
      // correctionNumber zostanie dodany w AddCorrectionInvoiceModal (lub w Firebase Functions)
      reason: correctionForm.reason,
      correctedHeader: {
        correctedIssueDate: correctionForm.correctedIssueDate,
        correctedBuyer: {
          name: correctionForm.buyer.name,
          nip: correctionForm.buyer.nip,
          street: correctionForm.buyer.street,
          zipcode: correctionForm.buyer.zipCode, // Jeśli baza oczekuje 'zipcode'
          town: correctionForm.buyer.town,
        },
        place: correctionForm.place,
        note: correctionForm.note,
      },
      originalInvoiceData: {
        number: originalInvoice.number || "",
        issueDate: originalInvoice.date || "",
        buyer: {
          name: originalInvoice.buyer?.name || "",
          nip: originalInvoice.buyer?.nip || "",
          street: originalInvoice.buyer?.street || "",
          zipcode: originalInvoice.buyer?.zipcode || "",
          town: originalInvoice.buyer?.town || "",
        },
        seller: {
          name: originalInvoice.seller?.name || "",
          nip: originalInvoice.seller?.nip || "",
          street: originalInvoice.seller?.street || "",
          zipcode: originalInvoice.seller?.zipcode || "",
          town: originalInvoice.seller?.town || "",
        },
        products: originalInvoice.products.map((p) => ({
          id: p.id,
          title: p.title || "",
          quantity: Number(p.quantity || 0),
          price: Number(p.price || 0),
          worth: Number(p.worth || 0),
          vat: Number(p.vat || 0),
        })),
        totalWorth: Number(originalInvoice.worth || 0),
        place: originalInvoice.place || "",
        note: originalInvoice.note || "",
      },
      correctedItems: correctionForm.correctedItems.map((item) => ({
        itemId: item.itemId,
        title: item.title || "",
        type: item.type || "",
        originalQuantity: Number(item.originalQuantity || 0),
        originalPrice: Number(item.originalPrice || 0),
        originalWorth: Number(item.originalWorth || 0),
        originalVat: Number(item.originalVat || 0),
        correctedQuantity: Number(item.correctedQuantity || 0),
        correctedPrice: Number(item.correctedPrice || 0),
        correctedWorth: Number(item.correctedWorth || 0),
        correctedVat: Number(item.correctedVat || 0),
        quantityDifference: Number(item.quantityDifference || 0),
        priceDifference: Number(item.priceDifference || 0),
        worthDifference: Number(item.worthDifference || 0),
        vatDifference: Number(item.vatDifference || 0),
      })),
      totalCorrectionWorth: currentTotal, // Suma skorygowanych pozycji
    };
    return payload;
  };
  // Funkcja obsługująca zatwierdzenie formularza
  const handleSubmitCorrection = async (event, originalInvoiceId, onClose) => {
    event.preventDefault();

    try {
      const generatedCorrectionNum = await generateCorrectionNumber(
        originalInvoice.number,
        () => getCollectionDocsOnce("invoiceCorrections")
      );
      const payload = createCorrectionPayload(originalInvoiceId);
      payload.correctionNumber = generatedCorrectionNum;

      await addDocument(payload, "invoiceCorrections");
      onClose();
    } catch (error) {
      console.error("Błąd podczas zapisywania faktury korygującej:", error);
      alert("Wystąpił błąd podczas tworzenia faktury korygującej.");
    }
  };
  return {
    correctionForm,
    currentTotal,
    handleChange,
    handleItemChange,
    handleAddItem,
    handleRemoveItem,
    handleSubmitCorrection,
  };
};

// Dodaj funkcję pomocniczą calculateItemWorth poza hookiem, jeśli nie zależy Ci na memoizacji,
// albo wewnątrz z useCallback, jeśli jest skomplikowana.
// Domyślnie zostawiłem ją wewnątrz, ale można ją przenieść jeśli nie korzysta ze stanu hooka.
