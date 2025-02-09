import { useEffect, useState } from "react";
import Head from "next/head";
import {
  placeGuestOrderApi,
  placeOrderApi,
} from "@/server-api/apifunctions/apiService";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { toast } from "react-toastify";

export default function PaymentSection({
  formData,
  setStatus,
}: {
  formData: any;
  setStatus: any;
}) {
  const [iframeUrl, setIframeUrl] = useState("");
  const [error, setError] = useState("");
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    const loadTelrIframe = async () => {
      try {
        // Fetch the Telr iframe URL from the WordPress backend
        let response;
        setStatus("loading");

        if (isAuthenticated) {
          //Call placeOrderApi
          response = await placeOrderApi(formData);
        } else {
          response = await placeGuestOrderApi("shipping", formData);
          //Call placeGuestOrderApi
          toast.success("Success");
        }

        if (response.url) {
          setStatus("success");
          setIframeUrl(response.url);
        } else {
          setError("Failed to retrieve the payment gateway URL.");
          console.error("Error fetching iframe URL:", response);
        }
      } catch (err) {
        setStatus("error");
        console.error("Error loading Telr iframe:", err);
        setError("An error occurred while processing the payment.");
      }
    };

    loadTelrIframe();
  }, []);

  return (
    <div>
      <Head>
        <title>Checkout</title>
        <meta name="description" content="Secure Payment Gateway" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto px-4 py-8">
        {error && <p className="text-red-500">{error}</p>}

        {iframeUrl ? (
          <iframe
            id="telr_iframe"
            src={iframeUrl}
            className="w-full h-[400px] border"
            title="Payment Gateway"
          ></iframe>
        ) : (
          // <div dangerouslySetInnerHTML={{ __html: iframeUrl }}/>
          <p>Loading payment gateway...</p>
        )}
      </main>
    </div>
  );
}
