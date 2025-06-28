"use client";

import { useState } from "react";
import Image from "next/image";
import { Upload, X } from "lucide-react";
import { createClient } from "@/utils/supabase/client";

interface ImageUploadProps {
  onImageUpload: (filename: string | null) => void;
  selectedImage: File | null;
  setSelectedImage: (file: File | null) => void;
  imagePreview: string | null;
  setImagePreview: (preview: string | null) => void;
}

export function ImageUpload({
  onImageUpload,
  selectedImage,
  setSelectedImage,
  imagePreview,
  setImagePreview,
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    onImageUpload(null);
  };

  const uploadImage = async (file: File): Promise<string | null> => {
    const supabase = createClient();
    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}-${Math.random()
      .toString(36)
      .substring(2)}.${fileExt}`;

    const { error } = await supabase.storage
      .from("images")
      .upload(fileName, file);

    if (error) {
      console.error("Error uploading image:", error);
      return null;
    }

    return fileName;
  };

  const handleUpload = async () => {
    if (!selectedImage) return;

    setIsUploading(true);
    try {
      const filename = await uploadImage(selectedImage);
      onImageUpload(filename);
    } catch (error) {
      console.error("Upload failed:", error);
      onImageUpload(null);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Image (optional)
      </label>
      {!imagePreview ? (
        <div className="w-full">
          <label
            htmlFor="image-upload"
            className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <Upload className="w-8 h-8 mb-3 text-gray-400" />
              <p className="mb-2 text-sm text-gray-500">
                <span className="font-semibold">Click to upload</span> an image
              </p>
              <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
            </div>
            <input
              id="image-upload"
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleImageSelect}
            />
          </label>
        </div>
      ) : (
        <div className="relative">
          <Image
            src={imagePreview}
            alt="Preview"
            width={400}
            height={128}
            className="w-full h-32 object-cover rounded-lg"
          />
          <button
            type="button"
            onClick={removeImage}
            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors duration-200"
          >
            <X className="w-4 h-4" />
          </button>
          {selectedImage && (
            <button
              type="button"
              onClick={handleUpload}
              disabled={isUploading}
              className="absolute bottom-2 right-2 bg-blue-500 text-white px-3 py-1 rounded text-xs hover:bg-blue-600 transition-colors duration-200 disabled:opacity-50"
            >
              {isUploading ? "Uploading..." : "Upload"}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
