import { db, doc, setDoc } from "./firebase";

// aktualizacja wszystkich pół na raz
export const updateSellerAll = async (property, user, dispatch) => {
  const refSeller = doc(db, "invoices", user.uid, "seller", "item-seller123");

  await setDoc(refSeller, {
    seller: {
      name: property.name,
      street: property.street,
      zipcode: property.zipcode,
      town: property.town,
      nip: property.nip,
    },
  })
    .then(() => {
      dispatch({
        type: "ALERT_SUCCESS",
        item: `Aktualizacja przebiegła poprawnie`,
      });
    })
    .catch((error) => {
      dispatch({ type: "ALERT__ERROR", item: error.message });
    });
};

// aktualizacja poszczególnych pól
export const updateSellerField = async (field, value, user, dispatch) => {
  const refSeller = doc(db, "invoices", user.uid, "seller", "item-seller123");

  await setDoc(
    refSeller,
    {
      seller: {
        [field]: value,
      },
    },
    { merge: true }
  )
    .then(() => {
      dispatch({
        type: "ALERT_SUCCESS",
        item: `Aktualizacja ${field.toUpperCase()} przebiegła poprawnie`,
      });
    })
    .catch((error) => {
      dispatch({ type: "ALERT__ERROR", item: error.message });
    });
};