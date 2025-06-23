"use client";
import React, { useState } from "react";
import CardSelect from "../cardSelect/CardSelect";
import PackageSelect from "../packageSelect/PackageSelect";
import AddOnsSection from "../addOnsSection/AddOnsSection";
import useCartStore from "@/stores/useCart";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getBusinessCategories } from "@/services/category/category";

function BookingSection() {
  const { businessCode } = useParams();
  const { hasPackageInCategory } = useCartStore((state) => state);
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(
    undefined
  );

  const hasPackage = hasPackageInCategory(selectedCategory);

  const handleCategorySelect = (id: string) => {
    setSelectedCategory(id);
  };
  const categories = useQuery({
    queryKey: ["categories", { businessCode: businessCode ?? "" }],
    queryFn: getBusinessCategories,
    enabled: !!businessCode,
  });
  console.log(categories);
  return (
    <div className="p-4">
      <div>
        <p className="text-xl  font-semibold mb-5">Categories</p>
        <CardSelect
          cardData={categories.data || []}
          selectedCard={selectedCategory}
          setSelectedCard={handleCategorySelect}
        />
      </div>
      {selectedCategory ? (
        hasPackage ? (
          <div>
            <AddOnsSection categoryId={selectedCategory} />
          </div>
        ) : (
          <PackageSelect categoryId={selectedCategory} />
        )
      ) : (
        <div className="ring-1 ring-light-base rounded-[8px] p-5 mt-5 h-52 flex justify-center items-center">
          <div className="flex flex-col justify-center items-center gap-2">
            <p className="text-xl">Oops Nothing to Show here! </p>
            <p className="text-xl font-medium items-center">
              First Select a Category
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default BookingSection;
