// "use client";
// import CustomFields from "@/components/cart/custom-field";
// import { AppDispatch, RootState } from "@/redux/store";
// import { motion } from "framer-motion";
// import {
//   placeOrderApi,
//   updateCustomerAddress,
// } from "@/server-api/apifunctions/apiService";
// import {
//   fetchProductImages,
//   formatPrice,
//   getCustomImage,
// } from "@/utils/helper";
// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import PriceSection from "../../cart/price-section";
// import { clearCart } from "@/redux/store/cart";
// import { toast } from "react-toastify";
// import Link from "next/link";
// import GuestCheckoutForm from "../guest-login";
// import { apiEndpoints } from "@/server-api/config/api.endpoints";
// import { fetchDataApi } from "@/server-api/apifunctions/apiService";
// import { useProductImageContext } from "@/components/context/product-image-context";
// import connectAPI from "@/server-api/config/connect-api";
// import axios from "axios";
// import { baseURL } from "@/server-api/config/base-urls";
// import OrderSuccessPage from "@/app/(pages)/order-response/[oid]/page";
// import countriesList, { countryCodes } from "@/utils/country";
// import GuestAddressForm from "../guest-address";
// import CheckoutSummary from "../checkout-summary";
// import PaymentSection from "../payment-section";
// import PhoneNumberInput from "@/components/common/phone-number";
// import CountryStateInput from "@/components/common/country-state";
// import Login from "../../login";

// const paymentMethods = [
//   {
//     id: "credit-card",
//     label: "Credit Card",
//     description: "Pay with your credit card",
//     defaultChecked: true,
//   },
// ];

// const deliveryMethods = [
//   {
//     id: "free-shipping",
//     label: "Free - Store Drop Off and Pickup",
//     description: "Customer drop off and pickup at Luxmetallic Store",
//     defaultChecked: true,
//     country: "United Arab Emirates",
//   },
//   {
//     id: "store-pickup",
//     label: "Free - Secure shipping",
//     description: "Within UAE",
//     defaultChecked: false,
//   },
//   {
//     id: "international-shipping",
//     label: "AED 180 - International Shipping",
//     description: "Fast and secure international shipping",
//     defaultChecked: false,
//   },
// ];

// export const Checkout = () => {
//   const dispatch: AppDispatch = useDispatch();
//   const router = useRouter();

//   const { isAuthenticated, displayName, email } = useSelector(
//     (state: RootState) => state.auth
//   );
//   const { customer, items, totals, currency } = useSelector(
//     (state: RootState) => state.cart
//   );

//   const { productData } = useProductImageContext();

//   const [selectedPayment, setSelectedPayment] = useState("card");
//   const [status, setStatus] = useState<"loading" | "success" | "error">();

//   const [guestCheckoutSelected, setIsGuestCheckoutSelected] =
//     useState<boolean>(false);

//   const [processCheckout, setProcessCheckout] = useState(false);

//   const [selectedCode, setSelectedCode] = useState("+1");
//   const [phoneNumber, setPhoneNumber] = useState("");

//   // const [isOrderSuccess, setIsOrderSuccess] = useState(false);
//   // const [orderDetails, setOrderDetails] = useState({});

//   const [formData, setFormData] = useState({
//     // name: customer.shipping_address.shipping_first_name || displayName || "",
//     email: customer.billing_address.billing_email || email || "",
//     shippingname:
//       customer.shipping_address.shipping_first_name || displayName || "",
//     shippingaddress: customer.shipping_address.shipping_address_1 || "",
//     shippingcity: customer.shipping_address.shipping_city || "",
//     shippingcountry: customer.shipping_address.shipping_country || "",
//     shippingzipcode: customer.shipping_address.shipping_postcode || "",
//     shippingphone:
//       selectedCode && phoneNumber
//         ? `${selectedCode}${phoneNumber}`
//         : customer.billing_address.billing_phone || "",
//     paymentMethod: selectedPayment || "card",
//     note: "",
//     // name: customer.billing_address.billing_first_name || "",
//     // billingname:
//     //   customer.billing_address.billing_first_name || displayName || "",
//     // billingAddress: customer.billing_address.billing_address_1 || "",
//     // billingCountry: customer.billing_address.billing_country || "",
//     // billingcountry: customer.billing_address.billing_country || "",
//     // billingphone: customer.billing_address.billing_phone || "",
//     // city: customer.billing_address.billing_city || "",
//   });

//   const [initialData, setInitialData] = useState(formData);

//   useEffect(() => {
//     setInitialData(formData);
//   }, [customer]);

