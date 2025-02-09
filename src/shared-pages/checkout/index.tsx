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
// import PriceSection from "../cart/price-section";
// import { clearCart } from "@/redux/store/cart";
// import { toast } from "react-toastify";
// import Link from "next/link";
// import GuestCheckoutForm from "./guest-login";
// import { apiEndpoints } from "@/server-api/config/api.endpoints";
// import { fetchDataApi } from "@/server-api/apifunctions/apiService";
// import { useProductImageContext } from "@/components/context/product-image-context";
// import connectAPI from "@/server-api/config/connect-api";
// import axios from "axios";
// import { baseURL } from "@/server-api/config/base-urls";
// import OrderSuccessPage from "@/app/(pages)/order-response/[oid]/page";
// import countriesList from "@/utils/country";
// import GuestAddressForm from "./guest-address";

// const paymentMethods = [
//   {
//     id: "card",
//     title: "Card/Credit Card",
//     description: "Secure Payment",
//     details: "Easy and secure payment through your card.",
//     icon: "fi_4436481",
//     bgColor: "bg-green-50",
//     borderColor: "border-green-600",
//   },
//   // {
//   //   id: "cash",
//   //   title: "Cash On Delivery",
//   //   description: "Extra charges may be applied*",
//   //   // details: "Additional AED 10 Service Charge",
//   //   icon: "",
//   //   bgColor: "bg-white",
//   //   borderColor: "border-primary",
//   // },
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

//   const [isDeliveryAddEditing, setIsDeliveryAddEditing] = useState(false);
//   const [isBillingAddEditing, setIsBillingAddEditing] = useState(false);

//   const [isGuestDeliveryAddressAdded, setisGuestDeliveryAddressAdded] =
//     useState(false);
//   const [isGuestBillingAddressAdded, setisGuestBillingAddressAdded] =
//     useState(false);
//   const [
//     isGuestDeliveryAddressAddedStatus,
//     setisGuestDeliveryAddressAddedStatus,
//   ] = useState<"loading" | "success" | "error">();
//   const [isDeliveryAddressModalOpen, setIsDeliveryAddressModalOpen] =
//     useState(false);
//   const [isBillingAddressModalOpen, setIsBillingAddressModalOpen] =
//     useState(false);
//   const [isUsingSameAddress, setIsUsingSameAddress] = useState(true);
//   const [selectedPayment, setSelectedPayment] = useState("card");
//   const [status, setStatus] = useState<"loading" | "success" | "error">();
//   const [guestSubmitstatus, setGuestSubmitStatus] = useState<
//     "loading" | "success" | "error"
//   >();
//   const [guestCheckoutSelected, setIsGuestCheckoutSelected] =
//     useState<boolean>(false);
//   const [processCheckout, setProcessCheckout] = useState(false);

//   // const [isOrderSuccess, setIsOrderSuccess] = useState(false);
//   // const [orderDetails, setOrderDetails] = useState({});

//   const [formData, setFormData] = useState({
//     // name: customer.billing_address.billing_first_name || "",
//     email: customer.billing_address.billing_email || email || "",
//     billingname:
//       customer.billing_address.billing_first_name || displayName || "",
//     billingAddress: customer.billing_address.billing_address_1 || "",
//     shippingname:
//       customer.shipping_address.shipping_first_name || displayName || "",
//     shippingAddress: customer.shipping_address.shipping_address_1 || "",
//     city: customer.billing_address.billing_city || "",
//     billingCountry: customer.billing_address.billing_country || "",
//     shippingCountry: customer.shipping_address.shipping_country || "",
//     // billingcountry: customer.billing_address.billing_country || "",
//     zipCode: customer.billing_address.billing_postcode || "",
//     billingphone: customer.billing_address.billing_phone || "",
//     shippingphone: customer.billing_address.billing_phone || "",
//     paymentMethod: selectedPayment || "card",
//     note: "",
//   });

//   const [initialData, setInitialData] = useState(formData);

//   useEffect(() => {
//     setInitialData(formData);
//   }, [customer]);

//   const handleInputChange = (e: any) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({ ...prevData, [name]: value }));
//   };

//   const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { value } = e.target;
//     setIsUsingSameAddress(value === "same");
//   };

//   const toggleDeliveryAddressModal = () => {
//     setIsDeliveryAddressModalOpen((prev) => !prev);
//   };

//   const toggleBillingAddressModal = () => {
//     setIsBillingAddressModalOpen((prev) => !prev);
//   };

//   const handleDeliveryAddEditToggle = () => {
//     setIsDeliveryAddEditing(!isDeliveryAddEditing);
//   };
//   const handleBillingAddEditToggle = () => {
//     setIsBillingAddEditing(!isDeliveryAddEditing);
//   };

//   const handleSelectPayment = (id: string) => {
//     setSelectedPayment(id);
//   };

//   const handleGuestCheckout = () => {
//     // if (
//     //   (!formData.email.contains('@') )
//     // ) {
//     //   //console.log("Please enter a valid email");
//     // }

//     if (!formData.email) {
//       toast.error("Email is required for guest checkout.");
//       return;
//     }
//     if (!formData.shippingphone) {
//       toast.error("Shipping phone is required for guest checkout.");
//       return;
//     }
//     setGuestSubmitStatus("loading");
//     setIsGuestCheckoutSelected(true);
//   };

//   // const handleShippingAddressAddToggle = () => {
//   //   setIsAdding(!isAdding);
//   // };

//   //test checkout without payment
//   // const handleFormSubmit = async (e: any) => {
//   //   e.preventDefault();

//   //   if (isUsingSameAddress) {
//   //     setFormData((prevData) => ({
//   //       ...prevData,
//   //       billingname: prevData.shippingname,
//   //       billingAddress: prevData.shippingAddress,
//   //       billingphone: prevData.shippingphone,
//   //     }));
//   //   }

//   //   if (
//   //     !formData.billingname ||
//   //     !formData.billingAddress ||
//   //     !formData.billingphone ||
//   //     !formData.shippingname ||
//   //     !formData.shippingAddress ||
//   //     !formData.shippingphone
//   //   ) {
//   //     toast.error("Please fill out all required fields.");
//   //     return;
//   //   }

//   //   try {
//   //     setStatus("loading");

//   //     let updatedBilling = false;
//   //     let updatedShipping = false;

//   //     if (
//   //       (formData.billingAddress !== initialData.billingAddress ||
//   //         formData.billingphone !== initialData.billingphone) &&
//   //       isAuthenticated
//   //     ) {
//   //       const result = await updateCustomerAddress("billing", formData);
//   //       updatedBilling = true;
//   //       //console.log("updated billing address", result);
//   //     }

//   //     if (
//   //       (formData.shippingAddress !== initialData.shippingAddress ||
//   //         formData.shippingphone !== initialData.shippingphone) &&
//   //       isAuthenticated
//   //     ) {
//   //       const result = await updateCustomerAddress("shipping", formData);
//   //       updatedShipping = true;
//   //       //console.log("updated billing address", result);
//   //     }

