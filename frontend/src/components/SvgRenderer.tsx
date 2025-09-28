import React, { useState, useEffect } from "react";

interface SvgRendererProps {
  svgData: string;
  alt: string;
  className?: string;
  onLoad?: () => void;
  onError?: (error: Error) => void;
}

export const SvgRenderer: React.FC<SvgRendererProps> = ({
  svgData,
  alt,
  className = "w-full h-64 object-contain rounded-xl shadow-md",
  onLoad,
  onError,
}) => {
  const [objectUrl, setObjectUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const processImage = async () => {
      setIsLoading(true);
      setHasError(false);

      try {
        let processedUrl = svgData;

        if (svgData.startsWith("data:image/svg+xml;base64,")) {
          // SVG base64
          const base64 = svgData.replace("data:image/svg+xml;base64,", "");
          const decoded = atob(base64);
          const blob = new Blob([decoded], { type: "image/svg+xml" });
          processedUrl = URL.createObjectURL(blob);
        } else if (svgData.startsWith("<svg")) {
          // SVG خام
          const blob = new Blob([svgData], { type: "image/svg+xml" });
          processedUrl = URL.createObjectURL(blob);
        } else if (
          svgData.startsWith("data:image/png;base64,") ||
          svgData.startsWith("data:image/jpeg;base64,")
        ) {
          // PNG یا JPEG
          processedUrl = svgData; // نیازی به blob نیست، مستقیماً می‌شه توی <img> استفاده کرد
        }

        setObjectUrl(processedUrl);
      } catch (error) {
        console.error("Error processing image:", error);
        setHasError(true);
        if (onError) onError(error as Error);
      } finally {
        setIsLoading(false);
      }
    };

    processImage();

    return () => {
      if (objectUrl && objectUrl.startsWith("blob:")) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [svgData]);

  if (isLoading) {
    return (
      <div
        className={`${className} flex items-center justify-center bg-gray-100`}
      >
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        <span className="mr-2 text-gray-600">در حال بارگذاری...</span>
      </div>
    );
  }

  if (hasError || !objectUrl) {
    return (
      <div
        className={`${className} flex flex-col items-center justify-center bg-red-50 border border-red-200 rounded-lg p-4`}
      >
        <p className="text-red-600 text-sm text-center">خطا در نمایش تصویر</p>
      </div>
    );
  }

  return (
    <img
      src={objectUrl}
      alt={alt}
      className={className}
      onLoad={onLoad}
      onError={() => {
        setHasError(true);
        if (onError) onError(new Error("Failed to load image"));
      }}
    />
  );
};

// کامپوننت کمکی برای دانلود SVG
export const downloadSvg = (
  svgData: string,
  filename: string = "design.svg"
) => {
  try {
    let blob: Blob;

    if (svgData.startsWith("data:image/svg+xml;base64,")) {
      const base64 = svgData.replace("data:image/svg+xml;base64,", "");
      const decoded = atob(base64);
      blob = new Blob([decoded], { type: "image/svg+xml" });
    } else if (svgData.startsWith("<svg")) {
      blob = new Blob([svgData], { type: "image/svg+xml" });
    } else {
      // اگر فرمت نامشخص است، از داده اصلی استفاده می‌کنیم
      blob = new Blob([svgData], { type: "image/svg+xml" });
    }

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // تمیز کردن
    setTimeout(() => URL.revokeObjectURL(url), 100);
  } catch (error) {
    console.error("Error downloading SVG:", error);
    throw new Error("خطا در دانلود فایل");
  }
};
