export const validate = (form, test) => {
  const requiredFields = {
    name: "Pole 'Nazwa Produktu' musi zostać wypełnione",
    price: "Pole 'Cena Produktu' musi zostać wypełnione",
    quantity: "Pole 'Ilość' musi zostać wypełnione",
  };

  const newErrors = {};

  if (test) {
    newErrors.test =
      "Nie przeszedłeś filtra antyspamowego. Odśwież stronę i spróbuj ponownie";
  }

  for (const field in requiredFields) {
    if (
      form[field] === "" ||
      form[field] === null ||
      form[field] === undefined
    ) {
      newErrors[field] = requiredFields[field];
    }
  }

  // dokładna walidacja ilości
  if (form.quantity !== "" && (isNaN(form.quantity) || form.quantity < 0)) {
    newErrors.quantity = "Pole 'Ilość' musi być liczbą nie mniejszą niż 0";
  }

  // dokładna walidacja ceny
  if (form.price !== "" && isNaN(form.price)) {
    newErrors.price = "Pole 'Cena Produktu' musi być liczbą";
  }

  // walidacja NIP – tylko jeśli istnieje
  if (form.nip) {
    const strippedNip = form.nip.replace(/\D/g, "");
    if (!/^\d{10}$/.test(strippedNip)) {
      newErrors.nip = "NIP musi składać się z dokładnie 10 cyfr";
    }
  }

  return Object.keys(newErrors).length ? newErrors : null;
};
