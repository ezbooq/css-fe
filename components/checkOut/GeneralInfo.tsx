import React, { useContext, useState } from "react";
import InputBox from "../inputbox/InputBox";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import PhoneNumberInput from "../phoneNumberInput/PhoneNumberInput";
import parsePhoneNumberFromString from "libphonenumber-js";
import { countryCodeList } from "@/utils/country";
import { Option } from "@/types/common";
import Button from "../button/Button";
import { CheckOutContext } from "@/hooks/CheckOutContext";
import { CheckOutFormContext } from "@/hooks/CheckOutFormContext";

function GeneralInfo() {
  const { selectedTabIndex, setSelectedTabIndex } = useContext(CheckOutContext);
  const { setCheckOutForm, checkOutForm } = useContext(CheckOutFormContext);
  const serviceModes = checkOutForm.basiceBusinessData.serviceModes;
  const selectedServiceMode = checkOutForm.generalDetails.serviceMode;
  const [selectedCountryCode, setSelectedCountryCode] = useState<
    Option | undefined
  >(countryCodeList[126]);
  const [selectedOption, setSelectedOption] =
    React.useState<number>(selectedServiceMode);
  const schema = z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email("Invalid email address"),
    phoneNumber: z
      .string()
      .nonempty("Phone number is required")
      .refine(
        (value) => {
          const countryCode = selectedCountryCode?.id?.toUpperCase(); // e.g., "US", "RU"
          if (!countryCode) return false;
          const parsedPhoneNumber = parsePhoneNumberFromString(
            value,
            countryCode as import("libphonenumber-js").CountryCode
          );
          return parsedPhoneNumber?.isValid() ?? false;
        },
        { message: "Invalid phone number" }
      ),
  });
  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(Number(event.target.value));
  };
  type FieldTypes = z.infer<typeof schema>;
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FieldTypes>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: checkOutForm.generalDetails.firstName || "",
      lastName: checkOutForm.generalDetails.lastName || "",
      email: checkOutForm.generalDetails.email || "",
      phoneNumber: checkOutForm.generalDetails.phoneNumber || "",
    },
  });
  React.useEffect(() => {
    if (checkOutForm.generalDetails.countryCode) {
      const found = countryCodeList.find(
        (c) => c.id === checkOutForm.generalDetails.countryCode
      );
      if (found) setSelectedCountryCode(found);
    }
  }, [checkOutForm.generalDetails.countryCode]);
  const handler = (data: FieldTypes) => {
    setCheckOutForm({
      ...checkOutForm,
      generalDetails: {
        serviceMode: selectedOption ?? 1,
        appointmentDate: undefined,
        appointmentTime: undefined,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        countryCode: selectedCountryCode?.id ?? "",
        phoneNumber: data.phoneNumber,
      },
    });
    setSelectedTabIndex(selectedTabIndex + 1);
  };
  return (
    <form onSubmit={handleSubmit(handler)}>
      <div className="border-b-2 border-light-base-light py-8">
        <h1 className="font-medium text-lg">Preferred Service Type</h1>
        <div className="grid grid-cols-2 mt-5">
          {(serviceModes === 0 || serviceModes === 1) && (
            <label style={{ display: "flex", alignItems: "center" }}>
              <input
                type="radio"
                name="serviceMode"
                value={1}
                checked={selectedOption === 1}
                onChange={handleOptionChange}
                style={{ marginRight: "20px" }}
              />
              Will visit the business location
            </label>
          )}
          {(serviceModes === 0 || serviceModes === 2) && (
            <label style={{ marginLeft: "1rem" }}>
              <input
                type="radio"
                name="serviceMode"
                style={{ marginRight: "20px" }}
                value={2}
                checked={selectedOption === 2}
                onChange={handleOptionChange}
              />
              Request Service at my Location
            </label>
          )}
        </div>
      </div>
      <div className="py-5 border-b-2 border-light-base-light">
        <h1 className="font-medium py-3 text-lg">When are you visiting?</h1>
        <div className="flex gap-10">
          <div className="p-3 border-2 border-light-base-light">Date </div>
          <div className="p-3 border-2 border-light-base-light">time</div>
        </div>
      </div>
      <div className="py-5 border-b-2 border-light-base-light ">
        <h1 className="font-medium text-lg">Customer Details</h1>
        <div className="grid grid-cols-2 gap-5 mt-3">
          <div>
            <InputBox
              label="First Name"
              name="firstName"
              placeholder=""
              register={register}
              error={errors.firstName?.message}
              customStyle="bg-transparent"
            />
          </div>
          <div>
            <InputBox
              label="Last Name"
              name="lastName"
              placeholder=""
              register={register}
              error={errors.lastName?.message}
              customStyle="bg-transparent"
            />
          </div>
          <div>
            <InputBox
              label="Email"
              name="email"
              placeholder=""
              register={register}
              error={errors.email?.message}
              customStyle="bg-transparent"
            />
          </div>
          <div>
            {" "}
            <label className="block text-sm   mb-1">Phone Number</label>
            <PhoneNumberInput
              name="phoneNumber"
              register={register}
              selectedCountry={selectedCountryCode}
              setSelectedCountry={setSelectedCountryCode}
              countries={countryCodeList}
              error={errors.phoneNumber?.message}
            />
          </div>
        </div>
      </div>
      <div className="w-full">
        <Button colour="dark" fullWidth type="submit">
          Next
        </Button>
      </div>
    </form>
  );
}

export default GeneralInfo;
