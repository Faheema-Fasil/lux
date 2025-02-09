"use client";
import { CustomFields } from "@/components/cart/custom-field";
import { AppDispatch, RootState } from "@/redux/store";
import { deleteCartItem } from "@/redux/store/cart";
import { formatPrice, getCustomImage } from "@/helper/helper";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PriceSection from "./price-section";
import { AxiosError } from "axios";
import { CouponProps } from "@/types/cart/types";
import { toast } from "react-toastify";
import { useProductImageContext } from "@/components/context/product-image-context";
import { cartTexts } from "@/helper/constants";

// interface WcpaData {
//   sec_0671f4cac4b395: {
//     fields: any[][];
//   };
// }

// interface CartItemData {
//   wcpa_data: WcpaData;
// }

const MyCart = () => {
  const [coupons, setCoupons] = useState<CouponProps[]>([]);
  const [deleteStatus, setDeleteStatus] = useState<"submitting" | "success" | "error">();
  const [loading, setLoading] = useState(true);
  const [deleteItemKey, setDeleteItemKey] = useState<string | number>();
  // const [productData, setProductData] = useState<
  //   Array<{ item: any; imageUrl: string }>
  // >([]);

  const dispatch: AppDispatch = useDispatch();
  const { items, totals, currency } = useSelector((state: RootState) => state.cart);
  const { productData } = useProductImageContext();

  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    setCoupons([
      {
        code: "FLAT10",
        amount: 10,
      },
      {
        code: "FLAT20",
        amount: 20,
      },
    ]);
  }, []);

  const deleteFromCart = async (key: string) => {
    try {
      setDeleteItemKey(key);
      setDeleteStatus("submitting");
      const responseData = await dispatch(deleteCartItem(key));

      if (deleteCartItem.fulfilled.match(responseData)) {
        // //console.log(responseData);
        setDeleteStatus("success");
        toast.success("Deleted Item successfully");
      }
    } catch (error: unknown) {
      handleDeleteError(error);
    }
  };

  const handleDeleteError = (error: unknown) => {
    setDeleteStatus("error");
    if (error instanceof AxiosError && error.response?.data?.message) {
      toast.error(error.response.data.message);
    } else {
      toast.error("An error occurred while deleting the product.");
    }
  };

  return (
    <section className="container h-auto  mx-auto mt-5 mb-10">
      <h6 className="mb-2 text-lg font-semibold text-left text-default-600">
        {cartTexts.mycart}:{" "}
        <span className="text-[#b88c4f]">
          {items.length} {cartTexts.items}
        </span>
      </h6>
      <div className="mx-auto">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="w-full lg:w-2/3 ">
            <div className="bg-white shadow-md border rounded-lg p-4 lg:p-4 my-3">
              <div className="flex justify-between items-center mb-5">
                <h2 className="text-2xl font-semibold">{cartTexts.youritems}</h2>
                {/* <!-- <button className="text-red-500 hover:text-red-600 flex items-center">
                                <i data-feather="trash-2"></i>
                                <span className="ml-1"> Remove All</span>
                            </button> --> */}
              </div>

              {/* Change this to display every item with unique item keys */}
              {productData &&
                productData.map((item: any) => {
                  const customImage = getCustomImage(item.item);
                  //console.log("customImage", customImage);

                  const color =
                    (item.item.meta?.variation as Record<string, string>)["CHOOSE COLOR"] ||
                    (item.item.meta?.variation as Record<string, string>)["Metal Finish"];

                  return (
                    <div key={item.item.item_key} className=" gap-4 border-b mb-6 pb-3">
                      <div className="flex flex-col justify-center md:flex-row items-center gap-5 md:gap-2 md:items-start">
                        {typeof customImage === "string" ? (
                          <div className="grid mr-2">
                            <div
                              className="absolute mt-6"
                              style={{
                                width: "140px",
                                height: "105px",
                                // overflow: "hidden",
                                position: "relative",
                              }}
                            >
                              <Image
                                src={customImage}
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
                          </div>
                        ) : (
                          // <div className="w-[140px] flex-shrink-0 mr-2 flex justify-center items-center">
                          //   <Image src={item.imageUrl} width={180} height={50} alt="" />
                          // </div>
                          <div className="h-36 w-[140px] mr-2 relative group">
                            <Image
                              src={item.imageUrl}
                              alt="Product image"
                              width={150}
                              height={150}
                              className="w-full h-full object-contain rounded-lg group-hover:scale-100 transition-all duration-300 ease-in-out"
                              loading="lazy"
                            />
                          </div>
                        )}

                        <div className="flex-1 w-full">
                          <div className="flex flex-col md:flex-row md:justify-between justify-center items-center mr-2">
                            <div>
                              <h3 className="text-lg font-semibold md:text-left text-center text-gray-900">
                                {item.item.name}
                              </h3>
                              <p className="text-md text-gray-600 md:text-left text-center">
                                {cartTexts.variation} : {color}
                              </p>
                              <p className="text-xs md:text-md mt-0 md:mt-1 flex justify-center md:items-start md:justify-start items-center">
                                Qty: {item.item.quantity.value}
                              </p>
                            </div>
                            <div>
                              <div className="flex items-center md:mt-5">
                                <div className="w-full flex flex-col items-end justify-between lg:justify-between lg:pt-0 lg:max-w-md">
                                  <span className="text-[#b88c4f]">{formatPrice(item?.item?.price || 0)}</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className=" items-center justify-start mt-3  bg-white text-gray-600 rounded-md">
                            {item.item.cart_item_data?.wcpa_data && <CustomFields item={item.item} />}

                            {/* <ul className="!list-disc ps-4 text-[11px] text-gray-600">
                            {item.cart_item_data && item.cart_item_data?.wcpa_data && (item.cart_item_data?.wcpa_data as any).sec_0671f4cac4b395 && Array.isArray((item.cart_item_data?.wcpa_data as any).sec_0671f4cac4b395?.fields) &&
                              (item.cart_item_data.wcpa_data as any).sec_0671f4cac4b395.fields
                                .slice(1)
                                .map((fieldGroup: any[], groupIndex: number) => {
                                  const firstField = fieldGroup[0];
                                  const renderValue = () => {
                                    if (Array.isArray(firstField.value)) {
                                      return (
                                        <span className="inline-block">
                                          {Array.isArray(firstField?.value) && firstField.value.map((val: any, valIndex: number) => (
                                            <span key={valIndex} className="mr-2">
                                              {val && typeof val === 'object' ? val.label || val.value || JSON.stringify(val) : val}
                                            </span>
                                          ))}
                                        </span>
                                      );
                                    } else if (typeof firstField.value === "object" && firstField.value !== null) {
                                      const firstItem = firstField.value[Object.keys(firstField.value)[0]];
                                      return firstItem ? firstItem.label || firstItem.value || JSON.stringify(firstItem) : "N/A";
                                    } else if (firstField.value) {
                                      return firstField.value;
                                    } else {
                                      return "N/A";
                                    }
                                  };
                                  return (
                                    <li key={`${groupIndex}-firstField`}>
                                      {firstField.label}: {renderValue()}
                                    </li>
                                  );
                                })}
                          </ul> */}

                            {/* Quantity change button */}
                            {/* <button>
                            <span className="text-dark text-base">
                              <svg
                                stroke="currentColor"
                                fill="none"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                height="1em"
                                width="1em"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <line x1="5" y1="12" x2="19" y2="12"></line>
                              </svg>
                            </span>
                          </button>
                          <p className="text-sm font-semibold text-dark px-1">1</p>
                          <button>
                            <span className="text-dark text-base"><svg xmlns="http://www.w3.org/2000/svg" stroke="currentColor" fill="none"
                              stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round"
                              stroke-linejoin="round" height="1em" width="1em">
                              <line x1="12" y1="5" x2="12" y2="19"></line>
                              <line x1="5" y1="12" x2="19" y2="12"></line>
                            </svg>
                            </span>
                          </button> */}
                          </div>
                        </div>
                      </div>

                      {/* <div className="flex space-x-2 itemms-center lg:justify-end justify-between">
                          <div className="flex-1 pt-2">
                            <p className="text-xs text-gray-600">
                              When you order in 23 hrs 19 mins
                            </p>
                            <p className="text-xs text-green-500">
                              Expected Delivery : Friday, May 24
                            </p>
                          </div>
                        </div> */}

                      <div className="flex space-x-2 itemms-center lg:justify-end justify-between pt-3">
                        {/* <a
                          className="flex items-center justify-center gap-1 group px-2 py-1 text-sm font-bold text-center text-gray-500 transition-all duration-200 hover:text-[#b88c4f]  hover:bg-[#e4dfc9] "
                          href=""
                        >
                          <svg
                            className="w-[18px] fill-gray-500  group-hover:fill-[#b88c4f]"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 100 100"
                          >
                            <path
                              id="Add_to_Favorite"
                              d="m50 91c-2.733 0-5.306-1.065-7.242-2.999v-.001l-33.129-33.129c-4.919-4.919-7.629-11.459-7.629-18.417v-.407c0-6.958 2.71-13.499 7.629-18.417s11.461-7.63 18.416-7.63h.41c6.955 0 13.497 2.71 18.416 7.629l3.129 3.129 3.129-3.129c4.919-4.919 11.461-7.629 18.416-7.629h.41c6.955 0 13.497 2.71 18.416 7.629s7.629 11.459 7.629 18.417v.407c0 6.958-2.71 13.499-7.629 18.417l-33.129 33.13c-1.936 1.935-4.509 3-7.242 3zm-3-7.242c1.608 1.605 4.395 1.601 6-.001l33.129-33.127c3.785-3.788 5.871-8.821 5.871-14.176v-.407c0-5.355-2.086-10.389-5.871-14.175s-8.821-5.872-14.174-5.872h-.41c-5.353 0-10.389 2.084-14.174 5.871l-5.25 5.25c-1.172 1.172-3.07 1.172-4.242 0l-5.25-5.25c-3.785-3.787-8.821-5.871-14.174-5.871h-.41c-5.353 0-10.389 2.084-14.174 5.871s-5.871 8.82-5.871 14.175v.407c0 5.355 2.086 10.389 5.871 14.175z"
                            ></path>
                          </svg>
                          <span className="text-[10px]">Add to Wishlist</span>
                        </a> */}

                        {/* <a
                          className="flex items-center justify-center gap-1 group px-2 py-1 text-sm font-bold text-center text-gray-500 transition-all duration-200 hover:text-[#b88c4f]  hover:bg-[#e4dfc9] "
                          href=""
                        >
                          <svg
                            className="w-[18px] fill-gray-500 group-hover:fill-[#b88c4f]"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                          >
                            <g>
                              <g>
                                <path
                                  d="M467,120h-61.041C415.397,107.456,421,91.871,421,75c0-41.355-33.645-75-75-75c-24.911,0-43.28,8.925-57.809,28.087
                                                    C276.036,44.119,267.148,66.503,256,94.785c-11.148-28.283-20.036-50.666-32.191-66.698C209.28,8.925,190.911,0,166,0
                                                    c-41.355,0-75,33.645-75,75c0,16.871,5.603,32.456,15.041,45H45c-24.813,0-45,20.187-45,45v30c0,19.555,12.541,36.228,30,42.42
                                                    V467c0,24.813,20.187,45,45,45h362c24.813,0,45-20.187,45-45V237.42c17.459-6.192,30-22.865,30-42.42v-30
                                                    C512,140.187,491.813,120,467,120z M283.534,106.74C306.513,48.442,315.249,30,346,30c24.813,0,45,20.187,45,45s-20.187,45-45,45
                                                    h-67.713C280.125,115.385,281.878,110.942,283.534,106.74z M166,30c30.751,0,39.487,18.442,62.466,76.74
                                                    c1.656,4.202,3.409,8.645,5.247,13.26H166c-24.813,0-45-20.187-45-45S141.187,30,166,30z M196,482H75c-8.271,0-15-6.729-15-15V240
                                                    h136V482z M196,210H45c-8.271,0-15-6.729-15-15v-30c0-8.271,6.729-15,15-15h151V210z M286,482h-60V150c3.143,0,42.76,0,60,0V482z
                                                     M452,467c0,8.271-6.729,15-15,15H316V240h136V467z M482,195c0,8.271-6.729,15-15,15H316v-60h151c8.271,0,15,6.729,15,15V195z"
                                ></path>
                              </g>
                            </g>
                          </svg>
                          <span className="text-[10px]">Add to Gift Wrap</span>
                        </a> */}
                        <button
                          type="button"
                          onClick={() => {
                            deleteFromCart(item.item.item_key);
                          }}
                          className="text-[10px] flex items-center"
                        >
                          <div className="flex items-center justify-center gap-1 group px-2 py-1 text-sm font-bold text-center text-gray-500 transition-all duration-200 hover:text-[#b88c4f]  hover:bg-[#e4dfc9] ">
                            <svg
                              className="w-[18px] fill-gray-500 group-hover:fill-[#b88c4f]"
                              id="fi_3096673"
                              enableBackground="new 0 0 512 512"
                              viewBox="0 0 512 512"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g>
                                <path d="m424 64h-88v-16c0-26.467-21.533-48-48-48h-64c-26.467 0-48 21.533-48 48v16h-88c-22.056 0-40 17.944-40 40v56c0 8.836 7.164 16 16 16h8.744l13.823 290.283c1.221 25.636 22.281 45.717 47.945 45.717h242.976c25.665 0 46.725-20.081 47.945-45.717l13.823-290.283h8.744c8.836 0 16-7.164 16-16v-56c0-22.056-17.944-40-40-40zm-216-16c0-8.822 7.178-16 16-16h64c8.822 0 16 7.178 16 16v16h-96zm-128 56c0-4.411 3.589-8 8-8h336c4.411 0 8 3.589 8 8v40c-4.931 0-331.567 0-352 0zm313.469 360.761c-.407 8.545-7.427 15.239-15.981 15.239h-242.976c-8.555 0-15.575-6.694-15.981-15.239l-13.751-288.761h302.44z"></path>
                                <path d="m256 448c8.836 0 16-7.164 16-16v-208c0-8.836-7.164-16-16-16s-16 7.164-16 16v208c0 8.836 7.163 16 16 16z"></path>
                                <path d="m336 448c8.836 0 16-7.164 16-16v-208c0-8.836-7.164-16-16-16s-16 7.164-16 16v208c0 8.836 7.163 16 16 16z"></path>
                                <path d="m176 448c8.836 0 16-7.164 16-16v-208c0-8.836-7.164-16-16-16s-16 7.164-16 16v208c0 8.836 7.163 16 16 16z"></path>
                              </g>
                            </svg>

                            {deleteStatus === "submitting" && deleteItemKey === item.item.item_key ? (
                              <svg
                                className="animate-spin h-4 w-4 text-gray-500 mr-1"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                              >
                                <circle
                                  className="opacity-25"
                                  cx="12"
                                  cy="12"
                                  r="10"
                                  stroke="currentColor"
                                  strokeWidth="4"
                                ></circle>
                                <path
                                  className="opacity-75"
                                  fill="currentColor"
                                  d="M4 12a8 8 0 018-8v1.5a6.5 6.5 0 100 13V20a8 8 0 01-8-8z"
                                ></path>
                              </svg>
                            ) : (
                              <span className="text-[10px]">{cartTexts.remove}</span>
                            )}
                          </div>
                        </button>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>

          <div className="w-full lg:w-1/3">
            <div className="bg-white shadow-md border rounded-lg p-6 md:p-4 mt-3 ">
              <h2 className="text-2xl font-semibold mb-4">{cartTexts.cartsummary}</h2>

              <div className="relative mb-3">
                <div className="flex mt-1 mb-2">
                  <input
                    type="text"
                    id="coupon"
                    className="flex-1 block w-full px-3 py-3 border border-gray-300 rounded-l-md focus:outline-none focus:[#b88c4f] focus:border-[#b88c4f] sm:text-sm"
                    placeholder="Enter coupon code"
                  />
                  <button
                    onClick={(e) => {
                      toast.error("Coupon code is invalid");
                    }}
                    className="bg-[#b88c4f] text-white px-4 py-2 rounded-r-md hover:bg-[#e4dfc9] hover:text-[#b88c4f] transition-all duration-300"
                  >
                    {cartTexts.apply}
                  </button>
                </div>

                {/* <div
                  id="suggestions"
                  className=" z-10 w-full bg-white border border-dotted border-gray-300 rounded-md mt-1 p-3"
                >
                  {coupons &&
                    coupons.map((coupon, index) => (
                      <div
                        className="border-b border-gray-200 pb-2 mb-2"
                        key={index}
                      >
                        <div className="flex justify-between items-center px-3 py-2">
                          <div>
                            <span className="font-semibold text-[#b88c4f]">
                              {coupon.code}
                            </span>
                           
                          </div>
                          <button className="bg-[#e4dfc9] text-[#b88c4f] px-2 py-1 rounded-md hover:bg-[#b88c4f] hover:text-white">
                            Copy
                          </button>
                        </div>
                      </div>
                    ))}
                </div>  */}
              </div>

              <div className="border-t border-gray-200 pt-4">
                <PriceSection totals={totals} />
                {items.length ? (
                  <Link
                    id="submit_form"
                    onClick={() => {
                      if (typeof window !== "undefined" && (window as any).gtag) {
                        (window as any).gtag("event", "submit_form", {
                          event_category: "Cart",
                          event_label: "Proceed to Checkout",
                          transport_type: "beacon",
                        });
                      }
                    }}
                    className="lg:block xl:block 2xl:block btn btn-right-cart flex items-center justify-center w-full px-4 py-2.5 text-sm font-bold text-center text-white border border-[#b88c4f] transition-all duration-200 hover:text-primary"
                    href="/checkout"
                  >
                    <span>{cartTexts.proceedtocheckout}</span>
                  </Link>
                ) : (
                  <div className="flex items-center justify-center w-full px-4 py-2.5 text-sm font-bold  transition-all border  border-[#b88c4f] duration-200 bg-[#e4dfc9] text-primary cursor-not-allowed">
                    {cartTexts.yourcartisempty}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyCart;
