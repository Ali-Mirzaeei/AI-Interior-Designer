import { useState } from "react";

export default function ImageBox() {
  const [image, setImage] = useState(null);

  const generateImage = async () => {
    const res = await fetch("http://localhost:8000/generate-design", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: "modern living room" })
    });
    const data = await res.json();
    if (data.success) {
      setImage(`data:image/png;base64,${data.image_base64}`);
    }
  };

  const downloadImage = () => {
    const link = document.createElement("a");
    link.href = image;
    link.download = "generated.png";
    link.click();
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <button
        onClick={generateImage}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg"
      >
        Generate
      </button>

      {image && (
        <div className="flex flex-col items-center gap-2">
          <img
            src={image}
            alt="Generated"
            className="w-96 h-auto border rounded-lg shadow"
          />
          <button
            onClick={downloadImage}
            className="px-4 py-2 bg-green-600 text-white rounded-lg"
          >
            Download
          </button>
        </div>
      )}
    </div>
  );
}
