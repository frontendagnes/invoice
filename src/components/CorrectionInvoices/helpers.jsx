/**
 * Bezpiecznie usuwa pojedynczy, zagnieżdżony błąd z obiektu błędów,
 * bez modyfikowania oryginalnego obiektu stanu.
 *
 * @param {object} prevErrors - Poprzedni obiekt błędów. Może być zagnieżdżony.
 * @param {string} path - Ścieżka do błędu do usunięcia (np. "buyer.nip").
 * @returns {object} Nowy obiekt błędów z usuniętym błędem.
 */
export const clearErrorByPath = (prevErrors, path) => {
  // 1. Sprawdzamy warunki początkowe. Jeśli nie ma błędów do przetworzenia
  // lub ścieżka nie została podana, zwracamy pusty obiekt lub poprzednie błędy.
  if (!prevErrors || !path) {
    return prevErrors || {};
  }

  // 2. Dzielimy ścieżkę na poszczególne klucze (np. "buyer.nip" -> ["buyer", "nip"]).
  const keys = path.split(".");

  // 3. Tworzymy płytką kopię obiektu błędów, aby nie modyfikować oryginalnego stanu.
  // Dzięki temu React może wykryć zmianę i przeładować komponent.
  const next = Array.isArray(prevErrors) ? [...prevErrors] : { ...prevErrors };

  // 4. Inicjujemy wskaźnik 'cur', który będzie "przechodził" w dół struktury obiektu.
  let cur = next;

  // 5. Iterujemy po kluczach, aby znaleźć zagnieżdżony obiekt,
  // który zawiera błąd do usunięcia. Zatrzymujemy się na przedostatnim kluczu.
  for (let i = 0; i < keys.length - 1; i++) {
    const k = keys[i]; // Obecny klucz (np. "buyer")
    const v = cur?.[k]; // Wartość pod tym kluczem

    // Jeśli ścieżka nie istnieje, nie ma nic do czyszczenia, więc zwracamy kopię bez zmian.
    if (v == null) {
      return next;
    }

    // Tworzymy płytką kopię zagnieżdżonego obiektu lub tablicy, aby uniknąć
    // modyfikacji oryginalnych danych z obiektu 'prevErrors'.
    cur[k] = Array.isArray(v) ? [...v] : { ...v };
    // Przesuwamy wskaźnik 'cur' do następnego poziomu zagnieżdżenia.
    cur = cur[k];
  }

  // 6. Docieramy do ostatniego klucza ze ścieżki.
  const last = keys[keys.length - 1];

  // 7. Sprawdzamy, czy ostatni klucz istnieje w obiekcie, który znaleźliśmy.
  // Jeśli tak, to oznacza, że znaleźliśmy błąd.
  if (cur && Object.prototype.hasOwnProperty.call(cur, last)) {
    // Usuwamy błąd z obiektu.
    delete cur[last];
  }

  // 8. Zwracamy nowy obiekt z usuniętym błędem.
  return next;
};

/**
 * Oblicza wartość netto pozycji na podstawie ilości i ceny.
 * @param {number|string} quantity - Ilość produktu.
 * @param {number|string} price - Cena produktu.
 * @returns {number} Wartość netto pozycji.
 */
export const calculateItemWorth = (quantity, price) => {
  const qty = parseFloat(quantity) || 0;
  const prc = parseFloat(price) || 0;
  return qty * prc;
};
