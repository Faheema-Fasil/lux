"use client";
import { fetchProductImageApi } from "@/server-api/apifunctions/apiService";
import Image from "next/image";
import { useState, useEffect } from "react";

interface Feature {
  id: number;
  title: { rendered: string };
  content: { rendered: string };
  featured_media: number;
  acf: {
    luxmetallic_promise_tag_1: string;
    luxmetallic_promise_tag_2: string;
    luxmetallic_promise_tag_3: string;
    luxmetallic_promise_video: string;
  };
}

interface FeaturesComponentProps {
  titles: {
    luxmetallic_promise_title: string;
    luxmetallic_promise_subtitle: string;
  };
  featuresData: Feature[];
}

const FeaturesComponent = ({ titles, featuresData }: FeaturesComponentProps) => {
  const [activeTab, setActiveTab] = useState(featuresData[0]?.id.toString() || "");
  // const [mediaUrls, setMediaUrls] = useState<{ [key: string]: string }>({});

  // useEffect(() => {
  //   const fetchMediaData = async () => {
  //     const urls: { [key: string]: string } = {};
  //     await Promise.all(
  //       featuresData.map(async (feature) => {
  //         try {
  //           const response = await fetchProductImageApi(feature?.featured_media);
  //           //console.log(response);
  //           const mediaData = await response;
  //           urls[feature.id] = mediaData.source_url;
  //         } catch (error) {
  //           console.error(`Error fetching media for ID ${feature.featured_media}:`, error);
  //         }
  //       })
  //     );
  //     setMediaUrls(urls);
  //   };

  //   fetchMediaData();
  // }, [featuresData]);

  const tabs =
    featuresData &&
    featuresData.map((feature) => ({
      id: feature?.id.toString(),
      label: feature?.title.rendered,
      content: {
        title: feature?.title.rendered,
        description: feature?.content.rendered.replace(/<\/?[^>]+(>|$)/g, ""),
        highlights: [
          feature?.acf?.luxmetallic_promise_tag_1,
          feature?.acf?.luxmetallic_promise_tag_2,
          feature?.acf?.luxmetallic_promise_tag_3,
        ],
        media: feature?.acf?.luxmetallic_promise_video,
        // media: mediaUrls[feature.id],
      },
    }));

  const currentTabContent: any = tabs.find((tab) => tab.id === activeTab)?.content || {};

  return (
    <section className="bg-white py-10 md:py-20">
      <div className="container mx-auto ">
        {/* Header */}
        <div className="text-center mt-6 sm:mt-8 mb-8 sm:mb-10">
          <h2 className="text-[30px] md:text-[40px] font-normal text-[#272727]">{titles?.luxmetallic_promise_title}</h2>
          <p className="text-sm sm:text-base text-gray-600 animate-fadeIn delay-200">
            {titles?.luxmetallic_promise_subtitle}
          </p>
        </div>

        {/* Tabs Navigation */}
        <div className="mb-6 sm:mb-8 px-4 sm:px-0">
          <ul className="flex flex-wrap justify-center gap-2 sm:gap-3">
            {tabs &&
              tabs.map((tab) => (
                <li key={tab.id}>
                  <button
                    className={`px-4 sm:px-6 py-2.5 sm:py-3 text-[13px] sm:text-sm font-medium border border-black/80 rounded-full transition-all duration-300 ${
                      activeTab === tab.id ? "bg-[#E1CD75] " : "hover:border-black"
                    }`}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    {tab.label}
                  </button>
                </li>
              ))}
          </ul>
        </div>

        {/* Tab Content */}
        <div className="rounded-lg bg-white animate-slideUp mt-10">
          <div className="flex flex-col lg:flex-row justify-center items-center gap-0 xl:gap-20 2xl:gap-10">
            {/* Media */}
            <div className="w-full lg:w-1/2 mb-16 xl:mb-0 md:h-[500px] flex justify-center">
              {/* <img
                src={currentTabContent?.media || "/assets/img/1.webp"}
                height={500}
                width={500}
                alt={currentTabContent?.title?.rendered || "Image"}
                className="max-w-full object-cover transition-transform duration-300 ease-in-out transform scale-100 hover:scale-105"
                loading="lazy"
              /> */}
              <video src={currentTabContent?.media} autoPlay playsInline loop muted className="w-full object-cover" />
              {/* <video src={"/homevideo2.webm"} autoPlay loop muted className="w-full object-cover" /> */}
            </div>

            {/* Text */}
            <div className="w-full lg:w-1/2 text-center lg:text-left flex flex-col justify-center gap-4">
              <h3 className="text-2xl sm:text-2xl text-gray-800 whitespace-nowrap">
                {currentTabContent?.title?.split(" ")[0]} {currentTabContent?.title?.split(" ").slice(1).join(" ")}
              </h3>

              <p className="text-sm sm:text-base text-gray-600 animate-fadeIn delay-400">
                {currentTabContent?.description}
              </p>
              <div className="flex flex-col items-center max-w-full sm:flex-row md:text-nowrap justify-center lg:justify-start mt-4 gap-2">
                {currentTabContent?.highlights?.map(
                  (highlight: any, index: any) =>
                    highlight && (
                      <span key={index} className="px-4 py-2 bg-[#f7e8a7] text-black rounded-full text-xs sm:text-sm">
                        {highlight}
                      </span>
                    )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesComponent;
