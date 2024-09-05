import { useState } from "react";
import { Tab } from "~/components/atoms/Tab/Tab";
import { ManageAds } from "./ManageAds/ManageAds";
import { RegisterAdForm } from "./RegisterAdForm/RegisterAdForm";

export interface TabsProps {
  index: number;
  title: string;
  onClick: () => void;
  selected: boolean;
}

export const Publisher = () => {
  const [activeMenu, setActiveMenu] = useState(0);

  return (
    <div className="flex w-[800px] flex-col items-start gap-12">
      {/* Tabs */}
      <Tab
        tabs={[
          { name: "Register", handleClick: () => setActiveMenu(0) },
          { name: "Manage", handleClick: () => setActiveMenu(1) },
        ]}
      />
      {/* Form */}
      {activeMenu === 0 && <RegisterAdForm />}
      {activeMenu === 1 && <ManageAds />}
    </div>
  );
};
