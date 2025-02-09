import { apiEndpoints } from "@/server-api/config/api.endpoints";
import { createServerConnectAPI } from "@/server-api/config/server-connect-api";

const serverConnectAPI = createServerConnectAPI(true);


export const POST = async (request: Request) => {
  try {
    const userData = await request.json();

    const response = await serverConnectAPI.post(apiEndpoints.auth.register, userData);

    return new Response(JSON.stringify(response.data), {
      status: response.status, 
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message || "Registration failed";
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
