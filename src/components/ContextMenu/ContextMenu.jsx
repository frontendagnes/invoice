import { ThemeProvider } from "@mui/material";
import darkTheme from "../../utility/darkThemeMui.jsx";
//mui
import Menu from "@mui/material/Menu";
const ITEM_HEIGHT = 48;
function ContextMenu({ children, anchorEl, open, handleClose }) {
  return (
    <ThemeProvider theme={darkTheme}>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: "30ch",
            },
          },
          list: {
            "aria-labelledby": "long-button",
          },
        }}
      >
        {children}
      </Menu>
    </ThemeProvider>
  );
}

export default ContextMenu;
