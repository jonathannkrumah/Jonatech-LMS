"use client";

import dynamic from "next/dynamic";

// Load PdfViewer without SSR
const PdfViewer = dynamic(() => import("@/components/PdfViewer"), {
  ssr: false,
});

export default async function ViewerPage({ params }) {
  const { id } = await params; // 👈 await params here

  const url = `http://localhost:4000/materials/${id}/view`;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Course Material Viewer</h1>
      <PdfViewer url={url} />
    </div>
  );
}
