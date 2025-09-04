import React from "react";
import { Stepper, Step, StepLabel } from "@mui/material";

export default function StepIndicator({ steps, status, onStepClick }) {
  return (
    <Stepper activeStep={status.findIndex(s => s === "current")} alternativeLabel>
      {steps.map((label, index) => (
        <Step key={label} completed={status[index] === "completed"}> 
          <StepLabel onClick={() => onStepClick(index)} style={{ cursor: "pointer" }}>
            {label}
          </StepLabel>
        </Step>
      ))}
    </Stepper>
  );
}