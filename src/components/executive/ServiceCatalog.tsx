interface Service {
  id: string;
  name: string;
  description: string;
  price: string;
  currency?: string;
  duration?: string;
}

interface ServiceCatalogProps {
  title?: string;
  services: Service[];
  onSelect?: (serviceId: string) => void;
}

export function ServiceCatalog({ title, services, onSelect }: ServiceCatalogProps) {
  return (
    <div className="card">
      {title && (
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-sm font-bold text-black uppercase tracking-widest" style={{ fontFamily: "Montserrat, sans-serif" }}>
            {title}
          </h3>
        </div>
      )}
      <div className="divide-y divide-gray-100">
        {services.map((service) => (
          <div key={service.id} className="px-6 py-5 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-black" style={{ fontFamily: "Montserrat, sans-serif" }}>
                {service.name}
              </p>
              <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{service.description}</p>
              {service.duration && <p className="text-xs text-gray-400 mt-1">{service.duration}</p>}
            </div>
            <div className="flex items-center gap-4 flex-shrink-0">
              <span className="text-lg font-black text-black" style={{ fontFamily: "Montserrat, sans-serif" }}>
                {service.currency || "₹"}{service.price}
              </span>
              {onSelect && (
                <button
                  onClick={() => onSelect(service.id)}
                  className="btn-primary text-xs px-4 py-2"
                >
                  Book
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
