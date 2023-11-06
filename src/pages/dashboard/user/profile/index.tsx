/* eslint-disable react-hooks/exhaustive-deps */

import { Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import * as React from "react";

import EditIcon from "@mui/icons-material/Edit";
import { makeStyles } from "@mui/styles";
import { useRouter } from "next/router";
import { connect } from "react-redux";
import OriginalCollectonsCard from "../../../../Components/Cards/OriginalCollectionCard";
import OwnersCard from "../../../../Components/Cards/OwnersCard";
import ConnectedReplicaProductCard from "../../../../Components/Cards/ReplicaProductCard";

import withAuth from "../../../../helpers/withAuth";
import useWeb3 from "../../../../hooks/web3js/web3context";
import { userActions } from "../../../../redux/actions";
import _ from "lodash";
import { FiEdit } from "react-icons/fi";
import authTokenService from "../../../../services/authToken.service";
import DashboardLayout from "../../../../Layouts/DashboardLayout";
import { SolidButton, SolidGrayButton } from "../../../../Components/Buttons";
import Image from "next/image";

const useStyles = makeStyles((theme: any) => ({
  main: {
    position: "relative",
    overflow: "none",
    borderRadius: "4em 1em 1em 1em",
    boxShadow: theme.palette.boxShadow.main,
    marginBottom: "3em",
  },
  mobileHeader: {
    position: "relative",
    overflow: "none",
    borderRadius: "1.5em",
    boxShadow: theme.palette.boxShadow.main,
    marginBottom: "3em",
  },
  collections: {
    position: "relative",
    overflow: "none",
    borderRadius: "1.5em",
    boxShadow: theme.palette.boxShadow.main,
    padding: "1em",
  },
  content: {
    padding: "1em 3em",
  },
  userName: {
    maxWidth: "100%",
    color: theme.palette.textColor.main,
    fontWeight: "bold",
    marginTop: ".5em",
    "& .MuiTypography-caption": {
      color: theme.palette.text.secondary,
      fontSize: ".75em",
    },
    [theme.breakpoints.down("md")]: {
      marginBottom: "1em",
    },
  },
  profileActions: {
    display: "flex",
    alignContent: "center",
    justifyContent: "center",
    textAlign: "center",
    textTransfrom: "none",
    "& button": {
      borderRadius: "3em",
      margin: ".5em",
      fontSize: ".75em",
      width: "100%",
    },
    "& a": {
      borderRadius: "3em",
      margin: ".5em",
      fontSize: ".75em",
      width: "90%",
    },
  },
  earnings: {
    bottom: "100px",
    padding: ".875em",
    color: "#fff",
    backgroundColor: "#9E1916",
    border: "2px solid",
    borderColor: "#B56461",
    borderRadius: "1.5em",
    marginLeft: "-2em",
    marginRight: "-2em",

    "& .MuiTypography-h5": {
      fontWeight: "bold",
      color: "#F1BC31",
    },
    [theme.breakpoints.down("md")]: {
      width: "100%",
      marginBottom: "2em",
    },
  },
  earningsTitle: {
    color: theme.palette.dividerYellow.main,
    fontSize: ".75em",
    textAlign: "center",
  },
  balance: {
    fontWeight: "bold",
    color: "#F1BC31",
    fontSize: "1.3em",
  },

  collection: {
    borderRadius: "2em",
    margin: "4em 0",
    // display: "flex",
    // justifyContent: "start",
  },
  originals: {
    borderRadius: "2em",
    padding: "2em",
    margin: "2em 0",
    boxShadow: theme.palette.boxShadow.main,
    display: "flex",
    justifyContent: "start",
    width: "100%",
    height: "100%",
  },
  proposed: {
    borderRadius: "2em",
    padding: "1em 2em",
    margin: "2em 0",
    boxShadow: theme.palette.boxShadow.main,
    width: "100%",
    height: "100%",
  },

  replica: {
    borderRadius: "2em",
    padding: "1em 2em",
    margin: "2em 0",
    boxShadow: theme.palette.boxShadow.main,
    width: "100%",
    height: "100%",
  },

  desc: {
    // borderBottom: "2px solid",
    // borderBottomColor: theme.palette.dividerYellow.main,
    textDecoration: "underline",
    textDecorationColor: theme.palette.dividerYellow.main,
    border: "none",
    display: "inline-block",
    // margin: "0 0 2em 0",
    padding: ".2em 0",
    fontWeight: "bold",
    color: theme.palette.textColor.main,
  },
  collectionsHeaderText: {
    textDecoration: "underline",
    textDecorationColor: theme.palette.dividerYellow.main,
    border: "none",
    display: "inline-block",
    padding: ".2em 0",
    fontWeight: "bold",
    color: theme.palette.textColor.main,
  },
  divider: {
    backgroundColor: theme.palette.dividerYellow.main,
    margin: ".5em",
  },
  emptyMain: {
    color: theme.palette.textColor.main,
    fontWeight: "bold",
  },
  emptySub: {
    color: theme.palette.text.secondary,
    fontSize: ".875em",
    textAlign: "center",
  },
  viewMore: {
    textTransform: "none",
    fontStyle: "italic",
    textDecoration: "underline",
    fontWeight: "light",
    color: theme.palette.textColor.main,
  },
}));

function UserProfile(props: any) {
  const classes = useStyles();
  const router = useRouter();
  // const [loading, setLoading] = React.useState(false);
  // const [userId, setUserId] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState();
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const [viewMore, setViewMore] = React.useState(false);
  const [values, setValues] = React.useState({
    email: "",
    firstName: "",
    lastName: "",
    profilePicture: "",
  });
  const [image, _setImage] = React.useState(null);
  const [userData, setUserData] = React.useState();
  const [userCollection, setUserCollection] = React.useState([]);

  const handleListItemClick = (event: any, index: any) => {
    setSelectedIndex(index);
  };

  const handleToggle = () => {
    setViewMore(!viewMore);
  };

  // GET USER DETAILS
  //  Get userId
  let userId = authTokenService?.getUserId();
  console.log(userId);
  React.useEffect(() => {
    props.getUser(userId);
  }, []);
  const { user, loading } = props;
  console.log(user);

  return (
    <DashboardLayout>
      <div>
        <div className="h-[400px] rounded-[20px] shadow-paper bg-[white] mb-12 hidden md:block">
          <div className="h-[150px]">
            <img
              src="/static/field.jpg"
              alt=""
              className="h-full w-full object-cover rounded-[20px]  bg-[#b22222]"
            />
          </div>
          <div className="h-2/3 px-8 py-4">
            {!loading && user && (
              <div className="relative z-10 h-24 w-24 rounded-full overflow-hidden border-2 border-primary2 bg-primary2 focus:outline-none focus:border-white hidden md:block mt-[-60px]">
                {/* <img
                alt={user?.firstName}
                src={user?.profilePicture}
                className="h-full w-full object-cover bg-[#b22222]"
              /> */}
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

            {loading && (
              <div className="bg-transparent h-24 w-24 rounded-full my-4 animate-pulse flex flex-col gap-3 mt-[-60px]">
                <div className="h-full bg-skeleton rounded-full border-2 border-[yellow] "></div>
              </div>
            )}
            <div className="w-full flex justify-between items-center">
              <div className="my-4">
                {!loading && user && (
                  <>
                    <div className="text-main text-[24px] font-bold my-1">
                      {user?.firstName + " " + user?.lastName}
                    </div>
                    <div className="text-gray text-[13px] font-thin">
                      {user?.email}
                    </div>
                    <div
                      className="text-primary text-[13px] font-bold flex items-center gap-2 mt-4 underline cursor-pointer"
                      onClick={() =>
                        router.push("/dashboard/user/profile/edit")
                      }>
                      <FiEdit />
                      <div>Edit profile</div>
                    </div>
                  </>
                )}
                {loading && !user && (
                  <div className="bg-transparent h-20 w-72 rounded-full my-4 animate-pulse flex flex-col gap-3 ">
                    <div className="h-1/2 bg-skeleton rounded-md"></div>
                    <div className="h-1/3 bg-skeleton rounded-md"></div>
                    <div className="h-1/3 bg-skeleton rounded-md"></div>
                  </div>
                )}
              </div>

              <div className="justify-center align-center w-full md:w-1/3">
                {!loading && user && (
                  <>
                    {/* <div className="flex justify-center items-center gap-4">
                      <SolidButton
                        onClick={() => router.push("/dashboard/user/address")}>
                        Edit Address
                      </SolidButton>
                      <SolidButton
                        onClick={() => router.push("/dashboard/auctions/me")}>
                        My Auctions
                      </SolidButton>
                    </div>
                    <div className="w-full h-[1px] bg-yellow my-4" />
                    <div className="flex justify-center items-center gap-4">
                      <SolidButton
                        onClick={() =>
                          router.push("/dashboard/orders?tab=shirts")
                        }>
                        Track Orders
                      </SolidButton>
                      <SolidButton
                        onClick={() => router.push("/dashboard/settings")}>
                        Settings
                      </SolidButton>
                    </div> */}
                    <Grid
                      item
                      container
                      direction="row"
                      component="div"
                      spacing={2}
                      className={classes.profileActions}>
                      <Grid item xs={6}>
                        <SolidButton
                          onClick={() =>
                            router.push("/dashboard/user/profile/edit")
                          }>
                          Edit Profile
                        </SolidButton>
                      </Grid>
                      <Grid item xs={6}>
                        <SolidButton
                          onClick={() =>
                            router.push("/dashboard/user/address")
                          }>
                          Edit Address
                        </SolidButton>
                      </Grid>
                      <Grid item xs={6}>
                        <SolidButton
                          onClick={() =>
                            router.push("/dashboard/orders?tab=shirts")
                          }>
                          Track Orders
                        </SolidButton>
                      </Grid>
                      <Grid item xs={6}>
                        <SolidButton
                          onClick={() => router.push("/dashboard/auctions/me")}>
                          My Auctions
                        </SolidButton>
                      </Grid>
                    </Grid>
                  </>
                )}
                {loading && (
                  <>
                    <div className="flex justify-center items-center gap-4">
                      <div className="bg-transparent h-8 w-72 rounded-full my-1 animate-pulse flex flex-col gap-3 ">
                        <div className="h-full bg-skeleton rounded-[2em]  "></div>
                      </div>
                      <div className="bg-transparent h-8 w-72 rounded-full my-1 animate-pulse flex flex-col gap-3 ">
                        <div className="h-full bg-skeleton rounded-[2em]  "></div>
                      </div>
                    </div>
                    <div className="w-full h-[1px] bg-yellow my-4" />
                    <div className="flex justify-center items-center gap-4">
                      <div className="bg-transparent h-8 w-72 rounded-full my-1 animate-pulse flex flex-col gap-3 ">
                        <div className="h-full bg-skeleton rounded-[2em]  "></div>
                      </div>
                      <div className="bg-transparent h-8 w-72 rounded-full my-1 animate-pulse flex flex-col gap-3 ">
                        <div className="h-full bg-skeleton rounded-[2em]  "></div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* <Grid
              direction="row"
              justifyContent="center"
              alignContent="center"
              className={classes.collection}>
              <div>
                {!user?.originalTokenForUser?.length &&
                  !user?.proposes?.length &&
                  !user?.replicas?.length && (
                    <Grid item xs>
                      <Grid
                        container
                        direction="row"
                        spacing={2}
                        justifyContent="space-evenly"
                        alignItems="center">
                        <div className="text-[white] text-[16px] md:text[-28px]">
                          Collect or buy a token to add to your collection
                        </div>
                      </Grid>
                    </Grid>
                  )}
              </div>
            </Grid> */}
          </div>
        </div>

        <Grid>
          <div className="md:hidden block relative overflow-hidden rounded-[12px] md:rounded-[20px] bg-white shadow-paper mb-8">
            <div className="h-[75px] w-full relative">
              <Image src="/static/field.jpg" alt="" fill />
            </div>
            <div className="p-4">
              {!loading && user && (
                <div className="relative z-10 h-24 w-24 rounded-full overflow-hidden border-2 border-yellow bg-[#b22222] focus:outline-none focus:border-white  mt-[-60px]">
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

              {loading && (
                <div className="bg-transparent h-24 w-24 rounded-full my-4 animate-pulse flex flex-col gap-3 mt-[-60px]">
                  <div className="h-full bg-skeleton rounded-full border-2 border-yellow "></div>
                </div>
              )}
              <Grid container direction="column">
                {!loading && user && (
                  <>
                    <div className="text-primary2 text-[24px] font-bold my-1">
                      {user?.firstName + " " + user?.lastName}
                    </div>
                    <div className="text-textGray text-[13px] font-thin mb-4">
                      {user?.email}
                    </div>
                    {/* <div
                      className="text-primary text-[13px] font-bold flex items-center gap-2 mt-4 underline cursor-pointer"
                      onClick={() => router.push("/dashboard/user/profile/edit")}
                    >
                      <FiEdit />
                      <div>Edit profile</div>
                    </div> */}
                  </>
                )}
                {loading && !user && (
                  <div className="bg-transparent h-12 w-52 rounded-full mt-2 mb-4 animate-pulse flex flex-col gap-3 ">
                    <div className="h-1/2 bg-skeleton rounded-md"></div>
                    <div className="h-1/3 bg-skeleton rounded-md"></div>
                  </div>
                )}

                {!loading && user && (
                  <Grid
                    item
                    container
                    direction="row"
                    component="div"
                    spacing={2}
                    className={classes.profileActions}>
                    <Grid item xs={6}>
                      <SolidButton
                        onClick={() =>
                          router.push("/dashboard/user/profile/edit")
                        }>
                        Edit Profile
                      </SolidButton>
                    </Grid>
                    <Grid item xs={6}>
                      <SolidButton
                        onClick={() => router.push("/dashboard/user/address")}>
                        Edit Address
                      </SolidButton>
                    </Grid>
                    <Grid item xs={6}>
                      <SolidButton
                        onClick={() =>
                          router.push("/dashboard/orders?tab=shirts")
                        }>
                        Track Orders
                      </SolidButton>
                    </Grid>
                    <Grid item xs={6}>
                      <SolidButton
                        onClick={() => router.push("/dashboard/auctions/me")}>
                        My Auctions
                      </SolidButton>
                    </Grid>
                  </Grid>
                )}

                {loading && (
                  <>
                    <div className="flex justify-center items-center gap-4 grid-cols-2">
                      <div className="bg-transparent h-8 w-1/2 rounded-full my-1 animate-pulse flex flex-col gap-3 ">
                        <div className="h-full w-full  bg-skeleton rounded-[2em]  "></div>
                      </div>
                      <div className="bg-transparent h-8 w-1/2 rounded-full my-1 animate-pulse flex flex-col gap-3 ">
                        <div className="h-full w-full  bg-skeleton rounded-[2em]  "></div>
                      </div>
                    </div>
                    <div className="flex justify-center items-center gap-4">
                      <div className="bg-transparent h-8 w-1/2 rounded-full my-1 animate-pulse flex flex-col gap-3 ">
                        <div className="h-full w-full  bg-skeleton rounded-[2em]  "></div>
                      </div>
                      <div className="bg-transparent h-8 w-1/2 rounded-full my-1 animate-pulse flex flex-col gap-3 ">
                        <div className="h-full w-full  bg-skeleton rounded-[2em]  "></div>
                      </div>
                    </div>
                  </>
                )}
              </Grid>
            </div>
          </div>

          {loading && (
            <div className="bg-[#fafafa] shadow-paper rounded-[1.8em] my-4 p-8">
              <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-4 my-1">
                <div className="bg-transparent h-72 rounded-full my-4 animate-pulse flex flex-col gap-4 ">
                  <div className="h-5/6 bg-skeleton rounded-[1.5em]"></div>
                  <div className="h-1/6 bg-skeleton rounded-[1.5em]"></div>
                </div>
                <div className="bg-transparent h-72 rounded-full my-4 animate-pulse flex flex-col gap-3 ">
                  <div className="h-5/6 bg-skeleton rounded-[1.5em]"></div>
                  <div className="h-1/6 bg-skeleton rounded-[1.5em]"></div>
                </div>
                <div className="bg-transparent h-72 rounded-full my-4 animate-pulse flex flex-col gap-3 ">
                  <div className="h-5/6 bg-skeleton rounded-[1.5em]"></div>
                  <div className="h-1/6 bg-skeleton rounded-[1.5em]"></div>
                </div>
                <div className="bg-transparent h-72 rounded-full my-4 animate-pulse flex flex-col gap-3 ">
                  <div className="h-5/6 bg-skeleton rounded-[1.5em]"></div>
                  <div className="h-1/6 bg-skeleton rounded-[1.5em]"></div>
                </div>
              </div>
            </div>
          )}

          {!loading && user && (
            <Grid container direction="column" component="div">
              <div className="bg-[white] p-4 md:p-6 rounded-[12px] md:rounded-[20px] shadow-paper my-8 h-full">
                <div className="mb-[1.5em] flex justify-between items-center">
                  <div className="text-primary2 font-bold text-[24px]">
                    Collections
                  </div>
                  {user?.originalTokenForUser?.length < 0 &&
                  user?.proposes.length < 0 &&
                  user?.replicas.length < 0 ? (
                    ""
                  ) : (
                    <SolidGrayButton onClick={handleToggle}>
                      {!viewMore ? "View more" : "View less"}
                    </SolidGrayButton>
                  )}
                </div>
                {!viewMore && (
                  <div className="items-start justify-center grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-4 ">
                    {user?.originalTokenForUser?.length > 0 &&
                      user?.originalTokenForUser
                        ?.slice(0, 2)
                        ?.map((value: any, i: any) => (
                          <div className="w-full" key={i}>
                            <OriginalCollectonsCard
                              token={value}
                              auctioned={_.some(value?.auctions, {
                                originalId: value?._id,
                              })}
                            />
                          </div>
                        ))}
                    {user?.proposes?.length > 0 &&
                      user?.proposes?.slice(0, 2)?.map((value: any, i: any) => (
                        <div className="w-full" key={i}>
                          <OwnersCard
                            token={value}
                            auctioned={_.some(value?.auctions, {
                              tokenId: value?._id,
                            })}
                          />
                        </div>
                      ))}
                    {user?.replicas?.length > 0 &&
                      user?.replicas?.slice(0, 2)?.map((value: any, i: any) => (
                        <div className="w-full" key={i}>
                          <ConnectedReplicaProductCard
                            token={value}
                            cannotPropose={_.some(user?.proposes, {
                              nftName: value?.nftName,
                            })}
                          />
                        </div>
                      ))}
                    {user?.originalTokenForUser?.length <= 0 &&
                    user?.proposes.length <= 0 &&
                    user?.replicas.length <= 0 ? (
                      <Grid item xs>
                        <div className="flex items-center justify-evenly gap-2">
                          <Typography
                            component="div"
                            variant="body1"
                            gutterBottom
                            className={classes.emptySub}>
                            Collect or buy a token to add to your collection
                          </Typography>
                        </div>
                      </Grid>
                    ) : (
                      ""
                    )}
                  </div>
                )}
              </div>
              {viewMore && user?.originalTokenForUser?.length > 0 && (
                <div className="bg-[white] p-4 md:p-6 rounded-[12px] md:rounded-[20px] shadow-paper my-8 box-border">
                  <div>
                    <div className="text-primary2 font-bold text-[24px]">
                      Originals
                    </div>
                    <div className="items-start justify-center grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-4 ">
                      {user?.originalTokenForUser?.length > 0 &&
                        user?.originalTokenForUser?.map(
                          (value: any, i: any) => (
                            <OriginalCollectonsCard
                              token={value}
                              auctioned={_.some(value?.auctions, {
                                originalId: value?._id,
                              })}
                              key={i}
                            />
                          )
                        )}
                    </div>
                  </div>
                </div>
              )}
              {viewMore && user?.proposes?.length > 0 && (
                <div className="bg-[white] p-4 md:p-6 rounded-[12px] md:rounded-[20px] shadow-paper my-4">
                  <Grid container component="div" direction="column">
                    <div className="text-primary2 font-bold text-[24px]">
                      Proposed
                    </div>
                    <div className="items-start justify-center grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-4 ">
                      {user?.proposes?.length > 0 &&
                        user?.proposes?.map((value: any, i: any) => (
                          // <OwnersCard
                          //   token={value}
                          //   auctions={user?.auctions}
                          //   key={i}
                          // />
                          <OwnersCard
                            token={value}
                            auctioned={_.some(value?.auctions, {
                              tokenId: value?._id,
                            })}
                            key={i}
                          />
                        ))}
                    </div>
                  </Grid>
                </div>
              )}
              {viewMore && user?.replicas?.length > 0 && (
                <div className="bg-[white] p-4 md:p-6 rounded-[12px] md:rounded-[20px] shadow-paper my-4">
                  <Grid container component="div" direction="column">
                    <div className="text-primary2 font-bold text-[24px]">
                      Replicas
                    </div>
                    <div className="items-start justify-center grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-4 ">
                      {user?.replicas?.length > 0 &&
                        user?.replicas?.map((value: any, i: any) => (
                          <ConnectedReplicaProductCard
                            token={value}
                            cannotPropose={_.some(user?.proposes, {
                              nftName: value?.nftName,
                            })}
                            key={i}
                          />
                        ))}
                    </div>
                  </Grid>
                </div>
              )}
            </Grid>
          )}
        </Grid>
      </div>
    </DashboardLayout>
  );
}

function mapState(state: any) {
  const { loading, user } = state.users;
  return { loading, user };
}

const actionCreators = {
  getUser: userActions.getUser,
};

const connectedUserProfile = connect(mapState, actionCreators)(UserProfile);
export default withAuth(connectedUserProfile);
