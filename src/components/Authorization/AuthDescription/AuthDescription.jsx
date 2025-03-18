import React from "react";
import "./AuthDescription.css";

function AuthDescription() {
  return (
    <div className="authoryzation__descryption">
      <p>
        Prowadzisz firmę bez rejestracji na podstawie{" "}
        <b>art. 5 ust. 1 Prawa przedsiębiorców </b>
        ta aplikacja jest dla Ciebie
      </p>
      <p>
        Tutaj wystawisz faktury bez VAT a dodatkowo aplikacja za Ciebie wykona
        wszystko co niezbędne:
      </p>
      <ul>
        <li>Policzy przychód każdego miesiąca, także narastająco</li>
        <li>Pomoże w wyszukaniu już wystwionych faktur i kosztów</li>
        <li>Tutaj wprowdzisz równiwż koszty</li>
        <li>
          W aplikacji zobaczysz podsumowanie każdego miesiąca jak równiż całego
          roku(to się przyda przy rozliczeniu rocznym)
        </li>
      </ul>
      <p>
        Wszystko to dzieje się automatycznie tylko po dodaniu faktury będź
        kosztu
      </p>
      <p>
        Żmudne tworzenie faktur i wyliczeń w arkuszu kalkulacyjnym to już
        przeszłość, ten progam zrobi wszystko za Ciebie
      </p>
      <p>
        <b style={{ color: "red" }}>UWAGA:</b> to jest wersja demonstracyjna nie
        wporwadzaj prawdziwych danych, administrator może je usunąć w każdej
        chwili
      </p>
      <p>
        Chcesz skorzystać z aplikacji skontaktuj się z administratorem którym
        jest{" "}
        <a
          href={import.meta.env.VITE_APP_MY_URL}
          alt={import.meta.env.VITE_APP_MY_URL}
          title={import.meta.env.VITE_APP_MY_URL}
        >
          frontend-agnes
        </a>
      </p>
      <p>W celu przetestowania aplikacji możesz użyć następujących danych:</p>
      <p>
        <span>
          <b>login:</b> aga@kam.com
        </span>
        <br />
        <span>
          <b>hasło:</b> agakam
        </span>
      </p>
    </div>
  );
}

export default AuthDescription;
