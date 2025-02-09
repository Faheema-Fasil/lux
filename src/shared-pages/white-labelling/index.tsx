"use client";
import { motion } from "framer-motion";
import { DataProps } from "@/types/common/types";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import EnquiryModal from "@/components/modal/enquiry-modal";
import { contactUsFormApi, fetchProductImageApi } from "@/server-api/apifunctions/apiService";
import Banner from "@/components/common/banner";
import FeaturesSection from "@/components/common/features-section";
import Image from "next/image";

const WhiteLabelling = ({ data, features, cards }: { data: DataProps; features: any; cards: any }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isCardLoading, setIsCardLoading] = useState(true);
  const [cardsWithImage, setCardsWithImage] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "Enquiry for Payments and White Labelling",
    message: "",
  });

  // Fetch card image by media ID
  const fetchMediaImage = async (mediaId: number) => {
    try {
      const response = await fetchProductImageApi(mediaId);
      return response.source_url;
    } catch (error) {
      console.error("Error fetching media image:", error);
      return null;
    }
  };

  // Fetch cards and update with images
  useEffect(() => {
    const fetchCardsData = async () => {
      const updatedCards = await Promise.all(
        cards.map(async (card: any) => {
          try {
            const imageUrl = await fetchMediaImage(card.featured_media);
            return { ...card, imageUrl };
          } catch (error) {
            console.error("Error fetching media image for card:", error);
            return { ...card, imageUrl: null };
          } finally {
            setIsCardLoading(false);
          }
        })
      );
      setCardsWithImage(updatedCards);
    };

    if (cards.length > 0) fetchCardsData();
  }, [cards]);

  // Modal Handlers
  const handleEnquiry = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Form Handlers
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { name, email, phone, message } = formData;
      if (!name) {
        toast.error("Name is required");
        return;
      }

      if (!email) {
        toast.error("Email is required");
        return;
      }
      if (!phone) {
        toast.error("Phone is required");
        return;
      }

      if (!message) {
        toast.error("Please enter a message");
        return;
      }

      const response = await contactUsFormApi(formData);
      if (response) {
        toast.success(response);
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "Enquiry for Payments and White Labelling",
          message: "",
        });
        closeModal();
      }
    } catch (error) {
      toast.error("Failed to submit enquiry. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main id="bringer-main">
      {/* Banner Section */}
      <Banner
        bannerImage={data?.acf.our_products_page_banner_image?.url}
        bannerTagline={data?.acf?.our_products_page_banner_tagline}
        bannerDescription={data?.acf?.our_products_page_banner_description}
        bannerVideo={data?.acf.our_products_page_banner_video?.url}
      />

      {/* Card Grid Section */}
      <section className="section px-10 overflow-hidden pt-28 flex justify-center mb-20">
        <div className="container">
          <div className="text-center">
            <h4 className="text-[30px] md:text-[40px] font-bold text-neutral-900">
              {data.acf.our_corporate_metal_cards_title}
            </h4>
          </div>
          {isCardLoading ? (
            <div className="grid grid-cols-1 xs:grid-cols-1 mx-auto max-w-[200px] md:max-w-full md:grid-cols-4 gap-16 mt-20 mb-20">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="md:h-[400px] lg:h-[600px] w-full rounded-lg overflow-hidden animate-pulse bg-gray-300" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 xs:grid-cols-1 mx-auto max-w-[200px] md:max-w-full md:grid-cols-4 gap-16 mt-20 mb-20">
              {cardsWithImage.map((card: any) => (
                <div key={card.id} className="card mx-auto transition-transform duration-300 hover:-translate-y-2">
                  <div className="rounded-lg overflow-hidden">
                    {card.imageUrl && (
                      <Image
                        src={card.imageUrl}
                        alt={card.slug}
                        height={300}
                        width={300}
                        priority
                        className="object-cover w-full h-full"
                      />
                    )}
                  </div>
                  <div className="mt-4 text-center">
                    {card.isNew && <span className="badge-new">New</span>}
                    <h5
                      className="text-md md:text-xl font-semibold mt-2"
                      dangerouslySetInnerHTML={{ __html: card.title.rendered }}
                    />
                    <p
                      className="text-neutral-500 text-xs md:text-sm"
                      dangerouslySetInnerHTML={{ __html: card.content.rendered }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className="mt-16 text-center">
            <motion.button
              onClick={handleEnquiry}
              className="bg-primary text-white text-lg border border-primary rounded-full py-2 px-8 uppercase hover:bg-[#f0dac6] hover:border-[#f0dac6] hover:text-[#343434] transition duration-300"
            >
              Enquire
            </motion.button>
          </div>
        </div>
      </section>

      {/* Modal */}
      {isModalOpen && (
        <EnquiryModal
          closeModal={closeModal}
          loading={loading}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      )}

      {/* Features Section */}

      <FeaturesSection
        features={features}
        title={data.acf.metal_nfc_cards_features_title}
        backgroundImage="https://tomsher.co/LUX/wp-content/uploads/2024/12/bg-b.jpg"
        subtitle={
          data.acf.metal_nfc_cards_features_subtitle || `Make a Bold Statement with Luxmetallic's Dual Chip Cards`
        }
      />
    </main>
  );
};

export default WhiteLabelling;
