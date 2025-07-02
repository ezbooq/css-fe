"use client";
import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import Button from "../button/Button";
import {
  ArrowRightIcon,
  ArrowLeftIcon,
  XMarkIcon,
} from "@heroicons/react/16/solid";
import useCartStore from "@/stores/useCart";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { getTiersByParent } from "@/services/tiers/tiers";
import { Tier } from "@/types/tier";
import NewPhotoViewer from "../photoViewer/NewPhotoViewer";
type PackageSelectProps = {
  isClosable?: boolean;
  close?: () => void;
  setSelectedPackage?: (id: string) => void;
  selectedPackage?: string;
  categoryId: string;
};
function PackageSelect({
  isClosable = false,
  close,
  categoryId,
}: PackageSelectProps) {
  const { businessCode } = useParams();
  const { addItem } = useCartStore((state) => state);
  const packagesData = useQuery({
    queryKey: [
      "packages",
      { businessCode: businessCode ?? "", categoryId: categoryId },
    ],
    queryFn: getTiersByParent,
    enabled: !!businessCode,
  });
  const packages = packagesData.data;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [canNext, setCanNext] = useState(true);
  const [canPrev, setCanPrev] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.offsetWidth;
      const totalWidth = (packages?.length ?? 0) * 300; // each card ~280 + margin
      const currentOffset = currentIndex * 300;

      setCanNext(currentOffset + containerWidth < totalWidth);
      setCanPrev(currentIndex > 0);
    }
  }, [currentIndex, packages?.length]);

  const nextSlide = () => {
    if (canNext) setCurrentIndex((prev) => prev + 1);
  };

  const prevSlide = () => {
    if (canPrev) setCurrentIndex((prev) => prev - 1);
  };
  const handlePackageAdd = (pk: Tier) => {
    addItem({
      id: pk.id,
      name: pk.name,
      price: pk.price,
      serviceDuration: pk.serviceDuration,
      type: "PACKAGE",
      categoryId,
      level: 0,
      businessCode: (businessCode as string) ?? "",
    });
  };
  return (
    <div className="ring-1 ring-light-base rounded-[8px] p-5 mt-5 relative bg-light-surface">
      <div className="flex justify-between">
        <p className="text-lg font-semibold mb-5 text-typography-basic">
          Choose Packages
        </p>
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
        {packagesData.isPending &&
          Array.from({ length: 3 }).map((_, idx) => (
            <div
              key={idx}
              className="w-[300px] bg-gray-100 animate-pulse shadow p-4 rounded-lg my-1 flex flex-col gap-3"
            >
              <div className="w-full h-[164px] bg-gray-200 rounded" />
              <div className="h-5 bg-gray-200 rounded w-2/3 mt-3" />
              <div className="h-4 bg-gray-200 rounded w-full" />
              <div className="h-4 bg-gray-200 rounded w-1/2" />
              <div className="mt-3 flex flex-col gap-2">
                <div className="flex justify-between">
                  <div className="h-4 bg-gray-200 rounded w-1/4" />
                  <div className="h-4 bg-gray-200 rounded w-1/4" />
                </div>
                <div className="flex justify-between">
                  <div className="h-4 bg-gray-200 rounded w-1/4" />
                  <div className="h-4 bg-gray-200 rounded w-1/4" />
                </div>
              </div>
              <div className="w-full mt-3 h-10 bg-gray-200 rounded" />
            </div>
          ))}
        {packages && packages.length === 0 && (
          <div className="flex justify-center text-typography-basic/70">
            No Packages Available
          </div>
        )}
        <motion.div
          className="flex gap-4"
          animate={{ x: -currentIndex * 300 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          style={{ width: `${(packages?.length ?? 0) * 300}px` }}
        >
          {packages &&
            packages.length > 0 &&
            packages?.map((pk) => (
              <div
                key={pk.id}
                className="w-[300px] bg-white shadow p-4 rounded-lg my-1"
              >
                <div className="w-full">
                  <NewPhotoViewer
                    images={pk.files}
                    aspectRatio="1440/820"
                    rounded
                    autoRotate={false}
                  />
                </div>

                <h2 className="text-base font-semibold mt-3">{pk.name}</h2>
                <p className="text-sm mb-3">{pk.description}</p>
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
                    onClick={() => handlePackageAdd(pk)}
                    // disabled={hasIncluded(pk.id)}
                  >
                    Add Package
                    {/* {`${hasIncluded(pk.id) ? "Added" : "Add Package"}`} */}
                  </Button>
                </div>
              </div>
            ))}
        </motion.div>
      </div>
    </div>
  );
}

export default PackageSelect;
