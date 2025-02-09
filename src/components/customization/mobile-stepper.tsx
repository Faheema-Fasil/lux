import { useState } from "react";
import { MobileStepper, Button } from "@mui/material";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import Image from "next/image";
import FieldPrice from "./field-price";

export default function CustomMobileStepper({
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
  cardPlacementFields,
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
}: any) {
  const [activeStep, setActiveStep] = useState(0);

  const dynamicSteps = [
    chipSizeFields && chipSizeFields.length > 0 && "CHIP SIZE",
    allVariations && allVariations.length > 0 && "CHOOSE VARIANT",
    TextFields && TextFields.length > 0 && "TEXT FIELDS",
    cardPlacementFields &&
      cardPlacementFields.length > 0 &&
      "CARD NUMBER PLACEMENT",
    namePlacementFields &&
      namePlacementFields.length > 0 &&
      "CARD NAME PLACEMENT",
    dualCardNumberPlacementFields &&
      dualCardNumberPlacementFields.length > 0 &&
      "DUAL CARD NUMBER PLACEMENT",
    workWithDesignersFields &&
      workWithDesignersFields.length > 0 &&
      "WORK WITH OUR DESIGNERS",
    borderFields && borderFields.length > 0 && "CHOOSE BORDER",
    logoFields && logoFields.length > 0 && "CHOOSE LOGO",
    insuranceFields && insuranceFields.length > 0 && "INSURANCE REQUIRED",
    removeBrandingFields &&
      removeBrandingFields.length > 0 &&
      "REMOVE BRANDING",
    "BOTTOM",
    "ADD TO CART",
  ].filter(Boolean); // Removes falsy values

  // Define steps
  const steps = [
    "CHIP SIZE",
    "CHOOSE VARIANT",
    "TEXT FIELDS",
    "CARD NUMBER PLACEMENT",
    "CARD NAME PLACEMENT",
    "DUAL CARD NUMBER PLACEMENT",
    "CHOOSE BORDER",
    "CHOOSE LOGO",
    "WORK WITH OUR DESIGNERS",
    "INSURANCE REQUIRED",
    "REMOVE BRANDING",
    "BOTTOM",
    "ADD TO CART",
  ];

  // Step content
  const renderStepContent = (step: number) => {
    switch (dynamicSteps[step]) {
      case "CHIP SIZE":
        return chipSizeFields?.length > 0 ? (
          <div className="space-y-4 p-4 border rounded-lg">
            <h2 className="text-lg font-semibold">CHIP SIZE</h2>
            <div className="grid grid-cols-2 gap-4">
              {chipSizeFields?.map((chipSizeField: any, index: number) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id={`chipsize-${index}`}
                      name="chipsize"
                      value={chipSizeField.value}
                      className="h-4 w-4 text-[#b88c4f] focus:ring-[#AE9164] border-gray-300 rounded-full"
                      checked={
                        selectedChipSize === chipSizeField.value.toLowerCase()
                      }
                      onChange={() => {
                        setChipSizePrice(chipSizeField.price);
                        setSelectedChipSize(chipSizeField.value.toLowerCase());
                      }}
                    />
                    <label
                      htmlFor={`chipsize-${index}`}
                      className="text-gray-800 ml-2"
                    >
                      {chipSizeField.label}
                    </label>
                  </div>
                  {chipSizeField.price && Number(chipSizeField.price) !== 0 && (
                    <div className="bg-primary px-4 rounded-full text-white">
                      + {chipSizeField.price}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : null;

      case "CHOOSE VARIANT":
        return allVariations?.length > 0 ? (
          <div className="space-y-4 p-4 border rounded-lg">
            <h2 className="text-lg font-semibold">CHOOSE VARIANT</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {allVariations?.map((variation: any) => (
                <div
                  key={variation.id}
                  className={`p-4 flex justify-center flex-col items-center border rounded-lg cursor-pointer ${
                    Number(selectedVariationId) === variation.id
                      ? "border-primary"
                      : "border-gray-300"
                  }`}
                  onClick={() => handleVariationChange(variation.id)}
                >
                  <Image
                    src={variation.images[0]?.src || "/placeholder.jpg"}
                    alt={variation.name}
                    width={100}
                    height={100}
                    className="rounded-md"
                  />
                  <h3 className="text-center mt-2">
                    {variation.name.split("-")[1]}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        ) : null;

      case "TEXT FIELDS":
        return TextFields?.length > 0 ? (
          <div>
            {TextFields.filter((field: any) => field.section === "top").map(
              (field: any) => (
                <div className="mb-6" key={field.elementId}>
                  <label
                    htmlFor={field.elementId}
                    className="block text-gray-800 font-semibold mb-1"
                  >
                    {getFieldByElementId(
                      field.elementId,
                      "label",
                      field.defaultLabel
                    )}
                  </label>
                  <input
                    id={field.elementId}
                    type={field.type}
                    name={field.name} // Use label as name (e.g., "name")
                    maxLength={20}
                    value={inputValues[field.name]}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#AE9164] focus:border-[#AE9164] placeholder-gray-400"
                    placeholder={
                      getFieldByElementId(
                        field.elementId,
                        "label",
                        field.defaultLabel
                      ) || field.placeholder
                    }
                    // value={inputValues[field.defaultLabel]}
                    onChange={handleInputChange}
                  />
                </div>
              )
            )}
          </div>
        ) : null;

      case "CARD NUMBER PLACEMENT":
        return cardPlacementFields?.length > 0 ? (
          <div className="space-y-4 p-4 border rounded-lg">
            {cardPlacementFields && cardPlacementFields.length > 0 && (
              <label className="block text-gray-800 font-semibold mb-4 pb-3 border-b border-gray-300">
                CARD NUMBER PLACEMENT
              </label>
            )}

            <div className="flex items-center space-x-10">
              {cardPlacementFields && cardPlacementFields.length > 0 && (
                <div className="mb-6">
                  <div className="flex items-center space-x-10">
                    {cardPlacementFields &&
                      cardPlacementFields.length > 0 &&
                      cardPlacementFields.map(
                        (cardPlacementField: any, index: number) => (
                          <div
                            key={index}
                            className={`flex items-center cursor-pointer`}
                            onClick={() =>
                              setCardPlacement(
                                cardPlacementField.value.toLowerCase()
                              )
                            }
                          >
                            <input
                              type="radio"
                              id={`cardplacement-${index}`}
                              name="cardplacement"
                              value={Number(cardPlacementField.value)}
                              className="mr-2 focus:ring-[#AE9164] text-[#b88c4f]"
                              checked={
                                cardPlacement ===
                                cardPlacementField.value.toLowerCase()
                              }
                              readOnly
                            />
                            <span className="text-gray-800 m-0">
                              {cardPlacementField.label}
                            </span>
                          </div>
                        )
                      )}
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : null;

      case "CARD NAME PLACEMENT":
        return namePlacementFields?.length > 0 ? (
          <div className="space-y-4 p-4 border rounded-lg">
            {namePlacementFields && namePlacementFields.length > 0 && (
              <div className="mb-6">
                {namePlacementFields && namePlacementFields.length > 0 && (
                  <label className="block text-gray-800 font-semibold mb-4 pb-3 border-b border-gray-300">
                    CARD NAME PLACEMENT
                  </label>
                )}

                <div className="flex items-center space-x-10">
                  {namePlacementFields &&
                    namePlacementFields.length > 0 &&
                    namePlacementFields.map(
                      (namePlacementField: any, index: number) => (
                        <div
                          key={index}
                          className={`flex items-center cursor-pointer`}
                          onClick={() =>
                            setNamePlacement(
                              namePlacementField.value.toLowerCase()
                            )
                          }
                        >
                          <input
                            type="radio"
                            id={`nameplacement-${index}`}
                            name="nameplacement"
                            value={Number(namePlacementField.value)}
                            className="mr-2 focus:ring-[#AE9164] text-[#b88c4f]"
                            checked={
                              namePlacement ===
                              namePlacementField.value.toLowerCase()
                            }
                            readOnly
                          />
                          <span className="text-gray-800 m-0">
                            {namePlacementField.label}
                          </span>
                        </div>
                      )
                    )}
                </div>
              </div>
            )}
          </div>
        ) : null;

      case "DUAL CARD NUMBER PLACEMENT":
        return dualCardNumberPlacementFields?.length > 0 ? (
          <div className="space-y-4 p-4 border rounded-lg">
            {dualCardNumberPlacementFields &&
              dualCardNumberPlacementFields.length > 0 && (
                <div>
                  {/* Dual Card Number Placement */}
                  <div className="mb-6">
                    {dualCardNumberPlacementFields &&
                      dualCardNumberPlacementFields.length > 0 && (
                        <label className="block text-gray-800 font-semibold mb-4 pb-3 border-b border-gray-300">
                          CARD NUMBER PLACEMENT
                        </label>
                      )}

                    <div className="flex flex-row">
                      {dualCardNumberPlacementFields &&
                        dualCardNumberPlacementFields.length > 0 &&
                        dualCardNumberPlacementFields.map(
                          (
                            dualCardNumberPlacementField: any,
                            index: number
                          ) => (
                            <div key={index} className="flex items-center mr-4">
                              <input
                                type="radio"
                                id={`dualcardnumberplacement-${index}`}
                                name="dualcardnumberplacement"
                                value={Number(
                                  dualCardNumberPlacementField.value
                                )}
                                className="mr-2 focus:ring-[#AE9164] text-[#b88c4f]"
                                checked={
                                  dualCardNumberPlacement ===
                                  dualCardNumberPlacementField.value.toLowerCase()
                                }
                                onChange={() => {
                                  // setChipSizePrice(dualCardNumberPlacementFields.price);
                                  setDualCardNumberPlacement(
                                    dualCardNumberPlacementField.value.toLowerCase()
                                  );
                                }}
                              />
                              <label
                                htmlFor={`dualcardnumberplacement-${index}`}
                                className="text-gray-800 m-0 cursor-pointer"
                                onClick={() => {
                                  // setChipSizePrice(dualCardNumberPlacementFields.price);
                                  setDualCardNumberPlacement(
                                    dualCardNumberPlacementField.value.toLowerCase()
                                  );
                                }}
                              >
                                {dualCardNumberPlacementField.label}
                              </label>
                            </div>
                          )
                        )}
                    </div>
                  </div>
                </div>
              )}
          </div>
        ) : null;

      case "CHOOSE BORDER":
        return borderFields?.length > 0 ? (
          <div className="space-y-4 p-4 border rounded-lg">
            <h2 className="text-lg font-semibold">CHOOSE BORDER</h2>
            <div className="grid grid-cols-2 gap-4">
              {borderFields?.map((border: any) => (
                <div
                  key={border.label}
                  className={`p-4 border rounded-lg cursor-pointer ${
                    selectedBorderId === border.label
                      ? "border-primary"
                      : "border-gray-300"
                  }`}
                  onClick={() => addBorder(border.label)}
                >
                  <Image
                    src={
                      Array.isArray(border.productImage) &&
                      border.productImage[0]?.url
                        ? border.productImage[0]?.url
                        : "/placeholder.jpg"
                    }
                    alt={border.label}
                    width={100}
                    height={100}
                    className="rounded-md"
                  />
                  <p className="text-center mt-2">{border.label}</p>
                </div>
              ))}
            </div>
          </div>
        ) : null;

      case "CHOOSE LOGO":
        return borderFields?.length > 0 ? (
          <div className="">
            {logoFields && logoFields.length > 0 && (
              <div className="space-y-4 p-4 border rounded-lg">
                <h2 className="text-lg font-semibold">CHOOSE LOGO</h2>
                <div className="grid grid-cols-2 text-center text-[12px] sm:grid-cols-3 md:grid-cols-3 gap-2 mb-7 ">
                  {" "}
                  {logoFields &&
                    logoFields.map((logo: any) => (
                      <label
                        key={logo.label}
                        htmlFor={logo.label}
                        className={`flex flex-col items-center justify-center py-3  border rounded-lg cursor-pointer transition-all duration-200 ${
                          selectedLogo === logo.value.toLowerCase()
                            ? "bg-gray-200 border-primary"
                            : "border-gray-300 hover:bg-gray-100"
                        }`}
                      >
                        <input
                          type="radio"
                          id={logo.label}
                          name={logo.value}
                          value={logo.value.toLowerCase()}
                          checked={selectedLogo === logo.value.toLowerCase()}
                          onChange={() => {
                            setSelectedLogo(logo.value.toLowerCase());
                            setLogoPrice(logo.price);
                          }}
                          className="mb-2 h-5 w-5 text-primary focus:ring-2 focus:ring-primary"
                        />{" "}
                        <span className="text-gray-800 font-medium mb-2">
                          {logo.label}
                        </span>{" "}
                        {logo.price > 0 && (
                          <FieldPrice small={false} field={logo} />
                        )}
                      </label>
                    ))}{" "}
                </div>
                {selectedLogo && selectedLogo.includes("own logo") && (
                  <div>
                    {/* File input */}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      style={{ marginBottom: "20px" }}
                    />

                    {/* Display image preview if available */}
                    {image ? (
                      <div>
                        <h3>Selected Image:</h3>
                        <Image
                          src={image}
                          height={150}
                          width={150}
                          alt="Preview"
                          style={{
                            maxWidth: "100%",
                            maxHeight: "400px",
                            objectFit: "contain",
                            border: "1px solid #ddd",
                            borderRadius: "8px",
                            marginBottom: "20px",
                          }}
                        />
                      </div>
                    ) : (
                      <p>No image selected yet.</p>
                    )}
                  </div>
                )}

                {selectedLogo && selectedLogo.includes("own design") && (
                  <div>
                    {/* File input */}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleDesignInput}
                      style={{ marginBottom: "20px" }}
                    />

                    {/* Display image preview if available */}
                    {design ? (
                      <div>
                        <h3>Selected Design:</h3>
                        <Image
                          src={design}
                          height={150}
                          width={150}
                          alt="Preview"
                          style={{
                            maxWidth: "100%",
                            maxHeight: "400px",
                            objectFit: "contain",
                            border: "1px solid #ddd",
                            borderRadius: "8px",
                            marginBottom: "20px",
                          }}
                        />
                      </div>
                    ) : (
                      <p>No Design selected yet.</p>
                    )}
                  </div>
                )}

                {selectedLogo && selectedLogo.includes("pre design") && (
                  <div className="mb-6">
                    {predesignedLogoFields &&
                      predesignedLogoFields.length > 0 && (
                        <label className="block text-gray-800 font-semibold mb-4 pb-3 border-b border-gray-300">
                          CHOOSE PRE DESIGNED LOGO
                        </label>
                      )}

                    <div className="lx-colors grid grid-cols-[repeat(auto-fill,minmax(120px,1fr))] gap-2 ">
                      {predesignedLogoFields &&
                        predesignedLogoFields.length > 0 &&
                        predesignedLogoFields.map((logo: any) => (
                          <div
                            onClick={() => {
                              setSelectedPredesignedLogo(
                                logo.value.toLowerCase()
                              );
                              setPredesignedLogoPrice(Number(logo.price));
                              setPredesignLogoImage(logo.image);
                            }}
                            key={logo.value}
                            className={`aspect-square mx-auto rounded-md p-2 transition flex justify-center items-center space-y-3 flex-col duration-300 cursor-pointer logo-option border-2 group 
                                ${
                                  selectedPredesignedLogo ===
                                  logo.value.toLowerCase()
                                    ? "bg-[#e9e9e9] border-[#AE9164]"
                                    : "bg-white border-transparent hover:bg-[#a0a0a0] hover:border-[#AE9164]"
                                } h-[120px] w-[120px]`}
                          >
                            <Image
                              src={logo.image || "/default-image.svg"}
                              height={48} // Adjusted height
                              width={48} // Adjusted width
                              alt="predesigned logo"
                              className="object-contain rounded-md lx-card-logo" // Ensure proper scaling
                            />
                            <p className="text-center text-sm text-primary font-semibold group-hover:text-primary text-nowrap">
                              <div className="max-w-sm flex justify-center">
                                <FieldPrice small={true} field={logo} />
                              </div>
                            </p>
                          </div>
                        ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ) : null;

      case "WORK WITH OUR DESIGNERS":
        return workWithDesignersFields?.length > 0 ? (
          <div className="space-y-4 p-4 border rounded-lg">
            {workWithDesignersFields &&
              workWithDesignersFields.length > 0 &&
              workWithDesignersFields.map(
                (workWithDesignersField: any, index: number) => (
                  <div
                    key={index}
                    className={`flex items-center cursor-pointer`}
                    onClick={() => {
                      setSelectedWorkWithDesigners(
                        workWithDesignersField.value.toLowerCase()
                      );
                      setWorkwithdesignersPrice(workWithDesignersField.price);
                    }}
                  >
                    <input
                      type="radio"
                      id={`workwithdesigners-${index}`}
                      name={`workwithdesigners-${index}`}
                      value={workWithDesignersField.value}
                      className="mr-2 focus:ring-[#AE9164] text-[#b88c4f]"
                      checked={
                        selectedWorkWithDesigners ===
                        workWithDesignersField.value.toLowerCase()
                      }
                    />
                    <span className="text-gray-800 m-0">
                      {workWithDesignersField.label}
                    </span>
                    <div className="ml-2">
                      {workWithDesignersField.price &&
                        Number(workWithDesignersField.price) !== 0 && (
                          <FieldPrice field={workWithDesignersField} />
                        )}
                    </div>
                  </div>
                )
              )}
          </div>
        ) : null;

      case "INSURANCE REQUIRED":
        return insuranceFields?.length > 0 ? (
          <div className="space-y-4 p-4 border rounded-lg">
            <h2 className="text-lg font-semibold">INSURANCE REQUIRED</h2>
            <div className="grid grid-cols-2 gap-4">
              {insuranceFields?.map((insuranceField: any, index: number) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id={`insurance-${index}`}
                      name="insurance"
                      value={insuranceField.value}
                      className="h-4 w-4 text-[#b88c4f] focus:ring-[#AE9164] border-gray-300 rounded-full"
                      checked={
                        selectedInsurance === insuranceField.value.toLowerCase()
                      }
                      onChange={() => {
                        setInsurancePrice(insuranceField.price);
                        setSelectedInsurance(
                          insuranceField.value.toLowerCase()
                        );
                      }}
                    />
                    <label
                      htmlFor={`insurance-${index}`}
                      className="text-gray-800 ml-2"
                    >
                      {insuranceField.label}
                    </label>
                  </div>
                  {insuranceField.price &&
                    Number(insuranceField.price) !== 0 && (
                      <div className="bg-primary px-4 rounded-full text-white">
                        + {insuranceField.price}
                      </div>
                    )}
                </div>
              ))}
            </div>
          </div>
        ) : null;

      case "REMOVE BRANDING":
        return removeBrandingFields?.length > 0 ? (
          <div className="space-y-4 p-4 border rounded-lg">
            <h2 className="text-lg font-semibold">REMOVE BRANDING</h2>
            <div className="grid grid-cols-2 gap-4">
              {removeBrandingFields?.map(
                (removeBrandingField: any, index: number) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id={`branding-${index}`}
                        name="branding"
                        value={removeBrandingField.value}
                        className="h-4 w-4 text-[#b88c4f] focus:ring-[#AE9164] border-gray-300 rounded-full"
                        checked={
                          selectedBranding ===
                          removeBrandingField.value.toLowerCase()
                        }
                        onChange={() => {
                          setBrandingPrice(removeBrandingField.price);
                          setSelectedBranding(
                            removeBrandingField.value.toLowerCase()
                          );
                        }}
                      />
                      <label
                        htmlFor={`branding-${index}`}
                        className="text-gray-800 ml-2 cursor-pointer"
                        onClick={() => {
                          setBrandingPrice(removeBrandingField.price);
                          setSelectedBranding(
                            removeBrandingField.value.toLowerCase()
                          );
                        }}
                      >
                        {removeBrandingField.label}
                      </label>
                    </div>
                    {removeBrandingField.price &&
                      Number(removeBrandingField.price) !== 0 && (
                        <div className="bg-primary px-4 rounded-full text-white">
                          + {removeBrandingField.price}
                        </div>
                      )}
                  </div>
                )
              )}
            </div>
          </div>
        ) : null;

      case "BOTTOM":
        return (
          <div className="space-y-4 p-4 border rounded-lg">
            {TextFields.filter(
              (field: any) => field.section === "bottombusiness"
            ).map((field: any) => (
              <div className="mb-6" key={field.elementId}>
                <h2 className="text-lg font-semibold">
                  {getFieldByElementId(
                    field.elementId,
                    "label",
                    field.defaultLabel
                  )}
                </h2>

                <input
                  id={field.name}
                  type={field.type}
                  name={field.name} // Use label as name (e.g., "name")
                  value={inputValues[field.name]}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#AE9164] focus:border-[#AE9164] placeholder-gray-400"
                  placeholder={
                    getFieldByElementId(
                      field.elementId,
                      "placeholder",
                      field.defaultLabel
                    ) || field.placeholder
                  }
                  // value={inputValues[field.defaultLabel]}
                  onChange={handleInputChange}
                />
              </div>
            ))}

            {TextFields.some(
              (field: any) => field.section === "bottomifrequired"
            ) && (
              <>
                <div className="mb-6">
                  <label
                    htmlFor="createdigitallink"
                    className="block text-gray-800 font-semibold mb-4 pb-3 border-b border-gray-300"
                  >
                    Do You want us to create a digital link for you?
                  </label>

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
                    <label
                      htmlFor="createdigitallink-yes"
                      className="mr-4 text-gray-800"
                    >
                      Yes
                    </label>
                    <input
                      type="radio"
                      id="createdigitallink-no"
                      name="createdigitallink"
                      value="no"
                      className="mr-2 focus:ring-[#AE9164] text-[#b88c4f]"
                      checked={workWithOurDigitalLinkCreators === "no"}
                      onClick={() => setWorkWithOurDigitalLinkCreators("no")}
                    />
                    <label
                      htmlFor="createdigitallink-no"
                      className="text-gray-800"
                    >
                      No
                    </label>
                  </div>
                </div>
              </>
            )}

            {workWithOurDigitalLinkCreators === "yes" &&
              TextFields.filter(
                (field: any) => field.section === "bottomifrequired"
              ).map((field: any) => (
                <>
                  <label
                    htmlFor={field.elementId}
                    className="block text-gray-800 font-semibold mb-4 pb-3 border-b border-gray-300"
                  >
                    {getFieldByElementId(
                      field.elementId,
                      "label",
                      field.defaultLabel
                    )}
                  </label>
                  <input
                    id={field.name}
                    key={field.elementId}
                    name={field.name} // Use label as name (e.g., "name")
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#AE9164] focus:border-[#AE9164] placeholder-gray-400"
                    placeholder={
                      getFieldByElementId(
                        field.elementId,
                        "placeholder",
                        field.defaultLabel
                      ) || field.placeholder
                    }
                    // value={inputValues[field.defaultLabel]}
                    onChange={handleInputChange}
                  />
                </>
              ))}

            {TextFields.filter((field: any) => field.section === "bottomlast").map(
              (field: any) => (
                <>
                  <label
                    htmlFor={field.elementId}
                    className="block text-gray-800 font-semibold mb-4 pb-3 border-b border-gray-300"
                  >
                    {getFieldByElementId(
                      field.elementId,
                      "label",
                      field.defaultLabel
                    )}
                  </label>
                  <textarea
                    id={field.name}
                    key={field.elementId}
                    rows={4}
                    cols={10}
                    name={field.name} // Use label as name (e.g., "name")
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#AE9164] focus:border-[#AE9164] placeholder-gray-400"
                    placeholder={
                      getFieldByElementId(
                        field.elementId,
                        "placeholder",
                        field.defaultLabel
                      ) || field.placeholder
                    }
                    // value={inputValues[field.defaultLabel]}
                    onChange={handleInputChange}
                  />
                </>
              )
            )}
          </div>
        );

      case "ADD TO CART":
        return (
          <div className="space-y-4 p-4 border rounded-lg">
            <button
              className={`w-full flex justify-center py-3 rounded-full  text-lg font-bold ${
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
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="block xl:hidden w-full p-4">
      <div>{renderStepContent(activeStep)}</div>
      <MobileStepper
        variant="dots"
        steps={dynamicSteps.length}
        position="static"
        activeStep={activeStep}
        nextButton={
          <Button
            size="small"
            onClick={() => setActiveStep((prev) => prev + 1)}
            disabled={activeStep === dynamicSteps.length - 1}
            className="bg-primary text-black rounded-full px-5"
          >
            Next
            <KeyboardArrowRight />
          </Button>
        }
        backButton={
          <Button
            size="small"
            onClick={() => setActiveStep((prev) => prev - 1)}
            disabled={activeStep === 0}
            className="bg-gray-300 text-gray-800 rounded-full px-5"
          >
            <KeyboardArrowLeft />
            Back
          </Button>
        }
      />
    </div>
  );
}
