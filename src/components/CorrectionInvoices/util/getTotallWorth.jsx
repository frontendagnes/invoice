// src/assets/functions.js (lub src/utils/correctionUtils.js)

// Funkcja do obliczania całkowitej wartości produktów
export const getTotalWorth = (items) => {
  return items.reduce((sum, item) => {
    const quantity = parseFloat(item.quantity || 0);
    const price = parseFloat(item.price || 0);
    const vat = parseFloat(item.vat || 0); // Zakładam, że item.vat to procent (np. 23)
    return sum + quantity * price * (1 + vat / 100);
  }, 0);
};

// Możesz dodać inne pomocnicze funkcje tutaj, np. do formatowania dat.
