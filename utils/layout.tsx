import { ReactNode } from "react";
import { InfoRow } from "../types/layout";
import React from "react";

export function renderInfoRow(
  row: InfoRow,
  index: number,
  smallText?: boolean
) {
  const textSize = smallText ? "text-xs" : "text-sm";

  return (
    <div
      key={row.id}
      className={`flex justify-between px-2 py-2 ${
        index % 2 === 0 ? "bg-white" : "bg-light-base-light"
      }`}
    >
      <span className={`${textSize} text-typography-secondary/50`}>
        {row.name}
      </span>
      <span className={`${textSize} text-typography-secondary`}>
        {Array.isArray(row.value)
          ? row.value
              .map((item) => item?.name ?? "") // Ensure item.name is defined
              .filter(Boolean) // Remove empty values
              .join(", ")
          : row.value}
      </span>
    </div>
  );
}

type ComponentHeaderLayoutProps = {
  title: string;
  actions?: ReactNode[];
  children?: ReactNode;
};

export function ComponentHeaderLayout({
  title,
  actions = [],
  children,
}: ComponentHeaderLayoutProps) {
  return (
    <div>
      <div className="flex justify-between items-center mb-3">
        <p className="capitalize text-xl font-medium">{title}</p>
        <div className="flex gap-2">
          {actions.map((action, index) => (
            <div key={index}>{action}</div>
          ))}
        </div>
      </div>
      <div className="flex w-full justify-between flex-wrap gap-x-5">
        {children}
      </div>
    </div>
  );
}

export function BasicComponentHeader({
  title,
  children,
}: ComponentHeaderLayoutProps) {
  const childrenArray = React.Children.toArray(children);
  const search = childrenArray[0]; // First child is the Search component
  const otherChildren = childrenArray.slice(1); // Remaining children are other components

  return (
    <div>
      <div className="flex justify-between items-center mb-3 gap-5">
        <p className="capitalize text-xl font-medium flex-shrink-0">{title}</p>{" "}
        <div className="flex items-center gap-x-5 w-full">
          <div className="flex-grow min-w-[200px]">{search}</div>{" "}
          <div className="flex items-center gap-x-5">{otherChildren}</div>
        </div>
      </div>
    </div>
  );
}
