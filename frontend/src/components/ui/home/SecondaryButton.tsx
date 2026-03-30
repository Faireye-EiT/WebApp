function SecondaryButton({
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
      className="cursor-pointer px-8 py-4 bg-transparent text-blue-500 border-2 border-blue-500 rounded-3xl hover:bg-blue-50 transition-colors flex items-center gap-2"
      type="button"
    >
      {children}
      <Icon className="w-5 h-5" />
    </button>
  );
}

export default SecondaryButton;
