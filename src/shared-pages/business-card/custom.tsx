"use client";
import Customization from "@/components/customization/customization";
import { customizationElementDefaultValues, customizationFieldTypes, customizationTextFieldTypes } from "@/helper/constants";
import { TextFieldInterface } from "@/types/common/types";
import React, { useState } from "react";

const CustomCardCustomizationPage = ({product, variations}: {product: any, variations: any})=> {
  const fieldMappings = {
    "radio-group_8675d7b355745b": customizationFieldTypes.logo,
    image_5530598622: customizationFieldTypes.chipSize,
    "image-group-6954791909": customizationFieldTypes.border,
    "radio-group-6070185268":  customizationFieldTypes.placement,
    radio_8698322379:  customizationFieldTypes.namePlacement,
    "radio-group_4675d7b3557465":  customizationFieldTypes.insurance,
    "radio-group_1675d7b355746b": customizationFieldTypes.removeBranding,
    "radio_8702907311": customizationFieldTypes.workWithOurDesignersLabelField,
    image_9503362062: customizationFieldTypes.predesignLogo,
    radio_0673363571: customizationFieldTypes.workWithOurDesigners,
    text_4090637011: customizationFieldTypes.customLogoImage,
    "text-1941682219": customizationFieldTypes.customizedProductImage,
    "text-4350752013": customizationFieldTypes.customDesignImage,
    "text-3002808418": customizationFieldTypes.digitalProfile,
  };

  const TextFields: { [key: string]: TextFieldInterface } = {
    name: {
      elementId: "text_9675d7b355743a",
      defaultLabel: customizationTextFieldTypes.name.defaultLabel,
      name: customizationTextFieldTypes.name.name,
      type: customizationTextFieldTypes.name.type,
      placeholder: customizationTextFieldTypes.name.placeholder,
      section: customizationTextFieldTypes.name.section,
    },
    cardnumber: {
      elementId: "number_8675d7b3557445",
      defaultLabel: customizationTextFieldTypes.cardnumber.defaultLabel,
      name: customizationTextFieldTypes.cardnumber.name,
      type: customizationTextFieldTypes.cardnumber.type,
      placeholder: customizationTextFieldTypes.cardnumber.placeholder,
      section: customizationTextFieldTypes.cardnumber.section,
    },
    optional: {
      elementId: "text-2858716210",
      defaultLabel: customizationTextFieldTypes.optional.defaultLabel,
      name: customizationTextFieldTypes.optional.name,
      type: customizationTextFieldTypes.optional.type,
      placeholder: customizationTextFieldTypes.optional.placeholder,
      section: customizationTextFieldTypes.optional.section,
    },
    optional2: {
      elementId: "text-6509385377",
      defaultLabel: customizationTextFieldTypes.optional2.defaultLabel,
      name: customizationTextFieldTypes.optional2.name,
      type: customizationTextFieldTypes.optional2.type,
      placeholder: customizationTextFieldTypes.optional2.placeholder,
      section: customizationTextFieldTypes.optional2.section,
    },
    digitallinks: {
      elementId: "text-5144901288",
      defaultLabel: customizationTextFieldTypes.digitallinks.defaultLabel,
      name: customizationTextFieldTypes.digitallinks.name,
      type: customizationTextFieldTypes.digitallinks.type,
      placeholder: customizationTextFieldTypes.digitallinks.placeholder,
      section: customizationTextFieldTypes.digitallinks.section,
    },
    companyname: {
      elementId: "textarea-7022411615",
      defaultLabel: customizationTextFieldTypes.companyname.defaultLabel,
      name: customizationTextFieldTypes.companyname.name,
      type: customizationTextFieldTypes.companyname.type,
      placeholder: customizationTextFieldTypes.companyname.placeholder,
      section: customizationTextFieldTypes.companyname.section,
    },
    designation: {
      elementId: "text-9763999582",
      defaultLabel: customizationTextFieldTypes.designation.defaultLabel,
      name: customizationTextFieldTypes.designation.name,
      type: customizationTextFieldTypes.designation.type,
      placeholder: customizationTextFieldTypes.designation.placeholder,
      section: customizationTextFieldTypes.designation.section,
    },
    email: {
      elementId: "number_1044d996642",
      defaultLabel: customizationTextFieldTypes.email.defaultLabel,
      name: customizationTextFieldTypes.email.name,
      type: customizationTextFieldTypes.email.type,
      placeholder: customizationTextFieldTypes.email.placeholder,
      section: customizationTextFieldTypes.email.section,
    },
    phonenumber: {
      elementId: "number_104d4996642",
      defaultLabel: customizationTextFieldTypes.phonenumber.defaultLabel,
      name: customizationTextFieldTypes.phonenumber.name,
      type: customizationTextFieldTypes.phonenumber.type,
      placeholder: customizationTextFieldTypes.phonenumber.placeholder,
      section: customizationTextFieldTypes.phonenumber.section,
    },
    bio: {
      elementId: "text-9760303573",
      defaultLabel: customizationTextFieldTypes.bio.defaultLabel,
      name: customizationTextFieldTypes.bio.name,
      type: customizationTextFieldTypes.bio.type,
      placeholder: customizationTextFieldTypes.bio.placeholder,
      section: customizationTextFieldTypes.bio.section,
    },
    facebook: {
      elementId: "text-1100204570",
      defaultLabel: customizationTextFieldTypes.facebook.defaultLabel,
      name: customizationTextFieldTypes.facebook.name,
      type: customizationTextFieldTypes.facebook.type,
      placeholder: customizationTextFieldTypes.facebook.placeholder,
      section: customizationTextFieldTypes.facebook.section,
    },
    twitter: {
      elementId: "text-1100346172",
      defaultLabel: customizationTextFieldTypes.twitter.defaultLabel,
      name: customizationTextFieldTypes.twitter.name,
      type: customizationTextFieldTypes.twitter.type,
      placeholder: customizationTextFieldTypes.twitter.placeholder,
      section: customizationTextFieldTypes.twitter.section,
    },
    instagram: {
      elementId: "text-1100522976",
      defaultLabel: customizationTextFieldTypes.instagram.defaultLabel,
      name: customizationTextFieldTypes.instagram.name,
      type: customizationTextFieldTypes.instagram.type,
      placeholder: customizationTextFieldTypes.instagram.placeholder,
      section: customizationTextFieldTypes.instagram.section,
    },
    linkedin: {
      elementId: "text-1100461374",
      defaultLabel: customizationTextFieldTypes.linkedin.defaultLabel,
      name: customizationTextFieldTypes.linkedin.name,
      type: customizationTextFieldTypes.linkedin.type,
      placeholder: customizationTextFieldTypes.linkedin.placeholder,
      section: customizationTextFieldTypes.linkedin.section,
    },
    youtube: {
      elementId: "text-1059781159",
      defaultLabel: customizationTextFieldTypes.youtube.defaultLabel,
      name: customizationTextFieldTypes.youtube.name,
      type: customizationTextFieldTypes.youtube.type,
      placeholder: customizationTextFieldTypes.youtube.placeholder,
      section: customizationTextFieldTypes.youtube.section,
    },
    comments: {
      elementId: "textarea_3835487719",
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
      fontSize: 32,
    },
    optional: {
      left: 30,
      scale: 1,
      top: 440,
      height: 40,
      rotate: 0,
      fontSize: 32,
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
      fontSize: 32,
    },
    topnumber: {
      left: 180,
      scale: 1,
      top: 120,
      height: 40,
      rotate: 0,
      fontSize: 32,
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
        left: isTablet ? 150 * 0.54 : 180,
        scale: 1,
        top: isTablet ? customizationElementDefaultValues.optionaltext.top * 0.54 : 120,
        height: isTablet ? 35 * 0.54 : 40,
        rotate: 0,
        fontSize: isTablet ? 32 * 0.54 : 32,
      },
      image: {
        left: isTablet ? 150 * 0.54 : 200,
        scale: 1,
        top: isTablet ? 120 * 0.54 : 150,
        height: isTablet ? 180 * 0.54 : 200,
        width: isTablet ? 180 * 0.54 : 200,
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
        left: isTablet ? 150 * 0.54 : 200,
        scale: 1,
        top: isTablet ? 120 * 0.54 : 150,
        height: isTablet ? 180 * 0.54 : 200,
        width: isTablet ? 180 * 0.54 : 200,
        rotate: 0,
      },
    });
  };

  return (
    <div>
      <Customization
        productId="657"
        product={product}
        allVariations={variations}
        fieldMappings={fieldMappings}
        secValue="sec_8675d7b3557408"
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
