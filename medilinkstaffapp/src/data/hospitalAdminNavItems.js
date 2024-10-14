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
      {
        _id: 21,
        name: "Channeling",
        icon: "bi bi-circle",
        href: "/hospitaladmin/Channelingappointments",
      },
      {
        _id: 22,
        name: "Clinic",
        icon: "bi bi-circle",
        href: "/hospitaladmin/Clinicappointments",
      },
      {
        _id: 23,
        name: "Tests & Scans",
        icon: "bi bi-circle",
        href: "/hospitaladmin/TestsandScansappointments",
      },
    ],
  },
  {
    _id: 4,
    name: "Staff Management",
    icon: "bi bi-person-badge-fill",
    children: [
      {
        _id: 31,
        name: "Medical Staff",
        icon: "bi bi-circle",
        href: "/hospitaladmin/medicalstaff",
      },
      {
        _id: 32,
        name: "MLT Staff",
        icon: "bi bi-circle",
        href: "/hospitaladmin/mltstaff",
      },
    ],
  },
  {
    _id: 5,
    name: "Hospital Details",
    icon: "bi bi-h-circle",
    href: "/hospitaladmin/hospitaldetails",
  },
];

export default navList;
