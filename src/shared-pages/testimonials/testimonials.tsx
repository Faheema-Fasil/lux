"use client";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Navigation, Pagination, Scrollbar } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";
import VideoModal from "./testimonial-video-modal";

// interface Testimonial {
//   id: number;
//   title: { rendered: string };
//   content: { rendered: string };
//   acf: { designation: string };
//   featured_media: number;
//   mediaUrl?: string;
// }

// interface TestimonialsComponentProps {
//   acf: {
//     titles: {
//       customer_voices_title: string,
//       customer_voices_subtitle: string,
//     };
//     testimonialsData: Testimonial[];
//   }
// }

export interface TitlesProps {
  acf: {
    [key: string]: string;
  };
}

export interface testimonialsData {
  title: { rendered: string; __html: string };
  content: { rendered: string; __html: string };
  acf: {
    video_url?: { url: string };
    thumbnail_image?: { url: string };
    logo_image?: { url: string };
    designation: { rendered: string; __html: string };
  };
}

const TestimonialsComponent = ({
  titles,
  testimonialsData,
}: {
  titles: TitlesProps;
  testimonialsData: testimonialsData[];
}) => {
  // const thumbnail_image = "/assets/img/1.png";
  // const video_url = "https://vimeo.com/1046443161";

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentVideoUrl, setCurrentVideoUrl] = useState("");

  const openModal = (videoUrl: any) => {
    setCurrentVideoUrl(videoUrl);
    setIsModalOpen(true);
  };
  const closeModal = () => setIsModalOpen(false);

  // const [testimonialsWithMedia, setTestimonialsWithMedia] = useState<Testimonial[]>([]);
  // const [testimonialsWithMedia, setTestimonialsWithMedia] = useState([]);

  // const fetchMedia = async (mediaId: number) => {
  //   try {
  //     const response = await fetchProductImageApi(mediaId);
  //     const media = await response.data;
  //     return media.source_url;
  //   } catch (error) {
  //     console.error('Error fetching media:', error);
  //     return null;
  //   }
  // };

  // useEffect(() => {
  //   const fetchAllMedia = async () => {
  //     const testimonialsWithMediaPromises = testimonialsData.map(async (testimonial) => {
  //       if(testimonial.featured_media) {
  //         const mediaUrl = await fetchMedia(testimonial.featured_media);
  //         return { ...testimonial, mediaUrl };
  //       }
  //     });

  //     const testimonialsWithMedia = await Promise.all(testimonialsWithMediaPromises);
  //     setTestimonialsWithMedia(testimonialsWithMedia);
  //   };

  //   fetchAllMedia();
  // }, [testimonialsData]);

  return (
    // <section className="bg-[#f1f1f1] pl-[100px] py-20 w-full px-0">
    //   <div className="text-center mt-[20px] mb-[50px]">
    //     <h2 className="text-[40px] font-normal text-[#272727]">{titles.acf.customer_voices_title}</h2>
    //     <p className="text-gray-600">{titles.acf.customer_voices_subtitle}</p>
    //   </div>

    //   {/* Swiper for Testimonials */}
    //   <Swiper
    //     modules={[Navigation, Pagination, Scrollbar, A11y]}
    //     spaceBetween={30}
    //     slidesPerView={1}
    //     pagination={{ clickable: true }}
    //     breakpoints={{
    //       640: { slidesPerView: 1 },
    //       768: { slidesPerView: 2 },
    //       1024: { slidesPerView: 3 },
    //     }}
    //     style={{ padding: "20px 40px" }}
    //   >
    //     {/* When querying for media, it takes a longer time to display the testimonials, so for images with media urls, fetch and display it in a seperate slide - this slide */}

    //     {/* Video Testimonial */}
    //     {/* <SwiperSlide>
    //       <div className="rounded-lg overflow-hidden shadow-lg h-[600px] flex flex-col justify-between bg-white p-0 relative">
    //         <img src="assets/img/video-test.png" alt="Video Testimonial" />
    //         <div className="absolute flex items-end bottom-0 left-0 w-full p-[30px] text-white">
    //           <div className="flex items-center">
    //             <div className="mr-4">
    //               <img src="assets/img/play-btn.svg" alt="Play Button" />
    //             </div>
    //             <div>
    //               <h3 className="text-white text-lg font-semibold">Sample Name</h3>
    //               <span className="text-sm text-gray-300">Designation Title</span>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </SwiperSlide> */}

    //     {/* Map Text Testimonials to Swiper Slides */}
    //     {testimonialsData.map((testimonial, index) => (
    //       <SwiperSlide key={index}>
    //         <div className="rounded-lg shadow-lg h-[400px] mb-10 flex flex-col justify-between bg-white p-4 overflow-hidden">

    //           {/* {testimonial.mediaUrl && (
    //             <Image height={1000} width={1000} src={testimonial.mediaUrl} alt="Testimonial Media" className="w-full h-auto rounded-lg" loading='lazy' />
    //           )} */}

    //           <div className="text-black mt-4" dangerouslySetInnerHTML={{ __html: testimonial.content.rendered }} />
    //           <div className="flex items-center gap-3 mt-5 border-t pt-5">
    //             <Image height={50} width={50} src="assets/img/google-review.svg" alt="Google Review" loading='lazy' />
    //             <div>
    //               <div className="text-black" dangerouslySetInnerHTML={{ __html: testimonial.title.rendered }} />
    //               <span className="text-black" dangerouslySetInnerHTML={{ __html: testimonial.acf.designation }} />
    //               <div className="text-black">
    //                 <span className="bringer-testimonials-stars4" />
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       </SwiperSlide>
    //     ))}
    //   </Swiper>
    // </section>

    // <section className="bg-[#f1f1f1] pl-[100px] py-20 w-full px-0">
    //   <div className="text-center mt-[20px] mb-[50px]">
    //     <h2 className="text-[40px] font-normal text-[#272727]">
    //       {titles.acf.customer_voices_title}
    //     </h2>
    //     <p className="text-gray-600">{titles.acf.customer_voices_subtitle}</p>
    //   </div>

    //   {/* Swiper for Testimonials */}
    //   <Swiper
    //     modules={[Navigation, Pagination, Scrollbar, A11y]}
    //     spaceBetween={30}
    //     slidesPerView={1}
    //     pagination={{ clickable: true }}
    //     autoplay={{
    //       delay: 5000, // Loop every 5 seconds
    //       disableOnInteraction: false,
    //     }}
    //     breakpoints={{
    //       640: { slidesPerView: 1 },
    //       768: { slidesPerView: 2 },
    //       1024: { slidesPerView: 3 },
    //     }}
    //     style={{ padding: "20px 40px" }}
    //   >
    //     {/* Map Testimonials to Swiper Slides */}
    //     {testimonialsData.map((testimonial, index) => (
    //       <SwiperSlide key={index}>
    //         <div className="rounded-lg shadow-lg h-[400px] mb-10 flex flex-col justify-between bg-white p-4 overflow-hidden transition-transform duration-300 hover:scale-105">
    //           <div
    //             className="text-black mt-4"
    //             dangerouslySetInnerHTML={{
    //               __html: testimonial.content.rendered,
    //             }}
    //           />
    //           <div className="flex items-center gap-3 mt-5 border-t pt-5">
    //             <Image
    //               height={50}
    //               width={50}
    //               src="assets/img/google-review.svg"
    //               alt="Google Review"
    //               loading="lazy"
    //             />
    //             <div>
    //               <div
    //                 className="text-black"
    //                 dangerouslySetInnerHTML={{
    //                   __html: testimonial.title.rendered,
    //                 }}
    //               />
    //               <span
    //                 className="text-black"
    //                 dangerouslySetInnerHTML={{
    //                   __html: testimonial.acf.designation,
    //                 }}
    //               />
    //               <div className="text-black">
    //                 <span className="bringer-testimonials-stars4" />
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       </SwiperSlide>
    //     ))}
    //   </Swiper>
    // </section>

    <section className="bg-[#f1f1f1]  py-20 w-full px-0">
      <div
        className="text-center mt-4 lg:mt-[20px] mb-[30px] lg:mb-[50px] "
        data-aos="fade-up" // AOS fade-in animation
        data-aos-duration="800"
      >
        <h2 className="text-[30px] md:text-[40px] font-normal text-[#272727] px-2">{titles?.acf?.customer_voices_title}</h2>
        <p className="text-gray-600 text-sm lg:text-base px-3">{titles?.acf?.customer_voices_subtitle}</p>
      </div>

      <div className="">
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={30}
          slidesPerView={1}
          loop
          pagination={{ clickable: true }}
          autoplay={{
            delay: 5000, // Loop every 5 seconds
            disableOnInteraction: false,
          }}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1280: { slidesPerView: 3 },
          }}
          style={{ padding: "20px 40px" }}
        >
          {testimonialsData && testimonialsData.map((testimonial, index) => (
            <SwiperSlide key={index}>
              {testimonial?.acf?.video_url?.url ? (
                <div className="rounded-lg shadow-lg h-[400px] w-full mb-10 flex flex-col justify-between bg-white p-4 overflow-hidden transform transition-transform duration-300 hover:scale-105 relative">
                  <img
                    src={testimonial?.acf?.thumbnail_image?.url}
                    alt="Video Testimonial"
                    className="h-full w-full object-cover rounded-md"
                  />
                  <div className="absolute flex items-end bottom-0 left-0 w-full p-[30px] text-white">
                    <div className="flex items-center">
                      <div className="mr-4">
                        <button className="play-button" onClick={() => openModal(testimonial?.acf?.video_url?.url)}>
                          <img src="assets/img/play-btn.svg" alt="Play Button" />
                        </button>
                      </div>
                      <div>
                        <h3
                          className="text-white text-lg font-semibold"
                          dangerouslySetInnerHTML={{
                            __html: testimonial?.title?.rendered,
                          }}
                        />
                        <span
                          className="text-sm text-gray-300"
                          dangerouslySetInnerHTML={{
                            __html: testimonial?.acf?.designation,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div
                  className="rounded-lg shadow-lg h-[400px] mb-10 flex flex-col justify-between bg-white p-4 pt-0 overflow-hidden transform transition-transform duration-300 hover:scale-105"
                  data-aos="fade-up"
                  data-aos-duration="800"
                  data-aos-delay={`${index * 200}`}
                >
                  <div
                    className="text-black text-[12px] sm:text-sm md:text-[17px] leading-4 sm:leading-5 mt-4 overflow-hidden"
                    dangerouslySetInnerHTML={{
                      __html: testimonial?.content?.rendered,
                    }}
                  />
                  <div className="flex items-center gap-3 mt-5 border-t pt-5">
                    {testimonial?.acf.logo_image?.url && (
                      <Image
                        height={50}
                        width={50}
                        src={testimonial?.acf.logo_image?.url}
                        alt="Google Review"
                        loading="lazy"
                        className="rounded-full"
                      />
                    )}

                    <div>
                      <div
                        className="text-black font-semibold"
                        dangerouslySetInnerHTML={{
                          __html: testimonial?.title?.rendered,
                        }}
                      />
                      <span
                        className="text-black text-sm"
                        dangerouslySetInnerHTML={{
                          __html: testimonial?.acf?.designation,
                        }}
                      />
                      <div className="text-black mt-1">
                        <span className="bringer-testimonials-stars4" />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      {/* Swiper for Testimonials */}
      <VideoModal isOpen={isModalOpen} closeModal={closeModal} testimonialVideo={currentVideoUrl} />
    </section>
  );
};

export default TestimonialsComponent;
