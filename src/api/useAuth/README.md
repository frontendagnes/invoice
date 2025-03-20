# useAuth Hook

## Opis | Description

Hook `useAuth` zapewnia funkcje do zarządzania uwierzytelnianiem użytkownika w aplikacji React przy użyciu Firebase. Obsługuje logowanie, rejestrację, logowanie za pomocą Google, wylogowanie oraz resetowanie hasła.

The `useAuth` hook provides functions for managing user authentication in a React application using Firebase. It supports login, registration, Google sign-in, logout, and password reset.

---

## Użycie | Usage

```javascript
import useAuth from "@/path/to/useAuth";

const { login, register, signInGoogle, logout, resetPassword, loading, error } = useAuth();
```

Przykładowe użycie w komponencie:

Example usage in a component:

```javascript
function LoginComponent() {
  const { login, register, signInGoogle, logout, resetPassword, loading, error } = useAuth();

  const handleLogin = () => {
    login("user@example.com", "password123");
  };

  return (
    <div>
      <button onClick={handleLogin} disabled={loading}>Log in</button>
      {error && <p>Error: {error}</p>}
    </div>
  );
}
```

---

## Zwracane wartości | Returned Values

| Nazwa           | Typ               | Opis                                                 | Name            | Type              | Description                                                   |
| --------------- | ----------------- | ---------------------------------------------------- | --------------- | ----------------- | ------------------------------------------------------------- |
| `login`         | `Function`        | Logowanie użytkownika za pomocą e-maila i hasła.     | `login`         | `Function`        | Logs in a user with email and password.                       |
| `register`      | `Function`        | Rejestracja nowego użytkownika.                      | `register`      | `Function`        | Registers a new user.                                         |
| `signInGoogle`  | `Function`        | Logowanie za pomocą konta Google.                    | `signInGoogle`  | `Function`        | Logs in using a Google account.                               |
| `logout`        | `Function`        | Wylogowanie użytkownika.                             | `logout`        | `Function`        | Logs out the user.                                            |
| `resetPassword` | `Function`        | Resetowanie hasła użytkownika.                       | `resetPassword` | `Function`        | Resets the user's password.                                   |
| `loading`       | `Boolean`         | Wskazuje, czy operacja uwierzytelniania jest w toku. | `loading`       | `Boolean`         | Indicates whether an authentication operation is in progress. |
| `error`         | `String` / `null` | Przechowuje komunikat błędu, jeśli wystąpił.         | `error`         | `String` / `null` | Holds an error message if one occurs.                         |

---

## Funkcje | Functions

### `login(email: string, password: string): Promise<void>`

- **Parametry | Parameters:**
  
  - `email` (string): Adres e-mail użytkownika | The user's email address.
  - `password` (string): Hasło użytkownika | The user's password.

- **Przykład | Example:**

```javascript
const { login } = useAuth();
login("user@example.com", "password123");
```

---

### `register(email: string, password: string): Promise<void>`

- **Parametry | Parameters:**
  
  - `email` (string): Adres e-mail użytkownika | The user's email address.
  - `password` (string): Hasło użytkownika | The user's password.

- **Przykład | Example:**

```javascript
const { register } = useAuth();
register("newuser@example.com", "securePassword");
```

---

### `signInGoogle(): Promise<void>`

- **Przykład | Example:**

```javascript
const { signInGoogle } = useAuth();
signInGoogle();
```

---

### `logout(): Promise<void>`

- **Przykład | Example:**

```javascript
const { logout } = useAuth();
logout();
```

---

### `resetPassword(email: string): Promise<void>`

- **Parametry | Parameters:**
  
  - `email` (string): Adres e-mail użytkownika | The user's email address.

- **Przykład | Example:**

```javascript
const { resetPassword } = useAuth();
resetPassword("user@example.com");
```

---

## Stan | State

### `loading: boolean`

- Wskazuje, czy operacja uwierzytelniania jest w toku. | Indicates whether an authentication process is in progress.

- **Przykład | Example:**

```javascript
const { loading } = useAuth();
console.log(loading); // true or false
```

---

### `error: string | null`

- Przechowuje komunikat błędu, jeśli operacja się nie powiedzie. | Holds an error message if an authentication process fails.

- **Przykład | Example:**

```javascript
const { error } = useAuth();
console.log(error); // Error message or null
```

---

## Obsługa błędów | Error Handling

- W przypadku błędów autoryzacji, komunikat o błędzie zostaje zapisany w `error`.
- Można go użyć do wyświetlenia użytkownikowi komunikatu:

If an authentication error occurs, the error message is stored in `error` and can be displayed to the user:

```javascript
if (error) {
  console.error("Authentication Error:", error);
}
```

---

## Autor | Author

Ten hook został stworzony do obsługi autoryzacji Firebase w aplikacji React.

This hook was created to handle Firebase authentication in a React application.

[frontend-agnes](https://frontend-agnes.web.app/)