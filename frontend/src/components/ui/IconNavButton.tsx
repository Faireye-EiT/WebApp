import React from "react";

function IconNavButton({
  icon: Icon,
  label,
  active = false,
  onClick,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`p-3 rounded-lg transition-colors ${
        active ? "bg-blue-200" : "bg-blue-100 hover:bg-blue-200"
      }`}
      aria-label={label}
    >
      <Icon
        className={`w-5 h-5 ${active ? "text-blue-700" : "text-blue-600"}`}
      />
    </button>
  );
}

export default IconNavButton;
