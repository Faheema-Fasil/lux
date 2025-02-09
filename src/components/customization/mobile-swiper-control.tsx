import { useEffect, useRef, useState } from "react";
import { Button, Drawer, List, ListItem, ListItemText } from "@mui/material";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import FieldPrice from "./field-price";
import DigitalLinkModal from "./digital-link-modal";
import Link from "next/link";
import LoadingSkeleton from "../common/skeleton-loader";
import { customizationFieldTypes } from "@/helper/constants";
import MobileDrawer from "./mobile-drawer";

export default function CustomCardSwiper({
  chipSizeFields,
  setChipSizePrice,
  setSelectedChipSize,
  selectedChipSize,
  addToCartStatus,
  allVariations,
  selectedVariationId,
  inputValues,
  selectedBorderId,
  handleVariationChange,
  predesignedLogoFields,
  selectedInsurance,
  dualCardNumberPlacement,
  TextFields,
  setPredesignLogoImage,
  handleInputChange,
  getFieldByElementId,
  toggleModal,
  isDigitalLinkModalOpen,
  setIsDigitalLinkModalOpen,
  setSelectedImage,
  filteredBorders,
  filteredLogos,
  handleImageChange,
  selectedProfileImage,
  cardPlacementFields,
  setuploadedDigitalProfileImage,
  uploadedDigitalProfileImage,
  setCardPlacement,
  cardPlacement,
  namePlacementFields,
  setNamePlacement,
  namePlacement,
  selectedPredesignedLogo,
  dualCardNumberPlacementFields,
  workWithDesignersFields,
  setSelectedPredesignedLogo,
  setDualCardNumberPlacement,
  borderFields,
  addBorder,
  setWorkwithdesignersPrice,
  setPredesignedLogoPrice,
  setSelectedWorkWithDesigners,
  selectedWorkWithDesigners,
  logoFields,
  setSelectedLogo,
  setLogoPrice,
  handleFileChange,
  handleDesignInput,
  image,
  selectedLogo,
  design,
  insuranceFields,
  workWithOurDigitalLinkCreators,
  setWorkWithOurDigitalLinkCreators,
  setSelectedInsurance,
  setInsurancePrice,
  removeBrandingFields,
  setSelectedBranding,
  selectedBranding,
  setBrandingPrice,
  handleAddToCart,
  fetchLabel,
}: any) {
  const [swiperInstance, setSwiperInstance] = useState<any>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [navigationDrawer, setNavigationDrawer] = useState(false);

  const steps = [
    { name: "CHOOSE VARIANT", component: renderChooseVariant() },
    ...(TextFields?.length > 0
      ? TextFields.filter((field: any) => field.section === "top").map((field: any, index: any) => ({
          name: `TEXT FIELD ${index + 1}`,
          component: renderTextField(field),
        }))
      : []),
    // { name: "TEXT FIELDS", component: renderTextFields() },
    { name: "CARD NUMBER PLACEMENT", component: renderCardPlacement() },
    { name: "CARD NAME PLACEMENT", component: renderCardNamePlacement() },
    { name: "DUAL CARD NUMBER PLACEMENT", component: renderDualCardNumberPlacement() },
    { name: "CHOOSE BORDER", component: renderChooseBorder() },
    { name: "CHOOSE LOGO", component: renderChooseLogo() },
    { name: "OWN LOGO", component: selectedLogo?.includes("own logo") ? renderCustomLogo() : null },
    { name: "OWN DESIGN", component: selectedLogo?.includes("own design") ? renderCustomDesign() : null },
    { name: "PRE DESIGNED LOGOS", component: renderPredesignedLogos() },
    { name: "WORK WITH OUR DESIGNERS", component: renderWorkWithOurDesigners() },
    { name: "INSURANCE REQUIRED", component: renderInsuranceRequired() },
    { name: "REMOVE BRANDING", component: renderRemoveBranding() },
    { name: "DO YOU WANT US TO CREATE A DIGITAL LINK?", component: renderBottomIfRequired() },
    {
      name:
        workWithOurDigitalLinkCreators === "no"
          ? "WORK WITH OUR DIGITAL LINK CREATORS - NO"
          : "WORK WITH OUR DIGITAL LINK CREATORS - YES",
      component: workWithOurDigitalLinkCreators === "no" ? renderNo() : renderYes(),
    },
    { name: "ADDITIONAL REQUESTS", component: renderBottomLast() },
    { name: "ADD TO CART", component: renderAddToCart() },
  ].filter((step) => step.component);

  const toggleNavigationDrawer = () => {
    setNavigationDrawer(!navigationDrawer);
  };

  const handleStepClick = (index: number) => {
    setNavigationDrawer(false);
    setActiveStep(index);
    swiperInstance?.slideTo(index);
  };

  function renderChooseVariant() {
    if (!allVariations?.length) return null;

    return (
      <div className="space-y-4 p-4 rounded-lg">
        <label htmlFor="add-borders" className="block pb-3 border-b border-gray-300 text-gray-800 font-semibold mb-2">
          CHOOSE VARIANT
        </label>
        <Swiper
          slidesPerView={3.5} // Show 3.5 slides, so part of the next slide is visible
          spaceBetween={10} // Adjust space between slides to fine-tune the visibility
          className="inner-swiper"
          centeredSlides={false} // This ensures that slides are aligned to the left
        >
          {allVariations.map((variation: any) => (
            <SwiperSlide key={variation.id}>
              <div
                className={`p-2 rounded-sm transition-shadow cursor-pointer ${
                  Number(selectedVariationId) === variation.id
                    ? "bg-[#e9e9e9] border-2 border-[#AE9164]"
                    : "border-gray-300 hover:bg-gray-100 border-0"
                }`}
                onClick={() => handleVariationChange(Number(variation.id))}
                style={{ boxSizing: "border-box" }}
              >
                <div className="relative flex justify-between items-center text-center mx-auto w-full h-10 overflow-hidden mb-1">
                  {variation?.images?.[0]?.src && (
                    <Image
                      src={variation.images[0].src}
                      alt={variation.name}
                      layout="fill"
                      objectFit="cover"
                      priority
                      className="rounded-md scale-[8]"
                    />
                  )}
                </div>
                <h3 className="text-center font-semibold text-[13px] text-gray-800">
                  {
                    variation.attributes.find((attribute: any) => attribute.slug.toLowerCase().includes("metal-finish"))
                      ?.option
                  }
                </h3>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    );
  }

  function renderTextField(field: any) {
    return (
      <div className="p-4 pb-8 rounded-lg">
        <label
          htmlFor={field.elementId}
          className="block pb-3 border-b border-gray-300 text-gray-800 font-semibold mb-2"
        >
          {getFieldByElementId(field.elementId, "label", field.defaultLabel)}
        </label>
        <input
          id={field.elementId}
          type={field.type}
          name={field.name}
          maxLength={20}
          className="w-full px-4 py-3 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#AE9164] focus:border-[#AE9164] placeholder-gray-400"
          placeholder={getFieldByElementId(field.elementId, "placeholder", field.defaultLabel) || field.placeholder}
          onChange={handleInputChange}
        />
      </div>
    );
  }

  function renderCardPlacement() {
    if (!cardPlacementFields?.length) return null;
    return (
      <div className="p-4 rounded-lg">
        {cardPlacementFields && cardPlacementFields.length > 0 && (
          <div className="mb-6">
            <div className="">
              {cardPlacementFields?.length > 0 && (
                <div className="mb-6">
                  <label className="block text-gray-800 font-semibold mb-4 pb-3 border-b border-gray-300">
                    {fetchLabel(customizationFieldTypes?.placement)}
                  </label>
                  <div className="flex items-center space-x-10">
                    {cardPlacementFields &&
                      cardPlacementFields.map((cardPlacementField: any, index: number) => (
                        <div key={index} className="flex items-center gap-2">
                          <div>
                            <input
                              type="radio"
                              id={cardPlacementField.value.toLowerCase()}
                              name={cardPlacementField.name}
                              value={cardPlacementField.value.toLowerCase()}
                              className="h-4 w-4 text-[#b88c4f] focus:ring-[#AE9164] border-gray-300 rounded-full"
                              checked={cardPlacement == cardPlacementField.value.toLowerCase()}
                              onChange={() => {
                                setCardPlacement(cardPlacementField.value.toLowerCase());
                              }}
                            />
                            <label
                              htmlFor={cardPlacementField.value.toLowerCase()}
                              className="text-gray-800 ml-2 cursor-pointer"
                            >
                              {cardPlacementField.label}
                            </label>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }

  function renderCardNamePlacement() {
    if (!namePlacementFields?.length) return null;
    return (
      <div className="p-4 rounded-lg">
        {namePlacementFields && namePlacementFields.length > 0 && (
          <div className="mb-6">
            {namePlacementFields && namePlacementFields.length > 0 && (
              <label className="block text-gray-800 font-semibold mb-4 pb-3 border-b border-gray-300">
                {fetchLabel(customizationFieldTypes?.namePlacement)}
              </label>
            )}

            <div className="flex items-center space-x-10">
              {namePlacementFields &&
                namePlacementFields.length > 0 &&
                namePlacementFields.map((namePlacementField: any, index: number) => (
                  <div
                    key={namePlacementField.value}
                    className={`flex items-center cursor-pointer`}
                    onClick={() => setNamePlacement(namePlacementField.value.toLowerCase())}
                  >
                    <input
                      type="radio"
                      id={`nameplacement-${namePlacementField.value.toLowerCase()}`}
                      name={namePlacementField.value.toLowerCase()}
                      value={namePlacementField.value.toLowerCase()}
                      className="mr-2 focus:ring-[#AE9164] text-[#b88c4f]"
                      checked={namePlacement === namePlacementField.value.toLowerCase()}
                    />
                    <label
                      htmlFor={`nameplacement-${namePlacementField.value.toLowerCase()}`}
                      className="text-gray-800 m-0 cursor-pointer"
                      onClick={() => {
                        setNamePlacement(namePlacementField.value.toLowerCase());
                      }}
                    >
                      {namePlacementField.label}
                    </label>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  function renderDualCardNumberPlacement() {
    if (!dualCardNumberPlacementFields?.length) return null;
    return (
      <div className="p-4 rounded-lg">
        {dualCardNumberPlacementFields && dualCardNumberPlacementFields.length > 0 && (
          <div>
            {/* Dual Card Number Placement */}
            <div className="mb-6">
              {dualCardNumberPlacementFields && dualCardNumberPlacementFields.length > 0 && (
                <label className="block text-gray-800 font-semibold mb-4 pb-3 border-b border-gray-300">
                  {fetchLabel(customizationFieldTypes?.dualCardNumberPlacement)}
                </label>
              )}

              <div className="flex flex-row">
                {dualCardNumberPlacementFields &&
                  dualCardNumberPlacementFields.length > 0 &&
                  dualCardNumberPlacementFields.map((dualCardNumberPlacementField: any, index: number) => (
                    <div key={index} className="flex items-center mr-4">
                      <input
                        type="radio"
                        id={`dualcardnumberplacement-${index}`}
                        name="dualcardnumberplacement"
                        value={Number(dualCardNumberPlacementField.value)}
                        className="mr-2 focus:ring-[#AE9164] text-[#b88c4f]"
                        checked={dualCardNumberPlacement === dualCardNumberPlacementField.value.toLowerCase()}
                        onChange={() => {
                          // setChipSizePrice(dualCardNumberPlacementFields.price);
                          setDualCardNumberPlacement(dualCardNumberPlacementField.value.toLowerCase());
                        }}
                      />
                      <label
                        htmlFor={`dualcardnumberplacement-${index}`}
                        className="text-gray-800 m-0 cursor-pointer"
                        onClick={() => {
                          // setChipSizePrice(dualCardNumberPlacementFields.price);
                          setDualCardNumberPlacement(dualCardNumberPlacementField.value.toLowerCase());
                        }}
                      >
                        {dualCardNumberPlacementField.label}
                      </label>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  function renderChooseBorder() {
    if (!filteredBorders?.length) return null;

    return (
      <div className="space-y-4 p-4 rounded-lg">
        <label htmlFor="choose-border" className="block pb-3 border-b border-gray-300 text-gray-800 font-semibold mb-2">
          {fetchLabel(customizationFieldTypes?.border)}
        </label>
        <Swiper
          slidesPerView={3.5} // Show 3.5 slides, so part of the next slide is visible
          spaceBetween={10} // Adjust space between slides to fine-tune the visibility
          className="inner-swiper"
          centeredSlides={false} // This ensures that slides are aligned to the left
        >
          {filteredBorders.map((border: any) => (
            <SwiperSlide key={border?.value.toLowerCase()}>
              <div
                className={`p-2 rounded-sm transition-shadow cursor-pointer ${
                  selectedBorderId === border?.value.toLowerCase()
                    ? "bg-[#e9e9e9] border-2 border-[#AE9164]"
                    : "border-gray-300 hover:bg-gray-100 border-0"
                }`}
                onClick={() => addBorder(border?.value.toLowerCase())}
                style={{ boxSizing: "border-box" }}
              >
                <div className="relative flex justify-center items-center w-full h-10  mb-2 overflow-hidden">
                  {border?.image && border?.value.toLowerCase() !== "none" ? (
                    <Image
                      src={border?.image || "/default-image.jpg"}
                      alt="Border"
                      layout="fill"
                      objectFit="contain"
                      className={`rounded-md ${
                        border?.value.toLowerCase().includes("white") ? "filter brightness-0" : ""
                      }`}
                    />
                  ) : (
                    <p className="text-center text-xs text-primary font-semibold">None</p>
                  )}
                </div>
                <h3 className="text-center font-semibold text-[13px] text-gray-800">
                  {border?.label.toLowerCase() !== "none" && border?.label}
                  {border?.price && Number(border?.price) !== 0 && <FieldPrice field={border} />}
                </h3>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    );
  }

  function renderChooseLogo() {
    if (!logoFields?.length) return null;

    return (
      <div className="space-y-4 p-4 rounded-lg">
        <label htmlFor="choose-logo" className="block pb-3 border-b border-gray-300 text-gray-800 font-semibold mb-2">
          {fetchLabel(customizationFieldTypes?.logo)}
        </label>
        <Swiper slidesPerView={3} spaceBetween={10} className="inner-swiper">
          {logoFields.map((logo: any) => {
            const logoValue = logo.value?.toLowerCase();
            const isSelected = selectedLogo === logoValue;

            return (
              <SwiperSlide key={logoValue}>
                <div
                  className={`p-2 rounded-sm transition-shadow cursor-pointer  ${
                    isSelected ? "bg-[#e9e9e9] border-2 border-[#AE9164]" : "border-gray-300 hover:bg-gray-100 border-0"
                  }`}
                  onClick={() => {
                    setSelectedLogo(logoValue);
                    setLogoPrice(logo.price || 0); // Default to 0 if price is not set
                  }}
                  style={{ boxSizing: "border-box" }}
                >
                  <h3 className="text-center flex flex-col justify-center font-semibold h-20 text-[13px] text-gray-800">
                    {logo.label}
                    {logo.price > 0 && <FieldPrice small={true} field={logo} />}
                  </h3>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    );
  }

  function renderCustomLogo() {
    if (!selectedLogo) return null;

    return (
      <div>
        {selectedLogo.includes("own logo") && (
          <div className="space-y-3 p-4 rounded-lg">
            <label
              htmlFor="createdigitallink"
              className="block text-gray-800 font-semibold mb-4 pb-3 border-b border-gray-300"
            >
              UPLOAD CUSTOM LOGO
            </label>
            <input type="file" accept="image/*" onChange={handleFileChange} className="mb-4" />
            {/* {image ? (
              <div className="flex gap-2">
                <h3>Selected Logo:</h3>
                <Image
                  src={image}
                  height={50}
                  width={50}
                  alt="Preview"
                  style={{
                    maxWidth: "100%",
                    maxHeight: "100px",
                    objectFit: "contain",
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                    marginBottom: "20px",
                  }}
                />
              </div>
            ) : (
              <p>No custom logo uploaded yet.</p>
            )} */}
          </div>
        )}
      </div>
    );
  }

  function renderCustomDesign() {
    if (!selectedLogo) return null;

    return (
      <div>
        {selectedLogo.includes("own design") && (
          <div className="space-y-3 p-4 rounded-lg">
            <label
              htmlFor="createdigitallink"
              className="block text-gray-800 font-semibold mb-4 pb-3 border-b border-gray-300"
            >
              UPLOAD CUSTOM DESIGN
            </label>
            <input type="file" accept="image/*" onChange={handleDesignInput} className="mb-4" />
            {/* {design ? (
              <div>
                <h3>Selected Design:</h3>
                <Image
                  src={design}
                  height={80}
                  width={80}
                  alt="Preview"
                  style={{
                    maxWidth: "100%",
                    maxHeight: "200px",
                    objectFit: "contain",
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                    marginBottom: "20px",
                  }}
                />
              </div>
            ) : (
              <p>No custom design uploaded yet.</p>
            )} */}
          </div>
        )}
      </div>
    );
  }

  function renderPredesignedLogos() {
    if (!filteredLogos?.length) return null;

    return (
      <div className="space-y-4 p-4 rounded-lg">
        {filteredLogos && filteredLogos.length > 0 && (
          <label className="block pb-3 border-b border-gray-300 text-gray-800 font-semibold mb-2">
            {fetchLabel(customizationFieldTypes?.predesignLogo)}
          </label>
        )}
        <Swiper
          slidesPerView={3.5} // Show 3.5 slides, so part of the next slide is visible
          spaceBetween={10} // Adjust space between slides to fine-tune the visibility
          className="inner-swiper"
          centeredSlides={false} // This ensures that slides are aligned to the left
        >
          {filteredLogos.map((logo: any) => {
            const logoValue = logo.value.toLowerCase();
            const isSelected = selectedPredesignedLogo === logoValue;

            return (
              <SwiperSlide key={logo.value}>
                <div
                  onClick={() => {
                    if (logoValue === "none") {
                      setSelectedPredesignedLogo("none");
                      setPredesignedLogoPrice(0);
                      setPredesignLogoImage("");
                    } else if (isSelected) {
                      setSelectedPredesignedLogo(null);
                      setPredesignedLogoPrice(0);
                      setPredesignLogoImage("");
                    } else {
                      setSelectedPredesignedLogo(logoValue);
                      setPredesignedLogoPrice(Number(logo.price));
                      setPredesignLogoImage(logo.image);
                    }
                  }}
                  className={`p-2 rounded-sm transition-shadow cursor-pointer flex flex-col justify-center items-center ${
                    isSelected ? "bg-[#e9e9e9] border-2 border-[#AE9164]" : "border-gray-300 hover:bg-gray-100 border-0"
                  }`}
                  style={{ height: "60px", boxSizing: "border-box" }}
                >
                  {logoValue !== "none" && logo.image && (
                    <div className="flex justify-center items-center w-full h-16 mb-2">
                      <Image
                        src={logo.image || "/default-image.svg"}
                        alt="Predesigned Logo"
                        layout="fill"
                        objectFit="contain"
                        className={`rounded-md ${logoValue.includes("white") ? "filter brightness-0" : ""}`}
                      />
                    </div>
                  )}
                  {logoValue === "none" ? (
                    <p className="text-center text-xs text-primary font-semibold group-hover:text-primary text-nowrap">
                      None
                    </p>
                  ) : (
                    <p className="text-center text-sm text-primary font-semibold group-hover:text-primary text-nowrap">
                      {logo.price && Number(logo.price) !== 0 && <FieldPrice small={true} field={logo} />}
                    </p>
                  )}
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    );
  }

  function renderWorkWithOurDesigners() {
    if (!workWithDesignersFields?.length) return null;
    return (
      <div className="p-4 rounded-lg">
        {workWithDesignersFields && workWithDesignersFields.length > 0 && (
          <div className="mb-6">
            {workWithDesignersFields && workWithDesignersFields.length > 0 && (
              <label className="block text-gray-800 font-semibold mb-4 pb-3 border-b border-gray-300">
                {fetchLabel(customizationFieldTypes?.workWithOurDesigners)}
              </label>
            )}

            <div className="flex items-center space-x-10">
              {workWithDesignersFields &&
                workWithDesignersFields.length > 0 &&
                workWithDesignersFields.map((workWithDesignersField: any, index: number) => (
                  <div
                    key={index}
                    className={`flex items-center cursor-pointer`}
                    onClick={() => {
                      setSelectedWorkWithDesigners(workWithDesignersField.value.toLowerCase());
                      setWorkwithdesignersPrice(workWithDesignersField.price);
                    }}
                  >
                    <input
                      type="radio"
                      id={`workwithdesigners-${index}`}
                      name={`workwithdesigners-${index}`}
                      value={workWithDesignersField.value}
                      className="mr-2 focus:ring-[#AE9164] text-[#b88c4f]"
                      checked={selectedWorkWithDesigners === workWithDesignersField.value.toLowerCase()}
                    />
                    <span className="text-gray-800 m-0">
                      {workWithDesignersField.label.charAt(0).toUpperCase() + workWithDesignersField.label.slice(1)}
                    </span>
                    <div className="ml-2">
                      {workWithDesignersField.price && Number(workWithDesignersField.price) !== 0 && (
                        <FieldPrice field={workWithDesignersField} />
                      )}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  function renderInsuranceRequired() {
    if (!insuranceFields?.length) return null;
    return (
      <div className="p-4 rounded-lg">
        {insuranceFields && insuranceFields.length > 0 && (
          <label htmlFor="choose-logo" className="block text-gray-800 font-semibold mb-4 pb-3 border-b border-gray-300">
            {fetchLabel(customizationFieldTypes?.insurance)}
            <Link href={"/terms-and-conditions"} target="_blank" rel="noopener noreferrer">
              <span className="text-xs text-gray-600 ml-2 transition hover:underline hover:text-gray-800">
                (Terms and conditions)
              </span>
            </Link>
          </label>
        )}

        <div className="flex items-center space-x-10">
          {insuranceFields &&
            insuranceFields.map((insuranceField: any, index: number) => (
              <div key={index} className="flex items-center gap-2">
                <input
                  type="radio"
                  id={`insurance-${index}`}
                  name={`insurance-${index}`}
                  value={Number(insuranceField.value)}
                  className="h-4 w-4 text-[#b88c4f] focus:ring-[#AE9164] border-gray-300 rounded-full"
                  checked={selectedInsurance === insuranceField.value.toLowerCase()}
                  onChange={() => {
                    setSelectedInsurance(insuranceField.value.toLowerCase());
                    setInsurancePrice(insuranceField.price);
                  }}
                />
                <label htmlFor={`insurance-${index}`} className="text-gray-800 ml-2 cursor-pointer">
                  {insuranceField.label}
                </label>

                {insuranceField.price && Number(insuranceField.price) !== 0 && (
                  <div className="bg-primary rounded-full text-white">
                    <FieldPrice small={false} field={insuranceField} />
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>
    );
  }

  function renderRemoveBranding() {
    if (!removeBrandingFields?.length) return null;
    return (
      <div className="p-4 rounded-lg">
        {removeBrandingFields && removeBrandingFields.length > 0 && (
          <label htmlFor="choose-logo" className="block text-gray-800 font-semibold mb-4 pb-3 border-b border-gray-300">
            {fetchLabel(customizationFieldTypes?.removeBranding)}
          </label>
        )}
        <div className="flex items-center space-x-10">
          {removeBrandingFields &&
            removeBrandingFields.map((removeBrandingField: any, index: number) => (
              <div key={index} className="flex items-center mb-4">
                <input
                  type="radio"
                  id={`branding-${index}`}
                  name="branding"
                  value={Number(removeBrandingField.value)}
                  className="h-4 w-4 text-[#b88c4f] focus:ring-[#AE9164] border-gray-300 rounded-full"
                  checked={selectedBranding === removeBrandingField.value.toLowerCase()}
                  onChange={() => {
                    setSelectedBranding(removeBrandingField.value.toLowerCase());
                    setBrandingPrice(Number(removeBrandingField.price));
                  }}
                />
                <label htmlFor={`branding-${index}`} className="text-gray-800 ml-2 cursor-pointer">
                  {removeBrandingField.label}
                </label>
                {removeBrandingField.price && Number(removeBrandingField.price) !== 0 && (
                  <div className="bg-primary  ml-3 rounded-full text-white">
                    <FieldPrice small={false} field={removeBrandingField} />
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>
    );
  }

  function renderBottomIfRequired() {
    const bottomIfRequiredFields = TextFields.filter((field: any) => field.section === "bottomifrequired");

    if (!TextFields.some((field: any) => field.section === "bottomifrequired") || bottomIfRequiredFields.length === 0)
      return null;

    return (
      <div className="space-y-3 p-4 rounded-lg">
        <label
          htmlFor="createdigitallink"
          className="block text-gray-800 font-semibold mb-4 pb-3 border-b border-gray-300"
        >
          {fetchLabel(customizationFieldTypes.workWithOurDesignersLabelField)}
        </label>

        {/* Radio Button Section */}
        <div className="flex items-center space-x-6">
          <div className="flex items-center">
            <input
              type="radio"
              id="createdigitallink-yes"
              name="createdigitallink"
              value="yes"
              className="mr-2 focus:ring-[#AE9164] text-[#b88c4f]"
              checked={workWithOurDigitalLinkCreators === "yes"}
              onClick={() => setWorkWithOurDigitalLinkCreators("yes")}
            />
            <label htmlFor="createdigitallink-yes" className="text-gray-800">
              Yes
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="radio"
              id="createdigitallink-no"
              name="createdigitallink"
              value="no"
              className="mr-2 focus:ring-[#AE9164] text-[#b88c4f]"
              checked={workWithOurDigitalLinkCreators === "no"}
              onClick={() => setWorkWithOurDigitalLinkCreators("no")}
            />
            <label htmlFor="createdigitallink-no" className="text-gray-800">
              No
            </label>
          </div>
        </div>
      </div>
    );
  }

  function renderNo() {
    const bottomIfRequiredFields = TextFields.filter((field: any) => field.section === "bottomifrequired");

    if (!TextFields.some((field: any) => field.section === "bottomifrequired") || bottomIfRequiredFields.length === 0)
      return null;
    return (
      <div>
        {TextFields.filter((field: any) => field.section === "bottombusiness").map((field: any) => (
          <div className="space-y-3 p-4 rounded-lg">
            <label
              htmlFor="createdigitallink"
              className="block text-gray-800 font-semibold mb-4 pb-3 border-b border-gray-300"
            >
              {getFieldByElementId(field.elementId, "label", field.defaultLabel)}
            </label>
            <input
              id={field.name}
              type={field.type}
              name={field.name}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#AE9164] focus:border-[#AE9164] placeholder-gray-400"
              placeholder={getFieldByElementId(field.elementId, "placeholder", field.defaultLabel) || field.placeholder}
              onChange={handleInputChange}
            />
          </div>
        ))}
      </div>
    );
  }

  function renderYes() {
    const bottomIfRequiredFields = TextFields.filter((field: any) => field.section === "bottomifrequired");

    if (!TextFields.some((field: any) => field.section === "bottomifrequired") || bottomIfRequiredFields.length === 0)
      return null;
    return (
      <div className="space-y-3 p-4 rounded-lg">
        <label
          htmlFor="createdigitallink"
          className="block text-gray-800 font-semibold mb-4 pb-3 border-b border-gray-300"
        >
          CREATE A DIGITAL LINK
        </label>
        <div className="mb-8">
          <button
            onClick={toggleModal}
            className="w-full px-4 py-2 text-white bg-[#AE9164] rounded-lg transition duration-300 ease-in-out hover:bg-[#8C7553] focus:outline-none focus:ring-2 focus:ring-[#AE9164]"
          >
            Enter Details
          </button>
        </div>
      </div>
    );
  }

  function renderBottomLast() {
    return (
      <>
        <div className="p-4 rounded-lg">
          {TextFields.filter((field: any) => field.section === "bottomlast").map((field: any) => (
            <>
              <label
                htmlFor={field.elementId}
                className="block text-gray-800 font-semibold mb-4 pb-3 border-b border-gray-300"
              >
                {getFieldByElementId(field.elementId, "label", field.defaultLabel)}
              </label>
              <textarea
                id={field.name}
                key={field.elementId}
                rows={1}
                cols={10}
                name={field.name} // Use label as name (e.g., "name")
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#AE9164] focus:border-[#AE9164] placeholder-gray-400"
                placeholder={
                  getFieldByElementId(field.elementId, "placeholder", field.defaultLabel) || field.placeholder
                }
                // value={inputValues[field.defaultLabel]}
                onChange={handleInputChange}
              />
            </>
          ))}
        </div>
      </>
    );
  }

  function renderAddToCart() {
    return (
      <div className="flex justify-center items-center w-full h-full">
        <button
          className={`w-full mx-10 flex justify-center my-auto items-center px-10 py-3 rounded-md  text-lg font-bold ${
            addToCartStatus === "submitting" ? "opacity-50 cursor-not-allowed" : ""
          } text-white hover:bg-[#9d7c47] bg-[#AE9164] transition duration-200 mt-4`}
          onClick={handleAddToCart}
          disabled={addToCartStatus === "submitting"}
          style={{ cursor: addToCartStatus === "submitting" ? "not-allowed" : "pointer" }}
        >
          {addToCartStatus === "submitting" ? (
            <div className="h-5 w-5 flex justify-center border-b-2 border-white rounded-full animate-spin"></div>
          ) : (
            "Add to Cart"
          )}
        </button>
      </div>
    );
  }

  return (
    <div className="custom-card-swiper bg-white border rounded-lg pb-2">
      <div className="relative">
        <Swiper
          modules={[Navigation]}
          onSwiper={setSwiperInstance}
          onSlideChange={(swiper) => setActiveStep(swiper.activeIndex)}
          className="mySwiper"
          allowTouchMove={false}
          navigation={{
            prevEl: ".swiper-button-prev",
            nextEl: ".swiper-button-next",
            disabledClass: "swiper-button-disabled",
          }}
          autoHeight={true}
        >
          {steps.map((step, index) => (
            <SwiperSlide key={index}>
              <div style={{ height: "100%" }}>{step.component}</div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <DigitalLinkModal
        toggleModal={toggleModal}
        isDigitalLinkModalOpen={isDigitalLinkModalOpen}
        setuploadedDigitalProfileImage={setuploadedDigitalProfileImage}
        uploadedDigitalProfileImage={uploadedDigitalProfileImage}
        handleImageChange={handleImageChange}
        workWithOurDigitalLinkCreators={workWithOurDigitalLinkCreators}
        getFieldByElementId={getFieldByElementId}
        TextFields={TextFields}
        inputValues={inputValues}
        handleInputChange={handleInputChange}
        setSelectedImage={setSelectedImage}
        selectedProfileImage={selectedProfileImage}
      />

      {/* <div className="fixed bottom-0 w-full bg-white shadow-md"> */}
        <div className="flex justify-between items-center px-2 pt-3">
          {/* Previous Button */}
          <div
            className={`rounded-md px-3 ${
              activeStep === 0 ? "opacity-50 cursor-not-allowed" : "border-primary cursor-pointer"
            }`}
          >
            <Button disabled={activeStep === 0} onClick={() => swiperInstance?.slidePrev()}>
              <KeyboardArrowLeft
                style={{
                  color: activeStep === 0 ? "#bfbfbf" : "#b88c4f",
                }}
              />
            </Button>
          </div>

          {/* Step Indicator Button */}
          <button
            className="flex items-center gap-1 text-gray-800 bg-white px-2 py-1 "
            onClick={toggleNavigationDrawer}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-4 h-4" aria-label="summary drawer">
              <title>navigation-menu</title>
              <rect width={23} height={3} x="0.5" y="2.5" rx={1} ry={1} />
              <rect width={23} height={3} x="0.5" y="10.5" rx={1} ry={1} />
              <rect width={23} height={3} x="0.5" y="18.5" rx={1} ry={1} />
            </svg>
            <span className="text-sm">{`${activeStep + 1} / ${steps.length}`}</span>
          </button>

          {/* Next Button */}
          <div
            className={`rounded-md px-3 ${
              activeStep === steps.length - 1
                ? "opacity-50 cursor-not-allowed"
                : "border-gray-300 bg-black cursor-pointer"
            }`}
          >
            <Button disabled={activeStep === steps.length - 1} onClick={() => swiperInstance?.slideNext()}>
              <KeyboardArrowRight
                style={{
                  color: activeStep === steps.length - 1 ? "#bfbfbf" : "white",
                }}
              />
            </Button>
          </div>
        </div>
        <MobileDrawer
          steps={steps}
          navigationDrawer={navigationDrawer}
          toggleNavigationDrawer={toggleNavigationDrawer}
          handleStepClick={handleStepClick}
        />
      </div>
    // </div>
  );
}
