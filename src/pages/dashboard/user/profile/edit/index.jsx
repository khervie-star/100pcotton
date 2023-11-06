/* eslint-disable react-hooks/exhaustive-deps */

import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import {
  Avatar,
  Button,
  Card,
  CardContent,
  CardMedia,
  FormControl,
  Grid,
  IconButton,
  Input,
  InputAdornment,
  Paper,
  Skeleton,
  Typography,
} from "@mui/material";
import { makeStyles, styled } from "@mui/styles";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import * as React from "react";
import { connect } from "react-redux";
// import { JwtParser } from "../../../../helpers";
import withAuth from "../../../../../helpers/withAuth";
import { userActions } from "../../../../../redux/actions";
import img from "/public/static/Icon feather-edit.svg";
import { ClapSpinner } from "react-spinners-kit";
import authTokenService from "../../../../../services/authToken.service";
import DashboardLayout from "../../../../../Layouts/DashboardLayout";
import {
  OutlinedButton,
  SolidOrangeButton,
} from "../../../../../Components/Buttons";

// import cloudinary from "cloudinary/lib/cloudinary";

const useStyles = makeStyles((theme) => ({
  main: {
    position: "relative",
    overflow: "none",
    borderRadius: "4em 1em 1em 1em",
    boxShadow: theme.palette.boxShadow.main,
    [theme.breakpoints.down("md")]: {
      borderRadius: "2em",
      margin: "1.5em 0",
    },
  },
  mobileHeader: {
    borderRadius: "1.5em",
    boxShadow: theme.palette.boxShadow.main,
    position: "relative",
    overflow: "none",
    height: "250px",
  },
  mobileHeaderContent: {
    padding: "1em 3em",
  },
  userName: {
    color: theme.palette.textColor.main,
    fontWeight: "bold",
    textAlign: "left",
    marginTop: ".5em",
    "& .MuiTypography-caption": {
      color: theme.palette.text.secondary,
      fontSize: ".75em",
    },
  },
  profileActions: {
    textAlign: "left",
    textTransfrom: "none",
    "& button": {
      borderRadius: "3em",
      margin: ".5em",
      fontSize: ".75em",
      width: "90%",
    },
  },
  goToEdit: {
    margin: "1em .5em",
    padding: ".2em 1em",
    borderRadius: "3em",
    fontSize: ".875em",
    fontWeight: "bold",
    textTransform: "none",
    [theme.breakpoints.down("md")]: {
      margin: "2em 0",
    },
  },
  trending: {
    borderRadius: "2em",
    padding: "2em",
    margin: "4em 0",
    boxShadow: theme.palette.boxShadow.main,
  },
  setting: {
    fontWeight: "bold",
    color: theme.palette.buttonBackground.main,
    fontSize: "1em",
  },
  secondaryText: {
    border: "none",
    display: "inline-block",
    padding: ".2em 0",
    fontSize: ".65em",
    color: "grey",
  },
  divider: {
    backgroundColor: theme.palette.dividerYellow.main,
    margin: "1em",
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    margin: "1em 0",
    width: "100%",
    fontSize: 16,
    opacity: 1,
    padding: "0px",
    paddingBottom: "0px",
    color: "grey",
    "&:before": {},
  },
  disabled: {
    color: "black",
    borderBottom: 0,
    "&:before": {
      borderBottom: 0,
    },
  },
  spinner: {
    margin: "1em auto",
    textAlign: "center",
  },
  headerDesc: {
    color: theme.palette.textGray.main,
    fontWeight: "light",
    fontSize: "10px",
  },
}));

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 320,
  height: 350,
  bgcolor: "background.paper",
  border: "2px solid transparent",
  borderRadius: "1em",
  boxShadow: 24,
  p: 2,
};

