### Dokumentacja: `TabGenerator` (Polski / English)

# TabGenerator

## Opis / Description

`TabGenerator` to komponent React, który generuje dynamiczne zakładki (tabs) z możliwością dostosowywania ich stylów.  
`TabGenerator` is a React component that generates dynamic tabs with customizable styles.

## Instalacja / Installation

```sh
npm install styled-components
```

## Użycie / Usage

```jsx
import React from "react";
import TabGenerator from "./TabGenerator";

const tabs = [
  { label: "Tab 1", content: <div>Content for Tab 1</div> },
  { label: "Tab 2", content: <div>Content for Tab 2</div> },
  { label: "Tab 3", content: <div>Content for Tab 3</div> },
];

const styles = {
  textColor: "#fff",
  activeBgColor: "#007bff",
  defaultBgColor: "#0056b3",
  hoverBgColor: "#004494",
  tabsBgColor: "#002244",
};

function App() {
  return <TabGenerator tabs={tabs} styles={styles} />;
}

export default App;
```

## Props

| Nazwa    | Typ      | Opis / Description                                       | Domyślna wartość / Default |
| -------- | -------- | -------------------------------------------------------- | -------------------------- |
| `tabs`   | `Array`  | Tablica obiektów `{ label: string, content: ReactNode }` | `[]`                       |
| `styles` | `Object` | Obiekt dostosowujący style zakładek                      | `{}`                       |

### Struktura `styles`

| Nazwa            | Typ      | Opis / Description                                        | Domyślna wartość / Default |
| ---------------- | -------- | --------------------------------------------------------- | -------------------------- |
| `textColor`      | `string` | Kolor tekstu zakładki / Tab text color                    | `#ffffff`                  |
| `activeBgColor`  | `string` | Kolor aktywnej zakładki / Active tab background color     | `#5a71aa`                  |
| `defaultBgColor` | `string` | Kolor nieaktywnej zakładki / Default tab background color | `#3f4d70`                  |
| `hoverBgColor`   | `string` | Kolor zakładki po najechaniu / Hover tab background color | `#5a71aa`                  |
| `tabsBgColor`    | `string` | Kolor tła obszaru zakładek / Tabs area background color   | `""` (przezroczysty)       |

## Optymalizacja / Optimization

- **React.memo**: Zapobiega niepotrzebnym renderom komponentu `Tab`.
- **useCallback**: Zapewnia, że funkcja `handleTabClick` nie zmienia się przy każdym renderze.
- **useMemo**: Zapewnia, że obiekt `mergedStyles` nie jest tworzony ponownie, jeśli `styles` się nie zmieniają.

## Licencja / License

MIT
