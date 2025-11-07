// src/hooks/useCorrectionForm.jsx
import { useCallback, useEffect, useMemo, useState } from "react";
import useFirestore from "../../api/useFirestore/useFirestore.jsx";
import { useStateValue } from "../../state/StateProvider.jsx";
import { today } from "../../utility/functions.jsx";
import { validate } from "./AddCorrectionInvoices/validate.jsx";
import { clearErrorByPath, calculateItemWorth } from "./helpers.jsx";
import { generateCorrectionNumber } from "./util/generateCorrectionNumber.jsx";
export const useCorrectionForm = (originalInvoice) => {
  const { getCollectionDocsOnce, addDocument } = useFirestore("invoices");
  const [, dispatch] = useStateValue();

  const [errors, setErrors] = useState({});
  const [spamTest, setSpamTest] = useState("");
  const [itemToDeleteIndex, setItemToDeleteIndex] = useState(null);

  const initialFormState = useMemo(() => {
    // Mapujemy oryginalne produkty do formatu correctedItems
    const mappedItems =
      originalInvoice?.products?.map((product) => {
        const originalWorth = calculateItemWorth(
          product.quantity,
          product.price
        );
        return {
          id: product.id,
          itemId: product.id,
          title: product.title,
          type: "MODIFICATION",
          originalQuantity: product.quantity,
          originalPrice: product.price,
          originalWorth: originalWorth,
          originalVat: product.vat,
          correctedQuantity: product.quantity,
          correctedPrice: product.price,
          correctedWorth: originalWorth,
          correctedVat: product.vat,
          quantityDifference: 0,
          priceDifference: 0,
          worthDifference: 0,
          vatDifference: 0,
        };
      }) || [];

    return {
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
      correctedItems: mappedItems,
    };
  }, [originalInvoice]);
  const [correctionForm, setCorrectionForm] = useState(initialFormState);
  const [currentTotal, setCurrentTotal] = useState(0);

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

        const originalWorth = calculateItemWorth(productQuantity, productPrice);

        return {
          id: product.id,
          itemId: product.id,
          title: product.title,
          type: "MODIFICATION",
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

  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target;

      if (name.includes(".")) {
        // np. "buyer.nip", "buyer.name", ...
        const [parent, child] = name.split(".");

        setCorrectionForm((prevForm) => ({
          ...prevForm,
          [parent]: {
            ...prevForm[parent],
            [child]: value,
          },
        }));

        // >>> KLUCZOWE: czyścimy dokładnie ten błąd po ścieżce
        if (errors?.[parent]?.[child] !== undefined) {
          setErrors((prev) => clearErrorByPath(prev, name));
        }
      } else {
        // pola płaskie (reason, place, note, itp.)
        setCorrectionForm((prevForm) => ({
          ...prevForm,
          [name]: value,
        }));

        if (errors?.[name] !== undefined) {
          setErrors((prev) => {
            const next = { ...prev };
            delete next[name];
            return next;
          });
        }
      }
    },
    [errors, setCorrectionForm, setErrors]
  );
  const handleItemChange = useCallback(
    // dla komponentu CorrectionItemRow
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
            itemToUpdate.correctedPrice // Są już liczbami
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
    [calculateItemWorth, errors]
  );

  const handleAddItem = useCallback(() => {
    setCorrectionForm((prevForm) => {
      const newItemId = `new-item-${Date.now()}`; // Unikalne ID dla nowej pozycji
      const newItem = {
        id: newItemId,
        itemId: newItemId,
        title: "",
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

  const handleOpenDeleteModal = (index) => {
    setItemToDeleteIndex(index);
  };

  const handleCloseDeleteModal = () => {
    setItemToDeleteIndex(null);
  };
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
    handleCloseDeleteModal();
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
          zipcode: correctionForm.buyer.zipCode,
          town: correctionForm.buyer.town,
        },
        place: correctionForm.place || "",
        note: correctionForm.note || "",
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
    setErrors({});
    const { reason } = correctionForm;
    const nip = correctionForm.buyer.nip;

    const errorText = validate(reason, nip, errors.spamTest);
    if (errorText) {
      dispatch({
        type: "ALERT__ERROR",
        item: "Sprwadż formularz i popraw pola zaznaczone na czerwono",
      });
      setErrors(errorText);
      return;
    }

    try {
      const generatedCorrectionNum = await generateCorrectionNumber(
        originalInvoice.number,
        () => getCollectionDocsOnce("invoiceCorrections")
      );
      const payload = createCorrectionPayload(originalInvoiceId);
      payload.correctionNumber = generatedCorrectionNum;

      await addDocument(payload, "invoiceCorrections");
      onClose();
      dispatch({
        type: "ALERT_SUCCESS",
        item: "Faktura korygująca została utworzona",
      });
    } catch (error) {
      console.error("Błąd podczas zapisywania faktury korygującej:", error);
      dispatch({
        type: "ALERT__ERROR",
        item: "Wystąpił błąd podczas tworzenia faktury korygującej.",
      });
    }
  };
  // Porównanie płaskie i zagnieżdżone (buyer, correctedItems itd.)
  const isFormChanged = useCallback(() => {
    // Porównujemy wszystkie pola, w tym zagnieżdżone obiekty
    // `initialFormState` jest stałą wartością, więc porównanie działa poprawnie.
    const hasHeaderChanged =
      correctionForm.reason !== initialFormState.reason ||
      correctionForm.createdAt !== initialFormState.createdAt ||
      correctionForm.correctedIssueDate !==
        initialFormState.correctedIssueDate ||
      correctionForm.buyer.name !== initialFormState.buyer.name ||
      correctionForm.buyer.nip !== initialFormState.buyer.nip ||
      correctionForm.buyer.street !== initialFormState.buyer.street ||
      correctionForm.buyer.zipCode !== initialFormState.buyer.zipCode ||
      correctionForm.buyer.town !== initialFormState.buyer.town ||
      correctionForm.place !== initialFormState.place ||
      correctionForm.note !== initialFormState.note;

    const areItemsChanged =
      JSON.stringify(correctionForm.correctedItems) !==
      JSON.stringify(initialFormState.correctedItems);

    return hasHeaderChanged || areItemsChanged;
  }, [correctionForm, initialFormState]);

  return {
    spamTest,
    setSpamTest,
    errors,
    correctionForm,
    currentTotal,
    handleChange,
    handleItemChange,
    handleAddItem,
    handleRemoveItem,
    handleSubmitCorrection,
    isFormChanged,
    itemToDeleteIndex,
    handleOpenDeleteModal,
    handleCloseDeleteModal,
  };
};
