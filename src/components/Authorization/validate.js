export const valideateTest = (test) => {
  if (test) {
    return "Nie przeszedłeś filtra antyspamowego. Odśwież stronę i spróbuj jeszcze raz";
  }

  return null;
};

export const validateLogin = (formData, test) => {
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

// export const validateLogin = (email, password, test) => {
//   let errors = {};

//   if (!email) {
//     errors.email = "E-mail jest wymagany";
//   } else if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email)) {
//     errors.email = "Zły format e-mail";
//   }

//   if (!password) {
//     errors.password = "Hasło jest wymagane";
//   } else if (password.length < 6) {
//     errors.password = "Hasło powinno mieć conajmniej 6 znaków";
//   }

//   if (test) {
//     errors.test =
//       "Nie przeszedłeś filtra antyspamowego. Odśwież stronę i spróbuj jeszcze raz";
//   }

//   return Object.keys(errors).length ? errors : null; // Jeśli są błędy, zwracamy je, inaczej null
// };

export const validateRegister = (email, password, test, repeatPassword) => {
  let errors = {};

  if (!email) {
    errors.email = "E-mail jest wymagany";
  } else if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email)) {
    errors.email = "Zły format e-mail";
  }

  if (!password) {
    errors.password = "Hasło jest wymagane";
  } else if (password.length < 6) {
    errors.password = "Hasło powinno mieć conajmniej 6 znaków";
  }

  if (test) {
    errors.test =
      "Nie przeszedłeś filtra antyspamowego. Odśwież stronę i spróbuj jeszcze raz";
  }

  if (!repeatPassword) {
    errors.repeatPassword = "Musisz powtórzyć hasło";
  } else if (password !== repeatPassword) {
    errors.repeatPassword = "Podane hasła nie są takie same";
  }

  return Object.keys(errors).length ? errors : null;
};
