"use client";
import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import PhotoViewer from "../photoViewer/PhotoViewer";
import Button from "../button/Button";
import {
  ArrowRightIcon,
  ArrowLeftIcon,
  XMarkIcon,
} from "@heroicons/react/16/solid";
import useCartStore from "@/stores/useCart";
type AddOnsAddProps = {
  isClosable?: boolean;
  close?: () => void;
  setSelectedPackage?: (id: string) => void;
  selectedPackage?: string;
  level: number;
  categoryId: string;
  parentId?: string;
  label?: string;
};
function AddOnsAdd({
  isClosable = false,
  close,
  selectedPackage,
  setSelectedPackage,
  level,
  parentId,
  categoryId,
  label = "Choose Add Ons",
}: AddOnsAddProps) {
  const { addItem, hasIncluded } = useCartStore((state) => state);
  const addons = [
    {
      id: "a1",
      name: "Interior Vacuum",
      description: "Deep vacuuming of seats, carpets, and mats.",
      duration: 15,
      price: 25,
      images: [
        "https://images.unsplash.com/photo-1614214121811-50cc1ac226f5?auto=format&fit=crop&w=800&q=60",
        "https://images.unsplash.com/photo-1601191284145-21c8502b1b72?auto=format&fit=crop&w=800&q=60",
      ],
    },
    {
      id: "a2",
      name: "Tire Shine",
      description: "Restores the glossy finish of your tires.",
      duration: 10,
      price: 15,
      images: [
        "https://images.unsplash.com/photo-1606836592079-b7f464f760dc?auto=format&fit=crop&w=800&q=60",
        "https://images.unsplash.com/photo-1601471469080-8e78ff525d2d?auto=format&fit=crop&w=800&q=60",
      ],
    },
    {
      id: "a3",
      name: "Engine Bay Cleaning",
      description: "Thorough cleaning of engine bay to remove dirt and grime.",
      duration: 20,
      price: 30,
      images: [
        "https://images.unsplash.com/photo-1565065379401-bd4213883b3f?auto=format&fit=crop&w=800&q=60",
        "https://images.unsplash.com/photo-1620664270297-f4ec90261ff1?auto=format&fit=crop&w=800&q=60",
      ],
    },
    {
      id: "a4",
      name: "Windshield Protection",
      description: "Applies a water-repellent treatment to your windshield.",
      duration: 10,
      price: 20,
      images: [
        "https://images.unsplash.com/photo-1604212162216-f01baf1ecf9d?auto=format&fit=crop&w=800&q=60",
        "https://images.unsplash.com/photo-1608509682082-d39a924f6822?auto=format&fit=crop&w=800&q=60",
      ],
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [canNext, setCanNext] = useState(true);
  const [canPrev, setCanPrev] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.offsetWidth;
      const totalWidth = addons.length * 300; // each card ~280 + margin
      const currentOffset = currentIndex * 300;

      setCanNext(currentOffset + containerWidth < totalWidth);
      setCanPrev(currentIndex > 0);
    }
  }, [currentIndex, addons.length]);

  const nextSlide = () => {
    if (canNext) setCurrentIndex((prev) => prev + 1);
  };

  const prevSlide = () => {
    if (canPrev) setCurrentIndex((prev) => prev - 1);
  };
  const handleAddOnsAdd = (pk: any) => {
    addItem({
      id: pk.id,
      name: pk.name,
      price: pk.price,
      duration: pk.duration,
      type: "ADDONS",
      categoryId,
      parentId,
      level,
    });
  };
  return (
    <div className="ring-1 ring-light-base rounded-[8px] p-5 mt-5 relative">
      <div className="flex justify-between">
        <p className="text-lg font-semibold mb-5">{label}</p>
        <div className="flex gap-5 items-center">
          <div className="flex gap-5">
            <button
              onClick={prevSlide}
              disabled={!canPrev}
              className={`p-2  transition-colors hidden sm:block ${
                canPrev
                  ? " hover:scale-150 hover:text-light-primary text-gray-700"
                  : " text-gray-400 "
              }`}
              aria-label="Previous"
            >
              <ArrowLeftIcon className="w-5 h-5" />
            </button>
            <button
              onClick={nextSlide}
              disabled={!canNext}
              className={`p-2  transition-colors hidden sm:block  ${
                canNext
                  ? " hover:scale-150 hover:text-light-primary text-gray-700"
                  : " text-gray-400 "
              }`}
              aria-label="Next"
            >
              <ArrowRightIcon className="w-5 h-5" />
            </button>
          </div>
          {isClosable && (
            <div>
              <button
                className="hover:scale-150 hover:text-light-primary text-gray-700"
                onClick={close}
              >
                <XMarkIcon className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </div>

      {canPrev && (
        <button
          onClick={prevSlide}
          className="absolute z-10 left-2 top-1/2 -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full shadow sm:hidden"
        >
          &lt;
        </button>
      )}

      {canNext && (
        <button
          onClick={nextSlide}
          className="absolute z-10 right-2 top-1/2 -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full shadow sm:hidden"
        >
          &gt;
        </button>
      )}

      <div className="overflow-hidden" ref={containerRef}>
        <motion.div
          className="flex gap-4"
          animate={{ x: -currentIndex * 300 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          style={{ width: `${addons.length * 300}px` }}
        >
          {addons.map((pk) => (
            <div
              key={pk.id}
              className="min-w-[280px] bg-white shadow p-4 rounded-lg flex flex-col justify-between"
            >
              <div>
                <div className="w-full">
                  <PhotoViewer
                    images={pk.images}
                    aspectRatio="1440/820"
                    rounded
                    autoRotate={false}
                  />
                </div>
                <h2 className="text-base font-semibold mt-3">{pk.name}</h2>
                <p className="text-sm mb-3">{pk.description}</p>
              </div>
              <div>
                <div className="mt-3">
                  <div className="flex justify-between text-base font-semibold">
                    <p>Price</p>
                    <p>{`${pk.price} $`}</p>
                  </div>
                  <div className="flex justify-between text-base font-semibold">
                    <p>Duration</p>
                    <p>{`${pk.duration} min`}</p>
                  </div>
                </div>
                <div className="w-full mt-3">
                  <Button
                    colour="dark"
                    fullWidth
                    onClick={() => handleAddOnsAdd(pk)}
                    disabled={hasIncluded(pk.id)}
                  >
                    {`${hasIncluded(pk.id) ? "Added" : "Add"}`}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

export default AddOnsAdd;
