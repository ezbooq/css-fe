"use client";
import useCartStore from "@/stores/useCart";
import React, { useState } from "react";
import { XMarkIcon } from "@heroicons/react/16/solid";
import Button from "../button/Button";
import PackageSelect from "../packageSelect/PackageSelect";
import AddOnTier from "./AddOnTier";
type AddOnsSectionProps = {
  categoryId: string;
};
function AddOnsSection({ categoryId }: AddOnsSectionProps) {
  const verticalScale = 3;
  const { items, removeItem } = useCartStore((state) => state);
  const packages = items.filter(
    (item) => item.type === "PACKAGE" && item.categoryId === categoryId
  );
  const [isPackageModalOpen, setIsPackageModalOpen] = useState<boolean>(false);
  const [isAddOns1Open, setIsAddOns1Open] = useState<boolean>(true);
  const [isAddOns2Open, setIsAddOns2Open] = useState<boolean>(true);
  const [isAddOns3Open, setIsAddOns3Open] = useState<boolean>(true);
  const [isAddOns4Open, setIsAddOns4Open] = useState<boolean>(true);
  const [selectedPackage, setSelectedPackage] = useState<string | undefined>(
    packages[0].id
  );
  const [selectedAddOns1, setSelectedAddOns1] = useState<string | undefined>(
    undefined
  );
  const [selectedAddOns2, setSelectedAddOns2] = useState<string | undefined>(
    undefined
  );
  const [selectedAddOns3, setSelectedAddOns3] = useState<string | undefined>(
    undefined
  );
  const [selectedAddOns4, setSelectedAddOns4] = useState<string | undefined>(
    undefined
  );

  const selectedAddOns1List = items.filter(
    (item) =>
      item.type === "ADDONS" &&
      item.level === 1 &&
      item.parentId === selectedPackage
  );
  const selectedAddOns2List = items.filter(
    (item) =>
      item.type === "ADDONS" &&
      item.level === 2 &&
      item.parentId === selectedAddOns1
  );
  const selectedAddOns3List = items.filter(
    (item) =>
      item.type === "ADDONS" &&
      item.level === 3 &&
      item.parentId === selectedAddOns2
  );
  const selectedAddOns4List = items.filter(
    (item) =>
      item.type === "ADDONS" &&
      item.level === 4 &&
      item.parentId === selectedAddOns3
  );
  return (
    <div className="ring-1 ring-light-base rounded-[8px] p-5 mt-5 relative">
      <div>
        <p className="text-lg font-semibold mb-5">Selected Packages</p>
        <div>
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className="flex justify-between gap-10 items-center"
            >
              <div
                className={`ring-1 mb-1 p-2 grid grid-cols-3 w-full rounded-[8px] hover:bg-light-base-light ${
                  selectedPackage === pkg.id
                    ? "ring-light-base-dark"
                    : "ring-light-base-light"
                }`}
                onClick={() => setSelectedPackage(pkg.id)}
              >
                <span className="text-sm text-typography-secondary font-semibold">
                  {pkg.name}
                </span>
                <div className="w-full flex justify-center gap-8">
                  <span className="text-sm text-typography-secondary font-semibold">
                    Price
                  </span>
                  <span className="text-sm text-typography-secondary font-semibold">
                    -
                  </span>
                  <span className="text-sm text-typography-secondary font-semibold">
                    {`${pkg.price}$`}
                  </span>
                </div>

                <div className="w-full flex justify-center gap-8">
                  <span className="text-sm text-typography-secondary font-semibold">
                    Duration
                  </span>
                  <span className="text-sm text-typography-secondary font-semibold">
                    -
                  </span>
                  <span className="text-sm text-typography-secondary font-semibold">
                    {`${pkg.serviceDuration}min`}
                  </span>
                </div>
              </div>
              <div>
                <button className="hover:scale-150 hover:text-light-primary text-gray-700">
                  <XMarkIcon
                    className="w-4 h-4 "
                    onClick={() => removeItem(pkg.id)}
                  />
                </button>
              </div>
            </div>
          ))}
        </div>
        {isPackageModalOpen ? (
          <PackageSelect
            categoryId={categoryId}
            close={() => setIsPackageModalOpen(false)}
            isClosable
          />
        ) : (
          <div className="w-full mt-5">
            <Button
              colour="dark"
              fullWidth
              onClick={() => setIsPackageModalOpen(true)}
            >
              Add More Packages
            </Button>
          </div>
        )}
      </div>
      <AddOnTier
        label="Selected Add Ons 1"
        selectedAddonList={selectedAddOns1List}
        selectedAddOn={selectedAddOns1}
        setSelectedAddOn={setSelectedAddOns1}
        isAddOnsOpen={isAddOns1Open}
        setIsAddOnsOpen={setIsAddOns1Open}
        selectedParentTier={selectedPackage}
        categoryId={categoryId}
      />
      {verticalScale > 3 && (
        <AddOnTier
          label="Selected Add Ons 2"
          selectedAddonList={selectedAddOns2List}
          selectedAddOn={selectedAddOns2}
          setSelectedAddOn={setSelectedAddOns2}
          isAddOnsOpen={isAddOns2Open}
          setIsAddOnsOpen={setIsAddOns2Open}
          selectedParentTier={selectedAddOns1}
          categoryId={categoryId}
        />
      )}
      {verticalScale > 4 && (
        <AddOnTier
          label="Selected Add Ons 3"
          selectedAddonList={selectedAddOns3List}
          selectedAddOn={selectedAddOns3}
          setSelectedAddOn={setSelectedAddOns3}
          isAddOnsOpen={isAddOns3Open}
          setIsAddOnsOpen={setIsAddOns3Open}
          selectedParentTier={selectedAddOns2}
          categoryId={categoryId}
        />
      )}
      {verticalScale > 5 && (
        <AddOnTier
          label="Selected Add Ons 4"
          selectedAddonList={selectedAddOns4List}
          selectedAddOn={selectedAddOns4}
          setSelectedAddOn={setSelectedAddOns4}
          isAddOnsOpen={isAddOns4Open}
          setIsAddOnsOpen={setIsAddOns4Open}
          selectedParentTier={selectedAddOns3}
          categoryId={categoryId}
        />
      )}
    </div>
  );
}

export default AddOnsSection;
