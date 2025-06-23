"use client";
import Image from "next/image";
import { FileItem } from "@/types/file";
import { useState, useEffect } from "react";

type NewPhotoViewerProps = {
  images: (string | FileItem)[];
  aspectRatio?: string; // e.g. "1440 / 560"
  rounded?: boolean;
  autoRotate?: boolean;
  height?: number;
};

export default function NewPhotoViewer({
  images = [],
  aspectRatio = "1440 / 560",
  rounded = false,
  autoRotate = true,
  height = 150,
}: NewPhotoViewerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const getImageSrc = (image: string | FileItem) =>
    typeof image === "string" ? image : image.url;

  useEffect(() => {
    if (!autoRotate || images.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length, autoRotate]);

  return (
    <div className="w-full mx-auto relative">
      <div
        className={`relative w-full bg-gray-200 overflow-hidden ${
          rounded ? "rounded-lg" : ""
        }`}
        style={{ aspectRatio, height }}
      >
        {images.length > 0 ? (
          <Image
            src={getImageSrc(images[currentIndex])}
            alt={`Image ${currentIndex + 1}`}
            fill
            style={{ objectFit: "cover" }}
            className="w-full h-full"
            sizes="100vw"
            priority={currentIndex === 0}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-500">
            No Image Available
          </div>
        )}

        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-transparent px-3 py-1 rounded-full flex space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full ${
                currentIndex === index ? "bg-white" : "bg-gray-400"
              }`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
