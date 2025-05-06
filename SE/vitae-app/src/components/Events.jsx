import React, { useState } from "react";
import axios from "axios";
import { format } from "date-fns";
import { Link } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_API_URL;

function Events() {
  const [searchTerm, setSearchTerm] = useState("");
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      alert("Please enter a search term.");
      return;
    }
    setLoading(true);
    try {
      console.log("Searching term:", searchTerm);
      const res = await axios.get(`${BASE_URL}/api/events/combined?search=${searchTerm}`);
      console.log("Received events:", res.data);
      setEvents(res.data);
    } catch (err) {
      console.error("Failed to fetch events", err);
      setEvents([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center mt-8 space-y-4">
      <input
        type="text"
        placeholder="Search any event"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="p-2 border rounded mr-2"
      />
      <button
        onClick={handleSearch}
        className="bg-red-600 text-white text-xl px-6 py-3 rounded-lg"
      >
        SEARCH
      </button>

      {loading && <p className="mt-4 text-blue-500 font-semibold">Loading events...</p>}

      {!loading && events.length === 0 && (
        <p className="mt-4 text-gray-500 text-lg"></p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
        {Array.isArray(events) &&
          events.map((event, index) => {
            console.log("Rendering event:", event);

            return (
              <Link
                to={`/events/${event.source}/${event.event_id}`}
                key={`${event.event_id}_${event.start_ts}_${index}`}
                className="block"
              >
                <div className="border rounded-2xl shadow-md p-4 bg-white hover:shadow-lg transition cursor-pointer">
                  {event.imageUrl && (
                    <img
                      src={`${BASE_URL}/${event.imageUrl}`}
                      alt={event.name}
                      loading="lazy"
                      className="w-full h-40 object-cover rounded mb-2"
                    />
                  )}
                  <h2 className="text-xl font-semibold mb-1">{event.name}</h2>
                  <p className="text-sm text-gray-500 mb-2">
                    {event.place_name || "Unknown location"}
                  </p>
                  {event.start_ts && (
                    <p className="text-sm text-gray-600 mb-2">
                      {format(new Date(event.start_ts), "PPPp")}
                    </p>
                  )}
                  {event.tags?.length > 0 && (
                    <p className="text-sm text-gray-700">
                      {event.tags.slice(0, 3).join(", ")}
                    </p>
                  )}
                </div>
              </Link>
            );
          })}
      </div>
    </div>
  );
}

export default Events;
