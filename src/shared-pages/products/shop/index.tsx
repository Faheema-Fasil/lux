// "use client";

// import React, { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { routes } from "@/config/routes";
// import Image from "next/image";
// import LoadingSkeleton from "@/components/common/skeleton-loader";
// import { ProductListingProps, ProductProps } from "@/types/products/types";
// import Link from "next/link";
// import { fetchProductsApi } from "@/server-api/apifunctions/apiService";

// // interface Category {
// //   slug: string;
// //   name: string;
// // }

// const ProductCardSkeleton = () => {
//   return (
//     <div className="flex flex-col border rounded-xl gap-3 p-4 mb-10 items-center md:w-[300px] md:m-auto">
//       {/* Image Skeleton */}
//       <LoadingSkeleton width="100%" height={200} variant="rectangular" className="md:h-[300px] sm:h-[200px]" />

//       {/* Title Skeleton */}
//       <LoadingSkeleton width="100%" height={20} variant="text" className="mt-2 md:w-[80%]" />

//       {/* Price Skeleton */}
//       <LoadingSkeleton width="100%" height={20} variant="text" className="mt-2 md:w-[50%]" />
//     </div>
//   );
// };

// const ProductListing = ({ products }: ProductListingProps) => {
//   const [productData, setProductData] = useState<ProductProps[]>([]);
//   const [selectedCategory, setSelectedCategory] = useState<string>("All");
//   const [filteredProducts, setFilteredProducts] = useState<ProductProps[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [moreLoading, setMoreLoading] = useState<boolean>(false);
//   const [page, setPage] = useState(2);
//   const [hasMore, setHasMore] = useState(true);
//   // //console.log("products",products)

//   const router = useRouter();

//   useEffect(() => {
//     if (products && Array.isArray(products)) {
//       setLoading(true);
//       const newProducts = products.filter(
//         (product: ProductProps) =>
//           !product.name.toLowerCase().includes("dual chip") &&
//           !product.name.toLowerCase().includes("full custom") &&
//           !product.name.toLowerCase().includes("digital business") &&
//           product.variations.length > 0
//       );
//       setProductData(newProducts);
//     } else {
//       console.error("Invalid product data format:", products);
//       setLoading(false);
//     }
//   }, [products]);

//   const fetchMoreProducts = async () => {
//     if (moreLoading || !hasMore) return;

//     setMoreLoading(true);
//     try {
//       const response = await fetchProductsApi(20, page);
//       const newProducts = response.filter(
//         (product: any) =>
//           !product.name.toLowerCase().includes("dual chip") &&
//           !product.name.toLowerCase().includes("full custom") &&
//           !product.name.toLowerCase().includes("digital business") &&
//           product.variations.length
//       );

//       if (newProducts.length > 0) {
//         setProductData((prev) => [...prev, ...newProducts]);
//         // setFilteredProducts((prev) => [...prev, ...newProducts]);
//         setPage(page + 1);
//       } else {
//         setHasMore(false);
//       }
//     } catch (error) {
//       console.error("Error fetching products:", error);
//     } finally {
//       setMoreLoading(false);
//     }
//   };

//   function debounce(func: (...args: any[]) => void, wait: number) {
//     let timeout: NodeJS.Timeout;
//     return function (...args: any[]) {
//       clearTimeout(timeout);
//       timeout = setTimeout(() => func(...args), wait);
//     };
//   }

//   useEffect(() => {
//     const debouncedHandleScroll = debounce(() => {
//       const scrollPosition = window.innerHeight + document.documentElement.scrollTop;
//       const threshold =
//         window.innerWidth < 768
//           ? document.documentElement.offsetHeight - 1500
//           : document.documentElement.offsetHeight - 800;
//       if (scrollPosition >= threshold && selectedCategory === "All" && productData.length > 0) {
//         fetchMoreProducts();
//       }
//     }, 100);

//     window.addEventListener("scroll", debouncedHandleScroll);
//     return () => window.removeEventListener("scroll", debouncedHandleScroll);
//   }, [fetchMoreProducts]);

//   const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
//     setSelectedCategory(event.target.value);
//   };