//   //     try {
//   //       setStatus("loading");
//   //       const order = await placeOrderApi(formData, items);
//   //       if (order) {
//   //         // //console.log("Order placed successfully:", order);
//   //         toast.success("Order placed successfully!");
//   //         setIsDeliveryAddEditing(false);
//   //         dispatch(clearCart());
//   //         setStatus("success");
//   //         router.replace(`/order-response/${order.id}?status=success`);
//   //         // dispatch(updateBillingAddress(formData));
//   //       }
//   //       // alert('Order placed!');
//   //       // setOrderDetails(order);
//   //       // setIsOrderSuccess(true);
//   //     } catch (error) {
//   //       setStatus("error");
//   //       toast.error("Error placing the order. Please try again.");
//   //       console.error("Error processing order:", error);
//   //     }
//   //   } catch (error) {
//   //     setStatus("error");
//   //     // toast.error(error.data.message);
//   //     console.error("Error processing order:", error);
//   //   }
//   // };

//   // //Wp web hook implementation
//   // const handleFormSubmit = async (e: any) => {
//   //   e.preventDefault();

//   //   if (isUsingSameAddress) {
//   //     setFormData((prevData) => ({
//   //       ...prevData,
//   //       billingname: prevData.shippingname,
//   //       billingAddress: prevData.shippingAddress,
//   //       billingphone: prevData.shippingphone,
//   //     }));
//   //   }

//   //   if (
//   //     !formData.shippingname ||
//   //     !formData.shippingAddress ||
//   //     !formData.shippingphone
//   //   ) {
//   //     toast.error("Please fill out all required fields of delivery address.");
//   //     return;
//   //   }

//   //   if (
//   //     !formData.billingname ||
//   //     !formData.billingAddress ||
//   //     !formData.billingphone
//   //   ) {
//   //     toast.error("Please fill out all required fields of billing address.");
//   //     return;
//   //   }

//   //   try {
//   //     setStatus("loading");

//   //     let updatedBilling = false;
//   //     let updatedShipping = false;

//   //     if (
//   //       (formData.billingAddress !== initialData.billingAddress ||
//   //         formData.billingphone !== initialData.billingphone) &&
//   //       isAuthenticated
//   //     ) {
//   //       const result = await updateCustomerAddress("billing", formData);
//   //       updatedBilling = true;
//   //       //console.log("updated billing address", result);
//   //     }

//   //     if (
//   //       (formData.shippingAddress !== initialData.shippingAddress ||
//   //         formData.shippingphone !== initialData.shippingphone) &&
//   //       isAuthenticated
//   //     ) {
//   //       const result = await updateCustomerAddress("shipping", formData);
//   //       updatedShipping = true;
//   //       //console.log("updated billing address", result);
//   //     }

//   //     const response = await axios.post(
//   //       `${baseURL}/telr-payment/v1/create-order`,
//   //       formData,
//   //       {
//   //         headers: {
//   //           "Content-Type": "application/json",
//   //         },
//   //       }
//   //     );

//   //     if (response.data.url) {
//   //       // Redirect to Telr payment page
//   //       window.location.href = response.data.url;
//   //     } else {
//   //       throw new Error("Payment URL not received.");
//   //     }

//   //     // } else {
//   //     //   toast.error(
//   //     //     "Payment processing failed. Payment turned off. Please try again."
//   //     //   );
//   //     //   setStatus("error");
//   //     // }
//   //   } catch (error) {
//   //     setStatus("error");
//   //     // toast.error(error.data.message);
//   //     console.error("Error processing order:", error);
//   //   }
//   // };

//   // const handleFormSubmit = async (e: any) => {
//   //   e.preventDefault();

//   //   if (isUsingSameAddress) {
//   //     setFormData((prevData) => ({
//   //       ...prevData,
//   //       billingname: prevData.shippingname,
//   //       billingAddress: prevData.shippingAddress,
//   //       billingphone: prevData.shippingphone,
//   //     }));
//   //   }

//   //   if (
//   //     !formData.shippingname ||
//   //     !formData.shippingAddress ||
//   //     !formData.shippingphone
//   //   ) {
//   //     toast.error("Please fill out all required fields of delivery address.");
//   //     return;
//   //   }

//   //   if (
//   //     !formData.billingname ||
//   //     !formData.billingAddress ||
//   //     !formData.billingphone
//   //   ) {
//   //     toast.error("Please fill out all required fields of billing address.");
//   //     return;
//   //   }

//   //   try {
//   //     setStatus("loading");

//   //     let updatedBilling = false;
//   //     let updatedShipping = false;

//   //     if (
//   //       (formData.billingAddress !== initialData.billingAddress ||
//   //         formData.billingphone !== initialData.billingphone) &&
//   //       isAuthenticated
//   //     ) {
//   //       const result = await updateCustomerAddress("billing", formData);
//   //       updatedBilling = true;
//   //       //console.log("updated billing address", result);
//   //     }

//   //     if (
//   //       (formData.shippingAddress !== initialData.shippingAddress ||
//   //         formData.shippingphone !== initialData.shippingphone) &&
//   //       isAuthenticated
//   //     ) {
//   //       const result = await updateCustomerAddress("shipping", formData);
//   //       updatedShipping = true;
//   //       //console.log("updated billing address", result);
//   //     }

//   //     if (processCheckout) {
//   //       const order = await placeOrderApi(formData, items);
//   //       if (order && order.payment_url) {
//   //         const { id, total, currency } = order;
//   //         window.location.href = order.payment_url;
//   //       }
//   //     } else {
//   //       toast.error(
//   //         "Payment processing failed. Payment turned off. Please try again."
//   //       );
//   //       setStatus("error");
//   //     }
//   //   } catch (error) {
//   //     setStatus("error");
//   //     // toast.error(error.data.message);
//   //     console.error("Error processing order:", error);
//   //   }
//   // };

//   // const handleFormSubmit = async (e: any) => {
//   //   e.preventDefault();

//   //   if (isUsingSameAddress) {
//   //     setFormData((prevData) => ({
//   //       ...prevData,
//   //       billingname: prevData.shippingname,
//   //       billingAddress: prevData.shippingAddress,
//   //       billingphone: prevData.shippingphone,
//   //     }));
//   //   }

//   //   if (
//   //     !formData.shippingname ||
//   //     !formData.shippingAddress ||
//   //     !formData.shippingphone
//   //   ) {
//   //     toast.error("Please fill out all required fields of shipping.");
//   //     return;
//   //   }

//   //   if (
//   //     !formData.billingname ||
//   //     !formData.billingAddress ||
//   //     !formData.billingphone
//   //   ) {
//   //     toast.error("Please fill out all required fields of billing.");
//   //     return;
//   //   }

//   //   try {
//   //     setStatus("loading");

//   //     let updatedBilling = false;
//   //     let updatedShipping = false;

//   //     if (
//   //       (formData.billingAddress !== initialData.billingAddress ||
//   //       formData.billingphone !== initialData.billingphone) && isAuthenticated
//   //     ) {
//   //       const result = await updateCustomerAddress("billing", formData);
//   //       updatedBilling = true;
//   //       //console.log("updated billing address", result);
//   //     }

//   //     if (
//   //       (formData.shippingAddress !== initialData.shippingAddress ||
//   //       formData.shippingphone !== initialData.shippingphone) && isAuthenticated
//   //     ) {
//   //       const result = await updateCustomerAddress("shipping", formData);
//   //       updatedShipping = true;
//   //       //console.log("updated billing address", result);
//   //     }

//   //     if (processCheckout) {
//   //       const order = await placeOrderApi(formData, items);
//   //       if (order && order.payment_url) {
//   //         const { id, total, currency } = order;
//   //         window.location.href = order.payment_url;
//   //       }
//   //     } else {
//   //       toast.error(
//   //         "Payment processing failed. Payment turned off. Please try again."
//   //       );
//   //       setStatus("error");
//   //     }
//   //   } catch (error) {
//   //     setStatus("error");
//   //     // toast.error(error.data.message);
//   //     console.error("Error processing order:", error);
//   //   }
//   // };

