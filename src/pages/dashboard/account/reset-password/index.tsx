/* eslint-disable react-hooks/exhaustive-deps */

import * as React from "react";

import { Box, Button, Grid, Paper, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { connect } from "react-redux";
import * as yup from "yup";

import { makeStyles } from "@mui/styles";
import { userActions } from "../../../../redux/actions";
import DashboardLayout from "../../../../Layouts/DashboardLayout";
import { SolidOrangeButton } from "../../../../Components/Buttons";

const useStyles = makeStyles((theme: any) => ({
  main: {},
  loginbox: {
    padding: "1.5em",
    width: "100%",
    height: 400,
    borderRadius: "2em",
    display: "flex,",
    position: "relative",
    [theme.breakpoints.down("md")]: {
      backgroundColor: "transparent",
      boxShadow: "none",
      height: "100%",
    },
  },
  headerText: {
    color: theme.palette.borderColor.main,
    textAlign: "left",
    fontWeight: "bold",
    "& h6": {
      fontWeight: "bold",
    },
  },
  inputBasePaper: {
    p: "1px 3px",
    margin: ".75em 0",
    height: "35px",
    width: "100%",
    display: "flex",
    // alignItems: "center",
    border: "1px solid",
    borderColor: theme.palette.primary.main,
    borderRadius: "3em",
    backgroundColor: "#fff",
    "& input": {
      fontFamily: "poppins",
      fontSize: ".875em",
      color: "#707070",
      fontWeight: "light",
    },
    "& input::placeholder": {
      fontFamily: "poppins",
      fontSize: ".85em",
    },
    "& input:focus": {
      outline: "none",
    },
    [theme.breakpoints.down("md")]: {
      height: "45px",
    },
  },
  validationError: {
    color: "darkred",
    fontWeight: "bold",
    fontSize: ".75em",
    margin: "-2px 0px 0 10px",
  },
  textField: {
    height: 30,
    padding: "1.2em",
    border: "none",
    borderRadius: "5em",
    margin: ".5em 0",
    boxShadow: theme.palette.boxShadow.main,
    backgroundColor: "#fafafa",
  },
  getinBtn: {
    alignSelf: "flex-end",
  },
  getinLink: {
    // position: "absolute",
    // bottom: "10px",
    // display: "flex",
    fontSize: ".5em",
    textAlign: "center",
    // justifyContent: "center",
    "& button": {
      fontSize: "1.5em",
      textTransform: "none",
    },
    [theme.breakpoints.down("md")]: {
      position: "relative",
      marginTop: "4em",
      bottom: "10px",
      display: "flex",
      fontSize: ".5em",
      textAlign: "center",
      justifyContent: "center",
    },
  },
  finalBtn: {
    display: "flex",
    justifyContent: "center",
    textAlign: "center",
    alignSelf: "center",
    alignContent: "center",
    alignItems: "center",
    margin: "1em auto",
  },
  submit: {
    // width: "50%",
    margin: "1em 0",
    borderRadius: "3em",
    color: "#fff",
    fontWeight: "bold",
    textTransform: "none",
    boxShadow: theme.palette.boxShadow.main,
    background: "linear-gradient(180deg, #E25822, #D94D22, #B22222)",
    "&:hover": {
      color: "#E25822",
      background: "#fffafa",
      boxShadow: "0px 10px 25px #70707026",
      border: "none",
    },
  },
  style: {
    width: 350,
    bgcolor: "transparent",
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
  },
}));

// form validation rules
const validationSchema = yup.object({
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
});

function ForgotPasswordPage(props: any) {
  const router = useRouter();
  const classes = useStyles();
  const [loading, setLoading] = React.useState(false);
  const [open, setOpen] = React.useState(true);

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
      props.sendResetMail(values);
    },
  });

  React.useEffect(() => {
    // redirect to home if already logged in
    if (loggedIn) {
      router.push("/dashboard/");
    }
  }, []);

  const { loggedIn, sending } = props;

  return (
    <>
      <DashboardLayout>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            textAlign: "center",
            alignSelf: "center",
            alignContent: "center",
            alignItems: "center",
          }}>
          <Box className={classes.style}>
            <form onSubmit={formik.handleSubmit}>
              <Paper elevation={24} className={classes.loginbox}>
                <Grid container>
                  <Grid
                    item
                    container
                    direction="row"
                    style={{ marginBottom: "2.5em" }}>
                    <Grid xs={12} className={classes.headerText}>
                      <div className="gradient-text font-bold text-[26px] bg-gradient-to-r from-[#A01AEC] via-[#CB527D] to-[#DF9361] bg-clip-text fill-transparent">
                        Forgot your password?
                      </div>
                    </Grid>
                    <Grid xs={12} style={{ textAlign: "left" }}>
                      <p className="text-left text-textGray text-[14px]">
                        A reset link would be sent to you if an account with
                        this email exists.
                      </p>
                    </Grid>
                  </Grid>
                  <TextField
                    fullWidth
                    id="email"
                    name="email"
                    label="Enter email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                    className="loginInput"
                  />
                  <div>
                    <Grid className={classes.getinLink} spacing={1}>
                      <Grid
                        item
                        style={{
                          marginBottom: "-20px",
                          width: "100%",
                          textAlign: "center",
                        }}>
                        <Typography
                          component={Button}
                          className={classes.getinBtn}
                          onClick={() =>
                            router.push("/dashboard/account/signup")
                          }>
                          <span style={{ color: "#707070" }}>
                            {" "}
                            Have no account?{" "}
                          </span>
                          <span
                            style={{ fontWeight: "bold", color: "#b22222" }}>
                            Sign Up
                          </span>
                        </Typography>
                      </Grid>
                    </Grid>
                  </div>
                </Grid>
              </Paper>

              <SolidOrangeButton disabled={sending} type="submit">
                {sending && <span>Sending</span>}
                {!sending && <span> Send verification mail</span>}
              </SolidOrangeButton>
            </form>
          </Box>
        </div>
      </DashboardLayout>
    </>
  );
}

function mapState(state: any) {
  const { sending, loggedIn } = state.login;
  return { sending, loggedIn };
}

const actionCreators = {
  sendResetMail: userActions.sendResetMail,
};

const connectedForgotPasswordPage = connect(
  mapState,
  actionCreators
)(ForgotPasswordPage);
export default connectedForgotPasswordPage;
