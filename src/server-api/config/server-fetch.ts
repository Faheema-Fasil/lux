import { getToken } from "@/storage";

export const consumerKey = process.env.NEXT_PUBLIC_KEY;
export const consumerSecret = process.env.NEXT_PUBLIC_CONSUMER;  

interface FetchOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  authRequired?: boolean;
  body?: any; 
  isFormData?: boolean; 
  cache?: RequestCache; 
}

export const fetchWithCache = async (
  url: string,
  { method = 'GET', authRequired = false, body, isFormData = false, cache = 'force-cache' }: FetchOptions = {}
) => {
  const token = getToken();
  const headers: { [key: string]: string } = {
    Accept: "application/json",
    'Authorization': token ? `Bearer ${token}` : '',
  };

  if (authRequired) {
    const encodedCredentials = Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64');
    headers['Authorization'] = `Basic ${encodedCredentials}`;
  }

  if (!isFormData && method !== 'GET') {
    headers['Content-Type'] = 'application/json';
  }

  try {
    const response = await fetch(url, {
      method,
      headers: isFormData ? { ...headers, 'Accept': '*/*' } : headers, 
      // cache: "no-store",
      cache: cache,
      // next: { revalidate: 20 },
      // next: { revalidate: 0 },
      next: { revalidate: 1000 },
      ...(body && { body: isFormData ? body : JSON.stringify(body) }), 
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
