// "use client";
// import { RootState } from "@/redux/store";
// import { updateCustomerProfile } from "@/server-api/apifunctions/apiService";
// import { useRouter } from "next/navigation";
// import React, { useState, useEffect } from "react";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";
// import { toast } from "react-toastify";
// import { useSelector } from "react-redux";
// import countriesList, { countries } from "@/utils/country";
// import Link from "next/link";

// export const MyAccount = () => {
//   const { displayName, email, isAuthenticated } = useSelector(
//     (state: RootState) => state.auth
//   );

//   const { customer } = useSelector((state: RootState) => state.cart);

//   const [formData, setFormData] = useState({
//     name: customer?.shipping_address?.shipping_first_name || displayName || "",
//     email: email || "",
//     phone: customer?.billing_address?.billing_phone ?? "",
//     country: customer?.shipping_address?.shipping_country ?? "",
//   });

//   const router = useRouter();

//   const [prevFormData, setPrevFormData] = useState({ ...formData });
//   const [status, setStatus] = useState<"loading" | "default">("default");

//   const validationSchema = Yup.object({
//     name: Yup.string().required("Name is required"),
//     email: Yup.string()
//       .email("Invalid email address")
//       .required("Email is required"),
//     phone: Yup.string()
//       .required("Phone number is required")
//       .min(10, "Phone number must be between 10 and 12 digits")
//       .max(12, "Phone number must be between 10 and 12 digits")
//       .matches(/^[0-9]+$/, "Phone number must be only numbers"),
//     country: Yup.string().required("Country is required"),
//   });

//   const handleSubmit = async (values: any, { setSubmitting }: any) => {
//     if (JSON.stringify(values) === JSON.stringify(prevFormData)) {
//       toast.error("No profile changes.");
//       return;
//     }
//     try {
//       setStatus("loading");
//       const response = await updateCustomerProfile(values);
//       if (response) {
//         toast.success("Profile updated successfully.");
//         setPrevFormData({ ...values });
//       }
//       setStatus("default");
//     } catch (error) {
//       toast.error("Error updating profile.");
//       setStatus("default");
//     }
//     setSubmitting(false);
//   };

//   useEffect(() => {
//     setFormData((prev) => ({
//       ...prev,
//       name: displayName || "",
//       email: email || "",
//       phone: customer?.billing_address?.billing_phone ?? "",
//       country: customer?.shipping_address?.shipping_country ?? "",
//     }));
//   }, [
//     email,
//     displayName,
//     customer?.billing_address?.billing_phone,
//     customer?.shipping_address?.shipping_country,
//   ]);

//   if (!isAuthenticated) {
//     router.push("/login");
//   }

//   return (
//     <Formik
//       initialValues={formData}
//       enableReinitialize
//       validationSchema={validationSchema}
//       onSubmit={handleSubmit}
//     >
//       {({ isSubmitting, setFieldValue }) => (
//         <Form className="2xl:px-28 xl:px-28 lg:px-15 md:px-5 sm:px-5 xs:px-5 px-3 h-auto mx-auto mt-20 mb-20 py-10 rounded-lg shadow-lg bg-white max-w-5xl">
//           <div className="flex justify-center items-center">
//             <div className="w-full max-w-4xl">
//               <h6 className="mb-2 text-2xl font-semibold text-center text-[#b88c4f]">
//                 EDIT PROFILE
//               </h6>
//               <div className="mt-3 flex justify-end items-center">
//                 <div className="flex space-x-2">
//                   <Link
//                     href="/change-password"
//                     className="flex items-center justify-center px-4 py-2.5 text-sm font-bold text-center text-[#b88c4f] border border-[#b88c4f] transition-all duration-200 hover:text-[#b88c4f] hover:bg-[#e4dfc9]"
//                   >
//                     Change Password
//                   </Link>
//                 </div>
//               </div>

//               <div className="mt-5">
//                 <div className="grid grid-cols-2 gap-5">
//                   <div className="flex flex-col">
//                     <label className="text-sm font-bold text-[#b88c4f] mb-2">
//                       Name*
//                     </label>
//                     <Field
//                       name="name"
//                       placeholder={displayName ? displayName : ""}
//                       className="border border-gray-300 rounded-md px-4 py-2.5 text-sm text-[#b88c4f] w-full focus:outline-none focus:ring-0 focus:border-[#e4dfc9]"
//                       type="text"
//                     />
//                   </div>

