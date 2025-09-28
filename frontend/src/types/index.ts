export interface DesignStyle {
  id: string;
  name: string;
  emoji: string;
  prompt: string;
  description: string;
}

export interface ApiResponse {
  success: boolean;
  generated_image: string;
  original_image?: string;
  message?: string;
  processing_time?: number;
}

export interface UploadedImage {
  id: string;
  url: string;
  name: string;
  size: number;
  uploadedAt: Date;
}