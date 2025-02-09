// 'use client'
// import { useState } from "react";
// import { DataProps } from "@/types/common/types";
// import Image from "next/image";
// import Link from "next/link";
// import { toast } from "react-toastify";

// export const CardListingSection = ({data} : {data: DataProps}) => {
//     const [isOpen, setIsOpen] = useState(false);
//     const [name, setName] = useState("");
//     const [number, setNumber] = useState("");
  
//     const closeModal = () => setIsOpen(false);
//     const openModal = () => setIsOpen(true);
  
//     const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
//       event.preventDefault();
//       if(!name ||!number) {
//         toast.error("Please fill in both Name and Number fields");
//       }
//       else {
//         toast.success("Enquiry submitted successfully!");
//         closeModal();
//       }
//       // alert(`Name: ${name}, Number: ${number}`);
//     };

//     return (
//       <section className="section-padding py-16 w-full bg-cover bg-center bg-[#f7f7f7]" style={{backgroundImage: `url('/assets/img/sec-bg.png')`, backgroundSize: "150%"}}>
//         <div className="container mx-auto px-4 md:px-6 lg:px-8">
//           <div className="flex flex-wrap items-center -mx-4">
//             <div className="w-full lg:w-1/2 px-4">
//               <div className="mb-8">
//                 <a href="">
//                   <Image
//                     src="/assets/img/item-1.png"
//                     alt="Full Custom Metal Card"
//                     className="mx-auto"
//                     height={500}
//                     width={500}
//                   />
//                 </a>
//               </div>
//             </div>
  
//             <div className="w-full lg:w-1/2 px-4">
//               <div className="mb-8">
//                 <h2 className="text-3xl font-bold text-black">{data.acf.our_products_page_banner_tagline}</h2>
//               </div>
  
//               <p className="text-gray-600 mt-2">
//                 First impressions matter. Obtain the premium metal Card (single chip) that you&apos;ve always
//                 wanted and make a statement with it.
//               </p>
  
//               <div className="mt-4">
//                 <ul className="list-disc list-inside text-gray-700 mb-6 pl-5">
//                   <li>
//                     <span className="font-bold text-[#aa8453]">Heaviest metal card</span> in the market (Up
//                     to 29 grams)
//                   </li>
//                   <li>Contact only</li>
//                   <li>
//                     Solid metal edge to edge or <span className="font-bold text-[#aa8453]">24K Plated</span>
//                   </li>
//                   <li>Luxury embellishments (Embedding of diamonds)</li>
//                   <li>Upload your custom design or logo</li>
//                 </ul>
//               </div>
  
//               <p className="text-lg text-gray-700 font-bold mb-2">
//                 Upgrade your plastic card today and experience the new features
//               </p>
  
//               <div className="flex mt-8 gap-4 items-center">
//                 <button
//                   onClick={openModal}
//                   className="bg-[#aa8453] text-white border border-[#aa8453] rounded-full py-2 px-8 uppercase font-bold transition-all duration-300 hover:bg-[#f0dac6] hover:border-[#f0dac6] hover:text-[#343434]"
//                 >
//                   Enquire
//                 </button>
//                 <span className="text-gray-800">Starting at AED 899</span>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className={`fixed inset-0 bg-black bg-opacity-50 z-[99] transition-all duration-300 ${isOpen ? 'flex opacity-100' : 'hidden opacity-0'} items-center justify-center`}>
//           <div className={`modal-content mx-auto p-8 max-w-[550px] bg-white rounded-md shadow-md space-y-4 transform transition-transform duration-300 ${isOpen ? 'scale-100' : 'scale-95'}`}>
//             <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-4">
//               <h3 className="text-2xl font-bold">Enquire Now</h3>
//               <input
//                 type="text"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 placeholder="Name"
//                 className="block w-full p-2 border border-gray-300 rounded-md"
//               />
//               <input
//                 type="text"
//                 value={number}
//                 onChange={(e) => setNumber(e.target.value)}
//                 placeholder="Number"
//                 className="block w-full p-2 border border-gray-300 rounded-md"
//               />
//               <div className="flex space-x-4">
//                 <button
//                   type="submit"
//                   className="bg-[#aa8453] text-white border border-[#aa8453] rounded-full py-2 px-8 uppercase font-bold transition-all duration-300 hover:bg-[#f0dac6] hover:border-[#f0dac6] hover:text-[#343434]"
//                 >
//                   Send
//                 </button>
//                 <button
//                   type="button"
//                   className="bg-gray-200 text-gray-700 border border-gray-300 rounded-full py-2 px-8 uppercase font-bold transition-all duration-300 hover:bg-gray-300 hover:text-black"
//                   onClick={closeModal}
//                 >
//                   Close
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </section>
//     );
// };

