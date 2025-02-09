import { SetStateAction } from "react";

export interface CustomizationSectionProps {
  productId: string;
  product: any;
  allVariations: any;
  fieldMappings: Record<string, string>;
  secValue: string;
  TextFields: {
    elementId: string;
    defaultLabel: string;
    name: string;
    type: string;
    placeholder?: string;
    section?: string;
  }[];
  elementValues: any;
  setElementValues: any;
  updateElementValues: any;
  editable?: boolean;
}

export interface CardPreviewProps {
  handleAddToCart: () => void;
  totalPrice: number;
  productPrice: number;
  product: any;
  cardFront: string;
  cardBack: string;
  setDisplayBorder: (image: string | null) => void;
  setSelectedBorderId: (image: string | null) => void;
  setSelectedPredesignedLogo: any;
  selectedPredesignedLogo: any;
  setSelectedInsurance: any;
  setSelectedWorkWithDesigners: any;
  setSelectedBranding: any;
  setCardPlacement: any;
  setNamePlacement: any;
  setDualCardNumberPlacement: any;
  predesignedlogoimage: any;
  productId: any;
  removeBranding: "yes" | "no";
  setSwiperSize: React.Dispatch<
    SetStateAction<{ height: string; width: string }>
  >;
  swiperSize: { height: string; width: string };
  setChipSize: React.Dispatch<SetStateAction<"small" | "big">>;
  setTotalPrice: React.Dispatch<SetStateAction<number>>;
  setChipSizePrice: any;
  setBorderPrice: any;
  setLogoPrice: any;
  setPredesignedLogoPrice: any;
  setWorkwithdesignersPrice: any;
  setBrandingPrice: any;
  setInsurancePrice: any;
  inputValues: any;
  elementValues: any;
  setElementValues: any;
  chipSize: "small" | "big";
  chipSizeFields: any;
  loading: boolean;
  cardPlacement: "front" | "back";
  image: string;
  design: string;
  addToCartStatus: "submitting" | "success" | "error" | undefined;
  setInputValues: React.Dispatch<SetStateAction<any>>;
  swiperRef: React.RefObject<any>;
  selectedLogo: string;
  setSelectedLogo: React.Dispatch<SetStateAction<any>>;
  displayBorder: string | null;
  updateElementValues: any;
  editable: boolean;
  TextFields: any;
  namePlacement: "front" | "back";
  dualCardNumberPlacement: "front" | "back";
  textColor: string;
  visibility: any,
  setVisibility: any,
  targetRefs: any,
  setPredesignLogoImage: any
  imageLoaded: boolean,
  setIsCapturing: any,
  isCapturing: any,
  setImageLoaded: any,
}