import React, { ReactNode } from "react";
import { classNames } from "../../utils/classnames";
import Spinner from "../spinner/Spinner";

type ButtonProps = {
  type?: "button" | "submit" | "reset";
  colour?:
    | "blue"
    | "red"
    | "green"
    | "yellow"
    | "white"
    | "primary"
    | "dark"
    | "light"
    | "secondary"
    | "none";
  className?: string;
  children?: ReactNode;
  loading?: boolean;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  icon?: ReactNode;
  fullWidth?: boolean;
  rounded?: boolean;
  permission?: boolean;
};

const buttonColour: { [key: string]: string } = {
  blue: "bg-button-blue hover:bg-button-blue/80 focus-visible:outline-button-blue text-white shadow-sm cursor-pointer",
  red: "bg-[#EC0606] hover:bg-[#EC0606]/70 focus-visible:outline-[#EC0606] text-white shadow-sm cursor-pointer",
  green:
    "bg-button-green hover:bg-button-green/80 focus-visible:outline-button-green text-white shadow-sm cursor-pointer",
  yellow:
    "bg-button-yellow hover:bg-button-yellow/80 focus-visible:outline-button-yellow text-white shadow-sm cursor-pointer",
  white:
    "bg-white hover:bg-gray-50 ring-1 ring-light-secondary-dark text-typography-secondary text-sm ring-inset shadow-sm cursor-pointer",
  primary:
    "bg-light-primary  text-typography-primary-light  text-sm  hover:bg-light-primary-light duration-300 shadow-sm focus:bg-light-primary-dark cursor-pointer",
  dark: "text-light-surface bg-button-dark shadow-sm hover:bg-button-dark/80 duration-300 shadow-sm cursor-pointer",
  none: "bg-transparent  text-typography-secondary-dark  focus-visible:outline-none font-semibold cursor-pointer",
  secondary:
    "bg-light-secondary  hover:bg-typography-secondary/50 text-sm text-typography-secondary shadow-sm cursor-pointer",
  light:
    "bg-transparent ring-1 ring-button-dark text-button-dark  hover:bg-button-dark/20  focus:bg-[#DBFED3] focus:ring-light-primary duration-300 shadow-sm cursor-pointer",
};

const buttonDisabledColour: { [key: string]: string } = {
  blue: "bg-button-blue/50 text-white/70",
  red: "bg-button-red/50 text-white/70",
  green: "bg-button-green/50 text-white/70",
  yellow: "bg-button-yellow/50 text-white/70",
  white: "bg-white/50 text-gray-500/50 ring-1 ring-light-base ",
  primary:
    "bg-light-secondary-light text-typography-primary-light cursor-not-allowed",
  dark: "bg-button-dark/30 text-light-surface/30 cursor-not-allowed",
  none: "bg-transparent text-sm text-typography-secondary-dark/30 cursor-not-allowed font-semibold ",
  secondary:
    "bg-typography-secondary/30  cursor-not-allowed text-sm text-typography-secondary",
  light:
    "ring-light-secondary-light ring-1 text-light-secondary-light text-sm  cursor-not-allowed",
};

const Button = ({
  children,
  type = "button",
  loading,
  disabled = false,
  onClick,
  colour = "blue",
  icon,
  fullWidth = false,
  rounded = false,
  className = "",
  permission = true,
}: ButtonProps) => {
  const isDisabled = disabled || !permission;

  return (
    <button
      onClick={onClick}
      type={type}
      className={classNames(
        isDisabled ? buttonDisabledColour[colour] : buttonColour[colour],
        fullWidth ? "w-full" : "w-fit",
        rounded ? "rounded-full" : "rounded-[8px]",
        "text-sm inline-flex justify-center items-center px-3 py-2  focus-visible:outline-2 focus-visible:outline-offset-2 sm:col-start-2 whitespace-nowrap",
        className
      )}
      disabled={isDisabled}
    >
      {loading ? (
        <Spinner dark />
      ) : (
        <>
          {icon && <span className="mr-2 h-5 w-5">{icon}</span>}
          {children}
        </>
      )}
    </button>
  );
};

export default Button;
