interface ModelInfoHeaderProps {
  name: string;
}

export function ModelInfoHeader({ name }: ModelInfoHeaderProps) {
  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-2">{name}</h2>
    </div>
  );
}
