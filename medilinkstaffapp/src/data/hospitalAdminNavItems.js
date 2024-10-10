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
    name: "Documents",
    icon: "bi bi-menu-button-wide",
    children: [
      { _id: 21, name: "Customers", icon: "bi bi-circle" },
      { _id: 22, name: "Suppliers", icon: "bi bi-circle" },
      { _id: 23, name: "Logistic", icon: "bi bi-circle" },
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
];

export default navList;
