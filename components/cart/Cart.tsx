"use client";
import React from "react";
import Button from "../button/Button";
import { XMarkIcon } from "@heroicons/react/16/solid";
import useCartStore from "@/stores/useCart";
import { ArchiveBoxXMarkIcon } from "@heroicons/react/24/outline";
import { useParams, useRouter } from "next/navigation";

function Cart() {
  const router = useRouter();
  const { businessCode } = useParams();
  const items = useCartStore((state) => state.items);
  const totalAmount = useCartStore((state) => state.totalAmount);
  const removeItem = useCartStore((state) => state.removeItem);

  const packages = items.filter((item) => item.type === "PACKAGE");
  const addons = items.filter((item) => item.type === "ADDONS");
  const handleCheckOut = () => {
    router.push(`/${businessCode}/address`);
  };
  return (
    <div className="ring-1 ring-light-base rounded-[8px] p-5  relative">
      <p className="font-semibold text-lg">Booking Summary</p>
      {items.length > 0 ? (
        <div>
          <div className="mt-3">
            <p className="font-semibold">Packages</p>
            <div>
              {packages.map((pk) => (
                <div
                  key={pk.id}
                  className="flex justify-between items-center mt-2 text-sm text-typography-secondary-light"
                >
                  <span>{pk.name}</span>
                  <div className="flex gap-5">
                    <span>{`${pk.duration}min`}</span>
                    <span>{pk.price}</span>
                    <button>
                      <XMarkIcon
                        className="w-4 h-4 text-typography-secondary"
                        onClick={() => removeItem(pk.id)}
                      />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-3 border-b-1 border-typography-secondary-light pb-3">
            <p className="font-semibold">Add Ons</p>
            <div>
              {addons.map((addon) => (
                <div
                  key={addon.id}
                  className="flex justify-between items-center mt-2 text-sm text-typography-secondary-light"
                >
                  <span>{addon.name}</span>
                  <div className="flex gap-5">
                    <span>{`${addon.duration}min`}</span>
                    <span>{addon.price}</span>
                    <button>
                      <XMarkIcon
                        className="w-4 h-4 text-typography-secondary"
                        onClick={() => removeItem(addon.id)}
                      />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-between mt-2 mr-6">
            <p className="font-semibold">Total</p>
            <p className="font-semibold">{`${totalAmount}$`}</p>
          </div>
        </div>
      ) : (
        <div className="flex items-center w-full justify-center h-32 ">
          <ArchiveBoxXMarkIcon className="w-24 h-24 text-typography-secondary-light/50 " />
        </div>
      )}

      <div className="w-full mt-3">
        <Button colour="dark" fullWidth onClick={handleCheckOut}>
          Check Out
        </Button>
      </div>
    </div>
  );
}

export default Cart;
