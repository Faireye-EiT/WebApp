import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../accordion";
import { FAQ_ITEMS } from "./home-content";

function FaqSection() {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <h3 className="mb-6 text-2xl font-bold text-slate-900">
        Frequently Asked Questions
      </h3>
      <Accordion className="space-y-4">
        {FAQ_ITEMS.map((item) => (
          <AccordionItem
            key={item.q}
            className="rounded-2xl px-4 border border-slate-200 bg-slate-50/60"
          >
            <AccordionTrigger className="cursor-pointer text-base text-slate-900">
              {item.q}
            </AccordionTrigger>
            <AccordionContent className="text-sm leading-relaxed text-slate-600">
              {item.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}

export default FaqSection;
