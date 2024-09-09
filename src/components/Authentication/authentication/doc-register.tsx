import { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import { Divider, Grid, Stack, Typography, useMediaQuery } from "@mui/material";
import AuthCardWrapper from "../AuthCardWrapper";
import Loader from "../../../utils/ui-components/Loader";
import { Link, useNavigate } from "react-router-dom";
// import AuthRegister from "../auth-forms/auth-register";
import DocAuthRegister from "../auth-forms/doc-auth-register";
// import { Fullscreen } from "@mui/icons-material";
import {
  registerRequest,
  setRedirectPath,
} from "../../../redux/actions/actions";
import { connect } from "react-redux"; // Add this line to import the connect function

// eslint-disable-next-line react-refresh/only-export-components
function Register(props: any) {
  const {
    registerRequest, // remember, Redux Form injects this into our props
    // setRedirectPath,
    path,
  } = props;
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();

  const [loading] = useState(false);

  useEffect(() => {
    if (path) {
      navigate(path?.path, path?.state);
      // Optionally reset the redirect path in the store after navigating
    }
  }, [navigate, path]);

  return (
    <Grid className="container">
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        sx={{
          minHeight: "100vh",
          backgroundImage:
            "linear-gradient(-45deg, #5650D2 0%, #32B78D 99%, #32B78D 100%)",
          minWidth: "100vw",
        }}
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
                      variant={matchDownSM ? "h1" : "h1"}
                    >
                      Doctor Registration
                    </Typography>
                    <Typography
                      variant="caption"
                      fontSize="16px"
                      textAlign={matchDownSM ? "center" : "inherit"}
                    >
                      Let’s Protect yourself and those around you by vaccinating
                    </Typography>
                  </Stack>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <DocAuthRegister registerRequest={registerRequest} />
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

const mapStateToProps = (state: any) => ({
  register: state.auth,
  path: state.auth.redirectPath,
});
const mapDispatchToProps = (dispatch: any) => {
  // console.log(path);

  return {
    registerRequest: (values: any) => dispatch(registerRequest(values)),
    setRedirectPath: (path: string, state: any) =>
      dispatch(setRedirectPath(path, state)),
  };
};

// eslint-disable-next-line react-refresh/only-export-components
export default connect(mapStateToProps, mapDispatchToProps)(Register);
