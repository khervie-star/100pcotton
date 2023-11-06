/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/display-name */
/* eslint-disable react-hooks/exhaustive-deps */

import { Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import * as React from "react";
// import Image from 'next/image'
import FormData from "form-data";
import domtoimage from "dom-to-image";
// import html2canvas from "html2canvas";

// import useWeb3 from "../../hooks/web3js/web3context";
// var domToPdf = require("dom-to-pdf");

// MUI makeStyles
const useStyles = makeStyles((theme) => ({
  canvasContainer: {
    width: "100%",
    // height: 400,
    borderRadius: "2em",
    boxShadow: theme.palette.boxShadow.main,
  },

  drawingArea: {
    position: "absolute",
    top: "120px",
    left: "122px",
    zIndex: 10,
    width: "200px",
    height: "400px",
    textAlign: "center",
  },
  logoDrawingArea: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    zIndex: 10,
    width: "1400px",
    height: "1460px",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },

  canvasContainer: {
    width: "200px",
    height: "400px",
    position: "relative",
    userSelect: "none",
  },

  tshirtDiv: {
    width: "452px",
    height: "548px",
    position: "relative",
    userSelect: "none",
    // backgroundColor: "red",
    // overflowX: "scroll",
    // overflowX: "hidden",
    // overflowY: "scroll",
  },
  logoDiv: {
    width: "2000px",
    height: "2000px",
    position: "relative",
    userSelect: "none",
    display: "flex",
    justifyContent: "center",
    textAlign: "center",
  },

  canvas: {
    position: "absolute",
    width: "400px",
    height: "800px",
    left: "0px",
    top: "0px",
    userSelect: "none",
    cursor: "default",
  },

  phraseBox: {
    width: "100%",
    height: "100%",
    backgroundColor: "transparent",
    fontFamily: "Poppins !important",
    fontSize: "30px",
    fontWeight: "700",
    // overflowWrap: "break-word",
    // wordWrap: "break-word",
    // hyphens: "manually",
  },
  logoPhraseBox: {
    width: "100%",
    height: "100%",
    backgroundColor: "transparent",
    fontFamily: "Poppins !important",
    fontSize: "264px",
    fontWeight: "900",
    // overflowWrap: "break-word",
    // wordWrap: "break-word",
    // hyphens: "manually",
  },
}));

const uploadImage = (file, text) => {
  const fileBlob = new Blob([file], { type: "image/png" });
  const data = new FormData();

  data.append("file", fileBlob, `${text}.png`);

  data.append("upload_preset", "100nft");

  data.append("cloud_name", "z-pro-trading");

  return fetch(" https://api.cloudinary.com/v1_1/z-pro-trading/image/upload", {
    method: "post",
    body: data,
  })
    .then((resp) => resp.json())
    .then((data) => {
      console.log(data);
      return data.secure_url;
    })
    .catch((err) => console.log(err));
};

const downloadImage = (blob, fileName) => {
  const fakeLink = document.createElement("a");
  fakeLink.style = "display:none;";
  fakeLink.download = fileName;

  fakeLink.href = blob;

  document.body.appendChild(fakeLink);
  fakeLink.click();
  document.body.removeChild(fakeLink);

  fakeLink.remove();
};

