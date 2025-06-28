"use client";
import Button from "@/components/button/Button";
import Cart from "@/components/cart/Cart";
import AddressDetails from "@/components/checkOut/AddressDetails";
import GeneralInfo from "@/components/checkOut/GeneralInfo";
import PaymentScreen from "@/components/checkOut/PaymentScreen";
import Layout from "@/components/layout/Layout";
import ProgressBar from "@/components/progressBar/ProgressBar";
import { CheckOutContext } from "@/hooks/CheckOutContext";
import {
  CheckOutFormContext,
  initialCheckOutForm,
} from "@/hooks/CheckOutFormContext";
import { getBusinessByCode } from "@/services/business/business";
import { CheckOutForm } from "@/types/checkOutFormContext";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useParams } from "next/navigation";

import React, { useState } from "react";
const steps = [
  {
    id: 1,
    name: "Step 1",
    description: "Step 1",
    href: "#",
    status: "complete",
  },
  {
    id: 2,
    name: "Step 2",
    description: "Step 2",
    href: "#",
    status: "complete",
  },
  {
    id: 3,
    name: "Step 3",
    description: "Step 3",
    href: "#",
    status: "complete",
  },
];
const tabs = [
  { name: "Step 1", component: <GeneralInfo /> },
  { name: "Step 2", component: <AddressDetails /> },
  { name: "Step 3", component: <PaymentScreen /> },
];
export default function AddressPage() {
  const params = useParams();
  const { businessCode, companyCode } = params; // from route param
  const [selectedTabIndex, setSelectedTabIndex] = useState(3);
  const [checkOutForm, setCheckOutForm] =
    useState<CheckOutForm>(initialCheckOutForm);
  const resetCheckOutForm = () => {
    setCheckOutForm(initialCheckOutForm);
  };
  const businessData = useQuery({
    queryKey: [
      "addOns",
      {
        businessCode: businessCode ?? "",
        companyCode: companyCode ?? "",
      },
    ],
    queryFn: getBusinessByCode,
    enabled: Boolean(businessCode) && Boolean(companyCode),
  });
  const layoutData = {
    logos:
      businessData.data?.logos && businessData.data.logos.length > 0
        ? businessData.data.logos[0].url
        : null,
    logoPlacement: businessData?.data?.logoPlacement ?? 0,
    bannerImages: businessData?.data?.bannerImages,
    fontColor: businessData?.data?.fontColor ?? "#2e2e2e",
    bgColor: businessData?.data?.cardBackgroundColor ?? "#ffffff",
    buttonColor: businessData?.data?.buttonColor ?? "#414141",
    fontFamily: businessData?.data?.fontType ?? "Roboto",
  };
  return (
    <>
      <Layout data={layoutData}>
        <div className="w-full p-10">
          <div className="mb-10">
            <Link href={`/booking/${companyCode}/${businessCode}`}>
              <Button colour="dark">Back To Menu</Button>
            </Link>
          </div>

          <div className="flex w-full gap-10">
            <div className="w-3/4">
              <CheckOutContext.Provider
                value={{ setSelectedTabIndex, selectedTabIndex }}
              >
                <CheckOutFormContext.Provider
                  value={{
                    setCheckOutForm,
                    checkOutForm,
                    resetCheckOutForm,
                  }}
                >
                  <div className="p-5 bg-light-surface rounded-2xl ring-1 ring-light-base w-full">
                    <ProgressBar
                      steps={steps}
                      selectedTabIndex={selectedTabIndex}
                    />
                    <div className="mt-5  h-3/4">
                      {tabs[selectedTabIndex - 1].component}
                    </div>
                  </div>
                </CheckOutFormContext.Provider>
              </CheckOutContext.Provider>
            </div>
            <div className="w-1/4">
              <Cart hiddenCheckOut />
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
