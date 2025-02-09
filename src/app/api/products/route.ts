import { apiEndpoints } from "@/server-api/config/api.endpoints";
import { fetchWithCache } from "@/server-api/config/server-fetch";
import { NextResponse } from "next/server";

export const GET = async (request: Request) => {
  try {
    console.log("Incoming request:", request.url); 

    const url = new URL(request.url);
    const perpage = Number(url.searchParams.get("perpage")) || 10;
    const page = Number(url.searchParams.get("page")) || 1;
    
    const categoryParam = url.searchParams.get("category");
    const category = categoryParam && categoryParam !== "null" && categoryParam !== "undefined" ? categoryParam : undefined;

    console.log("Parsed query params:", { perpage, page, category });

    const apiUrl = category 
      ? apiEndpoints.products.productLists(perpage, page, category) 
      : apiEndpoints.products.productLists(perpage, page);

    console.log("API endpoint URL:", apiUrl);

    const response = await fetchWithCache(apiUrl, { authRequired: true });
    console.log("Raw response from fetchWithCache:", response);

    const data = await response;
    console.log("Parsed response data:", data);

    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Error in GET /api/products:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
};