//                   <div className="flex flex-col">
//                     <label className="text-sm font-bold text-[#b88c4f] mb-2">
//                       Email*
//                     </label>
//                     <Field
//                       name="email"
//                       placeholder={email}
//                       className="border border-gray-300 rounded-md px-4 py-2.5 text-sm text-[#b88c4f] w-full focus:outline-none focus:ring-0 focus:border-[#e4dfc9]"
//                       type="email"
//                     />
//                     <ErrorMessage
//                       name="email"
//                       component="div"
//                       className="text-red-500 text-xs mt-1"
//                     />
//                   </div>

//                   <div className="flex flex-col">
//                     <label className="text-sm font-bold text-[#b88c4f] mb-2">
//                       Country*
//                     </label>
//                     <select
//                       name="country"
//                       className="border border-gray-300 rounded-md px-4 py-2.5 text-sm text-[#b88c4f] w-full focus:outline-none focus:ring-0 focus:border-[#e4dfc9]"
//                     >
//                       <option value="">Select Country</option>
//                       {countries.map((country) => (
//                         <option
//                           key={country.code2}
//                           value={country.code2}
//                           selected={country.code2 === formData.country}
//                         >
//                           {country.name}
//                         </option>
//                       ))}
//                     </select>
//                     <ErrorMessage
//                       name="country"
//                       component="div"
//                       className="text-red-500 text-xs mt-1"
//                     />
//                   </div>

//                   <div className="flex flex-col">
//                     <label className="text-sm font-bold text-[#b88c4f] mb-2">
//                       Phone Number*
//                     </label>
//                     <Field
//                       name="phone"
//                       placeholder={customer.billing_address.billing_phone}
//                       className="border border-gray-300 rounded-md px-4 py-2.5 text-sm text-[#b88c4f] w-full focus:outline-none focus:ring-0 focus:border-[#e4dfc9]"
//                       type="tel"
//                       minLength={10}
//                       maxLength={12}
//                       pattern="[0-9]{10,12}"
//                     />
//                     <ErrorMessage
//                       name="phone"
//                       component="div"
//                       className="text-red-500 text-xs mt-1"
//                     />
//                   </div>
//                 </div>
//               </div>

//               <div className="mt-10 flex justify-between items-center">
//                 <div className="flex space-x-2">
//                   <Link
//                     href="/account"
//                     className="flex items-center justify-center px-4 py-2.5 text-sm font-bold text-center text-[#b88c4f] border border-[#b88c4f] transition-all duration-200 hover:text-[#b88c4f] hover:bg-[#e4dfc9]"
//                   >
//                     Cancel
//                   </Link>
//                   <button
//                     type="submit"
//                     className="flex items-center justify-center px-4 py-2.5 text-sm font-bold text-white transition-all border border-[#b88c4f] duration-200 bg-[#b88c4f] hover:text-[#b88c4f] hover:bg-[#e4dfc9]"
//                     disabled={isSubmitting}
//                   >
//                     {status === "loading" ? (
//                       <div className="h-5 w-5 flex justify-center border-b-2 border-white rounded-full animate-spin"></div>
//                     ) : (
//                       <span>Update profile</span>
//                     )}
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </Form>
//       )}
//     </Formik>
//   );
// };

// export default MyAccount;

// "use client";
// import { RootState } from "@/redux/store";
// import { updateCustomerProfile } from "@/server-api/apifunctions/apiService";
// import { useRouter } from "next/navigation";
// import React, { useState, useEffect } from "react";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";
// import { toast } from "react-toastify";
// import { useSelector } from "react-redux";
// import countriesList, { countries } from "@/utils/country";
// import Link from "next/link";

// export const MyAccount = () => {
//   const { displayName, email, isAuthenticated } = useSelector(
//     (state: RootState) => state.auth
//   );

//   const { customer } = useSelector((state: RootState) => state.cart);

//   const [formData, setFormData] = useState({
//     name: customer?.shipping_address?.shipping_first_name || displayName || "",
//     email: email || "",
//     phone: customer?.billing_address?.billing_phone ?? "",
//     country: customer?.shipping_address?.shipping_country ?? "",
//   });

