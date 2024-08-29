import { Link } from "react-router-dom";

// material-ui
import { Box, ButtonBase } from "@mui/material";

// ==============================|| MAIN LOGO ||============================== //

const LogoSection = ({ theme }: any) => (
  <ButtonBase disableRipple component={Link} to="/">
    <Box
      component="img"
      alt=""
       src={(theme.palette.mode === 'light' ? "../../../assets/images/site_logo_light.png" : "../../../assets/images/site_logo_dark.png")}
    //   src={""}
      sx={{ height: 50 }}
    />
  </ButtonBase>
);

export default LogoSection;
