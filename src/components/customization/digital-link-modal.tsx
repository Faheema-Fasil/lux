import React, { useState } from "react";
import { motion } from "framer-motion";
import { uploadImageApi } from "@/server-api/apifunctions/apiService";

interface DigitalLinkModalProps {
  toggleModal: any;
  isDigitalLinkModalOpen: boolean;
  selectedProfileImage: any;
  setuploadedDigitalProfileImage: any;
  handleImageChange: any;
  workWithOurDigitalLinkCreators: any;
  getFieldByElementId: any;
  TextFields: any;
  inputValues: any;
  handleInputChange: any;
  setSelectedImage: any;
  uploadedDigitalProfileImage: any;
}

const DigitalLinkModal = ({
  toggleModal,
  isDigitalLinkModalOpen,
  selectedProfileImage,
  setuploadedDigitalProfileImage,
  handleImageChange,
  workWithOurDigitalLinkCreators,
  getFieldByElementId,
  TextFields,
  inputValues,
  handleInputChange,
  setSelectedImage,
  uploadedDigitalProfileImage,
}: DigitalLinkModalProps) => {
  const [selectedSocialMedia, setSelectedSocialMedia] = useState<string[]>([]);
  const [isSocialMediaPopupOpen, setIsSocialMediaPopupOpen] = useState(false);
  const [digitalModalSubmitStatus, setDigitalModalSubmitStatus] = useState<"loading" | "success" | "error">("success");

  const socialMediaOptions = ["Facebook", "X", "Instagram", "LinkedIn", "YouTube"];

  const handleSocialMediaToggle = (platform: string) => {
    if (selectedSocialMedia.includes(platform)) {
      // If already selected, deselect it
      setSelectedSocialMedia(selectedSocialMedia.filter((item) => item !== platform));
    } else {
      // If not selected, add it
      setSelectedSocialMedia([...selectedSocialMedia, platform]);
    }
  };

  const handleDigitalProfileSubmit = async () => {
    setDigitalModalSubmitStatus("loading");
    if (selectedProfileImage) {
      try {
        const response = await uploadImageApi(selectedProfileImage, "Profile Image");
        setuploadedDigitalProfileImage(response);
        setDigitalModalSubmitStatus("success");
        toggleModal();
      } catch (error) {
        console.log(error);
        setDigitalModalSubmitStatus("error");
      }
    } else {
      setTimeout(() => {
        setDigitalModalSubmitStatus("success");
        toggleModal();
      }, 200);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
    >
      {isDigitalLinkModalOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[99] flex items-center justify-center bg-black bg-opacity-70"
        >
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-lg shadow-lg w-full mt-20 md:mt-10 xs:mx-5 md:max-w-3xl py-12 px-10 max-h-[65vh] md:max-h-[80vh] overflow-y-auto relative"
          >
            <button
              className="absolute top-4 right-4 py-0 px-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition duration-300"
              onClick={() => {
                setSelectedImage(null);
                toggleModal();
              }}
            >
              X
            </button>
            {/* Profile Image Section */}
            <div className="flex flex-col items-center space-y-4">
              <div className="w-32 h-32 md:w-52 md:h-52 rounded-full overflow-hidden shadow-lg border-gray-300">
                <img
                  id="profile-image"
                  alt="profile"
                  src={selectedProfileImage || "/assets/img/profile-icon-png-910.png"}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="flex items-center">
                <input
                  accept="image/x-png,image/gif,image/jpeg"
                  type="file"
                  id="icon-button-file"
                  className="hidden"
                  onChange={handleImageChange}
                />
                <label htmlFor="icon-button-file" className="cursor-pointer">
                  <button
                    className="p-2 bg-gray-200 rounded-full hover:bg-gray-300"
                    onClick={() => document.getElementById("icon-button-file")?.click()}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <circle cx="12" cy="12" r="3.2" />
                      <path d="M9 2L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z" />
                    </svg>
                  </button>
                </label>
              </div>
            </div>

            {/* Form Section */}
            <form
              className="mt-6 space-y-3 md:space-y-6"
              onSubmit={(e) => {
                e.preventDefault();
                handleDigitalProfileSubmit();
              }}
            >
              {/* Social Media Section */}
              <div className="mb-4 flex justify-center">
                <button
                  type="button"
                  className="w-[150px] text-xs md:text-md md:w-2xl px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/80 transition duration-300"
                  onClick={() => setIsSocialMediaPopupOpen(true)}
                >
                  Select Social Media
                </button>
              </div>

              {selectedSocialMedia.map((platform) => (
                <div key={platform} className="mb-4">
                  <label htmlFor={platform} className="block text-gray-800 font-semibold mb-2">
                    {platform}
                  </label>
                  <input
                    id={platform}
                    name={platform.toLowerCase()}
                    value={inputValues[platform.toLowerCase()] || ""}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#AE9164] focus:border-[#AE9164] placeholder-gray-400"
                    placeholder={`Enter your ${platform} link`}
                  />
                </div>
              ))}

              {/* Dynamic Fields Section */}
              {workWithOurDigitalLinkCreators === "yes" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
                  {TextFields.filter((field: any) => field.section === "bottomifrequired").map((field: any) => (
                    <div key={field.elementId} className="mb-3">
                      <label htmlFor={field.elementId} className="block text-gray-800 font-semibold mb-2">
                        {getFieldByElementId(field.elementId, "label", field.defaultLabel)}
                      </label>
                      {field.type === "textarea" ? (
                        <div className="w-full">
                          <textarea
                            id={field.name}
                            name={field.name}
                            value={inputValues[field.name]}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#AE9164] focus:border-[#AE9164] placeholder-gray-400"
                            placeholder={getFieldByElementId(field.elementId, "placeholder", field.defaultLabel)}
                          />
                        </div>
                      ) : (
                        <input
                          id={field.name}
                          name={field.name}
                          type={field.type}
                          onChange={handleInputChange}
                          value={inputValues[field.name]}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#AE9164] focus:border-[#AE9164] placeholder-gray-400"
                          placeholder={getFieldByElementId(field.elementId, "placeholder", field.defaultLabel)}
                        />
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full flex justify-center items-center px-4 py-3 bg-primary text-white rounded-lg hover:bg-[#8C7553] transition duration-300"
              >
                {digitalModalSubmitStatus === "loading" ? (
                  <div className="h-5 w-5 flex justify-center border-b-2 border-white rounded-full animate-spin"></div>
                ) : (
                  <span>Submit</span>
                )}
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}

      {/* Social Media Popup */}
      {isSocialMediaPopupOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[99] flex items-center justify-center bg-black bg-opacity-70"
        >
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-lg shadow-lg p-6 max-w-[300px] md:max-w-md w-full"
          >
            <h3 className="text-lg font-semibold mb-4">Select Social Media</h3>
            <div className="grid grid-cols-2 gap-4">
              {socialMediaOptions.map((platform) => (
                <button
                  key={platform}
                  className={`px-4 py-2 rounded-lg ${
                    selectedSocialMedia.includes(platform) ? "bg-primary text-white" : "bg-gray-200 text-gray-800"
                  } hover:bg-primary hover:text-white transition duration-300`}
                  onClick={() => handleSocialMediaToggle(platform)}
                >
                  {platform}
                </button>
              ))}
            </div>
            <button
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300"
              onClick={() => setIsSocialMediaPopupOpen(false)}
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default DigitalLinkModal;

// import React, { useState } from "react";
// import { motion } from "framer-motion";

// const DigitalLinkModal = ({
//   toggleModal,
//   isDigitalLinkModalOpen,
//   selectedProfileImage,
//   handleImageChange,
//   workWithOurDigitalLinkCreators,
//   getFieldByElementId,
//   TextFields,
//   inputValues,
//   handleInputChange,
// }: any) => {
//   const [selectedSocialMedia, setSelectedSocialMedia] = useState<string[]>([]);
//   const [isSocialMediaPopupOpen, setIsSocialMediaPopupOpen] = useState(false);

//   const socialMediaOptions = [
//     "Facebook",
//     "Twitter",
//     "Instagram",
//     "LinkedIn",
//     "YouTube",
//   ];

//   const handleSocialMediaToggle = (platform: string) => {
//     if (selectedSocialMedia.includes(platform)) {
//       // If already selected, deselect it
//       setSelectedSocialMedia(
//         selectedSocialMedia.filter((item) => item !== platform)
//       );
//     } else {
//       // If not selected, add it
//       setSelectedSocialMedia([...selectedSocialMedia, platform]);
//     }
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       exit={{ opacity: 0, y: 20 }}
//       transition={{ duration: 0.3 }}
//     >
//       {isDigitalLinkModalOpen && (
//         <motion.div
//           initial={{ opacity: 0, scale: 0.9 }}
//           animate={{ opacity: 1, scale: 1 }}
//           exit={{ opacity: 0, scale: 0.9 }}
//           transition={{ duration: 0.3 }}
//           className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70"
//         >
//           <motion.div
//             initial={{ opacity: 0, x: 20 }}
//             animate={{ opacity: 1, x: 0 }}
//             exit={{ opacity: 0, x: 20 }}
//             transition={{ duration: 0.3 }}
//             className="bg-white rounded-lg shadow-lg w-full mt-10 max-w-3xl py-12 px-10 max-h-[80vh] overflow-y-auto"
//           >
//             {/* Profile Image Section */}
//             <div className="flex flex-col items-center space-y-4">
//               <div className="w-52 h-52 rounded-full overflow-hidden shadow-lg border-gray-300">
//                 <img
//                   id="profile-image"
//                   alt="profile"
//                   src={
//                     selectedProfileImage ||
//                     "https://firebasestorage.googleapis.com/v0/b/lion-business-card.appspot.com/o/SllN1NszPHeSMjfqGyjnjaFUemcd.jpg?alt=media&token=afeee7f2-22e2-42f2-97df-8d0dd5f7d83e"
//                   }
//                   className="object-cover w-full h-full"
//                 />
//               </div>
//               <div className="flex items-center">
//                 <input
//                   accept="image/x-png,image/gif,image/jpeg"
//                   type="file"
//                   id="icon-button-file"
//                   className="hidden"
//                   onChange={handleImageChange}
//                 />
//                 <label htmlFor="icon-button-file" className="cursor-pointer">
//                   <button
//                     className="p-2 bg-gray-200 rounded-full hover:bg-gray-300"
//                     onClick={() =>
//                       document.getElementById("icon-button-file")?.click()
//                     }
//                   >
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="h-6 w-6"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                     >
//                       <circle cx="12" cy="12" r="3.2" />
//                       <path d="M9 2L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z" />
//                     </svg>
//                   </button>
//                 </label>
//               </div>
//             </div>

//             {/* Form Section */}
//             <form
//               className="mt-6 space-y-6"
//               onSubmit={(e) => {
//                 e.preventDefault();
//                 toggleModal();
//               }}
//             >
//               {/* Social Media Section */}
//               <div className="mb-4 flex justify-center">
//                 <button
//                   type="button"
//                   className="w-2xl px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
//                   onClick={() => setIsSocialMediaPopupOpen(true)}
//                 >
//                   Select Social Media
//                 </button>
//               </div>

//               {selectedSocialMedia.map((platform) => (
//                 <div key={platform} className="mb-4">
//                   <label
//                     htmlFor={platform}
//                     className="block text-gray-800 font-semibold mb-2"
//                   >
//                     {platform}
//                   </label>
//                   <input
//                     id={platform}
//                     name={platform}
//                     value={inputValues[platform] || ""}
//                     onChange={handleInputChange}
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400"
//                     placeholder={`Enter your ${platform} link`}
//                   />
//                 </div>
//               ))}

//               {/* Dynamic Fields Section */}
//               {workWithOurDigitalLinkCreators === "yes" && (
//                 <div className="grid grid-cols-2 gap-4">
//                   {TextFields.filter(
//                     (field: any) => field.section === "bottomifrequired"
//                   ).map((field: any) => (
//                     <div key={field.elementId} className="mb-3">
//                       <label
//                         htmlFor={field.elementId}
//                         className="block text-gray-800 font-semibold mb-2"
//                       >
//                         {getFieldByElementId(
//                           field.elementId,
//                           "label",
//                           field.defaultLabel
//                         )}
//                       </label>
//                       <input
//                         id={field.name}
//                         name={field.name}
//                         value={inputValues[field.name] || ""}
//                         onChange={handleInputChange}
//                         className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#AE9164] focus:border-[#AE9164] placeholder-gray-400"
//                         placeholder={getFieldByElementId(
//                           field.elementId,
//                           "placeholder",
//                           field.defaultLabel
//                         )}
//                       />
//                     </div>
//                   ))}
//                 </div>
//               )}

//               {/* Submit Button */}
//               <button
//                 type="submit"
//                 className="w-full px-4 py-2 bg-primary text-white rounded-lg hover:bg-[#8C7553] transition duration-300"
//               >
//                 Submit
//               </button>
//             </form>
//           </motion.div>
//         </motion.div>
//       )}

//       {/* Social Media Popup */}
//       {isSocialMediaPopupOpen && (
//         <motion.div
//           initial={{ opacity: 0, scale: 0.9 }}
//           animate={{ opacity: 1, scale: 1 }}
//           exit={{ opacity: 0, scale: 0.9 }}
//           transition={{ duration: 0.3 }}
//           className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70"
//         >
//           <motion.div
//             initial={{ opacity: 0, x: 20 }}
//             animate={{ opacity: 1, x: 0 }}
//             exit={{ opacity: 0, x: 20 }}
//             transition={{ duration: 0.3 }}
//             className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full"
//           >
//             <h3 className="text-lg font-semibold mb-4">Select Social Media</h3>
//             <div className="grid grid-cols-2 gap-4">
//               {socialMediaOptions.map((platform) => (
//                 <button
//                   key={platform}
//                   className={`px-4 py-2 rounded-lg ${
//                     selectedSocialMedia.includes(platform)
//                       ? "bg-blue-500 text-white"
//                       : "bg-gray-200 text-gray-800"
//                   } hover:bg-blue-600 hover:text-white transition duration-300`}
//                   onClick={() => handleSocialMediaToggle(platform)}
//                 >
//                   {platform}
//                 </button>
//               ))}
//             </div>
//             <button
//               className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300"
//               onClick={() => setIsSocialMediaPopupOpen(false)}
//             >
//               Close
//             </button>
//           </motion.div>
//         </motion.div>
//       )}
//     </motion.div>
//   );
// };

// export default DigitalLinkModal;
