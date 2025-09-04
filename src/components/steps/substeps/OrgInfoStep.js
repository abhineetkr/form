import React from "react";
import { Box, TextField, Button } from "@mui/material";

export default function OrgInfoStep({ data, setData, onNext, onBack }) {
  return (
    <Box>
      <TextField
        label="Organization Name"
        value={data.organization?.name || ""}
        onChange={(e) =>
          setData((prev) => ({
            ...prev,
            organization: {
              ...prev.organization,
              name: e.target.value
            }
          }))
        }
        fullWidth
        margin="normal"
      />
      <TextField
        label="Organization Type"
        value={data.organization?.type || ""}
        onChange={(e) =>
          setData((prev) => ({
            ...prev,
            organization: {
              ...prev.organization,
              type: e.target.value
            }
          }))
        }
        fullWidth
        margin="normal"
      />
      <TextField
        label="Registration Number"
        value={data.organization?.registrationNumber || ""}
        onChange={(e) =>
          setData((prev) => ({
            ...prev,
            organization: {
              ...prev.organization,
              registrationNumber: e.target.value
            }
          }))
        }
        fullWidth
        margin="normal"
      />

      <Box mt={2} display="flex" justifyContent="space-between">
        <Button variant="outlined" onClick={onBack}>
          Back
        </Button>
        <Button variant="contained" onClick={onNext}>
          Next
        </Button>
      </Box>
    </Box>
  );
}
