"use client";
import useCartStore from "@/stores/useCart";
import React, { useState } from "react";
import { XMarkIcon } from "@heroicons/react/16/solid";
import Button from "../button/Button";
import PackageSelect from "../packageSelect/PackageSelect";
import { ArchiveBoxXMarkIcon } from "@heroicons/react/24/outline";
import AddOnsAdd from "../addOnsSelect/AddOnsAdd";
type AddOnsSectionProps = {
  categoryId: string;
};
function AddOnsSection({ categoryId }: AddOnsSectionProps) {
  const verticalScale = 5;
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
    (item) => item.type === "ADDONS" && item.level === 1
  );
  const selectedAddOns2List = items.filter(
    (item) => item.type === "ADDONS" && item.level === 2
  );
  const selectedAddOns3List = items.filter(
    (item) => item.type === "ADDONS" && item.level === 3
  );
  const selectedAddOns4List = items.filter(
    (item) => item.type === "ADDONS" && item.level === 4
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
                    {`${pkg.duration}min`}
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
      {/* AddOns 1 Section */}
      <div className="mt-5">
        <p className="text-lg font-semibold mb-5">Selected Add Ons 1</p>
        <div>
          {selectedAddOns1List.length > 0 ? (
            selectedAddOns1List.map((addOn) => (
              <div
                key={addOn.id}
                className="flex justify-between gap-10 items-center"
              >
                <div
                  className={`ring-1 mb-1 p-2 grid grid-cols-3 w-full rounded-[8px] hover:bg-light-base-light ${
                    selectedAddOns1 === addOn.id
                      ? "ring-light-base-dark"
                      : "ring-light-base-light"
                  }`}
                  onClick={() => setSelectedAddOns1(addOn.id)}
                >
                  <span className="text-sm text-typography-secondary font-semibold">
                    {addOn.name}
                  </span>
                  <div className="w-full flex justify-center gap-8">
                    <span className="text-sm text-typography-secondary font-semibold">
                      Price
                    </span>
                    <span className="text-sm text-typography-secondary font-semibold">
                      -
                    </span>
                    <span className="text-sm text-typography-secondary font-semibold">
                      {`${addOn.price}$`}
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
                      {`${addOn.duration}min`}
                    </span>
                  </div>
                </div>
                <div>
                  <button className="hover:scale-150 hover:text-light-primary text-gray-700">
                    <XMarkIcon
                      className="w-4 h-4"
                      onClick={() => removeItem(addOn.id)}
                    />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-sm text-typography-secondary-light flex justify-center items-center">
              <ArchiveBoxXMarkIcon className="w-8 h-8" />
            </div>
          )}
        </div>
        {isAddOns1Open && selectedPackage ? (
          <AddOnsAdd
            categoryId={categoryId}
            close={() => setIsAddOns1Open(false)}
            isClosable
            level={1}
            parentId={selectedAddOns1}
          />
        ) : (
          <div className="w-full mt-5">
            <Button
              colour="dark"
              fullWidth
              onClick={() => setIsAddOns1Open(true)}
            >
              {`${
                selectedAddOns1List.length > 0
                  ? "Add More Add-Ons"
                  : "Add Add-Ons"
              }`}
            </Button>
          </div>
        )}
      </div>
      {/* AddOns 2 Section */}
      {verticalScale > 3 && (
        <div className="mt-5">
          <p className="text-lg font-semibold mb-5">Selected Add Ons 2</p>
          <div>
            {selectedAddOns2List.length > 0 ? (
              selectedAddOns2List.map((addOn) => (
                <div
                  key={addOn.id}
                  className="flex justify-between gap-10 items-center"
                >
                  <div
                    className={`ring-1 mb-1 p-2 grid grid-cols-3 w-full rounded-[8px] hover:bg-light-base-light ${
                      selectedAddOns2 === addOn.id
                        ? "ring-light-base-dark"
                        : "ring-light-base-light"
                    }`}
                    onClick={() => setSelectedAddOns2(addOn.id)}
                  >
                    <span className="text-sm text-typography-secondary font-semibold">
                      {addOn.name}
                    </span>
                    <div className="w-full flex justify-center gap-8">
                      <span className="text-sm text-typography-secondary font-semibold">
                        Price
                      </span>
                      <span className="text-sm text-typography-secondary font-semibold">
                        -
                      </span>
                      <span className="text-sm text-typography-secondary font-semibold">
                        {`${addOn.price}$`}
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
                        {`${addOn.duration}min`}
                      </span>
                    </div>
                  </div>
                  <div>
                    <button className="hover:scale-150 hover:text-light-primary text-gray-700">
                      <XMarkIcon
                        className="w-4 h-4"
                        onClick={() => removeItem(addOn.id)}
                      />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-sm text-typography-secondary-light flex justify-center items-center">
                <ArchiveBoxXMarkIcon className="w-8 h-8" />
              </div>
            )}
          </div>
          {isAddOns2Open && selectedAddOns1 ? (
            <AddOnsAdd
              categoryId={categoryId}
              close={() => setIsAddOns2Open(false)}
              isClosable
              level={2}
              parentId={selectedAddOns1}
            />
          ) : (
            <div className="w-full mt-5">
              <Button
                colour="dark"
                fullWidth
                onClick={() => setIsAddOns2Open(true)}
              >
                {`${
                  selectedAddOns1List.length > 0
                    ? "Add More Add-Ons"
                    : "Add Add-Ons"
                }`}
              </Button>
            </div>
          )}
        </div>
      )}
      {verticalScale > 4 && (
        <div className="mt-5">
          <p className="text-lg font-semibold mb-5">Selected Add Ons 3</p>
          <div>
            {selectedAddOns3List.length > 0 ? (
              selectedAddOns3List.map((addOn) => (
                <div
                  key={addOn.id}
                  className="flex justify-between gap-10 items-center"
                >
                  <div
                    className={`ring-1 mb-1 p-2 grid grid-cols-3 w-full rounded-[8px] hover:bg-light-base-light ${
                      selectedAddOns3 === addOn.id
                        ? "ring-light-base-dark"
                        : "ring-light-base-light"
                    }`}
                    onClick={() => setSelectedAddOns3(addOn.id)}
                  >
                    <span className="text-sm text-typography-secondary font-semibold">
                      {addOn.name}
                    </span>
                    <div className="w-full flex justify-center gap-8">
                      <span className="text-sm text-typography-secondary font-semibold">
                        Price
                      </span>
                      <span className="text-sm text-typography-secondary font-semibold">
                        -
                      </span>
                      <span className="text-sm text-typography-secondary font-semibold">
                        {`${addOn.price}$`}
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
                        {`${addOn.duration}min`}
                      </span>
                    </div>
                  </div>
                  <div>
                    <button className="hover:scale-150 hover:text-light-primary text-gray-700">
                      <XMarkIcon
                        className="w-4 h-4"
                        onClick={() => removeItem(addOn.id)}
                      />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-sm text-typography-secondary-light flex justify-center items-center">
                <ArchiveBoxXMarkIcon className="w-8 h-8" />
              </div>
            )}
          </div>
          {isAddOns3Open && selectedAddOns2 ? (
            <AddOnsAdd
              categoryId={categoryId}
              close={() => setIsAddOns3Open(false)}
              isClosable
              level={3}
              parentId={selectedAddOns2}
            />
          ) : (
            <div className="w-full mt-5">
              <Button
                colour="dark"
                fullWidth
                onClick={() => setIsAddOns3Open(true)}
              >
                {`${
                  selectedAddOns3List.length > 0
                    ? "Add More Add-Ons"
                    : "Add Add-Ons"
                }`}
              </Button>
            </div>
          )}
        </div>
      )}
      {verticalScale > 5 && (
        <div className="mt-5">
          <p className="text-lg font-semibold mb-5">Selected Add Ons 4</p>
          <div>
            {selectedAddOns4List.length > 0 ? (
              selectedAddOns4List.map((addOn) => (
                <div
                  key={addOn.id}
                  className="flex justify-between gap-10 items-center"
                >
                  <div
                    className={`ring-1 mb-1 p-2 grid grid-cols-3 w-full rounded-[8px] hover:bg-light-base-light ${
                      selectedAddOns4 === addOn.id
                        ? "ring-light-base-dark"
                        : "ring-light-base-light"
                    }`}
                    onClick={() => setSelectedAddOns4(addOn.id)}
                  >
                    <span className="text-sm text-typography-secondary font-semibold">
                      {addOn.name}
                    </span>
                    <div className="w-full flex justify-center gap-8">
                      <span className="text-sm text-typography-secondary font-semibold">
                        Price
                      </span>
                      <span className="text-sm text-typography-secondary font-semibold">
                        -
                      </span>
                      <span className="text-sm text-typography-secondary font-semibold">
                        {`${addOn.price}$`}
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
                        {`${addOn.duration}min`}
                      </span>
                    </div>
                  </div>
                  <div>
                    <button className="hover:scale-150 hover:text-light-primary text-gray-700">
                      <XMarkIcon
                        className="w-4 h-4"
                        onClick={() => removeItem(addOn.id)}
                      />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-sm text-typography-secondary-light flex justify-center items-center">
                <ArchiveBoxXMarkIcon className="w-8 h-8" />
              </div>
            )}
          </div>
          {isAddOns4Open && selectedAddOns3 ? (
            <AddOnsAdd
              categoryId={categoryId}
              close={() => setIsAddOns4Open(false)}
              isClosable
              level={3}
              parentId={selectedAddOns3}
            />
          ) : (
            <div className="w-full mt-5">
              <Button
                colour="dark"
                fullWidth
                onClick={() => setIsAddOns4Open(true)}
              >
                {`${
                  selectedAddOns4List.length > 0
                    ? "Add More Add-Ons"
                    : "Add Add-Ons"
                }`}
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default AddOnsSection;
