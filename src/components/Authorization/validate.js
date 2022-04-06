export const validateLogin = (email, password, test) => {
    if (!email) {
      return "E-mail jest wymagany";
    } else if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email)) {
      return "Zły format e-mail";
    }
    if (!password) {
      return "Hasło jest wymagane";
    }
    if (password.length < 6) {
      return "Hasło powinno mieć conajmniej 6 znaków";
    }
    if (test) {
      return "Nie przeszedłeś filtra antyspamowego. Odśwież stronę i spróbuj jeszcze raz";
    }
    return null;
  };
  export const validateRegister = (email, password, test, repeatPassword) => {
    if (!email) {
      return "E-mail jest wymagany";
    } else if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email)) {
      return "Zły format e-mail";
    }
    if (!password) {
      return "Hasło jest wymagane";
    }
    if (password.length < 6) {
      return "Hasło powinno mieć conajmniej 6 znaków";
    }
    if (test) {
      return "Nie przeszedłeś filtra antyspamowego. Odśwież stronę i spróbuj jeszcze raz";
    }
    if (password !== repeatPassword) {
      return "Podane hasła nie są takie same";
    }
    return null;
  };