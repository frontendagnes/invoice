# DeleteConfirmationModal

Komponent `DeleteConfirmationModal` to dynamiczne, animowane okno modalne służące do potwierdzania operacji usunięcia. Został zaprojektowany, aby zapewnić użytkownikowi jasne i wyraźne potwierdzenie przed podjęciem nieodwracalnej akcji.

## Kluczowe cechy

- **Portal React**: Komponent jest renderowany poza głównym drzewem DOM, bezpośrednio w `document.body`, co zapobiega problemom z nakładaniem się stylów i zapewnia prawidłowe wyświetlanie nałożone na inne elementy.
- **Animacje z Framer Motion**: Płynne animacje pojawiania się i znikania, które poprawiają doświadczenie użytkownika.
- **Dostępność (Accessibility)**:
  - **Pułapka ostrości (Focus Trap)**: Dzięki niestandardowemu hookowi `useFocusTrap` ostrość klawiatury jest utrzymywana wewnątrz modala, co zapobiega przypadkowemu przejściu do elementów w tle.
  - **Semantyka ARIA**: Wykorzystuje atrybuty `role="dialog"` i `aria-modal="true"`, aby prawidłowo poinformować technologie wspomagające o funkcji okna modalnego.
- **Obsługa zdarzeń**:
  - **Click Away**: Automatyczne zamknięcie modala po kliknięciu poza jego obszarem.
  - **No-scroll**: Zapobiega przewijaniu tła, gdy modal jest aktywny, co zapewnia, że uwaga użytkownika jest skupiona na oknie dialogowym.
- **Dynamiczna treść**: Tekst wewnątrz modala jest dynamicznie generowany w zależności od przekazanej właściwości `item`, co pozwala na spersonalizowanie komunikatu.

## Użycie

Aby użyć komponentu, zaimportuj go i umieść w swoim komponencie nadrzędnym.

### Właściwości (Props)

- `isOpen`: (boolean) Kontroluje widoczność modala. Jeśli `false`, komponent nie jest renderowany.
- `onClickYes`: (funkcja) Funkcja zwrotna wywoływana po kliknięciu przycisku "Tak" (potwierdzenie).
- `onClickNo`: (funkcja) Funkcja zwrotna wywoływana po kliknięciu przycisku "Nie" (anulowanie).
- `item`: (string, opcjonalne) Nazwa elementu, który ma zostać usunięty. Jeśli jest podany, generuje spersonalizowany komunikat.

### Przykład

```jsx
import React, { useState } from 'react';
import DeleteConfirmationModal from './DeleteConfirmationModal';

function MyComponent() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const handleOpenModal = (item) => {
    setItemToDelete(item);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = () => {
    console.log(`Usunięto element: ${itemToDelete}`);
    // Tutaj możesz umieścić logikę usuwania
    setIsModalOpen(false);
  };

  const handleCancelDelete = () => {
    setIsModalOpen(false);
    setItemToDelete(null);
  };

  return (


<div>
 <button onClick={() => handleOpenModal('Dokument X')}>
 Usuń Dokument X
 </button>

      <DeleteConfirmationModal
        isOpen={isModalOpen}
        onClickYes={handleConfirmDelete}
        onClickNo={handleCancelDelete}
        item={itemToDelete}
      />
    </div>

  );
}

## Zależności

- **react-dom**: Wymagany do użycia portali.

- **framer-motion**: Używany do płynnych animacji.

- **react-use**: Zapewnia hook `useClickAway`.

- **Niestandardowe hooki**: `useFocusTrap` (zapewnia funkcjonalność pułapki ostrości).

- **Komponenty**: `FormButton` (przycisk używany wewnątrz modala).
```
