export interface CurrencyProps {
  currency_code: string;
  currency_symbol: string;
  currency_symbol_pos: string;
  currency_minor_unit: number | null;
  currency_decimal_separator: string;
  currency_thousand_separator: string;
  currency_prefix: string;
  currency_suffix: string;
}

export interface Address {
  billing_first_name: string;
  billing_last_name: string;
  billing_company: string;
  billing_country: string;
  billing_address_1: string;
  billing_address_2: string;
  billing_city: string;
  billing_state: string;
  billing_postcode: string;
  billing_phone: string;
  billing_email: string;
}

export interface ShippingAddress {
  shipping_first_name: string;
  shipping_last_name: string;
  shipping_company: string;
  shipping_country: string;
  shipping_address_1: string;
  shipping_address_2: string;
  shipping_city: string;
  shipping_state: string;
  shipping_postcode: string;
  shipping_phone: string;
}

export interface Customer {
  billing_address: Address;
  shipping_address: ShippingAddress;
}

export interface Quantity {
  value: number;
  min_purchase: number;
  max_purchase: number;
}

export interface TotalsProps {
  subtotal: string;
  subtotal_tax: string;
  fee_total: string;
  fee_tax: string;
  discount_total: string;
  discount_tax: string;
  shipping_total: string;
  shipping_tax: string;
  total: string;
  total_tax: string;
}

export interface StockStatus {
  status: string;
  stock_quantity: number | null;
  hex_color: string;
}

// export interface Field {
//   value: string;
// }

// export interface Sec0671f4cac4b395 {
//   fields: Field[][];
// }

// export interface WcpaDataProps {
//   sec_0671f4cac4b395?: Sec0671f4cac4b395;
// }

// export interface ItemProps {
//   item_key: string;
//   id: number;
//   name: string;
//   title: string;
//   price: string;
//   quantity: Quantity;
//   totals: TotalsProps;
//   slug: string;
//   meta: Record<string, unknown>;
//   backorders: string;
//   cart_item_data: {
//     wcpa_data?: WcpaDataProps;
//   };
//   featured_image: string;
//   categories: boolean | unknown[];
//   tags: boolean | unknown[];
//   stock_status: StockStatus;
//   gallery: unknown[];
//   permalink: string;
//   is_discounted: boolean;
//   price_regular: string;
//   price_sale: string;
//   price_discounted: string;
// }

