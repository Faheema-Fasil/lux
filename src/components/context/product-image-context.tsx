'use client'
import { apiEndpoints } from "@/server-api/config/api.endpoints";
import { fetchProductImages } from "@/helper/helper";
import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { fetchDataClientApi } from "@/server-api/apifunctions/apiService";

const ProductImageContext = createContext<any>(undefined);

export const ProductImageProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<Array<{ id: number }>>([]);
  const [productData, setProductData] = useState<
      Array<{ item: any; imageUrl: string }>
    >([]);

  useEffect(() => {
    const fetchImagesAndSetData = async () => {
      const productsWithImages = await fetchProductImages({
        items,
        fetchDataClientApi,
        apiEndpointGenerator: apiEndpoints.products.productDetails,
      });
    
      setProductData(productsWithImages);
    };

    fetchImagesAndSetData();
  }, [items]);


  return (
    <ProductImageContext.Provider value={{ productData, setItems }}>
      {children}
    </ProductImageContext.Provider>
  );
};

export const useProductImageContext = () => {
  const context = useContext(ProductImageContext);
  if (!context) {
    throw new Error("useProductImageContext must be used within a ProductImageProvider");
  }
  return context;
};