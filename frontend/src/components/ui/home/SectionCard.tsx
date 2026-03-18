function SectionCard({
  title,
  body,
  id,
  className,
}: {
  title: string;
  body: string;
  id?: string;
  className?: string;
}) {
  return (
    <section
      className={`rounded-3xl p-12 mb-8 bg-blue-50/60 border border-blue-100 shadow-sm ${className ?? ""}`}
      id={id}
    >
      <h3 className="text-3xl font-bold mb-6 text-slate-900 text-center">
        {title}
      </h3>
      <p className="text-center max-w-3xl mx-auto text-slate-700 leading-relaxed">
        {body}
      </p>
    </section>
  );
}

export default SectionCard;
