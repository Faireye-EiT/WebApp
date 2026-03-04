function BrandMark({ className = "" }: { className?: string }) {
  return (
    <h1 className={`font-bold ${className}`}>
      FAI<span className="text-blue-600">RE</span>YE
    </h1>
  );
}

export default BrandMark;
