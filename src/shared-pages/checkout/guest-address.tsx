// import countriesList from "@/utils/country";
// import React from "react";
// import { motion } from "framer-motion";

// interface GuestAddressFormProps {
//   isGuestDeliveryAddressAdded: boolean;
//   toggleDeliveryAddressModal: () => void;
//   isDeliveryAddressModalOpen: boolean;
//   handleGuestAddressSubmit: (e: any) => void;
//   formData: any;
//   handleInputChange: any;
//   isGuestDeliveryAddressAddedStatus: string | undefined;
//   isDeliveryAddEditing: boolean;
//   handleDeliveryAddEditToggle: () => void;
//   isGuestBillingAddressAdded: boolean;
//   isBillingAddressModalOpen: boolean;
//   handleBillingAddressSubmit: (e: any) => void;
//   toggleBillingAddressModal: () => void;
//   isUsingSameAddress: boolean;
//   handleRadioChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
//   isBillingAddEditing: boolean;
//   setIsBillingAddEditing: (v: boolean) => void;
//   setIsDeliveryAddEditing: (v: boolean) => void;
// }

// const GuestAddressForm: React.FC<GuestAddressFormProps> = ({
//   isGuestDeliveryAddressAdded,
//   toggleDeliveryAddressModal,
//   isDeliveryAddressModalOpen,
//   handleGuestAddressSubmit,
//   formData,
//   handleInputChange,
//   isGuestDeliveryAddressAddedStatus,
//   isDeliveryAddEditing,
//   handleDeliveryAddEditToggle,
//   isGuestBillingAddressAdded,
//   isBillingAddressModalOpen,
//   handleBillingAddressSubmit,
//   toggleBillingAddressModal,
//   isUsingSameAddress,
//   handleRadioChange,
//   isBillingAddEditing,
//   setIsBillingAddEditing,
//   setIsDeliveryAddEditing,
// }) => {
//   return (
//     <>
//       <h1 className="text-xl font-bold mb-4 text-black">Delivery Address</h1>
//       {/* Delivery Address */}
//       <div
//         id="delivery-section"
//         className="bg-white shadow-md border rounded-lg p-4 my-3 lg:p-4 "
//       >
//         <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4 mb-5">
//           {/* Default Address Card */}

//           {!isGuestDeliveryAddressAdded && !isGuestBillingAddressAdded && (
//             <motion.div
//               className="border border-gray-300 bg-gray-50 py-20 rounded-lg flex items-center justify-center flex-1"
//               initial={{ opacity: 0, scale: 0.9 }}
//               animate={{ opacity: 1, scale: 1 }}
//               transition={{ duration: 0.3 }}
//             >
//               <motion.button
//                 onClick={toggleDeliveryAddressModal}
//                 className="text-dark flex flex-col items-center justify-center gap-3 text-center"
//                 whileHover={{ scale: 1.1 }}
//                 whileTap={{ scale: 0.95 }}
//               >
//                 <svg
//                   className="w-[30px]"
//                   viewBox="0 0 512 512"
//                   xmlns="http://www.w3.org/2000/svg"
//                   id="fi_2997933"
//                 >
//                   <g id="_03_Login" data-name="03 Login">
//                     <path d="m256 512a25 25 0 0 1 -25-25v-462a25 25 0 0 1 50 0v462a25 25 0 0 1 -25 25z"></path>
//                     <path d="m487 281h-462a25 25 0 0 1 0-50h462a25 25 0 0 1 0 50z"></path>
//                   </g>
//                 </svg>
//                 <span className="text-black">Add New Address</span>
//               </motion.button>

