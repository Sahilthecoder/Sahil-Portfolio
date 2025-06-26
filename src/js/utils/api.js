// src/js/utils/api.js

// Base URL of your backend API - replace with your actual backend URL
const API_BASE_URL = 'https://your-api-endpoint.com'; 

/**
 * Sends contact form data to the backend API.
 * @param {Object} data - The contact form data to send.
 * @returns {Promise<Object>} - The JSON response from the server.
 * @throws Will throw an error if the network request fails or server returns an error.
 */
export async function postContactForm(data) {
  try {
    const response = await fetch(`${API_BASE_URL}/contact`, {
      method: 'POST', // HTTP POST method
      headers: {
        'Content-Type': 'application/json', // Sending JSON data
      },
      body: JSON.stringify(data), // Convert JS object to JSON string
    });

    // Check if response is successful (status code 2xx)
    if (!response.ok) {
      throw new Error(`Server error: ${response.status}`);
    }

    // Parse and return JSON response body
    return await response.json();
  } catch (error) {
    // Log error and rethrow for caller to handle
    console.error('Contact form submission failed:', error);
    throw error;
  }
}

/**
 * Fetches the resume data from the backend API.
 * @returns {Promise<Object>} - The JSON response from the server.
 * @throws Will throw an error if the network request fails or server returns an error.
 */
export async function fetchResume() {
  try {
    const response = await fetch(`${API_BASE_URL}/resume`);
    if (!response.ok) {
      throw new Error(`Server error: ${response.status}`);
    }
    // Parse and return JSON response body
    return await response.json();
  } catch (error) {
    // Log error and rethrow for caller to handle
    console.error('Resume fetch failed:', error);
    throw error;
  }
}