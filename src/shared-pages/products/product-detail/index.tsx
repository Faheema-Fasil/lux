"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { ProductProps, VariationProps } from "@/types/products/types";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import LoadingSkeleton from "@/components/common/skeleton-loader";
import { ChangeEvent } from "react";
import { postCartData } from "@/redux/store/cart";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { cartTexts, currencyTexts } from "@/helper/constants";
import { Button } from "@mui/material";

const ProductDetail = ({
  formLabels,
  allVariations,
  product,
}: {
  formLabels: any;
  allVariations: VariationProps[];
  product: ProductProps;
}) => {
  const dispatch: AppDispatch = useDispatch();
  // const [product, setProduct] = useState<ProductProps>();
  // const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [cardFront, setCardFront] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  // const [cardBack, setCardBack] = useState("");
  const [cardPlacement, setCardPlacement] = useState<"front" | "back">("front");
  const [namePlacement, setNamePlacement] = useState<"front" | "back">("front");
  const [addToCartStatus, setAddToCartStatus] = useState<"submitting" | "success" | "error">();
  // const [selectedVariation, setSelectedVariation] = useState<number | null>(
  //   null
  // );
  // const [formLabels, setFormLabels] = useState([]);
  // const [allVariations, setAllVariations] = useState<VariationProps[]>([]);
  const [selectedVariationId, setSelectedVariationId] = useState<unknown>();
  // const [number, setNumber] = useState("");
  const [cardPlacementFieldElementId, setCardPlacementFieldElementId] = useState<any>([]);
  const [cardPlacementFields, setCardPlacementFields] = useState<any>([]);

  const [namePlacementFieldElementId, setNamePlacementFieldElementId] = useState<any>([]);
  const [namePlacementFields, setNamePlacementFields] = useState<any>([]);

  const [nameFieldElementId, setNameFieldElementId] = useState<any>([]);
  const [numberFieldElementId, setNumberFieldElementId] = useState<any>([]);
  const [orderInstructionsFieldElementId, setOrderInstructionsFieldElementId] = useState<any>([]);

  const [isMobile, setIsMobile] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [swiperInstance, setSwiperInstance] = useState<any>(null);
  const steps = 5;

  const [inputValues, setInputValues] = useState({
    name: "",
    number: "",
    instructions: "",
  });

  const router = useRouter();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleCardPlacementRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCardPlacement(event.target.value as "front" | "back");
  };

  const handleNamePlacementRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNamePlacement(event.target.value as "front" | "back");
  };

  const fetchFieldElementId = () => {
    setNameFieldElementId(
      formLabels.flat().find((item: any) => item.description?.toLowerCase().includes("customer name"))?.elementId
    );

    setNumberFieldElementId(
      formLabels.flat().find((item: any) => item.description?.toLowerCase().includes("card number"))?.elementId
    );

    setCardPlacementFieldElementId(
      formLabels.flat().find((item: any) => item.description?.toLowerCase().includes("card placement"))?.elementId
    );

    setNamePlacementFieldElementId(
      formLabels.flat().find((item: any) => item.description?.toLowerCase().includes("name placement"))?.elementId
    );

    setOrderInstructionsFieldElementId(
      formLabels.flat().find((item: any) => item.description?.toLowerCase().includes("instructions"))?.elementId
    );
  };

  useEffect(() => {
    setCardFront(product?.images[0]?.src || "/assets/img/detail-page/card-f.png");

    if (allVariations.length > 0) {
      handleVariationChange(allVariations[0]?.id);
    }

    fetchFieldElementId();

    const fetchFieldData = () => {
      //Card Number Placement Field
      try {
        if (!cardPlacementFieldElementId || !namePlacementFieldElementId) {
          console.error("Field Element IDs are not defined.");
          return;
        }

        const cardPlacementField: any = getFieldByElementId(
          cardPlacementFieldElementId,
          "values",
          "Card Number Placement"
        );
        if (cardPlacementField && cardPlacementField.length && Array.isArray(cardPlacementField)) {
          setCardPlacementFields(cardPlacementField);
        } else {
          console.error("fields is not an array:", cardPlacementField);
          setCardPlacementFields([]);
        }

        //Card Number Placement Field
        const namePlacementField: any = getFieldByElementId(
          namePlacementFieldElementId,
          "values",
          "Card Name Placement"
        );
        if (namePlacementField && namePlacementField.length && Array.isArray(namePlacementField)) {
          setNamePlacementFields(namePlacementField);
        } else {
          console.error("fields is not an array:", namePlacementField);
          setNamePlacementFields([]);
        }
      } catch (error: any) {
        console.error("Error fetching field data:", error.message);
        setCardPlacementFields([]);
        setNamePlacementFields([]);
      } finally {
        setLoading(false);
      }
    };
    if (cardPlacementFieldElementId && namePlacementFieldElementId) {
      fetchFieldData();
    } else {
      console.warn("Field Element IDs are missing, skipping fetch.");
    }
  }, [product, cardPlacementFieldElementId, namePlacementFieldElementId]);

  useEffect(() => {
    //console.log("cardPlacementFieldElementId", nameFieldElementId)
  }, [cardPlacementFieldElementId]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleStepClick = (index: number) => {
    setActiveStep(index);
    swiperInstance?.slideTo(index);
  };

  const getFieldByElementId = (elementId: string, field: string = "label", Default: string = "label") => {
    return (
      formLabels.flat().find((label: { elementId: string; label: string }) => label?.elementId === elementId)?.[
        field
      ] || Default
    );
  };

  const handleVariationChange = async (id: number) => {
    setSelectedVariationId(id);
    const selectedVariation = allVariations && allVariations.find((variation: VariationProps) => variation?.id === id);
    setCardFront(
      selectedVariation?.images?.[0]?.src || product?.images[0]?.src || "/assets/img/detail-page/card-f.png"
    );
    setTotalPrice(Number(selectedVariation?.price) || 0);

    // setCardBack(
    //   selectedVariation?.images?.[1]?.src ||
    //     product?.images[1]?.src ||
    //     "/assets/img/detail-page/card-b.jpg"
    // );
  };

  // const formatCardNumber = (value: any) => {
  //   // Remove all non-numeric characters
  //   const cleanValue = value.replace(/\D/g, "");

  //   // Add a space after every 4 digits
  //   const formattedValue = cleanValue.replace(/(\d{4})(?=\d)/g, "$1 ");
  //   // const limitedValue = cleanValue.slice(0, 16);

  //   return formattedValue;
  // };

  // const handleChange = (e: any) => {
  //   const formattedNumber = formatCardNumber(e.target.value);
  //   setNumber(formattedNumber);
  // };

  const handleAddToCart = async (e: Event) => {
    // let errorMessage;
    e.preventDefault();
    if (!selectedVariationId) {
      toast.error("Please select a variation.");
      return;
    }
    // if (inputValues.name.trim() === "") {
    //   toast.error("Please enter your name.");
    //   return;
    // }

    if (!cardPlacementFields.some((field: any) => field.value === cardPlacement)) {
      toast.error("Please select a valid card placement.");
      return;
    }

    setAddToCartStatus("submitting");
    try {
      //ALL FIELD VALUES FROM THE BACKED MUST BE IN SMALL LETTERS FOR THIS TO WORK
      const data = {
        id: selectedVariationId,
        quantity: "1",
        [nameFieldElementId]: inputValues.name,
        [numberFieldElementId]: inputValues.number ?? "",
        [cardPlacementFieldElementId]: cardPlacement,
        [namePlacementFieldElementId]: namePlacement,
        [orderInstructionsFieldElementId]: inputValues.instructions ?? "",
      };

      const resultAction = await dispatch(postCartData(data));
      if (postCartData.fulfilled.match(resultAction)) {
        //console.log("Added to cart", resultAction.payload);
        setAddToCartStatus("success");
        toast.success("Added to cart");
        router.push("/cart");
      } else {
        setAddToCartStatus("error");
        console.error("Failed to add to cart:", resultAction.error?.message);
        if (resultAction.error?.message === "Rejected") {
          toast.error("Failed to add to cart");
        } else {
          toast.error("Failed to add to cart");
        }
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      setAddToCartStatus("error");
      toast.error("An unexpected error occurred.");
    }
  };

  console.log("allVariations", allVariations);

  const renderVariations = () =>
    allVariations && (
      <div className="mt-5 mb-8 mx-3">
        {isMobile ? (
          <>
            <Swiper spaceBetween={5} slidesPerView={3.5} pagination={{ clickable: true }} className="my-5">
              {allVariations.map((variation) => (
                <SwiperSlide key={variation?.id}>
                  <div
                    className={`bg-white p-1 rounded-md shadow-lg hover:shadow-xl transition-shadow cursor-pointer ${
                      selectedVariationId === variation?.id ? "border-2 border-primary box-border" : "border-2"
                    }`}
                    onClick={() => handleVariationChange(Number(variation?.id))}
                    style={{ boxSizing: "border-box" }}
                  >
                    <div className="relative w-full h-10 mb-1">
                      <div className="w-full h-full flex justify-center items-center p-1">
                        {variation && variation?.thumbnail[0] && (
                          <Image
                            src={variation?.thumbnail[0]}
                            alt={variation?.name || "Product Image"}
                            height={30}
                            width={30}
                            className="w-auto h-[30px] object-contain"
                            priority
                          />
                        )}
                      </div>
                    </div>
                    <h3 className="text-center font-semibold text-[10px] md:text-[13px] text-gray-800">
                      {variation?.attributes.find((attr) => attr.slug.includes("metal"))?.option}
                    </h3>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </>
        ) : (
          <div className="grid grid-cols-3 xs:grid-cols-4 sm:grid-cols-4 xl:grid-cols-5 gap-3">
            {allVariations.map((variation) => (
              <div
                key={variation?.id}
                className={`bg-white p-1 rounded-md shadow-lg hover:shadow-xl transition-shadow cursor-pointer ${
                  selectedVariationId === variation?.id ? "border-2 border-primary box-border" : "border-2"
                }`}
                onClick={() => handleVariationChange(Number(variation?.id))}
                style={{ boxSizing: "border-box" }}
              >
                <div className="relative w-full h-10 mb-1">
                  <div className="w-full h-full flex justify-center items-center p-1">
                    {variation && variation?.thumbnail[0] && (
                      <Image
                        src={variation?.thumbnail[0]}
                        alt={variation?.name || "Product Image"}
                        height={30}
                        width={30}
                        className="w-auto h-[30px] object-contain"
                        priority
                      />
                    )}
                  </div>
                </div>
                <h3 className="text-center font-semibold text-[10px] md:text-[13px] text-gray-800">
                  {variation?.attributes.find((attr) => attr.slug.includes("metal"))?.option}
                </h3>
              </div>
            ))}
          </div>
        )}
      </div>
    );

  // const renderInputFields = () => (
  //   <>
  //     <Swiper
  //       modules={[Pagination]}
  //       spaceBetween={20}
  //       slidesPerView={1}
  //       onSwiper={setSwiperInstance}
  //       onSlideChange={(swiper) => setActiveStep(swiper.activeIndex)}
  //       // pagination={{
  //       //   clickable: true,
  //       //   el: ".custom-pagination-container",
  //       // }}
  //       navigation={{
  //         prevEl: ".swiper-button-prev",
  //         nextEl: ".swiper-button-next",
  //         disabledClass: "swiper-button-disabled",
  //       }}
  //       className="input-fields-swiper mySwiper"
  //     >
  //       {/* Name Input */}
  //       <SwiperSlide>
  //         <div className="ml-2 sm:mb-6">
  //           <label className="block text-gray-800 font-semibold pb-2 sm:pb-3">
  //             {getFieldByElementId(nameFieldElementId, "label", "Your Name")}
  //           </label>
  //           <input
  //             type={getFieldByElementId(nameFieldElementId, "type", "text")}
  //             name="name"
  //             className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#AE9164] focus:border-[#AE9164] placeholder-gray-400"
  //             placeholder={getFieldByElementId(nameFieldElementId, "placeholder", "text")}
  //             value={inputValues.name}
  //             onChange={handleInputChange}
  //           />
  //         </div>
  //       </SwiperSlide>

  //       {/* Card Number Input */}
  //       <SwiperSlide>
  //         <div className="ml-2 sm:mb-6">
  //           <label className="block text-gray-800 font-semibold pb-2 sm:pb-3">
  //             {getFieldByElementId(numberFieldElementId, "label", "Card Number (Optional)")}
  //           </label>
  //           <input
  //             type={getFieldByElementId(numberFieldElementId, "text", "text")}
  //             name="number"
  //             className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#AE9164] focus:border-[#AE9164] placeholder-gray-400"
  //             placeholder={getFieldByElementId(numberFieldElementId, "placeholder", "Card Number")}
  //             value={inputValues.number}
  //             onChange={handleInputChange}
  //           />
  //         </div>
  //       </SwiperSlide>

  //       {/* Card Number Placement */}
  //       {cardPlacementFields && (
  //         <SwiperSlide>
  //           <div className="ml-2 sm:mb-6">
  //             <label className="block text-gray-800 font-semibold mb-3 sm: pb-2 sm:pb-3 border-b border-gray-300">
  //               {getFieldByElementId(cardPlacementFieldElementId, "label", "Card Number Placement")}*
  //             </label>
  //             <div className="flex flex-row sm:flex-row gap-3 sm:gap-5">
  //               {cardPlacementFields.map((field: any) => (
  //                 <div key={field?.label} className="flex items-center">
  //                   <input
  //                     type="radio"
  //                     id={`card-number-${field?.label}`}
  //                     name="card-placement"
  //                     value={field?.value}
  //                     className="mr-2 focus:ring-[#AE9164] text-[#b88c4f]"
  //                     checked={cardPlacement === field?.value}
  //                     onChange={handleCardPlacementRadioChange}
  //                   />
  //                   <label htmlFor={`card-number-${field?.label}`} className="text-gray-800 m-0">
  //                     {field?.label}
  //                   </label>
  //                 </div>
  //               ))}
  //             </div>
  //           </div>
  //         </SwiperSlide>
  //       )}

  //       {/* Card Name Placement */}
  //       {namePlacementFields && (
  //         <SwiperSlide>
  //           <div className="ml-2 sm:mb-6">
  //             <label className="block text-gray-800 font-semibold mb-3 sm: pb-2 sm:pb-3 border-b border-gray-300">
  //               {getFieldByElementId(namePlacementFieldElementId, "label", "Card Name Placement")}*
  //             </label>
  //             <div className="flex flex-row  sm:flex-row gap-3 sm:gap-5">
  //               {namePlacementFields.map((field: any) => (
  //                 <div key={field?.label} className="flex items-center">
  //                   <input
  //                     type="radio"
  //                     id={`card-name-${field?.label}`}
  //                     name="name-placement"
  //                     value={field?.value}
  //                     className="mr-2 focus:ring-[#AE9164] text-[#b88c4f]"
  //                     checked={namePlacement === field?.value}
  //                     onChange={handleNamePlacementRadioChange}
  //                   />
  //                   <label htmlFor={`card-name-${field?.label}`} className="text-gray-800 m-0">
  //                     {field?.label}
  //                   </label>
  //                 </div>
  //               ))}
  //             </div>
  //           </div>
  //         </SwiperSlide>
  //       )}

  //       {/* Order Instructions */}
  //       {orderInstructionsFieldElementId && (
  //         <SwiperSlide>
  //           <div className="ml-2 sm:mb-6">
  //             <label className="block text-gray-800 font-semibold pb-2 sm:pb-3">
  //               {getFieldByElementId(orderInstructionsFieldElementId, "label", "Order Instructions")}
  //             </label>
  //             <textarea
  //               name="instructions"
  //               className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#AE9164] focus:border-[#AE9164] placeholder-gray-400"
  //               placeholder={getFieldByElementId(orderInstructionsFieldElementId, "placeholder", "text")}
  //               rows={2}
  //               value={inputValues.instructions}
  //               onChange={(e) => setInputValues((prev) => ({ ...prev, instructions: e.target.value }))}
  //             />
  //           </div>
  //         </SwiperSlide>
  //       )}

  //       {/* Add to Cart Button */}
  //       <SwiperSlide>
  //         <div className="font-bold flex justify-center gap-4 text-primary">
  //           <p>{cartTexts.totalprice}:</p>
  //           <div>
  //             {currencyTexts.aed} {totalPrice}
  //           </div>
  //         </div>
  //         <button
  //           className={`w-full flex justify-center py-2 rounded-md text-lg font-bold ${
  //             addToCartStatus === "submitting" ? "opacity-50 cursor-not-allowed" : ""
  //           } text-white hover:bg-[#9d7c47] bg-[#AE9164] transition duration-200 mt-4`}
  //           onClick={(e) => handleAddToCart(e as unknown as Event)}
  //         >
  //           {addToCartStatus === "submitting" ? (
  //             <div className="h-5 w-5 flex justify-center border-b-2 border-white rounded-full animate-spin" />
  //           ) : (
  //             "Add to Cart"
  //           )}
  //         </button>
  //       </SwiperSlide>
  //     </Swiper>
  //     <div className=" bottom-0 w-full">
  //       <div className="flex justify-between items-center py-3 px-2">
  //         {/* Previous Button */}
  //         <div
  //           className={`border rounded-md px-3 ${
  //             activeStep === 0 ? "opacity-50 cursor-not-allowed" : "border-primary cursor-pointer"
  //           }`}
  //         >
  //           <Button disabled={activeStep === 0} onClick={() => swiperInstance?.slidePrev()}>
  //             <KeyboardArrowLeft
  //               style={{
  //                 color: activeStep === 0 ? "#bfbfbf" : "#b88c4f",
  //               }}
  //             />
  //           </Button>
  //         </div>

  //         {/* Next Button */}
  //         <div className={`border rounded-md px-3 ${"border-gray-300 bg-black cursor-pointer"}`}>
  //           <Button onClick={() => swiperInstance?.slideNext()}>
  //             <KeyboardArrowRight
  //               style={{
  //                 color: "white",
  //               }}
  //             />
  //           </Button>
  //         </div>
  //       </div>
  //     </div>
  //   </>
  // );

  return (
    <>
      <section className="mb-10 max-h-[100%]">
        <div className="text-center mt-5 md:mt-10 mb-3 md:mb-10">
          <h2 className="text-xl md:text-4xl font-normal text-[#272727]">Customize Your Card</h2>
          {/* <p className="text-gray-600 text-sm md:text-md mx-3 ">
            Discover how clients personalized their cards and why they stand out.
          </p> */}
        </div>

        <div className="xl:container mx-auto px-5 xl:px-0">
          {loading ? (
            <div>
              {/* Top Section Skeleton */}
              <div className="text-center mt-10 mb-10">
                <LoadingSkeleton width="60%" height={40} className="mx-auto mb-4" />
                <LoadingSkeleton width="40%" height={20} className="mx-auto" />
              </div>

              {/* Main Skeleton Content */}
              <div className="flex flex-col md:flex-row md:space-x-8">
                {/* Left Section (Card Preview Skeleton) */}
                <div className="flex-1">
                  <div className="flex justify-center mb-12">
                    <LoadingSkeleton width="600px" height="400px" variant="rectangular" />
                  </div>
                  {/* Variation Skeletons */}
                  <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-2">
                    {Array.from({ length: 8 }).map((_, index) => (
                      <div
                        key={index}
                        className="bg-white p-3 rounded-lg shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
                      >
                        <div className="relative w-full h-20 mb-1">
                          <LoadingSkeleton width="100%" height="100%" variant="rectangular" />
                        </div>
                        <LoadingSkeleton width="60%" height={20} className="mx-auto mt-2" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Section (Form Skeleton) */}
                <div className=" p-8 rounded-lg shadow-lg max-w-lg mx-auto md:mx-0 flex-1">
                  <LoadingSkeleton width="60%" height={30} className="mb-6 mx-auto" />
                  <LoadingSkeleton width="80%" height={20} className="mb-4 mx-auto" />
                  {Array.from({ length: 4 }).map((_, index) => (
                    <div key={index} className="mb-6">
                      <LoadingSkeleton width="100%" height={40} className="mb-2" />
                      <LoadingSkeleton width="80%" height={20} className="mx-auto" />
                    </div>
                  ))}
                  <LoadingSkeleton width="100%" height={50} variant="rectangular" />
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center space-y-0 md:space-y-6 lg:space-y-0 xl:flex-row xl:items-start lg:space-x-8 xl:space-x-20 2xl:space-x-8">
              {/* Left Section - Card Images & Variations */}
              <div className="flex-1 h-auto items-start">
                <div className="relative w-full ">
                  <div className=" flex items-start justify-center px-4 md:p-4 ">
                    {/* <Image
                      src={cardFront}
                      alt="Product image"
                      width={300}
                      height={200}
                      className="max-w-full  w-auto max-h-[300px] object-contain shadow-2xl rounded-md"
                      loading="lazy"
                    /> */}
                    <Image
                      src={cardFront}
                      alt="Product image"
                      width={300}
                      height={200}
                      className="w-[400px] max-w-full max-h-[200px] md:max-h-[300px] object-contain "
                      loading="lazy"
                    />
                  </div>
                </div>

                {/* Variations Section */}
                {allVariations && (
                  <div className="w-screen md:max-w-3xl md:mx-auto mt-5 mb-3 md:mb-8 ">
                    <label htmlFor="variation-select" className="block mb-2 ml-2 font-medium text-gray-800">
                      Choose a Metal Finish:
                    </label>
                    {isMobile ? (
                      renderVariations()
                    ) : (
                      <div className="grid grid-cols-3 xs:grid-cols-4 sm:grid-cols-4 xl:grid-cols-5 gap-3">
                        {allVariations
                          ? allVariations.map((variation: VariationProps) => (
                              <div
                                key={variation?.id}
                                className={`bg-white p-1 rounded-md shadow-lg hover:shadow-xl transition-shadow cursor-pointer ${
                                  selectedVariationId === variation?.id
                                    ? "border-2 border-primary box-border"
                                    : "border-2"
                                }`}
                                onClick={() => handleVariationChange(Number(variation?.id))}
                                style={{ boxSizing: "border-box" }}
                              >
                                <div className="relative w-full h-10 mb-1">
                                  <div className="w-full h-full flex justify-center items-center p-1">
                                    {variation && variation?.thumbnail[0] && (
                                      <Image
                                        src={variation?.thumbnail[0]}
                                        alt={variation?.name || "Product Image"}
                                        height={30}
                                        width={30}
                                        className="w-auto h-[30px] object-contain"
                                        priority
                                      />
                                    )}
                                  </div>
                                </div>
                                <h3 className="text-center font-semibold text-[10px] md:text-[13px] text-gray-800">
                                  {variation?.attributes.find((variation) => variation.slug.includes("metal"))?.option}
                                </h3>
                              </div>
                            ))
                          : Array.from({ length: 8 }).map((_, index) => (
                              <div
                                key={index}
                                className="bg-white p-2 rounded-lg shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
                              >
                                <div className="relative w-full h-20 mb-1">
                                  <LoadingSkeleton width="100%" height="100%" variant="rectangular" />
                                </div>
                                <LoadingSkeleton width="60%" height={20} className="mx-auto mt-2" />
                              </div>
                            ))}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Right Section - Form */}
              <div className="w-full md:w-1/2 md:max-w-lg">
                <div className="">
                  <div className="font-bold justify-center gap-4 text-primary flex lg:hidden">
                    <p>{cartTexts.totalprice}:</p>
                    <div>
                      {currencyTexts.aed} {totalPrice}
                    </div>
                  </div>
                </div>
                <div className="rounded-lg p-6 md:p-8 shadow-lg mx-auto bg-white">
                  <h2 className="text-center text-xl sm:text-2xl font-bold text-gray-800 mb-6">Add Card Details</h2>
                  <form
                    action="#"
                    method="POST"
                    className="space-y-4 pb-2 md:pb-10 sm:space-y-6 lx-card-form text-black"
                  >
                    {/* Name Input */}
                    <div className="mb-4 sm:mb-6">
                      <label className="block text-gray-800 font-semibold pb-2 sm:pb-3">
                        {getFieldByElementId(nameFieldElementId, "label", "Your Name")}
                      </label>
                      <input
                        type={getFieldByElementId(nameFieldElementId, "type", "text")}
                        name="name"
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#AE9164] focus:border-[#AE9164] placeholder-gray-400"
                        placeholder={getFieldByElementId(nameFieldElementId, "placeholder", "text")}
                        value={inputValues.name}
                        onChange={handleInputChange}
                      />
                    </div>

                    {/* Card Number Input */}
                    <div className="mb-4 sm:mb-6">
                      <label className="block text-gray-800 font-semibold pb-2 sm:pb-3">
                        {getFieldByElementId(numberFieldElementId, "label", "Card Number (Optional)")}
                      </label>
                      <input
                        type={getFieldByElementId(numberFieldElementId, "text", "text")}
                        name="number"
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#AE9164] focus:border-[#AE9164] placeholder-gray-400"
                        placeholder={getFieldByElementId(numberFieldElementId, "placeholder", "Card Number")}
                        value={inputValues.number}
                        onChange={handleInputChange}
                      />
                    </div>

                    {/* Card Number Placement */}
                    {cardPlacementFields && (
                      <div className="mb-4 sm:mb-6">
                        <label className="block text-gray-800 font-semibold mb-3 sm:mb-4 pb-2 sm:pb-3 border-b border-gray-300">
                          {getFieldByElementId(cardPlacementFieldElementId, "label", "Card Number Placement")}*
                        </label>
                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-5">
                          {cardPlacementFields.map((field: { label: string; value: string }) => (
                            <div key={field?.label} className="flex items-center">
                              <input
                                type="radio"
                                id={`card-number-${field?.label}`}
                                name="card-placement"
                                value={field?.value}
                                className="mr-2 focus:ring-[#AE9164] text-[#b88c4f]"
                                checked={cardPlacement === field?.value}
                                onChange={handleCardPlacementRadioChange}
                              />
                              <label htmlFor={`card-number-${field?.label}`} className="text-gray-800 m-0">
                                {field?.label}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Card Name Placement */}
                    {namePlacementFields && (
                      <div className="mb-4 sm:mb-6">
                        <label className="block text-gray-800 font-semibold mb-3 sm:mb-4 pb-2 sm:pb-3 border-b border-gray-300">
                          {getFieldByElementId(namePlacementFieldElementId, "label", "Card Name Placement")}*
                        </label>
                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-5">
                          {namePlacementFields.map((field: { label: string; value: string }) => (
                            <div key={field?.label} className="flex items-center">
                              <input
                                type="radio"
                                id={`card-name-${field?.label}`}
                                name="name-placement"
                                value={field?.value}
                                className="mr-2 focus:ring-[#AE9164] text-[#b88c4f]"
                                checked={namePlacement === field?.value}
                                onChange={handleNamePlacementRadioChange}
                              />
                              <label htmlFor={`card-name-${field?.label}`} className="text-gray-800 m-0">
                                {field?.label}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Order Instructions */}
                    {orderInstructionsFieldElementId && (
                      <div className="mb-4 sm:mb-6">
                        <label className="block text-gray-800 font-semibold pb-2 sm:pb-3">
                          {getFieldByElementId(orderInstructionsFieldElementId, "label", "Order Instructions")}
                        </label>
                        <textarea
                          name="instructions"
                          className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#AE9164] focus:border-[#AE9164] placeholder-gray-400"
                          placeholder={getFieldByElementId(orderInstructionsFieldElementId, "placeholder", "text")}
                          rows={4}
                          value={inputValues.instructions}
                          onChange={(e) => setInputValues((prev) => ({ ...prev, instructions: e.target.value }))}
                        />
                      </div>
                    )}

                    {/* Total Price */}
                    <div className="font-bold justify-center gap-4 text-primary hidden lg:flex">
                      <p>{cartTexts.totalprice}:</p>
                      <div>
                        {currencyTexts.aed} {totalPrice}
                      </div>
                    </div>

                    {/* Add to Cart Button */}
                    <button
                      className={`w-full flex justify-center py-3 rounded-md text-lg font-bold ${
                        addToCartStatus === "submitting" ? "opacity-50 cursor-not-allowed" : ""
                      } text-white hover:bg-[#9d7c47] bg-[#AE9164] transition duration-200 mt-4`}
                      onClick={(e) => handleAddToCart(e as unknown as Event)}
                    >
                      {addToCartStatus === "submitting" ? (
                        <div className="h-5 w-5 flex justify-center border-b-2 border-white rounded-full animate-spin" />
                      ) : (
                        "Add to Cart"
                      )}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default ProductDetail;
