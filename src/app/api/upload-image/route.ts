import { apiEndpoints } from "@/server-api/config/api.endpoints";
import { createServerConnectAPI } from "@/server-api/config/server-connect-api";

const serverConnectAPI = createServerConnectAPI(true);

export const POST = async (request: Request) => {
  try {
    const formData = await request.formData(); 

    const image = formData.get("file");
    if (!image) {
      return new Response(JSON.stringify({ error: "No image file provided" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const formDataForUpload = new FormData();
    formDataForUpload.append("media_attachment", formData.get("title") as string);
    formDataForUpload.append("file", image as Blob, formData.get("title") as string);
    formDataForUpload.append("title", formData.get("title") as string);
    formDataForUpload.append("alt_text", formData.get("alt_text") as string);

    const response = await serverConnectAPI.post(apiEndpoints.products.addImage, formDataForUpload);

    if (!response || !response.data) {
      throw new Error("Error uploading image");
    }

    return new Response(JSON.stringify(response.data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    console.error("Image Upload Failed:", error);
    return new Response(
      JSON.stringify({
        error: "Image upload failed",
        details: error.message,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};
