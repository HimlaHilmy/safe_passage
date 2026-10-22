import React, { createContext, useContext, useState, useEffect } from "react";

const SafePassageContext = createContext();

const API_BASE_URL = "http://localhost:3002/api";

const INITIAL_INCIDENTS = [
  {
    id: "SP-2026-00123",
    trackingId: "SP-2026-00123",
    name: "Himla Hilmy",
    email: "himlahilmy@gmail.com",
    title: "Lost Passport",
    category: "Lost Passport / Consular",
    emergencyType: "Lost Passport / Consular",
    severity: "Medium",
    location: "Colombo, Sri Lanka",
    lat: 6.9344,
    lng: 79.8428,
    description: "Lost passport pouch near Dutch Hospital shopping precinct. Need urgent emergency consular travel document for scheduled flight.",
    reportedAgo: "2 hours ago",
    createdAt: new Date(Date.now() - 2 * 3600 * 1000).toISOString(),
    status: "Under Review",
    assignedOfficer: "Embassy Liaison - Officer Wickramasinghe",
    photoUrl: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=80",
    timeline: [
      { step: "Reported", time: "10 Sep 2026, 10:15 AM", completed: true, note: "Incident report logged by traveler with verified GPS coordinates." },
      { step: "Under Review", time: "10 Sep 2026, 11:02 AM", completed: true, note: "Case assigned to Sri Lanka Consular Support desk." },
      { step: "Assistance in Progress", time: "Pending", completed: false, note: "Emergency travel document issuance in queue." },
      { step: "Resolved", time: "Pending", completed: false, note: "Collection at High Commission Consular Wing." }
    ]
  },
  {
    id: "SP-2026-00112",
    trackingId: "SP-2026-00112",
    name: "Himla Hilmy",
    email: "himlahilmy@gmail.com",
    title: "Medical Emergency",
    category: "Medical Emergency",
    emergencyType: "Medical Emergency",
    severity: "High",
    location: "Kollupitiya, Colombo",
    lat: 6.9080,
    lng: 79.8520,
    description: "Acute allergic reaction and respiratory distress while dining. Required urgent paramedic stabilization.",
    reportedAgo: "5 hours ago",
    createdAt: new Date(Date.now() - 5 * 3600 * 1000).toISOString(),
    status: "Assistance in Progress",
    assignedOfficer: "Dr. K. Perera (National Hospital ER)",
    photoUrl: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=600&q=80",
    timeline: [
      { step: "Reported", time: "10 Sep 2026, 07:30 AM", completed: true, note: "Urgent medical SOS received via Safe Passage mobile app." },
      { step: "Under Review", time: "10 Sep 2026, 07:34 AM", completed: true, note: "Triage operator confirmed high severity; 1990 ambulance dispatched." },
      { step: "Assistance in Progress", time: "10 Sep 2026, 07:48 AM", completed: true, note: "Paramedics arrived at scene; patient admitted to General Hospital." },
      { step: "Resolved", time: "Pending", completed: false, note: "Awaiting discharge clearance and case closure." }
    ]
  },
  {
    id: "SP-2026-00108",
    trackingId: "SP-2026-00108",
    name: "Himla Hilmy",
    email: "himlahilmy@gmail.com",
    title: "Car Breakdown",
    category: "Roadside Breakdown",
    emergencyType: "Roadside Breakdown",
    severity: "Low",
    location: "Galle Road, Bambalapitiya",
    lat: 6.8920,
    lng: 79.8560,
    description: "Cooling system burst causing engine overheating along coastal strip. Tow truck requested.",
    reportedAgo: "1 day ago",
    createdAt: new Date(Date.now() - 24 * 3600 * 1000).toISOString(),
    status: "Resolved",
    assignedOfficer: "Lanka Towing Services - Driver Sunil",
    photoUrl: "https://images.unsplash.com/photo-1578844251758-2f71da64c96f?auto=format&fit=crop&w=600&q=80",
    timeline: [
      { step: "Reported", time: "09 Sep 2026, 02:15 PM", completed: true, note: "Vehicle breakdown reported with breakdown coords." },
      { step: "Under Review", time: "09 Sep 2026, 02:20 PM", completed: true, note: "Dispatch matched with nearest flatbed tow truck." },
      { step: "Assistance in Progress", time: "09 Sep 2026, 02:35 PM", completed: true, note: "Tow truck on site and loaded vehicle safely." },
      { step: "Resolved", time: "09 Sep 2026, 03:40 PM", completed: true, note: "Delivered to authorized garage. Case completed." }
    ]
  }
];

