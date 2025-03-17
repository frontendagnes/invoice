### GoogleButton Component Documentation

#### English

#### Description

The `GoogleButton` component is a customizable button designed for Google sign-in functionality. It includes a Google icon and can display a loading spinner when the sign-in process is in progress.

#### Props

- `onClick` (function): The function to be called when the button is clicked.
- `loading` (boolean): A flag to indicate if the sign-in process is in progress. When `true`, a loading spinner is displayed.
- `size` (string): The size of the button. It can be one of `"small"`, `"medium"`, or `"large"`. The default size is `"medium"`.

#### Usage

```javascript
import React from "react";
import { GoogleButton } from "./GoogleButton";

const handleGoogleSignIn = () => {
  // Handle Google sign-in logic here
};

const MyComponent = () => (
  <GoogleButton onClick={handleGoogleSignIn} loading={false} size="medium" />
);

export default MyComponent;
```

#### Styles

The button styles are defined using the `sx` prop from Material-UI. The styles include properties for width, height, font size, icon size, padding, and various states like hover and disabled.

---

#### Polski

#### Opis

Komponent `GoogleButton` to konfigurowalny przycisk zaprojektowany do funkcji logowania za pomocą Google. Zawiera ikonę Google i może wyświetlać wskaźnik ładowania podczas trwania procesu logowania.

#### Właściwości

- `onClick` (funkcja): Funkcja wywoływana po kliknięciu przycisku.
- `loading` (boolean): Flaga wskazująca, czy proces logowania jest w toku. Gdy `true`, wyświetlany jest wskaźnik ładowania.
- `size` (string): Rozmiar przycisku. Może być jednym z `"small"`, `"medium"` lub `"large"`. Domyślny rozmiar to `"medium"`.

#### Użycie

```javascript
import React from "react";
import { GoogleButton } from "./GoogleButton";

const handleGoogleSignIn = () => {
  // Obsługa logowania za pomocą Google
};

const MyComponent = () => (
  <GoogleButton onClick={handleGoogleSignIn} loading={false} size="medium" />
);

export default MyComponent;
```

#### Style

Style przycisku są definiowane za pomocą właściwości `sx` z Material-UI. Style obejmują właściwości takie jak szerokość, wysokość, rozmiar czcionki, rozmiar ikony, padding oraz różne stany, takie jak hover i disabled.
