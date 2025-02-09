"use client";

import React, { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const Faq = ({ faqData }: any) => {
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <div className="pages" style={{backgroundImage: "url('/assets/img/sec-bg.png')", backgroundSize: "4500px", backgroundPosition: "center"}}>
      <div className="flex justify-center text-center  font-bold text-4xl">
        <h2>Freqently Asked Questions</h2>
      </div>

      <div className="lx-faq py-8 w-full px-0 text-black ">
        <div className="mx-auto sm:max-w-md md:max-w-lg lg:max-w-2xl xl:max-w-3xl">
          <div className="shadow-lg mx-auto p-6 bg-white rounded-lg sm:p-8 md:p-10 lg:p-12">
            {faqData.length > 0 ? (
              faqData.map((faq: any, index: any) => (
                <Accordion
                  key={index}
                  expanded={expanded === `panel${index}`}
                  onChange={handleChange(`panel${index}`)}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={`panel${index}-content`}
                    id={`panel${index}-header`}
                    className="cursor-pointer p-4 bg-[#dfcf8e] rounded-md mb-2 hover:bg-[#d4c793]"
                  >
                    <div dangerouslySetInnerHTML={{ __html: faq.question }} />
                  </AccordionSummary>
                  <AccordionDetails className="p-4 bg-gray-100 border-l-4 border-[#B88C4F] rounded-md">
                    <div
                      dangerouslySetInnerHTML={{ __html: faq.description }}
                    />
                  </AccordionDetails>
                </Accordion>
              ))
            ) : (
              <p className="text-center text-gray-500">Loading FAQs...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faq;

