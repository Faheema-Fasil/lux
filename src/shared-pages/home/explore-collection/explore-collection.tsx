import React from "react";
import Collections from "../collections";
import Link from "next/link";
import {
  fetchExploreCollectionsApi,
  fetchProductDetails,
  fetchProductImageApi,
} from "@/server-api/apifunctions/apiService";

const ExploreCollection = async ({ titles }: any) => {
  const categoryId = titles.home_collection_category[0];
  const cards = await fetchExploreCollectionsApi(categoryId);
  const productsWithMedia = await Promise.all(
    cards.data.map(async (product: any) => {
      try {
        //console.log("product",product)
        // const mediaId = product.id;
        let mediaSourceUrl = null;
        const mediaRes = await fetchProductDetails(product.id);
        mediaSourceUrl = mediaRes.images[0].src || null;
        return {
          ...product,
          media_source_url: mediaSourceUrl,
        };
      } catch (mediaError) {
        console.error(`Error fetching media for product ${product.id}:`, mediaError);
        return {
          ...product,
          media_source_url: null,
        };
      }
    })
  );
  // const productsWithMedia = await Promise.all(
  //   cards.data.map(async (product: any) => {
  //     try {
  //       //console.log("product",product)
  //       // const mediaId = product.id;
  //       let mediaSourceUrl = null;
  //         const mediaRes = await fetchProductDetails(product.id);
  //         mediaSourceUrl = mediaRes.source_url || null;
  //       return {
  //         ...product,
  //         media_source_url: mediaSourceUrl,
  //       };
  //     } catch (mediaError) {
  //       console.error(
  //         `Error fetching media for product ${product.id}:`,
  //         mediaError
  //       );
  //       return {
  //         ...product,
  //         media_source_url: null,
  //       };
  //     }
  //   })
  // );

  //console.log("productsWithMedia",productsWithMedia)
  return (
    <div className="mx-auto ">
      <div id="card-menu" className="md:pt-10 mx-auto w-full">
        <div className="mx-auto px-4 pb-12">
          <div className="mx-auto md:pt-12 ">
            {/* Header for the product grid */}
            <div className="flex justify-center">
              <div className="flex flex-col md:flex-row gap-5 justify-between items-center mb-8 container">
                <h2 className="text-[30px] md:text-[40px] text-center md:text-left font-normal text-gray-800">
                  {titles?.home_our_collection_title}
                </h2>
                <Link
                  href={"/gallery"}
                  // href={titles.home_our_collection_shop_button_link}
                  className="border text-sm md:text-md border-black text-black rounded-full py-2 px-2 md:px-6 uppercase hover:bg-gray-200 hover:border-gray-200 hover:text-gray-800"
                >
                  {titles?.home_our_collection_shop_button_text}
                </Link>
              </div>
            </div>

            {/* Product Grid */}
            <div className="">
              <Collections products={productsWithMedia} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExploreCollection;
