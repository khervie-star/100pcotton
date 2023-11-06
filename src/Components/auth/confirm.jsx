/* eslint-disable react-hooks/exhaustive-deps */

// import { faCircleXmark } from "@fortawesome/free-solid-svg-icons/faCircleXmark";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Grid, Paper, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Link from "next/link";
import { useRouter } from "next/router";
import * as React from "react";
import { connect } from "react-redux";
import { RotateSpinner } from "react-spinners-kit";
import { userActions } from "../../redux/actions";
import OTPInput, { ResendOTP } from "otp-input-react";
import Image from "next/image";
import { userService } from "../../services";
import toast from "react-hot-toast";
import { FaWindowClose } from "react-icons/fa";
import {
  SolidButton,
  SolidGrayButton,
  SolidOrangeButton,
  SolidPurpleGradientButton,
} from "../Buttons";

const useStyles = makeStyles((theme) => ({
  main: {},
  loginbox: {
    padding: "1.5em",
    width: "100%",
    height: 350,
    borderRadius: "2em",
    display: "flex,",
    position: "relative",
    boxShadow: "24",
    [theme.breakpoints.down("md")]: {
      height: "70vh",
      padding: "1em",
      background: "trasnparent",
      boxShadow: "none",
    },
  },
  headerText: {
    color: theme.palette.textColor.main,
    textAlign: "left",
    fontWeight: "bold",
    // marginBottom: "1em",
    "& h6": {
      fontWeight: "bold",
    },
  },
  verificationMessage: {
    color: theme.palette.textColor.main,
    fontSize: ".875em",
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: "1em",
  },
  getinBtn: {
    alignSelf: "flex-end",
    fontWeight: "bold",
  },
}));
const style = {
  width: 350,
  bgcolor: "transparent",
};

