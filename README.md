# FAKTURKA 2.0 (INVOICE 2.0)

Aplikacja pozwala wystawić faktury z 0 Vat , osobom któe na mocy art. 5 ust.1 Prawa przedsięborców nie mają zarejestrowajnej działalności gospodarczej.

Aplikacja pozwala na wystawienie i wydrukowanie do pdf prostej fakrury, podgląd wystawionych faktur oraz wyszukiwanie wystawionej faktury po dacie wystawienie lub po naziwe kontrahenta jak również po numerze faktury.

Można podejżeć zestawienia miesięczne oraz zobaczyć podsumowanie roczne.

Jest to w pełni funkcjonalna aplikacja do pomocy w prowadzeniu księgowości dla prowadzących działalność na podstawie w/w ustawy.

W opracowaniu (w bliżej nie określonej przyszłości :) ) możliwość wyboru roku do kontekstu, w tym momencie, żeby wystawić faktury w różnych latach i mieć osobne zestawienia należy założyć konto dla każdego roku osobno.

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
* [react-to-print](https://github.com/gregnb/react-to-print) - użyte do drukowanie faktury do pdf. 

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

* Source Code:  [https://github.com/frontendagnes/invoice](https://github.com/zabula81/invoice)
* Issue Tracker:  [https://github.com/frontendagnes/invoice/issues](https://github.com/zabula81/invoice/issues)
* View: [invoice-939f8.web.app](https://invoice-939f8.web.app/)

## Author

[frontend-agnes.pl/](https://frontend-agnes.pl/)