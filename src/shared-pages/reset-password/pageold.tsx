// "use client";
// import React, { useLayoutEffect, useState } from "react";
// import { toast } from "react-toastify";
// import { ResetPasswordFormProps } from "@/types/auth/auth-types";
// import {useSelector } from "react-redux";
// import { useRouter } from "next/navigation";
// import Link from "next/link";
// import {
//   forgotPasswordApi,
//   setPasswordApi,
//   validateCodeApi,
// } from "@/server-api/apifunctions/apiService";
// import { RootState } from "@/redux/store";

// const ResetPassword = () => {
//   // const [loading, setLoading] = useState(false);
//   const [showEmailInput, setShowEmailInput] = useState(true);
//   const [showCodeInput, setShowCodeInput] = useState(false);
//   const [showPasswordInputs, setShowPasswordInputs] = useState(false);
//   const [status, setStatus] = useState<"loading" | "success" | "error">();

//   const router = useRouter();
//   // const dispatch: AppDispatch = useDispatch();
//   const isAuthenticated = useSelector(
//     (state: RootState) => state.auth.isAuthenticated
//   );

//   useLayoutEffect(() => {
//     if (isAuthenticated) {
//       router.push("/");
//     }
//   }, [isAuthenticated, router]);

//   const initialValues: ResetPasswordFormProps = {
//     email: "",
//     newPassword: "",
//     reenteredPassword: "",
//     // code: "",
//   };

//   const [formData, setFormData] =
//     useState<ResetPasswordFormProps>(initialValues);

//   const handleForgotPassword = async (email: string) => {
//     try {
//       setStatus("loading");
//       const res = await forgotPasswordApi(email);
//       if (res.data) {
//         setShowEmailInput(false);
//         setShowCodeInput(true);
//         setStatus("success");
//         toast.success("Check your email for the reset code.");
//       } else {
//         toast.error(res.data?.message);
//         setStatus("error");
//       }
//     } catch (err: unknown) {
//       console.error(err);
//       toast.error(
//         (err as { response: { data: { message: string } } }).response.data
//           .message
//       );
//       setStatus("error");
//     }
//   };

//   // const handleValidateCode = async (values: ResetPasswordFormProps) => {
//   //   try {
//   //     setStatus("loading");
//   //     const validateRes = await validateCodeApi(values.email, values.code);
//   //     if (validateRes.data.success) {
//   //       setShowCodeInput(false);
//   //       setShowPasswordInputs(true);
//   //       setStatus("success");
//   //       toast.success("Code validated. Enter your new password.");
//   //     } else {
//   //       setStatus("error");
//   //       toast.error(validateRes.data.message);
//   //     }
//   //   } catch (err: unknown) {
//   //     console.error(err);
//   //     toast.error(
//   //       (err as { response: { data: { message: string } } }).response.data
//   //         .message
//   //     );
//   //     setStatus("error");
//   //   }
//   // };

//   const handleSetPassword = async (values: ResetPasswordFormProps) => {
//     if (values.newPassword !== values.reenteredPassword) {
//       toast.error("Passwords do not match");
//       return;
//     }
//     try {
//       setStatus("loading");
//       const setPasswordRes = await setPasswordApi(
//         values.email,
//         values.newPassword,
//         values.code
//       );
//       if (setPasswordRes.data.success) {
//         setStatus("success");
//         toast.success("Password reset successful. Redirecting to login...");
//         router.push("/login");
//       } else {
//         toast.error(setPasswordRes.data.message);
//         setStatus("error");
//       }
//     } catch (err: unknown) {
//       console.error(err);
//       toast.error(
//         (err as { response: { data: { message: string } } }).response.data
//           .message
//       );
//       setStatus("error");
//     }
//   };

//   const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     if (showEmailInput) {
//       await handleForgotPassword(formData.email);
//     } else if (showCodeInput) {
//       await handleValidateCode(formData);
//     } else if (showPasswordInputs) {
//       await handleSetPassword(formData);
//     }
//   };

