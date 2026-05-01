"use client";

import { useState } from "react";
import { Calendar, Clock } from "lucide-react";

interface TimeSlot {
  time: string;
  available: boolean;
}

interface AppointmentBookingProps {
  title?: string;
  availableDates: string[]; // DD/MM/YYYY format
  timeSlots: TimeSlot[];
  onBook?: (date: string, time: string) => void;
}

export function AppointmentBooking({ title, availableDates, timeSlots, onBook }: AppointmentBookingProps) {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const handleBook = () => {
    if (selectedDate && selectedTime && onBook) {
      onBook(selectedDate, selectedTime);
    }
  };

  return (
    <div className="card p-6">
      {title && (
        <h3 className="text-sm font-bold text-black uppercase tracking-widest mb-6" style={{ fontFamily: "Montserrat, sans-serif" }}>
          {title}
        </h3>
      )}

      {/* Date Selection */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Calendar className="w-4 h-4 text-gray-400" />
          <p className="text-xs font-semibold text-gray-700" style={{ fontFamily: "Montserrat, sans-serif" }}>Select Date</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {availableDates.map((date) => (
            <button
              key={date}
              onClick={() => { setSelectedDate(date); setSelectedTime(null); }}
              className={`px-3 py-2 rounded-lg text-xs font-medium border transition-colors duration-150 ${
                selectedDate === date ? "text-white border-transparent" : "text-gray-700 border-gray-200 hover:border-gray-300"
              }`}
              style={selectedDate === date ? { backgroundColor: "var(--accent)" } : undefined}
            >
              {date}
            </button>
          ))}
        </div>
      </div>

      {/* Time Selection */}
      {selectedDate && (
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Clock className="w-4 h-4 text-gray-400" />
            <p className="text-xs font-semibold text-gray-700" style={{ fontFamily: "Montserrat, sans-serif" }}>Select Time</p>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
            {timeSlots.map((slot) => (
              <button
                key={slot.time}
                onClick={() => slot.available && setSelectedTime(slot.time)}
                disabled={!slot.available}
                className={`px-3 py-2 rounded-lg text-xs font-medium border transition-colors duration-150 ${
                  !slot.available ? "text-gray-300 border-gray-100 cursor-not-allowed bg-gray-50"
                  : selectedTime === slot.time ? "text-white border-transparent"
                  : "text-gray-700 border-gray-200 hover:border-gray-300"
                }`}
                style={selectedTime === slot.time ? { backgroundColor: "var(--accent)" } : undefined}
              >
                {slot.time}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Book Button */}
      {selectedDate && selectedTime && (
        <button onClick={handleBook} className="btn-primary w-full text-sm">
          Book for {selectedDate} at {selectedTime}
        </button>
      )}
    </div>
  );
}
