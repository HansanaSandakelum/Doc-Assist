import { useState } from "react";
import { useTheme } from "@mui/material/styles";
import { Divider, Grid, Stack, Typography, useMediaQuery } from "@mui/material";
import AuthCardWrapper from "../AuthCardWrapper";
import Loader from "../../../utils/ui-components/Loader";
import { Link } from "react-router-dom";
import AuthRegister from "../auth-forms/auth-register";

function Register() {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down("md"));

  const [loading] = useState(false);

  return (
    <Grid className="container">
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <AuthCardWrapper>
          <Grid
            container
            spacing={2}
            alignItems="center"
            justifyContent="center"
          >
            <Grid
              item
              container
              spacing={2}
              sx={{ mb: 3 }}
              alignItems="center"
              justifyContent="center"
            >
              <Link to="#">
                <img
                  height="32"
                  src={
                    theme.palette.mode === "light"
                      ? "../../../assets/images/site_landing_light.png"
                      : "../../../assets/images/site_landing_dark.png"
                  }
                  alt=""
                />
              </Link>
            </Grid>
            <Grid item>
              <Grid
                container
                direction={matchDownSM ? "column-reverse" : "row"}
                alignItems="center"
                justifyContent="center"
              >
                <Grid item>
                  <Stack
                    alignItems="center"
                    justifyContent="center"
                    spacing={1}
                  >
                    <Typography
                      color={theme.palette.primary.main}
                      gutterBottom
                      variant={matchDownSM ? "h3" : "h2"}
                    >
                      Sign up
                    </Typography>
                    <Typography
                      variant="caption"
                      fontSize="16px"
                      textAlign={matchDownSM ? "center" : "inherit"}
                    >
                      Enter your credentials to continue
                    </Typography>
                  </Stack>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <AuthRegister />
            </Grid>
            <Grid item xs={12}>
              <Divider />
            </Grid>
            <Grid item>
              <Grid
                item
                container
                direction="column"
                alignItems="center"
                xs={12}
              >
                <Typography
                  component={Link}
                  to="/login"
                  variant="subtitle1"
                  sx={{ textDecoration: "none" }}
                >
                  Already have an account?
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </AuthCardWrapper>
      </Grid>
      {loading && <Loader />}
    </Grid>
  );
}

export default Register;
