// src/utils/correctionNumberGenerator.js

export async function generateCorrectionNumber(
  invoiceNumber,
  getFirestoreDataFunction
) {
  // Sprawdź, czy getFirestoreDataFunction zostało przekazane poprawnie
  if (typeof getFirestoreDataFunction !== "function") {
    console.error(
      "generateCorrectionNumber: Brak funkcji pobierającej dane z Firestore (getFirestoreDataFunction)."
    );
    // W tym przypadku rzucamy błąd, bo nie mamy jak pobrać danych
    throw new Error(
      "Błąd generowania numeru korekty: Nieprawidłowa funkcja dostępu do danych."
    );
  }

  try {
    // getFirestoreDataFunction jest funkcją pochodzącą z hooka useFirestore
    const snapshot = await getFirestoreDataFunction("invoiceCorrections");

    const count = snapshot.size + 1;
    const correctionNumber = `KOR/${invoiceNumber}/${count}`;
    console.log("generateCorrectionNumber: snapshot.size:", snapshot.size);
    return correctionNumber;
  } catch (error) {
    console.error(
      "Błąd podczas pobierania danych dla generowania numeru korekty:",
      error
    );
    // W przypadku błędu (np. z Firestore), możesz zwrócić fallback lub rzucić błąd
    throw error; // Rzuć błąd, aby AddCorrectionInvoiceModal mógł go obsłużyć
  }
}