const INITIAL_DISPATCHES = [
  {
    id: "AS-2026-0043",
    requestId: "AS-2026-0043",
    title: "Towing Service",
    assistanceType: "Towing Service",
    vehicleType: "Flatbed Tow Truck",
    priority: "High priority",
    severity: "High",
    distance: "2.1 km",
    timeAgo: "12 min ago",
    location: "Marine Drive, Colombo 03",
    lat: 6.9015,
    lng: 79.8512,
    details: "Sedan transmission lock and steering failure. Vehicle blocking driveway, needs flatbed carrier.",
    phone: "+94 77 912 3456",
    name: "Alex Vance (UK Tourist)",
    status: "Pending",
    createdAt: new Date(Date.now() - 12 * 60 * 1000).toISOString(),
    eta: "15 mins"
  },
  {
    id: "AS-2026-0042",
    requestId: "AS-2026-0042",
    title: "Mechanic Service",
    assistanceType: "Mechanic Service",
    vehicleType: "Mobile Diagnostic Van",
    priority: "Medium priority",
    severity: "Medium",
    distance: "3.8 km",
    timeAgo: "25 min ago",
    location: "Viharamahadevi Park, Colombo 07",
    lat: 6.9135,
    lng: 79.8655,
    details: "Dead starter motor / battery failure. Tourist rental car unable to crank.",
    phone: "+94 71 884 9012",
    name: "Elena Rostova",
    status: "Pending",
    createdAt: new Date(Date.now() - 25 * 60 * 1000).toISOString(),
    eta: "20 mins"
  },
  {
    id: "AS-2026-0041",
    requestId: "AS-2026-0041",
    title: "Flat Tyre Assistance",
    assistanceType: "Flat Tyre Assistance",
    vehicleType: "Rapid Tire Unit",
    priority: "Medium priority",
    severity: "Medium",
    distance: "4.5 km",
    timeAgo: "40 min ago",
    location: "Fort Railway Station, Colombo 01",
    lat: 6.9340,
    lng: 79.8505,
    details: "Punctured front passenger wheel, spare wheel jack stripped. Assistance required.",
    phone: "+94 76 331 4455",
    name: "Takeshi Sato",
    status: "Pending",
    createdAt: new Date(Date.now() - 40 * 60 * 1000).toISOString(),
    eta: "25 mins"
  },
  {
    id: "AS-2026-0039",
    requestId: "AS-2026-0039",
    title: "Fuel Delivery",
    assistanceType: "Fuel Delivery",
    vehicleType: "Roadside Dispatch Bike",
    priority: "Low priority",
    severity: "Low",
    distance: "5.2 km",
    timeAgo: "1 hour ago",
    location: "Union Place, Colombo 02",
    lat: 6.9205,
    lng: 79.8590,
    details: "Out of fuel en route to airport. Needs 5 litres unleaded 95 octane.",
    phone: "+94 70 551 2233",
    name: "Marcus Lindqvist",
    status: "Accepted",
    createdAt: new Date(Date.now() - 65 * 60 * 1000).toISOString(),
    eta: "5 mins"
  }
];

