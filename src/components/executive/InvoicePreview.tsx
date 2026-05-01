interface InvoiceItem {
  description: string;
  quantity: number;
  rate: string;
  amount: string;
}

interface InvoicePreviewProps {
  invoiceNumber: string;
  date: string;
  dueDate: string;
  fromName: string;
  fromGstin?: string;
  toName: string;
  toGstin?: string;
  items: InvoiceItem[];
  subtotal: string;
  gstRate: string;
  gstAmount: string;
  total: string;
  currency?: string;
  status: "draft" | "sent" | "paid" | "overdue";
}

const statusStyles: Record<string, string> = {
  draft: "bg-gray-100 text-gray-600",
  sent: "bg-blue-50 text-blue-700",
  paid: "bg-green-50 text-green-700",
  overdue: "bg-red-50 text-red-700",
};

export function InvoicePreview(props: InvoicePreviewProps) {
  const c = props.currency || "₹";
  return (
    <div className="card">
      <div className="px-6 py-5 border-b border-gray-200 flex items-start justify-between">
        <div>
          <p className="text-xs text-gray-400 uppercase tracking-widest" style={{ fontFamily: "Montserrat, sans-serif" }}>Invoice</p>
          <p className="text-lg font-black text-black mt-0.5" style={{ fontFamily: "Montserrat, sans-serif" }}>{props.invoiceNumber}</p>
        </div>
        <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize ${statusStyles[props.status]}`}>{props.status}</span>
      </div>
      <div className="px-6 py-4 grid grid-cols-2 gap-6 border-b border-gray-100 text-xs">
        <div>
          <p className="text-gray-400 font-semibold uppercase tracking-widest mb-1">From</p>
          <p className="font-semibold text-black">{props.fromName}</p>
          {props.fromGstin && <p className="text-gray-400">GSTIN: {props.fromGstin}</p>}
        </div>
        <div>
          <p className="text-gray-400 font-semibold uppercase tracking-widest mb-1">To</p>
          <p className="font-semibold text-black">{props.toName}</p>
          {props.toGstin && <p className="text-gray-400">GSTIN: {props.toGstin}</p>}
        </div>
      </div>
      <table className="w-full text-xs">
        <thead><tr className="border-b border-gray-200">
          <th className="px-6 py-3 text-left text-gray-400 font-semibold">Description</th>
          <th className="px-3 py-3 text-right text-gray-400 font-semibold">Qty</th>
          <th className="px-3 py-3 text-right text-gray-400 font-semibold">Rate</th>
          <th className="px-6 py-3 text-right text-gray-400 font-semibold">Amount</th>
        </tr></thead>
        <tbody>{props.items.map((item, i) => (
          <tr key={i} className="border-b border-gray-50">
            <td className="px-6 py-3 text-black">{item.description}</td>
            <td className="px-3 py-3 text-right text-gray-600">{item.quantity}</td>
            <td className="px-3 py-3 text-right text-gray-600">{c}{item.rate}</td>
            <td className="px-6 py-3 text-right font-medium text-black">{c}{item.amount}</td>
          </tr>
        ))}</tbody>
      </table>
      <div className="px-6 py-4 border-t border-gray-200">
        <div className="max-w-xs ml-auto space-y-1 text-xs">
          <div className="flex justify-between"><span className="text-gray-500">Subtotal</span><span>{c}{props.subtotal}</span></div>
          <div className="flex justify-between"><span className="text-gray-500">GST ({props.gstRate})</span><span>{c}{props.gstAmount}</span></div>
          <div className="flex justify-between pt-2 border-t border-gray-200 mt-2">
            <span className="font-bold text-black">Total</span>
            <span className="font-black text-base text-black" style={{ fontFamily: "Montserrat, sans-serif" }}>{c}{props.total}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
