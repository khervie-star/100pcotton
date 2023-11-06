import Head from "next/head";

import Navbar from "../Components/Navbar";
import HeroPage from "../Components/Pages/Home/hero";
import Footer from "../Components/Footer";
import BrandPositioning from "../Components/Pages/Home/BrandPositioning";
import SectionThree from "../Components/Pages/Home/SectionThree";
import HowItWorks from "../Components/Pages/Home/HowItWorks";
import BrandVision from "../Components/Pages/Home/BrandVision";
import Roadmap from "../Components/Pages/Home/Roadmap";

export default function Home() {
  return (
    <>
      {/* <Head>
        <title>100% Cotton</title>
        <meta
          name="description"
          content="Wear your creativity, own your story."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:url" content="https://100pcotton.com" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="100Percent Cotton" />
        <meta property="twitter:card" content="summary" />
        <meta
          property="og:description"
          content="Wear your creativity, own your story."
        />
        <meta
          property="og:image"
          content={
            "https://res.cloudinary.com/z-pro-trading/image/upload/v1678977006/assets/Greenshot_2023-03-16_15.28.33_xuaxyx.png"
          }
        />
      </Head> */}
      <main>
        <Navbar />
        <div className="overflow-x-hidden">
          <HeroPage />
          <HowItWorks />
          <BrandPositioning />
          <SectionThree />
          <BrandVision />
          <Roadmap />
        </div>
        <Footer />
      </main>
    </>
  );
}
