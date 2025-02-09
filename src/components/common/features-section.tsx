import React from "react";

interface FeaturesSectionProps {
  backgroundImage: string;
  title: string;
  subtitle: string;
  features: Array<{ title: { rendered: string }; content: { rendered: string } }>;
}

const FeaturesSection: React.FC<FeaturesSectionProps> = ({
  backgroundImage,
  title,
  subtitle,
  features,
}) => {
  return (
    <div
      className="services section-padding bg-black bg-center py-[80px] w-full px-0"
      style={{
        backgroundImage: `url('${backgroundImage}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-5">
          <h2 className="text-[30px] md:text-[40px] font-bold text-white">{title && title}</h2>
          <p className="text-white text-[20px] md:text-[30px]">{subtitle && subtitle}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features && features.map((feature, index) => (
            <div
              key={index}
              className="p-4 bg-opacity-0 transition-all duration-300 hover:bg-opacity-10 hover:bg-[#f0dac6] rounded-md text-center md:text-left"
            >
              <h2
                className="text-2xl font-bold text-[#b88c4f] mb-4"
                dangerouslySetInnerHTML={{
                  __html: feature?.title?.rendered,
                }}
              />
              <p
                className="text-[#f0dac6] text-center md:text-left"
                dangerouslySetInnerHTML={{
                  __html: feature?.content?.rendered,
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
