import { db, doc, setDoc } from "./firebase";

export const updateSellerName = async (value, user, dispatch) => {
  const refSeller = doc(db, "invoices", user.uid, "seller", "item-seller123");

  await setDoc(
    refSeller,
    {
      seller: {
        name: value,
      },
    },
    { merge: true }
  )
    .then(() => {
      dispatch({
        type: "ALERT_SUCCESS",
        item: `Aktualizacja NAZWY przebiegła poprawnie`,
      });
    })
    .catch((error) => {
      dispatch({ type: "ALERT__ERROR", item: error.message });
    });
};

export const updateSellerStreet = async (value, user, dispatch) => {
  const refSeller = doc(db, "invoices", user.uid, "seller", "item-seller123");

  await setDoc(
    refSeller,
    {
      seller: {
        street: value,
      },
    },
    { merge: true }
  )
    .then(() => {
      dispatch({
        type: "ALERT_SUCCESS",
        item: `Aktualizacja ULICY przebiegła poprawnie`,
      });
    })
    .catch((error) => {
      dispatch({ type: "ALERT__ERROR", item: error.message });
    });
};

export const updateSellerZipcode = async (value, user, dispatch) => {
  const refSeller = doc(db, "invoices", user.uid, "seller", "item-seller123");

  await setDoc(
    refSeller,
    {
      seller: {
        zipcode: value,
      },
    },
    { merge: true }
  )
    .then(() => {
      dispatch({
        type: "ALERT_SUCCESS",
        item: `Aktualizacja KODU POCZTOWEGO przebiegła poprawnie`,
      });
    })
    .catch((error) => {
      dispatch({ type: "ALERT__ERROR", item: error.message });
    });
};

export const updateSellerTown = async (value, user, dispatch) => {
  const refSeller = doc(db, "invoices", user.uid, "seller", "item-seller123");

  await setDoc(
    refSeller,
    {
      seller: {
        town: value,
      },
    },
    { merge: true }
  )
    .then(() => {
      dispatch({
        type: "ALERT_SUCCESS",
        item: `Aktualizacja MIEJSCOWOŚCI przebiegła poprawnie`,
      });
    })
    .catch((error) => {
      dispatch({ type: "ALERT__ERROR", item: error.message });
    });
};

export const updateSellerNip = async (value, user, dispatch) => {
  const refSeller = doc(db, "invoices", user.uid, "seller", "item-seller123");

  await setDoc(
    refSeller,
    {
      seller: {
        nip: value,
      },
    },
    { merge: true }
  )
    .then(() => {
      dispatch({
        type: "ALERT_SUCCESS",
        item: `Aktualizacja NIP-u przebiegła poprawnie`,
      });
    })
    .catch((error) => {
      dispatch({ type: "ALERT__ERROR", item: error.message });
    });
};

// Pierwsza funkcja na wszystko

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
