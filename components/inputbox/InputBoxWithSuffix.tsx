type InputBoxWithSuffixProps = {
  name: string;
  placeholder: string;
  register: any;
  error?: string;
  type?: "text" | "number" | "date" | "password";
  disabled?: boolean;
  value?: string;
  customStyle?: string;
  label?: string;
  suffix?: string;
};

function InputBoxWithSuffix({
  name,
  placeholder,
  register,
  error,
  type = "text",
  disabled = false,
  customStyle = "",
  label,
  suffix,
}: InputBoxWithSuffixProps) {
  return (
    <>
      {label && (
        <label
          htmlFor={name}
          className="block text-sm  text-typography-secondary mb-1"
        >
          {label}
        </label>
      )}
      <div className="relative">
        <input
          {...register(name, type === "number" ? { valueAsNumber: true } : {})}
          type={type}
          name={name}
          id={name}
          disabled={disabled}
          className={`text-sm placeholder:text-typography-dark/70 placeholder:text-sm appearance-none  ring-typography-secondary/30 block w-full rounded-[8px] py-2.5 pr-10 pl-3  text-gray-900 ring-1 ring-inset focus:ring-inset sm:text-base sm:leading-6 outline-none bg-light-background ${customStyle} ${
            error ? "focus:ring-red-500 ring-red-500" : ""
          } ${disabled ? "cursor-not-allowed" : ""}`}
          placeholder={placeholder}
        />
        {suffix && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            <span className="text-gray-500 text-sm">{suffix}</span>
          </div>
        )}
      </div>
      {error && <p className="mt-1 text-sm text-red-600 text-left">{error}</p>}
    </>
  );
}

export default InputBoxWithSuffix;