//               {isDeliveryAddressModalOpen && (
//                 <motion.div
//                   className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   exit={{ opacity: 0 }}
//                   transition={{ duration: 0.3 }}
//                 >
//                   <motion.div
//                     className="bg-white w-full max-w-lg p-6 rounded-lg shadow-lg"
//                     initial={{ y: -50, opacity: 0 }}
//                     animate={{ y: 0, opacity: 1 }}
//                     transition={{ duration: 0.3 }}
//                   >
//                     <h2 className="text-2xl font-bold mb-4">Add New Address</h2>
//                     <form onSubmit={handleGuestAddressSubmit}>
//                       {/* Name Input */}
//                       <div className="mb-4">
//                         <label
//                           htmlFor="name"
//                           className="block font-medium mb-2"
//                         >
//                           Name
//                         </label>
//                         <input
//                           type="text"
//                           name="shippingname"
//                           value={formData.shippingname}
//                           onChange={handleInputChange}
//                           placeholder="Enter your name"
//                           className="block w-full border rounded-lg px-4 py-2"
//                         />
//                       </div>

//                       {/* Address Input */}
//                       <div className="mb-4">
//                         <label
//                           htmlFor="shippingAddress"
//                           className="block font-medium mb-2"
//                         >
//                           Address
//                         </label>
//                         <textarea
//                           rows={4}
//                           cols={3}
//                           name="shippingAddress"
//                           value={formData.shippingAddress}
//                           onChange={handleInputChange}
//                           placeholder="Enter your address"
//                           className="block w-full border rounded-lg px-4 py-2"
//                         />
//                       </div>

//                       {/* Phone Input */}
//                       <div className="mb-4">
//                         <label
//                           htmlFor="shippingphone"
//                           className="block font-medium mb-2"
//                         >
//                           Phone
//                         </label>
//                         <input
//                           type="text"
//                           name="shippingphone"
//                           value={formData.shippingphone}
//                           onChange={handleInputChange}
//                           placeholder="Enter your phone number"
//                           className="block w-full border rounded-lg px-4 py-2"
//                           maxLength={12}
//                         />
//                       </div>

//                       {/* Country Select */}
//                       <div className="mb-4">
//                         <label
//                           htmlFor="shippingCountry"
//                           className="block font-medium mb-2"
//                         >
//                           Country
//                         </label>
//                         <select
//                           name="shippingCountry"
//                           value={formData.shippingCountry}
//                           onChange={handleInputChange}
//                           className="block w-full border rounded-lg px-4 py-2"
//                         >
//                           <option value="">Select Country</option>
//                           {countriesList.map((country: any) => (
//                             <option key={country.code} value={country.code}>
//                               {country.name}
//                             </option>
//                           ))}
//                         </select>
//                       </div>

//                       {/* Form Actions */}
//                       <div className="flex justify-end space-x-4">
//                         <motion.button
//                           type="button"
//                           onClick={toggleDeliveryAddressModal}
//                           className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300"
//                           whileHover={{ scale: 1.05 }}
//                           whileTap={{ scale: 0.95 }}
//                         >
//                           Cancel
//                         </motion.button>
//                         <motion.button
//                           type="submit"
//                           className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark"
//                           whileHover={{ scale: 1.05 }}
//                           whileTap={{ scale: 0.95 }}
//                         >
//                           {isGuestDeliveryAddressAddedStatus === "loading" ? (
//                             <div className="h-5 w-5 flex justify-center border-b-2 border-white rounded-full animate-spin"></div>
//                           ) : (
//                             <span>Save Address</span>
//                           )}
//                         </motion.button>
//                       </div>
//                     </form>
//                   </motion.div>
//                 </motion.div>
//               )}
//             </motion.div>
//           )}

