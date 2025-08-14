export const validate = (reason, nip, spamTest) => {
  const newErrors = {
    buyer:{}
  };
  if (!reason) {
    newErrors.reason = "Pole 'Powód Korekty' jest wymagane";
  }
  if (nip) {
    const strippedNip = nip.replace(/\D/g, "");
    if (!/^\d{10}$/.test(strippedNip)) {
      newErrors.buyer.nip = "NIP musi składać się z dokładnie 10 cyfr";
    }
  }
  if (spamTest) {
    newErrors.spamTest =
      "Nie przeszedłeś filtra antyspamowego odśwież stronę i spróbuj jescze raz";
  }
  return Object.keys(newErrors).length ? newErrors : null;
};
