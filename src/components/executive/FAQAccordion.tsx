"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQ {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  title: string;
  faqs: FAQ[];
}

export function FAQAccordion({ title, faqs }: FAQAccordionProps) {
  return (
    <section className="section">
      <div className="section-inner">
        <h2
          className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-black text-center mb-10"
          style={{ fontFamily: "Montserrat, sans-serif", letterSpacing: "-0.03em" }}
        >
          {title}
        </h2>
        <Accordion type="single" collapsible className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="border-b border-gray-200"
            >
              <AccordionTrigger
                className="text-left py-5 hover:no-underline"
                style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 600 }}
              >
                {faq.question}
              </AccordionTrigger>
              <AccordionContent
                className="text-gray-600 leading-relaxed pb-5"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