//           {(isGuestDeliveryAddressAdded || isGuestBillingAddressAdded) && (
//             <motion.div
//               className="border border-primary p-6 rounded-lg flex-1 shadow-lg bg-white"
//               initial={{ opacity: 0, y: -20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.3 }}
//             >
//               <div className="flex items-center gap-3 bg-green-100 py-2 px-4 mb-4 rounded-md shadow-sm">
//                 <svg
//                   className="w-[20px] h-[20px] text-green-600"
//                   viewBox="0 0 512 512"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <g clipRule="evenodd" fillRule="evenodd">
//                     <path
//                       d="m256 0c-141.2 0-256 114.8-256 256s114.8 256 256 256 256-114.8 256-256-114.8-256-256-256z"
//                       fill="#4bae4f"
//                     />
//                     <path
//                       d="m379.8 169.7c6.2 6.2 6.2 16.4 0 22.6l-150 150c-3.1 3.1-7.2 4.7-11.3 4.7s-8.2-1.6-11.3-4.7l-75-75c-6.2-6.2-6.2-16.4 0-22.6s16.4-6.2 22.6 0l63.7 63.7 138.7-138.7c6.2-6.3 16.4-6.3 22.6 0z"
//                       fill="#fff"
//                     />
//                   </g>
//                 </svg>
//                 <p className="text-green-700 font-medium">Address</p>
//               </div>

//               {!isDeliveryAddEditing ? (
//                 <>
//                   <p className="text-gray-700">
//                     <span className="font-bold">Name: </span>
//                     {formData.shippingname}
//                   </p>
//                   <p className="text-gray-700">
//                     <span className="font-bold">Address: </span>
//                     {formData.shippingAddress}
//                   </p>
//                   <p className="text-gray-700">
//                     <span className="font-bold">Country: </span>
//                     {formData.shippingCountry}
//                   </p>
//                   <p className="text-gray-700">
//                     <span className="font-bold">Phone: </span>
//                     {formData.shippingphone}
//                   </p>
//                   <div className="flex justify-end mt-4">
//                     <motion.button
//                       onClick={handleDeliveryAddEditToggle}
//                       className="text-primary font-medium "
//                       whileHover={{ scale: 1.1 }}
//                       whileTap={{ scale: 0.95 }}
//                     >
//                       Edit
//                     </motion.button>
//                   </div>
//                 </>
//               ) : (
//                 <form onSubmit={() => setIsDeliveryAddEditing(false)}>
//                   <motion.div
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     className="space-y-4"
//                   >
//                     <input
//                       type="text"
//                       name="shippingname"
//                       value={formData.shippingname}
//                       onChange={handleInputChange}
//                       placeholder="Name"
//                       required
//                       className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
//                     />
//                     <input
//                       type="text"
//                       name="shippingAddress"
//                       value={formData.shippingAddress}
//                       onChange={handleInputChange}
//                       placeholder="Address"
//                       required
//                       className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
//                     />
//                     <select
//                       name="shippingCountry"
//                       value={formData.shippingCountry}
//                       onChange={handleInputChange}
//                       required
//                       className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
//                     >
//                       <option value="">Select Country</option>
//                       {countriesList.map((country) => (
//                         <option key={country.code} value={country.code}>
//                           {country.name}
//                         </option>
//                       ))}
//                     </select>
//                     <input
//                       type="number"
//                       name="shippingphone"
//                       value={formData.shippingphone}
//                       onChange={handleInputChange}
//                       placeholder="Phone"
//                       maxLength={12}
//                       required
//                       className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
//                     />
//                   </motion.div>
//                   <div className="flex justify-end mt-4 gap-3">
//                     <motion.button
//                       type="submit"
//                       className="px-4 py-2 bg-primary text-white rounded-md shadow-md hover:bg-primary/80"
//                       whileHover={{ scale: 1.05 }}
//                       whileTap={{ scale: 0.95 }}
//                     >
//                       Save
//                     </motion.button>
//                     {/* <motion.button
//                       onClick={() => setIsDeliveryAddEditing(false)}
//                       className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md shadow-md hover:bg-gray-400"
//                       whileHover={{ scale: 1.05 }}
//                       whileTap={{ scale: 0.95 }}
//                     >
//                       Cancel
//                     </motion.button> */}
//                   </div>
//                 </form>
//               )}
//             </motion.div>
//           )}
//         </div>
//       </div>

