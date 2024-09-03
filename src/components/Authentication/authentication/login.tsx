import { useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { useTheme } from "@mui/material/styles";
import { Divider, Grid, Stack, Typography, useMediaQuery } from "@mui/material";
// import AuthCardWrapper from "../AuthCardWrapper";
import Loader from "../../../utils/ui-components/Loader";
import AuthLogin from "../auth-forms/auth-login";
import { Link } from "react-router-dom";
import { getState, loginRequest } from "../../../redux/actions/actions";

import logoIcon from "../../../assets/images/doc logo.png";

// import { m } from "framer-motion";

// eslint-disable-next-line react-refresh/only-export-components
function Login(props: any) {
  const {
    loginRequest, // remember, Redux Form injects this into our props
    login,
    rememberMe,
  } = props;

  const theme = useTheme();
  const dispatch = useDispatch();
  // const [loading, setLoading] = useState(false);
  const matchDownSM = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    // dispatch({type: LOGOUT_REQUIRED});
  }, []);

  return (
    <Grid className="container">
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        {/* <Grid item  sm={6} sx={{ m: 3 }}>
          <BasicCard />
        </Grid> */}
        {/* <AuthCardWrapper> */}
        <Grid item spacing={2} alignItems="center" justifyContent="center">
          <Grid
            container
            spacing={2}
            sx={{ mb: 3 }}
            alignItems="center"
            justifyContent="center"
          >
            <Grid item>
              <img height="70" src={logoIcon} />
            </Grid>
            {/* <Grid item>
                <img
                  height="65"
                  src={
                    theme.palette.mode === "light"
                      ? "../../../assets/images/site_landing_light.png"
                      : "../../../assets/images/site_landing_dark.png"
                  }
                  alt="logo"
                />
              </Grid> */}
          </Grid>
          <Grid item>
            <Grid
              container
              direction={matchDownSM ? "column-reverse" : "row"}
              alignItems="center"
              justifyContent="center"
            >
              <Grid item>
                <Stack alignItems="center" justifyContent="center" spacing={1}>
                  <Typography
                    fontWeight="bold"
                    color={theme.palette.primary.main}
                    gutterBottom
                    variant={matchDownSM ? "h3" : "h4"}
                  >
                    Hi, Welcome Back
                  </Typography>
                  <Typography
                    variant="caption"
                    fontSize="16px"
                    textAlign={matchDownSM ? "center" : "inherit"}
                  >
                    Enter the information you entered while registering
                  </Typography>
                </Stack>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <AuthLogin
              rememberMe={getState(rememberMe)}
              loginRequest={loginRequest}
              dispatch={dispatch}
              theme={theme}
            />
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item>
            <Grid item container direction="column" alignItems="center" xs={12} sx={{mt:3}}>
              <Typography
                component={Link}
                to="/signup"
                variant="subtitle1"
                sx={{ textDecoration: "none" }}
              >
                Don't have an account?
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        {/* </AuthCardWrapper> */}
      </Grid>
      {login?.requesting && <Loader />}
    </Grid>
  );
}

const mapStateToProps = (state: any) => ({
  login: state.auth,
  rememberMe: state.rememberMe?.rememberMeData,
});

// eslint-disable-next-line react-refresh/only-export-components
export default connect(mapStateToProps, { loginRequest })(Login);
