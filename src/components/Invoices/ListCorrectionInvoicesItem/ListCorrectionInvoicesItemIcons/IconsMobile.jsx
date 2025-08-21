import { IconButton } from "@mui/material";

import Tooltip from "../../../Tooltip/Tooltip";

const IconsMobile = ({ iconActions, renderIcon }) => {
  return (
    <div className="listCorrectionInvoices__action">
      {iconActions.map((action) => (
        <Tooltip key={action.key} text={action.label}>
          <IconButton onClick={action.onClick}>{renderIcon(action)}</IconButton>
        </Tooltip>
      ))}
    </div>
  );
};

export default IconsMobile