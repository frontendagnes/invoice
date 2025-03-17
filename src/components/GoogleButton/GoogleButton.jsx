import React from "react";
import "./GoogleButton.css";

import googleIcon from "@/assets/pic/googleIcon.webp";
//mui
import { Button } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

const SIZE_STYLES = {
  small: {
    width: "180px",
    height: "40px",
    fontSize: "12px",
    iconSize: "16px",
  },
  medium: {
    width: "240px",
    height: "50px",
    fontSize: "14px",
    iconSize: "20px",
  },
  large: {
    width: "280px",
    height: "60px",
    fontSize: "16px",
    iconSize: "24px",
  },
};

export const GoogleButton = ({ onClick, loading, size = "medium" }) => {
  const { width, height, fontSize, iconSize } =
    SIZE_STYLES[size] || SIZE_STYLES.medium;

  return (
    <Button
      className="google-button"
      onClick={onClick}
      disabled={loading}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "12px",
        width,
        height,
        padding: "10px 20px",
        textTransform: "none",
        fontFamily: "Roboto, arial, sans-serif",
        fontSize,
        color: "rgba(0, 0, 0, 0.54)",
        backgroundColor: "#fff",
        boxShadow: "rgba(0, 0, 0, 0.25) 0px 2px 4px 0px",
        "&:hover": {
          boxShadow: "rgba(66, 133,244, 0.3) 0px 0px 3px 3px",
        },
        "&:disabled": {
          opacity: 0.6,
          cursor: "not-allowed",
        },
      }}
    >
      <img src={googleIcon} alt="Google" style={{ width: iconSize }} />
      {loading ? <CircularProgress size={20} /> : "Sign in with Google"}
    </Button>
  );
};
