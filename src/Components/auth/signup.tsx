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
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm password is required")
    .min(6, "Password should be of minimum 6 characters length"),
});

type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

function SignUp(props: any) {
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
    props.register(data);
  };

  //   React.useEffect(() => {
  //     // redirect to home if already logged in
  //     if (loggedIn) {
  //       router.push("/dashboard");
  //     }
  //   }, []);

  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm();

  return (
    <>
      <div className="md:w-[450px] w-full h-full my-8 mx-auto md:my-4 p-4 rounded-[20px] bg-[white]  shadow-paper">
        <h2 className="mb-8 text-3xl font-bold bg-gradient-to-r from-[#CB527D] to-[#DF9361] bg-clip-text fill-transparent gradient-text">
          Sign Up
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              className="block  font-bold mb-2 text-textGray"
              htmlFor="firstName">
              First name
            </label>
            <input
              className={`appearance-none  w-full py-3 px-3 text-gray-700 border-primary2 border-[2px] leading-tight focus:outline-none focus:shadow-outline rounded-[12px] ${
                errors.firstName ? "border-red-500" : ""
              }`}
              type="text"
              placeholder="First name"
              id="firstName"
              {...register("firstName", { required: true })}
            />
            {errors.firstName && (
              <span className="text-[crimson] text-sm">
                {errors.firstName.message}
              </span>
            )}
          </div>
          <div className="mb-4">
            <label
              className="block  font-bold mb-2 text-textGray"
              htmlFor="lastName">
              Last name
            </label>
            <input
              className={`appearance-none  w-full py-3 px-3 text-gray-700 border-primary2 border-[2px] leading-tight focus:outline-none focus:shadow-outline rounded-[12px] ${
                errors.lastName ? "border-red-500" : ""
              }`}
              type="text"
              placeholder="Last name"
              id="email"
              {...register("lastName", { required: true })}
            />
            {errors.lastName && (
              <span className="text-[crimson] text-sm">
                {errors.lastName.message}
              </span>
            )}
          </div>

          <div className="mb-4">
            <label
              className="block  font-bold mb-2 text-textGray"
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
              className="block  font-bold mb-2 text-textGray"
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
          <div className="mb-6">
            <label
              className="block font-bold mb-2 text-textGray"
              htmlFor="password">
              Confirm password
            </label>
            <input
              className={`appearance-none  w-full py-3 px-3 text-gray-700 border-primary2 border-[2px] leading-tight focus:outline-none focus:shadow-outline rounded-[12px] ${
                errors.confirmPassword ? "border-red-500" : ""
              }`}
              type="password"
              placeholder="Confirm password"
              // name="password"
              id="confirmPassword"
              {...register("confirmPassword", { required: true })}
            />
            {errors.confirmPassword && (
              <span className="text-[crimson] text-sm">
                {errors.confirmPassword.message}
              </span>
            )}
          </div>

          <div className=" w-full flex items-center justify-center mx-auto">
            <SolidPurpleGradientButton type="submit">
              {loading && <span>Hang on</span>}
              {!loading && <span>Sign Up</span>}
            </SolidPurpleGradientButton>
          </div>
          <div
            className="text-center text-[12px] my-4 font-light cursor-pointer"
            onClick={() => router.push("/dashboard/account/login")}>
            <span style={{ color: "#707070" }}> Have an account? </span>
            <span className="font-bold ml-[2px] text-primary1">
              Sign in now
            </span>
          </div>
        </form>
      </div>
    </>
  );
}

function mapState(state: any) {
  const { registering } = state.registration;
  return { registering };
}

const actionCreators = {
  register: userActions.register,
};

const connectedRegisterPage = connect(mapState, actionCreators)(SignUp);
export { connectedRegisterPage as SignUp };
