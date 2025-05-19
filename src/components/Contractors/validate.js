export const validateContractor = (contractor, nip, test) => {
  if (test) {
    return "Nie przeszedłeś filtra antyspamowego odśwież stronę i spróbuj ponownie";
  }
  if (!contractor) {
    return "Pole 'Kontrahent' musi zostać wypełnione";
  }
//   if (!nip) {
//     return "Pole 'NIP' musi zostać wypełnione";
//   }
  return null;
};
