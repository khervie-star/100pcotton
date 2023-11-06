/* eslint-disable react-hooks/exhaustive-deps */

import * as React from "react";

import { Box, Button, Grid, Paper, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { connect } from "react-redux";
import * as yup from "yup";

import { makeStyles } from "@mui/styles";
import { userActions } from "../../../../../redux/actions";
import { SolidButton } from "../../../../../Components/Buttons";

const useStyles = makeStyles((theme: any) => ({
  loginbox: {
    padding: "1.5em",
    width: "100%",
    height: 420,
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
    marginBottom: "1em",
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
    // bottom: "2em",
    display: "flex",
    fontSize: ".5em",
    "& button": {
      fontSize: "1.5em",
      textTransform: "none",
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
    width: "50%",
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
  password: yup
    .string()
    .min(6, "Password should be of minimum 6 characters length")
    .required("Password is required"),
});

function ChangePassword(props: any) {
  const router = useRouter();
  const classes = useStyles();
  const [loading, setLoading] = React.useState(false);
  const [open, setOpen] = React.useState(true);

  const {
    query: { id },
  } = router;

  console.log(id);

  const formik: any = useFormik({
    initialValues: {},
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
      props.resetPassword(values, id);
    },
  });

  React.useEffect(() => {
    // redirect to home if already logged in
    if (loggedIn) {
      router.push("/dashboard/");
    }
  }, []);

  const { loggedIn, updating } = props;

  return (
    <>
      <div className="flex w-full h-full items-center justify-center ">
        <Box className={classes.style}>
          <form onSubmit={formik.handleSubmit}>
            <Paper elevation={24} className={classes.loginbox}>
              <Grid container>
                <Grid item container direction="row">
                  <Grid xs={12} className={classes.headerText}>
                    {/* <Typography variant="h6">Reset Password</Typography> */}
                    <div className="gradient-text font-bold text-[26px] bg-gradient-to-r from-[#A01AEC] via-[#CB527D] to-[#DF9361] bg-clip-text fill-transparent">
                      Reset Password
                    </div>
                  </Grid>
                </Grid>
                <TextField
                  fullWidth
                  id="password"
                  name="password"
                  label="Password"
                  type="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.password && Boolean(formik.errors.password)
                  }
                  helperText={formik.touched.password && formik.errors.password}
                  className="loginInput"
                />
                <TextField
                  fullWidth
                  id="confirmPassword"
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.confirmPassword &&
                    Boolean(formik.errors.confirmPassword)
                  }
                  helperText={
                    formik.touched.confirmPassword &&
                    formik.errors.confirmPassword
                  }
                  className="loginInput"
                />
              </Grid>
            </Paper>
            {/* <Button
              variant="contained"
              width="50%"
              type="submit"
              className={classes.submit}
              loading={updating}
              disabled={updating}>
              {updating && <span>Updating</span>}
              {!updating && <span>Update Password</span>}
            </Button> */}
            <SolidButton type="submit" disabled={updating}>
              {updating && <span>Updating</span>}
              {!updating && <span>Update Password</span>}
            </SolidButton>
          </form>
        </Box>
      </div>
    </>
  );
}

function mapState(state: any) {
  const { updating, loggedIn } = state.login;
  return { updating, loggedIn };
}

const actionCreators = {
  resetPassword: userActions.resetPassword,
};

const connectedChangePassword = connect(
  mapState,
  actionCreators
)(ChangePassword);
export default connectedChangePassword;
