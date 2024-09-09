import React from "react";
import { Card, CardContent, Typography} from "@mui/material";
import { styled } from "@mui/system";

const GlassCardWrapper = styled(Card)(({ theme }) => ({
  background: "rgba(255, 255, 255, 0.1)", // Semi-transparent white
  backdropFilter: "blur(10px)", // Apply blur effect
  borderRadius: "16px", // Rounded corners for glass effect
  boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)", // Subtle shadow for depth
  border: "1px solid rgba(255, 255, 255, 0.3)", // Thin border for glass-like edges
  padding: theme.spacing(2),
  maxWidth: 400, // Optional max width for the card
}));

const GlassCard: React.FC = () => {
  return (
    <GlassCardWrapper>
      <CardContent>
        <Typography variant="h5" component="div">
          Glassmorphism Card
        </Typography>
        <Typography variant="body2" color="text.secondary">
          This is an example of a card with a glassmorphism effect using
          Material-UI and TypeScript.
        </Typography>
      </CardContent>
    </GlassCardWrapper>
  );
};

export default GlassCard;
