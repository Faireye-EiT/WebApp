function BrandMark({ className = "" }: { className?: string }) {
  return (
    <h1 className={`font-bold ${className}`}>
      F<span className="text-blue-600">AI</span>REYE
    </h1>
  );
}

export default BrandMark;
