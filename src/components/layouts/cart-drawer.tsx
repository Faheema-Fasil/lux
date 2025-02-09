"use client";
import { AppDispatch, RootState } from "@/redux/store";
import { deleteCartItem, ItemProps } from "@/redux/store/cart";
import { apiEndpoints } from "@/server-api/config/api.endpoints";
import PriceSection from "@/shared-pages/cart/price-section";
import { fetchProductImages, formatPrice, getCustomImage } from "@/helper/helper";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useProductImageContext } from "../context/product-image-context";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { cartTexts } from "@/helper/constants";

const CartDrawer = ({
  toggleCartDrawer,
  isCartDrawerOpen,
}: {
  toggleCartDrawer: () => void;
  isCartDrawerOpen: boolean;
}) => {
  const { items, totals, currency } = useSelector((state: RootState) => state.cart);

  const dispatch: AppDispatch = useDispatch();
  const { productData } = useProductImageContext();

  const [deleteItemKey, setDeleteItemKey] = useState<string | number>();
  const [deleteStatus, setDeleteStatus] = useState<"submitting" | "success" | "error">();

  // const [productData, setProductData] = useState<
  //   Array<{ item: any; imageUrl: string }>
  // >([]);

  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  const cartDrawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cartDrawerRef.current && !cartDrawerRef.current.contains(event.target as Node)) {
        toggleCartDrawer();
      }
    };
    if (isCartDrawerOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isCartDrawerOpen, toggleCartDrawer]);

  const deleteFromCart = async (key: string) => {
    try {
      setDeleteItemKey(key);
      setDeleteStatus("submitting");

      // const responseData = await deleteGuestCartItemApi(key);
      // console.log("responseData success",responseData);
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

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    if (mediaQuery.matches && isCartDrawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    const handleMediaQueryChange = (event: MediaQueryListEvent) => {
      if (event.matches && isCartDrawerOpen) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "auto";
      }
    };
    mediaQuery.addEventListener("change", handleMediaQueryChange);
    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
      document.body.style.overflow = "auto";
    };
  }, [isCartDrawerOpen]);

  return (
    <div>
      <div
        ref={cartDrawerRef}
        className={`fixed top-0 right-0 z-[100] h-[100%] bg-white max-w-[450px]  !w-full bg-transparent transition-transform duration-300 ${
          isCartDrawerOpen ? "translate-x-0" : "translate-x-full"
        } max-w-[450px] w-full text-black`}
        aria-labelledby="drawer-right-label"
        tabIndex={-1}
      >
        <div className="drawer-content-wrapper h-[100%]">
          <div className="drawer-content flex flex-col h-full">
            <div className="flex flex-col w-full h-full justify-between items-middle  bg-white rounded cursor-pointer ">
              <div className="sticky top-0 z-20  relative px-0 pt-3 pb-0 bg-[#b88c4f]">
                <div className="w-full flex px-5 py-2 justify-between items-center">
                  <h2 className="font-semibold  text-lg m-0 text-heading text-white flex items-center">
                    <span className="text-xl mr-2 mb-1">
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        stroke-width="0"
                        viewBox="0 0 512 512"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill="none"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="32"
                          d="M320 264l-89.6 112-38.4-44.88"
                        ></path>
                        <path
                          fill="none"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="32"
                          d="M80 176a16 16 0 00-16 16v216c0 30.24 25.76 56 56 56h272c30.24 0 56-24.51 56-54.75V192a16 16 0 00-16-16zm80 0v-32a96 96 0 0196-96h0a96 96 0 0196 96v32"
                        ></path>
                      </svg>
                    </span>
                    {cartTexts.mycart}
                  </h2>

                  <button
                    onClick={toggleCartDrawer}
                    type="button"
                    data-drawer-hide="drawer-right-cart"
                    aria-controls="drawer-right-cart"
                    className="text-white bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-4 end-2.5 inline-flex items-center justify-center"
                  >
                    <svg
                      className="w-3 h-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 14"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                      />
                    </svg>
                    <span className="sr-only">Close menu</span>
                  </button>
                </div>

                {/* <div className="w-full bg-gradient-to-r from-[#731013] to-[#6c0506] mt-2">
                  <div className="flex items-center text-center justify-center gap-2 animate  border-red-900 px-4 py-2">
                    <p className="text-xs  mukta-regular text-white">
                      Congratulations! You are eligible for Free Delivery
                    </p>
                  </div>
                </div> */}
              </div>

              <div className="flex flex-col w-full h-full mb-[280px] items-center bg-white rounded cursor-pointer overflow-y-auto">
                {productData?.length > 0 &&
                  productData.map((product: any) => {
                    //console.log("productdata", product);

                    const customImage = getCustomImage(product.item);

                    const color =
                      (product.item.meta?.variation as Record<string, string>)["CHOOSE COLOR"] ||
                      (product.item.meta?.variation as Record<string, string>)["Metal Finish"];
                    return (
                      <div
                        key={product.item.item_key}
                        className="group w-full h-auto flex justify-start items-center bg-white py-3 px-4 border-b hover:bg-gray-50 transition-all border-gray-100 relative last:border-b-0"
                      >
                        <div className="relative flex overflow-hidden flex-shrink-0 cursor-pointer mr-3">
                          {typeof customImage === "string" ? (
                            <div
                              style={{
                                position: "relative",
                                width: "63px", // or desired width
                                height: "47px", // or desired height
                              }}
                            >
                              <Image
                                src={customImage}
                                layout="fill"
                                objectFit="cover"
                                style={{
                                  objectPosition: "left center",
                                }}
                                alt=""
                              />
                            </div>
                          ) : (
                            // <Image src={product.imageUrl} width="54" height="40" alt="" />
                            <div className="h-16 w-16 relative group">
                              <Image
                                src={product.imageUrl}
                                alt="Product image"
                                width={150}
                                height={150}
                                className="w-full h-full object-contain rounded-lg group-hover:scale-100 transition-all duration-300 ease-in-out"
                                loading="lazy"
                              />
                            </div>
                          )}
                        </div>
                        <div className="flex flex-col w-full overflow-hidden">
                          <div className="mukta-regular text-sm font-medium text-gray-700 text-heading ">
                            {product.item.name}
                          </div>
                          <span className="text-xs text-gray-400 mb-1">
                            {cartTexts.variation} : {color}
                          </span>
                          <p className="text-xs">Qty: {product.item.quantity.value}</p>

                          <div className="flex items-center justify-between">
                            <div className="font-bold text-sm text-heading leading-5 space-x-2">
                              {/* {Number(product?.item?.price_sale || 0) > 0 ? (
                                <span className="text-red-600 font-semibold">
                                  {currency?.currency_code || "AED"}{" "}
                                  {formatPrice(product?.item?.price_sale || 0)}
                                </span>
                              ) : (
                                <span className="text-[#b88c4f]">
                                  {currency?.currency_code || "AED"}{" "}
                                  {formatPrice(product?.item?.price || 0)}
                                </span>
                              )}

                              {Number(product?.item?.price_sale || 0) > 0 && (
                                <>
                                  <span className="text-gray-500 line-through text-tiny">
                                    {currency?.currency_code || "AED"}{" "}
                                    {formatPrice(
                                      product?.item?.price_regular || 0
                                    )}
                                  </span>
                                  <span className="text-green-500 text-nowrap">
                                    (
                                    {Math.round(
                                      ((Number(
                                        product?.item?.price_regular || 0
                                      ) -
                                        Number(
                                          product?.item?.price_sale || 0
                                        )) /
                                        Number(
                                          product?.item?.price_regular || 1
                                        )) *
                                        100
                                    )}
                                    % off)
                                  </span>
                                  <p className="text-xs text-gray-600 font-semibold text-nowrap">
                                    You save: {currency?.currency_code || "AED"}{" "}
                                    {formatPrice(
                                      Number(
                                        product?.item?.price_regular || 0
                                      ) - Number(product?.item?.price_sale || 0)
                                    )}
                                  </p>
                                </>
                              )} */}
                              <span className="text-[#b88c4f]">{formatPrice(product?.item?.price || 0)}</span>
                            </div>

                            {/* <div className="font-bold text-sm text-heading leading-5">
                            <span className=" flex items-center justify-center rounded-lg text-dark text-md bg-[#b88c4f] px-3 py-0.5 text-white text-center  font-medium ">
                              23%
                            </span>
                          </div> */}

                            {/* <div className="h-8 w-22 md:w-24 lg:w-24 flex flex-wrap items-center justify-evenly p-1 border border-gray-100 bg-white text-gray-600 rounded-md">
                              <button>
                                <span className="text-dark text-base">
                                  <svg
                                    stroke="currentColor"
                                    fill="none"
                                    stroke-width="2"
                                    viewBox="0 0 24 24"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    height="1em"
                                    width="1em"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <line x1="5" y1="12" x2="19" y2="12"></line>
                                  </svg>
                                </span>
                              </button>
                              <p className="text-sm font-semibold text-dark px-1">
                                1
                              </p>
                              <button>
                                <span className="text-dark text-base">
                                  <svg
                                    stroke="currentColor"
                                    fill="none"
                                    stroke-width="2"
                                    viewBox="0 0 24 24"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    height="1em"
                                    width="1em"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <line x1="12" y1="5" x2="12" y2="19"></line>
                                    <line x1="5" y1="12" x2="19" y2="12"></line>
                                  </svg>
                                </span>
                              </button>
                            </div> */}

                            <button
                              onClick={() => {
                                deleteFromCart(product.item.item_key);
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

                                {deleteStatus === "submitting" && deleteItemKey === product.item.item_key ? (
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
                      </div>
                    );
                  })}
              </div>
            </div>

            {items.length ? (
              <div className=" flex-grow w-full max-h-[280px] bg-gray-100 fixed bottom-0">
                <div className="mb-5 border border-default-200 p-5">
                  <h4 className="mb-5 text-default-800">{cartTexts.carttotal}</h4>
                  <PriceSection totals={totals} />

                  <div className="flex gap-2">
                    <Link
                      onClick={() => {
                        toggleCartDrawer();
                      }}
                      className="lg:block xl:block 2xl:block btn btn-left flex items-center justify-center w-full px-4 py-2.5 text-[11px] md:text-sm font-bold text-center text-[#b88c4f] border border-[#b88c4f] transition-all duration-200 hover:text-white"
                      href="/cart"
                    >
                      <span>{cartTexts.viewcart}</span>
                    </Link>

                    {items.length > 0 ? (
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
                          toggleCartDrawer();
                        }}
                        className="lg:block xl:block 2xl:block btn btn-right flex items-center justify-center w-full px-4 py-2.5 text-[11px] md:text-sm font-bold text-center text-white border border-[#b88c4f] transition-all duration-200 hover:text-primary"
                        href="/checkout"
                      >
                        <span>{cartTexts.proceedtocheckout}</span>
                      </Link>
                    ) : (
                      <Link
                        className="flex items-center justify-center cursor-not-allowed w-full px-4 py-2.5 text-[11px] md:text-sm font-bold  transition-all border  border-[#b88c4f] duration-200 bg-[#e4dfc9] text-primary"
                        href="#"
                      >
                        {/* {isAuthenticated ? "Checkout" : "Login to Checkout"} */}
                        <span>{cartTexts.additemstocart}</span>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center w-full h-full justify-top  ">
                {/* <Image
                  src="/images/empty-cart.png"
                  alt="empty cart"
                  width={200}
                  height={200}
                /> */}
                {/* <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="47.998"
                  height="40.34"
                >
                  <g fill="#1a171b">
                    <path d="M47.273 0h-6.544a.728.728 0 0 0-.712.58L38.63 7.219H.727a.727.727 0 0 0-.7.912l4.6 17.5c.006.021.019.037.026.059a.792.792 0 0 0 .042.094.747.747 0 0 0 .092.135.831.831 0 0 0 .065.068.626.626 0 0 0 .167.107.285.285 0 0 0 .045.029l13.106 5.145-5.754 2.184a4.382 4.382 0 1 0 .535 1.353l7.234-2.746 6.866 2.7A4.684 4.684 0 1 0 27.6 33.4l-5.39-2.113 13.613-5.164c.013-.006.021-.016.033-.021a.712.712 0 0 0 .188-.119.625.625 0 0 0 .063-.072.654.654 0 0 0 .095-.135.58.58 0 0 0 .04-.1.73.73 0 0 0 .033-.084l5.042-24.137h5.953a.728.728 0 0 0 0-1.455zM8.443 38.885a3.151 3.151 0 1 1 3.152-3.15 3.155 3.155 0 0 1-3.152 3.15zm23.1-6.3a3.151 3.151 0 1 1-3.143 3.149 3.155 3.155 0 0 1 3.148-3.152zM25.98 8.672l-.538 7.3H14.661l-.677-7.295zm-.645 8.75-.535 7.293h-9.328l-.672-7.293zM1.671 8.672h10.853l.677 7.3h-9.61zm2.3 8.75h9.362l.677 7.293H5.892zM20.2 30.5 9.175 26.17H31.6zm14.778-5.781h-8.722l.537-7.293h9.7zm1.822-8.752h-9.9l.537-7.295h10.889z" />
                    <circle cx="8.443" cy="35.734" r=".728" />
                    <circle cx="31.548" cy="35.734" r=".728" />
                  </g>
                </svg> */}
                <h3 className="text-xl font-bold text-default-800 mt-5">{cartTexts.yourcartisempty}</h3>
                <p className="text-default-600 mt-2 text-center px-3">Looks like you haven&apos;t added any items to your cart yet.</p>
              </div>
            )}
          </div>
          <div className="drawer-handle">
            <i className="drawer-handle-icon"></i>
          </div>
        </div>
      </div>
    </div>

    // <div
    //   ref={cartDrawerRef}
    //   className={`fixed top-0 right-0 z-[100] h-screen bg-black max-w-[450px] !w-full transition-transform duration-300 ${
    //     isCartDrawerOpen ? "translate-x-0" : "translate-x-full"
    //   } text-white`}
    //   aria-labelledby="drawer-right-label"
    //   tabIndex={-1}
    // >
    //   <div className="drawer-content-wrapper h-[100%] overflow-y-auto bg-black">
    //     <div className="drawer-content">
    //       <div className="flex flex-col w-full h-full justify-between items-middle bg-black rounded cursor-pointer">
    //         <div className="sticky top-0 z-20 relative px-0 pt-3 pb-0 bg-[#1a1a1a]">
    //           <div className="w-full flex px-5 py-2 justify-between items-center">
    //             <h2 className="font-semibold text-lg m-0 flex items-center text-gold">
    //               <span className="text-xl mr-2 mb-1">
    //                 <svg
    //                   stroke="currentColor"
    //                   fill="currentColor"
    //                   stroke-width="0"
    //                   viewBox="0 0 512 512"
    //                   height="1em"
    //                   width="1em"
    //                   xmlns="http://www.w3.org/2000/svg"
    //                 >
    //                   <path
    //                     fill="none"
    //                     stroke-linecap="round"
    //                     stroke-linejoin="round"
    //                     stroke-width="32"
    //                     d="M320 264l-89.6 112-38.4-44.88"
    //                   ></path>
    //                   <path
    //                     fill="none"
    //                     stroke-linecap="round"
    //                     stroke-linejoin="round"
    //                     stroke-width="32"
    //                     d="M80 176a16 16 0 00-16 16v216c0 30.24 25.76 56 56 56h272c30.24 0 56-24.51 56-54.75V192a16 16 0 00-16-16zm80 0v-32a96 96 0 0196-96h0a96 96 0 0196 96v32"
    //                   ></path>
    //                 </svg>
    //               </span>
    //               My Cart
    //             </h2>

    //             <button
    //               onClick={toggleCartDrawer}
    //               type="button"
    //               data-drawer-hide="drawer-right-cart"
    //               aria-controls="drawer-right-cart"
    //               className="text-white bg-transparent hover:bg-gray-800 hover:text-gold rounded-lg text-sm w-8 h-8 absolute top-4 end-2.5 inline-flex items-center justify-center"
    //             >
    //               <svg
    //                 className="w-3 h-3"
    //                 aria-hidden="true"
    //                 xmlns="http://www.w3.org/2000/svg"
    //                 fill="none"
    //                 viewBox="0 0 14 14"
    //               >
    //                 <path
    //                   stroke="currentColor"
    //                   stroke-linecap="round"
    //                   stroke-linejoin="round"
    //                   stroke-width="2"
    //                   d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
    //                 />
    //               </svg>
    //               <span className="sr-only">Close menu</span>
    //             </button>
    //           </div>
    //         </div>

    //         <div className="flex flex-col w-full h-full justify-between items-center bg-black rounded cursor-pointer overflow-x-auto">
    //           {productData?.length > 0 &&
    //             productData.map((product: any) => {
    //               const customImage = getCustomImage(product.item);
    //               const color =
    //                 (product.item.meta?.variation as Record<string, string>)[
    //                   "CHOOSE COLOR"
    //                 ] ||
    //                 (product.item.meta?.variation as Record<string, string>)[
    //                   "Metal Finish"
    //                 ];
    //               return (
    //                 <div
    //                   key={product.item.item_key}
    //                   className="group w-full h-auto flex justify-start items-center bg-[#1a1a1a] py-3 px-4 border-b border-gray-600 hover:bg-gray-800 transition-all relative last:border-b-0"
    //                 >
    //                   <div className="relative flex border border-gray-600 shadow-sm overflow-hidden flex-shrink-0 cursor-pointer mr-3">
    //                     {typeof customImage === "string" ? (
    //                       <div
    //                         style={{
    //                           position: "relative",
    //                           width: "63px",
    //                           height: "40px",
    //                         }}
    //                       >
    //                         <Image
    //                           src={customImage}
    //                           layout="fill"
    //                           objectFit="cover"
    //                           style={{
    //                             objectPosition: "left center",
    //                           }}
    //                           alt=""
    //                         />
    //                       </div>
    //                     ) : (
    //                       <Image
    //                         src={product.imageUrl}
    //                         width="54"
    //                         height="40"
    //                         alt=""
    //                       />
    //                     )}
    //                   </div>
    //                   <div className="flex flex-col w-full overflow-hidden">
    //                     <a
    //                       className="mukta-regular text-sm font-medium text-gray-400 text-heading"
    //                       href=""
    //                     >
    //                       {product.item.name}
    //                     </a>
    //                     <span className="text-xs text-gray-600 mb-1">
    //                       Variation : {color}
    //                     </span>
    //                     <div className="flex items-center justify-between">
    //                       <div className="font-bold text-sm text-heading leading-5 space-x-2">
    //                         <span className="text-[#b88c4f]">
    //                           {currency?.currency_code || "AED"}{" "}
    //                           {formatPrice(product?.item?.price || 0)}
    //                         </span>
    //                       </div>

    //                       <div className="flex items-center justify-center gap-1 group px-2 py-1 text-sm font-bold text-center text-gray-500 transition-all duration-200 hover:text-[#b88c4f]  hover:bg-[#e4dfc9] ">
    //                         <svg
    //                           className="w-[18px] fill-gray-500 group-hover:fill-[#b88c4f]"
    //                           id="fi_3096673"
    //                           enableBackground="new 0 0 512 512"
    //                           viewBox="0 0 512 512"
    //                           xmlns="http://www.w3.org/2000/svg"
    //                         >
    //                           <g>
    //                             <path d="m424 64h-88v-16c0-26.467-21.533-48-48-48h-64c-26.467 0-48 21.533-48 48v16h-88c-22.056 0-40 17.944-40 40v56c0 8.836 7.164 16 16 16h8.744l13.823 290.283c1.221 25.636 22.281 45.717 47.945 45.717h242.976c25.665 0 46.725-20.081 47.945-45.717l13.823-290.283h8.744c8.836 0 16-7.164 16-16v-56c0-22.056-17.944-40-40-40zm-216-16c0-8.822 7.178-16 16-16h64c8.822 0 16 7.178 16 16v16h-96zm-128 56c0-4.411 3.589-8 8-8h336c4.411 0 8 3.589 8 8v40c-4.931 0-331.567 0-352 0zm313.469 360.761c-.407 8.545-7.427 15.239-15.981 15.239h-242.976c-8.555 0-15.575-6.694-15.981-15.239l-13.751-288.761h302.44z"></path>
    //                             <path d="m256 448c8.836 0 16-7.164 16-16v-208c0-8.836-7.164-16-16-16s-16 7.164-16 16v208c0 8.836 7.163 16 16 16z"></path>
    //                             <path d="m336 448c8.836 0 16-7.164 16-16v-208c0-8.836-7.164-16-16-16s-16 7.164-16 16v208c0 8.836 7.163 16 16 16z"></path>
    //                             <path d="m176 448c8.836 0 16-7.164 16-16v-208c0-8.836-7.164-16-16-16s-16 7.164-16 16v208c0 8.836 7.163 16 16 16z"></path>
    //                           </g>
    //                         </svg>
    //                         <button
    //                           onClick={() => {
    //                             deleteFromCart(product.item.item_key);
    //                           }}
    //                           className="text-[10px] flex items-center"
    //                         >
    //                           {deleteStatus === "submitting" &&
    //                           deleteItemKey === product.item.item_key ? (
    //                             <svg
    //                               className="animate-spin h-4 w-4 text-gray-500 mr-1"
    //                               xmlns="http:www.w3.org/2000/svg"
    //                               fill="none"
    //                               viewBox="0 0 24 24"
    //                             >
    //                               <circle
    //                                 className="opacity-25"
    //                                 cx="12"
    //                                 cy="12"
    //                                 r="10"
    //                                 stroke="currentColor"
    //                                 strokeWidth="4"
    //                               ></circle>
    //                               <path
    //                                 className="opacity-75"
    //                                 fill="currentColor"
    //                                 d="M4 12a8 8 0 018-8v1.5a6.5 6.5 0 100 13V20a8 8 0 01-8-8z"
    //                               ></path>
    //                             </svg>
    //                           ) : (
    //                             <span className="text-[10px]">Remove</span>
    //                           )}
    //                         </button>
    //                       </div>
    //                     </div>
    //                   </div>
    //                 </div>
    //               );
    //             })}
    //         </div>
    //       </div>

    //       {items.length ? (
    //         <div className="overflow-y-scroll flex-grow w-full max-h-full bg-gray-100">
    //           <div className="mb-5 border border-default-200 p-5">
    //             <h4 className="mb-5 text-default-800">Cart Total</h4>
    //             <PriceSection totals={totals} currency={currency} />Z

    //             <div className="flex gap-2">
    //               <Link
    //                 onClick={() => {
    //                   toggleCartDrawer();
    //                 }}
    //                 className="lg:block xl:block 2xl:block flex items-center justify-center w-full px-4 py-2.5 text-sm font-bold text-center text-[#b88c4f] border border-[#b88c4f] transition-all duration-200 hover:text-[#b88c4f]  hover:bg-[#e4dfc9] "
    //                 href="/cart"
    //               >
    //                 View Cart
    //               </Link>

    //               {items.length > 0 ? (
    //                 <Link
    //                   className="flex items-center justify-center w-full px-4 py-2.5 text-sm font-bold text-white transition-all border  border-[#b88c4f] duration-200 bg-[#b88c4f]  hover:text-[#b88c4f]  hover:bg-[#e4dfc9]"
    //                   href="/checkout"
    //                   onClick={() => {
    //                     toggleCartDrawer();
    //                   }}
    //                 >
    //                   Proceed to Checkout
    //                 </Link>
    //               ) : (
    //                 <Link
    //                   className="flex items-center justify-center cursor-not-allowed w-full px-4 py-2.5 text-sm font-bold  transition-all border  border-[#b88c4f] duration-200 bg-[#e4dfc9] text-primary"
    //                   href="#"
    //                 >
    //                   Add items to cart
    //                 </Link>
    //               )}
    //             </div>
    //           </div>
    //         </div>
    //       ) : (
    //         <div className="flex flex-col items-center justify-center h-full my-auto ">
    //           <h3 className="text-xl font-bold text-default-800 mt-5">
    //             Your cart is empty
    //           </h3>
    //           <p className="text-default-600 mt-2">
    //             Looks like you haven&apos;t added any items to your cart yet.
    //           </p>
    //         </div>
    //       )}
    //     </div>
    //     <div className="drawer-handle">
    //       <i className="drawer-handle-icon"></i>
    //     </div>
    //   </div>
    // </div>
  );
};

export default CartDrawer;