const NEARBY_SERVICES = [
  {
    id: "srv-1",
    name: "General Hospital (National Hospital of Sri Lanka)",
    shortName: "General Hospital",
    type: "hospitals",
    distance: "1.2 km",
    time: "5 min",
    statusText: "24/7 Emergency",
    address: "Regent Street, Colombo 10",
    phone: "+94 11 269 1111",
    lat: 6.9195,
    lng: 79.8687,
    iconColor: "red"
  },
  {
    id: "srv-2",
    name: "Colombo Fort Police Station",
    shortName: "Police Station",
    type: "police",
    distance: "2.4 km",
    time: "8 min",
    statusText: "Open 24 hours",
    address: "Olcott Mawatha, Colombo 01",
    phone: "+94 11 243 3333",
    lat: 6.9365,
    lng: 79.8435,
    iconColor: "blue"
  },
  {
    id: "srv-3",
    name: "British High Commission",
    shortName: "British High Commission",
    type: "embassies",
    distance: "3.1 km",
    time: "10 min",
    statusText: "Consular Services",
    address: "389 Bauddhaloka Mawatha, Colombo 07",
    phone: "+94 11 539 0639",
    lat: 6.9010,
    lng: 79.8660,
    iconColor: "orange"
  },
  {
    id: "srv-4",
    name: "Asiri Central Hospital Trauma Care",
    shortName: "Asiri Central Hospital",
    type: "hospitals",
    distance: "1.8 km",
    time: "7 min",
    statusText: "24/7 Emergency & ICU",
    address: "114 Norris Canal Rd, Colombo 10",
    phone: "+94 11 466 5500",
    lat: 6.9248,
    lng: 79.8621,
    iconColor: "red"
  },
  {
    id: "srv-5",
    name: "Kollupitiya Police Station & Tourist Desk",
    shortName: "Kollupitiya Police",
    type: "police",
    distance: "2.1 km",
    time: "6 min",
    statusText: "Open 24 hours",
    address: "Galle Road, Kollupitiya, Colombo 03",
    phone: "+94 11 257 3254",
    lat: 6.9080,
    lng: 79.8520,
    iconColor: "blue"
  },
  {
    id: "srv-6",
    name: "Embassy of the United States",
    shortName: "US Embassy Colombo",
    type: "embassies",
    distance: "2.8 km",
    time: "9 min",
    statusText: "Citizen Emergency Services",
    address: "210 Galle Rd, Colombo 03",
    phone: "+94 11 249 8500",
    lat: 6.9110,
    lng: 79.8490,
    iconColor: "orange"
  },
  {
    id: "srv-7",
    name: "Lanka Towing & 24/7 Roadside Rescue",
    shortName: "Lanka Towing Hub",
    type: "dispatch",
    distance: "2.5 km",
    time: "12 min",
    statusText: "24/7 Rapid Towing",
    address: "Union Place, Colombo 02",
    phone: "+94 77 123 4567",
    lat: 6.9270,
    lng: 79.8580,
    iconColor: "orange"
  }
];

