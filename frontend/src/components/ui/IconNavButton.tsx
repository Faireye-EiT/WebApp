import React from "react";
import { Button } from "./button";

function IconNavButton({
  icon: Icon,
  label,
  active = false,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  active?: boolean;
}) {
  return (
    <Button
      size={"icon-lg"}
      className={`size-10 p-3 rounded-lg transition-colors ${
        active ? "bg-blue-200" : "bg-blue-100 hover:bg-blue-200"
      }`}
      aria-label={label}
    >
      <Icon
        className={`size-6 ${active ? "text-blue-700" : "text-blue-600"}`}
      />
    </Button>
  );
}

export default IconNavButton;
