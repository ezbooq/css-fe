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
import { Tier } from "@/types/tier";
import { useParams } from "next/navigation";

type AddOnsAddProps = {
  isClosable?: boolean;
  close?: () => void;
  setSelectedPackage?: (id: string) => void;
  selectedPackage?: string;
  level: number;
  categoryId: string;
  parentId?: string;
  label?: string;
  addons: Tier[];
};
function AddOnsAdd({
  isClosable = false,
  close,

  level,
  parentId,
  categoryId,
  label = "Choose Add Ons",
  addons,
}: AddOnsAddProps) {
  const { businessCode } = useParams();
  const { addItem, hasIncluded } = useCartStore((state) => state);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [canNext, setCanNext] = useState(true);
  const [canPrev, setCanPrev] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.offsetWidth;
      const totalWidth = (addons?.length ?? 0) * 300; // each card ~280 + margin
      const currentOffset = currentIndex * 300;

      setCanNext(currentOffset + containerWidth < totalWidth);
      setCanPrev(currentIndex > 0);
    }
  }, [currentIndex, addons?.length]);

  const nextSlide = () => {
    if (canNext) setCurrentIndex((prev) => prev + 1);
  };

  const prevSlide = () => {
    if (canPrev) setCurrentIndex((prev) => prev - 1);
  };
  const handleAddOnsAdd = (pk: Tier) => {
    addItem({
      id: pk.id,
      name: pk.name,
      price: pk.price,
      serviceDuration: pk.serviceDuration,
      type: "ADDONS",
      categoryId,
      parentId,
      level,
      businessCode: (businessCode as string) ?? "",
    });
  };
  return (
    <>
      {addons && addons?.length > 0 && (
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
              style={{ width: `${(addons?.length ?? 0) * 300}px` }}
            >
              {addons?.map((pk) => (
                <div
                  key={pk.id}
                  className="min-w-[280px] bg-white shadow p-4 rounded-lg flex flex-col justify-between"
                >
                  <div>
                    <div className="w-full">
                      <PhotoViewer
                        images={pk.files}
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
                        <p>{`${pk.serviceDuration} min`}</p>
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
      )}
    </>
  );
}

export default AddOnsAdd;