//   const handleGuestAddressSubmit = (e: any) => {
//     e.preventDefault();

//     if (!formData.shippingname) {
//       toast.error("Please enter your delivery name.");
//       return;
//     }
//     if (!formData.shippingAddress) {
//       toast.error("Please enter your delivery address.");
//       return;
//     }
//     if (!formData.shippingphone) {
//       toast.error("Please enter your delivery phone number.");
//       return;
//     }
//     if (!formData.shippingCountry) {
//       toast.error("Please enter your delivery country.");
//       return;
//     }

//     toggleDeliveryAddressModal();
//     setisGuestDeliveryAddressAdded(true);
//   };

//   const handleBillingAddressSubmit = (e: any) => {
//     e.preventDefault();

//     if (!formData.shippingname) {
//       toast.error("Please enter your billing name.");
//       return;
//     }
//     if (!formData.shippingAddress) {
//       toast.error("Please enter your billing address.");
//       return;
//     }
//     if (!formData.shippingphone) {
//       toast.error("Please enter your billing phone number.");
//       return;
//     }
//     if (!formData.shippingCountry) {
//       toast.error("Please enter your billing country.");
//       return;
//     }

//     toggleBillingAddressModal();
//     setisGuestBillingAddressAdded(true);
//     setisGuestDeliveryAddressAdded(true);
//   };

//   // Working Checkout for testing (direct checkout)
//   // const handleFormSubmit = async (e: any) => {
//   //   e.preventDefault();

//   //   if (isUsingSameAddress) {
//   //     setFormData((prevData) => ({
//   //       ...prevData,
//   //       billingname: prevData.shippingname,
//   //       billingAddress: prevData.shippingAddress,
//   //       billingphone: prevData.shippingphone,
//   //     }));
//   //   }

//   //   if (!formData.email && !isAuthenticated) {
//   //     toast.error("Please login as guest or user");
//   //     return;
//   //   }

//   //   if (!formData.shippingphone && !isAuthenticated) {
//   //     toast.error("Please enter your phone number.");
//   //     return;
//   //   }

//   //   if (!formData.billingname && isUsingSameAddress) {
//   //     toast.error("Please enter your delivery name.");
//   //     return;
//   //   }

//   //   if (!formData.billingname && !isUsingSameAddress) {
//   //     toast.error("Please enter your billing name.");
//   //     return;
//   //   }

//   //   if (!formData.billingAddress && isUsingSameAddress) {
//   //     toast.error("Please enter your delivery address.");
//   //     return;
//   //   }

//   //   if (!formData.billingAddress && !isUsingSameAddress) {
//   //     toast.error("Please enter your billing address.");
//   //     return;
//   //   }

//   //   if (!formData.billingphone && isUsingSameAddress) {
//   //     toast.error("Please enter your delivery phone number.");
//   //     return;
//   //   }

//   //   if (!formData.billingphone && !isUsingSameAddress) {
//   //     toast.error("Please enter your billing phone number.");
//   //     return;
//   //   }

//   //   if (!formData.shippingname) {
//   //     toast.error("Please enter your delivery name.");
//   //     return;
//   //   }

//   //   if (!formData.shippingAddress) {
//   //     toast.error("Please enter your delivery address.");
//   //     return;
//   //   }

//   //   if (!formData.shippingphone) {
//   //     toast.error("Please enter your delivery phone number.");
//   //     return;
//   //   }

//   //   //   try {

//   //   try {
//   //     setStatus("loading");
//   //     //     setStatus("loading");

//   //     let updatedBilling = false;
//   //     let updatedShipping = false;

//   //     if (
//   //       (formData.billingAddress !== initialData.billingAddress ||
//   //         formData.billingphone !== initialData.billingphone) &&
//   //       isAuthenticated
//   //     ) {
//   //       const result = await updateCustomerAddress("billing", formData);
//   //       updatedBilling = true;
//   //       //console.log("updated billing address", result);
//   //     }

//   //     if (
//   //       (formData.shippingAddress !== initialData.shippingAddress ||
//   //         formData.shippingphone !== initialData.shippingphone) &&
//   //       isAuthenticated
//   //     ) {
//   //       const result = await updateCustomerAddress("shipping", formData);
//   //       updatedShipping = true;
//   //       //console.log("updated billing address", result);
//   //     }

//   //     const order = await placeOrderApi(formData, items);

//   //     // dispatch(updateBillingAddress(formData));
//   //     // if (order) {
//   //     //   const paymentResponse = await createPaymentApi(order.id, order.total, "AED");

//   //     //   if(paymentResponse && paymentResponse.status){
//   //     //     // //console.log("Order placed successfully:", order);
//   //     //     toast.success("Order placed successfully!");
//   //     //     setIsDeliveryAddEditing(false);
//   //     //     dispatch(clearCart());
//   //     //     setStatus("success");
//   //     //     router.replace(`/order-response/${order.id}?status=success`);
//   //     //   }
//   //     //   else {
//   //     //     toast.error("Failed to place order. Please try again later.");
//   //     //     setStatus("error");
//   //     //   }
//   //     // }

//   //     if (order && order.payment_url) {
//   //       const { id, total, currency } = order;

//   //       // const paymentResponse = await createPaymentApi(id, total, currency);

//   //       // if(paymentResponse && paymentResponse.payment_url) {
//   //       //   window.location.href = paymentResponse.payment_url;
//   //       // }
//   //       // if(paymentResponse && paymentResponse.status){
//   //       // //console.log("Order placed successfully:", order);
//   //       toast.success("Order placed successfully!");
//   //       setIsDeliveryAddEditing(false);
//   //       setStatus("success");
//   //       // alert("Order placed!");
//   //       dispatch(clearCart());
//   //       router.replace(`/order-response/${order.id}?status=success`);
//   //       // }
//   //       // else {
//   //       //   toast.error("Failed to place order. Please try again later.");
//   //       //   setStatus("error");
//   //       // }
//   //     }
//   //   } catch (error) {
//   //     setStatus("error");
//   //     // setOrderDetails(order);
//   //     // setIsOrderSuccess(true);
//   //     // toast.error(error.data.message);
//   //     console.error("Error processing order:", error);
//   //   }
//   // };

//   // Payment Telr integration with payment Url (With token and backend processing from CoCart Plugin)
//   const handleFormSubmit = async (e: any) => {
//     e.preventDefault();

//     if (isUsingSameAddress) {
//       setFormData((prevData) => ({
//         ...prevData,
//         billingname: prevData.shippingname,
//         billingAddress: prevData.shippingAddress,
//         billingphone: prevData.shippingphone,
//       }));
//     }

//     if (!formData.email && !isAuthenticated) {
//       toast.error("Please login as guest or user");
//       return;
//     }

//     if (!formData.shippingphone && !isAuthenticated) {
//       toast.error("Please enter your phone number.");
//       return;
//     }

//     // if (!formData.billingname && isUsingSameAddress) {
//     //   toast.error("Please enter your delivery name.");
//     //   return;
//     // }

//     if (!formData.billingname && !isUsingSameAddress) {
//       toast.error("Please enter your billing name.");
//       return;
//     }

//     // if (!formData.billingAddress && isUsingSameAddress) {
//     //   toast.error("Please enter your delivery address.");
//     //   return;
//     // }

