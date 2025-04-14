# CustomTooltip Component Documentation

## English

### Description

`CustomTooltip` is a React component that displays a tooltip when hovering over the child element. The tooltip automatically hides when the mouse leaves the element or when clicking outside of it.

### Installation

Ensure you have `styled-components` installed:

```sh
npm install styled-components
```

### Usage

```jsx
import CustomTooltip from "./CustomTooltip";

const App = () => {
  return (
    <CustomTooltip text="This is a tooltip">
      <button>Hover over me</button>
    </CustomTooltip>
  );
};

export default App;
```

### Props

| Prop       | Type      | Description                           |
| ---------- | --------- | ------------------------------------- |
| `text`     | string    | The text to display in the tooltip.   |
| `children` | ReactNode | The element to attach the tooltip to. |

### Behavior

- The tooltip appears when the user hovers over the child element.

- The tooltip disappears when the user moves the mouse away.

- Clicking outside the tooltip hides it.

---

## Polski

### Opis

`CustomTooltip` to komponent React, który wyświetla dymek podpowiedzi po najechaniu kursorem na element podrzędny. Dymek automatycznie znika po opuszczeniu elementu lub po kliknięciu poza nim.

### Instalacja

Upewnij się, że masz zainstalowany `styled-components`:

```sh
npm install styled-components
```

### Użycie

```jsx
import CustomTooltip from "./CustomTooltip";

const App = () => {
  return (
    <CustomTooltip text="To jest dymek podpowiedzi">
      <button>Najeżdżaj na mnie</button>
    </CustomTooltip>
  );
};

export default App;
```

### Właściwości

| Właściwość | Typ       | Opis                                      |
| ---------- | --------- | ----------------------------------------- |
| `text`     | string    | Tekst wyświetlany w dymku podpowiedzi.    |
| `children` | ReactNode | Element, do którego przypięty jest dymek. |

### Zachowanie

- Dymek pojawia się po najechaniu kursorem na element podrzędny.

- Dymek znika po opuszczeniu kursorem elementu.

- Kliknięcie poza dymkiem ukrywa go.
