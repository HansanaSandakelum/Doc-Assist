import { Box, makeStyles } from "@material-ui/core/";
import { Card, CardContent, Typography } from "@material-ui/core/";
// import theme from "../../themes";
const useStyles = makeStyles({
  root: {
    minWidth: 400,

    // backgroundColor: "rgba(255,255,255,0.4)",
    backgroundColor:'	rgb(255,255,255,0.2)',
    backdropFilter: "blur(100)px",
    boxShadow: "10px 10px 10px rgba(30,30,30,.1)",
    borderRadius: 20,
  },
});
export default function BasicCard() {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: 600,
            width:600,

            color: "#fff",
            textAlign: "left",
            p: 6,
            mt: 1,
            mb: 1,
          }}
        >
          <Typography component="div" variant= 'h1'>
            Your Journey to Better Health Starts Here
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
