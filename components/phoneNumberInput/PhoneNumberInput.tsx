import React from "react";
import { Option } from "../../types/common";
import SearchOptionSelect from "../searchOptionSelect/SearchOptionSelect";

type PhoneNumberInputProps = {
  selectedCountry: Option | undefined;
  setSelectedCountry: React.Dispatch<React.SetStateAction<Option | undefined>>;
  countries: Option[];
  error?: string;
  register: any;
  name: string;
};

export default function PhoneNumberInput({
  selectedCountry,
  setSelectedCountry,
  name,
  register,

  countries,
  error,
}: PhoneNumberInputProps) {
  return (
    <div className="flex items-start space-x-4">
      <div className="relative flex-shrink-0 w-[132px]">
        <SearchOptionSelect
          options={countries}
          selected={selectedCountry}
          setSelected={setSelectedCountry}
        />
        {/* <div
          className="flex items-center justify-between space-x-2 py-2.5 cursor-pointer ring-typography-secondary/30 rounded-[8px] ring-1 px-2 text-sm focus:outline-none focus:ring "
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <div className="flex items-center space-x-2">
            <img
              alt={`Flag of ${selectedCountry.code}`}
              src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${selectedCountry.code}.svg`}
              className="w-6 h-4"
            />
            <span className="text-typography-secondary/30">
              {selectedCountry.dialingCode}
            </span>
          </div>
          <ChevronDownIcon
            aria-hidden="true"
            className="pointer-events-none size-5 self-center justify-self-end text-typography-secondary/30 sm:size-4"
          />
        </div>
        {isDropdownOpen && (
          <div className="absolute left-0 right-0 mt-1 bg-light-surface rounded z-10 overflow-auto h-96 shadow-lg ring-1 ring-black ring-opacity-5">
            {countries.map((country) => (
              <div
                key={country.code}
                onClick={() => handleCountryChange(country)}
                className="flex items-center space-x-2 px-3 py-2 cursor-pointer hover:bg-light-secondary"
              >
                <img
                  alt={`Flag of ${country.code}`}
                  src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${country.code}.svg`}
                  className="w-6 h-4"
                />
                <span className="text-typography-secondary/30">
                  {country.dialingCode}
                </span>
              </div>
            ))}
          </div>
        )} */}
      </div>
      <div className="flex-grow ">
        <input
          {...register(name)}
          name={name}
          id={name}
          placeholder="Enter phone number"
          className="text-sm placeholder:text-typography-dark/70 placeholder:text-sm appearance-none ring-typography-secondary/30 block rounded-[8px] py-2.5 px-3 text-gray-900 ring-1 ring-inset focus:ring-inset sm:text-base sm:leading-6 outline-none bg-transparent w-full"
        />
        {error && (
          <p className="mt-1 text-sm text-red-600 text-left">{error}</p>
        )}
      </div>
    </div>
  );
}
