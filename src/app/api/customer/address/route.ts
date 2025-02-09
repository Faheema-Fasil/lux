import { NextResponse } from "next/server";
import { apiEndpoints } from "@/server-api/config/api.endpoints";
import { createServerConnectAPI } from "@/server-api/config/server-connect-api";


const serverConnectAPI = createServerConnectAPI(true);

export const PUT = async (request: Request) => {
  try {
    const formData = await request.json(); // Get the request body as JSON

    // Ensure the necessary data is provided
    if (!formData.cartKey || (!formData.billing && !formData.shipping)) {
      return new Response(
        JSON.stringify({ error: "Missing cart key or address data" }),
        { status: 400 }
      );
    }

    const { cartKey, ...addressData } = formData;

    const response = await serverConnectAPI.put(
      `${apiEndpoints.user.updateprofile}${cartKey}`,
      addressData
    );

    if (!response || !response.data) {
      throw new Error("Error updating address");
    }

    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error("Error updating customer address:", error);
    return NextResponse.json(
      { error: "Error updating address", details: error.message },
      { status: 500 }
    );
  }
};
