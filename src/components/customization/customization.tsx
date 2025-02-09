"use client";
import { AppDispatch } from "@/redux/store";
import { postCartData } from "@/redux/store/cart";
import { BorderProps, InsuranceFieldsProps, LogoFieldProps } from "@/types/products/custom";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { SwiperClass } from "swiper/react";
import CardPreview from "./card-preview";
import Image from "next/image";
import LoadingSkeleton from "../common/skeleton-loader";
import FieldPrice from "./field-price";
import DigitalLinkModal from "./digital-link-modal";
import Link from "next/link";
import CustomCardSwiper from "./mobile-swiper-control";
import { captureSwiperImages, getMatchingCssColor, uploadImage } from "@/helper/helper";
import { CustomizationSectionProps } from "@/types/customization/custom";
import { customizationFieldTypes } from "@/helper/constants";

const Customization: React.FC<CustomizationSectionProps> = ({
  productId,
  product,
  allVariations,
  fieldMappings,
  secValue,
  TextFields,
  elementValues,
  setElementValues,
  updateElementValues,
  editable = false,
}) => {
  const [image, setImage] = useState<string>(""); //Custom logo
  const [design, setDesign] = useState<string>(""); //Custom image
  const [fileData, setFileData] = useState({
    logo: null,
    design: null,
  });
  // const [product, setProduct] = useState<ProductProps>(); //Product
  const [loading, setLoading] = useState<boolean>(true);

  // const [allVariations, setAllVariations] = useState<VariationProps[] | null>(null);
  const [selectedVariationId, setSelectedVariationId] = useState<string | number | null>(null);

  const [formLabels, setFormLabels] = useState([]);
  const [cardFront, setCardFront] = useState("");
  const [cardBack, setCardBack] = useState("");

  const [cardPlacementFields, setCardPlacementFields] = useState<any>([]);
  const [cardPlacement, setCardPlacement] = useState<"front" | "back">("front");

  const [namePlacementFields, setNamePlacementFields] = useState<any>([]);
  const [namePlacement, setNamePlacement] = useState<"front" | "back">("front");

  const [textColor, setTextColor] = useState<string>("");

  const [dualCardNumberPlacementFields, setDualCardNumberPlacementFields] = useState<any>([]);
  const [dualCardNumberPlacement, setDualCardNumberPlacement] = useState<"front" | "back">("front");

  const [logoFields, setLogoFields] = useState<LogoFieldProps[]>();
  const [predesignedLogoFields, setPredesignedLogoFields] = useState<any>([]);
  const [predesignedlogoimage, setPredesignLogoImage] = useState<string>("");
  const [predesignedLogoPrice, setPredesignedLogoPrice] = useState<number>(0);
  const [selectedPredesignedLogo, setSelectedPredesignedLogo] = useState<string | null>("none");
  const [selectedLogo, setSelectedLogo] = useState("none");

  const [workWithOurDigitalLinkCreators, setWorkWithOurDigitalLinkCreators] = useState<any>("no");
  const [isDigitalLinkModalOpen, setIsDigitalLinkModalOpen] = useState(false);

  const [insuranceFields, setInsuranceFields] = useState<InsuranceFieldsProps[]>([]);
  const [selectedInsurance, setSelectedInsurance] = useState<"yes" | "no">("no");

  const [borderFields, setBorderFields] = useState<BorderProps[]>([]);
  const [filteredBorders, setFilteredBorders] = useState<any>();
  const [filteredLogos, setFilteredLogos] = useState<any>();
  const [selectedBorderId, setSelectedBorderId] = useState<any>("none");
  const [displayBorder, setDisplayBorder] = useState<string | null>(null);

  const [workWithDesignersFields, setWorkWithDesignersFields] = useState<any>([]);
  const [selectedWorkWithDesigners, setSelectedWorkWithDesigners] = useState<any>("no");

  const [selectedProfileImage, setSelectedImage] = React.useState<any>(null);
  const [uploadedDigitalProfileImage, setuploadedDigitalProfileImage] = React.useState<any>("");

  const [removeBrandingFields, setRemoveBrandingFields] = useState<any>([]);
  const [selectedBranding, setSelectedBranding] = useState<"yes" | "no">("no");

  const [chipSizeFields, setChipSizeFields] = useState<any>([]);
  const [selectedChipSize, setSelectedChipSize] = useState<"small" | "big">("small");

  const [productPrice, setProductPrice] = useState<number>(0);
  const [chipsizePrice, setChipSizePrice] = useState<number>(0);
  const [borderPrice, setBorderPrice] = useState<number>(0);
  const [logoPrice, setLogoPrice] = useState<number>(0);
  const [insurancePrice, setInsurancePrice] = useState<number>(0);
  const [workwithdesignersPrice, setWorkwithdesignersPrice] = useState<number>(0);
  const [brandingPrice, setBrandingPrice] = useState<number>(0);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  const [uploadedLogo, setUploadedLogo] = useState<any>("");
  const [uploadedDesign, setUploadedDesign] = useState<any>("");

  const [isCapturing, setIsCapturing] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const targetRefs: any = useRef({});

  const [visibility, setVisibility] = useState({
    name: false,
    optional: false,
    optional2: false,
    number: false,
    topnumber: false,
    predesignedlogoimage: false,
    cardnumber1: false,
    cardnumber2: false,
    image: false,
    design: false,
  });

  const [inputValues, setInputValues] = useState<Record<string, string>>({});

  const [addToCartStatus, setAddToCartStatus] = useState<"submitting" | "success" | "error">();

  const [swiperSize, setSwiperSize] = useState({
    height: "600px", // Default height
    width: "800px", // Default width
  });

  const dispatch: AppDispatch = useDispatch();
  const swiperRef = useRef<{ swiper: SwiperClass } | null>(null);
  const router = useRouter();

  // Select the first variation by default
  useEffect(() => {
    if (allVariations && allVariations.length > 0) {
      const firstVariation = allVariations[0];
      setCardFront(
        firstVariation?.galleryImages[0]?.url || product?.images[0]?.src || "/assets/img/detail-page/card-f.png"
      );
      setCardBack(
        firstVariation?.galleryImages[1]?.url || product?.images[1]?.src || "/assets/img/detail-page/card-b.jpg"
      );
      setSelectedVariationId(firstVariation?.id);
      setProductPrice(Number(firstVariation?.price || 0));

      handleVariationChange(firstVariation?.id);

      setLoading(false);
    }
  }, [allVariations]);

  //Total price calculation
  useEffect(() => {
    const pricingFields = [
      productPrice,
      chipsizePrice,
      logoPrice,
      borderPrice,
      insurancePrice,
      brandingPrice,
      workwithdesignersPrice,
      predesignedLogoPrice,
    ];

    const total = pricingFields.reduce((acc, price) => acc + (price ? Number(price) : 0), 0);
    setTotalPrice(total);
  }, [
    chipsizePrice,
    productPrice,
    logoPrice,
    insurancePrice,
    borderPrice,
    brandingPrice,
    predesignedLogoPrice,
    workwithdesignersPrice,
  ]);

  useEffect(() => {
    if (product) {
      fetchFieldData();
      const tempFormLabels: any = product?.wcpa_form_fields?.wcpaData?.fields[secValue]?.fields;
      setFormLabels(tempFormLabels || []);
    }
  }, [product]);

  //Made compact

  const handleVariationChange = (id: number) => {
    setSelectedVariationId(id);
    const selectedVariation = allVariations?.find((variation: any) => variation?.id === id);

    setProductPrice(Number(selectedVariation?.price || 0));
    setCardFront(
      selectedVariation?.galleryImages[0]?.url || product?.images[0]?.src || "/assets/img/detail-page/card-f.png"
    );
    setCardBack(
      selectedVariation?.galleryImages[1]?.url || product?.images[1]?.src || "/assets/img/detail-page/card-b.jpg"
    );

    const borderColor =
      selectedVariation?.attributes.filter((attributes: any) => attributes?.slug.includes("border"))[0]?.option || "";
    const textColor =
      selectedVariation?.attributes.filter((attribute: any) => attribute?.slug.includes("font"))[0]?.option || "";
    const logoColor =
      selectedVariation?.attributes.filter((attribute: any) => attribute?.slug.includes("logo"))[0]?.option || "";

    if (textColor && textColor.length > 0) {
      setTextColor(getMatchingCssColor(textColor[0]));
    } else {
      setTextColor(getMatchingCssColor("white"));
    }

    const filteredLogos = logoColor
      ? predesignedLogoFields?.filter(
          (logo: any) =>
            logo?.value.toLowerCase().includes(logoColor?.toLowerCase()) || logo?.value.toLowerCase() === "none"
        )
      : predesignedLogoFields;

    const filteredBorders = borderColor.length
      ? borderFields?.filter(
          (border) =>
            border?.value.toLowerCase().includes(borderColor?.toLowerCase()) || border?.value.toLowerCase() === "none"
        )
      : borderFields;

    if (filteredBorders?.length > 0) setFilteredBorders(filteredBorders);
    if (filteredLogos?.length > 0) setFilteredLogos(filteredLogos);

    if (selectedBorderId && filteredBorders?.length > 0) {
      const currentBorderNumber = selectedBorderId.split("-")[0];
      const matchingBorder = filteredBorders.find((border: any) => {
        const borderValue = border?.value?.toLowerCase();
        return borderValue && borderValue.startsWith(currentBorderNumber + "-");
      });

      if (!matchingBorder) {
        setSelectedBorderId("none");
        setDisplayBorder(null);
      } else {
        setSelectedBorderId(matchingBorder.value.toLowerCase());
        setDisplayBorder(matchingBorder.image);
        setBorderPrice(matchingBorder.price || 0);
      }
    }

    if (selectedPredesignedLogo && filteredLogos?.length > 0) {
      const currentLogoNumber = selectedPredesignedLogo.split("-")[0];
      const matchingLogo = filteredLogos.find((logo: any) => {
        const logoValue = logo?.value?.toLowerCase();
        return logoValue && logoValue.startsWith(currentLogoNumber + "-");
      });

      if (!matchingLogo) {
        setPredesignLogoImage("");
        setSelectedPredesignedLogo("none");
        setPredesignedLogoPrice(0);
      } else {
        setPredesignLogoImage(matchingLogo.image);
        setSelectedPredesignedLogo(matchingLogo.value.toLowerCase());
        setPredesignedLogoPrice(matchingLogo.price || 0);
      }
    }

   
  };

  const fetchFieldData = () => {
    const fetchField = (fieldType: string, setter: (values: any) => void) => {
      const field =
        product &&
        product.wcpa_form_fields &&
        product.wcpa_form_fields.wcpaData &&
        product.wcpa_form_fields.wcpaData.fields &&
        product.wcpa_form_fields.wcpaData.fields[secValue] &&
        product.wcpa_form_fields.wcpaData.fields[secValue].fields
          .flat()
          .find((field: { elementId: string }) =>
            Object.entries(fieldMappings).some(([key, value]) => value === fieldType && field?.elementId === key)
          );

      if (field && Array.isArray(field.values)) {
        setter(field.values);
      }
    };

    // Call fetchField with respective field type and setter
    fetchField(customizationFieldTypes.border, setBorderFields);
    fetchField(customizationFieldTypes.logo, setLogoFields);
    fetchField(customizationFieldTypes.placement, setCardPlacementFields);
    fetchField(customizationFieldTypes.insurance, setInsuranceFields);
    fetchField(customizationFieldTypes.chipSize, setChipSizeFields);
    fetchField(customizationFieldTypes.namePlacement, setNamePlacementFields);
    fetchField(customizationFieldTypes.dualCardNumberPlacement, setDualCardNumberPlacementFields);
    fetchField(customizationFieldTypes.removeBranding, setRemoveBrandingFields);
    fetchField(customizationFieldTypes.predesignLogo, setPredesignedLogoFields);
    fetchField(customizationFieldTypes.workWithOurDesigners, setWorkWithDesignersFields);
  };

  const fetchLabel = (fieldType: string) => {
    const fieldLabel =
      product &&
      product.wcpa_form_fields &&
      product.wcpa_form_fields.wcpaData &&
      product.wcpa_form_fields.wcpaData.fields &&
      product.wcpa_form_fields.wcpaData.fields[secValue] &&
      product.wcpa_form_fields.wcpaData.fields[secValue].fields
        .flat()
        .find((field: { elementId: string }) =>
          Object.entries(fieldMappings).some(([key, value]) => value === fieldType && field?.elementId === key)
        ).label;

    return fieldLabel;
  };

  const addBorder = (value: string) => {
    if (selectedBorderId === value) {
      setSelectedBorderId(null);
      setDisplayBorder(null);
      setBorderPrice(0);
    } else {
      setSelectedBorderId(value);
      if (value === "none") {
        setDisplayBorder(null);
      } else {
        const selectedBorder: any =
          borderFields && borderFields.find((border: any) => border?.value.toLowerCase() === value);
        if (selectedBorder) {
          setDisplayBorder(selectedBorder?.image);
          setBorderPrice(selectedBorder?.price ? selectedBorder?.price : 0);
        }
      }
    }
  };

  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result: any = event.target?.result;
        if (result) {
          setSelectedImage(result);
        }
      };

      reader.readAsDataURL(file);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
      setFileData((prev: any) => ({ ...prev, logo: file }));
    }
  };

  const handleDesignInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const designUrl = URL.createObjectURL(file);
      setDesign(designUrl);
      setFileData((prev: any) => ({ ...prev, design: file }));
    }
  };

  useEffect(() => {
    setVisibility((prev: any) => ({ ...prev, ["design"]: true }));
  }, [design]);

  useEffect(() => {
    setVisibility((prev: any) => ({ ...prev, ["image"]: true }));
  }, [image]);

  useEffect(() => {
    setVisibility((prev: any) => ({ ...prev, ["predesignedlogoimage"]: true }));
  }, [selectedPredesignedLogo]);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setInputValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));

    const ref = targetRefs.current[name];
    if (ref) {
      ref.style.width = `${ref.scrollWidth}px`;
      ref.style.height = `${ref.scrollHeight}px`;
    }

    setVisibility((prev) => ({ ...prev, [name]: true }));
  };

  const toggleModal = () => {
    setIsDigitalLinkModalOpen(!isDigitalLinkModalOpen);
  };

  const getFieldByElementId = (
    elementId: string,
    field: keyof (typeof formLabels)[0][0] = "label",
    defaultValue: any = "label"
  ) => {
    const label = formLabels
      .flat() // Flatten the 2D array
      .find((item: { elementId: string }) => item?.elementId === elementId);

    return label && label[field] ? label[field] : defaultValue;
  };

  //Validation for handle add to cart
  const validateForm = () => {
    if (!selectedVariationId) {
      toast.error("Please select a variation");
      return false;
    }

    if ((selectedLogo.includes("own logo") && !image) || (selectedLogo.includes("own design") && !design)) {
      toast.error("Please upload a logo or design");
      return false;
    }

    if (selectedLogo.includes("pre design") && !selectedPredesignedLogo) {
      toast.error("Please select a pre-designed logo");
      return false;
    }

    return true;
  };

  const handleFieldMapping = () => {
    const fieldMappingValues: Record<string, any> = {};

    Object.entries(fieldMappings).forEach(([key, value]) => {
      fieldMappingValues[key] = getFieldValue(value);
    });

    return fieldMappingValues;
  };

  //ALL FIELD VALUES FROM THE BACKED MUST BE IN SMALL LETTERS FOR THIS TO WORK
  const fieldValues: any = {
    logoFieldElementId: selectedLogo,
    chipSizeFieldElementId: selectedChipSize,
    addBorderFieldElementId: selectedBorderId ? "yes" : "no",
    borderFieldElementId: selectedBorderId,
    workWithOurDesignersFieldElementId: selectedWorkWithDesigners,
    predesignLogoFieldElementId: selectedPredesignedLogo,
    placementFieldElementId: cardPlacement,
    namePlacementFieldElementId: namePlacement,
    dualCardNumberPlacementFieldElementId: dualCardNumberPlacement,
    insuranceFieldElementId: selectedInsurance,
    removeBrandingFieldElementId: selectedBranding,
    digitalProfileImageFieldElementId: uploadedDigitalProfileImage?.source_url,
    // customLogoImageFieldElementId: uploadedLogo?.source_url,
    // customDesignImageFieldElementId: uploadedDesign?.source_url,
  };

  const getFieldValue = (fieldId: string) => {
    const normalizedFieldId = fieldId.toLowerCase();

    for (let key in fieldValues) {
      if (key.toLowerCase() === normalizedFieldId) {
        return fieldValues[key];
      }

      if (typeof fieldValues[key] === "string" && fieldValues[key].toLowerCase() === normalizedFieldId) {
        return fieldValues[key];
      }
    }
    return "";
  };

  useEffect(() => {
    const uploadFiles = async () => {
      if (fileData.logo && selectedLogo.includes("own logo")) {
        const uploadedLogo = await uploadImage(fileData.logo, "Custom Logo", 0.5);
        setUploadedLogo(uploadedLogo);
      }

      if (fileData.design && selectedLogo.includes("own design")) {
        const uploadedDesign = await uploadImage(fileData.design, "Custom Design", 0.5);
        setUploadedDesign(uploadedDesign);
      }
    };

    uploadFiles();
  }, [fileData.logo, fileData.design, selectedLogo]);

  const handleAddToCart = async () => {
    if (!validateForm()) return;

    try {
      setAddToCartStatus("submitting");

      const swiper = swiperRef?.current?.swiper;
      const slides = swiper?.slides;
      let imgData;

      if (swiper && slides) {
        imgData = await captureSwiperImages(swiper, swiper.slides, swiperSize);
      }

      if (imgData) {
        // Wait for the image upload to complete and return the result
        const uploadedImageResponse = await uploadImage(imgData, "customized-product.png");

        // Check if uploadedImage is available
        if (uploadedImageResponse) {
          const textFieldValues = createTextFieldValues();
          const fieldMappingValues = handleFieldMapping();

          const data: Record<string, any> = {
            id: selectedVariationId?.toString(),
            quantity: "1",
            ...textFieldValues,
            ...fieldMappingValues,
          };

          for (const [key, fieldId] of Object.entries(fieldMappings)) {
            switch (fieldId) {
              case "customizedProductImageFieldElementId":
                data[key] = uploadedImageResponse?.source_url || "";
                break;
              case "customLogoImageFieldElementId":
                data[key] = uploadedLogo?.source_url || "";
                break;
              case "customDesignImageFieldElementId":
                data[key] = uploadedDesign?.source_url || "";
                break;
              default:
                // data[fieldId] = fieldValues[fieldId] || "";
                break;
            }
          }
          const resultAction = await dispatch(postCartData(data));

          if (postCartData.fulfilled.match(resultAction)) {
            toast.success("Added to cart");
            setAddToCartStatus("success");
            router.push(`/cart`);
          } else {
            toast.error("Server error");
            throw new Error("Failed to add to cart");
          }
        } else {
          toast.error("Server error");
          throw new Error("Image upload failed.");
        }
      }
    } catch (error) {
      setAddToCartStatus("error");
      toast.error("Server side error");
      console.error(error);
    }
  };

  const createTextFieldValues = (): Record<string, string> => {
    return Object.values(TextFields).reduce((acc: Record<string, string>, { elementId, name }) => {
      if (inputValues[name]) {
        acc[elementId] = inputValues[name];
      }
      return acc;
    }, {});
  };

  return (
    <section className="flex flex-col">
      <div className="flex-1">
        <div className="flex flex-col h-[100%] md:flex-row xl:h-[calc(100vh-100px)] ">
          {/* Card preview section */}
          <CardPreview
            handleAddToCart={handleAddToCart}
            setSelectedWorkWithDesigners={setSelectedWorkWithDesigners}
            product={product}
            totalPrice={totalPrice}
            setChipSizePrice={setChipSizePrice}
            setBorderPrice={setBorderPrice}
            setLogoPrice={setLogoPrice}
            setPredesignedLogoPrice={setPredesignedLogoPrice}
            setWorkwithdesignersPrice={setWorkwithdesignersPrice}
            setInsurancePrice={setInsurancePrice}
            setBrandingPrice={setBrandingPrice}
            cardFront={cardFront}
            cardBack={cardBack}
            removeBranding={selectedBranding}
            setSelectedBranding={setSelectedBranding}
            loading={loading}
            cardPlacement={cardPlacement}
            setCardPlacement={setCardPlacement}
            namePlacement={namePlacement}
            setNamePlacement={setNamePlacement}
            addToCartStatus={addToCartStatus}
            setSelectedInsurance={setSelectedInsurance}
            setSelectedPredesignedLogo={setSelectedPredesignedLogo}
            predesignedlogoimage={predesignedlogoimage}
            selectedPredesignedLogo={selectedPredesignedLogo}
            image={image}
            design={design}
            swiperRef={swiperRef}
            setSwiperSize={setSwiperSize}
            swiperSize={swiperSize}
            inputValues={inputValues}
            setInputValues={setInputValues}
            selectedLogo={selectedLogo}
            setSelectedLogo={setSelectedLogo}
            displayBorder={displayBorder}
            setTotalPrice={setTotalPrice}
            productPrice={productPrice}
            setDisplayBorder={setDisplayBorder}
            setSelectedBorderId={setSelectedBorderId}
            chipSize={selectedChipSize}
            chipSizeFields={chipSizeFields}
            setChipSize={setSelectedChipSize}
            elementValues={elementValues}
            setElementValues={setElementValues}
            updateElementValues={updateElementValues}
            editable={editable}
            TextFields={TextFields}
            dualCardNumberPlacement={dualCardNumberPlacement}
            setDualCardNumberPlacement={setDualCardNumberPlacement}
            productId={productId}
            textColor={textColor}
            visibility={visibility}
            setVisibility={setVisibility}
            targetRefs={targetRefs}
            setPredesignLogoImage={setPredesignLogoImage}
            imageLoaded={imageLoaded}
            setIsCapturing={setIsCapturing}
            isCapturing={isCapturing}
            setImageLoaded={setImageLoaded}
          />

          {/* Input Section */}
          <div className="hidden xl:block w-full md:w-1/4 bg-white p-6 shadow-lg rounded-lg overflow-y-auto border-s">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Custom Card</h1>

            {/* Large device customization options */}
            <div className="hidden lg:block px-3">
              <div>
                <div>
                  {/* Chip Size - HIDDEN FOR NOW */}
                  {/* <div className="mb-6">
                  {chipSizeFields && chipSizeFields.length > 0 && (
                    <label className="block text-gray-800 font-semibold mb-4 pb-3 border-b border-gray-300">
                      {fetchLabel(customizationFieldTypes?.chipSize)}
                    </label>
                  )}

                  <div className="flex items-center space-x-10">
                    {chipSizeFields &&
                      chipSizeFields.map((chipSizeField: any, index: number) => (
                        <div key={index} className="flex items-center gap-2">
                          <div>
                            <input
                              type="radio"
                              id={chipSizeField?.value.toLowerCase()}
                              name={chipSizeField?.name}
                              value={chipSizeField?.value.toLowerCase()}
                              className="h-4 w-4 text-[#b88c4f] focus:ring-[#AE9164] border-gray-300 rounded-full"
                              checked={selectedChipSize == chipSizeField?.value.toLowerCase()}
                              onChange={() => {
                                setSelectedChipSize(chipSizeField?.value.toLowerCase());
                                setChipSizePrice(chipSizeField?.price);
                              }}
                            />
                            <label
                              htmlFor={chipSizeField?.value.toLowerCase()}
                              className="text-gray-800 ml-2 cursor-pointer"
                            >
                              {chipSizeField?.label}
                            </label>
                          </div>
                          {chipSizeField?.price && Number(chipSizeField?.price) !== 0 && (
                            <FieldPrice field={chipSizeField} />
                          )}
                        </div>
                      ))}
                  </div>
                </div> */}
                </div>
                {/* Card Variants */}
                <div className="mb-6">
                  <label
                    htmlFor="add-borders"
                    className="block pb-3 border-b border-gray-300 text-gray-800 font-semibold mb-2"
                  >
                    CHOOSE VARIANT
                  </label>

                  <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3  2xl:grid-cols-4 gap-2">
                    {allVariations
                      ? allVariations.map((variation: any) => (
                          <div
                            key={variation?.id}
                            className={`p-2 rounded-md border  transition-shadow cursor-pointer  ${
                              Number(selectedVariationId) === variation?.id
                                ? "bg-[#e9e9e9] border-2 border-[#AE9164]"
                                : "border-gray-300  border-0"
                            }`}
                            onClick={() => handleVariationChange(Number(variation?.id))} // Set the selected item
                            style={{ boxSizing: "border-box" }} // Ensure border is inside the box sizing
                          >
                            <div className="relative flex justify-between  items-center text-center mx-auto w-full h-10 overflow-hidden mb-1">
                              {variation &&
                                variation?.images &&
                                variation?.images[0] &&
                                variation?.images[0]?.src !== undefined &&
                                variation?.name && (
                                  <Image
                                    src={variation?.images[0].src}
                                    alt={variation?.name}
                                    layout="fill"
                                    objectFit="cover"
                                    priority
                                    className="rounded-md scale-[8] "
                                  />
                                )}
                            </div>
                            <h3 className="text-center font-semibold text-[13px] text-gray-800">
                              {
                                variation?.attributes.find((attribute: any) =>
                                  attribute?.slug.toLowerCase().includes("metal-finish")
                                )?.option
                              }
                            </h3>
                          </div>
                        ))
                      : // Skeleton loader when `allVariations` is not yet available
                        Array.from({ length: 3 }).map((_, index) => (
                          <div
                            key={index}
                            className="bg-white p-2 rounded-lg hover:shadow-xl transition-shadow cursor-pointer"
                          >
                            <div className="relative w-full h-14 mb-1">
                              <LoadingSkeleton width="100%" height="100%" variant="rectangular" />
                            </div>
                            <LoadingSkeleton width="60%" height={20} className="mx-auto mt-2" />
                          </div>
                        ))}
                  </div>
                </div>
                {TextFields.filter((field) => field.section === "top").map((field) => (
                  <div className="mb-6" key={field.elementId}>
                    <label htmlFor={field.elementId} className="block text-gray-800 font-semibold mb-1">
                      {getFieldByElementId(field.elementId, "label", field.defaultLabel)}
                    </label>
                    <input
                      id={field?.elementId}
                      type={field?.type}
                      name={field?.name} // Use label as name (e.g., "name")
                      maxLength={20}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#AE9164] focus:border-[#AE9164] placeholder-gray-400"
                      placeholder={
                        getFieldByElementId(field?.elementId, "placeholder", field?.defaultLabel) || field?.placeholder
                      }
                      // value={inputValues[field.defaultLabel]}
                      onChange={handleInputChange}
                    />
                  </div>
                ))}
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
                                id={cardPlacementField?.value.toLowerCase()}
                                name={cardPlacementField?.name}
                                value={cardPlacementField?.value.toLowerCase()}
                                className="h-4 w-4 text-[#b88c4f] focus:ring-[#AE9164] border-gray-300 rounded-full"
                                checked={cardPlacement == cardPlacementField?.value.toLowerCase()}
                                onChange={() => {
                                  setCardPlacement(cardPlacementField?.value.toLowerCase());
                                }}
                              />
                              <label
                                htmlFor={cardPlacementField?.value.toLowerCase()}
                                className="text-gray-800 ml-2 cursor-pointer"
                              >
                                {cardPlacementField?.label}
                              </label>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                )}
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
                            key={index}
                            className={`flex items-center cursor-pointer`}
                            onClick={() => setNamePlacement(namePlacementField?.value.toLowerCase())}
                          >
                            <input
                              type="radio"
                              id={`nameplacement-${index}`}
                              name="nameplacement"
                              value={Number(namePlacementField?.value)}
                              className="h-4 w-4 text-[#b88c4f] focus:ring-[#AE9164] border-gray-300 rounded-full"
                              checked={namePlacement === namePlacementField?.value.toLowerCase()}
                              readOnly
                            />
                            <label htmlFor={`nameplacement-${index}`} className="text-gray-800 ml-2 cursor-pointer">
                              {namePlacementField?.label}
                            </label>
                          </div>
                        ))}
                    </div>
                  </div>
                )}
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
                                name={`dualcardnumberplacement-${index}`}
                                value={dualCardNumberPlacementField?.value.toLowerCase()}
                                className="mr-2 focus:ring-[#AE9164] text-[#b88c4f]"
                                checked={dualCardNumberPlacement === dualCardNumberPlacementField?.value.toLowerCase()}
                                onChange={() => {
                                  // setChipSizePrice(dualCardNumberPlacementFields.price);
                                  setDualCardNumberPlacement(dualCardNumberPlacementField?.value.toLowerCase());
                                }}
                              />
                              <label
                                htmlFor={`dualcardnumberplacement-${index}`}
                                className="text-gray-800 m-0 cursor-pointer"
                                onClick={() => {
                                  // setChipSizePrice(dualCardNumberPlacementFields.price);
                                  setDualCardNumberPlacement(dualCardNumberPlacementField?.value.toLowerCase());
                                }}
                              >
                                {dualCardNumberPlacementField?.label}
                              </label>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                )}
                {filteredBorders && filteredBorders.length > 0 && (
                  <div className="mb-6">
                    <label className="block text-gray-800 font-semibold mb-4 pb-3 border-b border-gray-300">
                      {fetchLabel(customizationFieldTypes?.border)}
                    </label>

                    <div className="grid grid-cols-1 sm:grid-cols-1 xl:grid-cols-3 2xl:grid-cols-4 gap-2">
                      {filteredBorders &&
                        filteredBorders.length > 0 &&
                        filteredBorders.map((border: any) => (
                          <div
                            onClick={() => {
                              addBorder(border?.value.toLowerCase());
                            }}
                            key={border?.value.toLowerCase()}
                            className={`aspect-square rounded-md p-2 transition flex border custom-field-bg justify-center flex-col items-center duration-300 cursor-pointer  group 
                          ${
                            selectedBorderId === border?.value.toLowerCase()
                              ? "bg-[#e9e9e9] border-2 border-[#AE9164]"
                              : "border-gray-300  border-0"
                          } h-[80px] w-[70px]`} // Ensure fixed box size
                          >
                            {border?.value.toLowerCase() !== "none" && border?.image && (
                              <>
                                <Image
                                  src={border?.image || "/default-image.jpg"}
                                  height={60} // Fixed size for the image
                                  width={60}
                                  alt="Border"
                                  className={`object-contain rounded-md ${
                                    border?.value.toLowerCase().includes("white") ? "filter brightness-0" : ""
                                  }`}
                                />
                              </>
                            )}
                            {border.value.toLowerCase() === "none" ? (
                              <p className="flex justify-center text-center text-xs text-primary font-semibold group-hover:text-primary text-nowrap mt-2">
                                None
                              </p>
                            ) : (
                              <p className="flex flex-col justify-center text-center text-xs text-primary font-semibold group-hover:text-primary text-nowrap mt-2">
                                {border?.label}
                                {border?.price && Number(border?.price) !== 0 && <FieldPrice field={border} />}
                              </p>
                            )}
                          </div>
                        ))}
                    </div>
                  </div>
                )}
                {logoFields && logoFields.length > 0 && (
                  <div className="mb-6">
                    <label
                      htmlFor="choose-logo"
                      className="block text-gray-800 font-semibold mb-4 pb-3 border-b border-gray-300"
                    >
                      {fetchLabel(customizationFieldTypes?.logo)}
                    </label>
                    <div className="lx-colors text-sm grid grid-cols-1 text-center gap-2 ">
                      {logoFields?.map((logo: any) => {
                        const logoValue = logo?.value?.toLowerCase();
                        const isSelected = selectedLogo === logoValue;

                        return (
                          <label
                            key={logo?.label}
                            htmlFor={logoValue}
                            className={`flex items-center justify-center py-2 gap-2 cursor-pointer rounded-md  transition-all duration-200 ${
                              isSelected ? "bg-[#e9e9e9] border-[#AE9164]" : "border border-gray-300 hover:bg-gray-100"
                            }`}
                          >
                            <input
                              type="radio"
                              id={logoValue}
                              name="logo"
                              value={logoValue}
                              checked={isSelected}
                              onChange={() => {
                                setSelectedLogo(logoValue);
                                setLogoPrice(logo?.price || 0); // Default to 0 if price is not set
                              }}
                              className="h-4 w-4 text-primary focus:ring-2 focus:ring-primary"
                            />
                            <span className="text-gray-800 font-medium">{logo?.label}</span>
                            {logo?.price > 0 && <FieldPrice small={false} field={logo} />}
                          </label>
                        );
                      })}
                    </div>

                    <div className="mt-10">
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
                              <h3>Selected Logo:</h3>
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
                            <p>No custom logo uploaded yet.</p>
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
                            <p>No custom Design uploaded yet.</p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                )}
                <div className="mb-6">
                  {predesignedLogoFields && predesignedLogoFields.length > 0 && (
                    <label className="block text-gray-800 font-semibold mb-4 pb-3 border-b border-gray-300">
                      {fetchLabel(customizationFieldTypes?.predesignLogo)}
                    </label>
                  )}

                  <div className="grid grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5 gap-2">
                    {filteredLogos &&
                      filteredLogos.length > 0 &&
                      filteredLogos.map((logo: any) => (
                        <div
                          onClick={() => {
                            if (logo?.value.toLowerCase() === "none") {
                              setSelectedPredesignedLogo("none");
                              setPredesignedLogoPrice(0);
                              setPredesignLogoImage("");
                              // return
                            } else if (selectedPredesignedLogo === logo?.value.toLowerCase()) {
                              setSelectedPredesignedLogo(null);
                              setPredesignedLogoPrice(0);
                              setPredesignLogoImage("");
                            } else {
                              setSelectedPredesignedLogo(logo?.value.toLowerCase());
                              setPredesignedLogoPrice(Number(logo?.price));
                              setPredesignLogoImage(logo?.image);
                            }
                          }}
                          key={logo?.value}
                          className={`aspect-square rounded-md p-2 transition flex custom-field-bg justify-center items-center space-y-3 flex-col duration-300 cursor-pointer logo-option border group 
                    ${
                      selectedPredesignedLogo === logo?.value.toLowerCase()
                        ? "bg-[#e9e9e9] border-[#AE9164] border-2"
                        : "border-gray-300  border-0"
                    } h-[80px] w-[70px]`}
                        >
                          {logo?.value.toLowerCase() !== "none" && logo?.image && (
                            <div className="flex justify-center items-center w-full h-full">
                              <Image
                                src={logo?.image || "/default-image.svg"}
                                height={48}
                                width={48}
                                alt="predesigned logo"
                                className={`object-contain rounded-md ${
                                  logo?.value.toLowerCase().includes("white") ? "filter brightness-0" : ""
                                }`}
                              />
                            </div>
                          )}

                          {logo?.value.toLowerCase() === "none" ? (
                            <p className="flex justify-center text-center text-xs text-primary font-semibold group-hover:text-primary text-nowrap mt-2">
                              None
                            </p>
                          ) : (
                            <p className="text-center text-sm text-primary font-semibold group-hover:text-primary text-nowrap">
                              <div className="max-w-sm flex justify-center">
                                {logo?.price > 0 && <FieldPrice small={true} field={logo} />}
                              </div>
                            </p>
                          )}
                        </div>
                      ))}
                  </div>
                </div>
                {/* {workWithDesignersFields && workWithDesignersFields.length > 0 && (
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
                          className={`flex items-center`}
                          onClick={() => {
                            setSelectedWorkWithDesigners(workWithDesignersField?.value.toLowerCase());
                            setWorkwithdesignersPrice(workWithDesignersField?.price);
                          }}
                        >
                          <input
                            type="radio"
                            id={`workwithdesigners-${index}`}
                            name={`workwithdesigners-${index}`}
                            value={workWithDesignersField?.value}
                            className="h-4 w-4 text-[#b88c4f] focus:ring-[#AE9164] border-gray-300 rounded-full"
                            checked={selectedWorkWithDesigners === workWithDesignersField?.value.toLowerCase()}
                          />
                          <span className="text-gray-800 ml-2 cursor-pointer">
                            {workWithDesignersField?.label.charAt(0).toUpperCase() +
                              workWithDesignersField?.label.slice(1)}
                          </span>
                          {workWithDesignersField.price && Number(workWithDesignersField?.price) !== 0 && (
                            <div className="bg-primary  ml-3 rounded-full text-white">
                              <FieldPrice field={workWithDesignersField} />
                            </div>
                          )}
                        </div>
                      ))}
                  </div>
                </div>
              )} */}
                {workWithDesignersFields && workWithDesignersFields.length > 0 && (
                  <div className="mb-6">
                    <label className="block text-gray-800 font-semibold mb-4 pb-3 border-b border-gray-300">
                      {fetchLabel(customizationFieldTypes?.workWithOurDesigners)}
                    </label>

                    <div className="flex items-center space-x-10">
                      {workWithDesignersFields.map((workWithDesignersField: any, index: number) => (
                        <label
                          key={index}
                          className="flex items-center cursor-pointer"
                          htmlFor={`workwithdesigners-${index}`}
                        >
                          <input
                            type="radio"
                            id={`workwithdesigners-${index}`}
                            name="workwithdesigners"
                            value={workWithDesignersField?.value}
                            className="h-4 w-4 text-[#b88c4f] focus:ring-[#AE9164] border-gray-300 rounded-full"
                            checked={selectedWorkWithDesigners === workWithDesignersField?.value.toLowerCase()}
                            onChange={() => {
                              setSelectedWorkWithDesigners(workWithDesignersField?.value.toLowerCase());
                              setWorkwithdesignersPrice(workWithDesignersField?.price);
                            }}
                          />
                          <span className="text-gray-800 ml-2">
                            {workWithDesignersField?.label.charAt(0).toUpperCase() +
                              workWithDesignersField?.label.slice(1)}
                          </span>
                          {workWithDesignersField.price && Number(workWithDesignersField?.price) !== 0 && (
                            <div className="bg-primary ml-3 rounded-full text-white">
                              <FieldPrice field={workWithDesignersField} />
                            </div>
                          )}
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mb-6">
                  {insuranceFields && insuranceFields.length > 0 && (
                    <label
                      htmlFor="choose-logo"
                      className="block text-gray-800 font-semibold mb-4 pb-3 border-b border-gray-300"
                    >
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
                        <div key={index} className="flex items-center">
                          <input
                            type="radio"
                            id={`insurance-${index}`}
                            name={`insurance`}
                            value={Number(insuranceField?.value)}
                            className="h-4 w-4 text-[#b88c4f] focus:ring-[#AE9164] border-gray-300 rounded-full"
                            checked={selectedInsurance === insuranceField?.value.toLowerCase()}
                            onChange={() => {
                              setSelectedInsurance(insuranceField?.value.toLowerCase());
                              setInsurancePrice(insuranceField?.price);
                            }}
                          />
                          <label htmlFor={`insurance-${index}`} className="text-gray-800 ml-2 cursor-pointer">
                            {insuranceField?.label}
                          </label>

                          {insuranceField?.price && Number(insuranceField?.price) !== 0 && (
                            <div className="bg-primary  ml-3 rounded-full text-white">
                              <FieldPrice small={false} field={insuranceField} />
                            </div>
                          )}
                        </div>
                      ))}
                  </div>
                </div>
                <div className="mb-6">
                  {removeBrandingFields && removeBrandingFields.length > 0 && (
                    <label
                      htmlFor="choose-logo"
                      className="block text-gray-800 font-semibold mb-4 pb-3 border-b border-gray-300"
                    >
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
                            name={`branding-${index}`}
                            value={Number(removeBrandingField?.value)}
                            className="h-4 w-4 text-[#b88c4f] focus:ring-[#AE9164] border-gray-300 rounded-full"
                            checked={selectedBranding === removeBrandingField?.value.toLowerCase()}
                            onChange={() => {
                              setSelectedBranding(removeBrandingField?.value.toLowerCase());
                              setBrandingPrice(Number(removeBrandingField?.price));
                            }}
                          />
                          <label htmlFor={`branding-${index}`} className="text-gray-800 ml-2 cursor-pointer">
                            {removeBrandingField?.label}
                          </label>
                          {removeBrandingField.price && Number(removeBrandingField?.price) !== 0 && (
                            <div className="bg-primary  ml-3 rounded-full text-white">
                              <FieldPrice small={false} field={removeBrandingField} />
                            </div>
                          )}
                        </div>
                      ))}
                  </div>
                </div>
                {TextFields.filter((field) => field?.section === "bottom").map((field) => (
                  <div className="mb-6" key={field?.elementId}>
                    <label
                      htmlFor={field?.elementId}
                      className="block text-gray-800 font-semibold mb-4 pb-3 border-b border-gray-300"
                    >
                      {getFieldByElementId(field?.elementId, "label", field?.defaultLabel)}
                    </label>

                    <input
                      id={field?.name}
                      type={field?.type}
                      name={field?.name} // Use label as name (e.g., "name")
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#AE9164] focus:border-[#AE9164] placeholder-gray-400"
                      placeholder={
                        getFieldByElementId(field?.elementId, "placeholder", field?.defaultLabel) || field?.placeholder
                      }
                      // value={inputValues[field.defaultLabel]}
                      onChange={handleInputChange}
                    />
                  </div>
                ))}

                {TextFields.some((field) => field?.section === "bottomifrequired") && (
                  <>
                    <div className="mb-6">
                      <label
                        htmlFor="createdigitallink-yes"
                        className="block text-gray-800 font-semibold mb-4 pb-3 border-b border-gray-300"
                      >
                        {fetchLabel(customizationFieldTypes?.workWithOurDesignersLabelField)}
                      </label>

                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="createdigitallink-no"
                          name="createdigitallink-no"
                          value="no"
                          className="mr-2 focus:ring-[#AE9164] text-[#b88c4f]"
                          checked={workWithOurDigitalLinkCreators === "no"}
                          onClick={() => setWorkWithOurDigitalLinkCreators("no")}
                        />
                        <label htmlFor="createdigitallink-no" className="text-gray-800 cursor-pointer">
                          No
                        </label>
                        <input
                          type="radio"
                          id="createdigitallink-yes"
                          name="createdigitallink-yes"
                          value="yes"
                          className="ml-12 focus:ring-[#AE9164] text-[#b88c4f]"
                          checked={workWithOurDigitalLinkCreators === "yes"}
                          onClick={() => setWorkWithOurDigitalLinkCreators("yes")}
                        />
                        <label htmlFor="createdigitallink-yes" className="ml-2 text-gray-800 cursor-pointer">
                          Yes
                        </label>
                      </div>
                    </div>
                  </>
                )}
                {workWithOurDigitalLinkCreators === "yes" && (
                  <div className="mb-8">
                    <button
                      onClick={toggleModal}
                      className="px-4 py-2 text-white bg-[#AE9164] rounded-lg transition duration-300 ease-in-out hover:bg-[#8C7553] focus:outline-none focus:ring-2 focus:ring-[#AE9164]"
                    >
                      Enter Details
                    </button>
                    <DigitalLinkModal
                      toggleModal={toggleModal}
                      isDigitalLinkModalOpen={isDigitalLinkModalOpen}
                      selectedProfileImage={selectedProfileImage}
                      setuploadedDigitalProfileImage={setuploadedDigitalProfileImage}
                      uploadedDigitalProfileImage={uploadedDigitalProfileImage}
                      handleImageChange={handleImageChange}
                      workWithOurDigitalLinkCreators={workWithOurDigitalLinkCreators}
                      setSelectedImage={setSelectedImage}
                      getFieldByElementId={getFieldByElementId}
                      TextFields={TextFields}
                      inputValues={inputValues}
                      handleInputChange={handleInputChange}
                    />
                  </div>
                )}
                {workWithOurDigitalLinkCreators === "no" &&
                  TextFields.filter((field) => field?.section === "bottombusiness").map((field) => (
                    <div className="mb-6" key={field?.elementId}>
                      <label
                        htmlFor={field?.elementId}
                        className="block text-gray-800 font-semibold mb-4 pb-3 border-b border-gray-300"
                      >
                        {getFieldByElementId(field?.elementId, "label", field?.defaultLabel)}
                      </label>

                      <input
                        id={field?.name}
                        type={field?.type}
                        name={field?.name} // Use label as name (e.g., "name")
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#AE9164] focus:border-[#AE9164] placeholder-gray-400"
                        placeholder={
                          getFieldByElementId(field?.elementId, "placeholder", field?.defaultLabel) ||
                          field?.placeholder
                        }
                        // value={inputValues[field.defaultLabel]}
                        onChange={handleInputChange}
                      />
                    </div>
                  ))}
                {TextFields.filter((field) => field?.section === "bottomlast").map((field) => (
                  <>
                    <label
                      htmlFor={field?.elementId}
                      className="block text-gray-800 font-semibold mb-4 pb-3 border-b border-gray-300"
                    >
                      {getFieldByElementId(field?.elementId, "label", field?.defaultLabel)}
                    </label>
                    <textarea
                      id={field?.name}
                      key={field?.elementId}
                      rows={4}
                      cols={10}
                      name={field?.name} // Use label as name (e.g., "name")
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#AE9164] focus:border-[#AE9164] placeholder-gray-400"
                      placeholder={
                        getFieldByElementId(field?.elementId, "placeholder", field?.defaultLabel) || field?.placeholder
                      }
                      // value={inputValues[field.defaultLabel]}
                      onChange={handleInputChange}
                    />
                  </>
                ))}
                {/* Add to Cart Button */}
                <button
                  className={`w-full flex justify-center py-3 rounded-md  text-lg font-bold ${
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
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 border-s xl:hidden bg-white">
        <div className="fixed bottom-2 w-screen">
          <CustomCardSwiper
            chipSizeFields={chipSizeFields}
            setChipSizePrice={setChipSizePrice}
            setSelectedChipSize={setSelectedChipSize}
            selectedChipSize={selectedChipSize}
            allVariations={allVariations}
            selectedBorderId={selectedBorderId}
            handleVariationChange={handleVariationChange}
            TextFields={TextFields}
            handleInputChange={handleInputChange}
            toggleModal={toggleModal}
            getFieldByElementId={getFieldByElementId}
            cardPlacementFields={cardPlacementFields}
            setCardPlacement={setCardPlacement}
            cardPlacement={cardPlacement}
            namePlacementFields={namePlacementFields}
            handleImageChange={handleImageChange}
            selectedProfileImage={selectedProfileImage}
            setuploadedDigitalProfileImage={setuploadedDigitalProfileImage}
            isDigitalLinkModalOpen={isDigitalLinkModalOpen}
            setIsDigitalLinkModalOpen={setIsDigitalLinkModalOpen}
            setSelectedWorkWithDesigners={setSelectedWorkWithDesigners}
            workWithOurDigitalLinkCreators={workWithOurDigitalLinkCreators}
            setWorkWithOurDigitalLinkCreators={setWorkWithOurDigitalLinkCreators}
            setWorkwithdesignersPrice={setWorkwithdesignersPrice}
            selectedWorkWithDesigners={selectedWorkWithDesigners}
            workWithDesignersFields={workWithDesignersFields}
            setNamePlacement={setNamePlacement}
            namePlacement={namePlacement}
            dualCardNumberPlacementFields={dualCardNumberPlacementFields}
            setDualCardNumberPlacement={setDualCardNumberPlacement}
            selectedVariationId={selectedVariationId}
            selectedBranding={selectedBranding}
            predesignedLogoFields={predesignedLogoFields}
            dualCardNumberPlacement={dualCardNumberPlacement}
            setSelectedPredesignedLogo={setSelectedPredesignedLogo}
            setPredesignedLogoPrice={setPredesignedLogoPrice}
            setPredesignLogoImage={setPredesignLogoImage}
            selectedPredesignedLogo={selectedPredesignedLogo}
            borderFields={borderFields}
            filteredBorders={filteredBorders}
            filteredLogos={filteredLogos}
            addBorder={addBorder}
            logoFields={logoFields}
            inputValues={inputValues}
            handleDesignInput={handleDesignInput}
            setSelectedLogo={setSelectedLogo}
            addToCartStatus={addToCartStatus}
            setLogoPrice={setLogoPrice}
            handleFileChange={handleFileChange}
            image={image}
            selectedLogo={selectedLogo}
            design={design}
            insuranceFields={insuranceFields}
            selectedInsurance={selectedInsurance}
            setSelectedInsurance={setSelectedInsurance}
            setInsurancePrice={setInsurancePrice}
            removeBrandingFields={removeBrandingFields}
            setSelectedBranding={setSelectedBranding}
            setBrandingPrice={setBrandingPrice}
            handleAddToCart={handleAddToCart}
            setSelectedImage={setSelectedImage}
            fetchLabel={fetchLabel}
          />
          {/* <CustomMobileStepper
          chipSizeFields={chipSizeFields}
          setChipSizePrice={setChipSizePrice}
          setSelectedChipSize={setSelectedChipSize}
          selectedChipSize={selectedChipSize}
          allVariations={allVariations}
          selectedBorderId={selectedBorderId}
          handleVariationChange={handleVariationChange}
          TextFields={TextFields}
          handleInputChange={handleInputChange}
          getFieldByElementId={getFieldByElementId}
          cardPlacementFields={cardPlacementFields}
          setCardPlacement={setCardPlacement}
          namePlacementFields={namePlacementFields}
          setSelectedWorkWithDesigners={setSelectedWorkWithDesigners}
          workWithOurDigitalLinkCreators={workWithOurDigitalLinkCreators}
          setWorkWithOurDigitalLinkCreators={setWorkWithOurDigitalLinkCreators}
          setWorkwithdesignersPrice={setWorkwithdesignersPrice}
          selectedWorkWithDesigners={selectedWorkWithDesigners}
          setNamePlacement={setNamePlacement}
          dualCardNumberPlacementFields={dualCardNumberPlacementFields}
          setDualCardNumberPlacement={setDualCardNumberPlacement}
          selectedVariationId={selectedVariationId}
          selectedBranding={selectedBranding}
          predesignedLogoFields={predesignedLogoFields}
          dualCardNumberPlacement={dualCardNumberPlacement}
          setSelectedPredesignedLogo={setSelectedPredesignedLogo}
          setPredesignedLogoPrice={setPredesignedLogoPrice}
          setPredesignLogoImage={setPredesignLogoImage}
          selectedPredesignedLogo={selectedPredesignedLogo}
          borderFields={borderFields}
          addBorder={addBorder}
          logoFields={logoFields}
          inputValues={inputValues}
          handleDesignInput={handleDesignInput}
          setSelectedLogo={setSelectedLogo}
          addToCartStatus={addToCartStatus}
          setLogoPrice={setLogoPrice}
          handleFileChange={handleFileChange}
          image={image}
          selectedLogo={selectedLogo}
          design={design}
          insuranceFields={insuranceFields}
          selectedInsurance={selectedInsurance}
          setSelectedInsurance={setSelectedInsurance}
          setInsurancePrice={setInsurancePrice}
          removeBrandingFields={removeBrandingFields}
          setSelectedBranding={setSelectedBranding}
          setBrandingPrice={setBrandingPrice}
          handleAddToCart={handleAddToCart}
        /> */}
        </div>
      </div>
    </section>
  );
};

export default Customization;
