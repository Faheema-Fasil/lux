"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import { fetchProductsBySearchApi } from "@/server-api/apifunctions/apiService";

// Placeholder for a skeleton loader
const ProductCardSkeleton = () => (
  <div className="w-full h-48 bg-gray-300 animate-pulse rounded-lg"></div>
);

const SearchResultsPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams.get("query") || "";

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (query) {
      // Fetch products from custom WordPress endpoint
      const fetchProducts = async () => {
        setLoading(true);
        try {
          const res = await fetchProductsBySearchApi(query);
          setProducts(res);
        } catch (error) {
          console.error("Error fetching products:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchProducts();
    }
  }, [query]);

  const handleProductClick = (product: any) => {
    if (product.name.toLowerCase().includes("custom")) {
      router.push(`/full-custom-metal-card`);
    } else if (product.name.toLowerCase().includes("dual")) {
      router.push("/dual-chip-metal-card");
    } else if (product.name.toLowerCase().includes("business")) {
      router.push("/digital-business-credit-card");
    } else {
      router.push(`/product-detail/${product.id}`);
    }
  };

  return (
    <>
      <section className="bg-black relative flex items-center justify-center h-[640px] -mt-[100px] p-0">
        <div className="absolute inset-0 h-full w-full overflow-hidden">
          <Image
            src="/assets/img/shop-all/banner.png"
            layout="fill"
            objectFit="cover"
            alt="Banner"
          />
        </div>
        <div className="relative z-10 text-center text-white px-4 md:px-0 pt-[150px]">
          <h1 className="text-[40px] font-bold leading-tight md:leading-[40px] mb-4">
            Discover the Collection
          </h1>
          <p className="text-[18px] md:text-[25px] font-light leading-relaxed mt-4">
            Explore our curated selection of pre-designed cards, crafted to
            elevate your style.
          </p>
        </div>
      </section>
      <div className="bg-gray-100">
        {/* Header Section */}
        <div className="lx-card-list-head border-b-2 mb-5 py-3 flex flex-col gap-5 md:gap-0 md:flex-row justify-between items-center">
          <div className="container mx-auto px-4 py-5">
            <h1 className="text-4xl font-bold">Search Results</h1>
            <p className="text-lg mt-2">
              {query
                ? `Results for "${query}"`
                : "Explore our curated selection."}
            </p>
          </div>
        </div>

        {/* Results Section */}
        <section className="container mx-auto px-4 pt-10 pb-20">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, index) => (
                <ProductCardSkeleton key={index} />
              ))}
            </div>
          ) : products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product: any) => (
                <div
                  key={product.id}
                  className="border rounded-lg p-4 flex flex-col items-center cursor-pointer hover:shadow-lg transition"
                  onClick={() => handleProductClick(product)}
                >
                  <div className="relative w-full h-48">
                    <Image
                      src={product.image || "/placeholder-image.jpg"}
                      alt={product.name}
                      layout="fill"
                      objectFit="contain"
                    />
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-black">
                    {product.name}
                  </h3>
                  <p className="mt-2 text-primary font-semibold">
                    {product.price
                      ? `AED ${product.price}`
                      : "Price on request"}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 mt-10">
              No results found for "{query}". Please try again.
            </p>
          )}
        </section>
      </div>
    </>
  );
};

export default SearchResultsPage;
