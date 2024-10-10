const navList = [
  {
    _id: 1,
    name: "Dashboard",
    icon: "bi bi-house",
    href: "/hospitaladmin",
  },
  {
    _id: 2,
    name: "Payment Management",
    icon: "bi bi-cash",
    href: "/hospitaladmin/payment",
  },
  {
    _id: 3,
    name: "Appointments",
    icon: "bi bi-ui-checks",
    children: [
      { _id: 21, name: "Channeling", icon: "bi bi-circle",href: "/hospitaladmin/Channelingappointments" },
      { _id: 22, name: "Clinic", icon: "bi bi-circle",href: "/hospitaladmin/Clinicappointments" },
      { _id: 23, name: "Tests & Scans", icon: "bi bi-circle",href: "/hospitaladmin/TestsandScansappointments" },
    ],
  },
  {
    _id: 4,
    name: "Forms",
    icon: "bi bi-journal-text",
  },
  {
    _id: 5,
    name: "Tables",
    icon: "bi bi-layout-text-window-reverse",
  },
  {
    _id: 6,
    name: "Charts",
    icon: "bi bi-bar-chart",
  },
  {
    _id: 7,
    name: "Icons",
    icon: "bi bi-gem",
  },
];

export default navList;