function EditUserProfile(props) {
  const classes = useStyles();
  const router = useRouter();
  const [values, setValues] = React.useState({
    email: "",
    firstName: "",
    lastName: "",
    profilePicture: null,
    photoPublicId: "",
    editUsernameMode: true,
    editEmailMode: true,
  });
  const [editMode, setEditMode] = React.useState(false);
  // const [userId, setUserId] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [imageLoading, setImageLoading] = React.useState(false);
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [image, _setImage] = React.useState(null);
  const [imageUrl, setImageUrl] = React.useState(null);
  const [file, setFile] = React.useState(null);
  const inputFileRef = React.createRef();
  const baseUrl = `https://api-demo-nft.herokuapp.com/v1`;

  const handleChange = (props) => (event) => {
    setValues({ ...values, [props]: event.target.value });
  };

  const handleUserNameEditMode = () => {
    setValues({
      ...values,
      editUsernameMode: !values.editUsernameMode,
    });
  };

  const handleEmailEditMode = () => {
    setValues({
      ...values,
      editEmailMode: !values.editEmailMode,
    });
  };

  //////////////////////////////////////////////////////////
  const cleanup = () => {
    URL.revokeObjectURL(imageUrl);
    // inputFileRef.current.value = null;
  };

  const setImage = (newImage) => {
    if (image) {
      cleanup();
    }
    _setImage(newImage);
    console.log(newImage);
  };

  const handleOnChange = (event) => {
    const newImage = event.target?.files?.[0];

    if (newImage) {
      // setImageUrl(URL.createObjectURL(newImage));
      setImage(newImage);
      uploadImage(newImage);
    }
    console.log(newImage);
  };

  /**
   *
   * @param {React.MouseEvent<HTMLButtonElement, MouseEvent>} event
   */
  // const handleClick = (event: any) => {
  //   if (image) {
  //     if (props.user?.profilePicture) {
  //       // event.preventDefault();
  //       // deleteImage();
  //       uploadImage();
  //     } else {
  //       uploadImage();
  //     }
  //   }
  // };

  // cloudinary.config({
  //   cloud_name: "z-pro-trading",
  //   api_key: "176444661728973",
  //   api_secret: "fvMy34VOaQ7rW-dcExbl314boEI",
  // });

  // const deleteImage = async (e) => {
  //   e.preventDefault();
  //   cloudinary.v2.uploader
  //     .destroy(props?.user?.photoPublicId, function (error, result) {
  //       console.log(result, error);
  //     })
  //     .then((resp) => console.log(resp))
  //     .catch((_err) =>
  //       console.log("Something went wrong, please try again later.")
  //     );
  // };

  const uploadImage = async (img) => {
    // e.preventDefault();
    const data = new FormData();
    data.append("file", img);
    data.append("upload_preset", "profilepicture");
    data.append("cloud_name", "z-pro-trading");
    data.append("folder", "profilePictures");
    setImageLoading(true);
    try {
      // const resp = await axios.post(
      //   `https://api.cloudinary.com/v1_1/z-pro-trading/image/upload`,
      //   data
      // );
      // // setimageData({ url: resp.data.url, public_id: resp.data.public_id });
      // setValues({
      //   ...values,
      //   profilePicture: resp.data.url,
      //   photoPublicId: resp.data.public_id,
      // });
      // await deleteImage();
      const requestOptions = {
        method: "POST",
        body: data,
      };
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/z-pro-trading/image/upload",
        requestOptions
      );
      const responseData = await response.json();
      console.log(responseData);
      setValues({
        ...values,
        profilePicture: responseData.url,
        photoPublicId: responseData.public_id,
      });
      setImageLoading(false);
    } catch (err) {
      console.log("errr : ", err);
      setImageLoading(false);
    }
  };

  console.log(image);
  ///////////////////////////////////////////////////////////

  // GET USER DETAILS
  //  Get userId
  let userId = authTokenService.getUserId();
  React.useEffect(() => {
    props.getUser(userId);
  }, []);

  console.log(props);

  React.useEffect(() => {
    _setImage(props.user?.profilePicture);
    setImageUrl(props.user?.profilePicture);
    setValues({
      ...values,
      firstName: props.user?.firstName,
      lastName: props.user?.lastName,
      email: props.user?.email,
    });
  }, []);

  const { user } = props;

  // Upload Image
  // const uploadUserAvatar = async () => {
  //   const user = userService.userValue;

  //   if (image) {
  //     let config = {
  //       headers: {
  //         "Access-Control-Allow-Origin": "*",
  //         Authorization: `Bearer ${user.token}`,
  //       },
  //     };
  //     const data = new FormData();
  //     const filename = Date.now() + image.name;
  //     data.append("name", filename);
  //     data.append("file", image);

  //     props.updateProfilePicture(data, userId);
  //   }
  //   // if (image) {
  //   //   const data = new FormData();

  //   //   data.append("file", image);

  //   //   // newPost.postPhoto = filename;
  //   //   try {
  //   //     props.updateUser(data, userId);
  //   //   } catch (err) {
  //   //     consoe.log(err);
  //   //   }
  //   // }
  // };

  // Update User
  const updateUser = () => {
    uploadUserDetails();
  };

  // Upload User Details
  const uploadUserDetails = () => {
    const userDetails = new Object();
    userDetails.firstName = values.firstName;
    userDetails.lastName = values.lastName;
    userDetails.email = values.email;
    userDetails.profilePicture = values.profilePicture;
    userDetails.photoPublicId = values.photoPublicId;

    props.updateUser(userDetails, userId);
  };
  return (
    <DashboardLayout>
      <div>
        {/* <Card className={classes.main}> */}
        <div className="w-full mx-auto h-full md:w-[80%] rounded-[20px] shadow-card md:p-8 p-5 bg-[white] mb-12">
          {/* <CardMedia
            component="img"
            height="200"
            image="/static/field.jpg"
            alt="green iguana"
            sx={{ display: { xs: "none", md: "block" } }}
          /> */}
          <CardContent>
            {/* <div className={classes.userAvatar}>
              {!loading && user && (
                <div className="relative z-10 h-24 w-24 rounded-full overflow-hidden border-2 border-primary2 bg-primary2 focus:outline-none focus:border-white hidden md:block mt-[-60px]">
                  {user?.profilePicture?.length > 0 ? (
                    <img
                      alt={user?.firstName}
                      src={user?.profilePicture}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="text-[28px] font-bold text-[yellow] w-full h-full flex justify-center items-center">
                      {user?.firstName?.slice(0, 1)}
                    </div>
                  )}
                </div>
              )}
            </div> */}
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignContent="center">
              <Grid
                item
                container
                direction="column"
                justifyContent="left"
                //   alignContent="center"
                xs={12}
                className={classes.profileActions}>
                <Grid item xs={12}>
                  {loading && <Skeleton width="70%" animation="wave" />}
                  {!loading && user && (
                    <div className="font-bold text-[22px] md:text-[24px] gradient-text bg-gradient-to-r from-[#A01AEC] via-[#CB527D] to-[#DF9361] bg-clip-text fill-transparent">
                      {/* {user?.firstName + " " + user?.lastName} */}
                      Edit profile details
                    </div>
                  )}

                  {loading && <Skeleton width="70%" animation="wave" />}
                  {!loading && user && (
                    <Typography
                      variant="caption"
                      style={{
                        paddingBottom: "0.7em",
                        color: "#707070",
                      }}>
                      Update your photo and your personal details
                    </Typography>
                  )}
                </Grid>
              </Grid>
              {/* <Grid
              item
              container
              direction="row"
              justifyContent="center"
              alignContent="center"
              xs={4}
              sx={{ display: { xs: "none", md: "block" } }}
            >
              <div className={classes.editProfile}>
                <Button
                  variant="outlined"
                  endIcon={<CancelOutlinedIcon />}
                  className={classes.goToEdit}
                  onClick={() => router.push("/dashboard/user/profile")}
                >
                  Back
                </Button>
              </div>
              <div className={classes.editProfile}>
                <Button
                  variant="contained"
                  style={{
                    margin: "1em 0.5em",
                    padding: ".2em 2em",
                    borderRadius: "3em",
                    fontSize: ".875em",
                    textTransform: "none",
                  }}
                  onClick={updateUser}
                  loading={loading}
                  disabled={loading}
                >
                  {loading && <span>Saving</span>}
                  {!loading && <span>Save</span>}
                </Button>
              </div>
            </Grid> */}
            </Grid>

            <Grid sx={{ my: 3 }}>
              <Grid
                container
                direction="row"
                justifyContent="flex-start"
                alignItems="center">
                <Grid item xs={12} md={3}>
                  <Typography
                    component="div"
                    variant="h6"
                    className={classes.setting}>
                    Firstname :
                  </Typography>
                </Grid>
                <Grid item xs={12} md={7}>
                  <FormControl sx={{ m: 1, width: "100%" }} variant="standard">
                    <Input
                      id="username"
                      name="username"
                      value={values.firstName}
                      margin="none"
                      error={values.firstName === ""}
                      onChange={handleChange("firstName")}
                      disabled={values.editUsernameMode}
                      className={classes.textField}
                      inputProps={{
                        classes: {
                          disabled: classes.disabled,
                        },
                      }}
                      endAdornment={
                        <InputAdornment
                          position="end"
                          onClick={handleUserNameEditMode}
                          style={{ cursor: "pointer" }}>
                          <IconButton edge="end">
                            <Image
                              src={img}
                              alt="Edit"
                              width="20"
                              height="18"
                            />
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                </Grid>
              </Grid>

              <Grid
                container
                direction="row"
                justifyContent="flex-start"
                alignItems="center">
                <Grid item xs={12} md={3}>
                  <Typography
                    component="div"
                    variant="h6"
                    className={classes.setting}>
                    Lastname :
                  </Typography>
                </Grid>
                <Grid item xs={12} md={7}>
                  <FormControl sx={{ m: 1, width: "100%" }} variant="standard">
                    <Input
                      id="username"
                      name="username"
                      value={values.lastName}
                      margin="none"
                      error={values.lastName === ""}
                      onChange={handleChange("lastName")}
                      disabled={values.editUsernameMode}
                      className={classes.textField}
                      inputProps={{
                        classes: {
                          disabled: classes.disabled,
                        },
                      }}
                      endAdornment={
                        <InputAdornment
                          position="end"
                          onClick={handleUserNameEditMode}
                          style={{ cursor: "pointer" }}>
                          <IconButton edge="end">
                            <Image
                              src={img}
                              alt="Edit"
                              width="20"
                              height="18"
                            />
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                </Grid>
              </Grid>

              <Grid
                container
                direction="row"
                justifyContent="flex-start"
                alignItems="center">
                <Grid item xs={12} md={3}>
                  <Typography
                    component="div"
                    variant="h6"
                    className={classes.setting}>
                    Email :
                  </Typography>
                </Grid>
                <Grid item xs={12} md={7}>
                  <FormControl sx={{ m: 1, width: "100%" }} variant="standard">
                    <Input
                      id="email"
                      name="email"
                      value={values.email}
                      margin="none"
                      error={values.email === ""}
                      onChange={handleChange("email")}
                      disabled={values.editEmailMode}
                      className={classes.textField}
                      inputProps={{
                        classes: {
                          disabled: classes.disabled,
                        },
                      }}
                      endAdornment={
                        <InputAdornment
                          position="end"
                          onClick={handleEmailEditMode}
                          style={{ cursor: "pointer" }}>
                          <IconButton edge="end">
                            <Image
                              src={img}
                              alt="Edit"
                              width="20"
                              height="18"
                            />
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>

            <Grid
              container
              direction="row"
              justifyContent="flex-start"
              alignItems="center">
              <Grid item md={3} xs={6} alignItems="flex-start">
                <Typography
                  component="div"
                  variant="h6"
                  className={classes.setting}>
                  Your Photo :
                </Typography>{" "}
                <Typography className={classes.secondaryText} variant="caption">
                  This will be displayed on your profile
                </Typography>
              </Grid>
              <Grid item xs={12} md={7}>
                <Grid
                  container
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center">
                  <div>
                    <Avatar
                      sx={{
                        bgcolor: "#b22222",
                        width: 56,
                        height: 56,
                        border: "2px solid #f1bc31",
                        boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
                      }}
                      imgProps={{
                        style: {
                          maxHeight: "100%",
                          maxWidth: "100%",
                          objectfit: "cover",
                        },
                      }}
                      alt={values.username}
                      src={values?.profilePicture}
                    />
                  </div>
                  <div>
                    <input
                      ref={inputFileRef}
                      accept="image/*"
                      hidden
                      id="avatar-image-upload"
                      type="file"
                      onChange={handleOnChange}
                    />
                    <label htmlFor="avatar-image-upload">
                      {/* <Button
                        variant="text"
                        color="primary"
                        component="span"
                        mb={2}
                        onClick={handleOnChange}
                        sx={{
                          textTransform: "none",
                          fontWeight: "bold",
                          color: "#d84d22",
                        }}>
                        <>
                          <CloudUploadIcon mr={2} />
                          Upload
                        </>
                      </Button> */}
                      <SolidOrangeButton onClick={handleOnChange}>
                        Upload
                      </SolidOrangeButton>
                      {imageLoading && (
                        <div style={{ display: "flex" }}>
                          <ClapSpinner
                            size={8}
                            frontColor="#707070"
                            backColor="#707070"
                            className={classes.spinner}
                          />{" "}
                          <Typography
                            component="div"
                            variant="caption"
                            gutterBottom
                            className={classes.headerDesc}>
                            Please wait...
                          </Typography>
                        </div>
                      )}
                    </label>
                  </div>
                </Grid>
              </Grid>
            </Grid>

            <div className="w-full flex justify-between items-center my-4 mt-16">
              <OutlinedButton onClick={() => router.back()}>
                Back
                <CancelOutlinedIcon />
              </OutlinedButton>

              <SolidOrangeButton onClick={updateUser}>
                {loading && <span>Saving</span>}
                {!loading && <span>Save</span>}
              </SolidOrangeButton>
            </div>
          </CardContent>
        </div>
      </div>
    </DashboardLayout>
  );
}

function mapState(state) {
  const { loading, user } = state.users;
  return { loading, user };
}

const actionCreators = {
  getUser: userActions.getUser,
  updateUser: userActions.updateUser,
  updateProfilePicture: userActions.updateProfilePicture,
};

const connectedEditUserProfile = connect(
  mapState,
  actionCreators
)(EditUserProfile);
export default withAuth(connectedEditUserProfile);