//       <h1 className="text-xl text-black font-bold mb-4 mt-8">
//         Billing Address
//       </h1>
//       {/* Add the Material Icons link in the head */}
//       <link
//         href="https://fonts.googleapis.com/icon?family=Material+Icons"
//         rel="stylesheet"
//       />

//       {!isGuestDeliveryAddressAdded && !isGuestBillingAddressAdded ? (
//         <>
//           <div className="border border-gray-300 bg-gray-50 py-20 rounded-lg flex items-center justify-center flex-1">
//             <button
//               onClick={toggleBillingAddressModal}
//               className="text-dark flex flex-col items-center justify-center gap-3 text-center"
//             >
//               <svg
//                 className="w-[30px]"
//                 viewBox="0 0 512 512"
//                 xmlns="http://www.w3.org/2000/svg"
//                 id="fi_2997933"
//               >
//                 <g id="_03_Login" data-name="03 Login">
//                   <path d="m256 512a25 25 0 0 1 -25-25v-462a25 25 0 0 1 50 0v462a25 25 0 0 1 -25 25z"></path>
//                   <path d="m487 281h-462a25 25 0 0 1 0-50h462a25 25 0 0 1 0 50z"></path>
//                 </g>
//               </svg>
//               <span className="text-black">Add New Address</span>
//             </button>

//             {isBillingAddressModalOpen && (
//               <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//                 <div className="bg-white w-full max-w-lg p-6 rounded-lg shadow-lg">
//                   <h2 className="text-2xl font-bold mb-4">Add New Address</h2>
//                   <form onSubmit={handleBillingAddressSubmit}>
//                     {/* Name Input */}
//                     <div className="mb-4">
//                       <label htmlFor="name" className="block font-medium mb-2">
//                         Name
//                       </label>
//                       <input
//                         type="text"
//                         name="shippingname"
//                         value={formData.shippingname}
//                         onChange={handleInputChange}
//                         placeholder="Enter your name"
//                         className="block w-full border rounded-lg px-4 py-2"
//                       />
//                     </div>

//                     {/* Address Input */}
//                     <div className="mb-4">
//                       <label
//                         htmlFor="shippingAddress"
//                         className="block font-medium mb-2"
//                       >
//                         Address
//                       </label>
//                       <textarea
//                         rows={4}
//                         cols={3}
//                         name="shippingAddress"
//                         value={formData.shippingAddress}
//                         onChange={handleInputChange}
//                         placeholder="Enter your address"
//                         className="block w-full border rounded-lg px-4 py-2"
//                       />
//                     </div>

//                     {/* Phone Input */}
//                     <div className="mb-4">
//                       <label
//                         htmlFor="shippingphone"
//                         className="block font-medium mb-2"
//                       >
//                         Phone
//                       </label>
//                       <input
//                         type="text"
//                         name="shippingphone"
//                         value={formData.shippingphone}
//                         onChange={handleInputChange}
//                         placeholder="Enter your phone number"
//                         className="block w-full border rounded-lg px-4 py-2"
//                         maxLength={12}
//                       />
//                     </div>

//                     {/* Country Select */}
//                     <div className="mb-4">
//                       <label
//                         htmlFor="shippingCountry"
//                         className="block font-medium mb-2"
//                       >
//                         Country
//                       </label>
//                       <select
//                         name="shippingCountry"
//                         value={formData.shippingCountry}
//                         onChange={handleInputChange}
//                         className="block w-full mb-2"
//                         required
//                       >
//                         <option value="">Select Country</option>
//                         {countriesList.map((country: any) => (
//                           <option
//                             key={country.code}
//                             value={country.code}
//                             selected={country.code === formData.shippingCountry}
//                           >
//                             {country.name}
//                           </option>
//                         ))}
//                       </select>
//                     </div>

