import React from "react";
import { Box, TextField, Button } from "@mui/material";

export default function OrgDocsStep({ data, setData, onNext, onBack }) {
  return (
    <Box>
      <TextField
        label="PAN Number"
        value={data.organization?.documents?.pan || ""}
        onChange={(e) =>
          setData((prev) => ({
            ...prev,
            organization: {
              ...prev.organization,
              documents: {
                ...prev.organization.documents,
                pan: e.target.value
              }
            }
          }))
        }
        fullWidth
        margin="normal"
      />
      <TextField
        label="GST Number"
        value={data.organization?.documents?.gst || ""}
        onChange={(e) =>
          setData((prev) => ({
            ...prev,
            organization: {
              ...prev.organization,
              documents: {
                ...prev.organization.documents,
                gst: e.target.value
              }
            }
          }))
        }
        fullWidth
        margin="normal"
      />
      <TextField
        label="Incorporation Certificate"
        value={data.organization?.documents?.incorporation || ""}
        onChange={(e) =>
          setData((prev) => ({
            ...prev,
            organization: {
              ...prev.organization,
              documents: {
                ...prev.organization.documents,
                incorporation: e.target.value
              }
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
