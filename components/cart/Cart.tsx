"use client";
import React from "react";
import Button from "../button/Button";
import { XMarkIcon } from "@heroicons/react/16/solid";
import useCartStore from "@/stores/useCart";
import { ArchiveBoxXMarkIcon } from "@heroicons/react/24/outline";
import { useParams } from "next/navigation";
import Link from "next/link";
type CartProps = {
  hiddenCheckOut?: boolean;
};
function Cart({ hiddenCheckOut = false }: CartProps) {
  const { businessCode, companyCode } = useParams();
  const items = useCartStore((state) => state.items);
  const totalAmount = useCartStore((state) => state.totalAmount);
  const decrementItem = useCartStore((state) => state.decrementItem);
  console.log(items);
  const packages = items.filter((item) => item.type === "PACKAGE");
  const addons = items.filter((item) => item.type === "ADDONS");
  // const handleCheckOut = () => {
  //   router.push(`/booking/${companyCode}/${businessCode}/check-out`);
  // };
  return (
    <div className="ring-1 ring-light-base rounded-[8px] p-5  relative bg-light-surface">
      <p className="font-semibold text-lg">Booking Summary</p>
      {items.length > 0 ? (
        <div>
          <div className="mt-3">
            <p className="font-semibold">Packages</p>
            <div>
              {packages.map((pk) => (
                <div
                  key={pk.id}
                  className="flex justify-between items-center mt-2 text-sm text-typography-basic/80"
                >
                  <span>{pk.name}</span>
                  {pk.quantity && pk.quantity > 1 && (
                    <span>{`x ${pk.quantity}`}</span>
                  )}
                  <div className="flex gap-5">
                    <span>{`${pk.serviceDuration}min`}</span>
                    <span>{pk.price}</span>
                    <button>
                      <XMarkIcon
                        className="w-4 h-4 text-typography-secondary hover:scale-150 hover:text-light-primary"
                        onClick={() => decrementItem(pk.id)}
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
                  className="flex justify-between items-center mt-2 text-sm text-typography-basic/80"
                >
                  <span>{addon.name}</span>
                  <div className="flex gap-5">
                    <span>{`${addon.serviceDuration}min`}</span>
                    <span>{addon.price}</span>
                    <button>
                      <XMarkIcon
                        className="w-4 h-4 text-typography-secondary hover:scale-150 hover:text-light-primary"
                        onClick={() => decrementItem(addon.id)}
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

      {!hiddenCheckOut && (
        <div className="w-full mt-3">
          <Link
            href={`/booking/${companyCode}/${businessCode}/check-out`}
            prefetch={true}
            passHref
          >
            <Button
              colour="dark"
              fullWidth
              type="button"
              disabled={items.length === 0}
            >
              Check Out
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Cart;
