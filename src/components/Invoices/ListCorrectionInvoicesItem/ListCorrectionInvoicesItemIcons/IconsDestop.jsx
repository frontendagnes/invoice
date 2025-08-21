import useContextMenu from "../../../../hooks/useContextMenu.jsx";
//mui
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Divider from "@mui/material/Divider";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
//components
import Tooltip from "../../../Tooltip/Tooltip.jsx";
import ContextMenu from "../../../ContextMenu/ContextMenu.jsx";


const IconsDesktop = ({ iconActions, renderIcon }) => {
  const { anchorEl, open, handleClick, handleClose } = useContextMenu();

  const executeActionAndClose = (actionFunction) => {
    actionFunction();
    handleClose();
  };

  const menuActions = iconActions.filter((action) => !action.danger);
  const dangerActions = iconActions.filter((action) => action.danger);
  return (
    <div className="listCorrectionInvoices__action--desktop">
      <Tooltip text="Opcje">
        <IconButton
          aria-label="więcej opcji"
          id="correction-options-button"
          aria-controls={open ? "correction-options-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-haspopup="true"
          onClick={handleClick}
        >
          <MoreVertIcon />
        </IconButton>
      </Tooltip>
      <ContextMenu
        anchorEl={anchorEl}
        open={open}
        handleClick={handleClick}
        handleClose={handleClose}
        id="correction-options-menu"
      >
        {menuActions.map(({ key, label, onClick, ...action }) => (
          <MenuItem key={key} onClick={() => executeActionAndClose(onClick)}>
            <ListItemIcon>{renderIcon(action)}</ListItemIcon>
            {label}
          </MenuItem>
        ))}
        {dangerActions.length > 0 && menuActions.length > 0 && <Divider />}

        {dangerActions.map(({ key, label, onClick, ...action }) => (
          <MenuItem
            key={key}
            onClick={() => {
              executeActionAndClose(onClick);
            }}
          >
            <ListItemIcon>{renderIcon(action)}</ListItemIcon>
            {label}
          </MenuItem>
        ))}
      </ContextMenu>
    </div>
  );
};

export default IconsDesktop;
