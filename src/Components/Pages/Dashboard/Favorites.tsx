import { Grid } from "@mui/material";

import Head from "next/head";
import Image from "next/image";
import * as React from "react";
import { connect } from "react-redux";
import AdminProductCard from "../../Cards/AdminProductCard";
import ProductCard from "../../Cards/ProductCard";
import withAuth from "../../../helpers/withAuth";
import { tokenActions } from "../../../redux/actions";

function Favorites(props: any) {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [filteredResults, setFilteredResults] = React.useState([]);

  React.useEffect(() => {
    props.getAllProposedLikedTokens();
    props.getAllOriginalLikedTokens();
  }, []);

  const { loading, favoriteProposedTokens, favoriteOriginalTokens } = props;

  return (
    <React.Fragment>
      <Head>
        <title>Favorites | 100NFT Brands</title>
      </Head>
      <Grid container direction="column">
        <div className="bg-[#fafafa] shadow-paper relative overflow-hidden h-[7em] md:h-[10em] w-full px-8 md:px-12 py-4 rounded-[20px]   mb-[1.5em] md:mb-0 ">
          <div className="flex justify-between items-center">
            <div className="flex flex-col justify-evenly gap-3">
              <div className="gradient-text font-bold text-[26px] bg-gradient-to-r from-[#A01AEC] via-[#CB527D] to-[#DF9361] bg-clip-text fill-transparent">
                Favorites
              </div>
              <div className="text-[12px] text-[#707070]  font-light hidden md:block">
                Browse through your gallery of saved items
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

        {!loading && (
          <div>
            {favoriteOriginalTokens?.length > 0 ? (
              <div className="bg-[#fff] shadow-paper rounded-[1.8em] my-4 p-4 md:p-8 ">
                <div className="items-start justify-center grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-4">
                  {Array.isArray(favoriteOriginalTokens) &&
                    favoriteOriginalTokens?.map((value: any, i: any) => (
                      <div className="w-full" key={i}>
                        <AdminProductCard token={value} />
                      </div>
                    ))}
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        )}

        {!loading && (
          <div>
            {Array.isArray(favoriteProposedTokens) &&
            favoriteProposedTokens?.length > 0 ? (
              <div className="bg-[#fff] shadow-paper rounded-[1.8em] my-4 p-4 md:p-8">
                <div className="items-start justify-center grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-4">
                  {favoriteProposedTokens?.map((value: any, i: any) => (
                    <div className="w-full" key={i}>
                      <ProductCard token={value} />
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        )}

        {!searchTerm.length &&
          !favoriteOriginalTokens?.length &&
          !favoriteProposedTokens?.length && (
            <div className="justify-start mt-20">
              <div className="text-[#E25822] font-bold text-center">
                You do not have any liked items yet!
              </div>
            </div>
          )}
      </Grid>
    </React.Fragment>
  );
}

function mapState(state: any) {
  const { loading, favoriteProposedTokens, favoriteOriginalTokens } =
    state.token;
  return { loading, favoriteProposedTokens, favoriteOriginalTokens };
}

const actionCreators = {
  getAllProposedLikedTokens: tokenActions.getAllProposedLikedTokens,
  getAllOriginalLikedTokens: tokenActions.getAllOriginalLikedTokens,
};

const ConnectedFavoritesPage = connect(mapState, actionCreators)(Favorites);
export default withAuth(ConnectedFavoritesPage);
