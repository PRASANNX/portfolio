import { FileText, Download } from "lucide-react";

interface Document {
  id: string;
  name: string;
  type: string;
  size: string;
  uploadedAt: string;
  url?: string;
}

interface DocumentVaultProps {
  title?: string;
  documents: Document[];
  emptyMessage?: string;
}

export function DocumentVault({ title, documents, emptyMessage }: DocumentVaultProps) {
  return (
    <div className="card">
      {title && (
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-sm font-bold text-black uppercase tracking-widest" style={{ fontFamily: "Montserrat, sans-serif" }}>
            {title}
          </h3>
        </div>
      )}
      {documents.length === 0 ? (
        <div className="px-6 py-12 text-center">
          <FileText className="w-8 h-8 text-gray-300 mx-auto mb-3" />
          <p className="text-sm text-gray-400">{emptyMessage || "No documents yet"}</p>
        </div>
      ) : (
        <div className="divide-y divide-gray-100">
          {documents.map((doc) => (
            <div key={doc.id} className="px-6 py-4 flex items-center gap-4 hover:bg-gray-50 transition-colors duration-100">
              <FileText className="w-5 h-5 text-gray-400 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-black truncate" style={{ fontFamily: "Montserrat, sans-serif" }}>
                  {doc.name}
                </p>
                <p className="text-xs text-gray-400">{doc.type} · {doc.size} · {doc.uploadedAt}</p>
              </div>
              {doc.url && (
                <a href={doc.url} download className="p-2 text-gray-400 hover:text-black transition-colors">
                  <Download className="w-4 h-4" />
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
