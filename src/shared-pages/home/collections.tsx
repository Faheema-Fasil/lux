"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation } from "swiper/modules";
import Image from "next/image";
import Link from "next/link";
import { ProductProps } from "@/types/products/types";
import { motion } from "framer-motion";

export default function Collections({ products }: { products: ProductProps[] }) {

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  };

  if (!products) {
    return (
      <Swiper
        modules={[Navigation]}
        navigation
        loop={true}
        slidesPerView={1}
        spaceBetween={50}
        breakpoints={{
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
        className="overflow-x-hidden mySwiper"
      >
        {Array.from({ length: 12 }).map((_, index) => (
          <SwiperSlide key={index}>
            <div className="border flex flex-col items-center border-gray-300 rounded-lg shadow-lg p-4 animate-pulse relative">
              <div className="h-64 w-full rounded-lg"></div>
              <div className="w-3/4 h-6 mt-4 rounded"></div>
              <div className="w-1/2 h-6 mt-2 rounded"></div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    );
  }

  return (
    <motion.div className="mx-auto" initial="hidden" animate="visible" variants={containerVariants}>
      <Swiper
        modules={[Navigation]}
        navigation
        loop={true}
        spaceBetween={50}
        slidesPerView={1}
        breakpoints={{
          700: { slidesPerView: 2 },
          1000: { slidesPerView: 3 },
          1400: { slidesPerView: 4 },
        }}
        className="mySwiper"
        style={{ padding: "0 20px" }}
      >
        {products &&
          products.map((product: any, index: number) => (
            <SwiperSlide key={index}>
              <motion.div variants={itemVariants}>
                <Link href={`/product-detail/${product?.id}`}>
                  <div className="bg-white border mb-10 flex flex-col items-center rounded-lg shadow-lg p-4 hover:shadow-xl transform transition-transform duration-300 hover:scale-105 relative">
                    <div className="h-36 w-36 md:h-56 md:w-56 relative group">
                      <Image
                        src={product?.media_source_url || "/assets/img/cards/metal_nfc_card.png"}
                        alt={product?.name}
                        height={500}
                        width={500}
                        className="w-full h-full object-contain rounded-lg group-hover:scale-100 transition-all duration-300 ease-in-out"
                        priority
                      />
                    </div>
                    <h3 className="text-lg font-semibold mt-4 text-center">{product?.name}</h3>
                    {product?.price && <h4 className="text-xl text-yellow-600 mt-2">{product?.price && `AED ${product?.price}`}</h4>}
                  </div>
                </Link>
              </motion.div>
            </SwiperSlide>
          ))}
      </Swiper>

      {/* Add custom styles for Swiper navigation */}
      <style jsx global>{`
        .swiper-button-next,
        .swiper-button-prev {
          color: black;
          background-color: rgba(255, 255, 255, 0.8);
          border-radius: 50%;
          width: 40px; /* Adjust size */
          height: 40px; /* Adjust size */
          transition: background-color 0.3s, color 0.3s; /* Smooth transition */
        }

        .swiper-button-next::after,
        .swiper-button-prev::after {
          font-size: 20px; /* Adjust arrow icon size */
          transition: color 0.3s; /* Smooth transition for arrow color */
        }
      `}</style>
    </motion.div>
  );
}
