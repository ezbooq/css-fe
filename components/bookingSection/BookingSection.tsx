"use client";
import React, { useState } from "react";
import CardSelect from "../cardSelect/CardSelect";
import PackageSelect from "../packageSelect/PackageSelect";
import AddOnsSection from "../addOnsSection/AddOnsSection";
import useCartStore from "@/stores/useCart";

function BookingSection() {
  const { hasPackageInCategory } = useCartStore((state) => state);
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(
    undefined
  );

  const hasPackage = hasPackageInCategory(selectedCategory);
  console.log(hasPackage);
  const categories = [
    {
      id: "12345",
      name: "Car",
      image:
        "https://www.creativefabrica.com/wp-content/uploads/2021/02/08/car-icon-red-Graphics-8433168-1.jpg",
    },
    {
      id: "67890",
      name: "Bike",
      image:
        "https://images.vexels.com/media/users/3/152654/isolated/preview/e5694fb12916c00661195c0a833d1ba9-sports-bike-icon.png",
    },
    {
      id: "54325",
      name: "Van",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUNuB1_hoo7jAftVKrD5GLzATExcV2IT5B3w&s",
    },
    {
      id: "54321",
      name: "SUV",
      image:
        "https://i.fbcd.co/products/resized/resized-750-500/l007e-5-e10-mainpreview-832296c52d332d98ef30d95ca7c530fed7387355248fe7da91d92a86e5615304.jpg",
    },
  ];
  const handleCategorySelect = (id: string) => {
    setSelectedCategory(id);
  };

  return (
    <div className="p-4">
      <div>
        <p className="text-xl  font-semibold mb-5">Categories</p>
        <CardSelect
          cardData={categories}
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
