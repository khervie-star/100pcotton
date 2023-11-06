/* eslint-disable react-hooks/exhaustive-deps */

import { yupResolver } from "@hookform/resolvers/yup";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import {
  Avatar,
  Button,
  Card,
  CardContent,
  CardMedia,
  FormControl,
  Grid,
  InputLabel,
  ListItem,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { makeStyles, styled } from "@mui/styles";
import { useRouter } from "next/router";
import * as React from "react";
import { useForm } from "react-hook-form";
import ReactPhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

import { connect } from "react-redux";
import * as Yup from "yup";
// import { JwtParser } from "../../../helpers";

import withAuth from "../../../../helpers/withAuth";
import { userActions } from "../../../../redux/actions";
import authTokenService from "../../../../services/authToken.service";
import DashboardLayout from "../../../../Layouts/DashboardLayout";
import {
  SolidGrayButton,
  SolidOrangeButton,
} from "../../../../Components/Buttons";

const countryStateData = require("countrycitystatejson");

const useStyles = makeStyles((theme: any) => ({
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
  mobileContent: {
    borderRadius: "1.5em",
    margin: "1.5em 0",
    padding: "1em 1.5em",
    boxShadow: theme.palette.boxShadow.main,
  },
  mobileActions: {
    borderRadius: "2em",
    margin: "2em 0",
    padding: "1em 1.5em",
    boxShadow: theme.palette.boxShadow.main,
  },
  content: {
    padding: "2em 4em",
    [theme.breakpoints.down("md")]: {
      padding: "1em 2em",
    },
  },
  mobileHeaderContent: {
    padding: "1em 3em",
  },
  mainContainer: {
    margin: "3em 0",
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
  addressTitles: {
    color: theme.palette.textGray.main,
    fontSize: "1em",
    fontWeight: "bold",
    textAlign: "left",
    marginBottom: ".75em",
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
    borderColor: theme.palette.primary.main,
    borderRadius: "3em",
    backgroundColor: "transparent",
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
    position: "absolute",
    bottom: "12em",
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
  disabled: {
    color: "black",
    borderBottom: 0,
    "&:before": {
      borderBottom: 0,
    },
  },
  personalDetailsForm: {
    display: "flex",
    alignItems: "flex-end",
  },
  shippingDetails: {
    marginTop: "5em",
    [theme.breakpoints.down("md")]: {
      marginTop: "2em",
    },
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

const CssTextField = styled(TextField)({
  "& .MuiInputBase-input": {
    fontSize: 16,
    padding: "0px",
  },
  "& label.Mui-focused": {
    color: "#E25822",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#E25822",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderRadius: 20,
    },
    "&:hover fieldset": {
      borderColor: "#E25822",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#E25822",
      boxShadow: "0px 10px 25px #70707026",
    },
  },
});

function UserShippingAddress(props: any) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [loading, setLoading] = React.useState(false);
  const [countryData, setCountryData] = React.useState([]);
  const [statesData, setStatesData] = React.useState([]);
  const [citiesData, setCitiesData] = React.useState([]);

  const [country, setCountry] = React.useState("");
  const [state, setState] = React.useState("");
  const [city, setCity] = React.useState("");
  const [street1, setStreet1] = React.useState("");
  const [street2, setStreet2] = React.useState("");

  const [zip, setZip] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [name, setName] = React.useState("");

  const classes = useStyles();
  const router = useRouter();

  // form validation rules
  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    email: Yup.string().required("Email is required").email("Email is invalid"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm Password is required"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  // get functions to build form with useForm() hook
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;

  function onSubmit(address: any) {
    props.saveAddress(address);
  }

  const handleCountryChange = (e: any) => {
    setCountry(e.target.value);
    setStatesData(countryStateData?.getStatesByShort(e.target.value));
  };

  const handleStateChange = (e: any) => {
    setState(e.target.value);
    setCitiesData(countryStateData?.getCities(country, e.target.value));
  };

  const handleCityChange = (e: any) => {
    setCity(e.target.value);
  };

  const handleStreet1Change = (e: any) => {
    setStreet1(e.target.value);
  };

  const handleStreet2Change = (e: any) => {
    setStreet2(e.target.value);
  };

  const handlePhoneChange = (value: any) => {
    setPhone(value);
  };

  const handleNameChange = (e: any) => {
    setName(e.target.value);
  };

  const handleZipChange = (e: any) => {
    setZip(e.target.value);
  };

  React.useEffect(() => {
    setCountryData(countryStateData?.getCountries());
    setStatesData(
      countryStateData?.getStatesByShort(props?.user?.shippingAddress?.country)
    );
    setCitiesData(
      countryStateData?.getCities(
        props?.user?.shippingAddress?.country,
        props?.user?.shippingAddress?.state
      )
    );

    if (country.length !== 0) {
      setStatesData(countryStateData?.getStatesByShort(country));
    }
  }, []);

  const handleUpdateAddress = () => {
    const addressDetails: any = new Object();
    addressDetails.name = name;
    addressDetails.street1 = street1;
    addressDetails.street2 = street2;
    addressDetails.city = city;
    addressDetails.state = state;
    addressDetails.zip = zip;
    addressDetails.country = country;
    addressDetails.phone = phone;

    const addressObject: any = new Object();
    addressObject.shippingAddress = addressDetails;

    props.updateShippingAddress(addressObject);
  };
  const { updating, user } = props;

  // GET USER DETAILS
  //  Get userId
  let userId = authTokenService.getUserId();
  React.useEffect(() => {
    props.getUser(userId);
  }, []);

  React.useEffect(() => {
    setName(props?.user?.firstName + " " + props?.user?.lastName);
    setCountry(props?.user?.shippingAddress?.country);
    setState(props?.user?.shippingAddress?.state);
    setCity(props?.user?.shippingAddress?.city);
    setZip(props?.user?.shippingAddress?.zip);
    setPhone(props?.user?.shippingAddress?.phone);
    setStreet1(props?.user?.shippingAddress?.street1);
    setStreet2(props?.user?.shippingAddress?.street2);
  }, [props?.user]);

  console.log(country);

  return (
    <DashboardLayout>
      <div>
        {/* Mobile View */}
        <Grid sx={{ display: { xs: "block", md: "none" } }}>
          <div className="h-[250px] rounded-[16px] md:rounded-[20px] shadow-paper bg-[white] mb-12 block md:hidden p-6">
            <CardMedia
              component="img"
              height="100"
              image="/static/field.jpg"
              alt="green iguana"
            />
            <div>
              <Avatar
                sx={{
                  bgcolor: "#b22222",
                  width: 75,
                  height: 75,
                  marginTop: "-55px",
                  border: "2px solid #f1bc31",
                }}
                style={{ backgroundColor: "#b22222" }}
                alt={user?.firstName}
                src={user?.profilePicture}
              />
            </div>
            <Typography variant="h5" className={classes.userName}>
              Edit Address
            </Typography>
            <Typography
              variant="caption"
              style={{
                paddingBottom: "0.7em",
                color: "#707070",
              }}>
              Update your shipping address details
            </Typography>
          </div>
        </Grid>

        <div className="p-8 rounded-[16px] md:rounded-[20px] shadow-paper bg-[white] mb-[16px] hidden md:block">
          <CardMedia
            component="img"
            height="200"
            image="/static/field.jpg"
            alt="green iguana"
            sx={{ display: { xs: "none", md: "block" } }}
          />
          <CardContent
            className={classes.content}
            sx={{ display: { xs: "none", md: "block" } }}>
            {/* <div className={classes.userAvatar}>
            <Avatar
              sx={{
                bgcolor: "#b22222",
                width: 100,
                height: 100,
                marginTop: "-80px",
                border: "2px solid #f1bc31",
                display: { xs: "none", md: "block" },
              }}
              style={{ backgroundColor: "#b22222" }}
              alt={user?.firstName}
              src={user?.profilePicture}
            />
          </div> */}
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignContent="center"
              sx={{ display: { xs: "none", md: "block" } }}>
              <Grid
                item
                container
                direction="column"
                justifyContent="left"
                //   alignContent="center"
                xs={12}
                className={classes.profileActions}
                sx={{ display: { xs: "none", md: "block" } }}>
                <Grid item xs={12}>
                  <Typography variant="h5" className={classes.userName}>
                    Edit Address
                  </Typography>
                  <Typography
                    variant="caption"
                    style={{
                      borderBottom: "1px solid #f1bc31",
                      paddingBottom: "0.7em",
                      color: "#707070",
                    }}>
                    Update your shipping address details
                  </Typography>
                </Grid>
              </Grid>
            </Grid>

            <Grid
              container
              className={classes.mainContainer}
              sx={{ display: { xs: "none", md: "block" } }}>
              <Grid container style={{ marginBottom: "1.5em" }}>
                <Typography
                  variant="h5"
                  className={classes.addressTitles}
                  component="div"
                  gutterBottom>
                  Personal Information
                </Typography>
                <Grid
                  item
                  container
                  direction="row"
                  spacing={2}
                  className={classes.personalDetailsForm}>
                  {/* <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      id="name"
                      label="Name"
                      defaultValue=""
                      value={name}
                      onChange={handleNameChange}
                      variant="standard"
                      helperText=""
                      required
                    />
                  </Grid> */}
                  {/* <Grid item xs={12} md={6}>
                  <ReactPhoneInput
                    country={"us"}
                    value={phone}
                    onChange={handlePhoneChange}
                    preferredCountries={["us"]}
                    enableAreaCodes={true}
                    regions={["north-america"]}
                    inputProps={{
                      name: "phone",
                      required: "true",
                    }}
                  />
                </Grid> */}
                </Grid>
              </Grid>
              <Grid container className={classes.shippingDetails}>
                <Typography
                  variant="h5"
                  className={classes.addressTitles}
                  component="div"
                  gutterBottom>
                  Address
                </Typography>
                <Grid item container direction="row" spacing={2}>
                  <Grid item xs={12} md={12}>
                    <TextField
                      fullWidth
                      id="streetAddress"
                      label="Street address"
                      defaultValue=""
                      value={street1}
                      onChange={handleStreet1Change}
                      variant="standard"
                      helperText=""
                      required
                    />
                  </Grid>
                  <Grid item xs={12} md={12}>
                    <TextField
                      fullWidth
                      id="streetAddress"
                      label="Apartment Number"
                      defaultValue=""
                      value={street2}
                      onChange={handleStreet2Change}
                      variant="standard"
                      helperText=""
                      required
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormControl
                      variant="standard"
                      sx={{ m: 0, minWidth: "100%" }}>
                      <InputLabel id="country-label">Country</InputLabel>
                      <Select
                        labelId="country-label"
                        id="country-select"
                        value={country}
                        label="Country"
                        onChange={handleCountryChange}
                        defaultValue={country}>
                        {countryData.map((country: any, i) => (
                          <MenuItem value={country.shortName} key={i}>
                            <ListItem disablePadding sx={{ margin: 0 }}>
                              <ListItemIcon>{country?.emoji}</ListItemIcon>
                              <ListItemText primary={country?.name} />
                            </ListItem>
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormControl
                      variant="standard"
                      sx={{ m: 0, minWidth: "100%" }}
                      style={{}}>
                      <InputLabel id="state-label">State Province</InputLabel>
                      <Select
                        labelId="state-label"
                        id="state-select"
                        value={state}
                        label="State"
                        onChange={handleStateChange}>
                        {statesData?.map((val, i) => (
                          <MenuItem value={val} key={i}>
                            {val}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  {/* <Grid item xs={12} md={6}>
                  <TextField
                    id="state"
                    label="State"
                    defaultValue=""
                    value={city}
                    onChange={handleStateChange}
                    variant="standard"
                    helperText=""
                    required
                  />
                </Grid> */}
                  <Grid item xs={12} md={6}>
                    <FormControl
                      variant="standard"
                      sx={{ m: 0, minWidth: "100%" }}
                      style={{}}>
                      <InputLabel id="city-label">City</InputLabel>
                      <Select
                        labelId="city-label"
                        id="city-select"
                        value={city}
                        label="City"
                        onChange={handleCityChange}>
                        {citiesData?.map((value, i) => (
                          <MenuItem value={value} key={i}>
                            {value}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  {/* <Grid item xs={12} md={6}>
                  <TextField
                    id="city"
                    label="City"
                    defaultValue=""
                    value={city}
                    onChange={handleCityChange}
                    variant="standard"
                    helperText=""
                    required
                  />
                </Grid> */}
                  <Grid item xs={12} md={6}>
                    <TextField
                      id="zip"
                      label="Zip"
                      defaultValue=""
                      value={zip}
                      onChange={handleZipChange}
                      variant="standard"
                      helperText=""
                      required
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Grid
              item
              container
              direction="row"
              justifyContent="space-between"
              alignContent="center"
              xs={12}
              sx={{ display: { xs: "none", md: "flex" } }}>
              <div>
                <Button
                  variant="outlined"
                  endIcon={<CancelOutlinedIcon />}
                  className={classes.goToEdit}
                  onClick={() => router.push("/dashboard/user/profile")}>
                  Back
                </Button>
              </div>
              <div>
                <Button
                  variant="contained"
                  className={classes.goToEdit}
                  style={{
                    margin: "1em 0.5em",
                    padding: ".2em 2em",
                    borderRadius: "3em",
                    fontSize: ".875em",
                    textTransform: "none",
                  }}
                  onClick={handleUpdateAddress}
                  disabled={!country || !state || !city || !zip}>
                  {updating && <span>Hang on</span>}
                  {!updating && <span>Save address</span>}
                </Button>
              </div>
            </Grid>
          </CardContent>
        </div>
        {/* <div className="p-6 rounded-[16px] md:rounded-[20px] shadow-paper bg-[white] mb-[16px] block md:hidden">
          <Grid container style={{ marginBottom: "1.5em" }}>
            <Typography
              variant="h5"
              className={classes.addressTitles}
              component="div"
              gutterBottom>
              Personal Information
            </Typography>
            <Grid
              item
              container
              direction="row"
              spacing={2}
              className={classes.personalDetailsForm}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  id="name"
                  label="Name"
                  defaultValue=""
                  value={name}
                  onChange={handleNameChange}
                  variant="standard"
                  helperText=""
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
              <ReactPhoneInput
                country={"us"}
                value={phone}
                onChange={handlePhoneChange}
                preferredCountries={["us"]}
                enableAreaCodes={true}
                regions={["north-america"]}
                inputProps={{
                  name: "phone",
                  required: "true",
                }}
              />
            </Grid>
            </Grid>
          </Grid>
        </div> */}
        <div className="p-6 rounded-[16px] md:rounded-[20px] shadow-paper bg-[white] mb-[16px] block md:hidden mt-8">
          <Grid container className={classes.shippingDetails}>
            <Typography
              variant="h5"
              className={classes.addressTitles}
              component="div"
              gutterBottom>
              Address
            </Typography>
            <Grid item container direction="row" spacing={2}>
              <Grid item xs={12} md={12}>
                <TextField
                  fullWidth
                  id="streetAddress"
                  label="Street address"
                  defaultValue=""
                  value={street1}
                  onChange={handleStreet1Change}
                  variant="standard"
                  helperText=""
                  required
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <TextField
                  fullWidth
                  id="streetAddress"
                  label="Apartment Number"
                  defaultValue=""
                  value={street2}
                  onChange={handleStreet2Change}
                  variant="standard"
                  helperText=""
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl
                  variant="standard"
                  sx={{ m: 1, minWidth: "100%" }}
                  style={{
                    margin: "8px 0",
                  }}
                  // className="addressSelect"
                >
                  <InputLabel id="country-label">Country</InputLabel>
                  <Select
                    labelId="country-label"
                    id="country-select"
                    value={country}
                    label="Country"
                    onChange={handleCountryChange}
                    defaultValue={country}>
                    {countryData.map((country: any, i) => (
                      <MenuItem value={country.shortName} key={i}>
                        <ListItem disablePadding sx={{ margin: 0 }}>
                          <ListItemIcon>{country?.emoji}</ListItemIcon>
                          <ListItemText primary={country?.name} />
                        </ListItem>
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl
                  variant="standard"
                  sx={{ m: 1, minWidth: "100%" }}
                  style={{
                    margin: "8px 0",
                  }}>
                  <InputLabel id="state-label">State Province</InputLabel>
                  <Select
                    labelId="state-label"
                    id="state-select"
                    value={state}
                    label="State"
                    onChange={handleStateChange}>
                    {statesData?.map((val, i) => (
                      <MenuItem value={val} key={i}>
                        {val}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl
                  variant="standard"
                  sx={{ m: 1, minWidth: "100%" }}
                  style={{
                    margin: "8px 0",
                  }}>
                  <InputLabel id="city-label">City</InputLabel>
                  <Select
                    labelId="city-label"
                    id="city-select"
                    value={city}
                    label="City"
                    onChange={handleCityChange}>
                    {citiesData?.map((value, i) => (
                      <MenuItem value={value} key={i}>
                        {value}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  id="zip"
                  label="Zip"
                  defaultValue=""
                  value={zip}
                  onChange={handleZipChange}
                  variant="standard"
                  helperText=""
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <ReactPhoneInput
                  country={"us"}
                  value={phone}
                  onChange={handlePhoneChange}
                  // preferredCountries={["us"]}
                  enableAreaCodes={true}
                  // regions={["north-america"]}
                  inputProps={{
                    name: "phone",
                    required: "true",
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
        </div>
        <div className="p-6 rounded-[16px] md:rounded-[20px] shadow-paper bg-[white] mb-[16px] block md:hidden">
          <Grid
            container
            display="flex"
            direction="row"
            justifyContent="space-between"
            alignItems="center">
            <SolidGrayButton
              endIcon={<CancelOutlinedIcon />}
              className={classes.goToEdit}
              onClick={() => router.push("/dashboard/user/profile")}>
              Back
            </SolidGrayButton>
            <SolidOrangeButton
              style={{
                margin: "1em 0.5em",
                padding: ".2em 2em",
                borderRadius: "3em",
                fontSize: ".875em",
                textTransform: "none",
              }}
              onClick={handleUpdateAddress}
              disabled={!country || !state || !city || !zip}>
              {updating && <span>Hang on</span>}
              {!updating && <span>Save address</span>}
            </SolidOrangeButton>
          </Grid>
        </div>
      </div>
    </DashboardLayout>
  );
}

function mapState(state: any) {
  const { loading, user, updating } = state.users;
  return { loading, user, updating };
}

const actionCreators = {
  getUser: userActions.getUser,
  updateShippingAddress: userActions.updateShippingAddress,
};

const connectedUserShippingAddress = connect(
  mapState,
  actionCreators
)(UserShippingAddress);
export default withAuth(connectedUserShippingAddress);
