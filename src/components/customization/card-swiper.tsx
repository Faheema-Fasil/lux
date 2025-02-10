"use client";
import React, { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Image from "next/image";
import Moveable from "react-moveable";
import { CardSwiperProps } from "@/types/products/custom";
import { debounce } from "lodash";
import { customizationElementDefaultValues } from "@/helper/constants";
import { overflow } from "html2canvas/dist/types/css/property-descriptors/overflow";
import { Navigation } from "swiper/modules";

const CardSwiper: React.FC<CardSwiperProps> = ({
  cardFront,
  cardBack,
  displayBorder,
  setSwiperSize,
  swiperSize,
  inputValues,
  elementValues,
  handleTextClick,
  cardPlacement,
  productId,
  chipSize,
  chipSizeFields,
  image,
  design,
  selectedLogo,
  predesignedlogoimage,
  removeBranding,
  visibility,
  targetRefs,
  handleElementChange,
  handleDragStart,
  handleDragEnd,
  isDragging,
  swiperRef,
  editable,
  TextFields,
  namePlacement,
  dualCardNumberPlacement,
  textColor,
  isCapturing,
  setImageLoaded,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false); // State for hover effect

  const getTextOpacity = (name: string) => {
    const hasInputValue = inputValues[name] || name === "";

    if (hasInputValue) {
      return isHovered ? 0.6 : 1;
    } else {
      return 0.2;
    }
  };
  const scalingFactors = {
    tablet: productId === "296" ? 0.56 : 0.54,
    mobile: productId === "296" ? 0.85 : 0.65,
  };

  // Helper function to calculate responsive dimensions
  const calculateResponsiveValues = (isTablet: any, scaleFactor: any) => ({
    left: (value: any) => (isTablet ? value * scaleFactor : value),
    top: (value: any) => (isTablet ? value * scaleFactor : value),
    size: (value: any) => (isTablet ? value * scaleFactor : value),
  });

  const [chipValues, setChipValues] = useState<any>({
    left: 90,
    scale: 1,
    top: 120,
    height: 40,
    width: 120,
    rotate: 0,
    fontSize: 24,
  });

  const [smallChipValues, setSmallChipValues] = useState<any>({
    left: 90,
    scale: 1,
    top: 120,
    height: 40,
    width: 120,
    rotate: 0,
    fontSize: 24,
  });

  const [secondChipValues, setSecondChipValues] = useState<any>({
    left: 610,
    scale: 1,
    top: 257,
    // height: 40,
    // width: 120,
    rotate: 0,
    fontSize: 24,
  });

  const [defaultValues, setDefaultValues] = useState<any>({
    brandingSite: {
      left: 30,
      scale: 1,
      top: 3,
      height: 40,
      width: 100,
      rotate: 0,
      fontSize: 20,
    },
    brandingDes: {
      left: 30,
      scale: 1,
      top: 400,
      height: 40,
      width: 100,
      rotate: 0,
      fontSize: 20,
    },
  });

  const [cardNumberBack, setCardNumberBack] = useState<any>({
    number: {
      left: 200,
      top: 240,
      width: 300,
      height: 40,
      rotate: 0,
      fontSize: 25,
    },
  });

  const [dualCardBack, setDualCardBack] = useState<any>({
    name: {
      left: 200,
      top: 240,
      width: 300,
      height: 40,
      rotate: 0,
      fontSize: 25,
    },
    cardnumber1: {
      left: 40,
      top: 270,
      width: 300,
      height: 40,
      rotate: 0,
      fontSize: 25,
    },
    cardnumber2: {
      left: 40,
      top: 320,
      width: 300,
      height: 40,
      rotate: 0,
      fontSize: 25,
    },
  });

  useEffect(() => {
    const updateValues = () => {
      const isTablet = window.innerWidth <= 900;
      const scaleFactor = isTablet ? scalingFactors.tablet : 1;
      const responsive = calculateResponsiveValues(isTablet, scaleFactor);

      const specialProduct = productId === "296";

      // Update chip values
      setChipValues({
        left: responsive.left(specialProduct ? 95 : 85),
        top: responsive.top(specialProduct ? 130 : 175),
        width: responsive.size(120),
        height: responsive.size(40),
        rotate: 0,
        fontSize: responsive.size(12),
      });

      // Update small chip values
      setSmallChipValues({
        left: responsive.left(specialProduct ? 98 : 85),
        top: responsive.top(specialProduct ? 176 : 175),
        width: responsive.size(100),
        height: responsive.size(20),
        rotate: 0,
        fontSize: responsive.size(12),
      });

      // Update second chip values
      setSecondChipValues({
        left: responsive.left(specialProduct ? 610 : 620),
        top: responsive.top(specialProduct ? 255 : 280),
        rotate: 0,
        fontSize: responsive.size(14),
      });

      // Update card number back values
      setCardNumberBack({
        number: {
          left: responsive.left(
            productId === "657"
              ? customizationElementDefaultValues.center + 20
              : customizationElementDefaultValues.center
          ),
          top: responsive.top(productId === "657" ? 280 : 330),
          width: responsive.size(300),
          height: responsive.size(40),
          rotate: 0,
          fontSize: responsive.size(32),
        },
      });

      // Update dual card back values
      setDualCardBack({
        name: {
          left: responsive.left(
            productId === "657"
              ? customizationElementDefaultValues.center + 20
              : customizationElementDefaultValues.center
          ),
          top: responsive.top(productId === "657" ? 230 : 260),
          width: responsive.size(300),
          height: responsive.size(40),
          rotate: 0,
          fontSize: responsive.size(30),
        },
        cardnumber1: {
          left: responsive.left(450),
          top: responsive.top(120),
          width: responsive.size(300),
          height: responsive.size(40),
          rotate: 0,
          fontSize: responsive.size(30),
        },
        cardnumber2: {
          left: responsive.left(40),
          top: responsive.top(340),
          width: responsive.size(300),
          height: responsive.size(40),
          rotate: 0,
          fontSize: responsive.size(30),
        },
      });

      // Update default values
      setDefaultValues({
        brandingSite: {
          left: responsive.left(23),
          top: responsive.top(5),
          width: responsive.size(100),
          height: responsive.size(40),
          rotate: 0,
          fontSize: responsive.size(15),
        },
      });
    };

    updateValues();
    window.addEventListener("resize", updateValues);

    return () => {
      window.removeEventListener("resize", updateValues);
    };
  }, []);

  const updateSwiperSize = () => {
    const width = window.innerWidth;

    if (width >= 900) {
      // Large screens
      setSwiperSize({ height: "600px", width: "800px" });
    } else {
      // Small screens (Mobile)
      setSwiperSize({ height: "350px", width: "450px" });
    }
  };

  useEffect(() => {
    const debouncedUpdate = debounce(updateSwiperSize, 200);

    updateSwiperSize();
    window.addEventListener("resize", debouncedUpdate);

    return () => {
      window.removeEventListener("resize", debouncedUpdate);
      debouncedUpdate.cancel();
    };
  }, []);

  const handleSlideChange = (index: any) => {
    setActiveIndex(index);
    const swiper = swiperRef?.current?.swiper;
    swiper?.slideTo(index); // Navigate to the selected slide
  };

  //Slide to back of card when remove branding is selected
  useEffect(() => {
    const handleNextSlide = () => {
      if (removeBranding === "yes") {
        const swiper = swiperRef?.current?.swiper;
        swiper?.slideTo(1); // Navigate to the selected slide
      }
    };
    handleNextSlide();
  }, [removeBranding]);

  const MAX_WIDTH = 500;
  const MAX_HEIGHT = 500;

  const handleRestrictedScale = (e: any, targetName: any) => {
    const [scaleX, scaleY] = e.scale;
    const { width, height } = e.target.getBoundingClientRect();

    const newWidth = width * scaleX;
    const newHeight = height * scaleY;

    if (newWidth > MAX_WIDTH || newHeight > MAX_HEIGHT) {
      // Prevent scaling beyond the maximum size
      e.set([Math.min(MAX_WIDTH / width, scaleX), Math.min(MAX_HEIGHT / height, scaleY)]);
    }
    e.target.style.transform = e.transform;
  };

  // Function to get the style for each text element
  const getTextElementStyle: any = (name: string) => ({
    position: "absolute",
    left: elementValues[name]?.left,
    top: elementValues[name]?.top,
    height: elementValues[name]?.height * elementValues[name]?.scale,
    // transform: `scale(${elementValues[name]?.scale}) rotate(${elementValues[name]?.rotate}deg)`,
    transform: `${name !== "cardnumber1" && name !== "cardnumber2" ? "translate(-50%, -50%)" : ""} scale(${
      elementValues[name]?.scale
    }) rotate(${elementValues[name]?.rotate}deg)`,
    color: textColor === "gold" ? "goldenrod" : textColor,
    // elementValues.cardnumber1 && elementValues.cardnumber2 ? "#b88c4f" : "white",
    fontSize: `${elementValues[name]?.fontSize * elementValues[name]?.scale}px`,
    borderRadius: "4px",
    cursor: editable ? "move" : "default",
    // opacity: inputValues[name as keyof typeof inputValues] ? 1 : 0.2,
    opacity: getTextOpacity(name),
    whiteSpace: "nowrap",
  });

  // Function to get placeholder text for each element
  const getPlaceholderText = (name: any) => {
    const field = TextFields.find((field: any) => field.name === name);
    return field ? field.placeholder : null;
  };

  return (
    <>
      <div
        className="flex justify-center items-center h-[50vh] md:h-[70vh] lg:h-[calc(100vh - 5vh)] xl:h-[80vh] 2xl:h-[80vh] font-sans "
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Swiper
          ref={swiperRef}
          spaceBetween={10}
          // modules={[Navigation]}
          slidesPerView={1}
          style={{
            height: swiperSize.height,
            width: swiperSize.width,
          }}
          allowTouchMove={false}
          onSlideChange={() => setActiveIndex(swiperRef?.current?.swiper.activeIndex)}
          // navigation={true}
          // className="custom-swiper"
        >
          <SwiperSlide>
            <div className="relative overflow-hidden rounded-3xl">
              {/* <img src={cardFront} alt="Card Front Preview" className=" border  rounded-3xl border-gray-300 " /> */}
              {/* <Image src={cardFront} height={700} width={800} alt="Card Front Preview" className=" border  rounded-3xl border-gray-300 " /> */}

              {/* {isCapturing ? (
                <img
                  src={cardFront}
                  alt="Card Front Preview"
                  className="border rounded-3xl border-gray-300"
                  onLoad={() => setImageLoaded(true)} // Ensure image is fully loaded before capture
                />
              ) : (
                <Image
                  src={cardFront}
                  height={700}
                  width={800}
                  alt="Card Front Preview"
                  className="border rounded-3xl border-gray-300"
                />
              )} */}

              <Image
                src={cardFront}
                height={700}
                width={800}
                alt="Card Front Preview"
                className={`border rounded-3xl border-gray-300 transition-opacity duration-200 ${
                  isCapturing ? "opacity-0" : "opacity-100"
                }`}
              />

              <img
                src={cardFront}
                alt="Card Front Preview"
                className={`border rounded-3xl border-gray-300 absolute top-0 left-0 w-full h-full transition-opacity duration-200 ${
                  isCapturing ? "opacity-100" : "opacity-0"
                }`}
                crossOrigin="anonymous"
                onLoad={() => setImageLoaded(true)}
              />

              {/* Display Border */}
              {displayBorder && (
                <div
                  ref={targetRefs.borderRef}
                  className="absolute top-0 left-0 w-full h-full transition-opacity duration-300 ease-in-out"
                  style={{
                    opacity: getTextOpacity(""),
                  }}
                >
                  <img
                    src={displayBorder}
                    alt="Display Border"
                    crossOrigin="anonymous"
                    className="shadow-lg border border-gray-300 rounded-3xl"
                  />
                </div>
              )}

              {/* Image elements */}
              {[
                {
                  name: "image",
                  refKey: "image",
                  element: image,
                  condition: image !== "" && selectedLogo?.includes("own logo"),
                },
                // {
                //   name: "predesignedlogoimage",
                //   refKey: "predesignedlogoimage",
                //   element: predesignedlogoimage,
                //   condition: predesignedlogoimage != "",
                // },
                {
                  name: "design",
                  refKey: "design",
                  element: design,
                  condition: design !== "" && selectedLogo?.includes("own design"),
                },
              ].map(
                ({ name, refKey, element, condition }) =>
                  condition && (
                    <div
                      className="absolute transition-opacity duration-300 ease-in-out moveable-control"
                      key={name}
                      onClick={() => handleTextClick(name)}
                      ref={(el: any) => (targetRefs.current[refKey] = el)}
                      style={{
                        position: "absolute",
                        left: elementValues[name].left,
                        top: elementValues[name].top,
                        width: elementValues[name].width,
                        transform: `scale(${elementValues[name].scale}) rotate(${elementValues[name].rotate}deg)`,
                        transformOrigin: "center center",
                        opacity: getTextOpacity(""),
                        maxWidth: "100%",
                        maxHeight: "100%",
                      }}
                    >
                      {element && (
                        <img
                          src={element}
                          alt="Uploaded Preview"
                          crossOrigin="anonymous"
                          width={elementValues[name].width}
                          height={elementValues[name].height}
                          style={{ objectFit: "contain" }}
                        />
                      )}
                    </div>
                  )
              )}

              {[
                {
                  name: "predesignedlogoimage",
                  refKey: "predesignedlogoimage",
                  element: predesignedlogoimage,
                  condition: predesignedlogoimage != "",
                },
              ].map(
                ({ name, refKey, element, condition }) =>
                  condition && (
                    <div
                      className="absolute transition-opacity duration-300 ease-in-out moveable-control"
                      key={name}
                      onClick={() => handleTextClick(name)}
                      ref={(el: any) => (targetRefs.current[refKey] = el)}
                      style={{
                        position: "absolute",
                        left: elementValues[name].left,
                        top: elementValues[name].top,
                        width: elementValues[name].width,
                        transform: `scale(${elementValues[name].scale}) rotate(${elementValues[name].rotate}deg)`,
                        transformOrigin: "center center",
                        opacity: getTextOpacity(""),
                        maxWidth: "100%",
                        maxHeight: "100%",
                      }}
                    >
                      <img
                        src={element}
                        crossOrigin="anonymous"
                        alt="Uploaded Preview"
                        width={elementValues[name].width}
                        height={elementValues[name].height}
                        style={{ objectFit: "contain" }}
                      />
                    </div>
                  )
              )}

              {chipSizeFields && chipSize === "big" && (
                <>
                  <div
                    className="transition-opacity duration-300 ease-in-out"
                    style={{
                      position: "absolute",
                      left: `${chipValues.left}px`,
                      top: `${chipValues.top}px`,
                      width: `${chipValues.width}px`,
                      height: `${chipValues.height}px`,
                      transformOrigin: "center center",
                      opacity: getTextOpacity(""),
                    }}
                  >
                    <>
                      <img
                        src={
                          chipSizeFields.find((field: any) => field.value.toLowerCase() === "big")?.image ||
                          "/default-image.png"
                        }
                        crossOrigin="anonymous"
                        alt="Chip"
                        className=""
                      />
                    </>
                  </div>

                  {elementValues.cardnumber1 && elementValues.cardnumber2 && (
                    <div
                      className="transition-opacity duration-300 ease-in-out"
                      style={{
                        position: "absolute",
                        left: `${secondChipValues.left}px`,
                        top: `${secondChipValues.top}px`,
                        width: `${chipValues.width}px`,
                        height: `${chipValues.height}px`,
                        transformOrigin: "center center",
                        opacity: getTextOpacity(""),
                      }}
                    >
                      <>
                        <img
                          crossOrigin="anonymous"
                          src={
                            chipSizeFields.find((field: any) => field.value.toLowerCase() === "big")?.image ||
                            "/default-image.png"
                          }
                          alt="Uploaded Preview"
                          width={chipValues.width}
                          height={chipValues.height}
                          style={{ objectFit: "contain" }}
                        />
                      </>
                    </div>
                  )}
                </>
              )}

              {chipSizeFields && chipSize === "small" && (
                <>
                  <div
                    style={{
                      position: "absolute",
                      left: `${smallChipValues.left}px`,
                      top: `${smallChipValues.top}px`,
                      width: `${smallChipValues.width}px`,
                      height: `${smallChipValues.height}px`,
                      transformOrigin: "center center",
                    }}
                  >
                    <img
                      crossOrigin="anonymous"
                      src={
                        chipSizeFields.find((field: any) => field.value.toLowerCase() === "small")?.image ||
                        "/default-image.png"
                      }
                      alt="Chip"
                      className=""
                    />
                  </div>
                  {elementValues.cardnumber1 && elementValues.cardnumber2 && (
                    <div
                      style={{
                        position: "absolute",
                        left: `${secondChipValues.left}px`,
                        top: `${secondChipValues.top}px`,
                        width: `${chipSize === "small" ? smallChipValues.width : chipValues.width}px`,
                        height: `${chipSize === "small" ? smallChipValues.height : chipValues.height}px`,
                        transformOrigin: "center center",
                      }}
                    >
                      <>
                        <img
                          crossOrigin="anonymous"
                          src={
                            chipSizeFields.find((field: any) => field.value.toLowerCase() === "small")?.image ||
                            "/default-image.png"
                          }
                          alt="Chip"
                          className=""
                        />
                      </>
                    </div>
                  )}
                </>
              )}

              {/* Text Elements */}
              {[
                {
                  name: "name",
                  refKey: "name",
                  condition: namePlacement === "front",
                },
                {
                  name: "optional",
                  refKey: "optional",
                  condition: elementValues.optional,
                },
                {
                  name: "optional2",
                  refKey: "optional2",
                  condition: elementValues.optional2,
                },
                {
                  name: "number",
                  refKey: "number",
                  condition: cardPlacement === "front" && elementValues.number,
                },
                {
                  name: "topnumber",
                  refKey: "topnumber",
                  condition: elementValues.topnumber,
                },
                {
                  name: "cardnumber1",
                  refKey: "cardnumber1",
                  condition: dualCardNumberPlacement === "front" && elementValues.cardnumber1,
                },
                {
                  name: "cardnumber2",
                  refKey: "cardnumber2",
                  condition: dualCardNumberPlacement === "front" && elementValues.cardnumber2,
                },
              ].map(
                ({ name, refKey, condition }) =>
                  condition && (
                    <div
                      key={name}
                      className=" transition-opacity duration-300 ease-in-out"
                      ref={(el: any) => (targetRefs.current[refKey] = el)}
                      onClick={() => handleTextClick(name)}
                      style={{
                        ...getTextElementStyle(name),
                        opacity: getTextOpacity(name),
                      }}
                    >
                      {inputValues[name] ? inputValues[name] : getPlaceholderText(name)}
                    </div>
                  )
              )}

              {/* Moveable Components */}
              {editable && (
                <>
                  {[
                    { name: "name", refKey: "name", visibility: visibility.name },
                    {
                      name: "optional",
                      refKey: "optional",
                      visibility: visibility.optional,
                    },
                    {
                      name: "predesignedlogoimage",
                      refKey: "predesignedlogoimage",
                      visibility: visibility.predesignedlogoimage,
                    },
                    {
                      name: "design",
                      refKey: "design",
                      visibility: visibility.design,
                    },
                    {
                      name: "image",
                      refKey: "image",
                      visibility: visibility.image,
                    },
                    {
                      name: "optional2",
                      refKey: "optional2",
                      visibility: visibility.optional2,
                    },
                    {
                      name: "number",
                      refKey: "number",
                      visibility: visibility.number,
                    },
                    {
                      name: "cardnumber1",
                      refKey: "cardnumber1",
                      visibility: visibility.cardnumber1,
                    },
                    {
                      name: "cardnumber2",
                      refKey: "cardnumber2",
                      visibility: visibility.cardnumber2,
                    },
                    {
                      name: "topnumber",
                      refKey: "topnumber",
                      visibility: visibility.topnumber,
                    },
                  ].map(
                    ({ name, refKey, visibility }) =>
                      visibility && (
                        // <Moveable
                        //   key={name}
                        //   target={targetRefs.current[refKey]}
                        //   draggable={true}
                        //   scalable={true}
                        //   keepRatio={true}
                        //   rotatable={true}
                        //   onDragStart={() => handleDragStart(name)}
                        //   onDragEnd={() => handleDragEnd(name)}
                        //   onDrag={(e) => handleElementChange(e, name, "drag")}
                        //   onScale={(e) =>
                        //     name === "image" || name === "predesignedlogoimage"
                        //       ? handleRestrictedScale(e, name)
                        //       : handleElementChange(e, name, "scale")
                        //   }
                        //   onRotate={(e) => handleElementChange(e, name, "rotate")}
                        //   visible={isDragging[name]}
                        // />
                        <Moveable
                          key={name}
                          target={targetRefs.current[refKey]}
                          draggable={true}
                          scalable={true}
                          keepRatio={true}
                          rotatable={true}
                          rotationPosition={"top"}
                          origin={false}
                          className="moveable-control"
                          onDragStart={() => handleDragStart(name)}
                          onDragEnd={() => handleDragEnd(name)}
                          onDrag={(e) => handleElementChange(e, name, "drag")}
                          onScale={(e) =>
                            name === "image" || name === "predesignedlogoimage"
                              ? handleRestrictedScale(e, name)
                              : handleElementChange(e, name, "scale")
                          }
                          onRotate={(e) => handleElementChange(e, name, "rotate")}
                          visible={isDragging[name]}
                          rotationHandleStyle={{
                            background: "#4a5568",
                            borderRadius: "50%",
                            border: "2px solid white",
                            width: "24px",
                            height: "24px",
                            boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                            cursor: "grab",
                          }}
                        />
                      )
                  )}
                </>
              )}
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="relative">
              {/* Card Back Image */}
              {/* <img
              crossOrigin="anonymous" src={cardBack} alt="Card Back Preview" className="shadow-lg border border-gray-300 rounded-3xl " /> */}
              {/* <Image
                src={cardBack}
                height={700}
                width={800}
                alt="Card Back Preview"
                className=" border  rounded-3xl border-gray-300 "
              /> */}

              {isCapturing ? (
                <img
                  crossOrigin="anonymous"
                  src={cardBack}
                  alt="Card Front Preview"
                  className="border rounded-3xl border-gray-300"
                  onLoad={() => setImageLoaded(true)}
                />
              ) : (
                <Image
                  src={cardBack}
                  height={700}
                  width={800}
                  alt="Card Back Preview"
                  className=" border  rounded-3xl border-gray-300 "
                />
              )}

              {/* Card Number (Single Placement) */}
              {cardPlacement === "back" && elementValues.number && (
                <div
                  // ref={targetRefs.current[number]}
                  onClick={() => handleTextClick("number")}
                  className="transition-opacity duration-300 ease-in-out"
                  style={{
                    position: "absolute",
                    left: cardNumberBack.number.left,
                    top: cardNumberBack.number.top,
                    height: cardNumberBack.number.height,
                    transform: `translate(-50%, -50%)`,
                    color: textColor,
                    fontSize: cardNumberBack.number.fontSize,
                    borderRadius: "4px",
                    cursor: "default",
                    // opacity: inputValues.number ? 1 : 0.2,
                    opacity: getTextOpacity("number"),
                  }}
                >
                  {inputValues.number || TextFields.find((field: any) => field.name === "number")?.placeholder || null}
                </div>
              )}

              {/* Dual Card Numbers */}
              {dualCardNumberPlacement === "back" && elementValues.cardnumber1 && elementValues.cardnumber2 && (
                <>
                  <div
                    // ref={targetRef3}
                    onClick={() => handleTextClick("cardnumber1")}
                    className="transition-opacity duration-300 ease-in-out"
                    style={{
                      position: "absolute",
                      left: `${dualCardBack.cardnumber1.left}px`,
                      top: `${dualCardBack.cardnumber1.top}px`,
                      height: `${dualCardBack.cardnumber1.height}px`,
                      // transform: `translate(-50%, -50%)`,

                      color: textColor,
                      fontSize: `${dualCardBack.cardnumber1.fontSize}px`,
                      cursor: "default",
                      // opacity: inputValues.cardnumber1 ? 1 : 0.2,
                      opacity: getTextOpacity("cardnumber1"),
                    }}
                  >
                    {inputValues.cardnumber1 ||
                      TextFields.find((field: any) => field.name === "cardnumber1")?.placeholder ||
                      null}
                  </div>
                  <div
                    // ref={targetRef3}
                    onClick={() => handleTextClick("cardnumber2")}
                    className="transition-opacity duration-300 ease-in-out"
                    style={{
                      position: "absolute",
                      left: `${dualCardBack.cardnumber2.left}px`,
                      top: `${dualCardBack.cardnumber2.top}px`,
                      width: `${dualCardBack.cardnumber2.width}px`,
                      height: `${dualCardBack.cardnumber2.height}px`,
                      // transform: `translate(-50%, -50%)`,

                      color: textColor,
                      fontSize: `${dualCardBack.cardnumber2.fontSize}px`,
                      borderRadius: "4px",
                      cursor: "default",
                      // opacity: inputValues.cardnumber2 ? 1 : 0.2,
                      opacity: getTextOpacity("cardnumber2"),
                    }}
                  >
                    {inputValues.cardnumber2 ||
                      TextFields.find((field: any) => field.name === "cardnumber2")?.placeholder ||
                      null}
                  </div>
                </>
              )}

              {/* Name Placement */}
              {namePlacement === "back" && elementValues.name && (
                <div
                  onClick={() => handleTextClick("name")}
                  className="transition-opacity duration-300 ease-in-out"
                  // ref={targetRef1}
                  style={{
                    position: "absolute",
                    left: dualCardBack.name.left,
                    top: dualCardBack.name.top,
                    height: dualCardBack.name.height,
                    color: textColor,
                    fontSize: `${dualCardBack.name.fontSize}px`,
                    borderRadius: "4px",
                    cursor: "default",
                    transform: `translate(-50%, -50%)`,

                    // opacity: inputValues.name ? 1 : 0.2,
                    opacity: getTextOpacity("name"),
                  }}
                >
                  {inputValues.name || TextFields.find((field: any) => field.name === "name")?.placeholder || null}
                </div>
              )}

              {/* Branding */}
              {removeBranding === "no" && (
                <div
                  className="transition-opacity duration-300 ease-in-out"
                  style={{
                    position: "absolute",
                    left: defaultValues.brandingSite.left,
                    top: defaultValues.brandingSite.top,
                    height: defaultValues.brandingSite.height * defaultValues.brandingSite.scale,
                    transform: `scale(${defaultValues.brandingSite.scale}) rotate(${defaultValues.brandingSite.rotate}deg)`,
                    color: textColor,
                    fontSize: defaultValues.brandingSite.fontSize,
                    borderRadius: "4px",
                    cursor: "default",
                    opacity: getTextOpacity(""),
                  }}
                >
                  Luxmetallic.com
                </div>
              )}
            </div>
          </SwiperSlide>
          <div className="absolute bottom-8 xl:bottom-0 z-[30] left-1/2 transform -translate-x-1/2 flex space-x-5">
            {[0, 1].map((index) => (
              <button
                key={index}
                onClick={() => handleSlideChange(index)}
                className={`w-6 h-6 rounded-full ${activeIndex === index ? "bg-primary" : "bg-gray-500"}`}
              />
            ))}
          </div>
          {/* Radio Buttons Navigation */}
        </Swiper>
      </div>
    </>
  );
};

export default CardSwiper;
