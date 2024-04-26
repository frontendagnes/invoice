export const validate = (value, yearArray) => {
  const arr = [];
  const regex = /\d/g; //dowolna liczba
  const reg = /\D/g; // nie liczba

  if (parseInt(value) > new Date().getFullYear()) {
    return `Podana wartość jest większ niz obecny rok ${new Date().getFullYear()}`;
  }

  if (!value) {
    return `Pole nie może być puste`;
  }

  if (value.length < 4) {
    return `Rok składa się z 4 cyfr`;
  }
  yearArray.map((item) => {
    if (item.data.year === parseInt(value)) {
      arr.push(item.data.year);
    }
  });

  if (arr.length > 0) {
    return "Podany rok już istnieje";
  }
  if (!regex.test(value)) {
    return "Nie wpisałeś roku";
  }
  if (reg.test(value)) {
    return "Nie wpisałeś roku!";
  }

  return null;
};