//     if (!formData.billingAddress && !isUsingSameAddress) {
//       toast.error("Please enter your billing address.");
//       return;
//     }

//     // if (!formData.billingphone && isUsingSameAddress) {
//     //   toast.error("Please enter your delivery phone number.");
//     //   return;
//     // }

//     if (!formData.billingphone && !isUsingSameAddress) {
//       toast.error("Please enter your billing phone number.");
//       return;
//     }

//     if (!formData.shippingname) {
//       toast.error("Please enter your delivery name.");
//       return;
//     }

//     if (!formData.shippingAddress) {
//       toast.error("Please enter your delivery address.");
//       return;
//     }

//     if (!formData.shippingphone) {
//       toast.error("Please enter your delivery phone number.");
//       return;
//     }

//     try {
//       setStatus("loading");
//       console.log("formdata", formData);

//       let updatedBilling = false;
//       let updatedShipping = false;

//       if (
//         (formData.billingAddress !== initialData.billingAddress ||
//           formData.billingphone !== initialData.billingphone) &&
//         isAuthenticated
//       ) {
//         const result = await updateCustomerAddress("billing", formData);
//         updatedBilling = true;
//         //console.log("updated billing address", result);
//       }

//       if (
//         (formData.shippingAddress !== initialData.shippingAddress ||
//           formData.shippingphone !== initialData.shippingphone) &&
//         isAuthenticated
//       ) {
//         const result = await updateCustomerAddress("shipping", formData);
//         updatedShipping = true;
//         //console.log("updated billing address", result);
//       }

//       const order = await placeOrderApi(formData);

//       if (order && order.status === "success" && order.url) {
//         window.location.href = order.url;
//       }
//       // dispatch(clearCart());
//       // router.replace(`/order-response/${order.id}?status=success`);
//     } catch (error: any) {
//       setStatus("error");
//       // setOrderDetails(order);
//       // setIsOrderSuccess(true);
//       toast.error(error.data.message);
//       console.error("Error processing order:", error);
//     }
//   };

//   if (!items.length) {
//     toast.error("Cart is empty. Add items to checkout");
//     router.push("/shop");
//   }

//   // if (!isAuthenticated) {
//   //   toast.error("You must be logged in to checkout.");
//   //   router.push("/login");
//   // }

//   if (!items.length) {
//     router.push("/shop");
//   }

