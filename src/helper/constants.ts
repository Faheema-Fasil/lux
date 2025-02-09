import { cssColors } from "./colors";

export const customizationTextFieldTypes = {
  name: {
    defaultLabel: "NAME",
    name: "name",
    type: "text",
    placeholder: "YOUR NAME",
    section: "top",
  },
  cardnumber1: {
    defaultLabel: "Card Number 1",
    name: "cardnumber1",
    type: "text",
    placeholder: "1111 2222 3333 4444",
    section: "top",
  },
  cardnumber2: {
    defaultLabel: "Card Number 2",
    name: "cardnumber2",
    type: "text",
    placeholder: "1111 2222 3333 4444",
    section: "top",
  },
  optional: {
    defaultLabel: "TEXT ON TOP OF CARD",
    name: "optional",
    type: "text",
    placeholder: "TEXT ON TOP OF CARD",
    section: "top",
  },
  optional2: {
    defaultLabel: "OPTIONAL TEXT",
    name: "optional2",
    type: "text",
    placeholder: "OPTIONAL TEXT",
    section: "top",
  },
  comments: {
    defaultLabel: "Add Additional Requests",
    name: "comments",
    type: "text-area",
    placeholder: "Add Additional Requests",
    section: "bottomlast",
  },
  cardnumber: {
    defaultLabel: "CARD NUMBER (OPTIONAL)",
    name: "number",
    type: "text",
    placeholder: "1111 2222 3333 4444",
    section: "top",
  },
  digitallinks: {
    defaultLabel: "DIGITAL LINKS",
    name: "links",
    type: "text-area",
    placeholder: "Digital Links",
    section: "bottombusiness",
  },
  // adddetails: {
  //   defaultLabel: "Add Your Details",
  //   name: "details",
  //   type: "text",
  //   placeholder: "Add Your Details",
  //   section: "bottom",
  // },
  companyname: {
    defaultLabel: "Company Name",
    name: "companyname",
    type: "text",
    placeholder: "Company Name",
    section: "bottomifrequired",
  },
  designation: {
    defaultLabel: "Designation",
    name: "designation",
    type: "text",
    placeholder: "Designation",
    section: "bottomifrequired",
  },
  email: {
    defaultLabel: "Email",
    name: "email",
    type: "text",
    placeholder: "Email",
    section: "bottomifrequired",
  },
  bio: {
    defaultLabel: "Bio",
    name: "bio",
    type: "textarea",
    placeholder: "Bio",
    section: "bottomifrequired",
  },
  phonenumber: {
    defaultLabel: "Phone Number",
    name: "phonenumber",
    type: "number",
    placeholder: "Phone Number",
    section: "bottomifrequired",
  },
  facebook: {
    defaultLabel: "Facebook",
    name: "facebook",
    type: "text",
    placeholder: "Facebook",
    section: "sociallinks",
  },
  twitter: {
    defaultLabel: "X",
    name: "x",
    type: "text",
    placeholder: "X",
    section: "sociallinks",
  },
  instagram: {
    defaultLabel: "Instagram",
    name: "instagram",
    type: "text",
    placeholder: "Instagram",
    section: "sociallinks",
  },
  linkedin: {
    defaultLabel: "LinkedIn",
    name: "linkedin",
    type: "text",
    placeholder: "LinkedIn",
    section: "sociallinks",
  },
  youtube: {
    defaultLabel: "YouTube",
    name: "youtube",
    type: "text",
    placeholder: "YouTube",
    section: "sociallinks",
  },
  // socialmedia: {
  //   defaultLabel: "Social Media",
  //   name: "socialmedia",
  //   type: "text",
  //   placeholder: "Social Media",
  //   section: "bottomifrequired",
  // },
};

// export const customizationTextAreaTypes = {

// }

export const customizationElementDefaultValues = {
  center: 405,
  optionaltext: {
    top: 430,
    left: 173,
  },
  name: {
    left: 150,
    top: 390
  },
  cardnumber:{
    left: 210,
    top: 330,
  }
}

