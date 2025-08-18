import Button from "@mui/material/Button";

function FormButton({ text, styles, onClick, disabled, className, type, color="primary" }) {
  return (
    <Button
      variant="contained"
      color={color}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={className}
      sx={{
        letterSpacing: "1px",
        padding: "10px 20px",
        textTransform: "none",
        ...styles,
      }}
    >
      {text}
    </Button>
  );
}

export default FormButton;
