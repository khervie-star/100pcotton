import React from "react";
import finance from "../../../Assets/images/finance_7 1.svg";
import purpleblur from "../../../Assets/images/purpleblur.svg";
import yellowblur from "../../../Assets/images/yellowblur.svg";
import redSticker from "../../../Assets/images/glued-sticker-mockups-by-freeject 1.svg";
import blackSticker from "../../../Assets/images/Sticker-Mockup 2.svg";
import Image from "next/image";

const HowItWorks = () => {
  return (
    <div className="container mx-auto relative" id="how-it-works">
      <div className="p-8 w-full md:w-[90%] mx-auto">
        <h6 className="font-sora font-semibold text-[48px] md:ext-[64px] text-secondaryBlack leading-[48px] md:leading-[80.64px] tracking-[0.2px] mb-6 text-right">
          How 100pCotton works?
        </h6>
        <div className="bg-[#F2F3F6] rounded-[20px] p-6 md:px-[60px] md:py-[40px]">
          <div className="divide-y divide-[#D2D2DF] w-full">
            <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-12 py-8">
              <div className="step1 mt-16">
                <div className="flex flex-col gap-3">
                  <div className="grid grid-cols-2 smd:grid-cols-2 divide-x divide-[#D2D2DF] items-center">
                    <div className="font-sora font-bold text-[28px] md:text-[36px] text-[black] leading-[28px] md:leading-[45.36px]">
                      Step 1:
                    </div>
                    {/* <p className="font-sora font-semibold text-[14px] text-[black] leading-[16px] md:leading-[21px]  px-8">
                      Choose <br />
                      Your Shirt
                    </p> */}
                  </div>
                  <div className="font-inter font-normal text-[14px] md:text-[16px] text-textGray leading-[20px] md:leading-[24px]">
                    You buy a shirt. The shirt features a word suggested by a
                    previous customer who took part in our &quot;complete the
                    phrase&quot; model.
                  </div>
                </div>
              </div>
              <div className="step2">
                <div className="flex flex-col gap-3">
                  <div className="grid grid-cols-2 divide-x divide-[#D2D2DF] items-center">
                    <div className="font-sora font-bold text-[28px] md:text-[36px] text-[black] leading-[28px] md:leading-[45.36px]">
                      Step 2:
                    </div>
                    {/* <p className="font-sora font-semibold text-[14px] text-[black] leading-[16px] md:leading-[21px]  px-8">
                      Complete
                      <br /> the Phrase
                    </p> */}
                  </div>
                  <div className="font-inter font-normal text-[14px] md:text-[16px] text-textGray leading-[20px] md:leading-[24px]">
                    {/* Every T-shirt sold by 100% Cotton features a model phrase
                    you can complete with your chosen words. For example, our
                    first model phrase is &quot;100% __(blank)&quot;. Next, fill
                    in the blank with words like &quot;blessed&quot;,
                    &quot;bussin&quot;, &quot;wired&quot;, or
                    &quot;grateful&quot;. It&apos;s your chance to wear your
                    personality with pride! Once you have purchased a shirt with
                    a phrase completed by a previous customer, you can use that
                    replica NFT to propose your word or phrase to complete our
                    model. This NFT will be a proposed &quot;P&quot; NFT. */}
                    The customer who completed that phrase on the shirt earns
                    20% of the shirt sale price deposited directly into their
                    crypto wallet.
                  </div>
                </div>
              </div>
              <div className="image">
                <div className="relative w-full">
                  <Image src={finance} alt="" width={100} className="w-full" />
                </div>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-12 py-12">
              <div className="step3 md:mt-16">
                <div className="flex flex-col gap-3">
                  <div className="grid grid-cols-2 divide-x divide-[#D2D2DF] items-center">
                    <div className="font-sora font-bold text-[28px] md:text-[36px] text-[black] leading-[28px] md:leading-[45.36px]">
                      Step 3:
                    </div>
                    {/* <p className="font-sora font-semibold text-[14px] text-[black] leading-[16px] md:leading-[21px]  px-8">
                      Get <br />
                      Paid
                    </p> */}
                  </div>
                  <div className="font-inter font-normal text-[14px] md:text-[16px] text-textGray leading-[20px] md:leading-[24px]">
                    {/* Here&apos;s where 100% Cotton is genuinely unique. Every
                    time someone buys a shirt with your completed phrase, you
                    receive 20% of the sale price. That&apos;s right - you get
                    paid every time someone wears your creativity! And the best
                    part? This 20% goes on forever. */}
                    Your receipt will be in the form of a NFT, which grants you
                    the opportunity to contribute your own unique word to
                    complete that same model sentence on the shirts. We provide
                    the model, you complete it.
                  </div>
                </div>
              </div>
              <div className="step4">
                <div className="flex flex-col gap-3">
                  <div className="grid grid-cols-2 divide-x divide-[#D2D2DF] items-center">
                    <div className="font-sora font-bold text-[28px] md:text-[36px] text-[black] leading-[28px] md:leading-[45.36px]">
                      Step 4:
                    </div>
                    {/* <p className="font-sora font-semibold text-[14px] text-[black] leading-[16px] md:leading-[21px]  px-8">
                      Propose
                      <br /> More Phrases
                    </p> */}
                  </div>
                  <div className="font-inter font-normal text-[14px] md:text-[16px] text-textGray leading-[20px] md:leading-[24px]">
                    {/* Have more ideas for phrases you&apos;d like to complete? Buy
                    another shirt, and you&apos;ll be able to propose another
                    term. The more shirts you buy, the more times you can
                    submit. */}
                    Every time a shirt with your unique word sells, you will
                    earn 20% on ALL future sales. Yup, you heard that right.
                    FOREVER!
                  </div>
                </div>
              </div>
              <div className="step5 md:mt-16">
                <div className="flex flex-col gap-3">
                  <div className="grid grid-cols-2 divide-x divide-[#D2D2DF] items-center">
                    <div className="font-sora font-bold text-[28px] md:text-[36px] text-[black] leading-[28px] md:leading-[45.36px]">
                      Step 5:
                    </div>
                    {/* <p className="font-sora font-semibold text-[14px] text-[black] leading-[16px] md:leading-[21px]  px-8">
                      Auction
                      <br /> Your Phrase
                    </p> */}
                  </div>
                  <div className="font-inter font-normal text-[14px] md:text-[16px] text-textGray leading-[20px] md:leading-[24px]">
                    {/* If your phrase becomes particularly popular, you can even
                    auction off the rights to the phrase. This means that 20% of
                    all new sales on that shirt will go to the new owner of the
                    phrase. It&apos;s your chance to turn your creativity into
                    cash! */}
                    If your completed phrase is selling many shirts, you can
                    choose to auction off the rights of the 20% royalty to the
                    highest bidder, giving you another opportunity to make
                    money. That means 20% of all future sales on that shirt will
                    go to a new owner.
                    <br />
                  </div>
                </div>
              </div>
            </div>
            <div>
              <p className="font-inter font-bold text-[14px] md:text-[16px] text-textGray leading-[20px] md:leading-[24px]">
                <br />
                Lastly, we promise many future updates and will release a new
                clothing line where you can use your NFTs as discount coupons!
                We also plan to expand to AI-generated art and move into
                “complete the drawing” instead of “complete the sentence.”
                <br />
                <span className="font-sora font-bold mt-4 text-primary2">
                  That is what we call 100% innovative!
                </span>
                <br />
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute top-0 right-0 -mr-[500px] mt-[200px]">
        <Image src={purpleblur} alt="" width={120} className="w-full" />
      </div>
      <div className="absolute top-0 left-0 -ml-[200px] mt-[100px]">
        <Image src={yellowblur} alt="" width={100} className="w-full" />
      </div>
      <div className="absolute top-[140px] md:top-2 left-[10px] md:left-[180px] -ml-[0] mt-[0]">
        <Image src={redSticker} alt="" width={100} className="w-full" />
      </div>
      <div className="absolute top-[160px]  md:top-0 left-[100px] md:left-[280px] -ml-[0] mt-[0]">
        <Image src={blackSticker} alt="" width={100} className="w-full" />
      </div>
    </div>
  );
};

export default HowItWorks;
