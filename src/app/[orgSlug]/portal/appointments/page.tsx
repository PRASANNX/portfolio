"use client";

import { AppointmentBooking } from "@/components/executive/AppointmentBooking";

export default function AppointmentsPage() {
  const availableDates = ["15 Oct 2026", "16 Oct 2026", "17 Oct 2026", "18 Oct 2026"];
  const timeSlots = [
    { time: "09:00 AM", available: true },
    { time: "10:00 AM", available: false },
    { time: "11:00 AM", available: true },
    { time: "01:00 PM", available: true },
    { time: "02:00 PM", available: true },
    { time: "03:00 PM", available: false },
    { time: "04:00 PM", available: true },
  ];

  const handleBook = (date: string, time: string) => {
    alert(`Booking requested for ${date} at ${time}. Our team will confirm shortly.`);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-black tracking-tight mb-2" style={{ fontFamily: "Montserrat, sans-serif" }}>
          Appointments
        </h1>
        <p className="body text-gray-500">
          Schedule a consultation or review meeting with our team.
        </p>
      </div>

      <div className="max-w-2xl">
        <AppointmentBooking
          title="Schedule a Meeting"
          availableDates={availableDates}
          timeSlots={timeSlots}
          onBook={handleBook}
        />
      </div>
    </div>
  );
}
