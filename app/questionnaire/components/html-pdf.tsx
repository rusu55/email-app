"use client";
import React, { useRef } from "react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export const HtmlPdf = () => {
  const ref = useRef(null);

  const downloadPdf = async () => {
    const htmlElement: any = ref.current;
    const jsPdf = new jsPDF("p", "pt", "letter");

    const opt: any = {
      callback: function (jsPdf: any) {
        jsPdf.save("Test.pdf");
        // to open the generated PDF in browser window
        // window.open(jsPdf.output('bloburl'));
      },
      margin: [10, 10, 10, 10],
      autoPaging: "text",
      html2canvas: {
        allowTaint: true,
        dpi: 72,
        letterRendering: true,
        logging: false,
        scale: 0.6,
      },
    };

    jsPdf.html(htmlElement, opt);
  };

  return (
    <section className=" max-w-screen-lg mx-auto">
      <div ref={ref}>
        <h2 className="text-center py-4 text-2xl">Video Questionnaire</h2>
        <Separator />
        <div className="pt-4 space-y-2">
          <p className=" text-[16px] font-semibold">
            Bride Name: <span className=" font-light"> Michelle</span>
          </p>
          <p className=" text-[16px] font-semibold">
            Groom Name: <span className=" font-light"> John</span>
          </p>
          <p className=" text-[16px] font-semibold">
            Wedding Date: <span className=" font-light"> 12.14.2024</span>
          </p>
        </div>
      </div>
      <div className="w-full flex justify-center">
        <Button onClick={downloadPdf}>Download</Button>
      </div>
    </section>
  );
};
