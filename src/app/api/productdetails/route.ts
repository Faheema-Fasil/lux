import { NextResponse } from "next/server";
import { fetchWithCache} from "@/server-api/config/server-fetch";
import { apiEndpoints } from "@/server-api/config/api.endpoints";

export const GET = async (request: Request) => {
  try {
    const url = new URL(request.url);
    const id = Number(url.searchParams.get("id"));

    if (!id) {
      return new NextResponse(
        JSON.stringify({ error: "id is required" }),
        { status: 400 }
      );
    }

    const response = await fetchWithCache(apiEndpoints.products.productDetails(id), {
      method: "GET",
      authRequired: true,
    });

    if (!response) {
      throw new Error("Error fetching data from the API");
    }

    return NextResponse.json(response);

  } catch (error: any) {
    console.error("Error fetching data:", error);
    return NextResponse.json(
      { error: "Error fetching data", details: error.message },
      { status: 500 }
    );
  }
};

