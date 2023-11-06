/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Box,
  Grid,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
} from "@mui/material";

import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import { makeStyles, styled } from "@mui/styles";
import Image from "next/image";
import * as React from "react";

import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import HdrStrongTwoToneIcon from "@mui/icons-material/HdrStrongTwoTone";
import ContactSupportRoundedIcon from "@mui/icons-material/ContactSupportRounded";
// import Link from "../../utility/Link";
import DashboardLayout from "../../../Layouts/DashboardLayout";
import {
  OutlinedButton,
  SolidOrangeButton,
  SolidPurpleGradientButton,
} from "../../../Components/Buttons";

const useStyles = makeStyles((theme) => ({
  header: {
    position: "relative",
    overflow: "none",
    height: "10em",
    padding: "1em 3em",
    borderRadius: "4em 1em 1em 1em",
    boxShadow: theme.palette.boxShadow.main,
    [theme.breakpoints.down("md")]: {
      borderRadius: "2em",
      marginBottom: "1.5em",
      padding: "1em 2em",
      height: "7em",
    },
  },
  headerDesc: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    // color: "red",
    "& .MuiTypography-h5": {
      color: theme.palette.textColor.main,
      fontWeight: "bold",
    },
    "& .MuiTypography-caption": {
      color: theme.palette.textGray.main,
      fontSize: ".75em",
      fontStyle: "italic",
      fontWeight: "light",
      position: "absolute",
      bottom: "20px",
    },
  },
  headerImg: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  imageContainer: {
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
  imageContainer2: {
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
  cartTable: {
    width: "100%",
    margin: "2em 0",
    borderRadius: "2em",
    padding: "2em",
    margin: "2em 0",
    boxShadow: theme.palette.boxShadow.main,
  },
  desc: {
    borderBottom: "2px solid",
    borderBottomColor: theme.palette.dividerYellow.main,
    border: "none",
    display: "inline-block",
    margin: "0 0 2em 0",
    padding: ".2em 0",
    fontWeight: "bold",
    color: theme.palette.buttonBackground.main,
  },
  primaryText: {
    border: "none",
    display: "inline-block",
    padding: ".2em 0",
    fontWeight: "bold",
    color: theme.palette.primary.main,
    fontSize: "1em",
  },
  secondaryText: {
    border: "none",
    display: "inline-block",
    padding: ".2em 0",
    fontSize: ".8em",
    color: theme.palette.textGray.main,
  },
  divider: {
    backgroundColor: theme.palette.dividerYellow.main,
  },
  gotoTitle: {
    display: "inline-block",
    padding: ".2em 0",
    fontWeight: "bold",
    color: theme.palette.textColor.main,
    textDecoration: "3px underline",
    textDecorationColor: theme.palette.dividerYellow.main,
    fontSize: "1.2em",
    wordWrap: "break-word",
  },
  gotoText: {
    border: "none",
    display: "flex",
    padding: ".2em 0",
    fontWeight: "bold",
    color: theme.palette.primary.main,
    fontSize: "1em",
    wordWrap: "break-word",
    "& span": {
      fontWeight: "bold",
    },
  },
  gotoSubText: {
    border: "none",
    display: "block",
    flexDirection: "row",
    padding: ".2em 0",
    color: theme.palette.textGray.main,
    fontSize: ".9em",
    wordWrap: "break-word",
  },
  listText: {
    border: "none",
    display: "block",
    flexDirection: "row",
    fontWeight: "bold",
    padding: ".2em 0",
    color: theme.palette.textGray.main,
    fontSize: ".8em",
    wordWrap: "break-word",
    "& span": {
      fontSize: "1em",
      margin: "0 10px",
      color: "#131313",
    },
  },
  supportContainer: {
    marginTop: "2em",
    borderRadius: "20px",
    // border: ".5px solid",
    // boxShadow: theme.palette.boxShadow.main,
  },
  tagName: {
    background: "linear-gradient(180deg, #E25822, #D94D22, #B22222)",
    color: "#fafafa",
    fontSize: ".75em",
    fontWeight: "bold",
    boxShadow: theme.palette.boxShadow.main,
    borderRadius: "50%",
    height: "24px",
    width: "24px",
    display: "inline-flex",
    justifyContent: "center",
    textAlign: "center",
    alignItems: "center",
    margin: "0 5px",
  },
  nextButton: {
    padding: ".2em 2em",
    borderRadius: "3em",
    fontSize: ".875em",
    fontWeight: "500",
    textTransform: "none",
    border: "none",
    background: "linear-gradient(180deg, #E25822, #B22222)",
    color: "#fff",
    marginRight: "1em",
  },
  backButton: {
    margin: ".5em .5em 0 0em",
    padding: ".2em 1em",
    borderRadius: "3em",
    fontSize: ".875em",
    fontWeight: "bold",
    textTransform: "none",
  },
}));

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid transparent}`,
  "&:not(:last-child)": {
    borderBottom: `1px solid ${theme.palette.dividerYellow.main}`,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor: "transparent",
  // flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(180deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  // padding: theme.spacing(2),
  // borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

function generate(element) {
  return [0, 1, 2].map((value) =>
    React.cloneElement(element, {
      key: value,
    })
  );
}

const Demo = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

export default function Help(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState("panel1");
  const [activeStep, setActiveStep] = React.useState(0);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const goto = [
    { name: "Definitions", href: "#definitions" },
    { name: "How it works", href: "#how-it-works" },
    {
      name: "Setting up metamask via chrome/ mobile",
      href: "#setting-up-metamask-via-chrome-or-mobile",
    },
    {
      name: "Connecting your Cotton account to Metamask",
      href: "#connecting-your-cotton-account",
    },
    { name: "Making purchases", href: "#making-purchases" },
  ];

  const steps = [
    {
      label: "Buy a shirt",
      description: `You buy a shirt via our novel NFT minting checkout mechanism`,
    },
    {
      label: "Your shirt is minted to an NFT",
      description:
        "This shirt, presented as a NFT, is now your gateway for lifetime earnings.",
    },
    {
      label: "Propose a word",
      description: `Use this NFT to propose a word or phrase based on our trend. `,
    },
    {
      label: "Get 20% royalty off sales of your shirt",
      description: ` Anytime someone purchases a shirt with your proposed word, you get a 20% cut of the total sale. Yes, even the shirt you bought in Step 1, if it was not an original from the company, then the person who proposed that design also received a 20% cut. `,
    },
    {
      label: "Auction your shirt",
      description: `If your word/phrase is selling well, then you can auction it to sell away the 20% rights to someone else. Once a bid is made and you approve. Then 20% of all future sales of that shirt will go to the new owner, hence giving away your rights if you so choose. `,
    },
  ];

  return (
    <React.Fragment>
      <DashboardLayout>
        <div>
          <div className="bg-[#fafafa] shadow-paper relative overflow-hidden h-[7em] md:h-[10em] w-full px-8 md:px-12 py-4 rounded-[20px]   mb-[1.5em] md:mb-0 ">
            <div className="flex justify-between items-center">
              <div className="flex flex-col justify-evenly gap-3">
                <div className="gradient-text font-bold text-[26px] bg-gradient-to-r from-[#A01AEC] via-[#CB527D] to-[#DF9361] bg-clip-text fill-transparent">
                  Help
                </div>
                <div className="text-[12px] text-textGray  font-light hidden md:block">
                  Get help on your frequently asked questions
                </div>
              </div>
              <div className="w-full flex justify-end items-center">
                <div className="w-[60px] h-[60px] md:w-[75px] md:h-[75px]  lg:w-[100px] lg:h-[100px]">
                  <Image
                    src="/static/box_love.png"
                    alt="Picture of the author"
                    width={100}
                    height={100}
                    layout="responsive"
                  />
                </div>
                <div className="w-[75px] h-[75px] md:w-[100px] md:h-[100px]  lg:w-[125px] lg:h-[125px]">
                  <Image
                    src="/static/love_valentine.png"
                    alt="Picture of the author"
                    width={125}
                    height={125}
                    layout="responsive"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className={classes.definitions}>
            <Grid container direction="row" spacing="4">
              <Grid item container md={4}>
                <div className="bg-[white] p-4 md:p-6 shadow-paper rounded-[12px] md:rounded-[20px] my-4">
                  <Grid
                    container
                    spacing="2"
                    display="flex"
                    flex-direction="row"
                    justifyContent="start"
                    alignItems="center">
                    <IconButton>
                      <ContactSupportRoundedIcon
                        fontSize="large"
                        sx={{
                          color: (theme) => theme.palette.dividerYellow.main,
                        }}
                      />
                    </IconButton>

                    <div className="font-bold text-[24px] text-primary2">
                      Support
                    </div>
                  </Grid>
                  <div>
                    <div className="text-textGray font-sora mb-4">
                      For any issues or concern with your order, please send an
                      email to{" "}
                      <strong
                        style={{
                          color: "#e25822",
                        }}>
                        <a href="mailto:help@100pcotton.com">
                          help@100pcotton.com
                        </a>
                      </strong>{" "}
                      and someone from the team will be with you shortly.
                    </div>
                  </div>

                  <SolidPurpleGradientButton
                    onClick={() =>
                      window.open("mailto:help@100pcotton.com", "_blank")
                    }>
                    <div className="mx-4">
                      <SupportAgentIcon />
                    </div>
                    Contact support
                  </SolidPurpleGradientButton>
                </div>
              </Grid>
              <Grid item container md={8}>
                <div className="bg-[white] p-4 md:p-6 shadow-paper rounded-[12px] md:rounded-[20px] my-4">
                  <Typography
                    variant="h6"
                    component="div"
                    gutterBottom
                    className={classes.gotoTitle}>
                    Jump to:
                  </Typography>
                  <List>
                    <Grid container direction="row">
                      {goto.map((value, i) => (
                        <Grid container item xs={6} key={i}>
                          <ListItem disablePadding style={{ display: "flex" }}>
                            <ListItemButton component="a" href={value.href}>
                              <ListItemIcon>
                                <HdrStrongTwoToneIcon color="primary" />
                              </ListItemIcon>
                              <ListItemText
                                primary={value.name}
                                className="!font-bold text-[24px] text-primary2"
                              />
                            </ListItemButton>
                          </ListItem>
                        </Grid>
                      ))}
                    </Grid>
                  </List>
                </div>
              </Grid>
            </Grid>
          </div>

          <div className={classes.main}>
            <div id="definitions" className={classes.definitions}>
              <div className="bg-[white] p-4 md:p-6 shadow-paper rounded-[12px] md:rounded-[20px] my-4">
                <div className="font-bold text-[24px] text-primary2 mb-4">
                  Definitions
                </div>
                <div>
                  <div className="font-bold text-[18px] text-black mb-4">
                    How it works{" "}
                  </div>
                  <p className="text-textGray font-sora mb-3">
                    <strong>“Original”</strong> denoted by an
                    <span className={classes.tagName}>O</span>
                    which are only provided by the company. When starting a new
                    trend, we will only release one or two original sets.
                  </p>
                  <p className="text-textGray font-sora mb-3">
                    <strong>“Proposed” </strong> denoted by a
                    <span className={classes.tagName}>P</span>
                    which are only provided by the customers. Previous customers
                    propose their words/phrases and mint their smart contracts.
                  </p>
                  <p className="text-textGray font-sora mb-3">
                    <strong>“Replicas”</strong>
                    denoted by a<span className={classes.tagName}>R</span>
                    which are purchased shirts.
                  </p>
                </div>
              </div>
            </div>

            <div id="how-it-works" className={classes.howItWorks}>
              <div className="bg-[white] p-4 md:p-6 shadow-paper rounded-[12px] md:rounded-[20px] my-4">
                <div className="font-bold text-[24px] text-primary2 mb-4">
                  How it works{" "}
                </div>
                <div>
                  <Box>
                    <Stepper activeStep={activeStep} orientation="vertical">
                      {steps.map((step, index) => (
                        <Step key={step.label}>
                          <StepLabel
                            className={classes.gotoText}
                            sx={{ fontFamily: "Sora" }}>
                            {step.label}
                          </StepLabel>
                          <StepContent>
                            <p className="font-sora text-textGray text-base font-medium">
                              {step.description}
                            </p>
                            <Box sx={{ mb: 2 }}>
                              <div className="flex items-center gap-4">
                                {index < steps.length - 1 && (
                                  <SolidOrangeButton onClick={handleNext}>
                                    Next
                                  </SolidOrangeButton>
                                )}
                                <OutlinedButton
                                  disabled={index === 0}
                                  onClick={handleBack}>
                                  Back
                                </OutlinedButton>
                              </div>
                            </Box>
                          </StepContent>
                        </Step>
                      ))}
                    </Stepper>
                  </Box>
                </div>
              </div>
            </div>
            <div
              className={classes.settingUpMetamask}
              id="setting-up-metamask-via-chrome-or-mobile">
              <div className="bg-[white] p-4 md:p-6 shadow-paper rounded-[12px] md:rounded-[20px] my-4">
                <div className="font-bold text-[24px] text-primary2 mb-4">
                  Setting up metamask via chrome/ mobile
                </div>
                <div style={{ margin: "1em 0 2em 0" }}>
                  <p className="text-textGray font-sora">
                    As of now, we are only supporting the MetaMask wallet. We
                    use the Polygon (MATIC) network. Below is a link to setting
                    up your MetaMask wallet account. It starts with the Ethereum
                    network.
                  </p>
                </div>
                <div className="w-full md:w-[550px] h-full rounded-[12px]">
                  <iframe
                    width="100%"
                    height="350px"
                    // src={`https://www.youtube.com/embed/afATAw7iuUM`}
                    src={`https://youtube.com/embed/esW47fihz04`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title="Embedded youtube"
                    style={{ borderRadius: "12px" }}
                  />
                </div>
                <div>
                  <Typography className={classes.gotoText}>
                    Connecting MetaMask to Polygon
                  </Typography>

                  <p className="text-textGray font-sora">
                    Switch the connected blockchain by clicking on the tab
                    saying Main Ethereum Network, we need to add Polygon.
                  </p>
                  <img
                    src="/static/metamask1.png"
                    alt=""
                    width="300px"
                    // height="100px"
                    style={{ margin: "1em 0" }}
                  />
                  <Typography className={classes.gotoSubText}>
                    Scroll down until you find <strong>Add Network.</strong>
                  </Typography>
                  <img
                    src="/static/metamask2.png"
                    alt=""
                    width="300px"
                    style={{ margin: "1em 0" }}
                    // height="100px"
                  />
                  <Typography className={classes.gotoSubText}>
                    Enter in the Polygon settings as follows:
                  </Typography>
                  <ul>
                    <li>
                      <p className={classes.listText}>
                        Network name:
                        <span>Polygon Mainnet</span>
                      </p>
                    </li>
                    <li>
                      <p className={classes.listText}>
                        RPC URL:
                        <span>
                          <a href="https://polygon-rpc.com">
                            https://polygon-rpc.com
                          </a>
                        </span>
                      </p>
                    </li>
                    <li>
                      <p className={classes.listText}>
                        Chain ID:
                        <span>137</span>
                      </p>
                    </li>
                    <li>
                      <p className={classes.listText}>
                        Currency:
                        <span>MATIC</span>
                      </p>
                    </li>
                    <li>
                      <p className={classes.listText}>
                        Explorer:
                        <span>
                          <a href="https://polygonscan.com/">
                            https://polygonscan.com/
                          </a>
                        </span>
                      </p>
                    </li>
                  </ul>
                  <div style={{ margin: "2em 0" }}>
                    <Typography className={classes.gotoSubText}>
                      Click <strong>Save</strong>. <br />
                      <br />
                      You have now connected to the Polygon Mainnet with your
                      Metamask Wallet!
                    </Typography>
                  </div>
                  <img
                    src="/static/metamask3.png"
                    alt=""
                    width="300px"
                    style={{ margin: "1em 0" }}
                    // height="100px"
                  />
                  <p className="text-[14px] font-sora text-textGray">
                    * On the Mobile app, it is much easier to add the Polygon
                    network. These settings are prefilled for you. Now you can
                    send your MATIC from other exchanges to your wallet here.
                    Make sure you select MATIC when sending between wallets.
                    Test with small amounts first.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </React.Fragment>
  );
}
