import Tooltip from "../../../Tooltip/Tooltip";
// mui
import IconButton from "@mui/material/IconButton";

const InvoiceIconsMobile = ({ iconActions = [], renderIcon }) => {

  return (
    <div className="invoicesitem__icons">
      {iconActions.map((action) => (
        <Tooltip key={action.key} text={action.label}>
          <IconButton
            onClick={action.onClick}
            ref={action.ref}
            aria-label={action.label}
          >
            {renderIcon(action, "mobile")}
          </IconButton>
        </Tooltip>
      ))}
    </div>
  );
};

export default InvoiceIconsMobile;
