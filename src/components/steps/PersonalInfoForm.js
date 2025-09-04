import React from "react";
import { TextField, Button, Stack } from "@mui/material";

export default function PersonalInfoForm({ data, setData, onNext }) {
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <Stack spacing={2}>
      <TextField
        label="First Name"
        name="firstName"
        value={data.firstName}
        onChange={handleChange}
        fullWidth
      />
      <TextField
        label="Last Name"
        name="lastName"
        value={data.lastName}
        onChange={handleChange}
        fullWidth
      />
      <Button
        variant="contained"
        onClick={() => {onNext();}}
      >
        Next
      </Button>
    </Stack>
  );
}
