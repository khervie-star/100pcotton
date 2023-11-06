/* eslint-disable react-hooks/exhaustive-deps */

import {
  Backdrop,
  Box,
  Grid,
  InputBase,
  Modal,
  Paper,
  Typography,
} from "@mui/material";
import * as React from "react";

import SearchIcon from "@mui/icons-material/Search";

import { yupResolver } from "@hookform/resolvers/yup";
import { makeStyles } from "@mui/styles";
import Image from "next/image";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";

import * as Yup from "yup";

import ProductCard from "../../../Components/Cards/ProductCard";
import { tokenActions } from "../../../redux/actions";

import navigator from "../../../../public/static/navigator.png";
import zoom from "../../../../public/static/zoom.png";

import { TiSortAlphabeticallyOutline } from "react-icons/ti";
import DashboardLayout from "../../../Layouts/DashboardLayout";

const useStyles = makeStyles(
  (theme: {
    palette: {
      boxShadow: { main: any };
      textColor: { main: any };
      textGray: { main: any };
      borderColor: { main: any };
      buttonBackground: { light: any; main: any };
      primary: { main: any };
      dividerYellow: { main: any };
    };
    breakpoints: { down: (arg0: string) => any };
  }) => ({
    header: {
      position: "relative",
      overflow: "none",
      height: "10em",
      width: "100%",
      padding: "1em 3em",
      borderRadius: "20px",
      boxShadow: theme.palette.boxShadow.main,
      [theme.breakpoints.down("md")]: {
        borderRadius: "15px",
        marginBottom: "1.5em",
        padding: "1em 2em",
        height: "7em",
      },
    },
    headerDesc: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-evenly",
      width: "60%",
      // color: "red",
      "& .MuiTypography-h5": {
        color: theme.palette.textColor.main,
        fontWeight: "bold",
      },
      "& .MuiTypography-caption": {
        color: theme.palette.textGray.main,
        fontSize: ".75em",
      },
    },
    headerImg: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-end",
      alignItems: "center",
      width: "40%",
    },
    image1: {
      width: "100px",
      height: "100px",
      [theme.breakpoints.down("md")]: {
        width: "75px",
        height: "75px",
      },
      [theme.breakpoints.down("sm")]: {
        width: "60px",
        height: "60px",
      },
    },
    image2: {
      width: "125px",
      height: "125px",
      [theme.breakpoints.down("md")]: {
        width: "100px",
        height: "100px",
      },
      [theme.breakpoints.down("sm")]: {
        width: "75px",
        height: "75px",
      },
    },
    searchBar: {
      position: "relative",
      overflow: "none",
      height: "5em",
      padding: "1em 3em",
      borderRadius: "20px",
      boxShadow: theme.palette.boxShadow.main,
      width: 600,
      [theme.breakpoints.down("md")]: {
        width: "100%",
        padding: "1em 1.5em",
      },
    },

    headerDescMobile: {
      position: "relative",
      overflow: "none",
      // height: "100%",
      padding: "1em 3em",
      borderRadius: "2em",
      boxShadow: theme.palette.boxShadow.main,
      width: "100%",
      [theme.breakpoints.down("md")]: {
        width: "100%",
        padding: "1em 1.5em",
      },
    },
    inputBasePaper: {
      p: "1px 5px",
      margin: ".75em 0",
      height: "40px",
      width: "100%",
      display: "flex",
      // alignItems: "center",
      border: "1px solid",
      borderRadius: "3em",
      borderColor: theme.palette.borderColor.main,
      "& input": {
        fontFamily: "poppins",
        fontSize: ".875em",
        color: theme.palette.textGray.main,
      },
      "& input::placeholder": {
        fontFamily: "poppins",
        fontSize: ".85em",
        fontWeight: "light",
        fontStyle: "italic",
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
    search: {
      background: "linear-gradient(180deg, #E25822, #B22222)",
      color: "#fff",
      boxShadow: theme.palette.boxShadow.main,
      border: "none",
      margin: "0 2px",
      width: "1.5em",
      height: "1.5em",
      fontSize: "1.6em",
      "&:hover": {
        backgroundColor: theme.palette.buttonBackground.light,
      },
    },
    filter: {
      backgroundColor: "transparent",
      color: "#F1BC31",
      boxShadow: theme.palette.boxShadow.main,
      border: "1px solid",
      borderColor: "#E25822",
      margin: "0 .5em",
      width: "1.5em",
      height: "1.5em",
      fontSize: "1.5em",
      "&:hover": {
        backgroundColor: theme.palette.buttonBackground.light,
        color: "#fff",
      },
    },
    renderABCFilterIcon: {
      backgroundColor: "transparent",
      color: theme.palette.primary.main,
      border: "1px solid",
      width: "1.5em",
      height: "1.5em",
      fontSize: "1.5em",
      margin: "0 .5em",
      "&:hover": {
        backgroundColor: theme.palette.primary.main,
        color: "#fff",
      },
    },
    searchFavorites: {
      border: "1px solid",
      borderColor: theme.palette.primary.main,
      borderRadius: "3em",
      padding: ".3em 1em",
      width: "100%",
    },
    searchRow: {
      display: "flex",
      // justifyContent: "flex-end",
      justifyContent: "flex-start",
      p: 1,
      m: 1,
      bgcolor: "background.paper",
      borderRadius: 1,
    },

    alphabetFilter: {
      overflow: "none",
      borderRadius: "2em",
      padding: "2em",
      margin: "2em 0",
      boxShadow: theme.palette.boxShadow.main,
    },
    trending: {
      overflow: "none",
      borderRadius: "2em",
      padding: "2em",
      // margin: "2em 0",
      boxShadow: theme.palette.boxShadow.main,
    },
    alphabetFilterLink: {
      color: theme.palette.primary.main,
      fontWeight: "bold",
      fontSize: "1.5em",
      width: "100px",
      textAlign: "center",
      margin: ".5em 0",
      cursor: "pointer",
      // border: `solid ${theme.palette.dividerYellow.main} 1px`,
      textDecoration: `underline solid ${theme.palette.dividerYellow.main} 2px`,
    },
    searchActivity: {
      overflow: "none",
      borderRadius: "2em",
      padding: "2em",
      margin: "1em 0",
      boxShadow: theme.palette.boxShadow.main,
    },
    desc: {
      borderBottom: "1px solid",
      borderBottomColor: theme.palette.dividerYellow.main,
      border: "none",
      display: "inline-block",
      margin: "0 0 .5em 0",
      padding: ".2em 0",
      fontWeight: "bold",
      color: theme.palette.textColor.main,
    },
    descSubText: {
      display: "inline-block",
      margin: "0 0 2em 0",
      padding: ".2em 0",
      fontWeight: "light",
      fontStyle: "italic",
      color: theme.palette.textGray.main,
    },
    notFound: {
      border: "none",
      padding: ".2em 0",
      fontWeight: "bold",
      color: theme.palette.buttonBackground.main,
    },
    notFoundText: {
      border: "none",
      margin: "0 0 2em 0",
      padding: ".2em 0",
      color: "grey",
      fontSize: "smaller",
    },
    availableProducts: {
      position: "relative",
      padding: "1em",
      display: "flex",
      justifyContent: "space-between",
    },
    style: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      // width: 400,
      bgcolor: "transparent",
      [theme.breakpoints.down("md")]: {
        width: "100%",
        margin: "0 1em",
      },
    },
  })
);

