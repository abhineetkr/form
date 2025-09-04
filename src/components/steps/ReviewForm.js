import React from "react";
import { Box, Typography, Divider, Button } from "@mui/material";

export default function ReviewForm({ data, onBack }) {
  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <Typography variant="h6">Personal Information</Typography>
      <Typography>First Name: {data.firstName}</Typography>
      <Typography>Last Name: {data.lastName}</Typography>

      <Divider />

      <Typography variant="h6">Organization Information</Typography>
      <Typography>Organization Name: {data.organization?.name}</Typography>
      <Typography>Type: {data.organization?.type}</Typography>
      <Typography>Registration No: {data.organization?.registrationNumber}</Typography>

      <Divider />

      <Typography variant="h6">Organization Documents</Typography>
      <Typography>PAN: {data.organization?.documents?.pan}</Typography>
      <Typography>GST: {data.organization?.documents?.gst}</Typography>
      <Typography>Incorporation No: {data.organization?.documents?.incorporation}</Typography>

      <Divider />

      <Typography variant="h6">Contact Details</Typography>
      <Typography>Email: {data.email}</Typography>
      <Typography>Phone: {data.phone}</Typography>

      <Box mt={3}>
        <Button variant="outlined" onClick={onBack}>Back</Button>
      </Box>
    </Box>
  );
}