//   return (
//     <div className="bg-[#f9f9f9] 2xl:px-28 xl:px-28 lg:px-15 md:px-5 sm:px-5 xs:px-5 px-3 h-auto  mx-auto mt-5 mb-10">
//       <div className="mx-auto">
//         <div className="flex flex-col lg:flex-row gap-6">
//           {/* Cart Items Section */}
//           <div className="w-full lg:w-2/3 ">
//             <div className="bg-white  rounded-lg p-2 lg:p-4 my-3 mb-5">
//               <div className="flex gap-3">
//                 <svg
//                   width="18pt"
//                   height="18pt"
//                   id="fi_15501313"
//                   enableBackground="new 0 0 1024 1024"
//                   viewBox="0 0 1024 1024"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <g id="XMLID_3_">
//                     <g id="XMLID_1_">
//                       <g id="XMLID_16_">
//                         <path
//                           id="XMLID_24_"
//                           d="m695.2 275.5c0 9.8-.7 19.5-2 29.2.4-2.7.7-5.3 1.1-8-2.6 18.3-7.4 36.2-14.5 53.2 1-2.4 2-4.8 3-7.2-5.3 12.6-11.8 24.7-19.4 36-1.9 2.9-4 5.8-6.1 8.6-4.4 5.9 3.8-4.7.7-.9-1.1 1.4-2.2 2.7-3.3 4.1-4.2 5-8.6 9.9-13.2 14.5s-9.5 9.1-14.5 13.2c-1.3 1.1-2.7 2.2-4.1 3.3-3.9 3.1 6.8-5.1.9-.7-2.8 2.1-5.7 4.1-8.6 6.1-11.4 7.6-23.4 14-36 19.4l7.2-3c-17.1 7.1-34.9 12-53.2 14.5 2.7-.4 5.3-.7 8-1.1-19.4 2.6-38.9 2.6-58.3 0 2.7.4 5.3.7 8 1.1-18.3-2.6-36.2-7.4-53.2-14.5l7.2 3c-12.6-5.3-24.7-11.8-36-19.4-2.9-1.9-5.8-4-8.6-6.1-5.9-4.4 4.7 3.8.9.7-1.4-1.1-2.7-2.2-4.1-3.3-5-4.2-9.9-8.6-14.5-13.2s-9.1-9.5-13.2-14.5c-1.1-1.3-2.2-2.7-3.3-4.1-3.1-3.9 5.1 6.8.7.9-2.1-2.8-4.1-5.7-6.1-8.6-7.6-11.4-14-23.4-19.4-36 1 2.4 2 4.8 3 7.2-7.1-17.1-12-34.9-14.5-53.2.4 2.7.7 5.3 1.1 8-2.6-19.4-2.6-38.9 0-58.3-.4 2.7-.7 5.3-1.1 8 2.6-18.3 7.4-36.2 14.5-53.2-1 2.4-2 4.8-3 7.2 5.3-12.6 11.8-24.7 19.4-36 1.9-2.9 4-5.8 6.1-8.6 4.4-5.9-3.8 4.7-.7.9 1.1-1.4 2.2-2.7 3.3-4.1 4.2-5 8.6-9.9 13.2-14.5s9.5-9.1 14.5-13.2c1.3-1.1 2.7-2.2 4.1-3.3 3.9-3.1-6.8 5.1-.9.7 2.8-2.1 5.7-4.1 8.6-6.1 11.4-7.6 23.4-14 36-19.4-2.4 1-4.8 2-7.2 3 17.1-7.1 34.9-12 53.2-14.5-2.7.4-5.3.7-8 1.1 19.4-2.6 38.9-2.6 58.3 0-2.7-.4-5.3-.7-8-1.1 18.3 2.6 36.2 7.4 53.2 14.5-2.4-1-4.8-2-7.2-3 12.6 5.3 24.7 11.8 36 19.4 2.9 1.9 5.8 4 8.6 6.1 5.9 4.4-4.7-3.8-.9-.7 1.4 1.1 2.7 2.2 4.1 3.3 5 4.2 9.9 8.6 14.5 13.2s9.1 9.5 13.2 14.5c1.1 1.3 2.2 2.7 3.3 4.1 3.1 3.9-5.1-6.8-.7-.9 2.1 2.8 4.1 5.7 6.1 8.6 7.6 11.4 14 23.4 19.4 36-1-2.4-2-4.8-3-7.2 7.1 17.1 12 34.9 14.5 53.2-.4-2.7-.7-5.3-1.1-8 1.3 9.7 2 19.4 2 29.1.1 15.7 13.8 30.7 30 30s30.1-13.2 30-30c-.2-49.1-15-98.8-43.7-138.9-29.6-41.5-70-72.5-117.8-90.1-93.3-34.4-204.6-4.2-267.7 72.6-32.9 40.1-52.5 87.9-56.5 139.7-3.8 49.3 8.7 100.3 34.4 142.6 24.8 40.8 62.1 75.1 105.8 94.7 25 11.2 50.1 18.1 77.3 21.3 25.2 3 50.8 1.2 75.7-3.9 95.7-19.4 174.6-101.2 189.2-198 2-13.2 3.4-26.5 3.4-39.9.1-15.7-13.8-30.7-30-30-16.4.7-30 13.1-30.1 29.9z"
//                         ></path>
//                       </g>
//                     </g>
//                     <g id="XMLID_2_">
//                       <g id="XMLID_17_">
//                         <path
//                           id="XMLID_25_"
//                           d="m828.7 931.7c-21.3 0-42.6 0-63.9 0-50.8 0-101.7 0-152.5 0-61.3 0-122.6 0-183.9 0-52.8 0-105.5 0-158.3 0-24.8 0-49.5.1-74.3 0-2.5 0-5-.2-7.5-.5 2.7.4 5.3.7 8 1.1-4-.6-7.8-1.7-11.5-3.2l7.2 3c-2.8-1.2-5.5-2.6-8.1-4.3s-3.5-4 1.9 1.6c-1-1.1-2.3-2-3.3-3-.3-.3-3.2-3.2-3-3.3 0 0 5.2 7.3 1.6 1.9-1.7-2.5-3.1-5.2-4.3-8.1 1 2.4 2 4.8 3 7.2-1.5-3.7-2.5-7.6-3.2-11.5.4 2.7.7 5.3 1.1 8-.7-5.6-.5-11.4-.5-17 0-9.7 0-19.5 0-29.2 0-19.4 0-38.8 0-58.2 0-11.5.5-23 2-34.4-.4 2.7-.7 5.3-1.1 8 2.8-20.5 8.2-40.6 16.3-59.7-1 2.4-2 4.8-3 7.2 4.5-10.5 9.7-20.7 15.7-30.5 3-4.9 6.1-9.6 9.5-14.2.8-1.1 1.5-2.1 2.3-3.2.4-.5.8-1 1.2-1.6 1.7-2.3-2.8 4-2.7 3.5.4-2.1 4.4-5.5 5.8-7.1 7.2-8.5 15-16.4 23.4-23.8 2.1-1.9 4.3-3.7 6.5-5.5 1-.8 2-1.6 3.1-2.5 3.4-2.8-6.2 4.6-1.4 1.1 4.6-3.4 9.2-6.7 14-9.7 10.9-7 22.5-13.1 34.4-18.2-2.4 1-4.8 2-7.2 3 19.1-8 39.1-13.5 59.7-16.3-2.7.4-5.3.7-8 1.1 16.4-2.1 32.8-2 49.3-2h67.1 156.6c18.6 0 37.1-.4 55.6 2-2.7-.4-5.3-.7-8-1.1 20.5 2.8 40.6 8.2 59.7 16.3-2.4-1-4.8-2-7.2-3 10.5 4.5 20.7 9.7 30.5 15.7 4.9 3 9.6 6.1 14.2 9.5 1.1.8 2.1 1.5 3.2 2.3.5.4 1 .8 1.6 1.2 2.3 1.7-4-2.8-3.5-2.7 2.1.4 5.5 4.4 7.1 5.8 8.5 7.2 16.4 15 23.8 23.4 1.9 2.1 3.7 4.3 5.5 6.5.8 1 1.6 2 2.5 3.1 2.8 3.4-4.6-6.2-1.1-1.4 3.4 4.6 6.7 9.2 9.7 14 7 10.9 13.1 22.5 18.2 34.4-1-2.4-2-4.8-3-7.2 8 19.1 13.5 39.1 16.3 59.7-.4-2.7-.7-5.3-1.1-8 2.3 18 2 36.1 2 54.2v64.2c0 6.7.4 13.6-.5 20.3.4-2.7.7-5.3 1.1-8-.6 4-1.7 7.8-3.2 11.5 1-2.4 2-4.8 3-7.2-1.2 2.8-2.6 5.5-4.3 8.1s-4 3.5 1.6-1.9c-1.1 1-2 2.3-3 3.3-.3.3-3.2 3.2-3.3 3 0 0 7.3-5.2 1.9-1.6-2.5 1.7-5.2 3.1-8.1 4.3l7.2-3c-3.7 1.5-7.6 2.5-11.5 3.2 2.7-.4 5.3-.7 8-1.1-2.3.3-4.5.4-6.9.5-15.7.2-30.7 13.6-30 30 .7 16.1 13.2 30.2 30 30 36.1-.5 70.5-26.6 76.4-63.2 2.2-13.6 1.6-27.4 1.6-41.1 0-18.1 0-36.3 0-54.4 0-12.7.3-25.5-.7-38.2-4.3-57.8-26.9-111.9-65.1-155.6-35.8-41-86-70.6-139.3-81.8-27.4-5.8-54.6-6.1-82.3-6.1-32.8 0-65.6 0-98.5 0-34.9 0-69.7 0-104.6 0-21.2 0-42.8-.9-63.9 1.4-30.3 3.4-58.6 11.1-86.3 23.9-24.5 11.3-47.2 27.2-66.9 45.6-39.8 37.2-68.2 88.3-77.6 142-6.1 35.1-4.5 70.7-4.5 106.2v41.5c0 28.9 15.4 58.1 42.1 71 12.4 6 25.3 8.8 39.1 8.8h15.1 61.1 92 109 113.2 104.7 82.1 47 6.2c15.7 0 30.7-13.8 30-30-.6-16.3-13-30-29.9-30z"
//                         ></path>
//                       </g>
//                     </g>
//                   </g>
//                 </svg>

//                 {(isAuthenticated && displayName) || guestCheckoutSelected ? (
//                   <p className="mukta-medium text-gray-600">
//                     Logged in as{" "}
//                     <span className="text-green-600">
//                       {displayName ? displayName : "Guest"}
//                     </span>
//                   </p>
//                 ) : (
//                   <p className="mukta-medium text-gray-600">Not logged in</p>
//                 )}
//               </div>
//             </div>

//             {!isAuthenticated && !guestCheckoutSelected && (
//               <GuestCheckoutForm
//                 handleGuestCheckout={handleGuestCheckout}
//                 guestSubmitstatus={guestSubmitstatus}
//                 formData={formData}
//                 handleInputChange={handleInputChange}
//               />
//             )}

//             <div className="max-w-7xl mx-auto">
//               {guestCheckoutSelected && (
//                 <GuestAddressForm
//                   isGuestDeliveryAddressAdded={isGuestDeliveryAddressAdded}
//                   toggleDeliveryAddressModal={toggleDeliveryAddressModal}
//                   isDeliveryAddressModalOpen={isDeliveryAddressModalOpen}
//                   handleGuestAddressSubmit={handleGuestAddressSubmit}
//                   formData={formData}
//                   handleInputChange={handleInputChange}
//                   isGuestDeliveryAddressAddedStatus={
//                     isGuestDeliveryAddressAddedStatus
//                   }
//                   isDeliveryAddEditing={isDeliveryAddEditing}
//                   handleDeliveryAddEditToggle={handleDeliveryAddEditToggle}
//                   isGuestBillingAddressAdded={isGuestBillingAddressAdded}
//                   isBillingAddressModalOpen={isBillingAddressModalOpen}
//                   handleBillingAddressSubmit={handleBillingAddressSubmit}
//                   toggleBillingAddressModal={toggleBillingAddressModal}
//                   isUsingSameAddress={isUsingSameAddress}
//                   handleRadioChange={handleRadioChange}
//                   isBillingAddEditing={isBillingAddEditing}
//                   setIsBillingAddEditing={setIsBillingAddEditing}
//                   setIsDeliveryAddEditing={setIsDeliveryAddEditing}
//                 />
//               )}

