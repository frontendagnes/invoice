import React from "react";
import { useStateValue } from "../../assets/utility/StateProvider";
import { CircularProgress } from "@mui/material";

function RenderLoader() {
  const [{ globalLoading }] = useStateValue();

  if (!globalLoading) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 9999,
        width: "100vw",
        height: "100vh",
        background: "rgba(255, 255, 255, 0.7)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircularProgress color="success" />
    </div>
  );
}

export default RenderLoader;
