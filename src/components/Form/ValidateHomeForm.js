export const validate = (
  count,
  year,
  date,
  nameBuyer,
  streetBuyer,
  zipcodeBuyer,
  townBuyer,
  seller
) => {
  if (!count) {
    return "Wpisz numer faktury";
  }
  if (!year) {
    return "Wpisz rok";
  }

  if (!date) {
    return "Data jest wymagana";
  }
  if (!nameBuyer) {
    return "Wpisz nazwę nabywcy";
  }
  if (!streetBuyer) {
    return "Wpisz ulicę nabywcy";
  }
  if (!zipcodeBuyer) {
    return "Wpisz kod pocztowy nabywcy";
  }
  if (!townBuyer) {
    return "Wpisz misato nabywcy";
  }
  // if (!seller) {
  //   return "Wpisz sprzedawcę";
  // }
  return null;
};
export const validateSeller = (name) => {
    if(!name){
        return "Wpisz imię i nazwisko"
    }
    return null
};
