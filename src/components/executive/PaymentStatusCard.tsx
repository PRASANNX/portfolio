import { CheckCircle2, AlertCircle, Clock } from "lucide-react";

interface PaymentStatusCardProps {
  status: "success" | "failed" | "pending";
  amount: string;
  currency?: string;
  paymentId?: string;
  date?: string;
  onRetry?: () => void;
  onDownloadReceipt?: () => void;
}

export function PaymentStatusCard({ 
  status, 
  amount, 
  currency = "₹", 
  paymentId, 
  date,
  onRetry,
  onDownloadReceipt
}: PaymentStatusCardProps) {
  
  const statusConfig = {
    success: {
      icon: CheckCircle2,
      color: "text-green-500",
      bg: "bg-green-50",
      title: "Payment Successful",
      desc: "Your payment has been processed successfully.",
    },
    failed: {
      icon: AlertCircle,
      color: "text-red-500",
      bg: "bg-red-50",
      title: "Payment Failed",
      desc: "We couldn't process your payment. Please try again.",
    },
    pending: {
      icon: Clock,
      color: "text-yellow-500",
      bg: "bg-yellow-50",
      title: "Payment Pending",
      desc: "Your payment is currently being processed.",
    }
  };

  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <div className="card max-w-md w-full overflow-hidden">
      <div className={`${config.bg} p-8 flex flex-col items-center justify-center text-center border-b border-gray-100`}>
        <Icon className={`w-12 h-12 ${config.color} mb-4`} />
        <h2 className="text-xl font-bold text-black mb-1" style={{ fontFamily: "Montserrat, sans-serif" }}>
          {config.title}
        </h2>
        <p className="text-sm text-gray-600">
          {config.desc}
        </p>
      </div>
      
      <div className="p-6">
        <div className="flex flex-col gap-4 mb-6">
          <div className="flex justify-between items-center pb-4 border-b border-gray-100">
            <span className="text-xs text-gray-500 uppercase tracking-widest font-semibold">Amount</span>
            <span className="text-lg font-black text-black" style={{ fontFamily: "Montserrat, sans-serif" }}>
              {currency}{amount}
            </span>
          </div>
          
          {paymentId && (
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-500 uppercase tracking-widest font-semibold">Transaction ID</span>
              <span className="text-sm font-mono text-gray-700">{paymentId}</span>
            </div>
          )}
          
          {date && (
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-500 uppercase tracking-widest font-semibold">Date</span>
              <span className="text-sm text-gray-700">{date}</span>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-3">
          {status === "failed" && onRetry && (
            <button onClick={onRetry} className="btn-primary w-full py-3 text-sm">
              Try Again
            </button>
          )}
          
          {status === "success" && onDownloadReceipt && (
            <button onClick={onDownloadReceipt} className="btn-secondary w-full py-3 text-sm flex items-center justify-center gap-2">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download Receipt
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