//               {isAuthenticated && (
//                 <motion.div
//                   className=""
//                   initial={{ opacity: 0, y: -20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.3 }}
//                 >
//                   <h1 className="text-xl font-bold mb-4 text-black">
//                     Delivery Address
//                   </h1>
//                   {/* Delivery Address */}
//                   <div
//                     id="delivery-section"
//                     className="bg-white shadow-md border rounded-lg p-4 my-3 lg:p-4 "
//                   >
//                     <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4 mb-5">
//                       {/* Default Address Card */}
//                       <div className="border border-primary p-4 rounded-lg flex-1">
//                         <span className="flex items-center gap-2 bg-green-100 py-2 px-2 mb-3">
//                           <svg
//                             className="w-[20px] h-[20px]"
//                             id="fi_4436481"
//                             enableBackground="new 0 0 512 512"
//                             height={512}
//                             viewBox="0 0 512 512"
//                             width={512}
//                             xmlns="http://www.w3.org/2000/svg"
//                           >
//                             <g clipRule="evenodd" fillRule="evenodd">
//                               <path
//                                 d="m256 0c-141.2 0-256 114.8-256 256s114.8 256 256 256 256-114.8 256-256-114.8-256-256-256z"
//                                 fill="#4bae4f"
//                               />
//                               <path
//                                 d="m379.8 169.7c6.2 6.2 6.2 16.4 0 22.6l-150 150c-3.1 3.1-7.2 4.7-11.3 4.7s-8.2-1.6-11.3-4.7l-75-75c-6.2-6.2-6.2-16.4 0-22.6s16.4-6.2 22.6 0l63.7 63.7 138.7-138.7c6.2-6.3 16.4-6.3 22.6 0z"
//                                 fill="#fff"
//                               />
//                             </g>
//                           </svg>
//                           <p className="text-black">Default Address</p>
//                         </span>

//                         {!isDeliveryAddEditing ? (
//                           <>
//                             <p className="text-gray-700">
//                               <span className="font-bold">Name: </span>
//                               {formData.shippingname}
//                             </p>
//                             <p className="text-gray-700">
//                               <span className="font-bold">Address: </span>
//                               {formData.shippingAddress}
//                             </p>
//                             <p className="text-gray-700">
//                               <span className="font-bold">Country: </span>
//                               {formData.shippingCountry}
//                             </p>
//                             <p className="text-gray-700">
//                               <span className="font-bold">Phone: </span>
//                               {formData.shippingphone}
//                             </p>
//                             <div className="flex justify-end mt-4">
//                               <motion.button
//                                 onClick={handleDeliveryAddEditToggle}
//                                 className="text-primary font-medium "
//                                 whileHover={{ scale: 1.1 }}
//                                 whileTap={{ scale: 0.95 }}
//                               >
//                                 Edit
//                               </motion.button>
//                             </div>
//                           </>
//                         ) : (
//                           <form onSubmit={() => setIsDeliveryAddEditing(false)}>
//                             <motion.div
//                               initial={{ opacity: 0 }}
//                               animate={{ opacity: 1 }}
//                               className="space-y-4"
//                             >
//                               <input
//                                 type="text"
//                                 name="shippingname"
//                                 value={formData.shippingname}
//                                 onChange={handleInputChange}
//                                 placeholder="Name"
//                                 required
//                                 className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
//                               />
//                               <input
//                                 type="text"
//                                 name="shippingAddress"
//                                 value={formData.shippingAddress}
//                                 onChange={handleInputChange}
//                                 placeholder="Address"
//                                 required
//                                 className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
//                               />
//                               <select
//                                 name="shippingCountry"
//                                 value={formData.shippingCountry}
//                                 onChange={handleInputChange}
//                                 required
//                                 className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
//                               >
//                                 <option value="">Select Country</option>
//                                 {countriesList.map((country) => (
//                                   <option
//                                     key={country.code}
//                                     value={country.code}
//                                   >
//                                     {country.name}
//                                   </option>
//                                 ))}
//                               </select>
//                               <input
//                                 type="number"
//                                 name="shippingphone"
//                                 value={formData.shippingphone}
//                                 onChange={handleInputChange}
//                                 placeholder="Phone"
//                                 maxLength={12}
//                                 required
//                                 className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
//                               />
//                             </motion.div>
//                             <div className="flex justify-end mt-4 gap-3">
//                               <motion.button
//                                 type="submit"
//                                 className="px-4 py-2 bg-primary text-white rounded-md shadow-md hover:bg-primary/80"
//                                 whileHover={{ scale: 1.05 }}
//                                 whileTap={{ scale: 0.95 }}
//                               >
//                                 Save
//                               </motion.button>
//                               {/* <motion.button
//                       onClick={() => setIsDeliveryAddEditing(false)}
//                       className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md shadow-md hover:bg-gray-400"
//                       whileHover={{ scale: 1.05 }}
//                       whileTap={{ scale: 0.95 }}
//                     >
//                       Cancel
//                     </motion.button> */}
//                             </div>
//                           </form>
//                         )}
//                       </div>

//                       {/* Add New Address Card */}
//                       {/* <div className="border border-gray-300 bg-gray-50 p-4 rounded-lg flex items-center justify-center flex-1">
//                     {!isAdding ? (
//                       <button
//                         onClick={handleShippingAddressAddToggle}
//                         className="text-dark flex flex-col items-center justify-center gap-3 text-center"
//                       >
//                         <svg
//                           className="w-[30px]"
//                           viewBox="0 0 512 512"
//                           xmlns="http://www.w3.org/2000/svg"
//                           id="fi_2997933"
//                         >
//                           <g id="_03_Login" data-name="03 Login">
//                             <path d="m256 512a25 25 0 0 1 -25-25v-462a25 25 0 0 1 50 0v462a25 25 0 0 1 -25 25z"></path>
//                             <path d="m487 281h-462a25 25 0 0 1 0-50h462a25 25 0 0 1 0 50z"></path>
//                           </g>
//                         </svg>
//                         <span className="text-black">Add New Address</span>
//                       </button>
//                     ) : (
//                       <form onSubmit={handleFormSubmit}>
//                         <input
//                           type="text"
//                           name="name"
//                           value={formData.name}
//                           onChange={handleInputChange}
//                           placeholder="Name"
//                           required
//                           className="block w-full mb-2"
//                         />
//                         <input
//                           type="text"
//                           name="billingAddress"
//                           value={formData.billingAddress}
//                           onChange={handleInputChange}
//                           placeholder="Address"
//                           required
//                           className="block w-full mb-2"
//                         />
//                         <input
//                           type="text"
//                           name="phone"
//                           value={formData.phone}
//                           onChange={handleInputChange}
//                           placeholder="Phone"
//                           required
//                           className="block w-full mb-2"
//                         />
//                         <button type="submit" className="text-blue-500 mr-3">
//                           Add
//                         </button>
//                         <button
//                           onClick={handleShippingAddressAddToggle}
//                           className="text-gray-500"
//                         >
//                           Cancel
//                         </button>
//                       </form>
//                     )}
//                   </div> */}
//                     </div>
//                   </div>

