// src/js/utils/api.js

const API_BASE_URL = 'https://your-api-endpoint.com'; // Replace with your backend URL

export async function postContactForm(data) {
  try {
    const response = await fetch(`${API_BASE_URL}/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Server error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Contact form submission failed:', error);
    throw error;
  }
}
