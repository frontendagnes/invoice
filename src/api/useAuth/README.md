### useAuth Hook Documentation

#### English

#### Description

The `useAuth` custom React hook provides authentication functionality using Firebase. It allows users to log in, register, and sign in with Google. It manages the loading state, errors, and dispatches alerts using a context from `StateProvider`. It also uses `react-router-dom` for navigation.

#### Functions

- **login(email, password)**: Logs in a user with the provided email and password.
  
  - Parameters:
    - `email` (string): The user's email address.
    - `password` (string): The user's password.
  - Example:
    
    ```javascript
    const { login } = useAuth();
    login("user@example.com", "password123");
    ```

- **register(email, password)**: Registers a new user with the provided email and password.
  
  - Parameters:
    - `email` (string): The user's email address.
    - `password` (string): The user's password.
  - Example:
    
    ```javascript
    const { register } = useAuth();
    register("newuser@example.com", "password123");
    ```

- **signInGoogle()**: Signs in a user using Google authentication.
  
  - Example:
    
    ```javascript
    const { signInGoogle } = useAuth();
    signInGoogle();
    ```

#### State

- **loading**: A boolean indicating if an authentication process is in progress.
  
  - Example:
    
    ```javascript
    const { loading } = useAuth();
    console.log(loading); // true or false
    ```

- **error**: A string containing the error message if an authentication process fails.
  
  - Example:
    
    ```javascript
    const { error } = useAuth();
    console.log(error); // Error message or null
    ```

#### Usage

```javascript
import React from "react";
import useAuth from "./useAuth";

const AuthComponent = () => {
  const { login, register, signInGoogle, loading, error } = useAuth();

  return(
    <div>
      <button onClick={() => login("user@example.com", "password123")}>
        Login
      </button>
      <button onClick={() => register("newuser@example.com", "password123")}>
        Register
      </button>
      <button onClick={signInGoogle}>Sign in with Google</button>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
    </div>
  );
};

export default AuthComponent;


```

---

#### Polski

#### Opis

Niestandardowy hook React `useAuth` zapewnia funkcjonalność uwierzytelniania za pomocą Firebase. Umożliwia użytkownikom logowanie, rejestrację i logowanie za pomocą Google. Zarządza stanem ładowania, błędami i wysyła alerty za pomocą kontekstu z `StateProvider`. Używa również `react-router-dom` do nawigacji.

#### Funkcje

- **login(email, password)**: Loguje użytkownika za pomocą podanego adresu e-mail i hasła.
  
  - Parametry:
    - `email` (string): Adres e-mail użytkownika.
    - `password` (string): Hasło użytkownika.
  - Przykład:
    
    ```javascript
    const { login } = useAuth();
    login("user@example.com", "password123");
    ```

- **register(email, password)**: Rejestruje nowego użytkownika za pomocą podanego adresu e-mail i hasła.
  
  - Parametry:
    - `email` (string): Adres e-mail użytkownika.
    - `password` (string): Hasło użytkownika.
  - Przykład:
    
    ```javascript
    const { register } = useAuth();
    register("newuser@example.com", "password123");
    ```

- **signInGoogle()**: Loguje użytkownika za pomocą uwierzytelniania Google.
  
  - Przykład:
    
    ```javascript
    const { signInGoogle } = useAuth();
    signInGoogle();
    ```

#### Stan

- **loading**: Wartość boolean wskazująca, czy proces uwierzytelniania jest w toku.
  
  - Przykład:
    
    ```javascript
    const { loading } = useAuth();
    console.log(loading); // true lub false
    ```

- **error**: String zawierający komunikat o błędzie, jeśli proces uwierzytelniania się nie powiedzie.
  
  - Przykład:
    
    ```javascript
    const { error } = useAuth();
    console.log(error); // Komunikat o błędzie lub null
    ```

#### Użycie

```javascript
import React from "react";
import useAuth from "./useAuth";

const AuthComponent = () => {
  const { login, register, signInGoogle, loading, error } = useAuth();

  return (
    <div>
      <button onClick={() => login("user@example.com", "password123")}>
        Zaloguj się
      </button>
      <button onClick={() => register("newuser@example.com", "password123")}>
        Zarejestruj się
      </button>
      <button onClick={signInGoogle}>Zaloguj się przez Google</button>
      {loading && <p>Ładowanie...</p>}
      {error && <p>Błąd: {error}</p>}
    </div>
  );
};

export default AuthComponent;
```

```

```