// // 'use client'
// // import React, { useRef } from "react";
// // import { motion } from "framer-motion";
// // import Link from "next/link";

// // const CardHoverComponent = ({card, link = false}: {card: any, link?: boolean}) => {
// //   const cardRef = useRef<any>(null);

// //   const handleMouseEnter = () => {
// //     const card = cardRef.current;
// //     if (card) {
// //       card.style.transition = "transform 1s ease";
// //     }
// //   };

// //   const handleMouseLeave = () => {
// //     const card = cardRef.current;
// //     if (card) {
// //       card.style.transition = "transform 0.5s ease";
// //       card.style.transform = "rotateY(0deg)";
// //     }
// //   };

// //   const handleMouseMove = (e: React.MouseEvent) => {
// //     const card = cardRef.current;
// //     if (card) {
// //       const cardRect = card.getBoundingClientRect();
// //       const mouseX = e.clientX - cardRect.left;
// //       const cardWidth = cardRect.width;

// //       const xAxis = mouseX < cardWidth / 2 ? -35 : 35;

// //       card.style.transform = `rotateY(${xAxis}deg)`;
// //     }
// //   };

// "use client";
// import React, { useRef } from "react";
// import { motion } from "framer-motion";
// import Link from "next/link";
// import Image from "next/image";

// const CardHoverComponent = ({
//   card,
//   link = false,
// }: {
//   card: any;
//   link?: boolean;
// }) => {
//   const cardRef = useRef<HTMLDivElement>(null);

//   const handleMouseEnter = () => {
//     const card = cardRef.current;
//     if (card) {
//       card.style.transition = "transform 1.5s ease";
//     }
//   };

//   const handleMouseLeave = () => {
//     const card = cardRef.current;
//     if (card) {
//       card.style.transition =
//         "transform 0.5s ease, background-position 0.5s ease";
//       card.style.transform = "rotateY(0deg)";
//     }
//   };

// const handleMouseMove = (e: React.MouseEvent) => {
//   const card = cardRef.current;
//   if (card) {
//     const cardRect = card.getBoundingClientRect();
//     const mouseX = e.clientX - cardRect.left;
//     const cardWidth = cardRect.width;

//     const xAxis = ((mouseX / cardWidth) - 0.5) * 70; // Adjust rotation intensity
//     card.style.transform = `rotateY(${xAxis}deg)`;
//   }
// };

//   const handleMouseMove = (e: React.MouseEvent) => {
//     const card = cardRef.current;
//     if (card) {
//       const cardRect = card.getBoundingClientRect();
//       const mouseX = e.clientX - cardRect.left;
//       const cardWidth = cardRect.width;

//       const xAxis = mouseX < cardWidth / 2 ? -35 : 35;

//       card.style.transform = `rotateY(${xAxis}deg)`;
//     }
//   };

//   return (
//     <div
//       className="relative perspective"
//       onMouseEnter={handleMouseEnter}
//       onMouseLeave={handleMouseLeave}
//       onMouseMove={handleMouseMove}
//     >
//       <motion.div
//         ref={cardRef}
//         className="card rotate-card group relative"
//         style={{
//           boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)",
//           background:
//             "linear-gradient(145deg, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0) 70%)",
//           backgroundBlendMode: "overlay",
//         }}
//       >
//         {link ? (
//           <Link href={card.slug}>
//             <div className="front relative">
//               {card.image?.src && (
//                 <div className="shadow-wrapper">
//                   <img
//                     src={card.image.src}
//                     alt={`${card.name} Front`}
//                     className="rounded-lg shadow-md w-full glossy-image"
//                   />
//                 </div>
//               )}
//               <div className="gloss-layer"></div>
//             </div>
//           </Link>
//         ) : (
//           <div className="front relative">
//             {card.image?.src && (
//               <div className="shadow-wrapper">
//                 <img
//                   src={card.image.src}
//                   alt={`${card.name} Front`}
//                   className="rounded-lg shadow-md w-full glossy-image"
//                 />
//               </div>
//             )}
//             <div className="gloss-layer"></div>
//           </div>
//         )}
//         {/* <div className="absolute xs:hidden sm:flex sm:top-[390px] md:top-[250px] lg:top-[330px] left-1/2 transform -translate-x-1/2 z-10">
//           <Image
//             src="/assets/img/shadow-new.png"
//             height={10}
//             width={200}
//             className="w-full opacity-60"
//             alt="Shadow Bottom"
//           />
//         </div> */}
//       </motion.div>
//     </div>
//   );
// };

// export default CardHoverComponent;

"use client";
import React, { useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const CardHoverComponent = ({ card, link = false }: { card: any; link?: boolean }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const card = cardRef.current;
    if (card) {
      const cardRect = card.getBoundingClientRect();
      const mouseX = e.clientX - cardRect.left;
      const cardWidth = cardRect.width;

      const xAxis = mouseX < cardWidth / 2 ? -35 : 35;

      card.style.transform = `rotateY(${xAxis}deg)`;
    }
  };

  const handleMouseEnter = () => {
    const card = cardRef.current;
    if (card) {
      card.style.transition = "transform 1.5s ease";
    }
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (card) {
      card.style.transition = "transform 0.5s ease, background-position 0.5s ease";
      card.style.transform = "rotateY(0deg)";
    }
  };

  return (
    <div
      className="relative perspective px-4"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
    >
      <motion.div
        ref={cardRef}
        className="card rotate-card group relative rounded-3xl"
        style={{
          boxShadow: "0px 20px 30px rgba(0, 0, 0, 0.2)",
          perspective: "1000px",
        }}
      >
        {link ? (
          <Link href={card?.slug}>
            <div className="front relative">
              {card?.image?.src && (
                <div className="shadow-wrapper">
                  <Image
                    src={card?.image.src}
                    alt={`${card?.name} Front`}
                    layout="responsive"
                    width={300}
                    height={200}
                    className="rounded-2xl shadow-md w-full glossy-image"
                    // priority={true}
                    quality={88}
                  />
                </div>
              )}
              <div className="gloss-layer"></div>
            </div>
          </Link>
        ) : (
          <div className="front relative  ">
            {card?.image?.src && (
              <div className="shadow-wrapper">
               <Image
                    src={card?.image.src}
                    alt={`${card?.name} Front`}
                    layout="responsive"
                    width={300}
                    height={200}
                    className="rounded-2xl shadow-md w-full glossy-image"
                    priority={true}
                    quality={88}
                  />
              </div>
            )}
            <div className="gloss-layer"></div>
          </div>
        )}
        <div className="reflection-layer"></div>
        <div className="card-shadow"></div>
      </motion.div>
    </div>
  );
};

export default CardHoverComponent;
