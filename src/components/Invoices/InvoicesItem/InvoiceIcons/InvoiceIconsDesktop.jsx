import useContextMenu from "../../../../hooks/useContextMenu.jsx";
// mui
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
// components
import ContextMenu from "../../../ContextMenu/ContextMenu.jsx";
import Tooltip from "../../../Tooltip/Tooltip.jsx";

function InvoiceIconsDesktop({ iconActions = [], renderIcon }) {
  const { anchorEl, open, handleClick, handleClose } = useContextMenu();

  const executeActionAndClose = (actionFunction) => {
    actionFunction();
    handleClose();
  };

  const outsideActions = iconActions.filter(
    (action) => action.showOutside === true
  );
  const menuActions = iconActions.filter(
    (action) => !action.showOutside && !action.danger
  );
  const dangerActions = iconActions.filter((action) => action.danger);

  return (
    <div className="invoicesitem__icons">
      {/* Akcje wyświetlane na zewnątrz menu */}
      {outsideActions.map((action) => (
        <Tooltip key={action.key} text={action.label}>
          <IconButton
            onClick={action.onClick}
            ref={action.ref}
            aria-label={action.label}
          >
            {renderIcon(action)}
          </IconButton>
        </Tooltip>
      ))}

      {/* Przycisk "Więcej opcji" */}
      <Tooltip text="Opcje">
        <IconButton
          aria-label="więcej opcji"
          id="invoice-options-button"
          aria-controls={open ? "invoice-options-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-haspopup="true"
          onClick={handleClick}
        >
          <MoreVertIcon />
        </IconButton>
      </Tooltip>

      {/* Menu kontekstowe */}
      <ContextMenu
        anchorEl={anchorEl}
        open={open}
        handleClick={handleClick}
        handleClose={handleClose}
        id="invoice-options-menu"
      >
        {/* Standardowe akcje */}
        {menuActions.map(({ key, label, onClick, ref, ...action }) => (
          <MenuItem
            key={key}
            onClick={() => executeActionAndClose(onClick)}
            ref={ref}
          >
            <ListItemIcon>{renderIcon(action)}</ListItemIcon>
            {label}
          </MenuItem>
        ))}

        {/* Divider przed niebezpiecznymi akcjami */}
        {dangerActions.length > 0 && menuActions.length > 0 && <Divider />}

        {/* Niebezpieczne akcje */}
        {dangerActions.map(({ key, label, onClick, ...action }) => (
          <MenuItem
            key={key}
            onClick={() => executeActionAndClose(onClick)}
            sx={{ color: "error.main" }}
          >
            <ListItemIcon sx={{ color: "error.main" }}>
              {renderIcon(action)}
            </ListItemIcon>
            {label}
          </MenuItem>
        ))}
      </ContextMenu>
    </div>
  );
}

export default InvoiceIconsDesktop;