export function SafePassageProvider({ children }) {
  // Current user / role
  const [user, setUser] = useState({
    name: "Himla",
    fullName: "M.H.F. Himla",
    email: "himlahilmy@gmail.com",
    role: "traveler", // "traveler" | "provider" | "admin"
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
    country: "Sri Lanka",
    phone: "+94 77 123 4567"
  });

  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [incidents, setIncidents] = useState(() => {
    const saved = localStorage.getItem("sp_incidents");
    return saved ? JSON.parse(saved) : INITIAL_INCIDENTS;
  });

  const [dispatches, setDispatches] = useState(() => {
    const saved = localStorage.getItem("sp_dispatches");
    return saved ? JSON.parse(saved) : INITIAL_DISPATCHES;
  });

  const [services] = useState(NEARBY_SERVICES);
  const [activeIncidentId, setActiveIncidentId] = useState(null);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRadius, setSelectedRadius] = useState(5); // 5km, 10km, 25km
  const [selectedServiceType, setSelectedServiceType] = useState("all");
  const [isMobilePreviewOpen, setIsMobilePreviewOpen] = useState(false);
  const [notificationCount, setNotificationCount] = useState(2);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem("sp_incidents", JSON.stringify(incidents));
  }, [incidents]);

  useEffect(() => {
    localStorage.setItem("sp_dispatches", JSON.stringify(dispatches));
  }, [dispatches]);

  // Try fetching backend emergencies on mount
  useEffect(() => {
    const fetchBackendData = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/emergency`);
        if (res.ok) {
          const data = await res.json();
          if (data.success && data.data && data.data.length > 0) {
            // merge backend data with our richer reference data if needed
            console.log("Backend emergencies loaded:", data.data.length);
          }
        }
      } catch {
        // Backend not running, local storage / mock takes care seamlessly
      }
    };
    fetchBackendData();
  }, []);

  // Add Incident
  const addIncident = async (incidentData) => {
    const newId = `SP-2026-${String(Math.floor(100 + Math.random() * 900))}`;
    const newIncident = {
      id: newId,
      trackingId: newId,
      name: user.fullName || user.name,
      email: user.email,
      title: incidentData.title || incidentData.emergencyType,
      category: incidentData.category || incidentData.emergencyType,
      emergencyType: incidentData.category || incidentData.emergencyType,
      severity: incidentData.severity || "Medium",
      location: incidentData.location || "Colombo, Sri Lanka",
      lat: 6.9271 + (Math.random() - 0.5) * 0.02,
      lng: 79.8612 + (Math.random() - 0.5) * 0.02,
      description: incidentData.description || "",
      reportedAgo: "Just now",
      createdAt: new Date().toISOString(),
      status: "Reported",
      assignedOfficer: "Pending Assignment",
      photoUrl: incidentData.photoUrl || "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=80",
      timeline: [
        { step: "Reported", time: "Just now", completed: true, note: "Emergency report received and verified by system." },
        { step: "Under Review", time: "Pending", completed: false, note: "Awaiting local emergency coordinator review." },
        { step: "Assistance in Progress", time: "Pending", completed: false, note: "Responder dispatched." },
        { step: "Resolved", time: "Pending", completed: false, note: "Case resolved." }
      ]
    };

    setIncidents((prev) => [newIncident, ...prev]);

    // Send to backend in background if accessible
    try {
      await fetch(`${API_BASE_URL}/emergency`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newIncident.name,
          email: newIncident.email,
          emergencyType: newIncident.category,
          severity: newIncident.severity,
          location: newIncident.location,
          description: newIncident.description,
        })
      });
    } catch {
      // quiet fallback
    }

    return newIncident;
  };

  // Update incident status
  const updateIncidentStatus = async (trackingId, newStatus) => {
    setIncidents((prev) =>
      prev.map((item) => {
        if (item.trackingId === trackingId || item.id === trackingId) {
          const updatedTimeline = item.timeline.map((step) => {
            if (step.step === newStatus) {
              return { ...step, completed: true, time: "Updated just now" };
            }
            if (newStatus === "Resolved") {
              return { ...step, completed: true, time: step.time === "Pending" ? "Completed" : step.time };
            }
            if (newStatus === "Assistance in Progress" && step.step === "Under Review") {
              return { ...step, completed: true };
            }
            return step;
          });

          return {
            ...item,
            status: newStatus,
            timeline: updatedTimeline
          };
        }
        return item;
      })
    );

    // Sync to backend
    try {
      await fetch(`${API_BASE_URL}/emergency/${trackingId}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus })
      });
    } catch {
      // quiet fallback
    }
  };

  // Add Assistance / Roadside request
  const addAssistance = async (data) => {
    const newId = `AS-2026-${String(Math.floor(1000 + Math.random() * 9000))}`;
    const newReq = {
      id: newId,
      requestId: newId,
      title: data.assistanceType || "Roadside Assistance",
      assistanceType: data.assistanceType || "Roadside Assistance",
      vehicleType: data.vehicleType || "Towing / Rescue Unit",
      priority: data.priority || "Medium priority",
      severity: data.priority?.includes("High") ? "High" : "Medium",
      distance: "1.5 km",
      timeAgo: "Just now",
      location: data.location || "Colombo 03",
      lat: 6.9271 + (Math.random() - 0.5) * 0.015,
      lng: 79.8612 + (Math.random() - 0.5) * 0.015,
      details: data.details || "Assistance needed.",
      phone: data.phone || user.phone,
      name: data.name || user.fullName,
      status: "Pending",
      createdAt: new Date().toISOString(),
      eta: "15 mins"
    };

    setDispatches((prev) => [newReq, ...prev]);

    try {
      await fetch(`${API_BASE_URL}/assistance`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newReq.name,
          phone: newReq.phone,
          assistanceType: newReq.assistanceType,
          location: newReq.location,
          details: newReq.details,
          priority: newReq.priority
        })
      });
    } catch {
      // quiet fallback
    }

    return newReq;
  };

  // Dispatch Actions: Accept, Reject, Complete
  const handleDispatchAction = async (requestId, action) => {
    const targetStatus = action === "accept" ? "Accepted" : action === "reject" ? "Rejected" : "Completed";
    setDispatches((prev) =>
      prev.map((item) =>
        item.requestId === requestId || item.id === requestId
          ? { ...item, status: targetStatus, eta: action === "accept" ? "12 mins (En Route)" : item.eta }
          : item
      )
    );

    try {
      await fetch(`${API_BASE_URL}/assistance/${requestId}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: targetStatus })
      });
    } catch {
      // quiet fallback
    }
  };

  // Switch Role
  const switchRole = (newRole) => {
    if (newRole === "traveler") {
      setUser({
        name: "Himla",
        fullName: "M.H.F. Himla",
        email: "himlahilmy@gmail.com",
        role: "traveler",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
        country: "Sri Lanka",
        phone: "+94 77 123 4567"
      });
    } else if (newRole === "provider") {
      setUser({
        name: "Lanka Towing",
        fullName: "Lanka Roadside & Towing Services",
        email: "dispatch@lankatowing.lk",
        role: "provider",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
        country: "Sri Lanka (Colombo Base)",
        phone: "+94 77 999 1234"
      });
    } else if (newRole === "admin") {
      setUser({
        name: "Admin Hirunika",
        fullName: "R.P.J. Hirunika (Operations Director)",
        email: "admin@safepassage.lk",
        role: "admin",
        avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80",
        country: "National Operations Center",
        phone: "+94 11 200 8888"
      });
    }
  };

  // Active incident object
  const activeIncident = incidents.find((i) => i.id === activeIncidentId || i.trackingId === activeIncidentId);

  // Statistics
  const stats = {
    activeIncidents: incidents.filter((i) => i.status !== "Resolved").length,
    ongoingAssistance: dispatches.filter((d) => d.status === "Pending" || d.status === "Accepted").length,
    resolvedCases: incidents.filter((i) => i.status === "Resolved").length,
    totalIncidents: incidents.length,
    avgResponseMinutes: 14,
    resolutionRate: "94.2%"
  };

  return (
    <SafePassageContext.Provider
      value={{
        user,
        setUser,
        isAuthenticated,
        setIsAuthenticated,
        switchRole,
        incidents,
        dispatches,
        services,
        stats,
        activeIncident,
        activeIncidentId,
        setActiveIncidentId,
        isReportModalOpen,
        setIsReportModalOpen,
        searchQuery,
        setSearchQuery,
        selectedRadius,
        setSelectedRadius,
        selectedServiceType,
        setSelectedServiceType,
        isMobilePreviewOpen,
        setIsMobilePreviewOpen,
        notificationCount,
        setNotificationCount,
        addIncident,
        updateIncidentStatus,
        addAssistance,
        handleDispatchAction
      }}
    >
      {children}
    </SafePassageContext.Provider>
  );
}

export function useSafePassage() {
  const context = useContext(SafePassageContext);
  if (!context) {
    throw new Error("useSafePassage must be used within a SafePassageProvider");
  }
  return context;
}
