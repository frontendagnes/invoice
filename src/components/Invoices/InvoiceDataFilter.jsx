import { memo } from "react";
import "./Invoices.css";
import { TextField } from "@mui/material";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import Tooltip from "../Tooltip/Tooltip";

const InvoiceDateFilter = ({ filterDate, setFilterDate, resetDate }) => {
  return (
      <div className="datefilter__input">
        <div className="datefilter__input--width">
          <TextField
            type="date"
            label="Wyszukaj po dacie"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            fullWidth
            InputLabelProps={{ shrink: true }}
          />
        </div>
        <Tooltip text="Resetuj datę">
          <RemoveCircleIcon
            onClick={resetDate}
            color="error"
            fontSize="large"
            className="datefilter__button"
          />
        </Tooltip>
      </div>
  );
};

export default memo(InvoiceDateFilter);