export interface FormLabels {
  elementId: string;
  label: string;
  values?: unknown[];
}

export interface Variation {
  id: string;
  galleryImages: { id: string; url: string; width: number; height: number }[];
}

export interface BorderProps {
  label: string;
  image: string;
  price: number;
  productImage: Array<{ id: string; url: string; width: number; height: number }>;
  value: any;
}

export interface LogoField {
  label: string;
  value: string;
  price: number;
}

export interface LogoFieldProps {
  label?: string;
  value?: string;
  price?: string;
}

export interface CardPlacementFieldsProps {
  label: string;
  value: string;
  price: number;
}
export interface InsuranceFieldsProps {
  label: string;
  value: string;
  price: number;
}

interface ElementValues {
  left: number;
  top: number;
  width: number;
  height: number;
  scale: number;
  rotate: number;
  fontSize: number;
}

interface InputValues {
  name?: string;
  optional?: string;
  optional2?: string;
  number?: string;
  cardnumber1?: string;
  cardnumber2?: string;
  topnumber?: string;
  image?: string;
  design?: string;
  predesignedlogoimage: string;
}

export interface ElementProps {
  image: ElementValues;
  name: ElementValues;
  optional?: ElementValues;
  number?: ElementValues;
  cardnumber1?: ElementValues;
  cardnumber2?: ElementValues;
  chip: ElementValues;
  topnumber?: ElementValues;
  brandingSite: ElementValues;
  brandingDes: ElementValues;
  predesignedlogoimage?: ElementValues;
}

export interface CardSwiperProps {
  cardFront: string;
  cardBack: string;
  displayBorder?: string | null;
  setSwiperSize: React.Dispatch<React.SetStateAction<{ height: string; width: string }>>;
  swiperSize: { height: string; width: string };
  inputValues: any;
  elementValues: any;
  handleTextClick: any;
  cardPlacement: "front" | "back";
  productId: any;
  chipSize: "small" | "big";
  chipSizeFields: any;
  image?: string | null;
  design?: string;
  loading: any;
  selectedLogo?: string;
  predesignedlogoimage: any;
  removeBranding?: "yes" | "no";
  visibility: {
    name?: boolean;
    optional?: boolean;
    optional2?: boolean;
    number?: boolean;
    topnumber?: boolean;
    predesignedlogoimage?: boolean;
    cardnumber1?: boolean;
    cardnumber2?: boolean;
    image?: boolean;
    design?: boolean;
  };
  targetRefs: any;
  handleElementChange: any;
  handleDragStart: any;
  handleDragEnd: any;
  isDragging: any;
  swiperRef: React.RefObject<any>;
  editable: boolean;
  TextFields: any;
  namePlacement: "front" | "back";
  dualCardNumberPlacement: "front" | "back";
  textColor: string;
  isCapturing: any;
  setImageLoaded: any;
}





