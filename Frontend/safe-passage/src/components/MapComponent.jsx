import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from "react-leaflet";
import L from "leaflet";
import { Navigation, Phone, ExternalLink, Shield, Cross, Building2, Wrench } from "lucide-react";

// Helper component to recenter map dynamically
function RecenterMap({ center, zoom }) {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.setView(center, zoom || 14, { animate: true });
    }
  }, [center, zoom, map]);
  return null;
}

// Custom Leaflet DivIcons to match the design screenshot
const createCustomIcon = (type, color) => {
  let bgColor = "bg-blue-600";
  let ringColor = "ring-blue-100";
  let svgIcon = "";

  if (color === "red" || type === "hospital") {
    bgColor = "bg-red-500";
    ringColor = "ring-red-100";
    svgIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 6v12m-6-6h12"/></svg>`;
  } else if (color === "blue" || type === "police") {
    bgColor = "bg-blue-600";
    ringColor = "ring-blue-100";
    svgIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`;
  } else if (color === "orange" || type === "embassy") {
    bgColor = "bg-amber-500";
    ringColor = "ring-amber-100";
    svgIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect width="16" height="20" x="4" y="2" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M8 10h.01"/><path d="M16 10h.01"/><path d="M8 14h.01"/><path d="M16 14h.01"/></svg>`;
  } else {
    bgColor = "bg-indigo-600";
    ringColor = "ring-indigo-100";
    svgIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>`;
  }

  return L.divIcon({
    className: "custom-map-marker",
    html: `
      <div class="relative flex items-center justify-center">
        <div class="w-8 h-8 rounded-full ${bgColor} ring-4 ${ringColor} shadow-lg flex items-center justify-center transform transition-transform hover:scale-110">
          ${svgIcon}
        </div>
        <div class="w-2 h-2 ${bgColor} rotate-45 -mt-1 mx-auto"></div>
      </div>
    `,
    iconSize: [32, 38],
    iconAnchor: [16, 38],
    popupAnchor: [0, -36]
  });
};

// Pulsing user location radar marker
const userRadarIcon = L.divIcon({
  className: "custom-radar-marker",
  html: `
    <div class="relative flex items-center justify-center w-10 h-10">
      <div class="absolute w-10 h-10 rounded-full bg-blue-500/20 radar-pulse"></div>
      <div class="w-4 h-4 rounded-full bg-blue-600 ring-4 ring-white shadow-md"></div>
    </div>
  `,
  iconSize: [40, 40],
  iconAnchor: [20, 20]
});

export default function MapComponent({
  center = [6.9271, 79.8612], // Colombo Center
  zoom = 14,
  services = [],
  radiusKm = 5,
  showRadius = true,
  height = "450px",
  onMarkerSelect
}) {
  return (
    <div className="relative w-full overflow-hidden rounded-2xl shadow-inner border border-slate-200/80" style={{ height }}>
      <MapContainer
        center={center}
        zoom={zoom}
        scrollWheelZoom={false}
        className="h-full w-full"
        style={{ minHeight: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <RecenterMap center={center} zoom={zoom} />

        {/* User Current Location Marker */}
        <Marker position={center} icon={userRadarIcon}>
          <Popup>
            <div className="text-center font-medium">
              <span className="inline-block px-2 py-0.5 text-xs rounded-full bg-blue-100 text-blue-800 font-semibold mb-1">
                Your Current Location
              </span>
              <p className="text-xs text-slate-600">Colombo, Western Province, Sri Lanka</p>
            </div>
          </Popup>
        </Marker>

        {/* Dynamic Radius Circle */}
        {showRadius && radiusKm && (
          <Circle
            center={center}
            radius={radiusKm * 1000}
            pathOptions={{
              color: "#3b82f6",
              fillColor: "#60a5fa",
              fillOpacity: 0.08,
              weight: 1.5,
              dashArray: "4, 6"
            }}
          />
        )}

        {/* Nearby Services Markers */}
        {services.map((item) => (
          <Marker
            key={item.id}
            position={[item.lat, item.lng]}
            icon={createCustomIcon(item.type, item.iconColor)}
            eventHandlers={{
              click: () => onMarkerSelect && onMarkerSelect(item)
            }}
          >
            <Popup>
              <div className="min-w-[190px] p-1">
                <div className="flex items-center gap-1.5 mb-1.5">
                  <span
                    className={`inline-block w-2.5 h-2.5 rounded-full ${
                      item.iconColor === "red"
                        ? "bg-red-500"
                        : item.iconColor === "blue"
                        ? "bg-blue-500"
                        : "bg-amber-500"
                    }`}
                  />
                  <h4 className="text-xs font-bold text-slate-800 leading-tight">
                    {item.shortName || item.name}
                  </h4>
                </div>
                <p className="text-[11px] text-slate-500 mb-2">{item.address}</p>
                <div className="flex items-center justify-between text-[11px] font-semibold text-slate-700 bg-slate-50 rounded-lg p-1.5 mb-2 border border-slate-100">
                  <span>📍 {item.distance}</span>
                  <span>⏱️ {item.time}</span>
                </div>
                <div className="flex gap-1.5">
                  <a
                    href={`tel:${item.phone}`}
                    className="flex-1 flex items-center justify-center gap-1 py-1 px-2 text-[11px] font-medium bg-emerald-50 text-emerald-700 rounded-lg hover:bg-emerald-100 transition"
                  >
                    <Phone className="w-3 h-3" /> Call
                  </a>
                  <a
                    href={`https://maps.google.com/?q=${item.lat},${item.lng}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 flex items-center justify-center gap-1 py-1 px-2 text-[11px] font-medium bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition"
                  >
                    <Navigation className="w-3 h-3" /> Direct
                  </a>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Floating Recenter GPS Pill */}
      <button
        onClick={() => {
          // simple recenter indicator
        }}
        className="absolute bottom-4 left-4 z-[400] flex items-center gap-1.5 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full shadow-md text-xs font-semibold text-slate-700 border border-slate-200/80 hover:bg-white hover:text-blue-600 transition"
        title="Recenter location"
      >
        <Navigation className="w-3.5 h-3.5 text-blue-600" />
        <span>Colombo (GPS Active)</span>
      </button>

      {/* Radius Indicator Badge */}
      {showRadius && (
        <div className="absolute top-4 right-4 z-[400] bg-white/95 backdrop-blur-md px-3 py-1 rounded-full shadow text-[11px] font-semibold text-slate-600 border border-slate-200">
          Showing within <span className="text-blue-600 font-bold">{radiusKm} km</span>
        </div>
      )}
    </div>
  );
}
