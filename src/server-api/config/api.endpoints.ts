import { getCartKey, getToken } from "@/storage";
import { consumer_key, consumer_secret } from "./server-connect-api";

const isBrowser = typeof window !== "undefined";
const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

const countryStateApi = "https://restcountries.com/v3.1";

export const apiEndpoints = {
  auth: {
    login: "/wp-json/jwt-auth/v1/token",
    // register: '/wp-json/wp/v2/users',
    register: "/wp-json/wc/v3/customers",
    forgotpassword: "/wp-json/custom/v1/forgot-password/",
    resetpassword: "/wp-json/custom/v1/reset-password/",
    // forgotpassword: '/wp-json/bdpwr/v1/reset-password',
    // setpassword: '/wp-json/bdpwr/v1/set-password',
    // validatecode: '/wp-json/bdpwr/v1/validate-code',
    changepassword: `/wp-json/wp/v2/users`,
  },
  menu: {
    navbar: `${baseURL}/wp-json/menus/v1/menus/primary-menu`,
    contactus: `${baseURL}/wp-json/wp/v2/pages/621`,
    // footer: `${baseURL}/wp-json/menus/v1/menus/footer-menu`,
    footerquicklinks: `${baseURL}/wp-json/menus/v1/menus/57`,
    footercustomersupport: `${baseURL}/wp-json/menus/v1/menus/58`,
    footercustomization: `${baseURL}/wp-json/menus/v1/menus/59`,
    about: `${baseURL}/wp-json/acf/v3/pages/678`,
  },
  homepage: {
    titles: `${baseURL}/wp-json/acf/v3/pages/124`,
    cardcategories: `${baseURL}/wp-json/wc/v3/products/categories?consumer_key=${consumer_key}&consumer_secret=${consumer_secret}&per_page=100&per_page=100`,
    cardcollection: (id: number) => `${baseURL}/wp-json/wc/v3/products/?category=${id}`,
    // cardcollection: (id: number) => `${baseURL}/wp-json/wp/v2/product?product_cat=${id}`,
    howitworks: `${baseURL}/wp-json/wp/v2/how-it-work`,
    features: `${baseURL}/wp-json/wp/v2/luxmetallic-promise`,
    testimonials: `${baseURL}/wp-json/wp/v2/our-customer-voice`,
  },
  contactus: {
    content: `${baseURL}/wp-json/wp/v2/pages/621`,
    // form: `${baseURL}/wp-json/contact-form-7/v1/contact-forms/ba4a333/feedback`,
    form: `${baseURL}/wp-json/my-api/v1/submit-form`,
  },
  aboutus: {
    content: `${baseURL}/wp-json/wp/v2/pages/598`,
  },
  custom: {
    home: `${baseURL}/wp-json/wp/v2/pages/483`,
    features: `${baseURL}/wp-json/wp/v2/feature-custom-metal`,
  },
  metalnfccard: {
    metalnfccard: `${baseURL}/wp-json/wp/v2/pages/510`,
    metalnfcfeaturesgrid: `${baseURL}/wp-json/wp/v2/metal-nfc-feature?tags=51`,
    metalnfcfeaturescolumn: `${baseURL}/wp-json/wp/v2/metal-nfc-feature?tags=52`,
  },
  whitelabelling: {
    whitelabelling: `${baseURL}/wp-json/wp/v2/pages/1308`,
    whitelabellingfeatues: `${baseURL}/wp-json/wp/v2/white-labelling-feat`,
    whitelabellingcards: `${baseURL}/wp-json/wp/v2/our-corporate-metal`,
  },
  businesscard: {
    content: `${baseURL}/wp-json/wp/v2/pages/606`,
    features: `${baseURL}/wp-json/wp/v2/metal-nfc-feature?tags=52`,
  },
  jewellerycard: {
    content: `${baseURL}/wp-json/wp/v2/pages/616`,
  },
  dualchip: {
    content: `${baseURL}/wp-json/wp/v2/pages/615`,
    features: `${baseURL}/wp-json/wp/v2/dual-chip-card`,
  },
  products: {
    productLists: (per_page: number, page: number, category?: string) => `${baseURL}/wp-json/wc/v3/products?orderby=menu_order&order=asc&per_page=${per_page}&page=${page}${category && category !== undefined ? `&category=${category}` : ""}`,
    // productLists: `${baseURL}/wp-json/wc/v3/products?consumer_key=${consumer_key}&consumer_secret=${consumer_secret}&per_page=100&per_page=100`,
    productDetails: (slug: number, sku?: string) => `${baseURL}/wp-json/wc/v3/products/${slug}${sku ? `/${sku}` : ``}`,
    search: (slug: number | string) => `${baseURL}/wp-json/custom-api/v1/products?slug=${slug}`,
    productImage: (imageId: string | number) => `${baseURL}/wp-json/wp/v2/media/${imageId}`,
    addImage: `${baseURL}/wp-json/wc/v2/media`,
  },
  cart: {
    getcart: `/wp-json/cocart/v2/cart`,
    addtocart: "/wp-json/cocart/v2/cart/add-item",
    updateCartItem: `/wp-json/cocart/v2/cart/item?cart_key=`,
    updateCart: "/wp-json/cocart/v2/cart/update",
    deleteCartItem: (item_key: string) => {
      return `/wp-json/cocart/v2/cart/item/${item_key}`;
    },
    clearcart: `/wp-json/cocart/v2/cart/clear`,
  },
  order: {
    orderdetails: (oid?: number | string) => `${baseURL}/wp-json/wc/v3/orders${oid ? `/${oid}` : ""}`,
    // allorders: `${baseURL}/wp-json/wc/v3/orders?consumer_key=ck_ee1698469c4f54c3a6000023b01ea01b1a5ea71e&consumer_secret=cs_98ffa0d07cf13721a2ceaba6603a9536327005ba`,
    orders: `${baseURL}/wp-json/my-api/v1/orders-by-customer/`,
    // placeorder: '/wp-json/wc/v3/orders',
    placeorder: "/wp-json/telr-payment/v1/create-order",
    // updateorder: (oid?: number | string) => `/wp-json/telr-payment/v1/webhook`,
    updateorder: (oid?: number | string) => `/wp-json/wc/v3/orders/${oid}`,
    updatestatus: (order_id: number, OrderRef: string) =>
      `${baseURL}/wp-json/telr-payment/v1/check-payment-status?order_id=${order_id}&OrderRef=${OrderRef}`,
    telrurl: "https://secure.telr.com/gateway/order.json",
    // telrurl: 'https://run.mocky.io/v3/7fb9f20e-3cff-4f42-a897-55e330bcc001',
    returnurl: (oid?: number | string) => `${baseURL}/order-response/${oid}?status=success`,
    declineurl: (oid?: number | string) => `${baseURL}/order-response/${oid}?status=failed`,
    cancelurl: `${baseURL}/checkout`,
  },
  user: {
    //Cart key is same as customer id
    updateprofile: `/wp-json/wc/v3/customers/`,
  },
  pages: {
    termsandconditions: `${baseURL}/wp-json/wp/v2/pages/710`,
    privacypolicy: `${baseURL}/wp-json/wp/v2/pages/3`,
    faq: `${baseURL}/wp-json/wp/v2/faq`,
  },
  country: {
    countrydata: (iso2?: string) => `/wp-json/custom/v1/country-data${iso2 ? `?iso2=${iso2}` : ""}`,
    cities: `${countryStateApi}/`,
    phonecodes: `${countryStateApi}/`,
  },
};
