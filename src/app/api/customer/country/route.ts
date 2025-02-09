import { NextResponse } from "next/server";
import { apiEndpoints } from "@/server-api/config/api.endpoints";
import { createServerConnectAPI } from "@/server-api/config/server-connect-api";


const serverConnectAPI = createServerConnectAPI(true);

export const PUT = async (request: Request) => {
  try {
    const formData = await request.json(); 

    if (!formData.cartKey || !formData.shipping || !formData.billing) {
      return new Response(
        JSON.stringify({ error: "Missing cart key or country data" }),
        { status: 400 }
      );
    }

    const { cartKey, shipping, billing } = formData;

    const updateData = {
      shipping: { country: shipping.country },
      billing: { country: billing.country },
    };

    const response = await serverConnectAPI.put(
      `${apiEndpoints.user.updateprofile}${cartKey}`,
      updateData
    );

    if (!response || !response.data) {
      throw new Error("Error updating country");
    }

    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error("Error updating customer country:", error);
    return NextResponse.json(
      { error: "Error updating country", details: error.message },
      { status: 500 }
    );
  }
};
