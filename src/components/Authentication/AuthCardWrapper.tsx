import PropTypes from "prop-types";
import MainCard from "../../utils/ui-components/MainCard";
import { Box } from "@mui/material";

AuthCardWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

function AuthCardWrapper({ children, ...other }: any) {
  return (
    <MainCard
      sx={{
        maxWidth: { xs: 500, lg: 470 },
        margin: { xs: 2.5, md: 1 },
        boxShadow: "10px 10px 10px rgba(30,30,30,.1)",
        borderRadius: 8,

        "&>*": {
          flexGrow: 1,
          flexBasis: "50%",
        },
      }}
      content={false}
      {...other}
    >
      <Box sx={{ p: { xs: 2, sm: 4, xl: 5 } }}>{children}</Box>
    </MainCard>
  );
}

export default AuthCardWrapper;
