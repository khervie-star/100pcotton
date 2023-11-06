import { Box, Button, Grid, Paper, TextField, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import * as React from "react";
import { connect } from "react-redux";
import * as yup from "yup";
import { userActions } from "../../redux/actions";

const useStyles = makeStyles((theme) => ({
  main: {},
  loginbox: {
    padding: "1.5em",
    width: "100%",
    height: 450,
    borderRadius: "2em",
    [theme.breakpoints.down("md")]: {
      backgroundColor: "transparent",
      boxShadow: "none",
      minHeight: "100vh",
      marginTop: "4em",
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
    p: "1px 5px",
    margin: ".75em 0",
    height: "32px",
    width: "100%",
    display: "flex",
    // alignItems: "center",
    border: "1px solid",
    borderColor: theme.palette.borderColor.main,
    borderRadius: "3em",
    backgroundColor: "#fff",
    "& input": {
      fontFamily: "poppins",
      fontSize: ".85em",
      color: "#121212",
      fontWeight: "light",
    },
    "& input::placeholder": {
      fontFamily: "poppins",
      fontSize: ".85em",
      color: "#707070",
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
  getinBtn: {},
  getinLink: {
    position: "relative",
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
  backButton: {
    color: "#E25822",
    background: "#fffafa",
    boxShadow: "0px 10px 25px #70707026",
    border: "none",
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
    width: 380,
    bgcolor: "transparent",
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
  },
}));

// form validation rules
const validationSchema = yup.object({
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string("Enter your password")
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
  confirmPassword: yup
    .string("Confirm your password")
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required")
    .min(6, "Password should be of minimum 6 characters length"),
});

function Register(props) {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const classes = useStyles();
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
      props.register(values);
    },
  });

  return (
    <div className="w-full h-full flex justify-center items-center">
      <form
        onSubmit={formik.handleSubmit}
        className="bg-transparent md:bg-[#fff] md:shadow-paper rounded-[2em] w-full min-h-screen md:min-h-[400px] md:w-[400px] relative p-6">
        <Grid container className={classes.mainContainer}>
          <Grid item container direction="row">
            <Grid xs={12} className={classes.headerText}>
              <Typography variant="h6">Sign Up</Typography>
            </Grid>
          </Grid>

          <Grid item container id="signup">
            <TextField
              fullWidth
              id="firstName"
              name="firstName"
              label="First name"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              error={
                formik.touched.firstName && Boolean(formik.errors.firstName)
              }
              helperText={formik.touched.firstName && formik.errors.firstName}
              className="loginInput"
            />
            <TextField
              fullWidth
              id="lastName"
              name="lastName"
              label="Last name"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              error={formik.touched.lastName && Boolean(formik.errors.lastName)}
              helperText={
                formik.touched.firstNalastNameme && formik.errors.lastName
              }
              className="loginInput"
            />
            <TextField
              fullWidth
              id="email"
              name="email"
              label="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              className="loginInput"
            />
            <TextField
              fullWidth
              id="password"
              name="password"
              label="Password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              className="loginInput"
            />
            <TextField
              fullWidth
              id="confirmPassword"
              name="confirmPassword"
              label="Confirm password"
              type="password"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              error={
                formik.touched.confirmPassword &&
                Boolean(formik.errors.confirmPassword)
              }
              helperText={
                formik.touched.password && formik.errors.confirmPassword
              }
              className="loginInput"
            />
          </Grid>

          <div className="w-full flex justify-center mt-3 font-light text-[12px] ">
            <div onClick={() => router.push("/dashboard/account/login")}>
              <span style={{ color: "#707070" }}>Already registered? </span>
              <span
                style={{
                  fontWeight: "bold",
                  color: "#b22222",
                  marginLeft: "2px",
                }}>
                Sign in
              </span>
            </div>
          </div>
        </Grid>

        <div className="w-full flex justify-center my-3">
          <Button
            variant="contained"
            width="50%"
            type="submit"
            className={classes.submit}
            loading={loading}
            disabled={loading}>
            {loading && <span>Hang on</span>}
            {!loading && <span>Sign Up</span>}
          </Button>
        </div>
      </form>
    </div>
  );
}

function mapState(state) {
  const { registering } = state.registration;
  return { registering };
}

const actionCreators = {
  register: userActions.register,
};

const connectedRegisterPage = connect(mapState, actionCreators)(Register);
export { connectedRegisterPage as Register };
