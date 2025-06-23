import useCartStore from "@/stores/useCart";
import { CartItem } from "@/types/cart";
import { XMarkIcon } from "@heroicons/react/16/solid";
import { ArchiveBoxXMarkIcon } from "@heroicons/react/24/outline";
import React from "react";
import AddOnsAdd from "../addOnsSelect/AddOnsAdd";
import Button from "../button/Button";
import { getTiersByParent } from "@/services/tiers/tiers";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
type AddOnTierProps = {
  label: string;
  selectedAddonList: CartItem[];
  selectedAddOn: string | undefined;
  setSelectedAddOn: (value: React.SetStateAction<string | undefined>) => void;
  isAddOnsOpen: boolean;
  setIsAddOnsOpen: (value: React.SetStateAction<boolean>) => void;
  selectedParentTier: string | undefined;
  categoryId: string;
};
export default function AddOnTier({
  label,
  selectedAddonList,
  selectedAddOn,
  setSelectedAddOn,
  isAddOnsOpen,
  selectedParentTier,
  setIsAddOnsOpen,
  categoryId,
}: AddOnTierProps) {
  const { businessCode } = useParams();
  const { removeItem } = useCartStore((state) => state);
  const addOnsData = useQuery({
    queryKey: [
      "addOns",
      {
        businessCode: businessCode ?? "",
        categoryId: categoryId,
        parentId: selectedParentTier,
      },
    ],
    queryFn: getTiersByParent,
    enabled: !!businessCode,
  });

  return (
    <div className="mt-5">
      <p className="text-lg font-semibold mb-5">{label}</p>
      <div>
        {selectedAddonList.length > 0 ? (
          selectedAddonList.map((addOn) => (
            <div
              key={addOn.id}
              className="flex justify-between gap-10 items-center"
            >
              <div
                className={`ring-1 mb-1 p-2 grid grid-cols-3 w-full rounded-[8px] hover:bg-light-base-light ${
                  selectedAddOn === addOn.id
                    ? "ring-light-base-dark"
                    : "ring-light-base-light"
                }`}
                onClick={() => setSelectedAddOn(addOn.id)}
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
                    {`${addOn.serviceDuration}min`}
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
        ) : addOnsData && (addOnsData.data?.length ?? 0) > 0 ? (
          <div className="text-sm text-typography-secondary-light flex justify-center items-center">
            <ArchiveBoxXMarkIcon className="w-8 h-8" />
          </div>
        ) : (
          <div className="flex justify-center text-typography-secondary-light">
            No Add Ons Available
          </div>
        )}
      </div>
      {isAddOnsOpen &&
      selectedParentTier &&
      addOnsData &&
      (addOnsData.data?.length ?? 0) > 0 ? (
        <AddOnsAdd
          addons={addOnsData.data || []}
          categoryId={categoryId}
          close={() => setIsAddOnsOpen(false)}
          isClosable
          level={1}
          parentId={selectedParentTier}
        />
      ) : (
        <div className="w-full mt-5">
          {addOnsData && (addOnsData.data?.length ?? 0) > 0 && (
            <Button
              colour="dark"
              fullWidth
              onClick={() => setIsAddOnsOpen(true)}
            >
              {`${
                selectedAddonList.length > 0
                  ? "Add More Add-Ons"
                  : "Add Add-Ons"
              }`}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
