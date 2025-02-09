import { NextResponse } from "next/server";
import { apiEndpoints } from "@/server-api/config/api.endpoints";
import { createServerConnectAPI } from "@/server-api/config/server-connect-api";

const serverConnectAPI = createServerConnectAPI(true);

export const DELETE = async (request: Request) => {
  try {
    const url = new URL(request.url);
    const orderId = url.searchParams.get("orderId");

    if (!orderId) {
      return new NextResponse(
        JSON.stringify({ error: "Order ID is required" }),
        { status: 400 }
      );
    }

    const response = await serverConnectAPI.delete(
      apiEndpoints.order.updateorder(orderId)
    );

    if (!response || !response.data) {
      throw new Error("Error canceling the order");
    }

    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error("Error canceling the order:", error);
    return NextResponse.json(
      { error: "Error canceling the order", details: error.message },
      { status: 500 }
    );
  }
};