//   const router = useRouter();

//   const [prevFormData, setPrevFormData] = useState({ ...formData });
//   const [status, setStatus] = useState<"loading" | "default">("default");

//   const validationSchema = Yup.object({
//     name: Yup.string().required("Name is required"),
//     email: Yup.string()
//       .email("Invalid email address")
//       .required("Email is required"),
//     phone: Yup.string()
//       .required("Phone number is required")
//       .min(10, "Phone number must be between 10 and 12 digits")
//       .max(12, "Phone number must be between 10 and 12 digits")
//       .matches(/^[0-9]+$/, "Phone number must be only numbers"),
//     country: Yup.string().required("Country is required"),
//   });

//   const handleSubmit = async (values: any, { setSubmitting }: any) => {
//     if (JSON.stringify(values) === JSON.stringify(prevFormData)) {
//       toast.error("No profile changes.");
//       return;
//     }
//     try {
//       setStatus("loading");
//       const response = await updateCustomerProfile(values);
//       if (response) {
//         toast.success("Profile updated successfully.");
//         setPrevFormData({ ...values });
//       }
//       setStatus("default");
//     } catch (error) {
//       toast.error("Error updating profile.");
//       setStatus("default");
//     }
//     setSubmitting(false);
//   };

//   useEffect(() => {
//     setFormData((prev) => ({
//       ...prev,
//       name: displayName || "",
//       email: email || "",
//       phone: customer?.billing_address?.billing_phone ?? "",
//       country: customer?.shipping_address?.shipping_country ?? "",
//     }));
//   }, [
//     email,
//     displayName,
//     customer?.billing_address?.billing_phone,
//     customer?.shipping_address?.shipping_country,
//   ]);

//   if (!isAuthenticated) {
//     router.push("/login");
//   }

//   return (
//     <Formik
//       initialValues={formData}
//       enableReinitialize
//       validationSchema={validationSchema}
//       onSubmit={handleSubmit}
//     >
//       {({ isSubmitting, setFieldValue }) => (
//         <Form className="2xl:px-28 xl:px-28 lg:px-15 md:px-5 sm:px-5 xs:px-5 px-3 h-auto mx-auto mt-20 mb-20 py-10 rounded-lg shadow-lg bg-white max-w-5xl">
//           <div className="flex justify-center items-center">
//             <div className="w-full max-w-4xl">
//               <h6 className="mb-2 text-2xl font-semibold text-center text-[#b88c4f]">
//                 EDIT PROFILE
//               </h6>
//               <div className="mt-3 flex justify-end items-center">
//                 <div className="flex space-x-2">
//                   <Link
//                     href="/change-password"
//                     className="flex items-center justify-center px-4 py-2.5 text-sm font-bold text-center text-[#b88c4f] border border-[#b88c4f] transition-all duration-200 hover:text-[#b88c4f] hover:bg-[#e4dfc9]"
//                   >
//                     Change Password
//                   </Link>
//                 </div>
//               </div>

//               <div className="mt-5">
//                 <div className="grid grid-cols-2 gap-5">
//                   <div className="flex flex-col">
//                     <label className="text-sm font-bold text-[#b88c4f] mb-2">
//                       Name*
//                     </label>
//                     <Field
//                       name="name"
//                       placeholder={displayName ? displayName : ""}
//                       className="border border-gray-300 rounded-md px-4 py-2.5 text-sm text-[#b88c4f] w-full focus:outline-none focus:ring-0 focus:border-[#e4dfc9]"
//                       type="text"
//                     />
//                   </div>

//                   <div className="flex flex-col">
//                     <label className="text-sm font-bold text-[#b88c4f] mb-2">
//                       Email*
//                     </label>
//                     <Field
//                       name="email"
//                       placeholder={email}
//                       className="border border-gray-300 rounded-md px-4 py-2.5 text-sm text-[#b88c4f] w-full focus:outline-none focus:ring-0 focus:border-[#e4dfc9]"
//                       type="email"
//                     />
//                     <ErrorMessage
//                       name="email"
//                       component="div"
//                       className="text-red-500 text-xs mt-1"
//                     />
//                   </div>

