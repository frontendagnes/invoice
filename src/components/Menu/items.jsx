import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";

export const menuItems = [
  {
    id: 1,
    name: "Dodaj Fakturę",
    href: "/",
  },
  {
    id: 2,
    name: "Przychody/Wyszukaj",
    href: "/invoices",
  },
  {
    id: 3,
    name: "Koszty",
    href: "/costs",
  },
  {
    id: 4,
    name: "Podsumowanie",
    href: "/records",
  },
  {
    id: 5,
    name: "Ustawienia",
    href: "/settings",
    // icon: ManageAccountsIcon,
    submenu: [
      {
        id: 1,
        name: "Kontrachenci",
        href: "/settings/contractors",
      },
      {
        id: 2,
        name: "Zarządzaj aktualnym rokiem",
        href: "/settings/selected-year",
      },
    ],
  },
];
