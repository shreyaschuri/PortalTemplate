"use client";

import dynamic from "next/dynamic";
import { useRef, useEffect } from "react";
import { motion } from "framer-motion";

const Globe = dynamic(() => import("react-globe.gl"), { ssr: false });

type Location = {
  id: string;
  city: string;
  country: string;
  lat: number;
  lng: number;
  image: string;
};

const locations: Location[] = [
  {
    id: "newyork",
    city: "New York",
    country: "USA",
    lat: 40.7128,
    lng: -74.006,
    image: "/locations/newyork.jpg",
  },
  {
    id: "london",
    city: "London",
    country: "UK",
    lat: 51.5072,
    lng: -0.1276,
    image: "/locations/london.jpg",
  },
  {
    id: "mumbai",
    city: "Mumbai",
    country: "India",
    lat: 19.076,
    lng: 72.8777,
    image: "/locations/mumbai.jpg",
  },
  {
    id: "tokyo",
    city: "Tokyo",
    country: "Japan",
    lat: 35.6895,
    lng: 139.6917,
    image: "/locations/tokyo.jpg",
  },
];

export default function LocationsPage() {
  const globeRef = useRef<any>(null);
  const refs: Record<string, React.RefObject<HTMLDivElement | null>> = {};
  locations.forEach((loc) => {
    refs[loc.id] = useRef<HTMLDivElement | null>(null);
  });

  const scrollToCard = (id: string) => {
    refs[id]?.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Enable auto-rotate
  useEffect(() => {
    let rafId: number | null = null;

    const enableAutoRotate = () => {
      const controls = globeRef.current?.controls?.();
      if (controls) {
        controls.autoRotate = true;
        controls.autoRotateSpeed = 0.6;
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;
        controls.update?.();

        const pause = () => (controls.autoRotate = false);
        const resume = () => (controls.autoRotate = true);
        controls.removeEventListener?.("start", pause);
        controls.removeEventListener?.("end", resume);
        controls.addEventListener?.("start", pause);
        controls.addEventListener?.("end", resume);
      } else {
        rafId = requestAnimationFrame(enableAutoRotate);
      }
    };

    enableAutoRotate();
    return () => {
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  // Focus camera + scroll
  const focusOnLocation = (loc: Location) => {
    globeRef.current?.pointOfView(
      { lat: loc.lat, lng: loc.lng, altitude: 1.5 },
      1000 // 1s animation
    );
    setTimeout(() => scrollToCard(loc.id), 1200);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-12">
      {/* Heading */}
      <motion.h2
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold text-blue-700 text-center"
      >
        Company Locations
      </motion.h2>

      {/* Globe */}
      <div className="relative w-full h-[500px] bg-black rounded-2xl overflow-hidden shadow-lg">
        <Globe
          ref={globeRef}
          globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
          bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
          htmlElementsData={locations}
          htmlLat={(d) => (d as Location).lat}
          htmlLng={(d) => (d as Location).lng}
          htmlElement={(d) => {
            const loc = d as Location;

            const container = document.createElement("div");
            container.style.position = "relative";
            container.style.width = "20px";
            container.style.height = "20px";
            container.style.transform = "translate(-50%, -50%)";
            container.style.cursor = "pointer";
            container.style.pointerEvents = "auto";
            container.style.zIndex = "1000";

            const pulse = document.createElement("div");
            pulse.style.width = "100%";
            pulse.style.height = "100%";
            pulse.style.borderRadius = "50%";
            pulse.style.background = "rgba(255, 99, 132, 0.6)";
            pulse.style.boxShadow = "0 0 15px rgba(255, 99, 132, 0.9)";
            pulse.style.animation = "ping 1.5s infinite";

            const dot = document.createElement("div");
            dot.style.position = "absolute";
            dot.style.top = "4px";
            dot.style.left = "4px";
            dot.style.width = "12px";
            dot.style.height = "12px";
            dot.style.borderRadius = "50%";
            dot.style.background = "#ff3860";
            dot.style.boxShadow = "0 0 6px #ff3860";

            const tooltip = document.createElement("div");
            tooltip.innerText = `${loc.city}, ${loc.country}`;
            tooltip.style.position = "absolute";
            tooltip.style.bottom = "28px";
            tooltip.style.left = "50%";
            tooltip.style.transform = "translateX(-50%)";
            tooltip.style.background = "rgba(0,0,0,0.75)";
            tooltip.style.color = "white";
            tooltip.style.padding = "4px 8px";
            tooltip.style.borderRadius = "6px";
            tooltip.style.fontSize = "12px";
            tooltip.style.whiteSpace = "nowrap";
            tooltip.style.opacity = "0";
            tooltip.style.transition = "opacity 0.3s";
            tooltip.style.pointerEvents = "none";

            container.onmouseenter = () => (tooltip.style.opacity = "1");
            container.onmouseleave = () => (tooltip.style.opacity = "0");

            container.onclick = () => focusOnLocation(loc);

            container.appendChild(pulse);
            container.appendChild(dot);
            container.appendChild(tooltip);
            return container;
          }}
        />
      </div>

      {/* Location Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {locations.map((loc) => (
          <motion.div
            key={loc.id}
            ref={refs[loc.id]}
            whileHover={{ scale: 1.02 }}
            className="card overflow-hidden"
          >
            <img
              src={loc.image}
              alt={loc.city}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-2xl font-bold">{loc.city}</h3>
              <p className="text-gray-600">{loc.country}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Pulse animation */}
      <style jsx global>{`
        @keyframes ping {
          0% {
            transform: scale(0.9);
            opacity: 0.8;
          }
          70% {
            transform: scale(1.5);
            opacity: 0;
          }
          100% {
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
