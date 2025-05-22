export const validate = (title, quantity, price) => {
  // Parsuje wartości numeryczne na samym początku
  const parsedQuantity = parseFloat(quantity);
  const parsedPrice = parseFloat(price);

  if (!title) {
    return "Wpisz nazwę produktu";
  }

  // Walidacja ilości
  // Ilość powinna być liczbą większą od 0 (np. nie można "zwrócić" 0 produktów)
  if (isNaN(parsedQuantity) || parsedQuantity <= 0) {
    return "Ilość produktu musi być liczbą całkowitą większą od 0";
  }

  // Walidacja ceny
  if (isNaN(parsedPrice)) {
    return "Cena jednostkowa musi być poprawną liczbą";
  }

  // Dodajemy walidację, żeby cena nie była zerem (chyba, że to świadoma decyzja biznesowa, np. darmowy produkt)
  if (parsedPrice === 0) {
    return "Cena jednostkowa nie może być zerem";
  }

  // Jeśli wszystko jest w porządku, zwróć null
  return null;
};
