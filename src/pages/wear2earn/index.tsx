import React from "react";
// import Content from "./Content";
// import Sidebar from "./Sidebar";
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";

const Wear2Earn = () => {
  return (
    <div>
      <Navbar />
      <div className="md:px-[80px] px-6 py-16  m-6 container mx-auto">
        <div className=" text-center mt-16 mb-8 font-sora gradient-text font-bold text-[32px] md:text-[48px] bg-gradient-to-r from-primary2 to-primary1 bg-clip-text fill-transparent">
          Wear2Earn
        </div>
        <div className="bg-[#F2F3F6] rounded-[20px] p-6 md:px-8 md:py-[40px] w-full md:w-[80%] mx-auto">
          <div className="font-sora text-textGray">
            There are several ways to earn with us. Here are a few of them, and
            we will have more on the way:
          </div>
          <div className="flex flex-col gap-6 my-8 font-poppins font-medium text-[18px]">
            <div>
              (1) After writing your own word to complete the model sentence
              provided to the community, you earn 20% of all sales made on
              shirts bearing your words. That equates to $7 per shirt deposited
              into your wallet. You can increase this 20% if you complete
              certain tasks outlined in our discord server.
            </div>
            <div>
              (2) You can auction off the rights to your words to the highest
              bidder. You can set any price you want. This means the new owner
              will enjoy the 20% of all new sales deposited into their wallet.
            </div>
            <div>
              (3) We plan to turn your replica “R” shirt into a purchase coupon.
              This means that you can use this NFTee to obtain discounts on
              other non-customizable products in our store.
              <div className="ml-12 text-[16px] font-normal my-2">
                (a) Moreover, this coupon that you use is linked to the proposer
                who suggested the word on the shirt you bought. Therefore, when
                you use that NFTee as a coupon, an additional 10% of the order
                sale goes to the proposer of the NFTee you are using.
              </div>{" "}
            </div>
            <div>
              (4) Even if you never use your NFTees to propose words and just
              want to enjoy our fashion, then you can also earn through our
              earning pool. How does that look like?
              <div className="ml-12 text-[16px] font-normal my-2">
                (a) At 100pCotton, we split up the day into 2-hour bins that we
                call an earning pool.
              </div>{" "}
              <div className="ml-12 text-[16px] font-normal my-2">
                (b) If you own a replica, then you can select to hop into any
                earning pool time window you like. We plan to have statistics to
                help you make decisions.
              </div>{" "}
              <div className="ml-12 text-[16px] font-normal my-2">
                (c) We share 10% of all sales made on all items and orders to
                everyone in this pool.
              </div>{" "}
              <div className="ml-12 text-[16px] font-normal my-2">
                (d) For example, if 100 people hop into the 2pm - 4pm pool, and
                100pCotton generates revenue of $10,000 in that time window.
                Then 10% of $10,000 is $1000. So everyone in that pool will earn
                $10 deposited immediately into their crypto wallet.
              </div>{" "}
            </div>
            <div>
              (5) If you hold 10 replicas and never proposed any words with
              them, then you can select to get 3 free items of your choice from
              our store. This is our “token” of appreciation to you. Pun
              intended.
            </div>
          </div>
          <div className="font-sora text-textGray my-2">
            As you can see, there are many innovative approaches we can take.
            And this is just the start. Smart contracts are an astonishing
            technological marvel, revolutionizing transactions with their
            unparalleled security, automation, versatility, and empowerment.
          </div>
          <div className="font-poppins text-primary2 font-medium text-[14px]">
            Please follow us on our socials @100pnft and join our discord server
            to stay up to date on all of our announcements.
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Wear2Earn;