//                   <div className="flex flex-col">
//                     <label className="text-sm font-bold text-[#b88c4f] mb-2">
//                       Country*
//                     </label>
//                     <select
//                       name="country"
//                       className="border border-gray-300 rounded-md px-4 py-2.5 text-sm text-[#b88c4f] w-full focus:outline-none focus:ring-0 focus:border-[#e4dfc9]"
//                     >
//                       <option value="">Select Country</option>
//                       {countries.map((country) => (
//                         <option
//                           key={country.code2}
//                           value={country.code2}
//                           selected={country.code2 === formData.country}
//                         >
//                           {country.name}
//                         </option>
//                       ))}
//                     </select>
//                     <ErrorMessage
//                       name="country"
//                       component="div"
//                       className="text-red-500 text-xs mt-1"
//                     />
//                   </div>

//                   <div className="flex flex-col">
//                     <label className="text-sm font-bold text-[#b88c4f] mb-2">
//                       Phone Number*
//                     </label>
//                     <Field
//                       name="phone"
//                       placeholder={customer.billing_address.billing_phone}
//                       className="border border-gray-300 rounded-md px-4 py-2.5 text-sm text-[#b88c4f] w-full focus:outline-none focus:ring-0 focus:border-[#e4dfc9]"
//                       type="tel"
//                       minLength={10}
//                       maxLength={12}
//                       pattern="[0-9]{10,12}"
//                     />
//                     <ErrorMessage
//                       name="phone"
//                       component="div"
//                       className="text-red-500 text-xs mt-1"
//                     />
//                   </div>
//                 </div>
//               </div>

//               <div className="mt-10 flex justify-between items-center">
//                 <div className="flex space-x-2">
//                   <Link
//                     href="/account"
//                     className="flex items-center justify-center px-4 py-2.5 text-sm font-bold text-center text-[#b88c4f] border border-[#b88c4f] transition-all duration-200 hover:text-[#b88c4f] hover:bg-[#e4dfc9]"
//                   >
//                     Cancel
//                   </Link>
//                   <button
//                     type="submit"
//                     className="flex items-center justify-center px-4 py-2.5 text-sm font-bold text-white transition-all border border-[#b88c4f] duration-200 bg-[#b88c4f] hover:text-[#b88c4f] hover:bg-[#e4dfc9]"
//                     disabled={isSubmitting}
//                   >
//                     {status === "loading" ? (
//                       <div className="h-5 w-5 flex justify-center border-b-2 border-white rounded-full animate-spin"></div>
//                     ) : (
//                       <span>Update profile</span>
//                     )}
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </Form>
//       )}
//     </Formik>
//   );
// };

// export default MyAccount;

// "use client";
// import { RootState } from "@/redux/store";
// import { updateCustomerProfile } from "@/server-api/apifunctions/apiService";
// import { useRouter } from "next/navigation";
// import React, { useState, useEffect } from "react";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";
// import { toast } from "react-toastify";
// import { useSelector } from "react-redux";
// import countriesList, { countries } from "@/utils/country";
// import Link from "next/link";

// export const MyAccount = () => {
//   const { displayName, email, isAuthenticated } = useSelector(
//     (state: RootState) => state.auth
//   );

//   const { customer } = useSelector((state: RootState) => state.cart);

//   const [formData, setFormData] = useState({
//     name: customer.shipping_address.shipping_first_name || "",
//     email: email || "",
//     phone: customer?.billing_address?.billing_phone ?? "",
//     country: customer?.shipping_address?.shipping_country ?? "",
//   });

//   const router = useRouter();

//   const [prevFormData, setPrevFormData] = useState({ ...formData });
//   const [status, setStatus] = useState<"loading" | "default">("default");

//   const validationSchema = Yup.object({
//     name: Yup.string().required("Name is required"),
//     email: Yup.string()
//       .email("Invalid email address")
//       .required("Email is required"),
//     phone: Yup.string()
//       .required("Phone number is required")
//       .min(10, "Phone number must be between 10 and 12 digits")
//       .max(12, "Phone number must be between 10 and 12 digits")
//       .matches(/^[0-9]+$/, "Phone number must be only numbers"),
//     country: Yup.string().required("Country is required"),
//   });

