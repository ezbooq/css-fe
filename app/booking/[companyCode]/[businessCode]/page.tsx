export const dynamic = "force-dynamic";
import GoogleMapFromUrl from "@/components/googleMapFromUrl/GoogleMapFromUrl";
import { PhoneIcon, EnvelopeIcon } from "@heroicons/react/16/solid";
import Cart from "@/components/cart/Cart";
import Layout from "@/components/layout/Layout";
import BookingSection from "@/components/bookingSection/BookingSection";
import { BusinessData, ContactDetails } from "@/types/business";
import type { Metadata } from "next";
type Props = {
  params: Promise<{ companyCode: string; businessCode: string }>;
};
// ---- generateMetadata ----
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { companyCode, businessCode } = await params;

  const res = await fetch(
    `http://13.53.133.158:2504/ezzy-booking/booking-console/business/get-by-business-code/${companyCode}/${businessCode}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    return {
      title: "Booking Page",
      description: "Unable to load business information",
    };
  }

  const data = await res.json();
  const businessData: BusinessData = data;

  return {
    title: `Booking | ${businessData.name}`,
    description: `Book a service at ${businessData.name} online.`,
  };
}

// ---- Page Component ----
export default async function BusinessCodePage({ params }: Props) {
  const { companyCode, businessCode } = await params;
  let businessData: BusinessData | null = null;

  try {
    const res = await fetch(
      `http://13.53.133.158:2504/ezzy-booking/booking-console/business/get-by-business-code/${companyCode}/${businessCode}`,
      { cache: "no-store" }
    );

    if (!res.ok) {
      return (
        <div className="w-full h-screen flex items-center justify-center">
          <p className="text-red-600 text-lg font-semibold">
            Failed to load business information. Please try again later.
          </p>
        </div>
      );
    }

    const data = await res.json();
    businessData = data;
  } catch (err) {
    console.error("Failed to fetch business data:", err);
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <p className="text-red-600 text-lg font-semibold">
          Failed to load business information. Please try again later.
        </p>
      </div>
    );
  }

  const contactDetails: ContactDetails = {
    phone: businessData?.contactNumber ?? null,
    countryCode: businessData?.countryCode ?? null,
    email: businessData?.email ?? null,
    location:
      businessData?.locationLink ?? "https://maps.app.goo.gl/k1cxAFiidTQP9cER6",
  };

  const layoutData = {
    logos:
      businessData?.logos && businessData.logos.length > 0
        ? businessData.logos[0].url
        : null,
    logoPlacement: businessData?.logoPlacement ?? "left",
    bannerImages: businessData?.bannerImages,
    fontColor: businessData?.fontColor ?? "#2e2e2e",
    bgColor: businessData?.cardBackgroundColor ?? "#ffffff",
    buttonColor: businessData?.buttonColor ?? "#414141",
    fontFamily: businessData?.fontType ?? "Roboto",
  };

  return (
    <Layout data={layoutData}>
      <div className="grid grid-col-1 sm:grid-cols-4 gap-5 w-full mt-4 px-4 ">
        <div className="sm:col-span-3">
          <BookingSection />
        </div>
        <div className="flex flex-col gap-4 mt-4">
          {/* Contact Info */}
          <div className="ring-1 ring-light-base p-5 rounded-[8px] bg-light-surface">
            <p className="font-semibold text-lg mb-5">Contact Info</p>
            <div className="flex gap-5 items-center">
              <PhoneIcon className="h-5 w-5" />
              <p>{`${contactDetails.countryCode ?? ""} ${
                contactDetails.phone ?? ""
              }`}</p>
            </div>
            <div className="flex gap-5 items-center mt-2">
              <EnvelopeIcon className="h-5 w-5" />
              <p>{contactDetails.email ?? "Not Provided"}</p>
            </div>
          </div>

          {/* Location Info */}
          <div className="ring-1 ring-light-base p-5 rounded-[8px] bg-light-surface">
            <p className="font-semibold text-lg mb-5">Location Info</p>
            <a
              href={contactDetails.location ?? "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              {contactDetails.location ?? "Location not available"}
            </a>
            <div className="mt-3 rounded-2xl">
              <GoogleMapFromUrl mapUrl={contactDetails.location ?? ""} />
            </div>
          </div>

          <div>
            <Cart />
          </div>
        </div>
      </div>
    </Layout>
  );
}
