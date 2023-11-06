/* eslint-disable react-hooks/exhaustive-deps */

import * as React from "react";

import { useFormik } from "formik";
import { useRouter } from "next/router";
import { connect } from "react-redux";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { makeStyles } from "@mui/styles";
import { userActions } from "../../redux/actions";
import { SolidButton, SolidPurpleGradientButton } from "../Buttons";

// form validation rules
const validationSchema = yup.object({
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password should be of minimum 6 characters length")
    .required("Password is required"),
});

type FormValues = {
  email: string;
  password: string;
};

function Login(props: any) {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const [open, setOpen] = React.useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data: any) => {
    console.log(data);
    props.login(data);
  };

  React.useEffect(() => {
    // redirect to home if already logged in
    if (loggedIn) {
      router.push("/dashboard");
    }
  }, []);

  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm();

  const { loggedIn, loggingIn } = props;

  console.log(loggedIn);

  return (
    <>
      <div className="md:w-[450px] w-full md:h-[500px] mx-auto my-4 p-4 bg-white rounded-[20px] bg-[white]  shadow-paper">
        <h2 className="mb-8 text-3xl font-bold bg-gradient-to-r from-[#CB527D] to-[#DF9361] bg-clip-text fill-transparent gradient-text">
          Login
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2 text-textGray"
              htmlFor="email">
              Email
            </label>
            <input
              className={`appearance-none  w-full py-3 px-3 text-gray-700 border-primary2 border-[2px] leading-tight focus:outline-none focus:shadow-outline rounded-[12px] ${
                errors.email ? "border-red-500" : ""
              }`}
              type="email"
              placeholder="Email"
              // name="email"
              id="email"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <span className="text-[crimson] text-sm">
                {errors.email.message}
              </span>
            )}
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 font-bold mb-2 text-textGray"
              htmlFor="password">
              Password
            </label>
            <input
              className={`appearance-none  w-full py-3 px-3 text-gray-700 border-primary2 border-[2px] leading-tight focus:outline-none focus:shadow-outline rounded-[12px] ${
                errors.password ? "border-red-500" : ""
              }`}
              type="password"
              placeholder="Password"
              // name="password"
              id="password"
              {...register("password", { required: true })}
            />
            {errors.password && (
              <span className="text-[crimson] text-sm">
                {errors.password.message}
              </span>
            )}
          </div>
          <div
            className="mb-12 text-textGray text-[13px] text-light"
            onClick={() => router.push("/dashboard/account/reset-password")}>
            Forgot password?
          </div>
          <div className=" w-full flex items-center justify-center mx-auto">
            {/* <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit">
              Sign In
            </button> */}
            <SolidPurpleGradientButton type="submit">
              Sign In
            </SolidPurpleGradientButton>
          </div>
          <div
            className="text-center text-[12px] my-4 font-light cursor-pointer"
            onClick={() => router.push("/dashboard/account/signup")}>
            <span style={{ color: "#707070" }}> Have no account? </span>
            <span className="font-bold ml-[2px] text-primary1">
              Sign up now
            </span>
          </div>
        </form>
      </div>
    </>
  );
}

function mapState(state: any) {
  const { loggingIn, loggedIn } = state.login;
  return { loggingIn, loggedIn };
}

const actionCreators = {
  login: userActions.login,
};

const connectedLoginPage = connect(mapState, actionCreators)(Login);
export { connectedLoginPage as Login };
