"use client";
import Customization from "@/components/customization/customization";
import { customizationElementDefaultValues, customizationTextFieldTypes } from "@/helper/constants";
import { TextFieldInterface } from "@/types/common/types";
import React, { useState } from "react";

const CustomCardCustomizationPage = ({product, variations}: {product: any, variations: any}) => {
  const fieldMappings = {
    radio_2580742084: "logoFieldElementId",
    image_5483768010: "chipSizeFieldElementId",
    radio_3441639494: "addBorderFieldElementId",
    image_2833661161: "borderFieldElementId",
    'radio-group-6061185631': "placementFieldElementId",
    radio_7404211418: "insuranceFieldElementId",
    radio_7308877337: "removeBrandingFieldElementId",
    text_7879583751: "customizedProductImageFieldElementId",
    file_4042352469: "logoUploadFieldElementId",
    image_1969955552: "predesignLogoFieldElementId",
    radio_0674257721: "workWithOurDesignersFieldElementId",
    text_7937503710: "customLogoImageFieldElementId",
    "text-4108534821": "customDesignImageFieldElementId",
    "radio_7208132280": "namePlacementFieldElementId",
    // file_4042352469: "designUploadFieldElementId",
  };

  const TextFields: { [key: string]: TextFieldInterface } = {
    name: {
      elementId: "text_1044961101",
      defaultLabel: customizationTextFieldTypes.name.defaultLabel,
      name: customizationTextFieldTypes.name.name,
      type: customizationTextFieldTypes.name.type,
      placeholder: customizationTextFieldTypes.name.placeholder,
      section: customizationTextFieldTypes.name.section,
    },
    cardnumber: {
      elementId: "number_1044996642",
      defaultLabel: customizationTextFieldTypes.cardnumber.defaultLabel,
      name: customizationTextFieldTypes.cardnumber.name,
      type: customizationTextFieldTypes.cardnumber.type,
      placeholder: customizationTextFieldTypes.cardnumber.placeholder,
      section: customizationTextFieldTypes.cardnumber.section,
    },
    optional: {
      elementId: "text-6509385377",
      defaultLabel: customizationTextFieldTypes.optional.defaultLabel,
      name: customizationTextFieldTypes.optional.name,
      type: customizationTextFieldTypes.optional.type,
      placeholder: customizationTextFieldTypes.optional.placeholder,
      section: customizationTextFieldTypes.optional.section,
    },
    optional2: {
      elementId: "text-0631988292",
      defaultLabel: customizationTextFieldTypes.optional2.defaultLabel,
      name: customizationTextFieldTypes.optional2.name,
      type: customizationTextFieldTypes.optional2.type,
      placeholder: customizationTextFieldTypes.optional2.placeholder,
      section: customizationTextFieldTypes.optional2.section,
    },
    comments: {
      elementId: "textarea_3835487719",
      defaultLabel: customizationTextFieldTypes.comments.defaultLabel,
      name: customizationTextFieldTypes.comments.name,
      type: customizationTextFieldTypes.comments.type,
      placeholder: customizationTextFieldTypes.comments.placeholder,
      section: customizationTextFieldTypes.comments.section,
    },
  }
  
  const textFieldArray = Object.values(TextFields);

  const [elementValues, setElementValues] = useState({
    name: {
      left: 30,
      scale: 1,
      top: 400,
      height: 40,
      width: 100,
      rotate: 0,
      fontSize: 24,
    },
    optional: {
      left: 30,
      scale: 1,
      top: 440,
      height: 40,
      rotate: 0,
      fontSize: 24,
    },
    optional2: {
      left: 30,
      scale: 1,
      top: 440,
      height: 40,
      rotate: 0,
      fontSize: 24,
    },
    number: {
      left: 240,
      scale: 1,
      top: 190,
      height: 40,
      rotate: 0,
      fontSize: 24,
    },
    topnumber: {
      left: 180,
      scale: 1,
      top: 120,
      height: 40,
      rotate: 0,
      fontSize: 24,
    },
    image: {
      left: 200,
      scale: 1,
      top: 150,
      height: 200,
      width: 200,
      rotate: 0,
    },
    design: {
      left: 200,
      scale: 1,
      top: 150,
      height: 200,
      width: 200,
      rotate: 0,
    },
    predesignedlogoimage: {
      left: 200,
      scale: 1,
      top: 150,
      height: 200,
      width: 200,
      rotate: 0,
    },
  });

  const updateElementValues = () => {
    const isDesktop = window.innerWidth >= 900;
    const isTablet = window.innerWidth <= 900;
    // const isMobile = window.innerWidth < 768;

    setElementValues({
      name: {
        left: isTablet ? customizationElementDefaultValues.name.left * 0.54 : customizationElementDefaultValues.name.left,
        scale: 1,
        top: isTablet ? customizationElementDefaultValues.name.top * 0.54 : customizationElementDefaultValues.name.top,
        height: isTablet ? 40 * 0.54 : 40,
        width: isTablet ? 100 * 0.54 : 100,
        rotate: 0,
        fontSize: isTablet ? 32 * 0.54 : 32,
      },
      number: {
        left: isTablet ? customizationElementDefaultValues.center * 0.54 : customizationElementDefaultValues.center,
        scale: 1,
        top: isTablet ? customizationElementDefaultValues.cardnumber.top * 0.54 : customizationElementDefaultValues.cardnumber.top,
        height: isTablet ? 40 * 0.54 : 40,
        rotate: 0,
        fontSize: isTablet ? 32 * 0.54 : 32,
      },
      optional: {
        left: isTablet ? customizationElementDefaultValues.center * 0.54 : customizationElementDefaultValues.center,
        scale: 1,
        top: isTablet ? 60 * 0.54 : 60,
        height: isTablet ? 40 * 0.54 : 40,
        rotate: 0,
        fontSize: isTablet ? 32 * 0.54 : 32,
      },
      optional2: {
        left: isTablet ? customizationElementDefaultValues.optionaltext.left * 0.54 : customizationElementDefaultValues.optionaltext.left,
        scale: 1,
        top: isTablet ? customizationElementDefaultValues.optionaltext.top * 0.54 : customizationElementDefaultValues.optionaltext.top,
        height: isTablet ? 40 * 0.54 : 40,
        rotate: 0,
        fontSize: isTablet ? 32 * 0.54 : 32,
      },
      topnumber: {
        left: isDesktop ? 180 : isTablet ? 150 : 120,
        scale: 1,
        top: isDesktop ? 120 : isTablet ? 100 : 60,
        height: isDesktop ? 40 : isTablet ? 35 : 30,
        rotate: 0,
        fontSize: isDesktop ? 24 : isTablet ? 20 : 18,
      },
      image: {
        left: isDesktop ? 250 : isTablet ? 150 : 100,
        scale: 1,
        top: isDesktop ? 150 : isTablet ? 120 : 80,
        height: isDesktop ? 200 : isTablet ? 180 : 160,
        width: isDesktop ? 200 : isTablet ? 180 : 160,
        rotate: 0,
      },
      predesignedlogoimage: {
        left: isTablet ? 500 * 0.55 : 500,
        top: isTablet ? 340 * 0.5 : 340,
        scale: 1,
        width: isTablet ? 150 * 0.65 : 150,
        height: isTablet ? 100 * 0.65 : 100,
        rotate: 0,
      },
      design: {
        left: isDesktop ? 200 : isTablet ? 150 : 100,
        scale: 1,
        top: isDesktop ? 150 : isTablet ? 120 : 80,
        height: isDesktop ? 200 : isTablet ? 180 : 160,
        width: isDesktop ? 200 : isTablet ? 180 : 160,
        rotate: 0,
      },
    });
  };

  return (
    <div>
      <Customization
        productId="71"
        product={product}
        allVariations={variations}
        fieldMappings={fieldMappings}
        secValue="sec_0671f4cac4b395"
        elementValues={elementValues}
        setElementValues={setElementValues}
        updateElementValues={updateElementValues}
        TextFields={textFieldArray}
        editable={true}
      />
    </div>
  );
};

export default CustomCardCustomizationPage;