//   return (
//     <section
//       className="p-24"
//       style={{
//         backgroundImage: "url('/assets/img/sec-bg.png')",
//         backgroundSize: "4500px",
//         backgroundPosition: "center",
//       }}
//     >
//       <div className="container mx-auto px-4 md:px-6 lg:px-8">
//         <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-xl mx-auto border border-gray-300 text-black">
//           <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">
//             Reset Password
//           </h2>
//           <p className="text-gray-700 mb-6 text-center">
//             {showEmailInput
//               ? "Enter your email to receive a reset code."
//               : showPasswordInputs
//               ? "Enter your new password."
//               : "Enter the code sent to your email."}
//           </p>

//           <form onSubmit={handleSubmit}>
//             {showEmailInput && (
//               <>
//                 <div className="mb-4">
//                   <label className="block text-gray-800 font-semibold">
//                     Email *
//                   </label>
//                   <input
//                     type="email"
//                     name="email"
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b88c4f] focus:border-[#b88c4f]"
//                     placeholder="Enter your email"
//                     value={formData.email}
//                     onChange={(e) =>
//                       setFormData({ ...formData, email: e.target.value })
//                     }
//                   />
//                 </div>
//                 <button
//                   type="submit"
//                   // disabled={loading}
//                   className="w-full bg-[#b88c4f] text-white py-3 rounded-lg font-semibold hover:bg-[#a07d44] transition"
//                 >
//                   {status === "loading" ? "Loading..." : "Send"}
//                 </button>
//               </>
//             )}

//             {showCodeInput && (
//               <>
//                 <div className="mb-4">
//                   <label className="block text-gray-800 font-semibold">
//                     Enter Code *
//                   </label>
//                   <input
//                     type="text"
//                     name="code"
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b88c4f] focus:border-[#b88c4f]"
//                     placeholder="Enter the code sent to your email"
//                     value={formData.code}
//                     onChange={(e) =>
//                       setFormData({ ...formData, code: e.target.value })
//                     }
//                   />
//                 </div>
//                 <button
//                   type="submit"
//                   // disabled={loading}
//                   className="w-full bg-[#b88c4f] text-white py-3 rounded-lg font-semibold hover:bg-[#a07d44] transition"
//                 >
//                   {status === "loading" ? "Loading..." : "Validate Code"}
//                 </button>
//               </>
//             )}

//             {showPasswordInputs && (
//               <>
//                 <div className="mb-4">
//                   <label className="block text-gray-800 font-semibold">
//                     New Password *
//                   </label>
//                   <input
//                     type="password"
//                     name="newPassword"
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b88c4f] focus:border-[#b88c4f]"
//                     placeholder="Enter new password"
//                     value={formData.newPassword}
//                     onChange={(e) =>
//                       setFormData({ ...formData, newPassword: e.target.value })
//                     }
//                   />
//                 </div>
//                 <div className="mb-4">
//                   <label className="block text-gray-800 font-semibold">
//                     Re-enter New Password *
//                   </label>
//                   <input
//                     type="password"
//                     name="reenteredPassword"
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b88c4f] focus:border-[#b88c4f]"
//                     placeholder="Re-enter new password"
//                     value={formData.reenteredPassword}
//                     onChange={(e) =>
//                       setFormData({
//                         ...formData,
//                         reenteredPassword: e.target.value,
//                       })
//                     }
//                   />
//                 </div>
//                 <button
//                   type="submit"
//                   // disabled={loading}
//                   className="w-full bg-[#b88c4f] text-white py-3 rounded-lg font-semibold hover:bg-[#a07d44] transition"
//                 >
//                   {status === "loading" ? "Loading..." : "Save"}
//                 </button>
//               </>
//             )}
//           </form>
//           <div className="mt-4 text-center">
//             <p className="text-gray-700">
//               Don&apos;t have an account?{" "}
//               <Link href="register" className="text-[#b88c4f] hover:underline">
//                 Sign up
//               </Link>
//             </p>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ResetPassword;
