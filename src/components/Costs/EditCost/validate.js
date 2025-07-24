export const validate = (form, test) => {
  const requiredFields = {
    number: "Pole 'Numer Faktury' musi zostać wypełnione",
    contractor: "Pole 'Kontrahent' musi zostać wypełnione",
    date: "Pole 'Data' musi zostać wypełnione",
    amount: "Pole 'Kwota Faktury' musi zostać wypełnione",
    nip: "Pole 'NIP' musi zostać wypełnione",
  };

  const newErrors = {};

  if (test) {
    newErrors.test =
      "Nie przeszedłeś filtra antyspamowego. Odśwież stronę i spróbuj ponownie";
  }

  for (const field in requiredFields) {
    if (!form[field]) {
      newErrors[field] = requiredFields[field];
    }
  }

  // dodatkowa walidacja NIP-u, tylko jeśli pole jest uzupełnione
  if (form.nip) {
    const strippedNip = form.nip.replace(/\D/g, "");
    if (!/^\d{10}$/.test(strippedNip)) {
      newErrors.nip = "NIP musi składać się z dokładnie 10 cyfr";
    }
  }

  return Object.keys(newErrors).length ? newErrors : null;
};