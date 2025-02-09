// import React, { useState } from "react";
// import { toast } from "react-toastify";
// import Link from "next/link";

// type GuestCheckoutFormProps = {
//   handleGuestCheckout: (formData: { email: string; shippingphone: string }) => void;
//   guestSubmitstatus: string | undefined;
//   formData: {
//     email: string;
//     shippingphone: string;
//   };
//   handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
// };

// const GuestCheckoutForm = ({
//   handleGuestCheckout,
//   guestSubmitstatus,
//   formData,
//   handleInputChange,
// }: GuestCheckoutFormProps) => {
//   const [errors, setErrors] = useState<{ email?: string; shippingphone?: string }>({});

//   const validate = () => {
//     const newErrors: { email?: string; shippingphone?: string } = {};
//     if (!formData.email) {
//       newErrors.email = "Email is required";
//     } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
//       newErrors.email = "Invalid email address";
//     }

//     if (!formData.shippingphone) {
//       newErrors.shippingphone = "Mobile number is required";
//     } else if (
//       !/^\d+$/.test(formData.shippingphone) ||
//       formData.shippingphone.length < 10 ||
//       formData.shippingphone.length > 12
//     ) {
//       newErrors.shippingphone = "Mobile number must be between 10 and 12 digits";
//       toast.error("Mobile number must be between 10 and 12 digits");
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (validate()) {
//       handleGuestCheckout(formData);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="shadow-md border bg-white rounded-lg p-2 lg:p-4 my-3 mb-5">
//       <h1 className="text-xl font-bold mb-4">Checkout Options</h1>
//       <div className="w-full my-auto">
//         <div className="flex flex-col justify-between w-full mb-8 title-area">
//           <p>Choose how you want to proceed:</p>
//         </div>

//         <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-2">
//           <div className="flex flex-col gap-2">
//             <Link href="/login">
//               <button
//                 type="button"
//                 className="flex items-center justify-center px-9 py-2.5 text-sm font-bold text-primary border border-primary bg-white transition-all duration-200 hover:bg-secondary hover:text-primary h-[50px] w-full"
//               >
//                 Login
//               </button>
//             </Link>
//             <Link href="/register">
//               <button
//                 type="button"
//                 className="flex items-center justify-center px-9 py-2.5 text-sm font-bold text-primary border border-primary bg-white transition-all duration-200 hover:bg-secondary hover:text-primary h-[50px] w-full"
//               >
//                 Register
//               </button>
//             </Link>
//             <button
//               type="button"
//               className="flex items-center justify-center px-9 py-2.5 text-sm font-bold text-white bg-primary border border-primary transition-all duration-200 hover:bg-primary/50 hover:text-white h-[50px] w-full"
//               onClick={() => handleGuestCheckout(formData)}
//             >
//               Continue as Guest
//             </button>
//           </div>

//           <div className="col-span-2 shadow-md border bg-white rounded-lg p-2 lg:p-4 mb-3">
//             <div className="input-area mb-[30px]">
//               <div className="w-full h-full mb-3 input-com">
//                 <label
//                   className="input-label capitalize mb-2 text-qgray text-[13px] font-normal flex"
//                   htmlFor="email"
//                 >
//                   Email <span>*</span>
//                 </label>
//                 <div className="relative w-full h-full overflow-hidden border input-wrapper border-qgray-border">
//                   <input
//                     type="email"
//                     name="email"
//                     value={formData.email}
//                     placeholder="Enter your email"
//                     className="input-field placeholder:text-sm text-sm px-6 text-dark-gray w-full font-normal bg-white focus:ring-0 focus:outline-none h-[50px]"
//                     onChange={handleInputChange}
//                   />
//                 </div>
//                 {errors.email && <div className="text-error text-xs">{errors.email}</div>}
//               </div>

//               <div className="w-full h-full mb-3 input-com">
//                 <label
//                   className="input-label capitalize mb-2 text-qgray text-[13px] font-normal flex"
//                   htmlFor="shippingphone"
//                 >
//                   Mobile Number <span>*</span>
//                 </label>
//                 <div className="relative w-full h-full overflow-hidden border input-wrapper border-qgray-border">
//                   <input
//                     type="text"
//                     name="shippingphone"
//                     value={formData.shippingphone}
//                     placeholder="Enter your mobile number"
//                     className="input-field placeholder:text-sm text-sm px-6 text-dark-gray w-full font-normal bg-white focus:ring-0 focus:outline-none h-[50px]"
//                     onChange={handleInputChange}
//                     maxLength={12}
//                   />
//                 </div>
//                 {errors.shippingphone && <div className="text-error text-xs">{errors.shippingphone}</div>}
//               </div>
//             </div>

//             <div className="flex items-center justify-end w-full gap-5">
//               <button
//                 type="submit"
//                 className="flex items-center justify-center px-4 py-2.5 text-sm font-bold text-white bg-[#b88c4f] border border-[#b88c4f] transition-all duration-200 hover:text-[#b88c4f] hover:bg-[#e4dfc9]"
//               >
//                 {guestSubmitstatus === "loading" ? "Loading..." : "Submit"}
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </form>
//   );
// };

// export default GuestCheckoutForm;


