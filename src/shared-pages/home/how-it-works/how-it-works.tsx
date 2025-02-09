import { fetchHowItWorksApi } from "@/server-api/apifunctions/apiService";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import HowItWorksCardImage from "./card-image";

const HowItWorks = async ({ titles }: any) => {
  const response = await fetchHowItWorksApi();
  // const data = response.data as Array<any>;

  const formattedSteps = response
    .map((item: any) => ({
      step: item?.acf?.order || "N/A",
      title: item?.title?.rendered || "Untitled",
      description: item?.content?.rendered.replace(/<\/?[^>]+(>|$)/g, ""),
    }))
    .sort((a: any, b: any) => a.step - b.step);

  // const videoUrl = "/cards3.webm";
  const photoUrl = "/how-it-works-front.png";

  return (
    <section
      className=" mx-auto bg-white py-5"
      style={{
        backgroundImage: `url(${titles?.how_it_works_bg_image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="container mx-auto">
        <div className="flex flex-wrap items-center -mx-4">
          <div className="w-full lg:w-1/2 px-4">
            <HowItWorksCardImage photoUrl={photoUrl} />
          </div>
          
          {/* <div className="w-full lg:w-1/2 px-4">
            <div className="animate-box mb-8">
              <div className="text-center flex justify-center">
                <Link href="/about-us">
                  
                  <img
                    src={titles?.how_it_works_banner_image}
                    alt=""
                    className="mx-auto xl:w-[400px] 2xl:w-[500px]  transition duration-500 ease-in-out hover:scale-110"
                  />
                </Link>
              </div>
            </div>
          </div> */}

          <div className="w-full lg:w-1/2 px-4 ">
            <div className="mb-5">
              <h1 className="text-[30px] md:text-[40px] font-normal text-black">{titles?.how_it_works_title}</h1>
            </div>

            <div className="steps-container space-y-6 ">
              {formattedSteps &&
                formattedSteps.map((step: any, index: any) => (
                  <div
                    key={index}
                    className={`order-step flex flex-col ${
                      index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                    } items-center bg-white shadow-lg transition duration-500 ease-in-out hover:shadow-2xl hover:scale-105 hover:z-10 rounded-md pb-4 md:p-0`}
                  >
                    <div className="order-step-number flex items-center justify-center w-[80px] h-[80px] md:w-[100px] md:h-[100px] lg:w-[130px] lg:h-[130px] text-[#F3D55B] mb-4 lg:mb-0">
                      <span className="text-4xl md:text-5xl lg:text-7xl font-thin">{step.step}</span>
                    </div>
                    <div className="order-step-content flex-1 text-center lg:text-left px-4 md:px-6 lg:px-10">
                      <h2
                        className="text-xl md:text-2xl lg:text-2xl font-semibold mb-3 text-black transition duration-500 ease-in-out hover:text-yellow-600"
                        dangerouslySetInnerHTML={{ __html: step?.title }}
                      />
                      <p
                        className="text-sm md:text-base text-gray-600 transition duration-500 ease-in-out hover:text-black"
                        dangerouslySetInnerHTML={{ __html: step?.description }}
                      />
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
