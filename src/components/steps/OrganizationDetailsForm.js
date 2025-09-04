import React, { useState } from "react";
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Typography,
  LinearProgress
} from "@mui/material";
import CustomStepIcon from "../CustomStepIcon";
import OrgInfoStep from "./substeps/OrgInfoStep";
import OrgDocsStep from "./substeps/OrgDocsStep";

import BusinessIcon from "@mui/icons-material/Business";
import DescriptionIcon from "@mui/icons-material/Description";

// Sub-step configuration with labels and icons
const subSteps = [
  { label: "Organization Info", icon: BusinessIcon },
  { label: "Organization Documents", icon: DescriptionIcon }
];

export default function OrganizationDetailsForm({ formData, setFormData, onNext, onBack }) {
  const [subStep, setSubStep] = useState(0);

  // Utility functions
  const isFilled = (fields) => fields.every((f) => f?.toString().trim() !== "");
  const isPartiallyFilled = (fields) =>
    fields.some((f) => f?.toString().trim() !== "") && !isFilled(fields);

  const getStepDescription = (status) => {
    switch (status) {
      case "completed":
        return "Completed";
      case "partial":
        return "Partially filled";
      case "empty":
      default:
        return "Not started";
    }
  };

  const getProgressPercentage = (fields) => {
    const total = fields.length;
    const filled = fields.filter((f) => f?.toString().trim() !== "").length;
    return Math.round((filled / total) * 100);
  };

  // Data for status & progress
  const orgInfoFields = [
    formData.organization?.name,
    formData.organization?.type,
    formData.organization?.registrationNumber
  ];
  const orgDocFields = [
    formData.organization?.documents?.pan,
    formData.organization?.documents?.gst,
    formData.organization?.documents?.incorporation
  ];

  const getSubStepStatus = () => {
    const getStatus = (fields) => {
      if (isFilled(fields)) return "completed";
      if (isPartiallyFilled(fields)) return "partial";
      return "empty";
    };
    return [getStatus(orgInfoFields), getStatus(orgDocFields)];
  };

  const getSubProgress = () => [
    getProgressPercentage(orgInfoFields),
    getProgressPercentage(orgDocFields)
  ];

  const subStepStatus = getSubStepStatus();
  const subProgress = getSubProgress();

  return (
    <Box>
      {/* Sub Stepper with icons, descriptions, and progress bars */}
      <Stepper activeStep={subStep} alternativeLabel sx={{ mb: 3 }}>
        {subSteps.map((step, index) => (
          <Step
            key={step.label}
            onClick={() => setSubStep(index)}
            sx={{ cursor: "pointer" }}
          >
            <StepLabel
              StepIconComponent={() => (
                <CustomStepIcon
                  status={subStepStatus[index]}
                  active={subStep === index}
                  StepIconComponent={step.icon}
                />
              )}
            >
              <Box display="flex" flexDirection="column" alignItems="center">
                <Typography fontWeight={600}>{step.label}</Typography>
                <Typography variant="caption" sx={{ mt: 0.5 }}>
                  {getStepDescription(subStepStatus[index])}
                </Typography>
                <Box width="80%" sx={{ mt: 0.5 }}>
                  <LinearProgress
                    variant="determinate"
                    value={subProgress[index]}
                    sx={{ height: 8, borderRadius: 4 }}
                  />
                  <Typography
                    variant="caption"
                    color="text.disabled"
                    textAlign="center"
                  >
                    {subProgress[index]}%
                  </Typography>
                </Box>
              </Box>
            </StepLabel>
          </Step>
        ))}
      </Stepper>

      {/* Sub Step Forms */}
      {subStep === 0 && (
        <OrgInfoStep
          data={formData}
          setData={setFormData}
          onNext={() => setSubStep(1)}
          onBack={onBack}
        />
      )}
      {subStep === 1 && (
        <OrgDocsStep
          data={formData}
          setData={setFormData}
          onNext={onNext} // Goes to main stepper next step
          onBack={() => setSubStep(0)}
        />
      )}
    </Box>
  );
}
