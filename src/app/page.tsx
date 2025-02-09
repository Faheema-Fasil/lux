import { fetchHomePageTitlesApi } from "@/server-api/apifunctions/apiService";
import Banner from "@/shared-pages/home/banner";
import CardCategories from "@/shared-pages/home/card-categories";
import ExploreCollection from "@/shared-pages/home/explore-collection/explore-collection";
import Features from "@/shared-pages/features";
import HowItWorks from "@/shared-pages/home/how-it-works/how-it-works";
import Testimonials from "@/shared-pages/testimonials";
import ScrollToTop from "@/components/common/scroll-to-top";

export const metadata = {
  title: "Luxmetallic - Creating Elite Elegance, Customized Luxury Credit Card Artistry",
  description:
    "Looking to convert your plastic credit card into a stunning customized metal card! Discover luxurious, high-quality metal and 24k gold card options available at Luxmetallic for a truly captivating upgrade.",
  openGraph: {
    title: "Luxmetallic - Creating Elite Elegance, Customized Luxury Credit Card Artistry",
    description:
      "Looking to convert your plastic credit card into a stunning customized metal card! Discover luxurious, high-quality metal and 24k gold card options available at Luxmetallic for a truly captivating upgrade.",
    url: "https://www.luxmetallic.com/",
    images: [
      {
        url: "/assets/img/logo.png",
        alt: "Luxmetallic Logo",
      },
    ],
    type: "website",
  },
};

export default async function Home() {
  const titles = await fetchHomePageTitlesApi();

  return (
    <>
      {/* <Suspense> */}
      <Banner titles={titles.acf} />
      {/* </Suspense> */}
      {/* <Suspense fallback={<SuspenseFallbackLoader />}> */}
      {/* </Suspense> */}
      {/* <Suspense fallback={<SuspenseFallbackLoader />}> */}
      <div
        className="bg-white px-2 sm:px-4"
        style={{
          backgroundImage: "url('/assets/img/sec-bg.png')",
          backgroundPosition: "center 20%",
          backgroundSize: "150%",
        }}
      >
        <CardCategories titles={titles.acf} />
        <ExploreCollection titles={titles.acf} />
      </div>
      <HowItWorks titles={titles.acf} />
      {/* </Suspense> */}
      {/* <Suspense fallback={<SuspenseFallbackLoader />}> */}
      <Features />
      <Testimonials />
      <ScrollToTop />

      {/* </Suspense> */}
    </>
  );
}
