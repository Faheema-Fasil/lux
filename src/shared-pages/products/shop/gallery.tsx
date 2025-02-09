"use client";
import { fetchProductsApi } from "@/server-api/apifunctions/apiService";
import ProductList from "@/shared-pages/products/shop";
import React, { useEffect, useState } from "react";

interface Product {
  id: number;
  name: string;
}

const ProductsList = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const getProducts = async () => {
      const products: Product[] = await fetchProductsApi(20, 1);
      if (products) setProducts(products);
    };

    getProducts();
  }, []);

  return <ProductList products={products} />;
};

export default ProductsList;

