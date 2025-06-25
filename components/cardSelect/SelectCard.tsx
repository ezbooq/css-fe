import Image from "next/image";
type SelectCardProps = {
  name: string;
  icon?: string; // Updated to string for image URL
  isSelected: boolean;
  onClick: () => void;
};

export default function SelectCard({
  name,
  icon,
  isSelected,
  onClick,
}: SelectCardProps) {
  return (
    <div
      className={`flex w-28 ${
        icon ? "h-28" : "h-auto"
      } rounded-md gap-5 ring-1 items-center justify-around hover:bg-light-secondary/50  hover:shadow-md bg-light-surface${
        isSelected ? " ring-light-base-dark " : " ring-light-base"
      }`}
      onClick={onClick}
    >
      <div className="text-center">
        <div className="text-base ">{name}</div>
        {icon && (
          <Image
            src={icon}
            alt={`${name} icon`}
            width={48}
            height={48}
            className="mt-1 w-12 h-12"
          />
        )}
      </div>
    </div>
  );
}
