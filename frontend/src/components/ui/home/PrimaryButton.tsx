function PrimaryButton({
  children,
  icon: Icon,
  onClick,
}: {
  children: React.ReactNode;
  icon: React.ComponentType<{ className?: string }>;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="cursor-pointer px-8 py-4 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors flex items-center gap-2 shadow-md"
      type="button"
    >
      {children}
      <Icon className="w-5 h-5" />
    </button>
  );
}

export default PrimaryButton;
