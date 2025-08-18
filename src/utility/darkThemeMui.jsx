// src/utility/darkThemeMui.jsx

import { createTheme } from "@mui/material/styles";

const darkTheme = createTheme({
  palette: {
    // Ustawiamy tryb na 'dark'
    mode: "dark",
    // Możesz dostosować kolory tła dla 'paper', aby upewnić się,
    // że tło menu jest wystarczająco ciemne
    background: {
      paper: "#282c34", // Typowy ciemny kolor
    },
  },
  components: {
    MuiMenuItem: {
      styleOverrides: {
        root: {
          // Możesz dodać dodatkowe style, jeśli domyślne Ci nie odpowiadają
          // np. zmiana koloru po najechaniu
          "&:hover": {
            backgroundColor: "rgba(255, 255, 255, 0.1)",
          },
        },
      },
    },
  },
});

export default darkTheme;