//   const handleSubmit = async (values: any, { setSubmitting }: any) => {
//     if (JSON.stringify(values) === JSON.stringify(prevFormData)) {
//       toast.error("No profile changes.");
//       return;
//     }
//     try {
//       setStatus("loading");
//       const response = await updateCustomerProfile(values);
//       if (response) {
//         toast.success("Profile updated successfully.");
//         setPrevFormData({ ...values });
//       }
//       setStatus("default");
//     } catch (error) {
//       toast.error("Error updating profile.");
//       setStatus("default");
//     }
//     setSubmitting(false);
//   };

//   useEffect(() => {
//     setFormData((prev) => ({
//       ...prev,
//       name: customer?.shipping_address?.shipping_first_name || "",
//       email: email || "",
//       phone: customer?.billing_address?.billing_phone ?? "",
//       country: customer?.shipping_address?.shipping_country ?? "",
//     }));
//   }, [
//     email,
//     displayName,
//     customer?.billing_address?.billing_phone,
//     customer?.shipping_address?.shipping_country,
//   ]);

//   if (!isAuthenticated) {
//     router.push("/login");
//   }

//   return (
//     <Formik
//       initialValues={formData}
//       enableReinitialize
//       validationSchema={validationSchema}
//       onSubmit={handleSubmit}
//     >
//       {({ isSubmitting, setFieldValue }) => (
//         <Form className="2xl:px-28 xl:px-28 lg:px-15 md:px-5 sm:px-5 xs:px-5 px-3 h-auto mx-auto mt-20 mb-20 py-10 rounded-lg shadow-lg bg-white max-w-5xl">
//           <div className="flex justify-center items-center">
//             <div className="w-full max-w-4xl">
//               <h6 className="mb-2 text-2xl font-semibold text-center text-[#b88c4f]">
//                 EDIT PROFILE
//               </h6>
//               <div className="mt-3 flex justify-end items-center">
//                 <div className="flex space-x-2">
//                   <Link
//                     href="/change-password"
//                     className="flex items-center justify-center px-4 py-2.5 text-sm font-bold text-center text-[#b88c4f] border border-[#b88c4f] transition-all duration-200 hover:text-[#b88c4f] hover:bg-[#e4dfc9]"
//                   >
//                     Change Password
//                   </Link>
//                 </div>
//               </div>

//               <div className="mt-5">
//                 <div className="grid grid-cols-2 gap-5">
//                   <div className="flex flex-col">
//                     <label className="text-sm font-bold text-[#b88c4f] mb-2">
//                       Name*
//                     </label>
//                     <Field
//                       name="name"
//                       placeholder={customer.shipping_address.shipping_first_name ? customer.shipping_address.shipping_first_name : ""}
//                       className="border border-gray-300 rounded-md px-4 py-2.5 text-sm text-[#b88c4f] w-full focus:outline-none focus:ring-0 focus:border-[#e4dfc9]"
//                       type="text"
//                     />
//                     <ErrorMessage
//                       name="name"
//                       component="div"
//                       className="text-red-500 text-xs mt-1"
//                     />
//                   </div>

//                   <div className="flex flex-col">
//                     <label className="text-sm font-bold text-[#b88c4f] mb-2">
//                       Email*
//                     </label>
//                     <Field
//                       name="email"
//                       placeholder={email}
//                       className="border border-gray-300 rounded-md px-4 py-2.5 text-sm text-[#b88c4f] w-full focus:outline-none focus:ring-0 focus:border-[#e4dfc9]"
//                       type="email"
//                     />
//                     <ErrorMessage
//                       name="email"
//                       component="div"
//                       className="text-red-500 text-xs mt-1"
//                     />
//                   </div>

//                   <div className="flex flex-col">
//                     <label className="text-sm font-bold text-[#b88c4f] mb-2">
//                       Country*
//                     </label>
//                     <select
//                       name="country"
//                       className="border border-gray-300 rounded-md px-4 py-2.5 text-sm text-[#b88c4f] w-full focus:outline-none focus:ring-0 focus:border-[#e4dfc9]"
//                     >
//                       <option value="">Select Country</option>
//                       {countries.map((country) => (
//                         <option
//                           key={country.code2}
//                           value={country.code2}
//                           selected={country.code2 === formData.country}
//                         >
//                           {country.name}
//                         </option>
//                       ))}
//                     </select>
//                     <ErrorMessage
//                       name="country"
//                       component="div"
//                       className="text-red-500 text-xs mt-1"
//                     />
//                   </div>

