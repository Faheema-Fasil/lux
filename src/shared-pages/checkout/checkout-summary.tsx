import CustomFields from "@/components/cart/custom-field";
import { formatPrice, getCustomImage } from "@/helper/helper";
import React from "react";
import PriceSection from "../cart/price-section";
import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const CheckoutSummary = ({
  productData,
  handleFormSubmit,
  currency,
  totals,
  items,
  isdisabled = false,
}: any) => {
  const { selected_country } = useSelector((state: RootState) => state.cart);
  return (
    <div className="w-full lg:w-1/3 mt-14 md:mt-0">
      <div className="sticky top-[120px] bg-white shadow-md border rounded-lg p-4 mt-3 ">
        <h2 className="text-2xl font-semibold mb-4 text-black">
          Order Summary
        </h2>

        {productData?.map((item: any) => {
          // const cardImage =
          //   item.item.cart_item_data?.wcpa_data?.sec_0671f4cac4b395
          //     ?.fields[0][0]?.value === "customized product"
          //     ? item.item.cart_item_data?.wcpa_data?.sec_0671f4cac4b395
          //         ?.fields[0][0]?.value
          //     : item.item.featured_image;

          const customImage = getCustomImage(item.item);

          // const wcpaData = item.item.cart_item_data?.wcpa_data;
          const color =
            (item.item.meta?.variation as Record<string, string>)[
              "CHOOSE COLOR"
            ] ||
            (item.item.meta?.variation as Record<string, string>)[
              "Metal Finish"
            ];

          return (
            <div
              key={item.item.id}
              className="w-full h-auto bg-white rounded overflow-x-auto mt-5"
            >
              <div className="w-full flex items-center py-2 px-0 border-b border-gray-100">
                {typeof customImage === "string" ? (
                  <div
                    className="w-[80px] flex-shrink-0 mr-2"
                    style={{
                      width: "82px",
                      height: "62px",
                      // overflow: "hidden",
                      position: "relative",
                    }}
                  >
                    <Image
                      src={customImage ? customImage : item.imageUrl}
                      alt={item.item.title}
                      layout="fill"
                      // height={250}
                      // width={350}
                      objectFit="cover"
                      style={{
                        objectPosition: "left center",
                      }}
                    />
                  </div>
                ) : (
                  <div className="w-[70px] flex-shrink-0 mr-2">
                    <Image src={item.imageUrl} width={80} height={40} alt="" />
                  </div>
                )}

                <div className="flex flex-col w-full">
                  <a className="text-sm font-medium text-gray-700">
                    {item.item.name}
                  </a>
                  <span className="text-xs text-gray-400">
                    Variation : {color}
                  </span>
                  <div className="flex justify-between mt-1">
                    <p className="text-sm font-semibold">Qty: {item.item.quantity.value}</p>
                    <p className="text-sm font-bold text-[#b88c4f]">
                      {formatPrice(item.item.price)}
                    </p>
                  </div>
                </div>
              </div>
              {/* Table view for product details and add-on prices */}

              {item.item.cart_item_data?.wcpa_data && (
                <CustomFields item={item.item} />
              )}
            </div>
          );
        })}

        <div className=" border-gray-200 pt-4 mt-4">
          <PriceSection
            totals={totals}
          />
          <button
            onClick={handleFormSubmit}
            className="flex items-center justify-center w-full px-4 py-2.5 text-sm font-bold text-white transition-all border border-[#b88c4f] duration-200 bg-[#b88c4f] hover:text-[#b88c4f] hover:bg-[#e4dfc9]"
            // disabled={isdisabled}
            style={{
              opacity: isdisabled ? 0.5 : 1,
              cursor: isdisabled ? "not-allowed" : "pointer",
            }}
          >
            <span className="sr-only">Place your order</span>
            {status === "loading" ? "Loading..." : "Pay Now"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSummary;