//                     {/* Form Actions */}
//                     <div className="flex justify-end space-x-4">
//                       <button
//                         type="button"
//                         onClick={toggleBillingAddressModal}
//                         className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300"
//                       >
//                         Cancel
//                       </button>
//                       <button
//                         type="submit"
//                         className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark"
//                       >
//                         {isGuestDeliveryAddressAddedStatus === "loading" ? (
//                           <div className="h-5 w-5 flex justify-center border-b-2 border-white rounded-full animate-spin"></div>
//                         ) : (
//                           <span>Save Address</span>
//                         )}
//                       </button>
//                     </div>
//                   </form>
//                 </div>
//               </div>
//             )}
//           </div>
//         </>
//       ) : (
//         <div
//           id="billing-section"
//           className="bg-white shadow-md border rounded-lg p-4 my-3"
//         >
//           {/* Billing Address Selection */}
//           <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4">
//             <div className="flex items-center space-x-4 mb-4">
//               {/* Radio Button: Add New Billing Address */}
//               <div className="flex items-center space-x-2">
//                 <input
//                   id="same-billing-address"
//                   type="radio"
//                   name="billing-address-type"
//                   value="same"
//                   className="hidden peer"
//                   checked={isUsingSameAddress}
//                   onChange={handleRadioChange}
//                 />
//                 <label
//                   htmlFor="same-billing-address"
//                   className={
//                     "flex items-center cursor-pointer px-4 py-2 border " +
//                     (!isUsingSameAddress
//                       ? "border-[#b88c4f]"
//                       : "border-2 border-[#b88c4f]") +
//                     " rounded-md text-sm font-medium text-gray-700"
//                   }
//                 >
//                   <span className="material-icons mr-2">
//                     {/* check_circle */}
//                   </span>{" "}
//                   Continue with same address
//                 </label>

//                 <input
//                   id="new-billing-address"
//                   type="radio"
//                   name="billing-address-type"
//                   value="new"
//                   className="hidden peer"
//                   checked={!isUsingSameAddress}
//                   onChange={handleRadioChange}
//                 />
//                 <label
//                   htmlFor="new-billing-address"
//                   className={
//                     "flex items-center cursor-pointer px-4 py-2 border " +
//                     (isUsingSameAddress
//                       ? "border-[#b88c4f]"
//                       : "border-2 border-[#b88c4f]") +
//                     " rounded-md text-sm font-medium text-gray-700"
//                   }
//                 >
//                   <span className="material-icons mr-2">add</span> Add New
//                   Billing Address
//                 </label>
//               </div>
//             </div>
//           </div>

//           {/* Dynamic Address Form / Same Address */}
//           {isUsingSameAddress ? (
//             <>
//               {!isBillingAddEditing ? (
//                 <>
//                   <p className=" text-black">
//                     <span className="font-bold">Name: </span>
//                     {formData.shippingname}
//                   </p>
//                   <p className="text-black">
//                     <span className="font-bold">Address: </span>
//                     {formData.shippingAddress}
//                     <br />
//                   </p>

//                   {/* <p className="text-black">
//                           <span className="font-bold">City: </span>
//                           {formData.city}
//                         </p> */}

//                   <p className="text-black">
//                     <span className="font-bold">Country: </span>
//                     {formData.shippingCountry}
//                   </p>

//                   <p className="text-black">
//                     <span className="font-bold">Phone: </span>
//                     {formData.shippingphone}
//                   </p>