//                   <div className="flex flex-col">
//                     <label className="text-sm font-bold text-[#b88c4f] mb-2">
//                       Phone Number*
//                     </label>
//                     <Field
//                       name="phone"
//                       placeholder={customer.billing_address.billing_phone}
//                       className="border border-gray-300 rounded-md px-4 py-2.5 text-sm text-[#b88c4f] w-full focus:outline-none focus:ring-0 focus:border-[#e4dfc9]"
//                       type="tel"
//                       minLength={10}
//                       maxLength={12}
//                       pattern="[0-9]{10,12}"
//                     />
//                     <ErrorMessage
//                       name="phone"
//                       component="div"
//                       className="text-red-500 text-xs mt-1"
//                     />
//                   </div>
//                 </div>
//               </div>

//               <div className="mt-10 flex justify-between items-center">
//                 <div className="flex space-x-2">
//                   <Link
//                     href="/account"
//                     className="flex items-center justify-center px-4 py-2.5 text-sm font-bold text-center text-[#b88c4f] border border-[#b88c4f] transition-all duration-200 hover:text-[#b88c4f] hover:bg-[#e4dfc9]"
//                   >
//                     Cancel
//                   </Link>
//                   <button
//                     type="submit"
//                     className="flex items-center justify-center px-4 py-2.5 text-sm font-bold text-white transition-all border border-[#b88c4f] duration-200 bg-[#b88c4f] hover:text-[#b88c4f] hover:bg-[#e4dfc9]"
//                     disabled={isSubmitting}
//                   >
//                     {status === "loading" ? (
//                       <div className="h-5 w-5 flex justify-center border-b-2 border-white rounded-full animate-spin"></div>
//                     ) : (
//                       <span>Update profile</span>
//                     )}
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </Form>
//       )}
//     </Formik>
//   );
// };

// export default MyAccount;


"use client";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchCartApi, updateCustomerProfile } from "@/server-api/apifunctions/apiService";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import countriesList, { countries } from "@/helper/country";
import Link from "next/link";
import { fetchCartData } from "@/redux/store/cart";

