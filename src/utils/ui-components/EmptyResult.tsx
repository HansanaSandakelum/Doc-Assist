import {Container, Grid, Typography} from "@mui/material";
import {useTheme} from "@mui/material/styles";

const EmptyResult = () => {
    const theme = useTheme();
    return (
        <Container maxWidth="lg">
            <Grid container direction="row"
                  style={{height: '40vh', display: 'flex', justifyContent: 'center', alignItems: 'center',}}>
                <Grid item
                      className="empty-cart-cls"
                      textAlign="center">
                    <img
                        alt=""
                        src={("../../assets/images/empty-box.png")}
                        width="130"
                        height="130"
                        className="img-fluid mb-4 mr-3"
                    />
                    <Typography color="primary" variant="h4">
                        <strong>No Result!</strong>
                    </Typography>
                    <Typography color="secondary" variant="subtitle1">We cannot find the item you are searching for, try
                        again.</Typography>
                </Grid>
            </Grid>
        </Container>
    );
};

export default EmptyResult;