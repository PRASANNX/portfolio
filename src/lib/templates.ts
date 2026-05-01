export interface BusinessCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  default_config: Record<string, any>;
}

export const BUSINESS_CATEGORIES: BusinessCategory[] = [
  {
    id: "agency",
    name: "Agency / Freelancer",
    slug: "agency",
    description: "Service business, marketing agency, or freelancer.",
    default_config: {
      features: ["client_portal", "invoicing", "proposals"],
      service_catalog_enabled: true,
      appointment_booking_enabled: true,
    },
  },
  {
    id: "clinic",
    name: "Clinic / Healthcare",
    slug: "clinic",
    description: "Medical clinic, dentist, or therapist.",
    default_config: {
      features: ["appointment_booking", "patient_records", "prescriptions"],
      service_catalog_enabled: true,
      appointment_booking_enabled: true,
    },
  },
  {
    id: "gym",
    name: "Gym / Fitness",
    slug: "gym",
    description: "Fitness center, yoga studio, or personal trainer.",
    default_config: {
      features: ["memberships", "class_scheduling", "trainers"],
      service_catalog_enabled: true,
      appointment_booking_enabled: true,
    },
  },
  {
    id: "consulting",
    name: "Consulting / Legal",
    slug: "consulting",
    description: "Law firm, financial advisor, or business consultant.",
    default_config: {
      features: ["appointment_booking", "document_vault", "invoicing"],
      service_catalog_enabled: true,
      appointment_booking_enabled: true,
    },
  },
  {
    id: "real_estate",
    name: "Real Estate",
    slug: "real_estate",
    description: "Property management, broker, or real estate agency.",
    default_config: {
      features: ["property_listings", "appointment_booking", "document_vault"],
      service_catalog_enabled: false,
      appointment_booking_enabled: true,
    },
  },
  {
    id: "education",
    name: "Education / Coaching",
    slug: "education",
    description: "Tutor, online course creator, or coaching center.",
    default_config: {
      features: ["courses", "student_portal", "certifications"],
      service_catalog_enabled: true,
      appointment_booking_enabled: true,
    },
  },
  {
    id: "events",
    name: "Events / Entertainment",
    slug: "events",
    description: "Event planner, photographer, or entertainment venue.",
    default_config: {
      features: ["event_ticketing", "portfolios", "booking"],
      service_catalog_enabled: true,
      appointment_booking_enabled: true,
    },
  },
  {
    id: "retail",
    name: "Retail / E-commerce",
    slug: "retail",
    description: "Local shop or online store.",
    default_config: {
      features: ["inventory", "orders", "shipping"],
      service_catalog_enabled: true,
      appointment_booking_enabled: false,
    },
  },
  {
    id: "restaurant",
    name: "Restaurant / Cafe",
    slug: "restaurant",
    description: "Dine-in, takeaway, or food truck.",
    default_config: {
      features: ["menu", "orders", "reservations"],
      service_catalog_enabled: true,
      appointment_booking_enabled: true,
    },
  },
  {
    id: "home_services",
    name: "Home Services",
    slug: "home_services",
    description: "Plumber, electrician, or cleaning service.",
    default_config: {
      features: ["booking", "invoicing", "estimates"],
      service_catalog_enabled: true,
      appointment_booking_enabled: true,
    },
  },
];
