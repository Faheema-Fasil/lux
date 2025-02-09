import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartState } from "./cartTypes";
import { clearCart, deleteCartItem, fetchCartData, postCartData } from "./cartApi";
import { sliceNames } from "@/constants/redux";
import { setCartHash, setCartKey } from "@/storage";

const initialState: CartState = {
  cart_hash: "",
  cart_key: "",
  currency: {
    currency_code: "",
    currency_symbol: "",
    currency_symbol_pos: "",
    currency_minor_unit: null,
    currency_decimal_separator: "",
    currency_thousand_separator: "",
    currency_prefix: "",
    currency_suffix: "",
  },
  customer: {
    billing_address: {
      billing_first_name: "",
      billing_last_name: "",
      billing_company: "",
      billing_country: "",
      billing_address_1: "",
      billing_address_2: "",
      billing_city: "",
      billing_state: "",
      billing_postcode: "",
      billing_phone: "",
      billing_email: "",
    },
    shipping_address: {
      shipping_first_name: "",
      shipping_last_name: "",
      shipping_company: "",
      shipping_country: "",
      shipping_address_1: "",
      shipping_address_2: "",
      shipping_city: "",
      shipping_state: "",
      shipping_postcode: "",
      shipping_phone: "",
    },
  },
  items: [],
  item_count: 0,
  items_weight: "",
  coupons: [],
  needs_payment: false,
  needs_shipping: false,
  shipping: [],
  fees: [],
  taxes: [],
  totals: {
    subtotal: "",
    subtotal_tax: "",
    fee_total: "",
    fee_tax: "",
    discount_total: "",
    discount_tax: "",
    shipping_total: "",
    shipping_tax: "",
    total: "",
    total_tax: "",
  },
  removed_items: [],
  cross_sells: [],
  notices: [],
  // images: {},
  selected_country: "",
  int_shipping_charge: 0, // Additional shipping charge for international shipping
};

const cartSlice = createSlice({
  name: sliceNames.cart,
  initialState,
  reducers: {
    setShippingCountry: (state, action: PayloadAction<string>) => {
      state.selected_country = action.payload;
    },
    setShippingCharge: (state, action: PayloadAction<number>) => {
      state.int_shipping_charge = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartData.pending, (state) => {
        state.notices = [];
      })
      .addCase(fetchCartData.fulfilled, (state, action) => {
        const payload = action.payload || {};
        setCartKey(payload.cart_key);

        state.cart_hash = payload.cart_hash || initialState.cart_hash;
        state.cart_key = payload.cart_key || initialState.cart_key;
        state.currency = payload.currency || initialState.currency;
        state.customer = payload.customer || initialState.customer;
        state.items = payload.items || [];
        state.item_count = payload.item_count || initialState.item_count;
        state.items_weight = payload.items_weight || initialState.items_weight;
        state.totals = payload.totals || initialState.totals;
        state.needs_payment = payload.needs_payment ?? initialState.needs_payment;
        state.needs_shipping = payload.needs_shipping ?? initialState.needs_shipping;
        state.coupons = payload.coupons || [];
        state.shipping = payload.shipping || [];
        state.fees = payload.fees || [];
        state.taxes = payload.taxes || [];
        state.notices = []; // Clear notices on success
        // state.images = {};
      })
      .addCase(fetchCartData.rejected, (state, action: PayloadAction<any>) => {
        state.notices = [action.payload || "Failed to load cart data."];
      });

    builder
      .addCase(postCartData.pending, (state) => {
        state.notices = [];
      })
      .addCase(postCartData.fulfilled, (state, action) => {
        const payload = action.payload || {};
        setCartKey(payload.cart_key);
        setCartHash(payload.cart_hash);

        state.cart_hash = payload.cart_hash || initialState.cart_hash;
        state.cart_key = payload.cart_key || initialState.cart_key;
        state.currency = payload.currency || initialState.currency;
        state.customer = payload.customer || initialState.customer;
        state.items = payload.items || [];
        state.item_count = payload.item_count || initialState.item_count;
        state.items_weight = payload.items_weight || initialState.items_weight;
        state.totals = payload.totals || initialState.totals;
        state.needs_payment = payload.needs_payment ?? initialState.needs_payment;
        state.needs_shipping = payload.needs_shipping ?? initialState.needs_shipping;
        state.coupons = payload.coupons || [];
        state.shipping = payload.shipping || [];
        state.fees = payload.fees || [];
        state.taxes = payload.taxes || [];
        state.notices = [];
      })
      .addCase(postCartData.rejected, (state, action: PayloadAction<any>) => {
        state.notices = [action.payload || "Failed to load cart data."];
      });

    builder
      .addCase(deleteCartItem.pending, (state) => {
        state.notices = [];
      })
      .addCase(deleteCartItem.fulfilled, (state, action) => {
        state.items = action.payload.items || [];
        state.totals = action.payload.totals || state.totals;
      })
      .addCase(deleteCartItem.rejected, (state, action) => {
        state.notices = [action.payload || "Failed to delete cart item."];
      });

    builder
      .addCase(clearCart.pending, (state) => {
        state.notices = [];
      })
      .addCase(clearCart.fulfilled, (state, action) => {
        const payload: any = action.payload || {};

        state.cart_hash = payload.cart_hash || initialState.cart_hash;
        state.cart_key = payload.cart_key || initialState.cart_key;
        state.currency = payload.currency || initialState.currency;
        state.customer = payload.customer || initialState.customer;
        state.items = payload.items || [];
        state.item_count = payload.item_count || initialState.item_count;
        state.items_weight = payload.items_weight || initialState.items_weight;
        state.totals = payload.totals || initialState.totals;
        state.needs_payment = payload.needs_payment ?? initialState.needs_payment;
        state.needs_shipping = payload.needs_shipping ?? initialState.needs_shipping;
        state.coupons = payload.coupons || [];
        state.shipping = payload.shipping || [];
        state.fees = payload.fees || [];
        state.taxes = payload.taxes || [];
        state.notices = []; // Clear notices on success
      })
      .addCase(clearCart.rejected, (state, action) => {
        state.notices = [action.payload || "Failed to clear cart."];
      });

    // builder
    //   .addCase(fetchProductImages.fulfilled, (state, action) => {
    //     state.images = {
    //       ...state.images,
    //       ...action.payload,
    //     };
    //   })
    //   .addCase(fetchProductImages.rejected, (state, action) => {
    //     state.notices = [action.payload || "Failed to fetch product images."];
    //   });
  },
});

// Export the reducer to be used in store
export const { setShippingCountry, setShippingCharge } = cartSlice.actions;

export default cartSlice.reducer;
