import React from "react";
import CardHoverComponent from "@/components/card/card-hover";
import Banner from "@/components/common/banner";
import Link from "next/link";
import FeaturesSection from "@/components/common/features-section";

interface CardPageLayoutProps {
  bannerData: {
    image: string;
    tagline: string;
    description: string;
    video?: string;
  };
  cardData: any;
  bodyContent: {
    htmlContent: string;
    buttonText: string;
    priceText: string;
    customizeLink: string;
  };
  features: Array<{ title: { rendered: string }; content: { rendered: string } }>;
  featureBackground: string;
  featureTitle: string;
  featureSubtitle: string;
}

const CardPageLayout: React.FC<CardPageLayoutProps> = ({
  bannerData,
  cardData,
  bodyContent,
  features,
  featureBackground,
  featureTitle,
  featureSubtitle,
}) => {
  return (
    <main id="bringer-main">
      <Banner
        bannerImage={bannerData?.image}
        bannerTagline={bannerData?.tagline}
        bannerDescription={bannerData?.description}
        bannerVideo={bannerData?.video}
      />

      <div
        className="services section-padding bg-cover bg-center py-16 w-full px-0"
        style={{
          backgroundImage: `url('/assets/img/sec-bg.png')`,
          backgroundSize: "150%",
        }}
      >
        <div className="container mx-auto py-5 md:py-20">
          <div className="flex flex-wrap items-center -mx-4">
            <div className="mb-14 lg:mb-0 md:w-full lg:w-1/2 lg:px-14">
              {cardData && cardData?.image && <CardHoverComponent card={cardData} />}
            </div>
            <div className="w-full lg:w-1/2 px-4 text-left">
              <div
                dangerouslySetInnerHTML={{
                  __html: bodyContent?.htmlContent,
                }}
              />
              <div className="flex mt-8 gap-4 items-center flex-col xl:flex-row text-center text-sm 2xl:text-lg">
                <Link
                  href={bodyContent?.customizeLink}
                  className="bg-primary text-white border border-primary rounded-full py-[8px] px-[30px] font-regular uppercase hover:bg-[#f0dac6] hover:border-[#f0dac6] hover:text-[#343434]"
                >
                  {bodyContent?.buttonText}
                </Link>
                <span className="text-gray-800">{bodyContent?.priceText}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <FeaturesSection
        backgroundImage={featureBackground}
        title={featureTitle}
        subtitle={featureSubtitle}
        features={features}
      />
    </main>
  );
};

export default CardPageLayout;
