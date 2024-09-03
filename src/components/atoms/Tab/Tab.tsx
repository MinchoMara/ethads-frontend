import clsx from "clsx";
import { useState } from "react";

export const TabElement = ({
  name,
  active,
  handleClick,
}: {
  name: string;
  active: boolean;
  handleClick: () => void;
}) => {
  return (
    <button
      type="button"
      className={clsx(
        "flex h-7 flex-1 items-center justify-center rounded text-14/button/m transition-all duration-300",
        active ? "bg-gray-100 text-gray-950" : "text-gray-400 hover:text-gray-950",
      )}
      onClick={handleClick}
    >
      {name}
    </button>
  );
};

export interface TabProps {
  tabs: {
    name: string;
    handleClick: () => void;
  }[];
}

export const Tab = ({ tabs }: TabProps) => {
  const [activeElement, setActiveElement] = useState(0);

  const handleClick = (index: number) => {
    setActiveElement(index);
    tabs[index].handleClick();
  };

  return (
    <div className="flex w-[400px] items-center rounded-lg bg-gray-200 p-1">
      {tabs.map((tab, index) => (
        <TabElement
          key={tab.name}
          name={tab.name}
          active={activeElement === index}
          handleClick={() => handleClick(index)}
        />
      ))}
    </div>
  );
};
