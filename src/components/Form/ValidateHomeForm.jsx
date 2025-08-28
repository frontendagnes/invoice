export const validate = (
  date,
  nameBuyer,
  streetBuyer,
  zipcodeBuyer,
  townBuyer,
  nip,
  place,
  test
) => {
  const newErrors = {};

  if (test) {
    newErrors.test =
      "Nie przeszedłeś filtra antyspamowego. Odśwież stronę i spróbuj ponownie";
  }
  if (!date) {
    newErrors.date = "Data jest wymagana";
  }
  if (!nameBuyer) {
    newErrors.name = "Wpisz nazwę nabywcy";
  }
  if (!streetBuyer) {
    newErrors.street = "Wpisz ulicę nabywcy";
  }
  if (!zipcodeBuyer) {
    newErrors.zipcode = "Wpisz kod pocztowy nabywcy";
  } else {
    // sprawdzamy polski format XX-XXX
    const zipRegex = /^\d{2}-\d{3}$/;
    if (!zipRegex.test(zipcodeBuyer)) {
      newErrors.zipcode = "Kod pocztowy musi być w formacie XX-XXX";
    }
  }
  if (!townBuyer) {
    newErrors.town = "Wpisz misato nabywcy";
  }
  if (!place) {
    newErrors.place = "Wpisz miejsce wystawienia faktury";
  }
  if (nip) {
    const strippedNip = nip.replace(/\D/g, "");
    if (!/^\d{10}$/.test(strippedNip)) {
      newErrors.nip = "NIP musi składać się z dokładnie 10 cyfr";
    }
  }
  return Object.keys(newErrors).length ? newErrors : null;
};

export const validateSeller = (name) => {
  const newErrors = {};
  if (!name) {
    newErrors.name = "Wpisz imię i nazwisko";
  }
  return Object.keys(newErrors).length ? newErrors : null;
};
