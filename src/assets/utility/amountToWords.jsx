let numberToWordsPLInstance = null; // Będziemy używać tylko tej funkcji

/**
 * Konwertuje kwotę liczbową na słowa w języku polskim, uwzględniając złotówki i grosze.
 * Funkcja zwraca status "do zapłaty", "do zwrotu" lub "rozliczono do zera".
 * Jest asynchroniczna, ponieważ dynamicznie ładuje bibliotekę.
 *
 * @param {number} amount - Kwota do konwersji. Może być dodatnia, ujemna lub zero.
 * @returns {Promise<string>} Kwota wyrażona słownie z odpowiednim statusem.
 */
export const amountToWords = async (amount) => {
  if (isNaN(amount) || typeof amount !== "number") {
    console.error(
      "amountToWords: Provided amount is not a valid number.",
      amount
    );
    return "Nieprawidłowa kwota";
  }

  if (amount === 0) {
    return "Słownie: Zero złotych";
  }

  // Dynamiczne ładowanie biblioteki `polish-number-to-words` tylko raz
  if (!numberToWordsPLInstance) {
    try {
      const module = await import("polish-number-to-words");

      // Sprawdzamy, czy numberToWordsPL jest dostępne
      if (
        module.default &&
        typeof module.default.numberToWordsPL === "function"
      ) {
        numberToWordsPLInstance = module.default.numberToWordsPL;
      } else if (typeof module.numberToWordsPL === "function") {
        numberToWordsPLInstance = module.numberToWordsPL;
      } else {
        console.error(
          "amountToWords: Could not find 'numberToWordsPL' in the dynamically imported module.",
          "Available properties:",
          Object.keys(module)
        );
        return `Błąd importu biblioteki (kwota: ${amount} zł)`;
      }
    } catch (error) {
      console.error(
        "amountToWords: Error during dynamic import of 'polish-number-to-words':",
        error
      );
      return `Błąd ładowania biblioteki (kwota: ${amount} zł)`;
    }
  }

  // Funkcja pomocnicza do odmiany słów (uproszczona)
  const pluralizeBasic = (number, singular, few, many) => {
    // Liczby od 11 do 19 zawsze mają formę "many"
    if (number >= 11 && number <= 19) {
      return many;
    }
    const lastDigit = number % 10;
    if (lastDigit === 1) {
      return singular;
    }
    if (lastDigit >= 2 && lastDigit <= 4) {
      return few;
    }
    return many;
  };

  // Jeśli funkcja konwersji została pomyślnie załadowana
  if (numberToWordsPLInstance) {
    const absAmount = Math.abs(amount);
    const integerPart = Math.floor(absAmount);
    const decimalPart = Math.round((absAmount * 100) % 100);

    let words = numberToWordsPLInstance(integerPart); // Konwertujemy tylko część całkowitą

    // Dodajemy walutę główną ("złotych") z poprawną odmianą, używając naszej prostej funkcji
    words += ` ${pluralizeBasic(integerPart, "złoty", "złote", "złotych")}`;

    // Dodajemy grosze
    if (decimalPart > 0) {
      let groszWords = numberToWordsPLInstance(decimalPart);
      words += ` i ${groszWords} ${pluralizeBasic(
        decimalPart,
        "grosz",
        "grosze",
        "groszy"
      )}`;
    } else {
      words += ` i zero groszy`; // Zawsze dodajemy "zero groszy" dla formalności
    }



    return `${words}`.trim();
  }

  return `Błąd: Funkcja konwersji niedostępna (kwota: ${amount} zł)`;
};
