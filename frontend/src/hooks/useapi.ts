import { useState } from 'react';
import { ApiResponse } from '../types';

export const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateDesign = async (image: string, description: string): Promise<ApiResponse> => {
    setLoading(true);
    setError(null);

    try {
      // Convert base64 to blob
      const response = await fetch(image);
      const blob = await response.blob();
      
      const formData = new FormData();
      formData.append('image', blob, 'room.jpg');
      formData.append('description', description);

      const apiResponse = await fetch('http://localhost:8000/generate-design', {
        method: 'POST',
        body: formData,
      });

      if (!apiResponse.ok) {
        throw new Error(`HTTP error! status: ${apiResponse.status}`);
      }

      const data: ApiResponse = await apiResponse.json();
      return data;
      
    } catch (err) {
      const message = err instanceof Error ? err.message : 'خطای ناشناخته';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    generateDesign
  };
};