//   // Manage Category filtering from backend
//   useEffect(() => {
//     if (selectedCategory === "All") {
//       setFilteredProducts(productData);
//     } else {
//       setFilteredProducts(
//         productData.filter((product) => product.categories.some((category) => category.slug === selectedCategory))
//       );
//     }
//   }, [selectedCategory, productData]);

//   useEffect(() => {
//     if (filteredProducts.length > 0) setLoading(false);
//   }, [filteredProducts]);

//   const getCategories = (): string[] => {
//     const categoriesSet = new Set<string>(["All"]);
//     productData.forEach((product) => {
//       product?.categories?.forEach((category: { slug: string }) => {
//         categoriesSet.add(category.slug);
//       });
//     });
//     console.log("categoriesSet", categoriesSet);
//     return Array.from(categoriesSet);
//   };

//   console.log("filteredProducts", filteredProducts);
//   return (
//     <>
//       <section className="bg-black relative flex items-center justify-center h-[640px] -mt-[100px] p-0">
//         <div className="absolute inset-0 h-full w-full overflow-hidden">
//           <Image src="/assets/img/shop-all/banner.png" layout="fill" objectFit="cover" alt="Banner" />
//         </div>
//         <div className="relative z-10 text-center text-white px-4 md:px-0 pt-[150px]">
//           <h1 className="text-[40px] font-bold leading-tight md:leading-[40px] mb-4">Discover the Collection</h1>
//           <p className="text-[18px] md:text-[25px] font-light leading-relaxed mt-4">
//             Explore our curated selection of pre-designed cards, crafted to elevate your style.
//           </p>
//         </div>
//       </section>

//       <section className="services  pt-[50px] w-full px-0">
//         <div className="container mx-auto px-4 md:px-6 lg:px-8">
//           <div className="lx-card-listing-section">
//             <div className="lx-card-list-head border-b-2 mb-5 py-3 flex flex-col gap-5 md:gap-0 md:flex-row justify-between items-center">
//               <h2 className="text-black text-2xl mb-5 md:mb-0">Pre-Designed Cards</h2>
//               <div className="lx-filter flex items-center">
//                 <p className="lx-filter-label text-md md:text-lg font-medium text-gray-900 mr-5">Filter by Category:</p>
//                 <select
//                   value={selectedCategory}
//                   onChange={handleCategoryChange}
//                   className="lx-select rounded-full px-4 pr-8 border-gray-300 text-gray-700 sm:text-sm py-1 md:py-2"
//                 >
//                   {getCategories().map((categorySlug: string, index: number) => {
//                     const category = productData
//                       .flatMap((product) => product?.categories)
//                       .find((cat) => cat.slug === categorySlug);

//                     return (
//                       <option key={index} value={categorySlug}>
//                         {category?.name || "All"}
//                       </option>
//                     );
//                   })}
//                 </select>
//               </div>
//             </div>

//             <div className="lx-card-list grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6 mb-20 py-10 ">
//               {loading
//                 ? Array.from({ length: 4 }).map((_, index) => <ProductCardSkeleton key={index} />)
//                 : filteredProducts?.length > 0 &&
//                   filteredProducts.map((data, i) => (
//                     <div
//                       key={i}
//                       className="lx-card flex flex-col border rounded-lg gap-3 p-3 md:p-4 transition ease-in-out relative group items-center"
//                     >
//                       <div className="mb-0 md:mb-10 flex flex-col items-center rounded-lg transform transition-transform duration-300 hover:scale-105 relative">
//                         <Link href={"/product-detail/" + data?.id}>
//                           <div className="h-20 w-28 md:h-56 md:w-56  relative group">
//                             <Image
//                               src={data?.images[0]?.src || "/default-image.jpg"}
//                               alt="Product image"
//                               width={250}
//                               height={300}
//                               className="w-full h-full object-contain rounded-lg group-hover:scale-100 transition-all duration-300 ease-in-out"
//                               loading="lazy"
//                             />
//                           </div>
//                           {/* Badge */}
//                           {/* <span className="absolute top-2 left-2 px-2 py-1 bg-primary text-[11px] text-white rounded-lg">
//                           Best Seller
//                         </span> */}
//                           <div className="absolute cursor-pointer text-[12px] md:text[14px] whitespace-nowrap bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full group-hover:translate-y-0 px-2 py-1 md:px-4 md:py-2 text-white btn-primary rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300">
//                             Customize
//                           </div>
//                         </Link>
//                       </div>
//                       <div className="flex flex-col items-center justify-center text-center px-3">
//                         <h3 className="text-[14px] md:text-lg font-medium text-black m-0">{data?.name}</h3>
//                         <h4 className="text-[14px] md:text-lg text-primary font-bold">AED {data?.price}</h4>
//                       </div>
//                     </div>
//                   ))}
//             </div>
//             {moreLoading ? (
//               <div className="flex items-center justify-center py-5">
//                 <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-900"></div>
//               </div>
//             ) : (
//               !hasMore &&
//               selectedCategory === "All" && <p className="text-center text-gray-500">You&apos;ve reached the end!</p>
//             )}
//           </div>
//         </div>
//       </section>
//     </>
//   );
// };