//   const handleInputChange = (e: any) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({ ...prevData, [name]: value }));
//   };

//   const handleCountryChange = (event: any) => {
//     setSelectedCode(event.target.value);
//     setFormData((prevData) => ({
//       ...prevData,
//       shippingphone: `${event.target.value}${phoneNumber}`,
//     }));
//   };

//   const handlePhoneNumberChange = (event: any) => {
//     setPhoneNumber(event.target.value);
//     setFormData((prevData) => ({
//       ...prevData,
//       shippingphone: `${selectedCode}${event.target.value}`,
//     }));
//   };


//   const handleFormSubmit = async (e: any) => {
//     e.preventDefault();

//     if(!formData.shippingname){
//       toast.error("Please fill out name.");
//       return;
//     }

//     if(!formData.email){
//       toast.error("Please fill out email address.");
//       return;
//     }

//     if(!formData.shippingphone){
//       toast.error("Please fill out mobile number.");
//       return;
//     }

//     if(!formData.shippingcountry){
//       toast.error("Please select a shipping country.");
//       return;
//     }

//     if(!formData.shippingaddress){
//       toast.error("Please fill out shipping address.");
//       return;
//     }

//     try {
//       setStatus("loading");

//       let updatedShipping = false;

//       if (
//         (formData.shippingaddress !== initialData.shippingaddress ||
//           formData.shippingphone !== initialData.shippingphone) || 
//           formData.shippingname != initialData.shippingname || 
//           formData.shippingcountry != initialData.shippingcountry || 
//           formData.shippingzipcode != initialData.shippingzipcode &&
//         isAuthenticated
//       ) {
//         const result = await updateCustomerAddress("shipping", formData);
//         updatedShipping = true;
//         //console.log("updated billing address", result);
//       }

//       if (processCheckout) {
//         const order = await placeOrderApi();
//         if (order && order.payment_url) {
//           const { id, total, currency } = order;
//           window.location.href = order.payment_url;
//         }
//       } else {
//         toast.error(
//           "Payment processing failed. Payment turned off. Please try again."
//         );
//         setStatus("error");
//       }
//     } catch (error) {
//       setStatus("error");
//       // toast.error(error.data.message);
//       console.error("Error processing order:", error);
//     }
//   };

//   const filteredMethods =
//     formData.shippingcountry === "AE"
//       ? [
//           {
//             id: "free-shipping",
//             label: "Free Shipping",
//             description: "Secure shipping across UAE",
//             defaultChecked: true,
//           },
//           {
//             id: "free-dropoff",
//             label: "Free Drop Off and Pickup",
//             description: "Free drop off and pick up at luxmetallic store",
//             defaultChecked: false,
//           },
//         ]
//       : [
//           {
//             id: "international",
//             label: "AED 180 - International Shipping",
//             description: "Delivery across the globe",
//             defaultChecked: true,
//           },
//         ];

  
//   if (!items.length) {
//     toast.error("Cart is empty. Add items to checkout");
//     router.push("/shop");
//   }

//   if (!items.length) {
//     router.push("/shop");
//   }

//   if (!isAuthenticated && !guestCheckoutSelected) {
//     return (
//       <Login
//         checkoutPage={true}
//         setIsGuestCheckoutSelected={setIsGuestCheckoutSelected}
//       />
//     );
//   }

//   return (
//     <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
//       <form action="#" className="mx-auto max-w-screen-xl px-4 2xl:px-0">
//         {(isAuthenticated && displayName) || guestCheckoutSelected ? (
//           <p className="mukta-medium text-gray-600">
//             Logged in as{" "}
//             <span className="text-green-600 font-bold">
//               {displayName ? displayName : "Guest"}
//             </span>
//           </p>
//         ) : (
//           <p className="mukta-medium text-gray-600">Not logged in</p>
//         )}
//         <div className="mt-6 sm:mt-8 lg:flex lg:items-start lg:gap-12 xl:gap-16">
//           <div className="min-w-0 flex-1 space-y-8">
//             <div className="space-y-4">
//               <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
//                 Add your shipping address
//               </h2>
//               <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
//                 <div>
//                   <label
//                     htmlFor="shippingname"
//                     className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
//                   >
//                     {" "}
//                     Your name*{" "}
//                   </label>
//                   <input
//                     type="text"
//                     id="shippingname"
//                     onChange={handleInputChange}
//                     value={formData.shippingname}
//                     className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
//                     placeholder="Name"
//                   />
//                 </div>
//                 <div>
//                   <label
//                     htmlFor="billingemail"
//                     className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
//                   >
//                     {" "}
//                     Your email*{" "}
//                   </label>
//                   <input
//                     type="email"
//                     id="billingemail"
//                     onChange={handleInputChange}
//                     value={formData.email}
//                     className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
//                     placeholder="example@gmail.com"
//                   />
//                 </div>

