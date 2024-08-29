import React, { useEffect, useState } from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { gridSpacing } from "../../store/constants";
import { Button, Grid } from "@mui/material";
import VerificationCard from "./verification-card";
import IncomeCard from "./income-card";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import FingerprintIcon from "@mui/icons-material/Fingerprint";
import CustomerEngagementChart from "./customer-engagement-chart";
import DatePicker from "../../utils/ui-components/FormsUI/DatePicker";
import { useTheme } from "@mui/material/styles";
import dayjs from "dayjs";

const INITIAL_FORM_STATE = {
  fromDate: dayjs().subtract(10, "day"),
  toDate: dayjs(),
};

const FORM_VALIDATION = Yup.object().shape({
  fromDate: Yup.date()
    .nullable()
    .required("Please Select a Date")
    .typeError("please enter a valid date"),
  toDate: Yup.date()
    .nullable()
    .required("Please Select a Date")
    .typeError("please enter a valid date"),
});

function Dashboard() {
  const theme: any = useTheme();
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);
  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <Formik
          initialValues={{
            ...INITIAL_FORM_STATE,
          }}
          validationSchema={FORM_VALIDATION}
          onSubmit={(values) => {
            console.log(values);
          }}
        >
          {(
            { values } //dirty, isSubmitting
          ) => (
            <Form>
              <Grid container spacing={gridSpacing}>
                <Grid item lg={3} md={3} sm={12} xs={12}>
                  <DatePicker
                    name="fromDate"
                    label="From Date"
                    placeholder="From Date"
                    maxDate={values.toDate || dayjs()}
                    sx={{ ...theme.typography.customInput }}
                  />
                </Grid>
                <Grid item lg={3} md={3} sm={12} xs={12}>
                  <DatePicker
                    name="toDate"
                    label="To Date"
                    placeholder="To Date"
                    maxDate={dayjs()}
                    minDate={values.fromDate}
                    sx={{ ...theme.typography.customInput }}
                  />
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                  <Button
                    color="primary"
                    variant="contained"
                    className="scf-btn"
                    type="submit"
                    sx={{ ...theme.typography.customInput }}
                  >
                    View
                  </Button>
                </Grid>
                <Grid item lg={8} md={12} sm={12} xs={12}>
                  <Grid container spacing={gridSpacing}>
                    <Grid item sm={6} xs={12} md={6} lg={6}>
                      <VerificationCard
                        isLoading={isLoading}
                        title="Pending Initial Verifications"
                        count={21324}
                        profit={true}
                        color={"secondary"}
                      />
                    </Grid>
                    <Grid item sm={6} xs={12} md={6} lg={6}>
                      <VerificationCard
                        isLoading={isLoading}
                        title="Pending Secondary Verifications"
                        count={548}
                        profit={false}
                        color={"primary"}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <CustomerEngagementChart isLoading={isLoading} />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item lg={4} md={12} sm={12} xs={12}>
                  <Grid container spacing={gridSpacing}>
                    <Grid item sm={6} xs={12} md={6} lg={12}>
                      <IncomeCard
                        isLoading={isLoading}
                        title="NIC Submissions"
                        count={54}
                        color={"info"}
                        OptionIcon={<PermIdentityIcon />}
                      />
                    </Grid>
                    <Grid item sm={6} xs={12} md={6} lg={12}>
                      <IncomeCard
                        isLoading={isLoading}
                        title="CRIB Pass"
                        count={63}
                        color={"green"}
                        OptionIcon={<ThumbUpIcon />}
                      />
                    </Grid>
                    <Grid item sm={6} xs={12} md={6} lg={12}>
                      <IncomeCard
                        isLoading={isLoading}
                        title="CRIB Failed"
                        count={9}
                        color={"orange"}
                        OptionIcon={<ThumbDownIcon />}
                      />
                    </Grid>
                    <Grid item sm={6} xs={12} md={6} lg={12}>
                      <IncomeCard
                        isLoading={isLoading}
                        title="KYC Data Submissions"
                        count={25}
                        color={"blue"}
                        OptionIcon={<FingerprintIcon />}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </Grid>
    </Grid>
  );
}

export default Dashboard;
