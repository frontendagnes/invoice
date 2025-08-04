export const validate = (title, price, quantity, test) => {
  const newErrors = {};

  // Walidacja pola 'test'
  if (test) {
    newErrors.test =
      "Nie przeszedłeś filtra antyspamowego. Odśwież stronę i spróbuj ponownie";
  }

  // Walidacja wymaganych pól
  if (!title?.trim()) {
    newErrors.title = "Pole 'Nazwa Produktu' musi zostać wypełnione";
  }

  if (price === "" || price === null || price === undefined) {
    newErrors.price = "Pole 'Cena Produktu' musi zostać wypełnione";
  }

  if (quantity === "" || quantity === null || quantity === undefined) {
    newErrors.quantity = "Pole 'Ilość' musi zostać wypełnione";
  }

  const parsedQuantity = parseFloat(quantity);
  if (quantity !== "" && (isNaN(parsedQuantity) || parsedQuantity < 1)) {
    newErrors.quantity = "Pole 'Ilość' musi być liczbą nie mniejszą niż 1";
  }

  // Dokładna walidacja ceny
  const parsedPrice = parseFloat(price);
  if (price !== "" && isNaN(parsedPrice)) {
    newErrors.price = "Pole 'Cena Produktu' musi być liczbą";
  }
if(price <= 0){
  newErrors.price="Cena musi być większa od 0 (zera)"
}
  // Zwróć obiekt błędów lub null, jeśli nie ma błędów
  return Object.keys(newErrors).length ? newErrors : null;
};
