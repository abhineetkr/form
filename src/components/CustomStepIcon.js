import React from "react";
import { Box } from "@mui/material";

export default function CustomStepIcon({ status, active, StepIconComponent }) {
  const getGradient = () => {
    switch (status) {
      case "completed":
        return "linear-gradient(135deg, #4caf50, #81c784)";
      case "partial":
        return "linear-gradient(135deg, #ff9800, #ffb74d)";
      case "empty":
      default:
        return "linear-gradient(135deg, #bdbdbd, #e0e0e0)";
    }
  };

  const getIconColor = () => {
    switch (status) {
      case "completed":
        return "#2e7d32";
      case "partial":
        return "#ef6c00";
      case "empty":
      default:
        return "#616161";
    }
  };

  return (
    <Box
      sx={{
        width: 42,
        height: 42,
        borderRadius: "50%",
        background: getGradient(),
        border: active ? "3px solid #2196f3" : "3px solid transparent",
        boxShadow: active
          ? "0 0 8px rgba(33, 150, 243, 0.6)"
          : "0 0 4px rgba(0,0,0,0.2)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "all 0.3s ease",
        cursor: "pointer"
      }}
    >
      {StepIconComponent && <StepIconComponent sx={{ color: getIconColor(), fontSize: 22 }} />}
    </Box>
  );
}