export const MyAccount = () => {
  const { displayName, email, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );

  const dispatch: AppDispatch = useDispatch(); 

  const { customer } = useSelector((state: RootState) => state.cart);

  const [formData, setFormData] = useState({
    name: displayName || "",
    email: email || "",
    phone: customer?.billing_address?.billing_phone ?? "",
    country: customer?.shipping_address?.shipping_country ?? "",
  });

  const router = useRouter();
  const [prevFormData, setPrevFormData] = useState({ ...formData });
  const [status, setStatus] = useState<"loading" | "default">("default");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }
    if (!formData.phone) {
      newErrors.phone = "Phone number is required";
    } else if (
      formData.phone.length < 10 ||
      formData.phone.length > 12 ||
      !/^[0-9]+$/.test(formData.phone)
    ) {
      newErrors.phone = "Phone number must be between 10 and 12 digits and only numbers";
    }
    if (!formData.country) newErrors.country = "Country is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    if (JSON.stringify(formData) === JSON.stringify(prevFormData)) {
      toast.error("No profile changes.");
      return;
    }
    try {
      setStatus("loading");
      const response = await updateCustomerProfile(formData);
      if (response) {
        toast.success("Profile updated successfully.");
        dispatch(fetchCartData());
        setPrevFormData({ ...formData });
      }
      setStatus("default");
    }catch (error: any) {
  
      const errorMessage = error?.message || "An unknown error occurred";
      toast.error(errorMessage); 
      setStatus("default");
    }
  };

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      name: displayName || "",
      email: email || "",
      phone: customer?.billing_address?.billing_phone ?? "",
      country: customer?.shipping_address?.shipping_country ?? "",
    }));
  }, [
    email,
    displayName,
    customer?.billing_address?.billing_phone,
    customer?.shipping_address?.shipping_country,
  ]);

  if (!isAuthenticated) {
    router.push("/login");
  }

  return (
    <div className="pages">

    <form onSubmit={handleSubmit} className="2xl:px-28 xl:px-28 lg:px-15 md:px-10 sm:px-10 xs:px-5 px-3 h-auto mx-auto md:mt-20 mb-20 py-10 rounded-lg shadow-lg bg-white max-w-5xl">
      <div className="flex justify-center items-center">
        <div className="w-full max-w-4xl">
          <h6 className="mb-2 text-2xl font-semibold text-center text-[#b88c4f]">
            EDIT PROFILE
          </h6>
          <div className="mt-3 flex justify-end items-center">
            <div className="flex space-x-2">
              <Link
                href="/change-password"
                className="flex items-center justify-center px-4 py-2.5 text-sm font-bold text-center text-[#b88c4f] border border-[#b88c4f] transition-all duration-200 hover:text-[#b88c4f] hover:bg-[#e4dfc9]"
              >
                Change Password
              </Link>
            </div>
          </div>

          <div className="mt-5">
            <div className="grid md:grid-cols-2 gap-5">
              <div className="flex flex-col">
                <label className="text-sm font-bold text-[#b88c4f] mb-2">
                  Name*
                </label>
                <input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="border border-gray-300 rounded-md px-4 py-2.5 text-sm text-[#b88c4f] w-full focus:outline-none focus:ring-0 focus:border-[#e4dfc9]"
                  type="text"
                  disabled
                />
                {errors.name && <div className="text-red-500 text-xs mt-1">{errors.name}</div>}
              </div>

              <div className="flex flex-col">
                <label className="text-sm font-bold text-[#b88c4f] mb-2">
                  Email* <span className="text-[11px]">(Your email changes will be reflected in your next login)</span>
                </label>
                <input
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="border border-gray-300 rounded-md px-4 py-2.5 text-sm text-[#b88c4f] w-full focus:outline-none focus:ring-0 focus:border-[#e4dfc9]"
                  type="email"
                />
                {errors.email && <div className="text-red-500 text-xs mt-1">{errors.email}</div>}
              </div>

              <div className="flex flex-col">
                <label className="text-sm font-bold text-[#b88c4f] mb-2">
                  Country*
                </label>
                <select
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  className="border border-gray-300 rounded-md px-4 py-2.5 text-sm text-[#b88c4f] w-full focus:outline-none focus:ring-0 focus:border-[#e4dfc9]"
                >
                  <option value="">Select Country</option>
                  {countries.map((country) => (
                    <option key={country.code2} value={country.code2}>
                      {country.name}
                    </option>
                  ))}
                </select>
                {errors.country && <div className="text-red-500 text-xs mt-1">{errors.country}</div>}
              </div>

              <div className="flex flex-col">
                <label className="text-sm font-bold text-[#b88c4f] mb-2">
                  Phone Number*
                </label>
                <input
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="border border-gray-300 rounded-md px-4 py-2.5 text-sm text-[#b88c4f] w-full focus:outline-none focus:ring-0 focus:border-[#e4dfc9]"
                  type="tel"
                  minLength={10}
                  maxLength={12}
                  pattern="[0-9]{10,12}"
                />
                {errors.phone && <div className="text-red-500 text-xs mt-1">{errors.phone}</div>}
              </div>
            </div>
          </div>

          <div className="mt-10 flex justify-between items-center">
            <div className="flex space-x-2">
              {/* <Link
                href="/account"
                className="flex items-center justify-center px-4 py-2.5 text-sm font-bold text-center text-[#b88c4f] border border-[#b88c4f] transition-all duration-200 hover:text-[#b88c4f] hover:bg-[#e4dfc9]"
              >
                Cancel
              </Link> */}
              <button
                type="submit"
                className="flex items-center justify-center px-4 py-2.5 text-sm font-bold text-white transition-all border border-[#b88c4f] duration-200 bg-[#b88c4f] hover:text-[#b88c4f] hover:bg-[#e4dfc9]"
                disabled={status === "loading"}
              >
                {status === "loading" ? (
                  <div className="h-5 w-5 flex justify-center border-b-2 border-white rounded-full animate-spin"></div>
                ) : (
                  <span>Update profile</span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
    </div>

  );
};

export default MyAccount;