// Parent function component
const RenderCanvas = ({ props }) => {
  const classes = useStyles();
  const textRef = React.useRef(null);
  const wordPhrase = React.useRef(null);
  const [logoColor, setLogoColor] = React.useState("");

  React.useEffect(() => {
    props.handlePin.current = buyShirtReplica;
    setLogoColor(props?.color?.logoColor);
  }, [props]);

  const buyShirtReplica = async () => {
    // convert URIfile to ImageFile

    var shirtNode = document.getElementById("mainDiv");

    var logoNode = document.getElementById("logoDrawingArea");

    const shirtBlob = await domtoimage.toPng(shirtNode).then(function (blob) {
      return blob;
    });
    const logoBlob = await domtoimage.toPng(logoNode).then(function (blob) {
      return blob;
    });

    // var options = {
    //   filename: "test.pdf",
    // };

    // const logoBlob = domToPdf(shirtNode, options, function (pdf) {
    //   return pdf;
    // });

    // downloadImage(shirtBlob);
    // downloadImage(logoBlob);

    let uploads;

    uploads = {
      shirtImage: await uploadImage(shirtBlob, props?.name),
      logoDisplayUrl: await uploadImage(logoBlob, props?.name + "Logo"),
    };

    return uploads;
  };

  return (
    <React.Fragment>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignContent="center"
        id="mainDiv">
        <div
          id="tshirt-div"
          className="w-[452px] h-[548px] relative select-none"
          style={{
            backgroundColor:
              props?.color?.shiteColor === "purple"
                ? "#a32cc4"
                : props?.color?.shiteColor,
          }}>
          <img
            id="tshirt-backgroundpicture"
            src="https://res.cloudinary.com/z-pro-trading/image/upload/v1662925827/assets/background-image_ofxo72.png"
            crossOrigin="anonymous"
            alt="shirt"
            height="100%"
          />
          <div
            id="drawingArea"
            className="absolute top-[120px] left-[122px] z-10 w-[200px] h-[400px] text-center">
            <div id="canvasContainer">
              <div className="flex w-full justify-center">
                {props?.name?.toLowerCase() !== "nftee" &&
                  logoColor?.toLowerCase() == "red" && (
                    <img
                      // src="https://res.cloudinary.com/z-pro-trading/image/upload/v1663227568/assets/logo_colored_red_2x_wtiu0p.png"
                      src="https://res.cloudinary.com/z-pro-trading/image/upload/v1669805369/assets/Untitled_lzgdpx.png"
                      width="70%"
                      alt=""
                    />
                  )}
                {props?.name?.toLowerCase() !== "nftee" &&
                  logoColor?.toLowerCase() == "white" && (
                    <img
                      src="https://res.cloudinary.com/z-pro-trading/image/upload/v1661255716/assets/logo_colored_white_tiha53.png"
                      width="70%"
                      alt=""
                    />
                  )}
                {props?.name?.toLowerCase() !== "nftee" &&
                  logoColor?.toLowerCase() == "gold" && (
                    <img
                      src="https://res.cloudinary.com/z-pro-trading/image/upload/v1663227567/assets/logo_colored_gold_lqr8i2.png"
                      width="70%"
                      alt=""
                    />
                  )}
              </div>

              {props?.logo && logoColor?.toLowerCase() == "red" && (
                <div
                  className="w-full h-full bg-transparent font-poppins text-[30px] font-bold"
                  style={{
                    color: "#850101",
                  }}
                  ref={textRef}>
                  {props?.name}
                </div>
              )}

              {logoColor?.toLowerCase() !== "red" && (
                <div
                  className="w-full h-full bg-transparent font-poppins text-[30px] font-bold"
                  style={{
                    color: props?.color?.logoColor,
                  }}
                  ref={textRef}>
                  {props?.name}
                </div>
              )}
            </div>
          </div>
        </div>
      </Grid>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignContent="center"
        id="logoDiv"
        style={{ marginLeft: "-10000px", position: "absolute" }}>
        <div
          id="logoDrawingArea"
          className="absolute top-0 left-0 z-10 w-[1400px] h-[1460px] flex flex-col justify-center items-center text-center">
          <div id="canvasContainer">
            <div className="w-full flex justify-center">
              {props?.name?.toLowerCase() !== "nftee" &&
                logoColor?.toLowerCase() == "red" && (
                  <img
                    src="https://res.cloudinary.com/z-pro-trading/image/upload/v1669805369/assets/Untitled_lzgdpx.png"
                    width="70%"
                    alt=""
                  />
                )}
              {props?.name?.toLowerCase() !== "nftee" &&
                logoColor?.toLowerCase() == "white" && (
                  <img
                    src="https://res.cloudinary.com/z-pro-trading/image/upload/v1661255716/assets/logo_colored_white_tiha53.png"
                    width="70%"
                    alt=""
                  />
                )}
              {props?.name?.toLowerCase() !== "nftee" &&
                logoColor?.toLowerCase() == "gold" && (
                  <img
                    src="https://res.cloudinary.com/z-pro-trading/image/upload/v1663227567/assets/logo_colored_gold_lqr8i2.png"
                    width="70%"
                    alt=""
                  />
                )}
            </div>
            {props?.name?.toLowerCase() !== "nftee" &&
              logoColor?.toLowerCase() == "red" && (
                <div
                  className="w-full h-full bg-transparent font-poppins text-[264px] font-black"
                  style={{
                    color: "#850101",
                  }}
                  ref={textRef}>
                  {props?.name}
                </div>
              )}

            {logoColor?.toLowerCase() !== "red" && (
              <div
                className="w-full h-full bg-transparent font-poppins text-[264px] font-black text-center"
                style={{
                  color: props?.color?.logoColor,
                }}
                ref={textRef}>
                {props?.name}
              </div>
            )}
          </div>
        </div>
      </Grid>
    </React.Fragment>
  );
};

export default RenderCanvas;