//                   <h1 className="text-xl text-black font-bold mb-4 mt-8">
//                     Billing Address
//                   </h1>
//                   {/* Add the Material Icons link in the head */}
//                   <link
//                     href="https://fonts.googleapis.com/icon?family=Material+Icons"
//                     rel="stylesheet"
//                   />
//                   <div
//                     id="billing-section"
//                     className="bg-white shadow-md border rounded-lg p-4 my-3"
//                   >
//                     {/* Billing Address Selection */}
//                     <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4">
//                       <div className="flex items-center space-x-4 mb-4">
//                         {/* Radio Button: Add New Billing Address */}
//                         <div className="flex items-center space-x-2">
//                           <input
//                             id="same-billing-address"
//                             type="radio"
//                             name="billing-address-type"
//                             value="same"
//                             className="hidden peer"
//                             checked={isUsingSameAddress}
//                             onChange={handleRadioChange}
//                           />
//                           <label
//                             htmlFor="same-billing-address"
//                             className={
//                               "flex items-center cursor-pointer px-4 py-2 border " +
//                               (!isUsingSameAddress
//                                 ? "border-[#b88c4f]"
//                                 : "border-2 border-[#b88c4f]") +
//                               " rounded-md text-sm font-medium text-gray-700"
//                             }
//                           >
//                             <span className="material-icons mr-2">
//                               {/* check_circle */}
//                             </span>{" "}
//                             Continue with same address
//                           </label>

//                           <input
//                             id="new-billing-address"
//                             type="radio"
//                             name="billing-address-type"
//                             value="new"
//                             className="hidden peer"
//                             checked={!isUsingSameAddress}
//                             onChange={handleRadioChange}
//                           />
//                           <label
//                             htmlFor="new-billing-address"
//                             className={
//                               "flex items-center cursor-pointer px-4 py-2 border " +
//                               (isUsingSameAddress
//                                 ? "border-[#b88c4f]"
//                                 : "border-2 border-[#b88c4f]") +
//                               " rounded-md text-sm font-medium text-gray-700"
//                             }
//                           >
//                             <span className="material-icons mr-2">add</span> Add
//                             New Billing Address
//                           </label>
//                         </div>
//                       </div>
//                     </div>

//                     {/* Dynamic Address Form / Same Address */}
//                     {isUsingSameAddress ? (
//                       <>
//                         {!isBillingAddEditing ? (
//                           <>
//                             <p className=" text-black">
//                               <span className="font-bold">Name: </span>
//                               {formData.shippingname}
//                             </p>
//                             <p className="text-black">
//                               <span className="font-bold">Address: </span>
//                               {formData.shippingAddress}
//                               <br />
//                             </p>

//                             {/* <p className="text-black">
//                               <span className="font-bold">City: </span>
//                               {formData.city}
//                             </p> */}

//                             <p className="text-black">
//                               <span className="font-bold">Country: </span>
//                               {formData.shippingCountry}
//                             </p>

//                             <p className="text-black">
//                               <span className="font-bold">Phone: </span>
//                               {formData.shippingphone}
//                             </p>

//                             <div className="flex justify-between mt-3 text-black">
//                               {/* <button
//                             onClick={handleBillingAddEditToggle}
//                             className="text-blue-500 mr-3"
//                           >
//                             Edit
//                           </button> */}
//                               {/* <button className="text-red-500">Delete</button> */}
//                             </div>
//                           </>
//                         ) : (
//                           <form
//                             onSubmit={(e) => {
//                               e.preventDefault();
//                               setIsBillingAddEditing(false);
//                             }}
//                           >
//                             <input
//                               type="text"
//                               name="billingname"
//                               value={formData.billingname}
//                               onChange={handleInputChange}
//                               placeholder={
//                                 formData.billingname.length > 0
//                                   ? formData.billingname
//                                   : "Name"
//                               }
//                               required
//                               className="block w-full mb-2"
//                             />
//                             <input
//                               type="text"
//                               name="billingAddress"
//                               value={formData.billingAddress}
//                               onChange={handleInputChange}
//                               placeholder={
//                                 formData.billingAddress.length > 0
//                                   ? formData.billingAddress
//                                   : "Address"
//                               }
//                               required
//                               className="block w-full mb-2"
//                             />
//                             <input
//                               type="number"
//                               name="billingphone"
//                               value={formData.billingphone}
//                               onChange={handleInputChange}
//                               placeholder={
//                                 formData.billingphone.length > 0
//                                   ? formData.billingphone
//                                   : "Phone"
//                               }
//                               required
//                               className="block w-full mb-2"
//                             />
//                             {/* <button onClick={handleBillingAddEditToggle} className="text-blue-500 mr-3">
//                           Save
//                         </button> */}
//                             {/* <button
//                           onClick={() => setIsBillingAddEditing(false)}
//                           className="text-gray-500"
//                         >
//                           Cancel
//                         </button> */}
//                           </form>
//                         )}
//                       </>
//                     ) : (
//                       <div id="new-address-form" className="mb-5">
//                         <h3 className="text-xl text-black font-semibold mb-3">
//                           Enter New Billing Address
//                         </h3>
//                         <form
//                           onSubmit={(e) => {
//                             e.preventDefault();
//                             setIsBillingAddEditing(false);
//                           }}
//                         >
//                           <div className="mb-3">
//                             <label
//                               htmlFor="billing-name"
//                               className="block text-sm font-medium text-gray-700"
//                             >
//                               Name
//                             </label>
//                             <input
//                               type="text"
//                               id="billingname"
//                               name="billingname"
//                               // value={formData.billingname}
//                               onChange={handleInputChange}
//                               className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
//                               placeholder="Your Name"
//                               required
//                             />
//                           </div>
//                           <div className="mb-3">
//                             <label
//                               htmlFor="billingAddress"
//                               className="block text-sm font-medium text-gray-700"
//                             >
//                               Address
//                             </label>
//                             <input
//                               type="text"
//                               id="billingAddress"
//                               name="billingAddress"
//                               // value={formData.billingAddress}
//                               onChange={handleInputChange}
//                               className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
//                               placeholder="Your Address"
//                               required
//                             />
//                           </div>
//                           <div className="mb-3">
//                             <label
//                               htmlFor="billingCountry"
//                               className="block text-sm font-medium text-gray-700"
//                             >
//                               Country
//                             </label>
//                             <select
//                               name="billingCountry"
//                               value={formData.billingCountry}
//                               onChange={handleInputChange}
//                               className="block w-full mb-2"
//                               required
//                             >
//                               <option value="">Select Country</option>
//                               {countriesList.map((country: any) => (
//                                 <option
//                                   key={country.code}
//                                   value={country.code}
//                                   selected={
//                                     country.code === formData.billingCountry
//                                   }
//                                 >
//                                   {country.name}
//                                 </option>
//                               ))}
//                             </select>
//                           </div>
//                           <div className="mb-3">
//                             <label
//                               htmlFor="billing-phone"
//                               className="block text-sm font-medium text-gray-700"
//                             >
//                               Phone
//                             </label>
//                             <input
//                               type="number"
//                               id="billingphone"
//                               name="billingphone"
//                               // value={formData.billingphone}
//                               onChange={handleInputChange}
//                               className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
//                               placeholder="Your Phone Number"
//                               required
//                             />
//                           </div>
//                           {/* <button
//                         onClick={() => setIsDeliveryAddEditing(false)}
//                         className="px-4 py-2 bg-blue-600 text-white rounded-md"
//                       >
//                         <span className="material-icons mr-2">save</span> Save
//                         Address
//                       </button> */}
//                         </form>
//                       </div>
//                     )}
//                   </div>
//                 </motion.div>
//               )}