function VerifyAccount(props) {
  const router = useRouter();
  const classes = useStyles();
  const [OTP, setOTP] = React.useState("");
  const [verifying, setVerifying] = React.useState(false);
  const [verified, setVerified] = React.useState(false);
  const [verificationFail, setVerificationFail] = React.useState(false);

  //   let userId;
  //   if (typeof window !== "undefined") {
  //     userId = JSON.parse(window.localStorage.getItem("userId"));
  //   }

  //   const verifyToken = new Object();
  //   verifyToken._id = query.userId;
  //   verifyToken.tokenId = query.id;

  // React.useEffect(() => {
  //   // redirect to home if already logged in
  //   if (loggedIn) {
  //     router.push('/');
  //   } else if (!userId) {
  //     router.push('/');
  //   }
  // }, []);

  const verifyAccount = () => {
    setVerifying(true);
    userService
      .verifyEmail({
        otp: OTP,
        userId: props.userId,
      })
      .then((res) => {
        setVerifying(false);
        setVerified(true);
        setVerificationFail(false);
      })
      .catch((err) => {
        console.log(err);
        setVerifying(false);
        setVerified(false);
        setVerificationFail(true);
      });
  };

  const resendVerificationMail = () => {
    const loginToast = toast.loading("Sending new verification code");

    let email;
    if (typeof window !== "undefined") {
      email = JSON.parse(localStorage.getItem("user"))?.data?.user?.email;
    }

    const data = new Object();
    data.email = email;
    data.userId = props?.userId;

    console.log(data);

    userService
      .resend(data)
      .then((res) => {
        toast.success("Code sent, please check your email", {
          id: loginToast,
        });
      })
      .catch((err) => {
        console.log(err);
        toast.error("Could not send email, please try again", {
          id: loginToast,
        });
      });
  };
  const { user } = props;

  return (
    <>
      <div className="w-full flex justify-center items-center">
        <div>
          <div className="p-6 w-full md:w-[400px] h-full md:h-[420px]  rounded-[12px] md:rounded-[20px] text-center relative shadow-none md:shadow-paper bg-white">
            {!verifying && !verified && !verificationFail && (
              <div>
                <div className="text-left font-bold font-sora text-primary2 mb-4 text-[20px]">
                  Verify Email
                </div>
                <div>
                  <div className="w-full flex justify-center items-center">
                    <Image
                      src="/static/thumbs.png"
                      alt="Thumbs up"
                      height={100}
                      width={100}
                    />
                  </div>
                  <div className="text-main text-[0.875em] text-center font-bold mb-4">
                    <div className="text-textGray text-[13px]">
                      We sent a verification code to your email address. Please
                      copy an paste the code in the email to verify!
                    </div>
                    <div className="w-full flex justify-center my-8">
                      <OTPInput
                        value={OTP}
                        onChange={setOTP}
                        autoFocus
                        OTPLength={4}
                        otpType="number"
                        disabled={false}
                        secure
                        inputClassName="border-b-2 border-solid border-red-500"
                      />
                    </div>
                    <ResendOTP
                      onResendClick={resendVerificationMail}
                      maxTime={5}
                    />
                  </div>
                </div>
              </div>
            )}

            {verifying && (
              <>
                <div>
                  <Grid item container direction="row">
                    <Grid xs={12} className={classes.headerText}>
                      <Typography variant="h6">Verifying...</Typography>
                    </Grid>
                  </Grid>
                  <div className="w-full h-[300px] flex justify-center items-center">
                    <RotateSpinner
                      color={"#d84d22"}
                      size={100}
                      justifyContent="center"
                    />
                  </div>
                </div>
              </>
            )}

            {!verifying && !!verified && (
              <>
                <Grid item container direction="row">
                  <Grid xs={12} className={classes.headerText}>
                    <Typography variant="h6">Verified</Typography>
                  </Grid>
                </Grid>
                <div style={{ position: "relative" }}>
                  <div>
                    <div>
                      <svg
                        className="checkmark"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 52 52">
                        <circle
                          className="checkmark__circle"
                          cx="26"
                          cy="26"
                          r="25"
                          fill="none"
                        />
                        <path
                          className="checkmark__check"
                          fill="none"
                          d="M14.1 27.2l7.1 7.2 16.7-16.8"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="text-gray text-[15px] font-bold">
                    Your account has been verified successfully. Proceed to
                    login.
                  </div>

                  <SolidOrangeButton
                    onClick={() => router.push("/dashboard/account/login")}>
                    Login
                  </SolidOrangeButton>
                </div>
              </>
            )}

            {!verifying && verificationFail && (
              <>
                <Grid item container direction="row">
                  <Grid xs={12} className={classes.headerText}>
                    <Typography variant="h6">Verification Failed</Typography>
                  </Grid>
                </Grid>
                <div style={{ position: "relative" }}>
                  <Box
                    sx={{
                      margin: "1.5em 0",
                      textAlign: "center",
                    }}>
                    <div className="text-primary2">
                      <FaWindowClose size={60} />
                    </div>
                  </Box>

                  <div className="text-gray text-[13px]">
                    Your account verification failed. You can please go back and
                    try again.
                  </div>

                  <div className="w-full grid  grid-cols-2 gap-4">
                    <SolidGrayButton
                      onClick={() => {
                        setVerificationFail(false);
                        setVerified(false);
                        setVerifying(false);
                      }}>
                      Go back
                    </SolidGrayButton>

                    <SolidButton
                      onClick={() => router.push("/dashboard/account/login")}>
                      Login
                    </SolidButton>
                  </div>
                </div>
              </>
            )}
            {!verifying && !verificationFail && !verified && (
              <div className="w-full flex justify-center">
                <SolidPurpleGradientButton
                  onClick={verifyAccount}
                  disabled={OTP.length < 4}>
                  Verify
                </SolidPurpleGradientButton>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

function mapState(state) {
  const { verifying, verifiedEmail, verificationFail, user } = state.users;
  const { loggedIn } = state.login;
  return { loggedIn, verifiedEmail, verifying, verificationFail };
}

const actionCreators = {
  verifyEmail: userActions.verifyEmail,
};

const connectedVerifyAccount = connect(mapState, actionCreators)(VerifyAccount);
export default connectedVerifyAccount;