export interface ItemProps {
  item_key: string;
  id: number;
  name: string;
  title: string;
  price: string;
  quantity: {
    value: number;
    min_purchase: number;
    max_purchase: number;
  };
  totals: {
    subtotal: string;
    subtotal_tax: number;
    total: number;
    tax: number;
  };
  slug: string;
  meta: {
    product_type: string;
    sku: string;
    dimensions: {
      length: string;
      width: string;
      height: string;
      unit: string;
    };
    weight: string;
    variation: {
      [key: string]: string | number;
    };
    attributes: unknown[];
    virtual: boolean;
    downloadable: boolean;
  };
  backorders: string;
  cart_item_data: {
    wcpa_data: {
      [sectionKey: string]: {
        extra: {
          section_id: string;
          clStatus: string;
          key: string;
          name: string;
          price: number;
          weight: number;
          form_id: number;
          isClone: boolean;
          parentKey: boolean | null;
          form_rules: {
            exclude_from_discount: boolean;
            fee_label: string;
            disp_hide_options_price: boolean;
            disp_show_section_price: boolean;
            disp_show_field_price: boolean;
            layout_option: string;
            pric_use_as_fee: boolean;
            process_fee_as: string;
          };
        };
        fields: {
          [fieldIndex: string]: Array<{
            type: string;
            name: string;
            label: string;
            elementId: string;
            value: string;
            quantity: boolean;
            clStatus: string;
            price: boolean | Record<string, number>;
            weight: boolean | number;
            form_data: {
              name: string;
              label: string;
              value: string;
              enablePrice?: boolean;
              price?: string;
              active: boolean;
              required: boolean;
              elementId: string;
              subtype?: string;
              pricingType?: string;
              priceOptions?: string;
              multiple?: boolean;
              disp_size_img?: {
                width?: string;
                height?: string;
              };
              disp_type?: string;
            };
            map_to_checkout: boolean;
            is_fee?: boolean;
            is_show_price?: boolean;
            priceFormula?: unknown[];
            rawPrice?: Record<string, number> | number[];
          }>;
        };
      };
    };
    wcpa_cart_rules: {
      price_override: string;
      bind_quantity: boolean;
      thumb_image: number;
      combined_products: unknown[];
      checkout_fields: unknown[];
      currency: string;
      quantity: boolean;
      timestamp: boolean;
    };
    wcpa_price: {
      total: number;
      addon: number;
      product: number;
      excludeDiscount: number;
    };
    wcpa_weight: {
      total: number;
      addon: number;
      product: number;
    };
  };
  featured_image: string;
  categories: boolean;
  tags: boolean;
  stock_status: {
    status: string;
    stock_quantity: number | null;
    hex_color: string;
  };
  gallery: unknown[];
  permalink: string;
  is_discounted: boolean;
  price_regular: string;
  price_sale: string;
  price_discounted: string;
}
// export interface ItemProps {
//   item_key: string;
//   id: number;
//   name: string;
//   title: string;
//   price: string;
//   quantity: {
//     value: number;
//     min_purchase: number;
//     max_purchase: number;
//   };
//   totals: {
//     subtotal: string;
//     subtotal_tax: number;
//     total: number;
//     tax: number;
//   };
//   slug: string;
//   meta: {
//     product_type: string;
//     sku: string;
//     dimensions: {
//       length: string;
//       width: string;
//       height: string;
//       unit: string;
//     };
//     weight: string;
//     variation: {
//       [key: string]: string | number;
//     };
//     attributes: unknown[];
//     virtual: boolean;
//     downloadable: boolean;
//   };
//   backorders: string;
//   cart_item_data: {
//     wcpa_data: {
//       [sectionKey: string]: {
//         extra: {
//           section_id: string;
//           clStatus: string;
//           key: string;
//           name: string;
//           price: number;
//           weight: number;
//           form_id: number;
//           isClone: boolean;
//           parentKey: boolean | null;
//           form_rules: {
//             exclude_from_discount: boolean;
//             fee_label: string;
//             disp_hide_options_price: boolean;
//             disp_show_section_price: boolean;
//             disp_show_field_price: boolean;
//             layout_option: string;
//             pric_use_as_fee: boolean;
//             process_fee_as: string;
//           };
//         };
//         fields: Array<{
//           // [fieldIndex: string]: Array<{
//             type: string;
//             name: string;
//             label: string;
//             elementId: string;
//             value: string;
//             quantity: boolean;
//             clStatus: string;
//             price: boolean | Record<string, number>;
//             weight: boolean | number;
//             form_data: {
//               name: string;
//               label: string;
//               value: string;
//               enablePrice?: boolean;
//               price?: string;
//               active: boolean;
//               required: boolean;
//               elementId: string;
//               subtype?: string;
//               pricingType?: string;
//               priceOptions?: string;
//               multiple?: boolean;
//               disp_size_img?: {
//                 width?: string;
//                 height?: string;
//               };
//               disp_type?: string;
//             };
//             map_to_checkout: boolean;
//             is_fee?: boolean;
//             is_show_price?: boolean;
//             priceFormula?: unknown[];
//             rawPrice?: Record<string, number> | number[];
//           }>;
//       };
//     };
//     wcpa_cart_rules: {
//       price_override: string;
//       bind_quantity: boolean;
//       thumb_image: number;
//       combined_products: unknown[];
//       checkout_fields: unknown[];
//       currency: string;
//       quantity: boolean;
//       timestamp: boolean;
//     };
//     wcpa_price: {
//       total: number;
//       addon: number;
//       product: number;
//       excludeDiscount: number;
//     };
//     wcpa_weight: {
//       total: number;
//       addon: number;
//       product: number;
//     };
//   };
//   featured_image: string;
//   categories: boolean;
//   tags: boolean;
//   stock_status: {
//     status: string;
//     stock_quantity: number | null;
//     hex_color: string;
//   };
//   gallery: unknown[];
//   permalink: string;
//   is_discounted: boolean;
//   price_regular: string;
//   price_sale: string;
//   price_discounted: string;
// }

export interface CartTotals {
  subtotal: string;
  subtotal_tax: string;
  fee_total: string;
  fee_tax: string;
  discount_total: string;
  discount_tax: string;
  shipping_total: string;
  shipping_tax: string;
  total: string;
  total_tax: string;
}

export interface CartState {
  cart_hash: string;
  cart_key: string;
  currency: CurrencyProps;
  customer: Customer;
  items: ItemProps[];
  item_count: number;
  items_weight: string;
  coupons: unknown[];
  needs_payment: boolean;
  needs_shipping: boolean;
  shipping: any;
  fees: unknown[];
  taxes: unknown[];
  totals: CartTotals;
  removed_items: unknown[];
  cross_sells: unknown[];
  notices: unknown[];
  // images: any;
  selected_country: string;
  int_shipping_charge: number;
}