//               <div id="payment-section">
//                 {/* Payment Method Section */}
//                 <div className=" bg-white shadow-md border rounded-lg p-2 lg:p-4 my-3">
//                   <div className="mb-5">
//                     <h2 className="text-lg font-semibold mb-5">
//                       Choose Payment Method
//                     </h2>
//                     <div className="flex flex-col gap-3 h-full">
//                       {paymentMethods.map((method) => (
//                         <div
//                           key={method.id}
//                           className={`relative flex max-w-lg gap-2 leading-normal items-end p-3 rounded-lg cursor-pointer transition ${
//                             method.id === selectedPayment
//                               ? "border-2 border-primary"
//                               : "border border-primary/100"
//                           } `}
//                           onClick={() => handleSelectPayment(method.id)}
//                         >
//                           {method.icon && (
//                             <svg
//                               className="absolute top-2 right-3 w-6 h-6 text-green-500"
//                               id={method.icon}
//                               height={512}
//                               width={512}
//                               xmlns="http://www.w3.org/2000/svg"
//                             >
//                               <g clipRule="evenodd" fillRule="evenodd">
//                                 <path
//                                   d="m256 0c-141.2 0-256 114.8-256 256s114.8 256 256 256 256-114.8 256-256-114.8-256-256-256z"
//                                   fill="#4bae4f"
//                                 />
//                                 <path
//                                   d="m379.8 169.7c6.2 6.2 6.2 16.4 0 22.6l-150 150c-3.1 3.1-7.2 4.7-11.3 4.7s-8.2-1.6-11.3-4.7l-75-75c-6.2-6.2-6.2-16.4 0-22.6s16.4-6.2 22.6 0l63.7 63.7 138.7-138.7c6.2-6.3 16.4-6.3 22.6 0z"
//                                   fill="#fff"
//                                 />
//                               </g>
//                             </svg>
//                           )}
//                           <div className="flex flex-col flex-grow">
//                             <span className="leading-4 text-left text-sm mb-[10px] text-gray-900 font-semibold">
//                               {method.title}
//                             </span>
//                             <span className="leading-4 text-left mb-[10px] text-xs text-gray-900 font-semibold">
//                               {method.description}
//                             </span>
//                             <div className="leading-4 text-left text-xs text-gray-500 font-semibold">
//                               <p>{method.details}</p>
//                             </div>
//                           </div>
//                           {/* {method.icon && (
//                             <img
//                               alt={method.title}
//                               width={50}
//                               height={50}
//                               className="w-[70px] h-auto"
//                               src={method.icon}
//                               style={{ color: "transparent" }}
//                             />
//                           )} */}
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 </div>

//                 {/* Confirm Order Button */}
//                 {/* <div className="flex gap-2">
//                   {items?.length > 0 ? (
//                     <button
//                       onClick={handleFormSubmit}
//                       className="flex items-center justify-center  px-4 py-2.5 text-sm font-bold text-white transition-all border  border-[#b88c4f] duration-200 bg-[#b88c4f]  hover:text-[#b88c4f]  hover:bg-[#e4dfc9]"
//                     >
//                       {status === "loading" ? (
//                         "Loading..."
//                       ) : (
//                         <>
//                           <span className="material-icons mr-2">
//                             check_circle
//                           </span>
//                           Confirm Order
//                         </>
//                       )}
//                     </button>
//                   ) : (
//                     <button className="flex items-center justify-center w-full px-4 py-2.5 text-sm font-bold text-primary transition-all border  border-[#b88c4f] duration-200 bg-[#b88c4f] opacity-50  hover:text-[#b88c4f]  hover:bg-[#e4dfc9]">
//                       {"Place Order"}
//                     </button>
//                   )}
//                 </div> */}
//               </div>
//             </div>
//           </div>
//           {/* Cart Summary Section */}
//           <div className="w-full lg:w-1/3 ">
//             <div className="sticky top-[120px] bg-white shadow-md border rounded-lg p-4 mt-3 ">
//               <h2 className="text-2xl font-semibold mb-4 text-black">
//                 Order Summary
//               </h2>

//               {productData?.map((item: any) => {
//                 // const cardImage =
//                 //   item.item.cart_item_data?.wcpa_data?.sec_0671f4cac4b395
//                 //     ?.fields[0][0]?.value === "customized product"
//                 //     ? item.item.cart_item_data?.wcpa_data?.sec_0671f4cac4b395
//                 //         ?.fields[0][0]?.value
//                 //     : item.item.featured_image;

//                 const customImage = getCustomImage(item.item);

//                 // const wcpaData = item.item.cart_item_data?.wcpa_data;
//                 const color =
//                   (item.item.meta?.variation as Record<string, string>)[
//                     "CHOOSE COLOR"
//                   ] ||
//                   (item.item.meta?.variation as Record<string, string>)[
//                     "Metal Finish"
//                   ];

//                 return (
//                   <div
//                     key={item.item.id}
//                     className="w-full h-auto bg-white rounded overflow-x-auto mt-5"
//                   >
//                     <div className="w-full flex items-center py-2 px-0 border-b border-gray-100">
//                       {typeof customImage === "string" ? (
//                         <div
//                           className="w-[80px] flex-shrink-0 mr-2"
//                           style={{
//                             width: "82px",
//                             height: "52px",
//                             // overflow: "hidden",
//                             position: "relative",
//                           }}
//                         >
//                           <Image
//                             src={customImage ? customImage : item.imageUrl}
//                             alt={item.item.title}
//                             layout="fill"
//                             // height={250}
//                             // width={350}
//                             objectFit="cover"
//                             style={{
//                               objectPosition: "left center",
//                             }}
//                           />
//                         </div>
//                       ) : (
//                         <div className="w-[70px] flex-shrink-0 mr-2">
//                           <Image
//                             src={item.imageUrl}
//                             width={80}
//                             height={40}
//                             alt=""
//                           />
//                         </div>
//                       )}

//                       <div className="flex flex-col w-full">
//                         <a className="text-sm font-medium text-gray-700">
//                           {item.item.name}
//                         </a>
//                         <span className="text-xs text-gray-400">
//                           Variation : {color}
//                         </span>
//                         <div className="flex justify-between mt-1">
//                           <p className="text-sm font-semibold">Qty: 1</p>
//                           <p className="text-sm font-bold text-[#b88c4f]">
//                             {currency.currency_code}{" "}
//                             {formatPrice(item.item.price)}
//                           </p>
//                         </div>
//                       </div>
//                     </div>
//                     {/* Table view for product details and add-on prices */}

//                     {item.item.cart_item_data?.wcpa_data && (
//                       <CustomFields item={item.item} />
//                     )}
//                   </div>
//                 );
//               })}

//               <div className=" border-gray-200 pt-4 mt-4">
//                 <PriceSection totals={totals}  />
//                 {items?.length > 0 ? (
//                   <button
//                     onClick={handleFormSubmit}
//                     className="flex items-center justify-center w-full px-4 py-2.5 text-sm font-bold text-white transition-all border  border-[#b88c4f] duration-200 bg-[#b88c4f]  hover:text-[#b88c4f]  hover:bg-[#e4dfc9]"
//                   >
//                     {status === "loading" ? "Loading..." : "Place Order"}
//                   </button>
//                 ) : (
//                   <button className="flex items-center justify-center w-full px-4 py-2.5 text-sm font-bold text-primary transition-all border  border-[#b88c4f] duration-200 bg-[#b88c4f] opacity-50  hover:text-[#b88c4f]  hover:bg-[#e4dfc9]">
//                     {"Place Order"}
//                   </button>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
