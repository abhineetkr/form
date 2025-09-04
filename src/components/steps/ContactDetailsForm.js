import React from "react";
import { TextField, Button, Stack, Box } from "@mui/material";

export default function ContactDetailsForm({ data, setData, onNext, onBack }) {
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <Stack spacing={2}>
      <TextField
        label="Email"
        name="email"
        value={data.email}
        onChange={handleChange}
        fullWidth
      />
      <TextField
        label="Phone"
        name="phone"
        value={data.phone}
        onChange={handleChange}
        fullWidth
      />
      <Box mt={2} display="flex" justifyContent="space-between">
        <Button variant="outlined" onClick={onBack}>
          Back
        </Button>
        <Button variant="contained" onClick={onNext}>
          Next
        </Button>
      </Box>
    </Stack>
  );
}
