import { NextResponse } from "next/server";
import { apiEndpoints } from "@/server-api/config/api.endpoints";
import { createServerConnectAPI } from "@/server-api/config/server-connect-api";

const serverConnectAPI = createServerConnectAPI(true);

export const POST = async (request: Request) => {
  try {
    const formData = await request.json();

    if (!formData.cartKey  || !formData.email || !formData.shipping || !formData.billing) {
      return new Response(
        JSON.stringify({ error: "Missing cart key or required profile data" }),
        { status: 400 }
      );
    }

    const { cartKey, ...profileData } = formData;

    const response = await serverConnectAPI.post(
      `${apiEndpoints.user.updateprofile}${cartKey}`,
      profileData
    );

    if (!response || !response.data) {
      throw new Error("Error updating profile");
    }

    return NextResponse.json(response.data);
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message || "Profile updation failed";
    const errorStatus = error.response?.status || 500;

    return new Response(
      JSON.stringify({ error: errorMessage }),
      {
        status: errorStatus,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};
