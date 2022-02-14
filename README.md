# FAKTURA

Aplikacja pozwala wystawić faktury z 0 Vat , osobom któe na mocy art. 5 ust.1 Prawa przedsięborców nie mają zarejestrowajnej działalności gospodarczej.

Aplikacja pozwala na wystawienie i wydrukowanie do pdf prostej fakrury, podgląd wystawionych faktur oraz wyszukiwanie wystawionej faktury po dacie wystawienie lub po naziwe kontrahenta jak również po numerze faktury.

dane do testowego logowanie:

login: aga@kam.com
pass: agakam

## Documentation

Projekt został stworzone przez [create-react-app](https://github.com/facebook/create-react-app), w aplikacji zostały użyte następujące rozwiązania:

* [firebase](https://www.npmjs.com/package/firebase) - baza danych (logowanie, przechowywanie faktur, deploy)
* [material-ui](https://material-ui.com/) - użyto ikon jak również prostego komonentu SnackBar do pokazywania powiadomień
* [react-router-dom](https://reactrouter.com/web/guides/quick-start) - nawigacja na stronie
* [nanoid](https://www.npmjs.com/package/nanoid) - za pomocą tej aplikacji tworzę identyfikator faktury
* [react-number-format](https://www.npmjs.com/package/react-number-format) - obsługa inputów typu number oraz użycie maski dla tych inputów
* [html2canvas](https://www.npmjs.com/package/html2canvas) oraz [jspdf](https://www.npmjs.com/package/jspdf) - użyte wspólnie do drukowanie faktury do pdf. W związku z tym, iż jspdf nie obsługuje UTF-8, użyłam html2canvas do stworzenia zrzutu png faktury a później za pomocą pdf została zapisana do pliku pdf
  
  ```javascript
  const generatePDF = () => {
      const input = document.querySelector("#invoice");
      html2canvas(input).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const doc = new jsPDF("p", "pt", "a4");
        let width = doc.internal.pageSize.getWidth() - 5;
        let height = doc.internal.pageSize.getHeight();
        doc.addImage(imgData, "PNG", 0, 0, width, height);
        doc.save(`${today()}-`);
      });
    };
  ```

Wszystkie powyższe aplikacje zostały zainstalowane z poziomu `npm`, standardowym poleceniem

```javascript
npm install 'nazwa-paczki'
```

## Installation

Po pobraniu aplikacji z poziomu folderu w którym znajdują się pliki projektu wpisujemy:

```javascript
npm install
```

w celu zainstalowania wszystkich zależności.

później w celu uruchomienia projektu:

```javascript
npm start
```

Wszystkie pozostałe niezbędne informację znajdują się tutaj: [create-react-app](https://github.com/facebook/create-react-app).

Żeby powyższe komendy zadziałały na komputerze musi być zainstalowany [node](https://nodejs.org/en/).

## Contribute

* Source Code:  [https://github.com/zabula81/invoice](https://github.com/zabula81/invoice)
* Issue Tracker:  [https://github.com/zabula81/invoice/issues](https://github.com/zabula81/invoice/issues)
* View: [invoice-939f8.web.app](https://invoice-939f8.web.app/)

## Author

Agnieszka Kamińska (agnieszka.kaminska@ksiegarnia.edu.pl)
