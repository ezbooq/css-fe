import { useState } from "react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/20/solid";
import { Combobox } from "@headlessui/react";
import { classNames } from "../../utils/classnames";
import { type Option } from "../../types/common";
import Image from "next/image";
/* -------------------------------------------------------------------------- */
/*                                 type                                       */
/* -------------------------------------------------------------------------- */
type Props = {
  options: Option[] | undefined;
  selected: Option | undefined;
  setSelected: (option: Option | undefined) => void;
  handleSelected?: (newSelected: Option) => void;
  error?: string;
  isLoading?: boolean;
  disabled?: boolean;
  placeholder?: string;
};

/* -------------------------------------------------------------------------- */
/*                                 component                                  */
/* -------------------------------------------------------------------------- */
function SearchOptionSelect({
  options,
  selected,
  setSelected,
  handleSelected,
  error,
  isLoading = false,
  disabled = false,
  placeholder = "",
}: Props) {
  const [query, setQuery] = useState("");

  const filteredOptions =
    query === ""
      ? options
      : options?.flatMap((option) => {
          const queryLower = query.toLowerCase();

          if (option.children) {
            const matchingChildren = option.children.filter(
              (child) =>
                child.name.toLowerCase().includes(queryLower) ||
                child.id.toLowerCase().includes(queryLower)
            );

            return matchingChildren.length > 0
              ? [{ ...option, children: matchingChildren }]
              : [];
          }

          return option.name.toLowerCase().includes(queryLower) ||
            option.id.toLowerCase().includes(queryLower)
            ? [option]
            : [];
        });

  const onSelectedChange = (newSelected: Option | null) => {
    setSelected(newSelected ?? undefined);
    if (handleSelected && newSelected) handleSelected(newSelected);
  };

  return (
    <>
      <Combobox
        as="div"
        value={selected ?? null}
        onChange={onSelectedChange}
        disabled={disabled}
      >
        {() => (
          <div className="relative">
            <Combobox.Input
              className={classNames(
                `w-full rounded-[8px] placeholder:text-sm text-sm border-0 bg-white py-2.5  pr-10 text-gray-900 ring-1 ring-inset focus:ring-2 focus:ring-inset focus:outline-none sm:leading-6 ring-typography-secondary/30 ${
                  selected?.image ? "pl-10" : "pl-3"
                }`,
                error
                  ? "ring-red-500 focus:ring-red-500"
                  : "ring-typography-secondary/30 focus:ring-typography-secondary/30",
                disabled ? "bg-gray-100 cursor-not-allowed text-gray-400" : ""
              )}
              onChange={(event) => setQuery(event.target.value)}
              displayValue={(option: Option | null) => option?.name ?? ""}
              disabled={disabled}
              placeholder={placeholder}
            />
            {selected?.image && (
              <span className="absolute inset-y-0 left-3 flex items-center">
                <Image
                  src={selected.image}
                  alt={selected.name}
                  width={24}
                  height={16}
                  className="w-6 h-4"
                />
              </span>
            )}
            <Combobox.Button
              className={classNames(
                "absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none",
                disabled ? "cursor-not-allowed text-gray-400" : ""
              )}
              disabled={disabled}
            >
              <ChevronDownIcon
                className="h-5 w-5 text-typography-secondary/30 duration-300"
                aria-hidden="true"
              />
            </Combobox.Button>

            {!disabled && (
              <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-light-surface text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {isLoading ? (
                  <div className="flex items-center justify-center py-2">
                    <svg
                      className="animate-spin h-5 w-5 text-primary-dark bg-light-surface "
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25 "
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75 "
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z "
                      />
                    </svg>
                    <span className="ml-2 text-gray-500 ">Loading...</span>
                  </div>
                ) : filteredOptions && filteredOptions.length > 0 ? (
                  filteredOptions.map((option) => (
                    <div key={option.id}>
                      {option.children ? (
                        <div>
                          <div className="bg-light-surface px-3 py-2 font-semibold z-50 ">
                            {option.name}
                          </div>
                          <div>
                            {option.children.map((child) => (
                              <Combobox.Option
                                key={child.id}
                                value={child}
                                className={({ active }) =>
                                  classNames(
                                    "relative cursor-default select-none py-2 pl-3 pr-9",
                                    active
                                      ? "bg-secondary-dark "
                                      : "text-gray-900  "
                                  )
                                }
                              >
                                {({ active, selected }) => (
                                  <>
                                    <span
                                      className={classNames(
                                        selected
                                          ? "font-semibold"
                                          : "font-normal",
                                        "block truncate "
                                      )}
                                    >
                                      {child.name}
                                    </span>
                                    {selected && (
                                      <span
                                        className={classNames(
                                          "absolute inset-y-0 right-0 flex items-center pr-4",
                                          active
                                            ? "text-white"
                                            : "text-secondary-dark"
                                        )}
                                      >
                                        <CheckIcon
                                          className="h-5 w-5 "
                                          aria-hidden="true"
                                        />
                                      </span>
                                    )}
                                  </>
                                )}
                              </Combobox.Option>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <Combobox.Option
                          value={option}
                          className={({ active }) =>
                            classNames(
                              "relative text-start cursor-default select-none py-2 pl-3.5 duration-10  pr-9",
                              active
                                ? " hover:bg-light-base-light cursor-pointer"
                                : " hover:bg-light-base-light"
                            )
                          }
                        >
                          {({ active, selected }) => (
                            <>
                              <span
                                className={classNames(
                                  selected
                                    ? "font-semibold dark:text-primary-500 "
                                    : "",
                                  "truncate flex items-center gap-2"
                                )}
                              >
                                {option.image && (
                                  <Image
                                    alt={`Image of ${option.name}`}
                                    src={option.image}
                                    width={24}
                                    height={16}
                                    className="w-6 h-4"
                                  />
                                )}

                                {option.name}
                              </span>
                              {selected && (
                                <span
                                  className={classNames(
                                    "absolute right-0 top-2.5 text-light-primary flex items-center pr-4 ",
                                    active ? "" : " "
                                  )}
                                >
                                  <CheckIcon
                                    className="h-5 w-5 "
                                    aria-hidden="true"
                                  />
                                </span>
                              )}
                            </>
                          )}
                        </Combobox.Option>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="px-4 py-2 text-gray-500 text-center ">
                    No Data Found
                  </div>
                )}
              </Combobox.Options>
            )}
          </div>
        )}
      </Combobox>
      {error && <p className="mt-1 text-sm text-red-600 text-left">{error}</p>}
    </>
  );
}

export default SearchOptionSelect;
