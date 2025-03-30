import axios from 'axios';
import { Cookies } from 'react-cookie';
import { createClient } from '@supabase/supabase-js';

const RETRY_DELAY = 1000; // 1 second
const MAX_RETRIES = 3;

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Initialize cookies
const cookies = new Cookies();

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || '', // Set your API base URL
  timeout: 10000, // Set a timeout for requests
  headers: {
    'Content-Type': 'application/json',
  },
});

// Handle request errors
const handleRequestError = (error: any) => {
  const errorMessage = error?.response?.data?.message || error?.message || 'Something went wrong';
  return {
    status: error?.response?.status || 500,
    message: errorMessage,
    data: error?.response?.data || null,
  };
};

// Retry logic for GET requests
const retryGetRequest = async (requestFn: any, endpoint: string, retries: number) => {
  let retryCount = 0;

  while (retryCount < retries) {
    try {
      return await requestFn(endpoint);
    } catch (error) {
      retryCount++;
      if (retryCount >= retries) {
        throw error;
      }
      await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY));
    }
  }
};

// Helper to get the access token from cookies
const getAccessTokenFromCookies = () => {
  return cookies.get('access_token');
};

// Helper to refresh the access token using Supabase
const refreshAccessToken = async () => {
  const refreshToken = cookies.get('refresh_token');
  if (!refreshToken) {
    throw new Error('Refresh token is missing. Please log in again.');
  }

  const { data, error } = await supabase.auth.refreshSession({ refresh_token: refreshToken });
  if (error || !data.session) {
    throw new Error('Failed to refresh access token. Please log in again.');
  }

  // Store the new tokens in cookies
  cookies.set('access_token', data.session.access_token, { path: '/', httpOnly: false });
  cookies.set('refresh_token', data.session.refresh_token, { path: '/', httpOnly: false });

  return data.session.access_token;
};

// GET request
export const getRequest = async (endpoint: string) => {
  try {
    let accessToken = getAccessTokenFromCookies();
    if (!accessToken) {
      accessToken = await refreshAccessToken();
    }

    const response = await retryGetRequest(
      (url: string) =>
        axiosInstance.get(url, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }),
      endpoint,
      MAX_RETRIES
    );
    return response.data;
  } catch (error) {
    return handleRequestError(error);
  }
};

// POST request
export const postRequest = async (endpoint: string, payload: any) => {
  try {
    let accessToken = getAccessTokenFromCookies();
    if (!accessToken) {
      accessToken = await refreshAccessToken();
    }

    const response = await axiosInstance.post(endpoint, payload, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    return handleRequestError(error);
  }
};

// DELETE request
export const deleteRequest = async (endpoint: string) => {
  try {
    let accessToken = getAccessTokenFromCookies();
    if (!accessToken) {
      accessToken = await refreshAccessToken();
    }

    const response = await axiosInstance.delete(endpoint, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    return handleRequestError(error);
  }
};

// PATCH request
export const patchRequest = async (endpoint: string, payload: any) => {
  try {
    let accessToken = getAccessTokenFromCookies();
    if (!accessToken) {
      accessToken = await refreshAccessToken();
    }

    const response = await axiosInstance.patch(endpoint, payload, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    return handleRequestError(error);
  }
};

// POST request for file uploads
export const postFileRequest = async (endpoint: string, payload: any) => {
  try {
    let accessToken = getAccessTokenFromCookies();
    if (!accessToken) {
      accessToken = await refreshAccessToken();
    }

    const response = await axiosInstance.post(endpoint, payload, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    return handleRequestError(error);
  }
};