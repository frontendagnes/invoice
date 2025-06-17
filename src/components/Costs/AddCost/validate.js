export const validate = (number, contractor, date, amount, test) => {
  if (test) {
    return "Nie przeszedłeś filtra antyspamowego odśwież stronę i spróbuj ponownie";
  }
  if (!number) {
    return "Pole 'Numer Faktury' musi zostać wypełnione";
  }
  if (!contractor) {
    return "Pole 'Kontrahent' musi zostać wypełnione";
  }
  if (!date) {
    return "Pole 'Data' musi zostać wypełnione";
  }
  if (!amount) {
    return "Pole 'Kwota Faktury' musi zostać wypełnione";
  }
  return null;
};

export const validateContractor = (contractor,nip, test) => {
  if (test) {
    return "Nie przeszedłeś filtra antyspamowego odśwież stronę i spróbuj ponownie";
  }
  if (!contractor) {
    return "Pole 'Kontrahent' musi zostać wypełnione";
  }
  if (!nip){
    return "Pole 'NIP' musi zostać wypełnione";
  }
  return null
};