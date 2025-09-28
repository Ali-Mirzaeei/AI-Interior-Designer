import React from "react";

interface ImageResultProps {
  imageBase64: string;
}

const ImageResult: React.FC<ImageResultProps> = ({ imageBase64 }) => {
  if (!imageBase64) return null;

  const downloadImage = () => {
    const link = document.createElement("a");
    link.href = `data:image/png;base64,${imageBase64}`;
    link.download = "generated.png";
    link.click();
  };

  return (
    <div className="mt-4 p-4 border rounded-xl shadow bg-gray-900 text-white">
      <h2 className="text-lg font-semibold mb-2">Generated Image</h2>
      <img
        src={`data:image/png;base64,${imageBase64}`}
        alt="Generated"
        className="rounded-lg shadow-lg max-w-full h-auto"
      />
      <button
        onClick={downloadImage}
        className="mt-3 px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg"
      >
        Download
      </button>
    </div>
  );
};

export default ImageResult;