// export default ProductListing;

"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { routes } from "@/config/routes";
import Image from "next/image";
import LoadingSkeleton from "@/components/common/skeleton-loader";
import { ProductListingProps, ProductProps } from "@/types/products/types";
import Link from "next/link";
import { fetchProductsApi } from "@/server-api/apifunctions/apiService";

const ProductCardSkeleton = () => {
  return (
    <>
      <div className="hidden md:flex flex-col border rounded-xl gap-3 p-4 mb-10 items-center md:w-[300px] md:m-auto ">
        <LoadingSkeleton width="100%" height={200} variant="rectangular" className="md:h-[300px] h-[20px]" />
        <LoadingSkeleton width="100%" height={20} variant="text" className="mt-2 md:w-[80%]" />
        <LoadingSkeleton width="100%" height={20} variant="text" className="mt-2 md:w-[50%]" />
      </div>
      <div className="flex md:hidden flex-col border rounded-xl gap-3 p-4 mb-10 items-center md:w-[300px] md:m-auto ">
        <LoadingSkeleton width="100%" height={100} variant="rectangular" className="md:h-[300px] h-[20px]" />
        <LoadingSkeleton width="100%" height={20} variant="text" className="mt-2 md:w-[80%]" />
        <LoadingSkeleton width="100%" height={20} variant="text" className="mt-2 md:w-[50%]" />
      </div>
    </>
  );
};

