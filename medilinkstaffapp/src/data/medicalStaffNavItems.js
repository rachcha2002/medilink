const navList = [
  {
    _id: 1,
    name: "Dashboard",
    icon: "bi bi-grid",
    href: "/mltstaff/reportlist",
  },
  {
    _id: 2,
    name: "Medical Records",
    icon: "bi bi-journal-text",
    children: [
      {
        _id: 21,
        name: "All Medical Records",
        icon: "bi bi-circle",
        href: "/hospitaladmin/medicalstaff",
      },
      {
        _id: 22,
        name: "My Medical Records",
        icon: "bi bi-circle",
        href: "/hospitaladmin/mltstaff",
      },
    ],
  },
  {
    _id: 3,
    name: "Prescriptions",
    icon: "bi bi-card-text",
    children: [
      {
        _id: 31,
        name: "All Prescriptions",
        icon: "bi bi-circle",
        href: "/hospitaladmin/medicalstaff",
      },
      {
        _id: 32,
        name: "My Prescriptions",
        icon: "bi bi-circle",
        href: "/hospitaladmin/mltstaff",
      },
    ],
  },
];

export default navList;