//                 <div>

//                   <div className="mb-2 flex items-center gap-2">
//                     <label
//                       htmlFor="shippingphone"
//                       className="block text-sm font-medium text-gray-900 dark:text-white"
//                     >
//                       Phone Number*
//                     </label>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     {/* Country Code Selector */}
//                     <PhoneNumberInput
//                       handleCountryChange={handleCountryChange}
//                       selectedCode={selectedCode}
//                       phoneNumberValue={phoneNumber}
//                       handleInputChange={handlePhoneNumberChange}
//                     />
//                   </div>
//                 </div>

//                 <CountryStateInput
//                   formData={formData}
//                   setFormData={setFormData}
//                 />

//                 <div>
//                   <label
//                     htmlFor="shippingaddress"
//                     className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
//                   >
//                     {" "}
//                     Address*{" "}
//                   </label>
//                   <input
//                     type="text"
//                     id="shippingaddress"
//                     value={formData.shippingaddress}
//                     onChange={handleInputChange}
//                     className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
//                     placeholder="Street Address, xyz"
//                   />
//                 </div>

//                 {/* <div className="sm:col-span-2">
//                   <button
//                     type="submit"
//                     className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
//                   >
//                     <svg
//                       className="h-5 w-5"
//                       aria-hidden="true"
//                       xmlns="http://www.w3.org/2000/svg"
//                       width={24}
//                       height={24}
//                       fill="none"
//                       viewBox="0 0 24 24"
//                     >
//                       <path
//                         stroke="currentColor"
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M5 12h14m-7 7V5"
//                       />
//                     </svg>
//                     Add new address
//                   </button>
//                 </div> */}
//               </div>
//             </div>

//             <div className="space-y-4">
//               <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
//                 Delivery Methods
//               </h3>
//               <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
//                 {filteredMethods.map((method) => (
//                   <div
//                     key={method.id}
//                     className="rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4 dark:border-gray-700 dark:bg-gray-800"
//                   >
//                     <div className="flex items-start">
//                       <div className="flex h-5 items-center">
//                         <input
//                           id={method.id}
//                           aria-describedby={`${method.id}-text`}
//                           type="radio"
//                           name="delivery-method"
//                           defaultValue={method.id}
//                           className="h-4 w-4 border-gray-300 bg-white text-primary-600 focus:ring-2 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600"
//                           defaultChecked={method.defaultChecked}
//                         />
//                       </div>
//                       <div className="ms-4 text-sm">
//                         <label
//                           htmlFor={method.id}
//                           className="font-medium leading-none text-gray-900 dark:text-white"
//                         >
//                           {method.label}
//                         </label>
//                         <p
//                           id={`${method.id}-text`}
//                           className="mt-1 text-xs font-normal text-gray-500 dark:text-gray-400"
//                         >
//                           {method.description}
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             <div className="space-y-4">
//               <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
//                 Payment
//               </h3>
//               {/* <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
//                 {paymentMethods.map((method) => (
//                   <div
//                     key={method.id}
//                     className="rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4 dark:border-gray-700 dark:bg-gray-800"
//                   >
//                     <div className="flex items-start">
//                       <div className="flex h-5 items-center">
//                         <input
//                           id={method.id}
//                           aria-describedby={`${method.id}-text`}
//                           type="radio"
//                           name="payment-method"
//                           defaultValue={method.id}
//                           className="h-4 w-4 border-gray-300 bg-white text-primary-600 focus:ring-2 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600"
//                           defaultChecked={method.defaultChecked}
//                         />
//                       </div>
//                       <div className="ms-4 text-sm">
//                         <label
//                           htmlFor={method.id}
//                           className="font-medium leading-none text-gray-900 dark:text-white"
//                         >
//                           {method.label}
//                         </label>
//                         <p
//                           id={`${method.id}-text`}
//                           className="mt-1 text-xs font-normal text-gray-500 dark:text-gray-400"
//                         >
//                           {method.description}
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div> */}
//             </div>
//             <div>
//               <PaymentSection />
//             </div>
//           </div>
//           {/* Cart Summary Section */}
//           <CheckoutSummary
//             productData={productData}
//             handleFormSubmit={handleFormSubmit}
//             currency={currency}
//             totals={totals}
//             items={items}
//           />
//         </div>
//       </form>
//     </section>
//   );
// };

// export default Checkout;
