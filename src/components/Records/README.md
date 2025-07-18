# 📊 Records Module – Rejestry przychodów i kosztów

Moduł `Records` odpowiada za wizualizację i druk zestawień przychodów, kosztów oraz rocznych podsumowań finansowych.

---

## 📁 Struktura komponentu

```
Records/
├── Records.jsx
├── useRecords.jsx
├── IncomeTab/
│   └── IncomeTab.jsx
├── CostTab/
│   └── CostTab.jsx
├── SummaryTab/
│   └── SummaryTab.jsx
├── IncomeSheets.jsx
├── CostSheets.jsx
├── YearSheets.jsx
├── RecordsActions/
│   └── RecordsActions.jsx
├── MonthAndYear/
│   └── MonthAndYear.jsx
├── SelectMonth/
│   └── SelectMonth.jsx
├── months.js
├── records.style.css
```

---

## 🧠 Logika danych – `useRecords`

Hook `useRecords()` obsługuje:

- **selectedMonthNumber** – aktualnie wybrany miesiąc (1-12)
- **selectedMonthName** – nazwa wybranego miesiąca (string z `months`)
- **isYearSummaryVisible** – bool, czy widoczny jest widok rocznego podsumowania
- **cumulativeIncome** – przychody narastające
- **monthlyIncomeTotals** – suma przychodów na każdy miesiąc
- **monthlyCostTotals** – suma kosztów na każdy miesiąc
- **selectedYear** – aktualnie wybrany rok
- **costs** – lista kosztów z globalnego stanu (np. z `useStateValue()`)

Funkcje pomocnicze:

- `changeMonthByIndex(index: number)`
- `calculateIncomeForMonth(monthNumber: number)`
- `calculateCostsForMonth(monthNumber: number)`
- `getYearlyIncomeTotal()`
- `getYearlyCostTotal()`
- `getYearEndBalance()`

---

## 🧩 Komponenty zakładek

### `IncomeTab`

Wyświetla:
- Zestawienie faktur przychodowych
- Podsumowanie miesiąca
- Druk PDF

Propsy:
```js
{
  data, selectedMonthNumber, selectedYear,
  cumulativeIncome, calculateIncomeForMonth,
  setIsYearSummaryVisible, setSelectedMonthName,
  changeMonthByIndex, setSelectedMonthNumber
}
```

---

### `CostTab`

Wyświetla:
- Zestawienie faktur kosztowych
- Podsumowanie miesiąca
- Druk PDF

Propsy:
```js
{
  costs, selectedMonthNumber, selectedYear,
  calculateCostsForMonth, setIsYearSummaryVisible,
  setSelectedMonthName, changeMonthByIndex, setSelectedMonthNumber
}
```

---

### `SummaryTab`

Wyświetla:
- Zestawienie roczne przychodów i kosztów
- Druk PDF

Propsy:
```js
{
  selectedMonthNumber, selectedYear,
  getYearlyIncomeTotal, getYearlyCostTotal,
  getYearEndBalance, monthlyIncomeTotals, monthlyCostTotals,
  changeMonthByIndex, setSelectedMonthName
}
```

---

## 🖨️ Drukowanie

Wszystkie zakładki używają hooka `usePrint()`, który opiera się na `useReactToPrint` i obsługuje:
- Referencję do zawartości (`ref`)
- Funkcję `handlePrint()`

---

## 📌 Dodatkowe komponenty

### `RecordsActions`

Wspólny pasek akcji:
- Przycisk `Drukuj`
- Przycisk `Podsumowanie roku`

Propsy:
```js
{ onPrint: () => void, onYearSummary: () => void }
```

---

### `MonthAndYear`

Widok selektora miesiąca (`<SelectMonth>`) i roku (`<ViewSelectedYear>`)

Propsy:
```js
{ numberChange, setSelectMonth, number }
```

---

## 📅 months.js

Tablica nazw miesięcy w języku polskim:

```js
export const months = [
  "Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec",
  "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"
];
```

---

## ✅ TODO / dalszy rozwój

- [X] Obsługa wielu lat i przełączania między nimi
- [ ] Eksport do Excel/CSV
- [ ] Widok kontrahenta w szczegółach faktury
- [X] Paginacja długich list dokumentów

---

## 🧾 Autor

Refaktoryzacja i struktura komponentów: **Agnieszka Kamińska**
Wsparcie techniczne: **ChatGPT, OpenAI**