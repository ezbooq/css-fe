import React, { useContext } from "react";
import Button from "../button/Button";
import { CheckOutContext } from "@/hooks/CheckOutContext";

export default function PaymentScreen() {
  const [selectedOption, setSelectedOption] = React.useState<number>(1);
  const { selectedTabIndex, setSelectedTabIndex } = useContext(CheckOutContext);
  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(Number(event.target.value));
  };

  return (
    <div>
      <div className="border-b-2 border-light-base-light py-8">
        <h1 className="font-medium text-lg">Payment Info</h1>
        <p>
          Connect a payment processor and accept credit/debit cards from
          clients. If you accept cash/check you can also activate that here or
          disable the card option. If you do not accept cards, a customer will
          be able to check out using the cash/check option. You can charge cards
          later at anytime or set up automatic charging. You can turn this
          description off or modify it at anytim
        </p>
        <div className="grid grid-cols-2 mt-5">
          <label style={{ display: "flex", alignItems: "center" }}>
            <input
              type="radio"
              name="serviceMode"
              value={1}
              checked={selectedOption === 1}
              onChange={handleOptionChange}
              style={{ marginRight: "20px" }}
            />
            Card Payment
          </label>

          <label style={{ marginLeft: "1rem" }}>
            <input
              type="radio"
              name="serviceMode"
              style={{ marginRight: "20px" }}
              value={2}
              checked={selectedOption === 2}
              onChange={handleOptionChange}
            />
            Cash Payment
          </label>
        </div>
        <div className="mt-5">
          <label>Add New Card</label>
          <input
            className="text-sm placeholder:text-typography-basic/60 placeholder:text-sm appearance-none ring-typography-secondary/30 block w-full rounded-[8px] py-2.5 pr-10 pl-3 text-gray-900 ring-1 ring-inset focus:ring-inset sm:text-base sm:leading-6 outline-none bg-light-background"
            placeholder="Card Number"
          />
          <div className="flex gap-4 mt-3">
            <input
              className="text-sm placeholder:text-typography-basic/60 placeholder:text-sm appearance-none ring-typography-secondary/30 rounded-[8px] py-2.5 px-3 text-gray-900 ring-1 ring-inset focus:ring-inset sm:text-base sm:leading-6 outline-none bg-light-background w-1/2"
              placeholder="MM / YY"
              maxLength={7}
            />
            <input
              className="text-sm placeholder:text-typography-basic/60 placeholder:text-sm appearance-none ring-typography-secondary/30 rounded-[8px] py-2.5 px-3 text-gray-900 ring-1 ring-inset focus:ring-inset sm:text-base sm:leading-6 outline-none bg-light-background w-1/2"
              placeholder="CCV"
              maxLength={4}
            />
          </div>
        </div>
        <div className="mt-5">
          <h1 className="font-medium text-lg">Accept Terms and Conditions</h1>
          <p>
            By entering any information, you affirm you have read and agree to
            the Terms of Service and Privacy Policy. You also agree and
            authorize Booking Koala and its affiliates and their networks to
            deliver marketing and other material via the information provided.
          </p>
          <p className="mt-2">
            Your card is charged after the appointment is completed.
          </p>
        </div>
        <div className="mt-4 flex items-center">
          <input type="checkbox" id="acceptTerms" className="mr-2" />
          <label htmlFor="acceptTerms" className="text-sm">
            I accept the Terms and Conditions
          </label>
        </div>
        <div className="mt-10 w-full flex gap-5">
          <div className="w-1/3">
            <Button
              colour="light"
              fullWidth
              onClick={() => setSelectedTabIndex(selectedTabIndex - 1)}
            >
              Back
            </Button>
          </div>
          <div className="w-2/3">
            <Button colour="dark" fullWidth>
              Confirm Booking
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
