export const validate = (number, contractor, date, amount, nip, test) => {
  const newErrors = {};
  if (test) {
    newErrors.test =
      "Nie przeszedłeś filtra antyspamowego odśwież stronę i spróbuj ponownie";
  }
  if (!number) {
    newErrors.number = "Pole 'Numer Faktury' musi zostać wypełnione";
  }
  if (!contractor) {
    newErrors.contractor = "Pole 'Kontrahent' musi zostać wypełnione";
  }
  if (!date) {
    newErrors.date = "Pole 'Data' musi zostać wypełnione";
  }
  if (!amount) {
    newErrors.amount = "Pole 'Kwota Faktury' musi zostać wypełnione";
  }
  if (nip) {
    const strippedNip = nip.replace(/\D/g, "");
    if (!/^\d{10}$/.test(strippedNip)) {
      newErrors.nip = "NIP musi składać się z dokładnie 10 cyfr";
    }
  }
  return Object.keys(newErrors).length ? newErrors : null;
};

export const validateContractor = (contractor, nip, test) => {
  const newErrors = {};
  if (test) {
    newErrors.test =
      "Nie przeszedłeś filtra antyspamowego odśwież stronę i spróbuj ponownie";
  }
  if (!contractor) {
    newErrors.contractor = "Pole 'Kontrahent' musi zostać wypełnione";
  }

  if (nip) {
    const strippedNip = nip.replace(/\D/g, "");
    if (!/^\d{10}$/.test(strippedNip)) {
      newErrors.nip = "NIP musi składać się z dokładnie 10 cyfr";
    }
  }
  return Object.keys(newErrors).length ? newErrors : null;
};

// export const validateContractor = (contractor, nip, test) => {
//   if (test) {
//     return "Nie przeszedłeś filtra antyspamowego odśwież stronę i spróbuj ponownie";
//   }
//   if (!contractor) {
//     return "Pole 'Kontrahent' musi zostać wypełnione";
//   }
//   if (!nip) {
//     return "Pole 'NIP' musi zostać wypełnione";
//   }
//   return null;
// };
