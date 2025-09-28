import React, { useState } from "react";
import { motion } from "framer-motion";
import { Upload, Loader2, Download, Trash2 } from "lucide-react";

export default function App() {
  const [image, setImage] = useState<string | null>(null);
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [resultImage, setResultImage] = useState<string | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const generateNewDesign = async () => {
    if (!description && !image) {
      alert("Please upload a photo or enter a style description.");
      return;
    }
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("description", description);
      if (image) {
        const response = await fetch(image);
        const blob = await response.blob();
        formData.append("image", blob, "room.png");
      }

      const res = await fetch("http://127.0.0.1:8000/generate-design", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.success && data.image_base64) {
        setResultImage(`data:image/png;base64,${data.image_base64}`);
      } else {
        alert("Error: " + data.message);
      }
    } catch (err) {
      console.error("Error generating design:", err);
      alert("An error occurred while generating the design.");
    }
    setLoading(false);
  };

  const handleDownload = () => {
    if (!resultImage) return;
    const link = document.createElement("a");
    link.href = resultImage;
    link.download = "generated-room.png";
    link.click();
  };

  const clearAll = () => {
    setImage(null);
    setDescription("");
    setResultImage(null);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-6">
      <motion.h1
        className="text-4xl font-bold mb-6 text-center"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        AI Interior Designer
      </motion.h1>

      {/* Upload & Description */}
      <div className="bg-gray-800 p-6 rounded-2xl shadow-lg w-full max-w-3xl">
        {/* Upload Area */}
        <div
          className="border-2 border-dashed border-gray-600 p-6 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-gray-400 transition"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onClick={() => document.getElementById("fileInput")?.click()}
        >
          {image ? (
            <img
              src={image}
              alt="Uploaded Room"
              className="rounded-xl max-h-64 object-cover"
            />
          ) : (
            <div className="flex flex-col items-center">
              <Upload className="w-10 h-10 mb-2 text-gray-400" />
              <p className="text-gray-400">Drag & Drop your room photo here</p>
              <p className="text-gray-500 text-sm">or click to upload</p>
            </div>
          )}
          <input
            type="file"
            id="fileInput"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
        </div>

        {/* Style Input */}
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe your preferred style (e.g., Modern Scandinavian with natural tones)"
          className="w-full mt-4 p-3 rounded-lg bg-gray-700 text-white outline-none resize-none"
          rows={3}
        />

        {/* Buttons */}
        <div className="flex gap-3 mt-4 justify-center">
          <button
            onClick={generateNewDesign}
            disabled={loading}
            className="bg-blue-600 px-6 py-3 rounded-xl hover:bg-blue-500 flex items-center gap-2"
          >
            {loading ? <Loader2 className="animate-spin" /> : "Generate Design"}
          </button>
          <button
            onClick={clearAll}
            className="bg-red-600 px-6 py-3 rounded-xl hover:bg-red-500 flex items-center gap-2"
          >
            <Trash2 className="w-4 h-4" /> Clear
          </button>
        </div>
      </div>

      {/* Result */}
      {resultImage && (
        <motion.div
          className="mt-6 bg-gray-800 p-6 rounded-2xl shadow-lg max-w-3xl w-full flex flex-col items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <h2 className="text-xl font-semibold mb-3">Generated Design</h2>
          <img
            src={resultImage}
            alt="Generated Room"
            className="rounded-xl max-h-[500px] object-cover"
          />
          <button
            onClick={handleDownload}
            className="mt-4 bg-green-600 px-6 py-2 rounded-xl hover:bg-green-500 flex items-center gap-2"
          >
            <Download className="w-4 h-4" /> Download
          </button>
        </motion.div>
      )}
    </div>
  );
}
