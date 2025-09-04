import React, { useState } from "react";
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Typography,
  LinearProgress,
  Paper,
  Tooltip
} from "@mui/material";
import StepForm from "./StepForm";
import CustomStepIcon from "./CustomStepIcon";

import PersonIcon from "@mui/icons-material/Person";
import BusinessIcon from "@mui/icons-material/Business";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import PreviewIcon from "@mui/icons-material/Preview";

const steps = [
  { label: "Personal Info", icon: PersonIcon },
  { label: "Organization Details", icon: BusinessIcon },
  { label: "Contact Details", icon: ContactPhoneIcon },
  { label: "Review", icon: PreviewIcon }
];

export default function FormStepper() {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    organization: {
      name: "",
      type: "",
      registrationNumber: "",
      documents: {
        pan: "",
        gst: "",
        incorporation: ""
      }
    },
    email: "",
    phone: ""
  });

  const handleNext = () => {
    setActiveStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const handleBack = () => {
    setActiveStep((prev) => Math.max(prev - 1, 0));
  };

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
        return "Not started";
      default:
        return "";
    }
  };

  const getProgressPercentage = (fields) => {
    const total = fields.length;
    const filled = fields.filter((f) => f?.toString().trim() !== "").length;
    return Math.round((filled / total) * 100);
  };

  const getMainStepStatus = () => {
    const personalFields = [formData.firstName, formData.lastName];
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
    const contactFields = [formData.email, formData.phone];
    const reviewFields = [...personalFields, ...orgInfoFields, ...orgDocFields, ...contactFields];

    const getStatus = (fields) => {
      if (isFilled(fields)) return "completed";
      if (isPartiallyFilled(fields)) return "partial";
      return "empty";
    };

    return [
      getStatus(personalFields),
      getStatus([...orgInfoFields, ...orgDocFields]),
      getStatus(contactFields),
      getStatus(reviewFields)
    ];
  };

  const getMainProgress = () => {
    const personalFields = [formData.firstName, formData.lastName];
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
    const contactFields = [formData.email, formData.phone];
    const reviewFields = [...personalFields, ...orgInfoFields, ...orgDocFields, ...contactFields];

    return [
      getProgressPercentage(personalFields),
      getProgressPercentage([...orgInfoFields, ...orgDocFields]),
      getProgressPercentage(contactFields),
      getProgressPercentage(reviewFields)
    ];
  };

  const mainStepStatus = getMainStepStatus();
  const mainProgress = getMainProgress();

  return (
    <Box width="100%" mt={4}>
      <Box sx={{ overflowX: "auto", px: 2 }}>
        <Stepper activeStep={activeStep} alternativeLabel >
          {steps.map((step, index) => (
            <Step key={step.label}>
              <Tooltip title={`Go to ${step.label}`} arrow>
                <Box onClick={() => setActiveStep(index)} sx={{ cursor: "pointer" }}>
                  <StepLabel
                    StepIconComponent={() => (
                      <CustomStepIcon
                        status={mainStepStatus[index]}
                        active={activeStep === index}
                        StepIconComponent={step.icon}
                      />
                    )}
                  >
                    <Box display="flex" flexDirection="column" alignItems="center">
                      <Typography fontWeight={600}>{step.label}</Typography>
                      <Typography variant="caption" sx={{ mt: 0.5 }}>
                        {getStepDescription(mainStepStatus[index])}
                      </Typography>
                      <Box width="80%" sx={{ mt: 0.5 }}>
                        <LinearProgress
                          variant="determinate"
                          value={mainProgress[index]}
                          sx={{ height: 8, borderRadius: 4 }}
                        />
                        <Typography
                          variant="caption"
                          color="text.disabled"
                          textAlign="center"
                        >
                          {mainProgress[index]}%
                        </Typography>
                      </Box>
                    </Box>
                  </StepLabel>
                </Box>
              </Tooltip>
            </Step>
          ))}
        </Stepper>
      </Box>

      <Box display="flex" justifyContent="center" mt={2} gap={3}>
        <Typography variant="caption" sx={{ color: "#4caf50" }}>● Completed</Typography>
        <Typography variant="caption" sx={{ color: "#ff9800" }}>● Partially Filled</Typography>
        <Typography variant="caption" sx={{ color: "#9e9e9e" }}>● Not Started</Typography>
      </Box>

      <Paper elevation={3} sx={{ p: 4, mt: 4, width: "80%", mx: "auto" }}>
        <StepForm
          step={activeStep}
          formData={formData}
          setFormData={setFormData}
          onNext={handleNext}
          onBack={handleBack}
        />
      </Paper>
    </Box>
  );
}