const ProductListing = ({ products }: ProductListingProps) => {
  const [productData, setProductData] = useState<ProductProps[]>([]);
  const [categories, setCategories] = useState<{ id: number; slug: string; name: string }[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [loading, setLoading] = useState<boolean>(true);
  const [moreLoading, setMoreLoading] = useState<boolean>(false);
  const [page, setPage] = useState(2);
  const [hasMore, setHasMore] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (products && Array.isArray(products)) {
      // Get all unique categories from products
      const allCategories = products.flatMap((p) => p.categories || []);
      const uniqueCategories = allCategories.filter(
        (cat, index, self) => index === self.findIndex((c) => c.slug === cat.slug)
      );
      setCategories(uniqueCategories);

      // Initial product filtering
      const newProducts = products.filter(
        (product) =>
          !product.name.toLowerCase().includes("dual chip") &&
          !product.name.toLowerCase().includes("full custom") &&
          !product.name.toLowerCase().includes("digital business") &&
          product.variations.length > 0
      );
      setProductData(newProducts);
      setLoading(false);
    }
  }, [products]);

  // Fetch products when category changes
  useEffect(() => {
    const fetchCategoryProducts = async () => {
      setLoading(true);
      setProductData([]);
      setPage(1);
      setHasMore(true);

      try {
        const response = await fetchProductsApi(20, 1, selectedCategory !== "All" ? selectedCategory : "");

        const newProducts = response.filter(
          (product: ProductProps) =>
            !product.name.toLowerCase().includes("dual chip") &&
            !product.name.toLowerCase().includes("full custom") &&
            !product.name.toLowerCase().includes("digital business") &&
            product.variations.length > 0
        );

        setProductData(newProducts);
        setHasMore(response.length >= 20);
        setPage(2);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryProducts();
  }, [selectedCategory]);

  const fetchMoreProducts = async () => {
    if (moreLoading || !hasMore) return;

    setMoreLoading(true);
    try {
      const response = await fetchProductsApi(20, page, selectedCategory !== "All" ? selectedCategory : "");

      const newProducts = response.filter(
        (product: ProductProps) =>
          !product.name.toLowerCase().includes("dual chip") &&
          !product.name.toLowerCase().includes("full custom") &&
          !product.name.toLowerCase().includes("digital business") &&
          product.variations.length > 0
      );

      if (newProducts.length > 0) {
        setProductData((prev) => [...prev, ...newProducts]);
        setPage((prev) => prev + 1);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setMoreLoading(false);
    }
  };

  const debounce = (func: Function, wait: number) => {
    let timeout: NodeJS.Timeout;
    return (...args: any[]) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  };

  useEffect(() => {
    const handleScroll = debounce(() => {
      const scrollPosition = window.innerHeight + document.documentElement.scrollTop;
      const threshold = window.innerWidth < 768 
        ? document.documentElement.offsetHeight - 1800 
        : document.documentElement.offsetHeight - 800;
      if (scrollPosition >= threshold && hasMore) {
        fetchMoreProducts();
      }
    }, 100);

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMore, moreLoading]);

  return (
    <>
      <section className="bg-black relative flex items-center justify-center h-[640px] -mt-[100px] p-0">
        <div className="absolute inset-0 h-full w-full overflow-hidden">
          <Image src="/assets/img/shop-all/banner.png" layout="fill" objectFit="cover" alt="Banner" priority />
        </div>
        <div className="relative z-10 text-center text-white px-4 md:px-0 pt-[150px]">
          <h1 className="text-[40px] font-bold leading-tight md:leading-[40px] mb-4">Discover the Collection</h1>
          <p className="text-[18px] md:text-[25px] font-light leading-relaxed mt-4">
            Explore our curated selection of pre-designed cards, crafted to elevate your style.
          </p>
        </div>
      </section>

      <section className="services pt-[50px] w-full px-0">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="lx-card-listing-section">
            <div className="lx-card-list-head border-b-2 mb-5 py-3 flex flex-col gap-5 md:gap-0 md:flex-row justify-between items-center">
              <h2 className="text-black text-2xl mb-5 md:mb-0">Pre-Designed Cards</h2>
              <div className="lx-filter flex items-center">
                <p className="lx-filter-label text-md md:text-lg font-medium text-gray-900 mr-5">Filter by Category:</p>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="lx-select rounded-full px-4 pr-8 border-gray-300 text-gray-700 sm:text-sm py-1 md:py-2"
                >
                  <option value="All">All</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="lx-card-list grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6 mb-20 py-10 ">
              {loading
                ? Array.from({ length: 4 }).map((_, index) => <ProductCardSkeleton key={index} />)
                : productData?.map((data, i) => (
                    <div
                      key={i}
                      className="lx-card flex flex-col border rounded-lg gap-3 p-3 md:p-4 transition ease-in-out relative group items-center"
                    >
                      <div className="mb-0 md:mb-10 flex flex-col items-center rounded-lg transform transition-transform duration-300 hover:scale-105 relative">
                        <Link href={`/product-detail/${data?.id}`}>
                          <div className="h-20 w-28 md:h-56 md:w-56 relative group">
                            <Image
                              src={data?.images[0]?.src || "/default-image.jpg"}
                              alt="Product image"
                              width={250}
                              height={300}
                              className="w-full h-full object-contain rounded-lg group-hover:scale-100 transition-all duration-300 ease-in-out"
                              priority
                            />
                          </div>
                          <div className="absolute cursor-pointer text-[12px] md:text[14px] whitespace-nowrap bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full group-hover:translate-y-0 px-2 py-1 md:px-4 md:py-2 text-white btn-primary rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300">
                            Customize
                          </div>
                        </Link>
                      </div>
                      <div className="flex flex-col items-center justify-center text-center px-3">
                        <h3 className="text-[14px] md:text-lg font-medium text-black m-0">{data?.name}</h3>
                        <h4 className="text-[14px] md:text-lg text-primary font-bold">AED {data?.price}</h4>
                      </div>
                    </div>
                  ))}
            </div>
            {moreLoading && (
              <div className="flex items-center justify-center py-5">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-900"></div>
              </div>
            )}
            {!hasMore && <p className="text-center text-gray-500">You&apos;ve reached the end!</p>}
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductListing;