//                   <div className="flex justify-between mt-3 text-black">
//                     {/* <button
//                         onClick={handleBillingAddEditToggle}
//                         className="text-blue-500 mr-3"
//                       >
//                         Edit
//                       </button> */}
//                     {/* <button className="text-red-500">Delete</button> */}
//                   </div>
//                 </>
//               ) : (
//                 <form
//                   onSubmit={(e) => {
//                     e.preventDefault();
//                     setIsBillingAddEditing(false);
//                   }}
//                 >
//                   <input
//                     type="text"
//                     name="billingname"
//                     value={formData.billingname}
//                     onChange={handleInputChange}
//                     placeholder={
//                       formData.billingname.length > 0
//                         ? formData.billingname
//                         : "Name"
//                     }
//                     required
//                     className="block w-full mb-2"
//                   />
//                   <input
//                     type="text"
//                     name="billingAddress"
//                     value={formData.billingAddress}
//                     onChange={handleInputChange}
//                     placeholder={
//                       formData.billingAddress.length > 0
//                         ? formData.billingAddress
//                         : "Address"
//                     }
//                     required
//                     className="block w-full mb-2"
//                   />
//                   <input
//                     type="number"
//                     name="billingphone"
//                     value={formData.billingphone}
//                     onChange={handleInputChange}
//                     placeholder={
//                       formData.billingphone.length > 0
//                         ? formData.billingphone
//                         : "Phone"
//                     }
//                     required
//                     className="block w-full mb-2"
//                   />
//                   {/* <button onClick={handleBillingAddEditToggle} className="text-blue-500 mr-3">
//                       Save
//                     </button> */}
//                   {/* <button
//                       onClick={() => setIsBillingAddEditing(false)}
//                       className="text-gray-500"
//                     >
//                       Cancel
//                     </button> */}
//                 </form>
//               )}
//             </>
//           ) : (
//             <div id="new-address-form" className="mb-5">
//               <h3 className="text-xl text-black font-semibold mb-3">
//                 Enter New Billing Address
//               </h3>
//               <form
//                 onSubmit={(e) => {
//                   e.preventDefault();
//                   setIsBillingAddEditing(false);
//                 }}
//               >
//                 <div className="mb-3">
//                   <label
//                     htmlFor="billing-name"
//                     className="block text-sm font-medium text-gray-700"
//                   >
//                     Name
//                   </label>
//                   <input
//                     type="text"
//                     id="billingname"
//                     name="billingname"
//                     // value={formData.billingname}
//                     onChange={handleInputChange}
//                     className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
//                     placeholder="Your Name"
//                     required
//                   />
//                 </div>
//                 <div className="mb-3">
//                   <label
//                     htmlFor="billingAddress"
//                     className="block text-sm font-medium text-gray-700"
//                   >
//                     Address
//                   </label>
//                   <input
//                     type="text"
//                     id="billingAddress"
//                     name="billingAddress"
//                     // value={formData.billingAddress}
//                     onChange={handleInputChange}
//                     className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
//                     placeholder="Your Address"
//                     required
//                   />
//                 </div>
//                 <div className="mb-3">
//                   <label
//                     htmlFor="billingCountry"
//                     className="block text-sm font-medium text-gray-700"
//                   >
//                     Country
//                   </label>
//                   <select
//                     name="billingCountry"
//                     value={formData.billingCountry}
//                     onChange={handleInputChange}
//                     className="block w-full mb-2"
//                     required
//                   >
//                     <option value="">Select Country</option>
//                     {countriesList.map((country: any) => (
//                       <option
//                         key={country.code}
//                         value={country.code}
//                         selected={country.code === formData.billingCountry}
//                       >
//                         {country.name}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//                 <div className="mb-3">
//                   <label
//                     htmlFor="billing-phone"
//                     className="block text-sm font-medium text-gray-700"
//                   >
//                     Phone
//                   </label>
//                   <input
//                     type="number"
//                     id="billingphone"
//                     name="billingphone"
//                     // value={formData.billingphone}
//                     onChange={handleInputChange}
//                     className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
//                     placeholder="Your Phone Number"
//                     required
//                   />
//                 </div>
//                 {/* <button
//                     onClick={() => setIsDeliveryAddEditing(false)}
//                     className="px-4 py-2 bg-blue-600 text-white rounded-md"
//                   >
//                     <span className="material-icons mr-2">save</span> Save
//                     Address
//                   </button> */}
//               </form>
//             </div>
//           )}
//         </div>
//       )}
//     </>
//   );
// };

// export default GuestAddressForm;
