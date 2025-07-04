import { useState } from "react";
import {
  QuestionMarkCircleIcon,
  EyeIcon,
  EyeSlashIcon,
} from "@heroicons/react/24/outline";

type InputBoxProps = {
  name: string;
  placeholder: string;
  register: any;
  error?: string;
  type?: "text" | "number" | "date" | "password";
  disabled?: boolean;
  value?: string;
  customStyle?: string;
  label?: string;
};

function InputBox({
  name,
  placeholder,
  register,
  error,
  type = "text",
  disabled = false,
  customStyle = "",
  label,
}: InputBoxProps) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div>
      {label && (
        <label htmlFor={name} className="block text-sm   mb-1">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          {...register(name, type === "number" ? { valueAsNumber: true } : {})}
          type={type === "password" && showPassword ? "text" : type}
          name={name}
          id={name}
          disabled={disabled}
          className={`text-sm placeholder:text-typography-basic/60 placeholder:text-sm appearance-none  ring-typography-secondary/30 block w-full rounded-[8px] py-2.5 pr-10 pl-3  text-gray-900 ring-1 ring-inset focus:ring-inset sm:text-base sm:leading-6 outline-none bg-light-background ${customStyle} ${
            error ? "focus:ring-red-500 ring-red-500" : ""
          } ${disabled ? "cursor-not-allowed" : ""}`}
          placeholder={placeholder}
        />
        {type === "password" && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            {showPassword ? (
              <EyeSlashIcon
                className="h-5 w-5 text-gray-500 cursor-pointer"
                onClick={togglePasswordVisibility}
                aria-hidden="true"
              />
            ) : (
              <EyeIcon
                className="h-5 w-5 text-gray-500 cursor-pointer"
                onClick={togglePasswordVisibility}
                aria-hidden="true"
              />
            )}
          </div>
        )}
        {error && type !== "password" && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            <QuestionMarkCircleIcon
              className="h-5 w-5 text-red-500"
              aria-hidden="true"
            />
          </div>
        )}
      </div>
      {error && <p className="mt-1 text-sm text-red-600 text-left">{error}</p>}
    </div>
  );
}

export default InputBox;