const alphabets = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

function Search(props: any) {
  // const [loading, setLoading] = React.useState(false)
  // const [searching, setSearching] = React.useState(false)
  // const [searchResult, setSearchResult] = React.useState([])
  const [alphabet, setAlphabet] = React.useState("");
  const [isClicked, setClicked] = React.useState(false);
  const [allTokens, setAllTokens] = React.useState("");
  // const [trendingTokens, setTrendingTokens] = React.useState([])
  const [slideIndex, setSlideIndex] = React.useState("0");

  const [open, setOpen] = React.useState(false);
  const [alphabetComponent, setAlphabetComponent] = React.useState(false);

  const classes = useStyles();
  const router = useRouter();
  const sliderRef = React.useRef();

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 2,
    className: "center",
    centerMode: true,
    centerPadding: "60px",
    adaptiveHeight: true,
    arrows: true,
    beforeChange: (current: any, next: React.SetStateAction<string>) =>
      setSlideIndex(next),
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 0,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const renderABCFilterIcon = () => {
    setAlphabetComponent(!alphabetComponent);
  };

  const checkIfStringStartsWith = (str: string, substrs: any[]) => {
    return substrs.some((substr: string) =>
      str.startsWith(substr.toLowerCase())
    );
  };

  // form validation rules
  const validationSchema = Yup.object().shape({
    searchTerm: Yup.string().required("Search item is required"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  // get functions to build form with useForm() hook
  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors } = formState;

  function onSubmit({ searchTerm }: any) {
    props.searchToken({ searchTerm });
  }

  const getByAlphaBet = (alphabet: string) => {
    setAlphabet(alphabet);
    props.getByAlphabet(alphabet);
    setAlphabetComponent(!alphabetComponent);
  };

  React.useEffect(() => {
    props.getTrending();
    props.getAll();
  }, []);

  const {
    searching,
    noSearch,
    searchResult,
    trendingTokens,
    tokenByAlphabet,
    loading,
    getError,
    proposedTokens,
  } = props;

  return (
    <React.Fragment>
      <DashboardLayout>
        <Grid container direction="row">
          <Grid item xs={12}>
            {/* <div className="relative overflow-hidden h-[7em] md:h-fit   mb-[1.5em] md:mb-0 ">
              <div className="flex justify-between items-center gap-6"> */}
            {/* <div className="w-1/2 flex flex-col justify-start gap-3 bg-[#fafafa] shadow-paper w-full px-8 md:px-6 py-4 rounded-[20px]  ">
                  <div className="gradient-text font-bold text-[26px] bg-gradient-to-r from-[#A01AEC] via-[#CB527D] to-[#DF9361] bg-clip-text fill-transparent">
                    Explore Shirts
                  </div>
                  <div className="text-[12px] text-[#707070]  font-light hidden md:block">
                    Search for specific words or phrases proposed by previous
                    customers that you would like to have on your shirt by
                    typing in the search bar or choosing the alphabet
                  </div>
                </div> */}

            {/* <div className="youtube w-1/2 hidden md:block bg-[#fafafa] shadow-paper w-full px-8 md:px-6 py-4 rounded-[20px]  ">
                  <div className="w-full h-auto mt-3">
                    <iframe
                      src="https://youtube.com/embed/GpdIpSKLWg0"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-auto rounded-md"></iframe>
                  </div>
                </div> */}

            {/* <div className="w-1/3 flex justify-center items-center">
                  <div className="w-[60px] h-[60px] md:w-[150px] md:h-[150px]  lg:w-[100px] lg:h-[100px]">
                    <Image
                      src={zoom}
                      alt="Picture of the author"
                      width={150}
                      height={150}
                      layout="responsive"
                    />
                  </div>
                  <div className="w-[75px] h-[75px] md:w-[150px] md:h-[150px] lg:w-[125px] lg:h-[125px]">
                    <Image
                      src={navigator}
                      alt="Picture of the author"
                      width={150}
                      height={150}
                      layout="responsive"
                    />
                  </div>
                </div> */}

            {/* <div className="youtube w-1/3">
                  <div className="w-full h-auto mt-3">
                    <iframe
                      src="https://youtube.com/embed/GpdIpSKLWg0"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-auto rounded-md"></iframe>
                  </div>
                </div> */}
            {/* </div>
            </div> */}

            <div className="w-full flex flex-col justify-center md:flex-row gap-4 h-fit md:h-[300px] mb-8 ">
              <div className="md:w-6/12 w-full h-fit md:h-full">
                <div className="bg-[white] h-fit md:h-full p-4 md:p-6 shadow-paper rounded-[12px] md:rounded-[20px]">
                  <div className="gradient-text font-bold text-[26px] bg-gradient-to-r from-[#A01AEC] via-[#CB527D] to-[#DF9361] bg-clip-text fill-transparent">
                    Explore Shirts
                  </div>
                  <div className="text-[12px] text-[#707070]  font-light hidden md:block">
                    Search for specific words or phrases proposed by previous
                    customers that you would like to have on your shirt by
                    typing in the search bar or choosing the alphabet
                    <br />
                    <br />
                    Once minted, this NFTee will allow you to propose a word to
                    complete our model phrase. It will show up here for other
                    customers to buy. Even if you do not wish to propose a word
                    with it, you can save up your NFTees for future earnings and
                    rewards. Join our discord to stay up to date on our
                    announcements.
                  </div>
                </div>
              </div>
              <div className="md:w-6/12 w-full md:sh-full">
                <div className="bg-[white] h-fit md:h-full p-4 md:p-6 shadow-paper rounded-[12px] md:rounded-[20px]">
                  <div className="mb-4 text-center">
                    <div className="gradient-text font-bold text-[26px] bg-gradient-to-r from-[#A01AEC] via-[#CB527D] to-[#DF9361] bg-clip-text fill-transparent">
                      Tutorial video
                    </div>
                    <div className="text-[12px] text-[#707070]  font-light hidden md:block">
                      Watch this quick video to learn how to buy shirts.
                    </div>
                  </div>
                  <div className="w-full h-auto mt-3">
                    <iframe
                      src="https://youtube.com/embed/uEvbEkTgvrM"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full rounded-md"></iframe>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white shadow-paper rounded-[12px] md:rounded-[20px] p-4 md:p-8 block md:hidden text-[14px] text-textGray">
              Search for specific words or phrases proposed by previous
              customers that you would like to have on your shirt by typing in
              the search bar or choosing the alphabet
            </div>

            {/* <div className="bg-white shadow-paper rounded-[12px] md:rounded-[20px] p-4 md:p-8 block md:hidden text-[14px] text-textGray mt-3">
              <div className="youtube">
                <div className="w-full h-auto mt-3">
                  <iframe
                    src="https://youtube.com/embed/GpdIpSKLWg0"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-auto rounded-md"></iframe>
                </div>
              </div>
            </div> */}

            <div className="w-full md:w-[600px] py-[2px] px-[4px] bg-white shadow-paper rounded-[12px] md:rounded-[20px] flex items-center mt-6">
              <InputBase
                fullWidth
                id="searchTerm"
                color="primary"
                type="text"
                sx={{ ml: 1, flex: 1, px: 2 }}
                className={classes.inputBasePaper}
                placeholder="E.g words and phrases "
                inputProps={{ "aria-label": "search" }}
                {...register("searchTerm")}
                error={errors.searchTerm ? true : false}
                required
              />

              {/* <Typography
              variant="inherit"
              color="textSecondary"
              className={classes.validationError}>
              {errors.searchTerm?.message}
            </Typography> */}

              <div
                className="bg-gradient-to-br from-primary2  to-primary1 rounded-full w-10 h-10 flex justify-center items-center text-[white] shadow-md mx-2 cursor-pointer"
                onClick={handleSubmit(onSubmit)}>
                <SearchIcon fontSize="medium" />
              </div>

              <div
                className="bg-gradient-to-br from-primary2  to-primary1 rounded-full w-10 h-10 flex justify-center items-center text-[white] shadow-md mx-2 cursor-pointer"
                onClick={renderABCFilterIcon}>
                <TiSortAlphabeticallyOutline size={24} />
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-6 my-4">
              <div className="w-full ">
                {
                  // noSearch &&
                  searching && (
                    <Paper elevation={4} className={classes.searchActivity}>
                      <Grid container component="div" direction="column">
                        <Grid item xs>
                          <Typography
                            variant="h6"
                            component="div"
                            gutterBottom
                            className={classes.desc}>
                            Searching
                          </Typography>
                        </Grid>
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
                      </Grid>
                    </Paper>
                  )
                }

                {!noSearch && !searching && !searchResult?.length && (
                  <Paper elevation={4} className={classes.searchActivity}>
                    <Grid item xs>
                      <Typography
                        variant="h6"
                        component="div"
                        gutterBottom
                        className={classes.notFound}>
                        Oops, Item not found.
                      </Typography>
                      <Typography
                        variant="body1"
                        component="div"
                        gutterBottom
                        className={classes.notFoundText}>
                        Please search another phrase
                      </Typography>
                    </Grid>
                  </Paper>
                )}
                {!noSearch && !searching && searchResult?.length > 0 && (
                  <Paper elevation={4} className={classes.searchActivity}>
                    <Grid container component="div" direction="column">
                      <Grid item xs>
                        <Typography
                          variant="h6"
                          component="div"
                          gutterBottom
                          className={classes.desc}>
                          Search Result(s)
                        </Typography>
                      </Grid>
                      {/* <div> */}
                      <Grid item container direction="row" spacing={2}>
                        {searchResult?.map(
                          (value: any, i: React.Key | null | undefined) => (
                            <Grid item xs={12} md={3} key={i}>
                              <ProductCard token={value} />
                            </Grid>
                          )
                        )}
                      </Grid>
                    </Grid>
                  </Paper>
                )}
                {!noSearch && !searching && tokenByAlphabet?.length > 0 && (
                  <Paper elevation={4} className={classes.searchActivity}>
                    <Grid container component="div" direction="column">
                      <Grid item xs>
                        <Typography
                          variant="h6"
                          component="div"
                          gutterBottom
                          className={classes.desc}>
                          Search by Alphabet
                        </Typography>
                      </Grid>
                    </Grid>
                  </Paper>
                )}

                {/* 
              {!loading && noSearch && (
                <div>
                  <Paper elevation={4} className={classes.trending}>
                    <Grid component="div" direction="column">
                      <Grid item xs>
                        <Typography variant="h6" component="div" gutterBottom className={classes.desc} >
                          Trending designs
                        </Typography>
                      </Grid>
                      <div>
                        <Swiper
                          slidesPerView={2}
                          spaceBetween={30}
                          freeMode={true}
                          navigation
                          keyboard={true}
                          modules={[Navigation, Keyboard, FreeMode]}
                          className="mySwiper"
                          breakpoints={{
                            0: {
                              slidesPerView: 2,
                              spaceBetween: 50,
                            },
                            640: {
                              slidesPerView: 2,
                              spaceBetween: 50,
                            },
                            768: {
                              slidesPerView: 3,
                              spaceBetween: 50,
                            },
                            1024: {
                              slidesPerView: 4,
                              spaceBetween: 50,
                            },
                          }}
                        >
                          {trendingTokens?.map((value, i) => (
                            <Grid md={3} xs={6} key={i}>
                              <SwiperSlide className={classes.item}>
                                <ProductCard token={value} />
                              </SwiperSlide>
                            </Grid>
                          ))}
                        </Swiper>
                      </div>
                    </Grid>
                  </Paper>
                </div>
              )} */}

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

                {getError && (
                  <Paper elevation={4} className={classes.searchActivity}>
                    <Grid item xs>
                      <Typography
                        variant="h6"
                        component="div"
                        gutterBottom
                        className={classes.notFound}
                        style={{ color: "red" }}>
                        Failed to fetch
                      </Typography>
                      <Typography
                        variant="body1"
                        component="div"
                        gutterBottom
                        className={classes.notFoundText}>
                        Please try again
                      </Typography>
                    </Grid>
                  </Paper>
                )}

                <div className=" text-center p-2 mb-2 rounded-[12px] md:rounded-[20px] shadow-paper bg-[#fff] font-sora">
                  <div className="gradient-text bg-gradient-to-r from-[#A01AEC] via-[#CB527D] to-[#DF9361] bg-clip-text fill-transparent font-bold font-sora text-[24px]">
                    Available tokens
                  </div>
                  <div className="text-[12px] text-[#707070] font-light">
                    Alphabetical index of available tokens
                  </div>
                </div>
                <div className="md:h-[55vh] scroll overflow-auto my-2 grid  grid-cols-1  gap-3 font-sora">
                  {alphabets.map((alphabet, i) => (
                    <div
                      key={i}
                      className="text-left p-2 mb-2 rounded-xl shadow-paper bg-[#fff] w-full my-2">
                      <h5 className="underline decoration-[#f1bc31] inline-block mb-[0.5em]  py-[0.2em] pb-0 font-bold text-primary2 text-[20px]">
                        {alphabet.toUpperCase()}
                      </h5>
                      <div>
                        {proposedTokens?.map(
                          (token: any, i: React.Key | null | undefined) =>
                            token.nftName.startsWith(
                              alphabet.toLowerCase()
                            ) && (
                              <div
                                key={i}
                                className="capitalize cursor-pointer my-1 font-semibold text-textGray"
                                onClick={() =>
                                  router.push(
                                    `/dashboard/r/product/${token._id}`
                                  )
                                }>
                                {token.nftName}
                              </div>
                            )
                        )}
                      </div>
                    </div>
                  ))}
                  <div className="text-left p-2 mb-2 rounded-[16px] shadow-paper bg-[#fff] w-full my-2">
                    <h5 className="underline decoration-[#f1bc31] inline-block mb-[0.5em]  py-[0.2em] pb-0 font-bold text-primary2 text-[20px]">
                      #
                    </h5>
                    <div>
                      {proposedTokens?.map(
                        (token: any, i: React.Key | null | undefined) =>
                          !checkIfStringStartsWith(
                            token.nftName,
                            alphabets
                          ) && (
                            <div
                              key={i}
                              className="capitalize cursor-pointer my-1 font-semibold text-textGray"
                              onClick={() =>
                                router.push(`/dashboard/r/product/${token._id}`)
                              }>
                              {token.nftName}
                            </div>
                          )
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Modal
              open={alphabetComponent}
              onClose={renderABCFilterIcon}
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{
                timeout: 500,
              }}
              sx={{
                backdropFilter: "blur(5px)",
              }}>
              <div className="w-full h-full flex justify-center items-center">
                <div className="h-[350px] w-full sm:w-[350px] rounded-2xl px-4 py-6 shadow-paper bg-[#fff] relative flex flex-col justify-between mx-8">
                  <Grid container component="div" direction="column">
                    <Grid item xs>
                      <Typography
                        variant="h6"
                        component="div"
                        gutterBottom
                        className={classes.desc}>
                        Alphabet order
                      </Typography>
                      <br />
                      <Typography
                        variant="caption"
                        component="div"
                        gutterBottom
                        className={classes.descSubText}>
                        Select an alphabet you will like to start your search
                        from
                      </Typography>
                    </Grid>
                    <div>
                      <div className="w-full  h-full grid items-center grid-cols-7 gap-3">
                        {alphabets?.map((value, i) => (
                          <div
                            className="w-full h-full  flex justify-center items-center font-bold py-1 rounded-full shadow-md text-[#fafafa] bg-gradient-to-b from-primary2 via-[#D94D22] to-primary1 p-1 cursor-pointer"
                            onClick={() => getByAlphaBet(value)}
                            key={i}>
                            {value}
                          </div>
                        ))}
                      </div>
                    </div>
                  </Grid>
                </div>
              </div>
            </Modal>
          </Grid>
        </Grid>
      </DashboardLayout>
    </React.Fragment>
  );
}

function mapState(state: any) {
  const {
    searching,
    noSearch,
    searchResult,
    trendingTokens,
    tokenByAlphabet,
    loading,
    getError,
    proposedTokens,
  } = state.token;
  return {
    searching,
    noSearch,
    searchResult,
    trendingTokens,
    tokenByAlphabet,
    loading,
    getError,
    proposedTokens,
  };
}

const actionCreators = {
  getAll: tokenActions.getProposed,
  getTrending: tokenActions.getTrending,
  searchToken: tokenActions.searchToken,
  getByAlphabet: tokenActions.getByAlphabet,
};

const connectedSearchPage = connect(mapState, actionCreators)(Search);
export default connectedSearchPage;