export const customizationFieldTypes = {
  logo: "logoFieldElementId",
  chipSize: "chipSizeFieldElementId",
  border: "borderFieldElementId",
  placement: "placementFieldElementId",
  namePlacement: "namePlacementFieldElementId",
  dualCardNumberPlacement: "dualCardNumberPlacementFieldElementId",
  insurance: "insuranceFieldElementId",
  removeBranding: "removeBrandingFieldElementId",
  customizedProductImage: "customizedProductImageFieldElementId",
  workWithOurDesigners: "workWithOurDesignersFieldElementId",
  workWithOurDesignersLabelField: "workWithOurDesignersLabelFieldElementId",
  predesignLogo: "predesignLogoFieldElementId",
  customLogoImage: "customLogoImageFieldElementId",
  customDesignImage: "customDesignImageFieldElementId",
  digitalProfile: "digitalProfileImageFieldElementId",
};

export const customizationFieldTitleTexts = {
  
}

export const deliveryMethodTypes = {
  uae: [
    {
      id: "free_shipping:1",
      label: "Concierge Card Service",
      description:
        "Secure Card Courier Service across UAE (Instructions will be emailed)",
    },
    {
      id: "free_shipping:3",
      label: "Drop Off and Pickup",
      description: "Drop off & pickup at Luxmetallic office",
    },
  ],
  international: [
    {
      id: "flat_rate:2",
      label: " - International Shipping",
      description: "Delivery across the globe",
    },
  ],
} as const;

export const checkoutValidationMessages = {
  nameRequired: "Please fill out name.",
  emailRequired: "Please fill out email address.",
  countryCodeRequired: "Please select a phone country code.",
  invalidPhoneNumber: "Invalid mobile number.",
  countryRequired: "Please select a shipping country.",
  cityRequired: "Please fill out shipping city.",
  addressRequired: "Please fill out shipping address.",
  deliveryMethodRequired: "Please select a delivery method.",
} as const;

export const currencyTexts = {
  aed: "AED",
  usd: "$",
}

export const checkoutLabels = {
  shippingName: "Name*",
  email: "Email*",
  phoneNumber: "Phone Number*",
  shippingAddress: "Shipping Address*",
  country: "Country*",
  city: "City*",
  zipCode: "ZIP Code",
  addShippingAddress: "Add your shipping address",
  completeOrder: "Complete your order by providing your shipping details.",
  deliveryMethods: "Delivery Methods",
  loggedInAs: "Logged in as",
  notLoggedIn: "Not logged in",
  guest: "Guest",
} as const;

export const checkoutPlaceholderTexts = {
  name: "Your name",
  email: "example@gmail.com",
  phoneNumber: "Phone Number",
  streetAddress: "Street Address",
  zipCode: "ZIP",
  selectCountry: "Select Country",
  selectCity: "Select City",
} as const;

export const telrOrderResponseStatus = {
  success: 9, // Authorised
  on_hold: 5, // On-Hold
  cancelled: 1, // Cancelled
  declined: 2, // Declined or Error
};

export const updateOrderStatusType = {
  pending: "Pending",
  hold: "Authorised",
  success: "Paid",
  cancelled: "Cancelled",
  paymentrequested: "Payment Requested",
  expired: "Expired",
  declined: "Declined",
  replaced: "Replaced",
}

export const buttonTexts = {
  messageusonwhatsapp: "Message us on WhatsApp",
  messageus: "Message us"
}

export const footerTexts = {
  luxmetalliclink: "https://www.tomsher.com/",
  copyright: "Copyright",
  luxmetallic: "Luxmetallic",
  developedby: "Developed by",
  // designedby: "Designed by",
  tomsher: "Tomsher",
  call: "Call",
  email: "Email",
  pobox: "PO Box",
  ponumber: "77475"
}

export const cartTexts = {
  mycart: "My cart",
  viewcart: "View cart",
  variation: "Variation",
  remove: "Remove",
  carttotal: "Cart Total",
  proceedtocheckout: "Proceed to checkout",
  emptycart: "Your cart is empty",
  updatecart: "Update Cart",
  addtocart: "Add to Cart",
  additemstocart: "Add items to Cart",
  youritems: "Your Items",
  items: "items",
  totalprice: "Total Price",
  yourcartisempty: "Your cart is empty",
  noitemsincart: "Looks like you haven&apos;t added any items to your cart yet.",
  cartsummary: "Cart Summary",
  apply: "Apply",
}

export const customFieldExclusionTexts = {
  customisedproduct: "customized product",
  uploadownlogo: "upload own logo",
  uploadowndesign: "upload own design",
  digitalprofileimage: "digital profile image",
  chipsize: "chip size"
}
