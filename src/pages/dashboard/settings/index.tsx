import * as React from "react";

import EditIcon from "@mui/icons-material/Edit";

import Image from "next/image";
import { useRouter } from "next/router";
import { connect } from "react-redux";
import withAuth from "../../../helpers/withAuth";
import { userActions } from "../../../redux/actions";
import img from "/public/static/settings_gear.png";
import { RiEyeCloseFill, RiEyeFill } from "react-icons/ri";
import DashboardLayout from "../../../Layouts/DashboardLayout";
import {
  OutlinedButton,
  SolidPurpleGradientButton,
} from "../../../Components/Buttons";

function Settings(props: any) {
  const router = useRouter();
  const [values, setValues] = React.useState({
    oldPassword: "",
    newPassword: "",
    showOldPassword: true,
    showNewPassword: true,
    editMode: true,
    selectMode: true,
  });

  const handleChange = (prop: any) => (event: { target: { value: any } }) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowOldPassword = () => {
    setValues({
      ...values,
      showOldPassword: !values.showOldPassword,
    });
  };

  const handleClickShowNewPassword = () => {
    setValues({
      ...values,
      showNewPassword: !values.showNewPassword,
    });
  };

  const handleSavePassword = () => {
    const password: any = new Object();
    password.oldPassword = values.oldPassword;
    password.newPassword = values.newPassword;
    props.updatePassword(password);
  };

  const routeToEdit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    router.push("/dashboard/user/profile/edit");
  };

  const { loading } = props;

  return (
    <React.Fragment>
      <DashboardLayout>
        <div className="bg-[#fafafa] shadow-paper relative overflow-hidden h-[7em] md:h-[10em] w-full px-8 md:px-12 py-4 rounded-[20px] mb-[1.5em] md:mb-0 ">
          <div className="flex justify-between items-center">
            <div className="flex flex-col justify-evenly gap-3 w-1/4">
              <div className="font-bold text-[28px] gradient-text bg-gradient-to-r from-[#A01AEC] via-[#CB527D] to-[#DF9361] bg-clip-text fill-transparent">
                Settings
              </div>
              <div className="text-[12px] text-[#707070] w-full font-light hidden md:block">
                Adjust your preferences
              </div>
            </div>
            <div className="w-full flex justify-end items-center">
              <div className="w-[60px] h-[60px] md:w-[75px] md:h-[75px]  lg:w-[100px] lg:h-[100px]">
                <Image
                  src={img}
                  alt="Picture of the author"
                  width={100}
                  height={100}
                  layout="responsive"
                />
              </div>
              <div className="w-[75px] h-[75px] md:w-[100px] md:h-[100px]  lg:w-[125px] lg:h-[125px]">
                <Image
                  src={img}
                  alt="Picture of the author"
                  width={125}
                  height={125}
                  layout="responsive"
                />
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="my-12 rounded-[1em] md:rounded-[2em] p-6 md:p-8 shadow-paper  bg-[#fff]">
            <div className="text-left text-primary2 font-bold text-[20px]  border-b-2 border-yellow border-solid w-fit">
              Change password
            </div>

            <div className="my-4 mt-8">
              <div className="relative mb-4">
                <div className="relative shadow-sm w-full md:w-1/2 border-b border-solid border-gray ">
                  <div
                    className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer z-50 text-primary2"
                    onClick={handleClickShowOldPassword}>
                    {!values.showOldPassword ? (
                      <RiEyeFill fontSize={20} />
                    ) : (
                      <RiEyeCloseFill fontSize={20} />
                    )}
                  </div>
                  <input
                    id="email"
                    value={values.oldPassword}
                    onChange={handleChange("oldPassword")}
                    className="form-input py-3 pr-10 px-2 transition duration-300 ease-in-out sm:text-sm sm:leading-5 w-full focus:outline-none focus:border-primary1 focus:border-b-2  focus:border-solid"
                    placeholder="Old password"
                    type={values.showOldPassword ? "password" : "text"}
                  />
                </div>
              </div>
              <div className="relative mb-4">
                <div className="relative shadow-sm w-full md:w-1/2 border-b border-solid border-gray ">
                  <div
                    className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer z-50 text-primary2"
                    onClick={handleClickShowNewPassword}>
                    {!values.showNewPassword ? (
                      <RiEyeFill fontSize={20} />
                    ) : (
                      <RiEyeCloseFill fontSize={20} />
                    )}
                  </div>
                  <input
                    id="email"
                    value={values.newPassword}
                    onChange={handleChange("newPassword")}
                    className="form-input py-3 pr-10 px-2  transition duration-300 ease-in-out sm:text-sm sm:leading-5 w-full focus:outline-none focus:border-primary1   focus:border-b-2  focus:border-solid"
                    placeholder="New password "
                    type={values.showNewPassword ? "password" : "text"}
                  />
                </div>
              </div>
            </div>

            <div className="w-full flex justify-between items-center mt-8 md:my-12">
              {/* <button
                onClick={routeToEdit}
                className='flex gap-2 items-center justify-start bg-transparent font-semibold text-primary border border-solid border-primary py-1 px-6 my-4 rounded-full text-[14px]"'>
                <EditIcon />
                <span>Edit profile</span>
              </button> */}
              <OutlinedButton onClick={routeToEdit}>
                <EditIcon />
                Edit profile
              </OutlinedButton>

              <SolidPurpleGradientButton onClick={handleSavePassword}>
                {loading && <span>Saving</span>}
                {!loading && <span>Save</span>}
              </SolidPurpleGradientButton>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </React.Fragment>
  );
}

function mapState(state: { users: { loading: any; userPassword: any } }) {
  const { loading, userPassword } = state.users;
  return { loading, userPassword };
}

const actionCreators = {
  updatePassword: userActions.updatePassword,
};

const connectedSettingsPage = connect(mapState, actionCreators)(Settings);
export default withAuth(connectedSettingsPage);
