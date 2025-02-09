// "use client";
// import Customization from "@/components/customization/customization";
// import React, { useState } from "react";

// export interface TextFieldInterface {
//   elementId: string;
//   defaultLabel: string;
//   name: string;
//   type: string;
//   placeholder?: string;
// }

// const CustomizationSection = () => {
//   const fieldMappings = {
//     radio_2580742084: "logoFieldElementId",
//     radio_2230183531: "chipSizeFieldElementId",
//     image_2833661161: "borderFieldElementId",
//     radio_7208132280: "placementFieldElementId",
//     radio_7404211418: "insuranceFieldElementId",
//     radio_7308877337: "removeBrandingFieldElementId",
//   };

//   const TextFields: { [key: string]: TextFieldInterface } = {
//     name: {
//       elementId: "text_1044961101",
//       defaultLabel: "Name",
//       name: "name",
//       type: "text",
//       placeholder: "Name",
//     },
//     optional: {
//       elementId: "text-0672336657",
//       defaultLabel: "Optional Text",
//       name: "optional",
//       type: "text",
//       placeholder: "Optional Text",
//     },
//     cardnumber: {
//       elementId: "number_1044996642",
//       defaultLabel: "Card Number (Optional)",
//       name: "number",
//       type: "text",
//       placeholder: "Card Number",
//     },
//   };

//   const textFieldArray = Object.values(TextFields);

//   const [elementValues, setElementValues] = useState({
//     name: {
//       left: 30,
//       scale: 1,
//       top: 400,
//       height: 40,
//       width: 100,
//       rotate: 0,
//       fontSize: 24,
//     },
//     optional: {
//       left: 30,
//       scale: 1,
//       top: 440,
//       height: 40,
//       rotate: 0,
//       fontSize: 24,
//     },
//     number: {
//       left: 240,
//       scale: 1,
//       top: 190,
//       height: 40,
//       rotate: 0,
//       fontSize: 24,
//     },
//     topnumber: {
//       left: 180,
//       scale: 1,
//       top: 120,
//       height: 40,
//       rotate: 0,
//       fontSize: 24,
//     },
//     chip: {
//       left: 140,
//       scale: 1,
//       top: 120,
//       height: 40,
//       rotate: 0,
//       fontSize: 24,
//     },
//     brandingSite: {
//       left: 30,
//       scale: 1,
//       top: 3,
//       height: 40,
//       width: 100,
//       rotate: 0,
//       fontSize: 20,
//     },
//     image: {
//       left: 200,
//       scale: 1,
//       top: 150,
//       height: 200,
//       width: 200,
//       rotate: 0,
//     },
//   });

//   const updateElementValues = () => {
//     const isDesktop = window.innerWidth >= 1024;
//     const isTablet = window.innerWidth >= 768;
//     const isMobile = window.innerWidth < 768;

//     setElementValues({
//       name: {
//         left: isDesktop ? 30 : isTablet ? 20 : 10,
//         scale: 1,
//         top: isDesktop ? 400 : isTablet ? 300 : 250,
//         height: isDesktop ? 40 : isTablet ? 35 : 30,
//         width: isDesktop ? 100 : isTablet ? 90 : 80,
//         rotate: 0,
//         fontSize: isDesktop ? 24 : isTablet ? 20 : 18,
//       },
//       optional: {
//         left: isDesktop ? 30 : isTablet ? 20 : 10,
//         scale: 1,
//         top: isDesktop ? 440 : isTablet ? 330 : 270,
//         height: isDesktop ? 40 : isTablet ? 35 : 30,
//         rotate: 0,
//         fontSize: isDesktop ? 24 : isTablet ? 20 : 18,
//       },
//       number: {
//         left: isDesktop ? 200 : isTablet ? 150 : 120,
//         scale: 1,
//         top: isDesktop ? 190 : isTablet ? 130 : 115,
//         height: isDesktop ? 40 : isTablet ? 35 : 30,
//         rotate: 0,
//         fontSize: isDesktop ? 24 : isTablet ? 20 : 18,
//       },
//       topnumber: {
//         left: isDesktop ? 180 : isTablet ? 150 : 120,
//         scale: 1,
//         top: isDesktop ? 120 : isTablet ? 100 : 60,
//         height: isDesktop ? 40 : isTablet ? 35 : 30,
//         rotate: 0,
//         fontSize: isDesktop ? 24 : isTablet ? 20 : 18,
//       },
//       chip: {
//         left: isDesktop ? 120 : isTablet ? 120 : 180,
//         scale: 1,
//         top: isDesktop ? 120 : isTablet ? 120 : 120,
//         height: isDesktop ? 40 : isTablet ? 40 : 40,
//         rotate: 0,
//         fontSize: isDesktop ? 24 : isTablet ? 24 : 24,
//       },
//       brandingSite: {
//         left: isDesktop ? 30 : isTablet ? 20 : 10,
//         scale: 1,
//         top: isDesktop ? 3 : isTablet ? 1 : 2,
//         height: isDesktop ? 40 : isTablet ? 40 : 40,
//         width: isDesktop ? 100 : isTablet ? 100 : 100,
//         rotate: 0,
//         fontSize: isDesktop ? 16 : isTablet ? 12 : 9,
//       },

//       image: {
//         left: isDesktop ? 200 : isTablet ? 150 : 100,
//         scale: 1,
//         top: isDesktop ? 150 : isTablet ? 120 : 80,
//         height: isDesktop ? 200 : isTablet ? 180 : 160,
//         width: isDesktop ? 200 : isTablet ? 180 : 160,
//         rotate: 0,
//       },
//     });
//   };

//   return (
//     <div>
//       <Customization
//         productId="71"
//         fieldMappings={fieldMappings}
//         secValue="sec_0671f4cac4b395"
//         elementValues={elementValues}
//         setElementValues={setElementValues}
//         updateElementValues={updateElementValues}
//         TextFields={textFieldArray}
//         editable={true}
//       />
//     </div>
//   );
// };

// export default Customization;
