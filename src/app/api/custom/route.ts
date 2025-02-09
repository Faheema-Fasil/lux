// /app/api/fetchData/route.ts (or /pages/api/fetchData.ts for older Next.js versions)

import { NextResponse } from "next/server";
import { createServerConnectAPI } from "@/server-api/config/server-connect-api";

const serverConnectAPI = createServerConnectAPI(true); // true for auth

export const GET = async (request: Request) => {
  try {
    const url = new URL(request.url);
    const apiEndpoint = url.searchParams.get("apiEndpoint");
    const restParams: Record<string, string> = {};

    for (const [key, value] of url.searchParams.entries()) {
      if (key !== "apiEndpoint") {
        restParams[key] = value;
      }
    }

    if (!apiEndpoint) {
      return new NextResponse(
        JSON.stringify({ error: "apiEndpoint is required" }),
        { status: 400 }
      );
    }

    const response = await serverConnectAPI.get(apiEndpoint, {
      params: restParams, 
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response || !response.data) {
      throw new Error("Error fetching data from the API");
    }

    return NextResponse.json(response.data);

  } catch (error: any) {
    console.error("Error fetching data:", error);
    return NextResponse.json(
      { error: "Error fetching data", details: error.message },
      { status: 500 }
    );
  }
};
