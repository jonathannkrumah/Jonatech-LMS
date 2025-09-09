"use client";

import dynamic from "next/dynamic";
import { useState } from "react";

// Load react-pdf only on client
const { Document, Page, pdfjs } = dynamic(
  async () => {
    const mod = await import("react-pdf");
    return {
      Document: mod.Document,
      Page: mod.Page,
      pdfjs: mod.pdfjs,
    };
  },
  { ssr: false }
);

if (pdfjs) {
  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
}

export default function PdfViewer({ url }) {
  const [numPages, setNumPages] = useState(null);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <div className="flex flex-col items-center">
      {Document && Page ? (
        <Document file={url} onLoadSuccess={onDocumentLoadSuccess}>
          {Array.from(new Array(numPages), (el, index) => (
            <Page key={`page_${index + 1}`} pageNumber={index + 1} />
          ))}
        </Document>
      ) : (
        <p>Loading PDF...</p>
      )}
    </div>
  );
}
