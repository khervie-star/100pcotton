import React from "react";
import image from "../../Assets/images/howItWorks.png";
import Image from "next/image";
const Content = () => {
  return (
    <div>
      <div className="md:p-4">
        <section id="Abstract" className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Abstract</h2>
          <p>
            100pCotton is an innovative clothing brand combining the realms of
            NFTs (Non-Fungible Tokens) and fashion. By utilizing blockchain
            technology, our goal is to pioneer a unique reward and royalty
            system that adds a layer of engagement and excitement to the simple
            act of purchasing a T-shirt. Our novel approach centers on community
            participation in the creative process, with contributors receiving a
            20% royalty of the total sale price whenever a shirt bearing their
            phrase sells. This whitepaper outlines the project&apos;s
            objectives, the technology involved, the tokenomics, and the roadmap
            of our venture.
          </p>
        </section>
        <section id="Introduction" className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Introduction</h2>
          <p>
            The advent of Non-Fungible Tokens (NFTs) has induced a paradigm
            shift in the art industry, revolutionizing how we perceive, trade,
            and value artwork. This technology has bridged the gap between
            artists and collectors, offering a secure, transparent platform for
            direct interaction. The fashion industry is still in its early
            stages of the NFT revolution. In fashion, NFTs offer the potential
            to tokenize limited-edition items, virtual fashion, or accessories,
            providing proof of authenticity, exclusivity, and provenance. This
            ability facilitates the collection and trade of digital fashion
            items. However, at 100pCotton, we&apos;ve recognized that NFTs&apos;
            potential extends beyond the digital metaverse, leveraging them as a
            novel checkout mechanism to share 20% of all sales revenue with
            community members participating in our unique model.
          </p>
        </section>
        <section id="OurUtility" className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Our Utility</h2>
          <p>
            Our Utility: At 100pCotton, we have innovatively repurposed NFTs as
            a royalty mechanism to award our community members a share of the
            sales made. Our unique model operates as follows: Firstly, we offer
            a model sentence with an empty blank for individuals to contribute
            their creative word input. Secondly, members must buy a shirt
            featuring a phrase completed by a prior user. Upon obtaining this
            NFT-embellished t-shirt (or &apos;NFTee&apos;), we verify its
            authenticity on the blockchain. This verification enables them to
            propose a word addition to fill the blank in our model sentence.
            Subsequently, whenever a sale is made on a shirt bearing their
            completed phrase, they receive a 20% share of the sale ($7 from a
            $35 shirt) directly deposited into their crypto wallet. <br />
            Furthermore, they retain the option to auction off their 20% rights
            to the highest bidder at their discretion. We provide a transparent
            view of the shirt&apos;s sales volume, aiding members in assessing
            the reasonableness of the auction price. Participation in the
            creative process is entirely optional. Members can still enjoy our
            stylish Tees and save their NFTs for future discounts, exclusive
            merchandise, and other rewards.
          </p>
        </section>
        <section id="TargetAudience" className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Target Audience</h2>
          <p>
            Our target audience falls into two primary categories: web3
            enthusiasts and traditional web2 online shoppers.
            <ul className="my-3">
              <li>
                <span className="font-bold text-[18px] text-primary2">
                  Web3 Enthusiasts:
                </span>{" "}
                These individuals deeply involved in the crypto world exhibit
                fluency in and enthusiasm for exploring numerous projects. Their
                knowledge in setting up wallets, configuring main net networks,
                and interacting with intelligent contracts enables us to convey
                our message to them efficiently.
              </li>
              <li>
                <span className="font-bold text-[18px] text-primary2">
                  Traditional Web2 E-shoppers:
                </span>{" "}
                This demographic, although not currently engaged with the
                offerings of web3, presents a potential market waiting to be
                tapped. 100pCotton is poised to catalyze to shift their interest
                towards web3, demonstrating the practical utility of NFTs and
                smart contracts in the context of everyday online shopping. We
                foresee a market shift once these individuals recognize the
                innovation of NFTs and their integration with fashion.
              </li>
            </ul>
            To facilitate this transition, we are devising a dedicated
            onboarding process for web2 migrants, including online seminars,
            streaming, and personalized group training sessions.
          </p>
        </section>

        <section id="OurFirstShirtDesign" className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Our First Shirt Design</h2>
          <p>
            The first design will feature an incomplete phrase{" "}
            <strong>&quot;100% ___ (blank)&quot;</strong>, providing ample room
            for creative inputs from the community. Members then put words like
            <strong>
              {" "}
              “100% blessed, “100% stylish,” “100% based,” “100% committed,”
              “100% grateful,” “100% …
            </strong>{" "}
            There are a few hundred possibilities. Our next incomplete phrase
            will be voted on by our community.
          </p>
          <div className="relative w-[200px] mx-auto ">
            <Image src={image} alt="" />
          </div>
        </section>

        <section id="CommunityBuilding" className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Community Building</h2>
          <p>
            Our community-centric approach insists that only members can
            contribute words to our shirts, fostering a sense of exclusivity and
            ownership. Participation is voluntary, with members free to save
            their NFTees for future rewards.
            <br /> Our primary channels for community growth include Twitter,
            Discord, and Instagram. Secondary avenues include YouTube, TikTok,
            Reels, Facebook Watch, and LinkedIn.
            <br /> Discord will be the platform for announcements and voting.
            <br />
            Our content strategy focuses on gradual, organic growth, with daily
            short video posts ramping up to twice daily.
          </p>
        </section>

        <section id="MemberRetention" className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Member Retention</h2>
          <p>
            To ensure member retention, we will implement a rotating coupon
            system as outlined in our roadmap. NFTs will function as discount
            coupons for future purchases, and to maintain the relevance of
            previous acquisitions, we will periodically rotate the discount
            rates associated with each NFT.
            <br /> For instance, if we have 10 model phrases (A through J), in
            one week, models A, E, and G might offer discounts of 35%, 25%, and
            15%, respectively. The following week, different models will be
            selected for these discount rates. This approach promotes continuous
            engagement and participation from our members.
            <br /> Another feature we want to add is that when a customer uses
            said NFT to discount their order of non customizable shirts, shoes,
            pants, hats, etc .., then depending on the word on the NFTee, we
            will share 10% of the entire sale with the NFT proposer (on top of
            the 20% they earned from selling their shirt). The reward options
            are endless with us!
          </p>
        </section>

        <section id="Roadmap" className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Roadmap</h2>
          <ol className="my-3 list-decimal flex flex-col gap-3">
            <li>
              <span className="text-primary2 font-bold">Initial Launch:</span>{" "}
              Our inaugural model will feature the phrase{" "}
              <strong>&quot;100% __&quot;</strong>. We intend to release a new
              phrase every two months, with the community voting for the next
              phrase drop.
            </li>
            <li>
              <span className="text-primary2 font-bold">
                Product Expansion:
              </span>{" "}
              After introducing 2-3 model phrases, we will diversify our product
              range to include other apparel items like long-sleeve shirts,
              hoodies, pants, hats, shoes, etc. Some will offer customization
              options.
            </li>
            <li>
              <span className="text-primary2 font-bold">
                Tokenomics Enhancement:
              </span>{" "}
              At this stage, we will transform your NFTees into discount coupons
              applicable to your entire order. This will maintain the relevance
              of past phrases by rotating the discount rates tied to different
              models, encouraging purchases of previous phrases.
            </li>
            <li>
              <span className="text-primary2 font-bold">
                In-House Production:
              </span>{" "}
              To improve quality control, we plan to transition from third-party
              vendors and drop-shipping to in-house production. We are currently
              exploring potential factory partnerships and suppliers. Our
              T-shirts are currently printed in house, but other items are not.
              We will transition everything in-house.
            </li>
            <li>
              <span className="text-primary2 font-bold">
                Further Tokenomics Exploration:
              </span>{" "}
              <ol className="list-none indent-6 my-3 flex flex-col gap-2">
                <li className="">
                  <span className="font-bold mr-2">a.</span>Allowing you to
                  obtain more than 20% royalty on your phrases via NFT stacking.
                </li>
                <li>
                  <span className="font-bold mr-2">b.</span>
                  Allow you to use your NFTees to enter an earning pool within a
                  time window of your choice. For example, if you and 20 people
                  enter an earning pool between 1pm and 3pm, then 20% of all
                  sales made in that time window will be split among you all.
                  And yes, the proposer will still earn their royalties.
                </li>
                <li>
                  <span className="font-bold mr-2">c.</span>
                  Allow you to propose more than one word if you achieve certain
                  privileges (more on this later).
                </li>{" "}
                <li>
                  <span className="font-bold mr-2">d.</span>
                  Give special members a “switch” to only show their words in
                  certain time windows?? (the community will vote on this).
                </li>{" "}
                <li>
                  <span className="font-bold mr-2">e.</span>
                  When a customer uses your NFTee to discount their order of non
                  customizable shirts, shoes, pants, hats, etc .., then we will
                  share 10% of the entire sale with the NFT proposer (on top of
                  the 20% they earned from selling their shirt).
                </li>{" "}
                <li>
                  <span className="font-bold mr-2">f.</span>
                  And many more! You can already see how creative we can get.
                  And we are always looking for your feedback.
                </li>
              </ol>
            </li>
            <li>
              <span className="text-primary2 font-bold">Exclusive Club: </span>{" "}
              Ownership of 10 replicas, for example, will grant access to an
              exclusive club with high-end clothing lines available only to
              certain members.
            </li>
            <li>
              <span className="text-primary2 font-bold">
                Promotional Headline Space:
              </span>{" "}
              We may offer you headline space on our website to promote your
              completed words.
            </li>
            <li>
              <span className="text-primary2 font-bold">
                Website Improvement:
              </span>{" "}
              We will strive to enhance our website and overall user experience.
            </li>
            <li>
              <span className="text-primary2 font-bold">
                Metaverse Integration:
              </span>{" "}
              Tentatively exploring potential metaverse opportunities (e.g.,
              virtual shopping).
            </li>
            <li>
              <span className="text-primary2 font-bold">
                Text to Memes Transition:
              </span>{" "}
              We aim to allow users to write sentences to dress memes on shirts.
            </li>
            <li>
              <span className="text-primary2 font-bold">
                Phrase to Image Transition:
              </span>{" "}
              We envisage providing base cartoons for users, integrating Large
              Language Models (LLMs) to draw pictures based on sentences written
              by users. These cartoons are either created in-house or via
              partnerships with other projects:
              <ol className="list-[lower-alpha] indent-6 my-3">
                <li className="mb-2">
                  <span className="text-primary2 font-semibold">
                    NFT Art Route:
                  </span>{" "}
                  We are considering the potential of creating an IP image NFT
                  art route that provides dual benefits: royalty for the
                  character holder, and royalty for the member who drew an image
                  of that character on T-shirts.
                </li>
                <li>
                  <span className="text-primary2 font-semibold">
                    Partnerships:
                  </span>{" "}
                  We will explore potential partnerships with other projects,
                  characters, or even TV show cartoons and anime characters.
                </li>
              </ol>
            </li>
            <li>
              <span className="text-primary2 font-bold">
                LLMs and Kid-friendly Environment:
              </span>{" "}
              We will deploy LLMs to ensure that no inappropriate images or
              words are used, maintaining a kid-friendly environment.
            </li>
            <li>
              <span className="text-primary2 font-bold">Rebranding:</span> At
              the one-year mark, subject to community approval, we will consider
              rebranding, including a new name, logo, and experience to attract
              more web2 consumers.
            </li>
            <li>
              <span className="text-primary2 font-bold">
                Shoes Customization:
              </span>{" "}
              We have plans to customize shoes, which will be revealed after
              establishing our brand. This would allow you to earn royalties on
              shoes and shirts.
            </li>
          </ol>
        </section>

        <section id="GamifyingTheNFTeeExperience" className="mb-8">
          <h2 className="text-2xl font-bold mb-4">
            Gamifying the NFTee Experience
          </h2>
          <p>
            As part of our roadmap, we&apos;ve highlighted our interest in
            stacking NFTs for added features and enhanced reward experiences. We
            aim to leverage the full capabilities of NFTs, such as state
            compression, model swaps, and xNFTs. A significant portion of our
            investment will go towards enhancing the user experience. We aim to
            transform interactions with NFTs, coupons, and rewards, making them
            as engaging as a video game and maintaining high consistency. Stay
            tuned for more updates on this front.
          </p>
        </section>

        <section id="Conclusion" className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Conclusion</h2>
          <p>
            100pCotton represents a revolutionary merge of the fashion industry
            and NFTs, crafting an innovative reward and royalty system. By
            capitalizing on blockchain technology, we aim to make T-shirt
            purchases enjoyable, engaging, and rewarding for community members.
            The heart of our concept lies in community participation -
            individuals complete phrases on T-shirts, unlocking their sale and
            earning 20% of the sale price, deposited directly into their crypto
            wallets.
            <br /> This whitepaper overviews the project&apos;s objectives,
            underlying technology, tokenomics, and roadmap. Despite NFTs
            significantly influencing sectors such as art, gaming,
            entertainment, and collectibles, their adoption in the fashion
            industry remains in its infancy. 100pCotton will disrupt this by
            tokenizing fashion items and introducing an innovative NFT checkout
            mechanism, rewarding community members for their active engagement
            and contributions. Through our innovative approach, 100pCotton seeks
            to introduce the benefits of NFTs to the fashion world. We are
            creating an environment where enthusiasts can collect and trade
            digital and physical fashion items while fostering a robust and
            interactive community. Our vision is to pioneer the integration of
            web3 technologies with everyday consumer goods, thereby
            democratizing access to the benefits of blockchain technology
            sessions.
          </p>
        </section>

        {/* Add more sections as needed */}
      </div>
    </div>
  );
};

export default Content;
