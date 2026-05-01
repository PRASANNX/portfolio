"use client";

import { DocumentVault } from "@/components/executive/DocumentVault";

export default function DocumentsPage() {
  const documents = [
    {
      id: "doc-1",
      name: "Project_Proposal_v2.pdf",
      type: "PDF Document",
      size: "2.4 MB",
      uploadedAt: "12 Oct 2026",
      url: "#",
    },
    {
      id: "doc-2",
      name: "Service_Agreement_Signed.pdf",
      type: "PDF Document",
      size: "1.1 MB",
      uploadedAt: "10 Oct 2026",
      url: "#",
    },
    {
      id: "doc-3",
      name: "Brand_Assets.zip",
      type: "ZIP Archive",
      size: "14.5 MB",
      uploadedAt: "05 Oct 2026",
      url: "#",
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-black tracking-tight mb-2" style={{ fontFamily: "Montserrat, sans-serif" }}>
          Documents
        </h1>
        <p className="body text-gray-500">
          Securely access and download your project files and agreements.
        </p>
      </div>

      <div className="max-w-4xl">
        <DocumentVault
          title="Shared Files"
          documents={documents}
          emptyMessage="No documents have been shared with you yet."
        />
      </div>
    </div>
  );
}
