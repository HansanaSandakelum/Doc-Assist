import React from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { styled } from "@mui/system";
import { GridSearchIcon } from "@mui/x-data-grid";
import CarouselSlider from "./carouselSlider";
import AnimateButton from "../../../utils/ui-components/AnimateButton";
import DataGridDemo from "./out-of-stock-table";

const GlassCardWrapper = styled(Card)(() => ({
  background: "rgba(255, 255, 255, 0.1)", // Semi-transparent white
  backdropFilter: "blur(10px)", // Apply blur effect
  borderRadius: "16px", // Rounded corners for glass effect
  boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)", // Subtle shadow for depth
  border: "1px solid rgba(255, 255, 255, 0.3)", // Thin border for glass-like edges
  //   padding: theme.spacing(2),
  //   maxWidth: 400,
  minHeight: 200,
  alignContent: "center",

  // Optional max width for the card
}));

const GlassCard: React.FC = () => {
  // const theme: any = useTheme();
  return (
    <Grid container spacing={2} p={{ sx: 0, md: 2 }}>
      <Grid item xs={12} md={4} lg={3}>
        <GlassCardWrapper>
          <CardContent>
            <Grid
              container
              display={"flex"}
              direction={"column"}
              alignItems={"center"}
            >
              <Grid
                container
                spacing={2}
                display={"flex"}
                direction={"column"}
                alignItems={"center"}
              >
                <Grid item xs={12}>
                  <TextField
                    placeholder="Search Patient's"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton edge="end">
                            <GridSearchIcon
                              sx={{ color: "#5EB793", fontSize: 24 }}
                            />{" "}
                            {/* Search Icon color and size */}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Box sx={{ mt: 2 }}>
                    <AnimateButton>
                      <Button
                        disableElevation
                        fullWidth
                        size="medium"
                        type="submit"
                        variant="contained"
                        color="primary"
                        sx={{
                          color: "white",
                          fontWeight: "bold",
                          p: 1,
                          minWidth: 200,
                        }}
                      >
                        Create Patient
                      </Button>
                    </AnimateButton>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
        </GlassCardWrapper>
      </Grid>
      <Grid item xs={12} md={8} lg={9}>
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
      </Grid>
      <Grid item xs={12}>
        <GlassCardWrapper>
          <CardContent>
            <Grid container spacing={3} display={"flex"} alignItems={"center"}>
              <Grid item xs={4} display={{ xs: "none", md: "block" }}>
                <Typography
                  variant="h2"
                  align="center"
                  color="primary"
                  gutterBottom
                >
                  Today’s sessions
                </Typography>
              </Grid>

              <Grid item xs={12} md={8}>
                <CarouselSlider />
              </Grid>
            </Grid>
          </CardContent>
        </GlassCardWrapper>
      </Grid>
      <Grid item xs={12}>
        <GlassCardWrapper>
          <CardContent>
            <Typography variant="h5" component="div">
              Glassmorphism Card
            </Typography>
           <DataGridDemo />
          </CardContent>
        </GlassCardWrapper>
      </Grid>
    </Grid>
  );
};

export default GlassCard;
