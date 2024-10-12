const navList = [
  {
    _id: 1,
    name: "Dashboard",
    icon: "bi bi-grid",
    href: "/medicalstaff",
  },
  {
    _id: 2,
    name: "Medical Records",
    icon: "bi bi-journal-text",
    children: [
      {
        _id: 20,
        name: "Add Medical Records",
        icon: "bi bi-circle",
        href: "/medicalstaff/addmedicalrecord",
      },
      {
        _id: 21,
        name: "All Medical Records",
        icon: "bi bi-circle",
        href: "/medicalstaff/medicalrecords",
      },
      {
        _id: 22,
        name: "My Medical Records",
        icon: "bi bi-circle",
        href: "/medicalstaff/medicalrecordsbystaff",
      },
    ],
  },
  {
    _id: 3,
    name: "Prescriptions",
    icon: "bi bi-card-text",
    children: [
      {
        _id: 30,
        name: "Add Prescription",
        icon: "bi bi-circle",
        href: "/medicalstaff/addprescription",
      },
      {
        _id: 31,
        name: "All Prescriptions",
        icon: "bi bi-circle",
        href: "/medicalstaff/prescriptions",
      },
      {
        _id: 32,
        name: "My Prescriptions",
        icon: "bi bi-circle",
        href: "/medicalstaff/prescriptionbystaff",
      },
    ],
  },
];

export default navList;
