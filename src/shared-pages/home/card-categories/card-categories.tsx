"use client";
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CardHoverComponent from "@/components/card/card-hover";
import Image from "next/image";

interface Category {
  id: number;
  parent: number;
  name?: string;
  title?: string;
  slug: string;
  menu_order: number;
  description?: string;
  image?: {
    src?: string;
  };
}

interface CardCategoriesComponentProps {
  titles: {
    card_category_title: string;
    card_category_tagline: string;
  };
  CardCategoriesData: Category[];
}

const CardCategoriesComponent: React.FC<CardCategoriesComponentProps> = ({
  titles,
  CardCategoriesData,
}) => {
  const [activeTab, setActiveTab] = useState<number | null>(null);
  const [enquiryCards, setEnquiryCards] = useState<string[]>([
    "jewellery",
    "white-label-metal-card",
  ]);
  // const cardRef = useRef<any>(null); // Reference for the card

  useEffect(() => {
    if (CardCategoriesData?.length > 0) {
      const defaultCategory = CardCategoriesData.find(
        (category) => category.parent === 41
      );
      if (defaultCategory) {
        setActiveTab(defaultCategory.id);
      }
    }
  }, [CardCategoriesData]);

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
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="background-section">
      <div
        className="categories-items menu py-16 w-full bg-cover bg-center"
      >
        <div className="container px-0 mx-auto xl:px-48">
          {/* Section Heading */}
          <div className="text-center mb-8">
            <h2 className="text-[30px] md:text-[40px] font-normal  text-gray-900">
              {titles && titles?.card_category_title && titles?.card_category_title}
            </h2>
            <p className="section-subtitle text-gray-600 text-sm sm:text-lg mt-2">
              {titles && titles?.card_category_tagline && titles?.card_category_tagline}
            </p>
          </div>

          {/* Tab List */}
          <motion.ul
            className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-4 mx-auto gap-3 max-w-sm md:max-w-full md:gap-10"
            role="tablist"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {CardCategoriesData && CardCategoriesData?.filter((category) => category.parent === 41)
              .sort((a, b) => a.menu_order - b.menu_order)
              .map((category) => (
                <motion.li key={category.id} variants={itemVariants}>
                  <button
                    className={`w-full p-2  rounded-lg transition-all ${
                      activeTab === category.id
                        ? "border-blue-600 text-blue-600 scale-110"
                        : "border-gray-300 text-gray-500 hover:text-gray-600 hover:border-gray-400"
                    }`}
                    onClick={() => setActiveTab(category.id)}
                  >
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                      className="card-img"
                    >
                      {category?.image?.src ? (
                        <Image
                          src={category?.image?.src}
                          alt={category?.name || "Category Image"}
                          height={500}
                          width={700}
                          className="mx-auto rounded-lg max-w-[130px] sm:max-w-[150px] lg:max-w-full max-h-[120px] sm:max-h-[150px] lg:max-h-[180px] object-contain"
                          priority
                        />
                      ) : (
                        <div className="text-gray-500">No image available</div>
                      )}
                    </motion.div>
                    <h6 className="text-gray-800 mt-2 text-sm sm:text-base">
                      {category?.name}
                    </h6>
                  </button>
                </motion.li>
              ))}
          </motion.ul>

          {/* Tab Content */}
          <div className="max-w-5xl mx-auto pt-16 px-2">
            <AnimatePresence mode="wait">
              {CardCategoriesData && CardCategoriesData?.filter((category) => category.parent === 41)
                .sort((a, b) => a.menu_order - b.menu_order)
                .map(
                  (category) =>
                    activeTab === category.id && (
                      <motion.div
                        key={category.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        style={{ minHeight: "300px" }}
                        className="grid grid-cols-1 md:grid-cols-2 gap-20"
                      >
                        {/* Image Section */}
                        <CardHoverComponent card={category} link={true} />

                        {/* Card Info Section */}
                        <motion.div
                          className="flex flex-col justify-center"
                          variants={itemVariants}
                        >
                          <h5 className="text-gray-800 text-lg sm:text-xl font-semibold">
                            {category?.name}
                          </h5>
                          <p className="text-gray-600 mt-2 text-sm sm:text-base w-full">
                            {category?.description ||
                              "A practical, convenient, and secure payment solution offering a world-class range of benefits."}
                          </p>
                          <div className="flex flex-row gap-4 mt-6 justify-center md:justify-start">
                            <Link
                              href={
                                enquiryCards?.includes(category.slug)
                                  ? `/${category?.slug}`
                                  : `/${category?.slug}/customize`
                              }
                              className="bg-primary text-white border border-primary rounded-full py-2 px-2 sm:py-3 sm:px-6 uppercase text-xs sm:text-sm hover:bg-primary/80 duration-300 hover:text-gray-800"
                            >
                              {enquiryCards.includes(category?.slug)
                                ? "Enquire Now"
                                : "Customize Now"}
                            </Link>
                            <Link
                              href={category?.slug}
                              className="border border-black text-black rounded-full py-2 px-2 sm:py-3 sm:px-6 uppercase text-xs sm:text-sm hover:bg-black duration-300 hover:text-white"
                            >
                              View Details
                            </Link>
                          </div>
                        </motion.div>
                      </motion.div>
                    )
                )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CardCategoriesComponent;
