export const valideateTest = (test) => {
  if (test) {
    return "Nie przeszedłeś filtra antyspamowego. Odśwież stronę i spróbuj jeszcze raz";
  }

  return null;
};

export const validateLogin = (formData) => {
  let errors = {};

  if (!formData.email) {
    errors.email = "Email jest wymagany";
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    errors.email = "Nieprawidłowy format email";
  }

  if (!formData.password) {
    errors.password = "Hasło jest wymagane";
  } else if (formData.password.length < 6) {
    errors.password = "Hasło musi mieć co najmniej 6 znaków";
  }

  return Object.keys(errors).length ? errors : null;
};

export const validateRegister = (formData) => {
  let errors = {};

  if (!formData.email) {
    errors.email = "E-mail jest wymagany";
  } else if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(formData.email)) {
    errors.email = "Zły format e-mail";
  }

  if (!formData.password) {
    errors.password = "Hasło jest wymagane";
  } else if (formData.password.length < 6) {
    errors.password = "Hasło powinno mieć conajmniej 6 znaków";
  }

  if (!formData.repeatPassword) {
    errors.repeatPassword = "Musisz powtórzyć hasło";
  } else if (formData.password !== formData.repeatPassword) {
    errors.repeatPassword = "Podane hasła nie są takie same";
  }

  return Object.keys(errors).length ? errors : null;
};
