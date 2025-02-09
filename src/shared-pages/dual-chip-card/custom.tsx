"use client";
import Customization from "@/components/customization/customization";
import {
  customizationElementDefaultValues,
  customizationFieldTypes,
  customizationTextFieldTypes,
} from "@/helper/constants";
import { TextFieldInterface } from "@/types/common/types";
import React, { useState } from "react";

const DigitalCardCustomizationPage =  ({product, variations}: {product: any, variations: any}) => {
  const fieldMappings = {
    radio_7513961521: customizationFieldTypes.logo,
    image_5548912519: customizationFieldTypes.chipSize,
    image_0791361001: customizationFieldTypes.border,
    radio_7208132280: customizationFieldTypes.placement,
    radio_6631753061: customizationFieldTypes.namePlacement,
    "radio-group-3268322446": customizationFieldTypes.dualCardNumberPlacement,
    radio_7720060793: customizationFieldTypes.insurance,
    "radio-group-7751746935": customizationFieldTypes.removeBranding,
    text_8095531004: customizationFieldTypes.customizedProductImage,
    radio_9924814356: customizationFieldTypes.workWithOurDesigners,
    "image-group-8229558311": customizationFieldTypes.predesignLogo,
    "text-2435742351": customizationFieldTypes.customLogoImage,
    text_4101150344: customizationFieldTypes.customDesignImage,
  };

  const TextFields: { [key: string]: TextFieldInterface } = {
    name: {
      elementId: "text_967513c3ba4a1b",
      defaultLabel: customizationTextFieldTypes.name.defaultLabel,
      name: customizationTextFieldTypes.name.name,
      type: customizationTextFieldTypes.name.type,
      placeholder: customizationTextFieldTypes.name.placeholder,
      section: customizationTextFieldTypes.name.section,
    },
    cardnumber1: {
      elementId: "number_667513c3ba4a29",
      defaultLabel: customizationTextFieldTypes.cardnumber1.defaultLabel,
      name: customizationTextFieldTypes.cardnumber1.name,
      type: customizationTextFieldTypes.cardnumber1.type,
      placeholder: customizationTextFieldTypes.cardnumber1.placeholder,
      section: customizationTextFieldTypes.cardnumber1.section,
    },
    cardnumber2: {
      elementId: "number-8413563754",
      defaultLabel: customizationTextFieldTypes.cardnumber2.defaultLabel,
      name: customizationTextFieldTypes.cardnumber2.name,
      type: customizationTextFieldTypes.cardnumber2.type,
      placeholder: customizationTextFieldTypes.cardnumber2.placeholder,
      section: customizationTextFieldTypes.cardnumber2.section,
    },
    optional: {
      elementId: "text_767513c3ba4a22",
      defaultLabel: customizationTextFieldTypes.optional.defaultLabel,
      name: customizationTextFieldTypes.optional.name,
      type: customizationTextFieldTypes.optional.type,
      placeholder: customizationTextFieldTypes.optional.placeholder,
      section: customizationTextFieldTypes.optional.section,
    },
    optional2: {
      elementId: "text-0648796286",
      defaultLabel: customizationTextFieldTypes.optional2.defaultLabel,
      name: customizationTextFieldTypes.optional2.name,
      type: customizationTextFieldTypes.optional2.type,
      placeholder: customizationTextFieldTypes.optional2.placeholder,
      section: customizationTextFieldTypes.optional2.section,
    },
    comments: {
      elementId: "textarea_7766629963",
      defaultLabel: customizationTextFieldTypes.comments.defaultLabel,
      name: customizationTextFieldTypes.comments.name,
      type: customizationTextFieldTypes.comments.type,
      placeholder: customizationTextFieldTypes.comments.placeholder,
      section: customizationTextFieldTypes.comments.section,
    },
  };

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
    cardnumber1: {
      left: 240,
      scale: 1,
      top: 190,
      height: 40,
      rotate: 0,
      fontSize: 24,
    },
    cardnumber2: {
      left: 30,
      scale: 1,
      top: 440,
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
        left: isTablet
          ? customizationElementDefaultValues.name.left * 0.54
          : customizationElementDefaultValues.name.left,
        scale: 1,
        top: isTablet
          ? customizationElementDefaultValues.name.top * 0.54
          : customizationElementDefaultValues.name.top,
        height: isTablet ? 40 * 0.54 : 40,
        width: isTablet ? 100 * 0.54 : 100,
        rotate: 0,
        fontSize: isTablet ? 32 * 0.54 : 32,
      },
      optional: {
        left: isTablet
          ? customizationElementDefaultValues.center * 0.54
          : customizationElementDefaultValues.center,
        scale: 1,
        top: isTablet ? 68 * 0.54 : 68,
        height: isTablet ? 40 * 0.54 : 40,
        rotate: 0,
        fontSize: isTablet ? 32 * 0.54 : 32,
      },
      optional2: {
        left: isTablet ? 175 * 0.54 : 175,
        scale: 1,
        top: isTablet ? 430 * 0.54 : 430,
        height: isTablet ? 40 * 0.54 : 40,
        rotate: 0,
        fontSize: isTablet ? 32 * 0.54 : 32,
      },
      cardnumber1: {
        left: isTablet ? 60 * 0.57 : 60,
        scale: 1,
        top: isTablet ? 110 * 0.57 : 110,
        height: isTablet ? 40 * 0.57 : 40,
        rotate: 0,
        fontSize: isTablet ? 30 * 0.54 : 30,
      },
      cardnumber2: {
        left: isTablet ? 450 * 0.57 : 450,
        scale: 1,
        top: isTablet ? 350 * 0.56 : 350,
        height: isTablet ? 40 * 0.57 : 40,
        rotate: 0,
        fontSize: isTablet ? 30 * 0.54 : 30,
      },
      image: {
        left: isDesktop ? 200 : isTablet ? 150 : 100,
        scale: 1,
        top: isDesktop ? 150 : isTablet ? 120 : 80,
        height: isDesktop ? 200 : isTablet ? 180 : 160,
        width: isDesktop ? 200 : isTablet ? 180 : 160,
        rotate: 0,
      },
      predesignedlogoimage: {
        left: isTablet ? 500 * 0.7 : 500,
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
        productId="296"
        product={product}
        allVariations={variations}
        fieldMappings={fieldMappings}
        secValue="sec_167513c3ba4a01"
        elementValues={elementValues}
        setElementValues={setElementValues}
        updateElementValues={updateElementValues}
        TextFields={textFieldArray}
        editable={true}
      />
    </div>
  );
};

export default DigitalCardCustomizationPage;
