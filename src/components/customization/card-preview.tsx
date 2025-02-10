import CardSwiper from "@/components/customization/card-swiper";
import { CardPreviewProps } from "@/types/customization/custom";
import { captureSwiperImages } from "@/helper/helper";
import React, { Fragment, useEffect, useRef, useState } from "react";

const CardPreview: React.FC<CardPreviewProps> = ({
  handleAddToCart,
  totalPrice,
  productPrice,
  product,
  cardFront,
  cardBack,
  setDisplayBorder,
  removeBranding,
  setChipSize,
  setSwiperSize,
  swiperSize,
  productId,
  setSelectedInsurance,
  predesignedlogoimage,
  chipSizeFields,
  inputValues,
  chipSize,
  loading,
  cardPlacement,
  image,
  design,
  setInputValues,
  swiperRef,
  selectedLogo,
  setSelectedLogo,
  setTotalPrice,
  setChipSizePrice,
  setBorderPrice,
  setLogoPrice,
  setPredesignedLogoPrice,
  setWorkwithdesignersPrice,
  setBrandingPrice,
  setSelectedPredesignedLogo,
  setSelectedBranding,
  setSelectedWorkWithDesigners,
  setCardPlacement,
  setNamePlacement,
  dualCardNumberPlacement,
  setDualCardNumberPlacement,
  displayBorder,
  setSelectedBorderId,
  addToCartStatus,
  elementValues,
  setElementValues,
  updateElementValues,
  editable,
  TextFields,
  namePlacement,
  textColor,
  visibility,
  setVisibility,
  targetRefs,
  setPredesignLogoImage,
  imageLoaded,
  setIsCapturing,
  isCapturing,
  setImageLoaded,
}) => {
  const [isDragging, setIsDragging] = useState({});
  const [isSaving, setIsSaving] = useState(false);


  // const [visibility, setVisibility] = useState({
  //   name: false,
  //   optional: false,
  //   optional2: false,
  //   number: false,
  //   topnumber: false,
  //   predesignedlogoimage: false,
  //   cardnumber1: false,
  //   cardnumber2: false,
  //   image: false,
  //   design: false,
  // });

  const lastScreenType = useRef<string | null>(null);

  function debounce(func: (...args: any[]) => void, delay: number) {
    let timeoutId: NodeJS.Timeout;
    return (...args: any[]) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  }

  //Function to handle setting elementValues depending on desktop or tablet screen using debounce
  useEffect(() => {
    const determineScreenType = () => {
      if (window.innerWidth >= 900) return "desktop";
      if (window.innerWidth <= 900 && window.innerWidth >= 768) return "tablet";
      return "mobile";
    };

    const handleResize = debounce(() => {
      const currentScreenType = determineScreenType();

      if (lastScreenType.current !== currentScreenType) {
        lastScreenType.current = currentScreenType;
        updateElementValues();
      }
    }, 300);

    lastScreenType.current = determineScreenType();
    updateElementValues();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleDragStart = (text: string) => setIsDragging((prev) => ({ ...prev, [text]: true }));

  const handleDragEnd = (text: string) => setIsDragging((prev) => ({ ...prev, [text]: false }));

  const handleElementChange = (e: any, text: keyof typeof elementValues, type: "drag" | "scale" | "rotate") => {
    let updatedValues;

    if (type === "drag") {
      const { left, top } = e;
      updatedValues = { ...elementValues[text], left, top };
    } else if (type === "scale" || type === "rotate") {
      const value = e[type];
      updatedValues = { ...elementValues[text], [type]: value };
    }

    if (updatedValues) {
      setElementValues((prev: any) => ({ ...prev, [text]: updatedValues }));
    }
  };

  const handleTextClick = (target: string) => setVisibility((prev: any) => ({ ...prev, [target]: !prev[target] }));

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside); // Cleanup on component unmount
    };
  }, []);

  const handleClickOutside = (e: MouseEvent) => {
    Object.keys(targetRefs.current).forEach((refKey) => {
      if (targetRefs.current[refKey] && !targetRefs.current[refKey].contains(e.target as Node)) {
        setVisibility((prev: any) => ({ ...prev, [refKey]: false }));
      }
    });
  };

  const handleSave = async () => {
    setIsSaving(true);
    const swiper = swiperRef?.current?.swiper;

    if (swiper && swiper.slides) {
      try {
        const imgData = await captureSwiperImages(swiperRef, setIsCapturing, imageLoaded);

        // Create a download link and trigger it
        const link: any = document.createElement("a");
        link.href = imgData;
        link.download = "combined_slides.png";
        link.click();
        setIsSaving(false);
      } catch (error) {
        console.error("Error capturing slides:", error);
        setIsSaving(false);
      }
    }
  };

  const resetButton = () => {
    setInputValues({});
    // setElementValues({}); Set element values back to default values
    setDisplayBorder(null);
    setSelectedLogo("none");
    setChipSize("small");
    setSelectedBorderId("none");
    setDualCardNumberPlacement("front");
    setSelectedWorkWithDesigners("no");
    setSelectedBranding("no");
    setSelectedWorkWithDesigners("no");
    setSelectedInsurance("no");
    setCardPlacement("front");
    setNamePlacement("front");
    setSelectedPredesignedLogo(null);
    setTotalPrice(productPrice);
    setChipSizePrice(0);
    setBorderPrice(0);
    setLogoPrice(0);
    setSelectedPredesignedLogo(null);
    setPredesignedLogoPrice(0);
    setPredesignLogoImage("");
    setSelectedLogo("none");
    setWorkwithdesignersPrice(0);
    setBrandingPrice(0);
  };

  return (
    <Fragment>
      <div className=" relative flex-1 block w-full md:w-1/4 md:overflow-y-auto">
        {/* Action area for displaying total price and action buttons */}
        <div className="lx-action-area z-10 flex justify-between items-center p-2 xl:p-5 border-b bg-white absolute top-0 w-full">
          <span className="text-lg xl:text-2xl font-bold text-primary rounded-lg">
            {product && <div>AED {totalPrice}</div>}
          </span>
          <div className="lx-actions flex gap-2">
            <div className="flex items-center space-x-2">
              {/* Download Button (visible on screens 500px and wider) */}
              <button
                onClick={() => handleSave()}
                disabled={isSaving}
                style={{ cursor: isSaving ? "not-allowed" : "pointer" }}
                className="relative lx-download-img cursor-pointer rounded justify-center items-center aspect-square min-w-[40px] bg-gray-200 hover:bg-[#a77b3f] group flex"
              >
                {isSaving ? (
                  <div className="h-5 w-5 flex justify-center border-b-2 border-white rounded-full animate-spin"></div>
                ) : (
                  <svg
                    className="w-5 h-5 text-gray-800 dark:text-gray-600 group-hover:text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 13V4M7 14H5a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1h-2m-1-5-4 5-4-5m9 8h.01"
                    />
                  </svg>
                )}
                <div className="absolute top-full mt-2 hidden group-hover:flex flex-col items-center">
                  <div className="relative bg-black text-white text-sm font-medium py-1 px-2 rounded shadow-lg text-nowrap">
                    Save Image
                  </div>
                </div>
              </button>
            </div>

            <button
              onClick={resetButton}
              className="relative bg-gray-200 text-gray-700 font-semibold py-2 min-w-[40px] aspect-square flex items-center justify-center rounded hover:bg-[#a77b3f] transition duration-200 group"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                className="w-5 h-5 fill-current group-hover:text-white"
              >
                <path
                  d="M15.312 11.424a5.5 5.5 0 0 1-9.201 2.466l-.312-.311h2.433a.75.75 0 0 0 0-1.5H3.989a.75.75 0 0 0-.75.75v4.242a.75.75 0 0 0 1.5 0v-2.43l.31.31a7 7 0 0 0 11.712-3.138.75.75 0 0 0-1.449-.39Zm1.23-3.723a.75.75 0 0 0 .219-.53V2.929a.75.75 0 0 0-1.5 0V5.36l-.31-.31A7 7 0 0 0 3.239 8.188a.75.75 0 1 0 1.448.389A5.5 5.5 0 0 1 13.89 6.11l.311.31h-2.432a.75.75 0 0 0 0 1.5h4.243a.75.75 0 0 0 .53-.219Z"
                  clipRule="evenodd"
                />
              </svg>
              <div className="absolute top-full mt-2 hidden group-hover:flex flex-col items-center">
                <div className="relative bg-black text-white text-sm font-medium py-1 px-2 rounded shadow-lg text-nowrap">
                  Reset
                </div>
              </div>
            </button>

            {/* <button
                className={`flex items-center bg-[#b88c4f] text-nowrap text-white py-2 px-4 rounded hover:bg-[#a77b3f] transition duration-200 ${
                  addToCartStatus === "submitting"
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                } text-white hover:bg-[#9d7c47] bg-[#AE9164] transition duration-200 mt-4`}
                onClick={handleAddToCart}
              >
                {addToCartStatus === "submitting" ? (
                  <div className="h-5 w-5 flex justify-center border-b-2 border-white rounded-full animate-spin"></div>
                ) : (
                  "Add to Cart"
                )}
              </button> */}

            <button
              onClick={handleAddToCart}
              disabled={addToCartStatus === "submitting"}
              style={{ cursor: addToCartStatus === "submitting" ? "not-allowed" : "pointer" }}
              className="flex items-center bg-[#b88c4f] text-sm text-nowrap text-white py-2 px-4 rounded hover:bg-[#a77b3f] transition duration-200"
            >
              {addToCartStatus === "submitting" ? (
                <div className="h-5 w-5 flex justify-center border-b-2 border-white rounded-full animate-spin"></div>
              ) : (
                "Add to Cart"
              )}
            </button>
          </div>
        </div>

        {/* Card area for displaying the card */}
        {/* <div
          id="captureContainer"
          className="h-auto flex justify-center items-center 
          mt-32 sm:mt-24 md:mt-28 lg:mt-32 xl:mt-32 2xl:mt-56
          transform 
          !xs:p-0 xs:scale-[0.6] xss:scale-[0.8] xxs:scale-[1] sm:scale-90 md:scale-80 lg:scale-70 z-10 xl:scale-65 2xl:scale-100 
          transition-transform duration-300  "
        > */}
        <div
          id="captureContainer"
          className="relative flex justify-center items-center 
            mt-7 sm:mt-20 md:mt-0 lg:mt-2 xl:mt-10 2xl:mt-14
            transform 
            scale-100 !xs:p-0 xs:scale-[0.7] sm:scale-[0.7] xl:scale-[0.8]  
            p-1 sm:p-2 md:p-1 
            transition-transform duration-300"
        >
          {/* className="relative flex justify-center items-center 
            mt-7 sm:mt-20 md:mt-0 lg:mt-2 xl:mt-20 2xl:mt-40 
            transform 
            scale-100 !xs:p-0 xs:scale-[0.7] xl:scale-[0.8] 2xl:scale-70 
            2xl:scale-100 
            p-1 sm:p-2 md:p-1 
            transition-transform duration-300"
        > */}
          {loading ? (
            <div className="animate-pulse flex space-x-4">
              <div className="rounded-lg bg-gray-200 h-80 w-[420px] md:w-[700px] md:h-[500px] mt-10  mb-10 "></div>
            </div>
          ) : (
            <CardSwiper
              swiperRef={swiperRef}
              cardFront={cardFront}
              cardBack={cardBack}
              displayBorder={displayBorder}
              predesignedlogoimage={predesignedlogoimage}
              inputValues={inputValues}
              elementValues={elementValues}
              productId={productId}
              handleTextClick={handleTextClick}
              removeBranding={removeBranding}
              loading={loading}
              cardPlacement={cardPlacement}
              chipSize={chipSize}
              chipSizeFields={chipSizeFields}
              image={image}
              design={design}
              selectedLogo={selectedLogo}
              setSwiperSize={setSwiperSize}
              swiperSize={swiperSize}
              visibility={visibility}
              targetRefs={targetRefs}
              handleElementChange={handleElementChange}
              handleDragStart={handleDragStart}
              handleDragEnd={handleDragEnd}
              isDragging={isDragging}
              editable={editable}
              TextFields={TextFields}
              namePlacement={namePlacement}
              dualCardNumberPlacement={dualCardNumberPlacement}
              textColor={textColor}
              isCapturing={isCapturing}
              setImageLoaded={setImageLoaded}
            />
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default CardPreview;
